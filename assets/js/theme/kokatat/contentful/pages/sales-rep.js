import ContentfulAbstract from '../contentful-abstract';
import { createAccordion } from '../utility-functions';
import 'foundation-sites/js/foundation/foundation';
import 'foundation-sites/js/foundation/foundation.accordion';

const showdown = require('showdown');

export default class ContentfulSalesRepPage extends ContentfulAbstract {
    constructor(context) {
        super(context);

        this.page_entry = null;
    }

    setEntryData(responseData) {
        const entryItems = responseData.items;
        const pageSlug = location.pathname;

        for (let i = 0; i < entryItems.length; i++) {
            if (entryItems[i].fields.slug === pageSlug) {
                this.page_entry = entryItems[i].fields;
                break;
            }
        }
    }

    populateContent() {
        const converter = new showdown.Converter();

        if (this.page_entry !== null) {
            // Marquee
            if (this.validateFieldData(this.page_entry.marqueeImage) && this.validateFieldData(this.page_entry.marqueeImage.fields.image, 'asset')) {
                if (document.querySelector('.secondary-marquee .heroCarousel-image') !== null) {
                    document.querySelector('.secondary-marquee .heroCarousel-image').src = this.page_entry.marqueeImage.fields.image.fields.file.url;

                    if (document.querySelector('.secondary-marquee .placeholder') !== null) {
                        document.querySelector('.secondary-marquee .placeholder').parentElement.removeChild(document.querySelector('.secondary-marquee .placeholder'));
                    }
                }

                if (this.validateFieldData(this.page_entry.headline, 'text')) {
                    if (document.querySelector('.secondary-marquee .page-heading') !== null) {
                        document.querySelector('.secondary-marquee .page-heading').innerHTML = this.page_entry.headline;
                    }
                }

                if (this.validateFieldData(this.page_entry.subhead, 'text')) {
                    if (document.querySelector('.secondary-marquee .copy-container .page-subhead') !== null) {
                        document.querySelector('.secondary-marquee .copy-container .page-subhead').innerHTML = this.page_entry.subhead;
                    }
                } else {
                    if (document.querySelector('.secondary-marquee .copy-container .page-subhead') !== null) {
                        document.querySelector('.secondary-marquee .copy-container .page-subhead').parentElement.removeChild(document.querySelector('.secondary-marquee .copy-container .page-subhead'));
                    }
                }
            }

            // Top Header
            if (this.validateFieldData(this.page_entry.topHeader, 'text')) {
                if (document.querySelector('.support-container .top-header') !== null) {
                    document.querySelector('.support-container .top-header').innerHTML = this.page_entry.topHeader;
                }
            } else {
                if (document.querySelector('.support-container .top-header') !== null) {
                    document.querySelector('.support-container .top-header').parentElement.removeChild(document.querySelector('.support-container .top-header'));
                }
            }

            // Copy Block
            if (this.validateFieldData(this.page_entry.copyBlock, 'text')) {
                if (document.querySelector('.support-container .copy-block') !== null) {
                    document.querySelector('.support-container .copy-block').innerHTML = converter.makeHtml(this.page_entry.copyBlock);
                }
            } else {
                if (document.querySelector('.support-container .copy-block') !== null) {
                    document.querySelector('.support-container .copy-block').parentElement.removeChild(document.querySelector('.support-container .copy-block'));
                }
            }

            // Top Accordion
            if (this.validateFieldData(this.page_entry.accordionHeader, 'text')) {
                if (document.querySelector('.support-container .accordion-header') !== null) {
                    document.querySelector('.support-container .accordion-header').innerHTML = this.page_entry.accordionHeader;
                }
            } else {
                if (document.querySelector('.support-container .accordion-header') !== null) {
                    document.querySelector('.support-container .accordion-header').parentElement.removeChild(document.querySelector('.support-container .accordion-header'));
                }
            }

            if (this.validateFieldData(this.page_entry.salesRepAccordion)) {
                if (document.querySelector('.support-container .page-content .sales-rep-accordion') !== null) {
                    document.querySelector('.support-container .page-content .sales-rep-accordion').appendChild(createAccordion(this.page_entry.salesRepAccordion, 'rep_accordion_item'));
                }
            } else {
                if (document.querySelector('.support-container .page-content .sales-rep-accordion') !== null) {
                    document.querySelector('.support-container .page-content .sales-rep-accordion').parentElement.removeChild(document.querySelector('.support-container .page-content .sales-rep-accordion'));
                }
            }

            // Accordion reset
            $(document).foundation({
                accordion: {
                    content_class: 'accordion-content',
                    active_class: 'is-open',
                    multi_expand: false,
                    toggleable: true,
                },
            });

            $(document).foundation('accordion', 'reflow');
        }
    }
}
