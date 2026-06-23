import ContentfulAbstract from '../contentful-abstract';

const showdown = require('showdown');

export default class ContentfulTermsPrivacyPage extends ContentfulAbstract {
    constructor(context) {
        super(context);

        this.page_entry = null;
    }

    setEntryData(responseData) {
        const entryItems = responseData.items;
        this.page_entries = entryItems;
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

            // Header
            if (this.validateFieldData(this.page_entry.header, 'text')) {
                if (document.querySelector('.page-content .header') !== null) {
                    document.querySelector('.page-content .header').innerHTML = this.page_entry.header;
                }
            } else {
                if (document.querySelector('.page-content .header') !== null) {
                    document.querySelector('.page-content .header').parentElement.removeChild(document.querySelector('.support-container .header'));
                }
            }

            // Content
            if (this.validateFieldData(this.page_entry.copy, 'text')) {
                if (document.querySelector('.page-content .copy') !== null) {
                    document.querySelector('.page-content .copy').innerHTML = converter.makeHtml(this.page_entry.copy);
                }
            }
        }
    }
}
