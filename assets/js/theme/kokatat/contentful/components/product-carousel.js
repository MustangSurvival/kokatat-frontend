import ComponentAbstract from './component-abstract';
import utils from '@bigcommerce/stencil-utils';

const Slick = require('slick-carousel');

export default class ProductCarousel extends ComponentAbstract {
    constructor(contentType, entryId, fieldData, bearerToken) {
        super(contentType, entryId, fieldData, bearerToken);
        if (typeof window.Slick === 'undefined') window.Slick = Slick;
    }

    generateFrontEndComponent() {
        if (document.getElementById(this.templateId)) {
            const templateInstance = document.getElementById(this.templateId).cloneNode(true);
            // Configure Element
            templateInstance.id = this.entryId;
            templateInstance.removeAttribute('hidden');
            templateInstance.classList.add(this.templateId);

            const focusableSelectors = 'a, input, button, select, textarea, [tabindex]';

            function syncSlideTabindex(slider) {
                slider.find('.slick-slide[aria-hidden="true"]').find(focusableSelectors).attr('tabindex', '-1');
                slider.find('.slick-slide:not([aria-hidden="true"])').find(focusableSelectors).each(function () {
                    $(this).removeAttr('tabindex');
                });
            }

            const productCarousel = $(templateInstance.querySelector('.product-slider'))
                .on('init afterChange', (event, slick) => syncSlideTabindex($(slick.$slider)))
                .slick({
                dots: false,
                arrows: false,
                infinite: false,
                mobileFirst: true,
                slidesToShow: 1.5,
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 550,
                        settings: {
                            slidesToShow: 2.5,
                            slidesToScroll: 1,
                        },
                    },
                    {
                        breakpoint: 801,
                        settings: {
                            slidesToShow: 3.25,
                            slidesToScroll: 1,
                        },
                    },
                    {
                        breakpoint: 1100,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 1,
                        },
                    },
                ],
                });
            syncSlideTabindex(productCarousel);

            // Populate Content
            if (this.validateFieldData(this.fieldData)) {
                for (let i = 0; i < this.fieldData.length; i++) {
                    fetch('/graphql', {
                        method: 'POST',
                        credentials: 'same-origin',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${this.bearerToken}`,
                        },
                        body: JSON.stringify({
                            query: `query productBySku(
                            $productSku: String!
                            # Use GraphQL Query Variables to inject your product ID
                            ) {
                                site {
                                product(sku: $productSku) {
                                    entityId
                                }
                            }
                        }`,
                            variables: {
                                productSku: this.fieldData[i],
                            },
                        }),
                    })
                        .then((res) => res.json())
                        .then((data) => data.data.site.product != null ? data.data.site.product.entityId : null)
                        .then((data) => {
                            utils.api.product.getById(data, { template: 'products/ajax-card' }, (err, response) => {
                                const slideElem = document.createElement('div');
                                slideElem.innerHTML = `<div class="product">${response}</div>`;
                                productCarousel.slick('slickAdd', slideElem);
        
                                // Add unique Id to swatch labels and inputs
                                const labels = slideElem.querySelectorAll('label.form-option-swatch');
                                if (labels.length) {
                                    for (let x = 0; x < labels.length; x++) {
                                        labels[x].setAttribute('for', `${this.entryId}_${labels[x].getAttribute('for')}`);
                                        labels[x].previousElementSibling.id = labels[x].getAttribute('for');
                                        labels[x].previousElementSibling.name = `${this.entryId}_${labels[x].previousElementSibling.name}`;
                                    }
                                }
        
                                let defaultSwatchColor = null;
                                if (slideElem.querySelector('figure.card-figure img')) {
                                    defaultSwatchColor = slideElem.querySelector('figure.card-figure img').getAttribute('alt').split('-')[0];
                                }
        
                                if (slideElem.querySelector(`label.form-option-swatch span[title="${defaultSwatchColor}"]`) && defaultSwatchColor) {
                                    slideElem.querySelector(`label.form-option-swatch span[title="${defaultSwatchColor}"]`).closest('label.form-option-swatch').click();
                                }
                            });
                        })
                        .catch(error => console.error(error));
                }
            }

            return templateInstance;
        }

        return null;
    }
}
