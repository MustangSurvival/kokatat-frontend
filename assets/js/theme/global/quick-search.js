import _ from 'lodash';
import utils from '@bigcommerce/stencil-utils';
import StencilDropDown from './stencil-dropdown';

export default function () {
    const TOP_STYLING = 'top: 49px;';
    const $quickSearch = $('#quickSearch');
    const $quickSearchResults = $('.quickSearchResults');
    // const $quickSearchDiv = $('#quickSearch');
    // const $searchQuery = $('#search_query');
    const $quickSearchForms = $('[data-quick-search-form]');
    const $quickSearchExpand = $('#quick-search-expand');
    let $searchQuery = $quickSearchForms.find('[data-search-quick]');
    
    // If no form with data-quick-search-form found, get input from #quickSearch (kokatat version)
    if ($searchQuery.length === 0) {
        $searchQuery = $quickSearch.find('[data-search-quick]');
    }

    // Keep the quick search subtree non-focusable while aria-hidden.
    $quickSearch.attr('inert', '');
    
    const stencilDropDownExtendables = {
        hide: () => {
            if ($quickSearchExpand.length) {
                $quickSearchExpand.attr('aria-expanded', false);
            }
            $quickSearch.attr('inert', '');
            $searchQuery.attr('tabindex', '-1');
            $searchQuery.trigger('blur');
        },
        show: (event) => {
            if ($quickSearchExpand.length) {
                $quickSearchExpand.attr('aria-expanded', true);
            }
            $quickSearch.removeAttr('inert');
            $searchQuery.attr('tabindex', '0');
            $searchQuery.trigger('focus');
            event.stopPropagation();
        },
    };
    const stencilDropDown = new StencilDropDown(stencilDropDownExtendables);
    // stencilDropDown.bind($('[data-search="quickSearch"]'), $quickSearchDiv, TOP_STYLING);
    stencilDropDown.bind($('[data-search="quickSearch"]'), $quickSearch, TOP_STYLING);

    stencilDropDownExtendables.onBodyClick = (e, $container) => {
        // If the target element has this data tag or one of it's parents, do not close the search results
        // We have to specify `.modal-background` because of limitations around Foundation Reveal not allowing
        // any modification to the background element.
        if ($(e.target).closest('[data-prevent-quick-search-close], .modal-background').length === 0) {
            stencilDropDown.hide($container);
        }
    };

    // // stagger searching for 200ms after last input
    // stagger searching for 1200ms after last input
    const debounceWaitTime = 1200;
    const doSearch = _.debounce((searchQuery) => {
        utils.api.search.search(searchQuery, { template: 'search/quick-results' }, (err, response) => {
            if (err) {
                return false;
            }

            $quickSearchResults.html(response);
            const $quickSearchResultsCurrent = $quickSearchResults.filter(':visible');

            const $noResultsMessage = $quickSearchResultsCurrent.find('.quickSearchMessage');
            if ($noResultsMessage.length) {
                $noResultsMessage.attr({
                    role: 'status',
                    'aria-live': 'polite',
                });
            } else {
                const $quickSearchAriaMessage = $quickSearchResultsCurrent.next();
                $quickSearchAriaMessage.addClass('u-hidden');

                const predefinedText = $quickSearchAriaMessage.data('search-aria-message-predefined-text');
                const itemsFoundCount = $quickSearchResultsCurrent.find('.product').length;

                $quickSearchAriaMessage.text(`${itemsFoundCount} ${predefinedText} ${searchQuery}`);

                setTimeout(() => {
                    $quickSearchAriaMessage.removeClass('u-hidden');
                }, 100);
            }
        });
    // }, 200);
    }, debounceWaitTime);

    // utils.hooks.on('search-quick', (event) => {
    //     const searchQuery = $(event.currentTarget).val();
    utils.hooks.on('search-quick', (event, currentTarget) => {
        const searchQuery = $(currentTarget).val();

        // server will only perform search with at least 3 characters
        if (searchQuery.length < 3) {
            return;
        }

        doSearch(searchQuery);
    });

    // // Catch the submission of the quick-search
    // $quickSearchDiv.on('submit', event => {
    //     const searchQuery = $(event.currentTarget).find('input').val();
    // Catch the submission of the quick-search forms
    $quickSearchForms.on('submit', event => {
        event.preventDefault();

        const $target = $(event.currentTarget);
        const searchQuery = $target.find('input').val();
        const searchUrl = $target.data('url');

        if (searchQuery.length === 0) {
            // return event.preventDefault();
            return;
        }

        // return true;
        window.location.href = `${searchUrl}?search_query=${encodeURIComponent(searchQuery)}`;
    });
}
