/* eslint-disable func-names */
import $ from 'jquery';

function collapseSections() {
    $('.toggleLink').click(function (e) {
        e.preventDefault();
        $(this).toggleClass('is-open');
        const toggleContent = $(this).next('.toggle-content');
        toggleContent.toggle('fast');
        toggleContent.toggleClass('is-open');
    });
}
function collapseRelated() {
    $('.related-toggleLink').click(function (e) {
        e.preventDefault();
        $(this).toggleClass('is-open');
        const toggleContent = $(this).next('.related-toggleContent');
        toggleContent.toggle('fast');
    });
}
collapseRelated();
collapseSections();
$('.swatch.form-radio').on('click', () => {
    const selectedSwatch = $('.form-radio:checked + .form-option .form-option-variant');
    const color = (selectedSwatch.attr('title'));

    $('.pop-swatches .selected-color').html(color);
});


function initSlickSliderMobile() {
    function sliderInit(mobile, tablet, desktop) {
        if (tablet.matches || desktop.matches) {
            if ($('.productView-thumbnails').hasClass('slick-slider')) {
                $('.productView-thumbnails').slick('unslick');
            }
        } else if (mobile.matches) {
            $('.productView-thumbnails').slick({
                slidesToShow: 1,
                infinite: true,
            });
        }
    }

    // media query to pass into function
    const mobile = window.matchMedia('(max-width: 800px)');
    const tablet = window.matchMedia('(min-width: 801px) and (max-width: 959px)');
    const desktop = window.matchMedia('(min-width: 960px)');
    const mediaQueries = [mobile, tablet, desktop];

    // run function on page load
    sliderInit(mobile, tablet, desktop);

    // run function when there are any changes to the media queries
    for (let i = 0; i < mediaQueries.length; i++) {
        mediaQueries[i].addListener((e) => {
            if (e.matches) {
                sliderInit(mobile, tablet, desktop);
            }
        });
    }
}
initSlickSliderMobile();

// ADA
function addSwatchLabels() {
    $('.form-option-variant--color').each(function () {
        $(this).parent().prev().attr('aria-label', $(this).context.getAttribute('title'));
        $(this).parent().attr('aria-label', $(this).context.getAttribute('title'));
    });

    $('.radio-container').find('.radio').each(function () {
        switch ($(this).text()) {
        case 'XS':
            $(this).prev().attr('aria-label', 'Extra Small');
            break;
        case 'XS/S':
            $(this).prev().attr('aria-label', 'Extra Small/Small');
            break;
        case 'S':
            $(this).prev().attr('aria-label', 'Small');
            break;
        case 'M':
            $(this).prev().attr('aria-label', 'Medium');
            break;
        case 'M/L':
            $(this).prev().attr('aria-label', 'Medium/Large');
            break;
        case 'L':
            $(this).prev().attr('aria-label', 'Large');
            break;
        case 'XL/2X':
            $(this).prev().attr('aria-label', 'Extra Large/2 Extra Large');
            break;
        case 'XL':
            $(this).prev().attr('aria-label', 'Extra Large');
            break;
        case 'XLS':
            $(this).prev().attr('aria-label', 'Extra Large');
            break;
        case '2XL':
            $(this).prev().attr('aria-label', '2 Extra Large');
            break;
        default:
            $(this).prev().attr('aria-label', $(this).text().trim());
            break;
        }
        // $(this).attr('aria-label', $(this).text());
    });
}
addSwatchLabels();
