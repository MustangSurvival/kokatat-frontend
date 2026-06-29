import ContentfulAbstract from '../contentful-abstract';

const Slick = require('slick-carousel');

// Content Components
import MarqueeSlide from '../components/marquee-slide';
import ProductCarousel from '../components/product-carousel';

export default class ContentfulHomePage extends ContentfulAbstract {
    constructor(context) {
        super(context);

        this.page_entry = null;
        if (window.Slick === 'undefined') window.Slick = Slick;
    }

    setEntryData(responseData) {
        const entryItems = responseData;
        this.page_entry = entryItems.fields;
    }

    populateContent() {
        if (this.page_entry !== null) {
            const applyDecorativeHeadingIconA11y = () => {
                const headingImages = document.querySelectorAll('h3 > img:not([alt])');

                headingImages.forEach((image) => {
                    image.setAttribute('alt', '');
                    image.setAttribute('role', 'presentation');
                });
            };

            // Hompage Marquee Slider
            if (document.querySelector('#homepage_marquee.heroCarousel') !== null && this.validateFieldData(this.page_entry.marqueeSlider)) {
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
                            document.querySelector('#homepage_marquee.heroCarousel').appendChild(marqueeSlide);
                        }
                    }


                    document.querySelector('#homepage_marquee.heroCarousel').querySelector('div').classList.add('heroCarousel-slide--first');
                    const $heroCarousel = $(document.querySelector('#homepage_marquee.heroCarousel'));
                    const syncHeroTabindex = (slider) => {
                        slider.find('.slick-slide').each(function () {
                            if (!$(this).attr('role')) $(this).attr('role', 'group');
                        });
                        slider.find('.slick-slide[aria-hidden="true"]').find('a, button, input, [tabindex]').attr('tabindex', '-1');
                        slider.find('.slick-slide:not([aria-hidden="true"])').find('a, button, input, [tabindex]').each(function () { $(this).removeAttr('tabindex'); });
                    };
                    $heroCarousel
                        .on('init afterChange', (e, slick) => syncHeroTabindex($(slick.$slider)))
                        .slick({
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

            // Top Links
            if (this.validateFieldData(this.page_entry.topLinks) && this.page_entry.topLinks.length > 0) {
                if (document.querySelector('#home-nav ul.nav-list') !== null) {
                    for (let i = 0; i < this.page_entry.topLinks.length; i++) {
                        const liElem = document.createElement('li');
                        liElem.className = 'list-item';
                        liElem.innerHTML = `<a href="${this.page_entry.topLinks[i].url}" title="${this.page_entry.topLinks[i].text}">${this.page_entry.topLinks[i].text}</a>`;

                        document.querySelector('#home-nav ul.nav-list').appendChild(liElem);
                    }
                }
            }

            // Content Blocks
            if (this.validateFieldData(this.page_entry.contentBlock1BackgroundImage, 'asset') && this.validateFieldData(this.page_entry.contentBlock1CtaText, 'text') && this.validateFieldData(this.page_entry.contentBlock1CtaUrl, 'text')) {
                if (document.querySelector('#cta_block_1 img') !== null) {
                    document.querySelector('#cta_block_1 img').src = this.page_entry.contentBlock1BackgroundImage.fields.file.url;

                    if (document.querySelector('#cta_block_1 .placeholder') !== null) {
                        document.querySelector('#cta_block_1 .placeholder').parentElement.removeChild(document.querySelector('#cta_block_1 .placeholder'));
                    }
                }
                if (document.querySelector('#cta_block_1 a.cta-button') !== null) {
                    document.querySelector('#cta_block_1 a.cta-button').href = this.page_entry.contentBlock1CtaUrl;
                    document.querySelector('#cta_block_1 a.cta-button').setAttribute('aria-label', this.page_entry.contentBlock1CtaText);
                    document.querySelector('#cta_block_1 a.cta-button').innerHTML = `<span>${this.page_entry.contentBlock1CtaText}</span>`;
                }
            } else {
                if (document.querySelector('#cta_block_1') !== null) {
                    document.querySelector('#cta_block_1').parentElement.removeChild(document.querySelector('#cta_block_1'));
                }
            }

            if (this.validateFieldData(this.page_entry.contentBlock2Image, 'asset') && this.validateFieldData(this.page_entry.contentBlock2Headline) && this.validateFieldData(this.page_entry.contentBlock2CtaText, 'text') && this.validateFieldData(this.page_entry.contentBlock2CtaUrl, 'text')) {
                if (document.querySelector('#cta_block_2 .text-cta .cta-description img') !== null) {
                    document.querySelector('#cta_block_2 .text-cta .cta-description img').src = this.page_entry.contentBlock2Image.fields.file.url;

                    if (document.querySelector('#cta_block_2 .text-cta .cta-description .placeholder') !== null) {
                        document.querySelector('#cta_block_2 .text-cta .cta-description .placeholder').parentElement.removeChild(document.querySelector('#cta_block_2 .text-cta .cta-description .placeholder'));
                    }
                }
                if (document.querySelector('#cta_block_2 .text-cta .cta-description h4') !== null) {
                    document.querySelector('#cta_block_2 .text-cta .cta-description h4').innerHTML = this.page_entry.contentBlock2Headline;
                }
                if (document.querySelector('#cta_block_2 .text-cta .cta-description a.text-link') !== null) {
                    document.querySelector('#cta_block_2 .text-cta .cta-description a.text-link').href = this.page_entry.contentBlock2CtaUrl;
                    document.querySelector('#cta_block_2 .text-cta .cta-description a.text-link').setAttribute('aria-label', this.page_entry.contentBlock2CtaText);
                    document.querySelector('#cta_block_2 .text-cta .cta-description a.text-link').innerHTML = this.page_entry.contentBlock2CtaText;
                }
            } else {
                if (document.querySelector('#cta_block_2') !== null) {
                    document.querySelector('#cta_block_2').parentElement.removeChild(document.querySelector('#cta_block_2'));
                }
            }

            if (this.validateFieldData(this.page_entry.contentBlock3BackgroundImage, 'asset') && this.validateFieldData(this.page_entry.contentBlock3CtaText, 'text') && this.validateFieldData(this.page_entry.contentBlock3CtaUrl, 'text')) {
                if (document.querySelector('#cta_block_3 img') !== null) {
                    document.querySelector('#cta_block_3 img').src = this.page_entry.contentBlock3BackgroundImage.fields.file.url;

                    if (document.querySelector('#cta_block_3 .placeholder') !== null) {
                        document.querySelector('#cta_block_3 .placeholder').parentElement.removeChild(document.querySelector('#cta_block_3 .placeholder'));
                    }
                }
                if (document.querySelector('#cta_block_3 a.cta-button') !== null) {
                    document.querySelector('#cta_block_3 a.cta-button').href = this.page_entry.contentBlock3CtaUrl;
                    document.querySelector('#cta_block_3 a.cta-button').setAttribute('aria-label', this.page_entry.contentBlock3CtaText);
                    document.querySelector('#cta_block_3 a.cta-button').innerHTML = `<span>${this.page_entry.contentBlock3CtaText}</span>`;
                }
            } else {
                if (document.querySelector('#cta_block_3') !== null) {
                    if (document.querySelector('#cta_block_3').closest('.cta-row') !== null) {
                        document.querySelector('#cta_block_3').closest('.cta-row').classList.remove('reverse');
                    }
                    document.querySelector('#cta_block_3').parentElement.removeChild(document.querySelector('#cta_block_3'));
                }
            }

            if (this.validateFieldData(this.page_entry.contentBlock4Image, 'asset') && this.validateFieldData(this.page_entry.contentBlock4Headline) && this.validateFieldData(this.page_entry.contentBlock4CtaText, 'text') && this.validateFieldData(this.page_entry.contentBlock4CtaUrl, 'text')) {
                if (document.querySelector('#cta_block_4 .text-cta .cta-description img') !== null) {
                    document.querySelector('#cta_block_4 .text-cta .cta-description img').src = this.page_entry.contentBlock4Image.fields.file.url;

                    if (document.querySelector('#cta_block_4 .text-cta .cta-description .placeholder') !== null) {
                        document.querySelector('#cta_block_4 .text-cta .cta-description .placeholder').parentElement.removeChild(document.querySelector('#cta_block_4 .text-cta .cta-description .placeholder'));
                    }
                }
                if (document.querySelector('#cta_block_4 .text-cta .cta-description h4') !== null) {
                    document.querySelector('#cta_block_4 .text-cta .cta-description h4').innerHTML = this.page_entry.contentBlock4Headline;
                }
                if (document.querySelector('#cta_block_4 .text-cta .cta-description a.text-link') !== null) {
                    document.querySelector('#cta_block_4 .text-cta .cta-description a.text-link').href = this.page_entry.contentBlock4CtaUrl;
                    document.querySelector('#cta_block_4 .text-cta .cta-description a.text-link').setAttribute('aria-label', this.page_entry.contentBlock4CtaText);
                    document.querySelector('#cta_block_4 .text-cta .cta-description a.text-link').innerHTML = this.page_entry.contentBlock4CtaText;
                }
            } else {
                if (document.querySelector('#cta_block_4') !== null) {
                    if (document.querySelector('#cta_block_4').closest('.cta-row') !== null) {
                        document.querySelector('#cta_block_4').closest('.cta-row').classList.remove('reverse');
                    }
                    document.querySelector('#cta_block_4').parentElement.removeChild(document.querySelector('#cta_block_4'));
                }
            }

            // Black banner
            if (this.validateFieldData(this.page_entry.blackBannerHeadline, 'text') && this.validateFieldData(this.page_entry.blackBannerCopy, 'text') && this.validateFieldData(this.page_entry.blackBannerCtaText, 'text') && this.validateFieldData(this.page_entry.blackBannerCtaUrl, 'text')) {
                if (document.querySelector('#home-banner .banner-cta') !== null) {
                    document.querySelector('#home-banner .banner-cta').innerHTML = this.page_entry.blackBannerHeadline;
                }
                if (document.querySelector('#home-banner p') !== null) {
                    document.querySelector('#home-banner p').innerHTML = this.page_entry.blackBannerCopy;
                }
                if (document.querySelector('#home-banner a.text-link') !== null) {
                    document.querySelector('#home-banner a.text-link').href = this.page_entry.blackBannerCtaUrl;
                    document.querySelector('#home-banner a.text-link').setAttribute('aria-label', this.page_entry.blackBannerCtaText);
                    document.querySelector('#home-banner a.text-link').innerHTML = this.page_entry.blackBannerCtaText;
                }
            } else {
                if (document.querySelector('#home-banner') !== null) {
                    document.querySelector('#home-banner').parentElement.removeChild(document.querySelector('#home-banner'));
                }
            }

            // Featured Category section
            if (this.validateFieldData(this.page_entry.featuredCategories) && this.page_entry.featuredCategories.length > 0) {
                if (document.querySelector('#home-featured')) {
                    if (document.querySelector('#home-featured button.hf-left-arrow')) {
                        document.querySelector('#home-featured button.hf-left-arrow').setAttribute('aria-label', 'Previous featured category');
                        document.querySelector('#home-featured button.hf-left-arrow').setAttribute('title', 'Previous featured category');
                        document.querySelector('#home-featured button.hf-left-arrow').addEventListener('click', () => {
                            const activeIndex = document.querySelector('#featured_category_nav li.active') !== null ? parseInt(document.querySelector('#featured_category_nav li.active').dataset.index, 10) : null;
                            const lastIndex = document.querySelectorAll('#featured_category_nav li').length > 0 ? document.querySelectorAll('#featured_category_nav li').length - 1 : null;
                            const carouselsExist = document.querySelectorAll('#featured_category_carousels li').length > 0;

                            if (activeIndex !== null && lastIndex !== null && carouselsExist) {
                                document.querySelector('#featured_category_nav li.active').classList.remove('active');
                                document.querySelector('#featured_category_carousels li.active').classList.remove('active');
                                if (activeIndex === 0) {
                                    document.querySelectorAll('#featured_category_nav li')[lastIndex].classList.add('active');
                                    document.querySelectorAll('#featured_category_carousels li')[lastIndex].classList.add('active');
                                    $(`#featured_category_carousels li[data-index="${lastIndex}"] .product-slider`).slick('setPosition');
                                } else {
                                    document.querySelectorAll('#featured_category_nav li')[activeIndex - 1].classList.add('active');
                                    document.querySelectorAll('#featured_category_carousels li')[activeIndex - 1].classList.add('active');
                                    $(`#featured_category_carousels li[data-index="${activeIndex - 1}"] .product-slider`).slick('setPosition');
                                }
                            }
                        });
                    }

                    if (document.querySelector('#home-featured button.hf-right-arrow')) {
                        document.querySelector('#home-featured button.hf-right-arrow').setAttribute('aria-label', 'Next featured category');
                        document.querySelector('#home-featured button.hf-right-arrow').setAttribute('title', 'Next featured category');
                        document.querySelector('#home-featured button.hf-right-arrow').addEventListener('click', () => {
                            const activeIndex = document.querySelector('#featured_category_nav li.active') !== null ? parseInt(document.querySelector('#featured_category_nav li.active').dataset.index, 10) : null;
                            const lastIndex = document.querySelectorAll('#featured_category_nav li').length > 0 ? document.querySelectorAll('#featured_category_nav li').length - 1 : null;
                            const carouselsExist = document.querySelectorAll('#featured_category_carousels li').length > 0;

                            if (activeIndex !== null && lastIndex !== null && carouselsExist) {
                                document.querySelector('#featured_category_nav li.active').classList.remove('active');
                                document.querySelector('#featured_category_carousels li.active').classList.remove('active');
                                if (activeIndex === lastIndex) {
                                    document.querySelectorAll('#featured_category_nav li')[0].classList.add('active');
                                    document.querySelectorAll('#featured_category_carousels li')[0].classList.add('active');
                                    $('#featured_category_carousels li[data-index="0"] .product-slider').slick('setPosition');
                                } else {
                                    document.querySelectorAll('#featured_category_nav li')[activeIndex + 1].classList.add('active');
                                    document.querySelectorAll('#featured_category_carousels li')[activeIndex + 1].classList.add('active');
                                    $(`#featured_category_carousels li[data-index="${activeIndex + 1}"] .product-slider`).slick('setPosition');
                                }
                            }
                        });
                    }

                    for (let i = 0; i < this.page_entry.featuredCategories.length; i++) {
                        const navItem = document.createElement('li');
                        if (i === 0) {
                            navItem.classList.add('active');
                        }
                        navItem.setAttribute('data-index', i);
                        navItem.innerHTML = `<span class="featured-title">${this.page_entry.featuredCategories[i].fields.featuredProductsHeadline}</span>`;
                        if (document.querySelector('#featured_category_nav') !== null) {
                            document.querySelector('#featured_category_nav').appendChild(navItem);
                        }

                        const carouselItem = document.createElement('li');
                        if (i === 0) {
                            carouselItem.classList.add('active');
                        }
                        carouselItem.setAttribute('data-index', i);
                        const productCarousel = new ProductCarousel('productCarousel', this.page_entry.featuredCategories[i].sys.id, this.page_entry.featuredCategories[i].fields.featuredProductsV2, this.context.bearerToken);
                        if (productCarousel !== null) {
                            carouselItem.appendChild(productCarousel);
                            const viewAllLink = document.createElement('div');
                            viewAllLink.className = 'view-all';
                            viewAllLink.innerHTML = `<a href="${this.page_entry.featuredCategories[i].fields.slug}" class="text-link"><span>view all</span></a>`;
                            carouselItem.appendChild(viewAllLink);
                            if (document.querySelector('#featured_category_carousels') !== null) {
                                document.querySelector('#featured_category_carousels').appendChild(carouselItem);
                            }
                        }
                    }
                }
            }

            // Custom Suit section
            if (this.validateFieldData(this.page_entry.customBlockLeftImage, 'asset')) {
                if (document.querySelector('#home-csb-banner img.left-image') !== null) {
                    document.querySelector('#home-csb-banner img.left-image').src = this.page_entry.customBlockLeftImage.fields.file.url;
                }
            }
            if (this.validateFieldData(this.page_entry.customBlockRightImage, 'asset')) {
                if (document.querySelector('#home-csb-banner img.right-image') !== null) {
                    document.querySelector('#home-csb-banner img.right-image').src = this.page_entry.customBlockRightImage.fields.file.url;
                }
            }
            if (this.validateFieldData(this.page_entry.customBlockHeadline, 'text')) {
                if (document.querySelector('#home-csb-banner .home-csb-subhead') !== null) {
                    document.querySelector('#home-csb-banner .home-csb-subhead').innerHTML = this.page_entry.customBlockHeadline;
                }
            }
            if (this.validateFieldData(this.page_entry.customBlockSubhead, 'text')) {
                if (document.querySelector('#home-csb-banner .home-csb-title') !== null) {
                    document.querySelector('#home-csb-banner .home-csb-title').innerHTML = this.page_entry.customBlockSubhead;
                }
            }
            if (this.validateFieldData(this.page_entry.customBlockCopy, 'text')) {
                if (document.querySelector('#home-csb-banner .home-csb-description') !== null) {
                    document.querySelector('#home-csb-banner .home-csb-description').innerHTML = this.page_entry.customBlockCopy;
                }
            }
            if (this.validateFieldData(this.page_entry.customBlockCtaText, 'text') && this.validateFieldData(this.page_entry.customBlockCtaUrl, 'text')) {
                if (document.querySelector('#home-csb-banner .primary-button') !== null) {
                    document.querySelector('#home-csb-banner .primary-button').href = this.page_entry.customBlockCtaUrl;
                    document.querySelector('#home-csb-banner .primary-button').setAttribute('aria-label', this.page_entry.customBlockCtaText);
                    document.querySelector('#home-csb-banner .primary-button').innerHTML = `<span>${this.page_entry.customBlockCtaText}</span>`;
                }
            }

            // Featured Posts/Team
            if (this.validateFieldData(this.page_entry.featureContentBlock1Image, 'asset') && this.validateFieldData(this.page_entry.featureContentBlock1CtaText, 'text') && this.validateFieldData(this.page_entry.featureContentBlock1CtaUrl, 'text')) {
                if (document.querySelector('#home-blog-cta .home-blog-left .home-blog-image') !== null) {
                    document.querySelector('#home-blog-cta .home-blog-left .home-blog-image').src = this.page_entry.featureContentBlock1Image.fields.file.url;

                    if (document.querySelector('#home-blog-cta .home-blog-left .placeholder') !== null) {
                        document.querySelector('#home-blog-cta .home-blog-left .placeholder').parentElement.removeChild(document.querySelector('#home-blog-cta .home-blog-left .placeholder'));
                    }
                }
                if (this.validateFieldData(this.page_entry.featureContentBlock1Headline, 'text') && document.querySelector('#home-blog-cta .home-blog-left .home-blog-subhead') !== null) {
                    document.querySelector('#home-blog-cta .home-blog-left .home-blog-subhead').innerHTML = this.page_entry.featureContentBlock1Headline;
                }
                if (this.validateFieldData(this.page_entry.featureContentBlock1Subhead, 'text') && document.querySelector('#home-blog-cta .home-blog-left .home-blog-title') !== null) {
                    document.querySelector('#home-blog-cta .home-blog-left .home-blog-title').innerHTML = this.page_entry.featureContentBlock1Subhead;
                }
                if (this.validateFieldData(this.page_entry.featureContentBlock1Copy, 'text') && document.querySelector('#home-blog-cta .home-blog-left .home-blog-description') !== null) {
                    document.querySelector('#home-blog-cta .home-blog-left .home-blog-description').innerHTML = this.page_entry.featureContentBlock1Copy;
                }
                if (document.querySelector('#home-blog-cta .home-blog-left a.text-link') !== null) {
                    document.querySelector('#home-blog-cta .home-blog-left a.text-link').href = this.page_entry.featureContentBlock1CtaUrl;
                    document.querySelector('#home-blog-cta .home-blog-left a.text-link').setAttribute('aria-label', this.page_entry.featureContentBlock1CtaText);
                    document.querySelector('#home-blog-cta .home-blog-left a.text-link').innerHTML = `<span>${this.page_entry.featureContentBlock1CtaText}</span>`;
                }
            }

            if (this.validateFieldData(this.page_entry.featureContentBlock2Image, 'asset') && this.validateFieldData(this.page_entry.featureContentBlock2CtaText, 'text') && this.validateFieldData(this.page_entry.featureContentBlock2CtaUrl, 'text')) {
                if (document.querySelector('#home-blog-cta .home-blog-right .home-blog-image') !== null) {
                    document.querySelector('#home-blog-cta .home-blog-right .home-blog-image').src = this.page_entry.featureContentBlock2Image.fields.file.url;

                    if (document.querySelector('#home-blog-cta .home-blog-right .placeholder') !== null) {
                        document.querySelector('#home-blog-cta .home-blog-right .placeholder').parentElement.removeChild(document.querySelector('#home-blog-cta .home-blog-right .placeholder'));
                    }
                }
                if (this.validateFieldData(this.page_entry.featureContentBlock2Headline, 'text') && document.querySelector('#home-blog-cta .home-blog-right .home-blog-subhead') !== null) {
                    document.querySelector('#home-blog-cta .home-blog-right .home-blog-subhead').innerHTML = this.page_entry.featureContentBlock2Headline;
                }
                if (this.validateFieldData(this.page_entry.featureContentBlock2Subhead, 'text') && document.querySelector('#home-blog-cta .home-blog-right .home-blog-title') !== null) {
                    document.querySelector('#home-blog-cta .home-blog-right .home-blog-title').innerHTML = this.page_entry.featureContentBlock2Subhead;
                }
                if (this.validateFieldData(this.page_entry.featureContentBlock2Copy, 'text') && document.querySelector('#home-blog-cta .home-blog-right .home-blog-description') !== null) {
                    document.querySelector('#home-blog-cta .home-blog-right .home-blog-description').innerHTML = this.page_entry.featureContentBlock2Copy;
                }
                if (document.querySelector('#home-blog-cta .home-blog-right a.text-link') !== null) {
                    document.querySelector('#home-blog-cta .home-blog-right a.text-link').href = this.page_entry.featureContentBlock2CtaUrl;
                    document.querySelector('#home-blog-cta .home-blog-right a.text-link').setAttribute('aria-label', this.page_entry.featureContentBlock2CtaText);
                    document.querySelector('#home-blog-cta .home-blog-right a.text-link').innerHTML = `<span>${this.page_entry.featureContentBlock2CtaText}</span>`;
                }
            }

            applyDecorativeHeadingIconA11y();
        }
    }
}
