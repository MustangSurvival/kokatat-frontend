import ComponentAbstract from './component-abstract';
import utils from '@bigcommerce/stencil-utils';
import * as contentful from 'contentful';
import ContentfulEnvironment from '../contentful-env';

const Slick = require('slick-carousel');

export default class FeaturedBlogPost extends ComponentAbstract {
    constructor(contentType, entryId, fieldData) {
        super(contentType, entryId, fieldData);

        if (typeof window.Slick === 'undefined') window.Slick = Slick;
    }

    generateFrontEndComponent() {
        this.env = new ContentfulEnvironment();
        this.client = contentful.createClient({
            space: this.env.space,
            accessToken: this.env.access_token,
        });
        const componentInstance = this;

        // Populate Content

        // For Category Landing
        if (document.getElementById(this.templateId)) {
            const templateInstance = document.getElementById(this.templateId).cloneNode(true);
            // Configure Element
            templateInstance.id = this.entryId;
            templateInstance.removeAttribute('hidden');
            templateInstance.classList.add(this.templateId);

            if (this.validateFieldData(this.fieldData.title)) {
                if (templateInstance.querySelector('h3') !== null) {
                    templateInstance.querySelector('h3').innerHTML = this.fieldData.title;
                }
            }

            if (this.validateFieldData(this.fieldData.teaser)) {
                if (templateInstance.querySelector('p') !== null) {
                    templateInstance.querySelector('p').innerHTML = this.fieldData.teaser;
                }
            }

            if (this.validateFieldData(this.fieldData.relatedProducts) && this.validateFieldData(this.fieldData.relatedProducts.selected_products) && this.fieldData.relatedProducts.selected_products.length > 0) {
                if (templateInstance.querySelector('.product-img-carousel') !== null) {
                    const productCarousel = $(templateInstance.querySelector('.product-img-carousel')).slick({
                        dots: false,
                        arrows: true,
                        infinite: false,
                        mobileFirst: true,
                        slidesToShow: 1.5,
                        slidesToScroll: 1,
                    });

                    for (let i = 0; i < this.fieldData.relatedProducts.selected_products.length; i++) {
                        const productId = this.fieldData.relatedProducts.selected_products[i];
                        utils.api.product.getById(productId, { template: 'products/ajax-image' }, (err, response) => {
                            const slideElem = document.createElement('div');
                            slideElem.innerHTML = `<div class="product">${response}</div>`;
                            productCarousel.slick('slickAdd', slideElem);
                        });
                    }
                }
            }

            if (this.validateFieldData(this.fieldData.marqueeImage) && this.validateFieldData(this.fieldData.marqueeImage.sys.id, 'text')) {
                this.client.getEntry(this.fieldData.marqueeImage.sys.id)
                .then((response) => {
                    if (componentInstance.validateFieldData(response.fields.image, 'asset')) {
                        if (templateInstance.querySelector('.story-image') !== null) {
                            templateInstance.querySelector('.story-image').style.backgroundImage = `url('${response.fields.image.fields.file.url}')`;
                        }
                    }
                });
            }

            if (this.validateFieldData(this.fieldData.slug, 'text')) {
                if (templateInstance.querySelector('.story-image a.text-link') !== null) {
                    templateInstance.querySelector('.story-image a.text-link').href = this.fieldData.slug;
                }
            } else {
                if (templateInstance.querySelector('.story-image a.text-link') !== null) {
                    templateInstance.querySelector('.story-image a.text-link').parentElement.removeChild(templateInstance.querySelector('.story-image a.text-link'));
                }
            }

            // For Blog Landing
            if (this.validateFieldData(this.fieldData.featuredQuote, 'text')) {
                if (templateInstance.querySelector('.pullquote span') !== null) {
                    templateInstance.querySelector('.pullquote span').innerHTML = this.fieldData.featuredQuote;
                }
            }

            if (this.validateFieldData(this.fieldData.slug, 'text')) {
                if (templateInstance.querySelector('a') !== null) {
                    templateInstance.querySelector('a').href = this.fieldData.slug;
                }
            } else {
                if (templateInstance.querySelector('a') !== null) {
                    templateInstance.querySelector('a').parentElement.removeChild(templateInstance.querySelector('a'));
                }
            }

            if (this.validateFieldData(this.fieldData.featuredImage, 'image')) {
                if (templateInstance.querySelector('img') !== null) {
                    templateInstance.querySelector('img').src = this.fieldData.featuredImage.fields.file.url;
                    templateInstance.querySelector('img').alt = this.fieldData.featuredImage.fields.title;
                }
            } else {
                if (templateInstance.querySelector('img') !== null) {
                    templateInstance.querySelector('img').parentElement.removeChild(templateInstance.querySelector('img'));
                }
            }

            return templateInstance;
        }

        return null;
    }
}
