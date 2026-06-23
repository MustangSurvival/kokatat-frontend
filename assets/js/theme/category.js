import utils, { hooks } from '@bigcommerce/stencil-utils';
import CatalogPage from './catalog';
import compareProducts from './global/compare-products';
import FacetedSearch from './common/faceted-search';
// import utils from '@bigcommerce/stencil-utils';

export default class Category extends CatalogPage {
    onReady() {
        compareProducts(this.context.urls);

        if ($('#facetedSearch').length > 0) {
            this.initFacetedSearch();
        } else {
            this.onSortBySubmit = this.onSortBySubmit.bind(this);
            hooks.on('sortBy-submitted', this.onSortBySubmit);
        }

        const cards = document.querySelectorAll('article.card');
        if (cards.length) {
            for (let i = 0; i < cards.length; i++) {
                const productId = 'id' in cards[i].dataset ? cards[i].dataset.id : null;

                if (productId !== null) {
                    utils.api.product.getById(productId, { template: 'products/ajax-swatches' }, (err, response) => {
                        if (cards[i].querySelector('.card-swatches') !== null) {
                            cards[i].querySelector('.card-swatches').innerHTML = response;

                            let defaultSwatchColor = null;
                            if (cards[i].querySelector('figure.card-figure img')) {
                                defaultSwatchColor = cards[i].querySelector('figure.card-figure img').getAttribute('alt').split('-')[0];
                            }
    
                            if (cards[i].querySelector(`label.form-option-swatch span[title="${defaultSwatchColor}"]`) && defaultSwatchColor) {
                                cards[i].querySelector(`label.form-option-swatch span[title="${defaultSwatchColor}"]`).closest('label.form-option-swatch').click();
                            }
                        }
                    });
                }
            }
        }
    }

    initFacetedSearch() {
        const $productListingContainer = $('#product-listing-container');
        const $facetedSearchContainer = $('#faceted-search-container');
        const productsPerPage = this.context.categoryProductsPerPage;
        const requestOptions = {
            config: {
                category: {
                    shop_by_price: true,
                    products: {
                        limit: productsPerPage,
                    },
                },
            },
            template: {
                productListing: 'category/product-listing',
                sidebar: 'category/sidebar',
            },
            showMore: 'category/show-more',
        };

        this.facetedSearch = new FacetedSearch(requestOptions, (content) => {
            $productListingContainer.html(content.productListing);
            $facetedSearchContainer.html(content.sidebar);

            $('body').triggerHandler('compareReset');

            $('html, body').animate({
                scrollTop: 0,
            }, 100);

            const cards = document.querySelectorAll('article.card');
            if (cards.length) {
                for (let i = 0; i < cards.length; i++) {
                    const productId = 'id' in cards[i].dataset ? cards[i].dataset.id : null;

                    if (productId !== null) {
                        utils.api.product.getById(productId, { template: 'products/ajax-swatches' }, (err, response) => {
                            if (cards[i].querySelector('.card-swatches') !== null) {
                                cards[i].querySelector('.card-swatches').innerHTML = response;

                                let defaultSwatchColor = null;
                                if (cards[i].querySelector('figure.card-figure img')) {
                                    defaultSwatchColor = cards[i].querySelector('figure.card-figure img').getAttribute('alt').split('-')[0];
                                }
        
                                if (cards[i].querySelector(`label.form-option-swatch span[title="${defaultSwatchColor}"]`) && defaultSwatchColor) {
                                    cards[i].querySelector(`label.form-option-swatch span[title="${defaultSwatchColor}"]`).closest('label.form-option-swatch').click();
                                }
                            }
                        });
                    }
                }
            }
        });
    }
}
