/*
 Import all product specific js
 */
import PageManager from './page-manager';
import Review from './product/reviews';
import collapsibleFactory from './common/collapsible';
import ProductDetails from './common/product-details';
import videoGallery from './product/video-gallery';
// import { classifyForm } from './common/form-utils';
import { initializeUI } from './kokatat/custom-suit/customize-functions';
import CustomSuit from './kokatat/custom-suit/custom-suit';
import ContentfulProduct from './kokatat/contentful/pages/product';
// import defaultModal from './kokatat/strike-quote';
import { classifyForm } from './common/utils/form-utils';
import modalFactory from './global/modal';

export default class Product extends PageManager {
    constructor(context) {
        super(context);
        this.url = window.location.href;
        this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
        this.$bulkPricingLink = $('[data-reveal-id="modal-bulk-pricing"]');
        this.customSuit = null;
        this.reviewModal = modalFactory('#modal-review-form')[0];
    }

    onReady() {
        // Listen for foundation modal close events to sanitize URL after review.
        $(document).on('close.fndtn.reveal', () => {
            if (this.url.indexOf('#write_review') !== -1 && typeof window.history.replaceState === 'function') {
                window.history.replaceState(null, document.title, window.location.pathname);
            }
        });

        let validator;

        // Init collapsible
        collapsibleFactory();

        this.productDetails = new ProductDetails($('.productView'), this.context, window.BCData.product_attributes);
        this.productDetails.setProductVariant();

        videoGallery();

        this.bulkPricingHandler();

        const $reviewForm = classifyForm('.writeReview-form');
        // const review = new Review($reviewForm);

        // if ($reviewForm.length === 0) return;

        const review = new Review({ $reviewForm });

        $('body').on('click', '[data-reveal-id="modal-review-form"]', () => {
            validator = review.registerValidation(this.context);
            this.ariaDescribeReviewInputs($reviewForm);
        });

        $reviewForm.on('submit', () => {
            if (validator) {
                validator.performCheck();
                return validator.areAll('valid');
            }

            return false;
        });

        this.productReviewHandler();
        this.bulkPricingHandler();
        this.selectVideoThumbnail();

        // Custom Suit Setup
        // if (this.context.pageType === 'product' && this.context.template === 'pages/custom/product/custom-suit') {
        if (this.context.pageType === 'product' && this.context.template.includes('custom-suit')) {
            this.customSuit = new CustomSuit(this.context);
            initializeUI(this.customSuit);
        } else {
            this.context.variantData = [];
        }

        // Contentful Contentful
        const contentfulProduct = new ContentfulProduct(this.context);
        contentfulProduct.client.getEntries({ 'fields.slug': window.location.pathname.replace(/\//g, ''), content_type: 'product' })
            .then((response) => {
                contentfulProduct.setEntryData(response);
                contentfulProduct.populateContent();
                // populate the pdp nav links once the content has been received
                this.pdpNavLinks();
            });

        // product nav has active class on scroll

        if (document.querySelector('.productNav-container') !== null && document.querySelectorAll('.productNavToggle') !== null) {
            window.addEventListener('scroll', () => {
                const fromTop = window.scrollY;
                const navElement = document.querySelector('.productNav-container');
                const navPosition = navElement.getBoundingClientRect().top;
                const prodNavToggle = document.querySelectorAll('.productNavToggle');
                const mainNavLinks = document.querySelectorAll('nav.productNav ul li.productNav-item a');
                mainNavLinks.forEach(link => {
                    const section = document.querySelector(link.hash);
                    if (section) {
                        if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
                            link.classList.add('current');
                        } else {
                            link.classList.remove('current');
                        }
                    }
                });
                if (navPosition <= 0) {
                    prodNavToggle.forEach(el => {
                        el.classList.add('show-buy-now');
                    });
                } else {
                    prodNavToggle.forEach(el => {
                        el.classList.remove('show-buy-now');
                    });
                }
            });
        }
    }

    ariaDescribeReviewInputs($form) {
        $form.find('[data-input]').each((_, input) => {
            const $input = $(input);
            const msgSpanId = `${$input.attr('name')}-msg`;
            $input.siblings('span').attr('id', msgSpanId);
            $input.attr('aria-describedby', msgSpanId);
        });
    }

    productReviewHandler() {
        if (this.url.indexOf('#write_review') !== -1) {
            this.$reviewLink.trigger('click');
        }
    }

    selectVideoThumbnail() {
        $('#video-modal').on('click', () => {
            $('.videoGallery-item a.is-active').click();
        });
    }

    pdpNavLinks() {
        const navList = document.querySelector('#productNav-list');
        if (!navList) {
            return;
        }

        const addNavItem = (href, text) => {
            if (navList.querySelector(`a.productNav-link[href="${href}"]`)) {
                return;
            }

            const listItem = document.createElement('li');
            listItem.classList.add('productNav-item', 'h6-subHead-sm');
            listItem.innerHTML = `<a class="productNav-link" href="${href}">${text}</a>`;
            navList.appendChild(listItem);
        };

        if ($('#product-reviews').length > 0) {
            addNavItem('#product-reviews', 'Reviews');
        }

        if ($('#sizing').length > 0) {
            addNavItem('#sizing-link', 'Sizing');

            const sizeChart = document.createElement('div');
            const optionsRight = document.querySelector('.productView-options .options-bottom .options-right');
            if (optionsRight) {
                optionsRight.prepend(sizeChart);
            } else {
                document.querySelector('#options-container').append(sizeChart);
            }
            sizeChart.classList.add('text-link-no-arrow');
            sizeChart.classList.add('size-chart');

            // Condition based on viewport width
            function updateSizeChartLink() {
                if (window.innerWidth <= 800) {
                    sizeChart.innerHTML = '<a href="#sizing">size chart</a>';
                    const sizeChartLink = sizeChart.querySelector('a');
                    sizeChartLink.addEventListener('click', function(event) {
                        event.preventDefault();
                        const sizingSection = document.querySelector('#sizing');
                        const sizingToggle = sizingSection ? sizingSection.querySelector('.toggleLink') : null;
                        if (sizingToggle && sizingToggle.getAttribute('aria-expanded') !== 'true') {
                            sizingToggle.click();
                        }
                        const sizingTarget = document.querySelector('#sizing-link') || sizingSection;
                        if (sizingTarget) {
                            sizingTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            if (!sizingTarget.hasAttribute('tabindex')) {
                                sizingTarget.setAttribute('tabindex', '-1');
                            }
                            sizingTarget.focus({ preventScroll: true });
                        }
                    });
                } else {
                    sizeChart.innerHTML = '<a href="#sizing-link">size chart</a>';
                }
            }

            // Call once initially
            updateSizeChartLink();

            // Update when the window is resized
            window.addEventListener('resize', updateSizeChartLink);
        }

        if ($('#product_care').length > 0) {
            addNavItem('#product_care-link', 'Product Care');
        }
        if ($('#tech_specs').length > 0) {
            addNavItem('#tech_specs-link', 'Technical Features');
        }
        if ($('#feature_blocks').length > 0) {
            addNavItem('#feature_blocks-link', 'Description');
        }

        // handle spacing when two nav items are present(like on repair items) to prevent them from being on extreme ends of the productNav-list
        if (navList.childElementCount <= 2) {
            navList.style.justifyContent = 'center';
        }
    }

    bulkPricingHandler() {
        if (this.url.indexOf('#bulk_pricing') !== -1) {
            this.$bulkPricingLink.trigger('click');
        }
    }
}
