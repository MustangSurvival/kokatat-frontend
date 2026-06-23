import ContentfulAbstract from '../contentful-abstract';
import { convertVideoUrlToEmbed } from '../utility-functions';

const Slick = require('slick-carousel');
const showdown = require('showdown');

// Content Components
import MarqueeSlide from '../components/marquee-slide';

export default class ContentfulCustomSuitLandingPage extends ContentfulAbstract {
    constructor(context) {
        super(context);

        this.page_entry = null;
        if (window.Slick === 'undefined') window.Slick = Slick;
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
            // Marquee Slider
            if (document.querySelector('#custom_marquee.heroCarousel') !== null && this.validateFieldData(this.page_entry.marqueeSlider)) {
                const marqueePromises = [];
                for (let i = 0; i < this.page_entry.marqueeSlider.length; i++) {
                    marqueePromises.push(this.client.getEntry(this.page_entry.marqueeSlider[i].sys.id)
                        .then((entry) => entry)
                        .catch(console.error));
                }

                Promise.all(marqueePromises).then((entries) => {
                    // Maintain order of slides
                    for (let i = 0; i < entries.length; i++) {
                        const marqueeSlide = new MarqueeSlide(entries[i].sys.contentType.sys.id, entries[i].sys.id, entries[i].fields);
                        if (marqueeSlide !== null) {
                            document.querySelector('#custom_marquee.heroCarousel').appendChild(marqueeSlide);
                        }
                    }


                    document.querySelector('#custom_marquee.heroCarousel').querySelector('div').classList.add('heroCarousel-slide--first');
                    $(document.querySelector('#custom_marquee.heroCarousel')).slick({
                        arrows: true,
                        mobileFirst: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplay: false,
                        autoplaySpeed: 7000,
                        lazyLoad: 'anticipated',
                    });
                });
            }

            // Video
            if (this.validateFieldData(this.page_entry.video, 'text')) {
                if (document.querySelector('.cs-landing-content .custom-video') !== null) {
                    document.querySelector('.cs-landing-content .custom-video').innerHTML = convertVideoUrlToEmbed(this.page_entry.video);
                }
            } else {
                if (document.querySelector('.cs-landing-content .custom-video') !== null) {
                    document.querySelector('.cs-landing-content .custom-video').parentElement.removeChild(document.querySelector('.cs-landing-content .custom-video'));
                }
            }

            // Content
            if (this.validateFieldData(this.page_entry.content, 'text')) {
                if (document.querySelector('.cs-landing-content .copy-content') !== null) {
                    document.querySelector('.cs-landing-content .copy-content').innerHTML = converter.makeHtml(this.page_entry.content);
                }
            }
        }
    }
}
