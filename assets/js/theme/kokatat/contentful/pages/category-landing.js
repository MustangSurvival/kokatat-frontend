import ContentfulAbstract from '../contentful-abstract';

const Slick = require('slick-carousel');

// Content Components
import ProductCarousel from '../components/product-carousel';
import FeatureGrid from '../components/feature-grid';
import FeaturedBlogPost from '../components/featured-blog-post';
import FeaturedExpedition from '../components/featured-expedition';
import { getProductIdFromSku } from '../utility-functions';


export default class ContentfulCategoryLandingPage extends ContentfulAbstract {
    constructor(context) {
        super(context);

        this.page_entry = null;
        if (window.Slick === 'undefined') window.Slick = Slick;
    }

    setEntryData(responseData) {
        const entryItems = responseData.items;
        this.page_entries = entryItems;
        const pageSlug = location.pathname.split('/')[location.pathname.split('/').length - 2];

        for (let i = 0; i < entryItems.length; i++) {
            if (entryItems[i].fields.slug === pageSlug) {
                this.page_entry = entryItems[i].fields;
                break;
            }
        }
    }

    async populateContent() {
        if (this.page_entry !== null) {
            // Marquee
            if (this.validateFieldData(this.page_entry.marqueeImage) && this.validateFieldData(this.page_entry.marqueeImage.fields.image, 'asset')) {
                if (document.querySelector('.category-marquee') !== null) {
                    document.querySelector('.category-marquee').style.backgroundImage = `url('${this.page_entry.marqueeImage.fields.image.fields.file.url}')`;
                }

                if (this.validateFieldData(this.page_entry.headline, 'text')) {
                    if (document.querySelector('.category-marquee .marquee-text .page-heading') !== null) {
                        document.querySelector('.category-marquee .marquee-text .page-heading').innerHTML = this.page_entry.headline;
                    }
                }

                if (this.validateFieldData(this.page_entry.subhead, 'text')) {
                    if (document.querySelector('.category-marquee .marquee-text .text-copy') !== null) {
                        document.querySelector('.category-marquee .marquee-text .text-copy').innerHTML = this.page_entry.subhead;
                    }
                }
            }

            // Top Links
            if (this.validateFieldData(this.page_entry.topLinks) && this.page_entry.topLinks.length > 0) {
                if (document.querySelector('.category-nav ul.nav-list') !== null) {
                    for (let i = 0; i < this.page_entry.topLinks.length; i++) {
                        const liElem = document.createElement('li');
                        liElem.className = 'list-item';
                        liElem.innerHTML = `<a href="${this.page_entry.topLinks[i].url}" title="${this.page_entry.topLinks[i].text}">${this.page_entry.topLinks[i].text}</a>`;

                        document.querySelector('.category-nav ul.nav-list').appendChild(liElem);
                    }
                }
            }

            // Featured Category Carousel
            if (this.validateFieldData(this.page_entry.featuredCategory)) {
                if (document.querySelector('#featured_category')) {
                    const productCarousel = new ProductCarousel('productCarousel', this.page_entry.featuredCategory.sys.id, this.page_entry.featuredCategory.fields.featuredProductsV2 , this.context.bearerToken);
                    if (productCarousel !== null) {
                        if (document.querySelector('#featured_category .featured-title') !== null) {
                            document.querySelector('#featured_category .featured-title').innerHTML = this.page_entry.featuredCategory.fields.featuredProductsHeadline;
                        }
                        if (document.querySelector('#featured_category .carousel-wrapper') !== null) {
                            document.querySelector('#featured_category .carousel-wrapper').appendChild(productCarousel);
                            const viewAllLink = document.createElement('div');
                            viewAllLink.className = 'view-all';
                            viewAllLink.innerHTML = `<a href="${this.page_entry.featuredCategory.fields.slug}" class="text-link"><span>view all</span></a>`;
                            document.querySelector('#featured_category .carousel-wrapper').appendChild(viewAllLink);
                        }
                    }
                }
            }

            // Feature Grid
            if (this.validateFieldData(this.page_entry.featureGrid) && this.page_entry.featureGrid.length > 0) {
                if (document.querySelector('#category_blocks') !== null) {
                    for (let i = 0; i < this.page_entry.featureGrid.length; i++) {
                        const featureGrid = new FeatureGrid(this.page_entry.featureGrid[i].sys.contentType.sys.id, this.page_entry.featureGrid[i].sys.id, this.page_entry.featureGrid[i].fields);
                        if (featureGrid !== null) {
                            if (i % 2 === 0) {
                                featureGrid.classList.add('odd');
                            } else {
                                featureGrid.classList.add('even');
                            }

                            if (document.querySelector('#category_blocks .feature-grid-wrapper') !== null) {
                                document.querySelector('#category_blocks .feature-grid-wrapper').appendChild(featureGrid);
                            }
                        }
                    }
                }
            }

            // Featured Blog Post
            if (this.validateFieldData(this.page_entry.featuredBlogPost)) {
                if (document.querySelector('#cat-featured-story') !== null) {
                    const featuredBlogPost = new FeaturedBlogPost('featuredBlogPost', this.page_entry.featuredBlogPost.sys.id, this.page_entry.featuredBlogPost.fields);
                    if (featuredBlogPost !== null) {
                        document.querySelector('#cat-featured-story').appendChild(featuredBlogPost);
                    }
                }
            }

            // Featured Expedition
            if (this.validateFieldData(this.page_entry.featuredExpedition)) {
                if (document.querySelector('#cat-featured-expedition') !== null) {
                    const featuredExpedition = new FeaturedExpedition('featuredExpedition', this.page_entry.featuredExpedition.sys.id, this.page_entry.featuredExpedition.fields);
                    if (featuredExpedition !== null) {
                        document.querySelector('#cat-featured-expedition').appendChild(featuredExpedition);
                    }
                }
            }

            // Featured Product Carousels
            if (this.validateFieldData(this.page_entry.productBlocks) && this.page_entry.productBlocks.length > 0) {
                if (document.querySelector('#featured_products')) {
                    if (document.querySelector('#featured_products button.hf-left-arrow')) {
                        document.querySelector('#featured_products button.hf-left-arrow').setAttribute('aria-label', 'Previous featured products');
                        document.querySelector('#featured_products button.hf-left-arrow').setAttribute('title', 'Previous featured products');
                        document.querySelector('#featured_products button.hf-left-arrow').addEventListener('click', () => {
                            const activeIndex = document.querySelector('#featured_product_nav li.active') !== null ? parseInt(document.querySelector('#featured_product_nav li.active').dataset.index, 10) : null;
                            const lastIndex = document.querySelectorAll('#featured_product_nav li').length > 0 ? document.querySelectorAll('#featured_product_nav li').length - 1 : null;
                            const carouselsExist = document.querySelectorAll('#featured_product_carousels li').length > 0;

                            if (activeIndex !== null && lastIndex !== null && carouselsExist) {
                                document.querySelector('#featured_product_nav li.active').classList.remove('active');
                                document.querySelector('#featured_product_carousels li.active').classList.remove('active');
                                if (activeIndex === 0) {
                                    document.querySelectorAll('#featured_product_nav li')[lastIndex].classList.add('active');
                                    document.querySelectorAll('#featured_product_carousels li')[lastIndex].classList.add('active');
                                    $(`#featured_product_carousels li[data-index="${lastIndex}"] .product-slider`).slick('setPosition');
                                } else {
                                    document.querySelectorAll('#featured_product_nav li')[activeIndex - 1].classList.add('active');
                                    document.querySelectorAll('#featured_product_carousels li')[activeIndex - 1].classList.add('active');
                                    $(`#featured_product_carousels li[data-index="${activeIndex - 1}"] .product-slider`).slick('setPosition');
                                }
                            }
                        });
                    }

                    if (document.querySelector('#featured_products button.hf-right-arrow')) {
                        document.querySelector('#featured_products button.hf-right-arrow').setAttribute('aria-label', 'Next featured products');
                        document.querySelector('#featured_products button.hf-right-arrow').setAttribute('title', 'Next featured products');
                        document.querySelector('#featured_products button.hf-right-arrow').addEventListener('click', () => {
                            const activeIndex = document.querySelector('#featured_product_nav li.active') !== null ? parseInt(document.querySelector('#featured_product_nav li.active').dataset.index, 10) : null;
                            const lastIndex = document.querySelectorAll('#featured_product_nav li').length > 0 ? document.querySelectorAll('#featured_product_nav li').length - 1 : null;
                            const carouselsExist = document.querySelectorAll('#featured_product_carousels li').length > 0;

                            if (activeIndex !== null && lastIndex !== null && carouselsExist) {
                                document.querySelector('#featured_product_nav li.active').classList.remove('active');
                                document.querySelector('#featured_product_carousels li.active').classList.remove('active');
                                if (activeIndex === lastIndex) {
                                    document.querySelectorAll('#featured_product_nav li')[0].classList.add('active');
                                    document.querySelectorAll('#featured_product_carousels li')[0].classList.add('active');
                                    $('#featured_category_carousels li[data-index="0"] .product-slider').slick('setPosition');
                                } else {
                                    document.querySelectorAll('#featured_product_nav li')[activeIndex + 1].classList.add('active');
                                    document.querySelectorAll('#featured_product_carousels li')[activeIndex + 1].classList.add('active');
                                    $(`#featured_product_carousels li[data-index="${activeIndex + 1}"] .product-slider`).slick('setPosition');
                                }
                            }
                        });
                    }

                    for (let i = 0; i < this.page_entry.productBlocks.length; i++) {
                        const navItem = document.createElement('li');
                        if (i === 0) {
                            navItem.classList.add('active');
                        }
                        navItem.setAttribute('data-index', i);
                        navItem.innerHTML = `<span class="featured-title">${this.page_entry.productBlocks[i].fields.blockLabel}</span>`;
                        if (document.querySelector('#featured_product_nav') !== null) {
                            document.querySelector('#featured_product_nav').appendChild(navItem);
                        }

                        const carouselItem = document.createElement('li');
                        if (i === 0) {
                            carouselItem.classList.add('active');
                        }
                        carouselItem.setAttribute('data-index', i);
                        const productCarousel = new ProductCarousel('productCarousel', this.page_entry.productBlocks[i].sys.id, this.page_entry.productBlocks[i].fields.blockProductsV2, this.context.bearerToken);
                        if (productCarousel !== null) {
                            carouselItem.appendChild(productCarousel);
                            if (document.querySelector('#featured_product_carousels') !== null) {
                                document.querySelector('#featured_product_carousels').appendChild(carouselItem);
                                const viewAllLink = document.createElement('div');
                                viewAllLink.className = 'view-all';
                                carouselItem.appendChild(viewAllLink);
                                if (this.page_entry.productBlocks[i].fields.blockLink) {
                                    viewAllLink.innerHTML = `<a href="${this.page_entry.productBlocks[i].fields.blockLink}" class="text-link"><span>view all</span></a>`;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
