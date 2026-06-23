import ContentfulAbstract from '../contentful-abstract';
import { convertVideoUrlToEmbed, createAccordion } from '../utility-functions';
import 'foundation-sites/js/foundation/foundation';
import 'foundation-sites/js/foundation/foundation.accordion';

const showdown = require('showdown');

export default class ContentfulSupportPage extends ContentfulAbstract {
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

            // Video
            if (this.validateFieldData(this.page_entry.video, 'text')) {
                if (document.querySelector('.support-container .support-video') !== null) {
                    document.querySelector('.support-container .support-video').innerHTML = convertVideoUrlToEmbed(this.page_entry.video);
                }
            } else {
                if (document.querySelector('.support-container .support-video') !== null) {
                    document.querySelector('.support-container .support-video').parentElement.removeChild(document.querySelector('.support-container .support-video'));
                }
            }

            // Top Accordion
            if (this.validateFieldData(this.page_entry.topAccordionHeader, 'text')) {
                if (document.querySelector('.support-container .top-accordion-header') !== null) {
                    document.querySelector('.support-container .top-accordion-header').innerHTML = this.page_entry.topAccordionHeader;
                }
            } else {
                if (document.querySelector('.support-container .top-accordion-header') !== null) {
                    document.querySelector('.support-container .top-accordion-header').parentElement.removeChild(document.querySelector('.support-container .top-accordion-header'));
                }
            }

            if (this.validateFieldData(this.page_entry.topAccordion)) {
                if (document.querySelector('.support-container .page-content .top-accordion') !== null) {
                    document.querySelector('.support-container .page-content .top-accordion').appendChild(createAccordion(this.page_entry.topAccordion, 'top_accordion_item'));
                }
            } else {
                if (document.querySelector('.support-container .page-content .top-accordion') !== null) {
                    document.querySelector('.support-container .page-content .top-accordion').parentElement.removeChild(document.querySelector('.support-container .page-content .top-accordion'));
                }
            }

            // Subsection Accordion
            if (this.validateFieldData(this.page_entry.subsectionAccordionHeader, 'text')) {
                if (document.querySelector('.support-container .sub-accordion-header') !== null) {
                    document.querySelector('.support-container .sub-accordion-header').innerHTML = this.page_entry.subsectionAccordionHeader;
                }
            } else {
                if (document.querySelector('.support-container .sub-accordion-header') !== null) {
                    document.querySelector('.support-container .sub-accordion-header').parentElement.removeChild(document.querySelector('.support-container .sub-accordion-header'));
                }
            }

            if (this.validateFieldData(this.page_entry.subAccordion)) {
                if (document.querySelector('.support-container .page-content .sub-accordion') !== null) {
                    document.querySelector('.support-container .page-content .sub-accordion').appendChild(createAccordion(this.page_entry.subAccordion, 'sub_accordion_item'));
                }
            } else {
                if (document.querySelector('.support-container .page-content .sub-accordion') !== null) {
                    document.querySelector('.support-container .page-content .sub-accordion').parentElement.removeChild(document.querySelector('.support-container .page-content .sub-accordion'));
                }
            }

            // PDF files
            if (this.validateFieldData(this.page_entry.pdfHeader, 'text')) {
                if (document.querySelector('.support-container .pdf-header') !== null) {
                    document.querySelector('.support-container .pdf-header').innerHTML = this.page_entry.pdfHeader;
                }
            } else {
                if (document.querySelector('.support-container .pdf-header') !== null) {
                    document.querySelector('.support-container .pdf-header').parentElement.removeChild(document.querySelector('.support-container .pdf-header'));
                }
            }

            // PDF files
            if (this.validateFieldData(this.page_entry.pdfFiles, 'array')) {
                if (document.querySelector('.support-container .pdf-files') !== null) {
                    for (let i = 0; i < this.page_entry.pdfFiles.length; i++) {
                        if (this.validateFieldData(this.page_entry.pdfFiles[i], 'asset')) {
                            const divElem = document.createElement('div');
                            divElem.className = 'pdf-item';
                            divElem.innerHTML = `<div class="pdf-link"><a href="${this.page_entry.pdfFiles[i].fields.file.url}" target="_blank"><strong style="margin-right: 15px;">${this.page_entry.pdfFiles[i].fields.title}</strong><svg height="20" width="20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 330 330" style="enable-background:new 0 0 330 330;" xml:space="preserve">
    <g>
		<path d="M154.389,255.602c0.351,0.351,0.719,0.683,1.103,0.998c0.169,0.138,0.347,0.258,0.52,0.388
			c0.218,0.164,0.432,0.333,0.659,0.484c0.212,0.142,0.432,0.265,0.649,0.395c0.202,0.121,0.4,0.248,0.608,0.359
			c0.223,0.12,0.453,0.221,0.681,0.328c0.215,0.102,0.427,0.21,0.648,0.301c0.223,0.092,0.45,0.167,0.676,0.247
			c0.236,0.085,0.468,0.175,0.709,0.248c0.226,0.068,0.456,0.119,0.684,0.176c0.246,0.062,0.489,0.131,0.739,0.181
			c0.263,0.052,0.529,0.083,0.794,0.121c0.219,0.031,0.435,0.073,0.658,0.095c0.492,0.048,0.986,0.075,1.48,0.075
			c0.494,0,0.988-0.026,1.479-0.075c0.226-0.022,0.444-0.064,0.667-0.096c0.262-0.037,0.524-0.068,0.784-0.12
			c0.255-0.05,0.504-0.121,0.754-0.184c0.223-0.057,0.448-0.105,0.669-0.172c0.246-0.075,0.483-0.167,0.724-0.253
			c0.221-0.08,0.444-0.152,0.662-0.242c0.225-0.093,0.44-0.202,0.659-0.306c0.225-0.106,0.452-0.206,0.672-0.324
			c0.21-0.112,0.408-0.239,0.611-0.361c0.217-0.13,0.437-0.252,0.648-0.394c0.222-0.148,0.431-0.314,0.644-0.473
			c0.179-0.134,0.362-0.258,0.536-0.4c0.365-0.3,0.714-0.617,1.049-0.949c0.016-0.016,0.034-0.028,0.049-0.044l70.002-69.998
			c5.858-5.858,5.858-15.355,0-21.213c-5.857-5.857-15.355-5.858-21.213-0.001l-44.396,44.393V25c0-8.284-6.716-15-15-15
			c-8.284,0-15,6.716-15,15v183.785l-44.392-44.391c-5.857-5.858-15.355-5.858-21.213,0c-5.858,5.858-5.858,15.355,0,21.213
			L154.389,255.602z"/>
		<path d="M315,160c-8.284,0-15,6.716-15,15v115H30V175c0-8.284-6.716-15-15-15c-8.284,0-15,6.716-15,15v130
			c0,8.284,6.716,15,15,15h300c8.284,0,15-6.716,15-15V175C330,166.716,323.284,160,315,160z"/>
	</g>
</svg></a></div>`;

                            document.querySelector('.support-container .pdf-files').appendChild(divElem);
                        }
                    }
                }
            } else {
                if (document.querySelector('.support-container .pdf-files') !== null) {
                    document.querySelector('.support-container .pdf-files').parentElement.removeChild(document.querySelector('.support-container .pdf-files'));
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
