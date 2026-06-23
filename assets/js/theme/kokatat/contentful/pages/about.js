import ContentfulAbstract from '../contentful-abstract';
import { convertVideoUrlToEmbed } from '../utility-functions';

const showdown = require('showdown');

export default class ContentfulAboutPage extends ContentfulAbstract {
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

            // Top Section
            if (this.validateFieldData(this.page_entry.topSection, 'text')) {
                if (document.querySelector('.about-container .top-section') !== null) {
                    document.querySelector('.about-container .top-section').innerHTML = converter.makeHtml(this.page_entry.topSection);
                }
            } else {
                if (document.querySelector('.about-container .top-section') !== null) {
                    document.querySelector('.about-container .top-section').parentElement.removeChild(document.querySelector('.about-container .top-section'));
                }
            }

            // Video
            if (this.validateFieldData(this.page_entry.video, 'text')) {
                if (document.querySelector('.about-container .about-video') !== null) {
                    document.querySelector('.about-container .about-video').innerHTML = convertVideoUrlToEmbed(this.page_entry.video);
                }
            } else {
                if (document.querySelector('.about-container .about-video') !== null) {
                    document.querySelector('.about-container .about-video').parentElement.removeChild(document.querySelector('.about-container .about-video'));
                }
            }

            // About Sections
            if (this.validateFieldData(this.page_entry.aboutSections, 'text')) {
                if (document.querySelector('.about-container .about-sections') !== null) {
                    document.querySelector('.about-container .about-sections').innerHTML = converter.makeHtml(this.page_entry.aboutSections);
                }
            } else {
                if (document.querySelector('.about-container .about-sections') !== null) {
                    document.querySelector('.about-container .about-sections').parentElement.removeChild(document.querySelector('.about-container .about-sections'));
                }
            }
        }
    }
}
