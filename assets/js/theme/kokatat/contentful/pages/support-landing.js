import ContentfulAbstract from '../contentful-abstract';

const showdown = require('showdown');

export default class ContentfulSupportLandingPage extends ContentfulAbstract {
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

            // Support Pages
            if (this.validateFieldData(this.page_entry.supportPages, 'array')) {
                if (document.querySelector('#support-links ul.account-navigation')) {
                    for (let i = 0; i < this.page_entry.supportPages.length; i++) {
                        const liElem = document.createElement('li');
                        liElem.className = 'navBar-item';
                        if (this.validateFieldData(this.page_entry.supportPages[i].fields.linkImage, 'image')) {
                            liElem.style.backgroundImage = `url('${this.page_entry.supportPages[i].fields.linkImage.fields.file.url}')`;
                        }
                        liElem.innerHTML = `<a class="navBar-action" href="${this.page_entry.supportPages[i].fields.slug}">${this.page_entry.supportPages[i].fields.title}</a>`;

                        document.querySelector('#support-links ul.account-navigation').appendChild(liElem);
                    }
                }
            }
        }
    }
}
