import ContentfulAbstract from '../contentful-abstract';

/* Content Components */
import OnsiteAd from '../components/onsite-ad';

const showdown = require('showdown');

export default class ContentfulCategory extends ContentfulAbstract {
    constructor(context) {
        super(context);

        this.category_entries = [];
        this.category_entry = null;
    }

    setEntryData(responseData) {
        const entryItems = responseData.items;
        this.category_entries = entryItems;
        const pageSlug = location.pathname;

        for (let i = 0; i < entryItems.length; i++) {
            if (entryItems[i].fields.slug === pageSlug) {
                this.category_entry = entryItems[i].fields;
                break;
            }
        }
    }

    populateContent() {
        const converter = new showdown.Converter();

        if (this.category_entry !== null) {
            if (this.validateFieldData(this.category_entry.marqueeImage) && this.validateFieldData(this.category_entry.marqueeImage.fields.image, 'asset')) {
                if (document.querySelector('.category-marquee') !== null) {
                    document.querySelector('.category-marquee').style.backgroundImage = `url('${this.category_entry.marqueeImage.fields.image.fields.file.url}')`;
                    this.calculateImageFocus();
                    window.addEventListener('resize', (e) => { e.preventDefault(); this.calculateImageFocus(); });
                }
            }

            if (this.validateFieldData(this.category_entry.headline) && this.validateFieldData(this.category_entry.seoMetaDescription)) {
                if (document.querySelector('.category-description') !== null) {
                    document.querySelector('.category-description').innerHTML = `<h4>${this.category_entry.headline}</h4><p>${this.category_entry.seoMetaDescription}`;
                }
            }
            if (this.validateFieldData(this.category_entry.onSiteAds) && this.category_entry.onSiteAds.length > 0) {
                if (document.querySelector('.productGrid') !== null) {
                    for (let i = 0; i < this.category_entry.onSiteAds.length; i++) {
                        const injectIndex = this.validateFieldData(this.category_entry.onSiteAds[i].fields.placement) ? parseInt(this.category_entry.onSiteAds[i].fields.placement, 0) - 1 : null;
                        const productItems = document.querySelectorAll('.productGrid li.product');

                        if (injectIndex !== null && injectIndex >= 0) {
                            if (typeof productItems[injectIndex] !== 'undefined') {
                                productItems[injectIndex].before(new OnsiteAd(this.category_entry.onSiteAds[i].sys.contentType.sys.id, this.category_entry.onSiteAds[i].sys.id, this.category_entry.onSiteAds[i].fields));
                            } else {
                                productItems[productItems.length - 1].after(new OnsiteAd(this.category_entry.onSiteAds[i].sys.contentType.sys.id, this.category_entry.onSiteAds[i].sys.id, this.category_entry.onSiteAds[i].fields));
                            }
                        }
                    }
                }
            }
            if (this.validateFieldData(this.category_entry.seoTextCopy) !== null) {
                if (document.querySelector('#seoText .page-content .copy') !== null) {
                    document.querySelector('#seoText').removeAttribute('hidden');
                    document.querySelector('#seoText .page-content .copy').innerHTML = converter.makeHtml(this.category_entry.seoTextCopy);

                    document.querySelector('#seoText button').addEventListener('click', (e)=> {
                        document.querySelector('#seoText .page-content').classList.toggle('expand');
                        if ( document.querySelector('#seoText .page-content').classList.contains('expand')) {
                            e.target.innerHTML='Collapse';
                        } else {
                            e.target.innerHTML='Expand';
                        }
                    })
                    
                }
                
            }

            if (document.querySelector('#seoText .page-content .copy').innerHTML == 'undefined') {
                document.querySelector('#seoText').setAttribute('hidden', "");
            }
    
        } else {
            if (typeof this.fallback_data !== 'undefined' && this.fallback_data !== null) {
                // TODO use fallback data to populate page.
            }
        }
    }

    calculateImageFocus() {
        const imageWidth = this.category_entry.marqueeImage.fields.image.fields.file.details.image.width;
        const imageHeight = this.category_entry.marqueeImage.fields.image.fields.file.details.image.height;
        const focalX = this.category_entry.marqueeImage.fields.focalPoint.focalPoint.x;
        const elemWidth = document.querySelector('.category-marquee').clientWidth;
        const elemHeight = document.querySelector('.category-marquee').clientHeight;
        const imageHeightPercent = (imageHeight / imageWidth) * 100;
        const elemHeightPercent = (elemHeight / elemWidth) * 100;
        const c = (focalX / imageWidth) * 100;
        const z = ((imageWidth / imageHeight) * elemHeight) / elemWidth;

        document.querySelector('.category-marquee').style.backgroundSize = elemHeightPercent < imageHeightPercent ? '100% auto' : 'auto 100%';
        if (elemHeightPercent > 60) {
            document.querySelector('.category-marquee').style.backgroundPositionX = `calc(${((c + (50 - 50) / z - 50) * (z / (z - 1)) + 50)} * 1%)`;
        }
    }
}
