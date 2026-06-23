import ContentfulAbstract from '../contentful-abstract';
import { convertVideoUrlToEmbed, getProductIdFromSku } from '../utility-functions';

const Slick = require('slick-carousel');
const showdown = require('showdown');

// Content Components
import ProductCarousel from '../components/product-carousel';
import FeatureGrid from '../components/feature-grid';

export default class ContentfulProduct extends ContentfulAbstract {
    constructor(context) {
        super(context);

        this.product_entry = null;
        if (window.Slick === 'undefined') window.Slick = Slick;
    }

    setEntryData(responseData) {
        const entryItems = responseData.items;
        const slug = location.pathname.replace(/\//g, '');

        for (let i = 0; i < entryItems.length; i++) {
            if (entryItems[i].fields.slug === slug) {
                this.product_entry = entryItems[i].fields;
                break;
            }
        }
    }

    async populateContent() {
        const converter = new showdown.Converter();
        if (this.product_entry !== null) {
            // Descriptions
            if (this.validateFieldData(this.product_entry.shortDescription, 'text')) {
                if (document.querySelector('.productView-description') !== null) {
                    document.querySelector('.productView-description').innerHTML = converter.makeHtml(this.product_entry.shortDescription);
                }
            }

            if (this.validateFieldData(this.product_entry.descriptionHeader, 'text')) {
                if (document.querySelector('#feature_blocks h2') !== null) {
                    document.querySelector('#feature_blocks h2').innerHTML = this.product_entry.descriptionHeader;
                }
            } else if (document.querySelector('#feature_blocks h2') !== null) {
                document.querySelector('#feature_blocks h2').parentElement.removeChild(document.querySelector('#feature_blocks h2'));
            }

            if (this.validateFieldData(this.product_entry.description, 'text')) {
                if (document.querySelector('#feature_blocks .content') !== null) {
                    document.querySelector('#feature_blocks .content').innerHTML = converter.makeHtml(this.product_entry.description);
                }
            } else if (document.querySelector('#feature_blocks .content') !== null) {
                document.querySelector('#feature_blocks .content').parentElement.removeChild(document.querySelector('#feature_blocks .content'));
            }

            if (this.validateFieldData(this.product_entry.featureCallout) && this.validateFieldData(this.product_entry.featureCallout.feature_items, 'array')) {
                if (document.querySelector('#feature_blocks .feature-callout') !== null) {
                    for (let i = 0; i < this.product_entry.featureCallout.feature_items.length; i++) {
                        const divElem = document.createElement('div');
                        divElem.innerHTML = `<h6>${this.product_entry.featureCallout.feature_items[i].label}</h6><p>${this.product_entry.featureCallout.feature_items[i].description}</p>`;
                        document.querySelector('#feature_blocks .feature-callout').appendChild(divElem);
                    }
                }
            } else if (document.querySelector('#feature_blocks .feature-callout') !== null) {
                document.querySelector('#feature_blocks .feature-callout').parentElement.removeChild(document.querySelector('#feature_blocks .feature-callout'));
            }

            // Feature Grid
            if (this.validateFieldData(this.product_entry.featureGrid, 'array')) {
                if (document.querySelector('#feature_blocks') !== null) {
                    for (let i = 0; i < this.product_entry.featureGrid.length; i++) {
                        const featureGrid = new FeatureGrid(this.product_entry.featureGrid[i].sys.contentType.sys.id, this.product_entry.featureGrid[i].sys.id, this.product_entry.featureGrid[i].fields);
                        if (featureGrid !== null) {
                            if (i % 2 === 0) {
                                featureGrid.classList.add('odd');
                            } else {
                                featureGrid.classList.add('even');
                            }

                            if (document.querySelector('#feature_blocks .feature-grid-wrapper') !== null) {
                                document.querySelector('#feature_blocks .feature-grid-wrapper').appendChild(featureGrid);
                            }
                        }
                    }
                }
            } else if (document.querySelector('#feature_blocks .feature-grid-wrapper') !== null) {
                document.querySelector('#feature_blocks .feature-grid-wrapper').parentElement.removeChild(document.querySelector('#feature_blocks .feature-grid-wrapper'));
            }

            // Tech Specs
            if (this.validateFieldData(this.product_entry.productSpecs) && this.validateFieldData(this.product_entry.productSpecs.spec_items, 'array')) {
                if (document.querySelector('#tech_specs .product-list') !== null) {
                    for (let i = 0; i < this.product_entry.productSpecs.spec_items.length; i++) {
                        const listItem = document.createElement('li');
                        listItem.classList.add('list-item');
                        listItem.innerHTML = this.product_entry.productSpecs.spec_items[i].value;
                        document.querySelector('#tech_specs .product-list').appendChild(listItem);
                    }
                }
            } else if (document.querySelector('#tech_specs') !== null) {
                document.querySelector('#tech_specs').parentElement.removeChild(document.querySelector('#tech_specs'));

                if (document.querySelector('a[href="#tech_specs"]') !== null) {
                    document.querySelector('a[href="#tech_specs"]').parentElement.removeChild(document.querySelector('a[href="#tech_specs"]'));
                }
            }

            // Product care
            if (this.validateFieldData(this.product_entry.productCareCopy, 'text')) {
                if (document.querySelector('#product_care .product-care-copy') !== null) {
                    document.querySelector('#product_care .product-care-copy').innerHTML = converter.makeHtml(this.product_entry.productCareCopy);
                }
            } else if (document.querySelector('#product_care .product-care-copy') !== null) {
                document.querySelector('#product_care .product-care-copy').parentElement.removeChild(document.querySelector('#product_care .product-care-copy'));
            }

            if (this.validateFieldData(this.product_entry.productCarePdf, 'array')) {
                if (document.querySelector('#product_care .product-care-pdf') !== null) {
                    for (let i = 0; i < this.product_entry.productCarePdf.length; i++) {
                        if (this.validateFieldData(this.product_entry.productCarePdf[i], 'asset')) {
                            const linkElem = document.createElement('a');
                            linkElem.classList.add('text-link');
                            linkElem.href = this.product_entry.productCarePdf[i].fields.file.url;
                            linkElem.setAttribute('target', '_blank');
                            linkElem.innerHTML = this.product_entry.productCarePdf[i].fields.title;
                            document.querySelector('#product_care .product-care-pdf').appendChild(linkElem);
                        }
                    }
                }
            } else if (document.querySelector('#product_care .product-care-pdf') !== null) {
                document.querySelector('#product_care .product-care-pdf').parentElement.removeChild(document.querySelector('#product_care .product-care-pdf'));
            }

            if (this.validateFieldData(this.product_entry.productCareVideo, 'text')) {
                if (document.querySelector('#product_care .product-care-video') !== null) {
                    const divElem = document.createElement('div');
                    divElem.classList.add('embed-responsive');
                    divElem.innerHTML = convertVideoUrlToEmbed(this.product_entry.productCareVideo);
                    document.querySelector('#product_care .product-care-video').appendChild(divElem);
                }
            } else if (document.querySelector('#product_care .product-care-video') !== null) {
                document.querySelector('#product_care .product-care-video').parentElement.removeChild(document.querySelector('#product_care .product-care-video'));
            }

            if (!this.validateFieldData(this.product_entry.productCareCopy, 'text') && !this.validateFieldData(this.product_entry.productCarePdf, 'array') && !this.validateFieldData(this.product_entry.productCareVideo, 'text')) {
                if (document.querySelector('#product_care') !== null) {
                    document.querySelector('#product_care').parentElement.removeChild(document.querySelector('#product_care'));

                    if (document.querySelector('a[href="#product_care"]') !== null) {
                        document.querySelector('a[href="#product_care"]').parentElement.removeChild(document.querySelector('a[href="#product_care"]'));
                    }
                }
            }

            // Sizing
            const sizingContainer = document.querySelector('#sizing');
            const sizeToggleContainer = document.querySelector('#sizing .size-toggle-container');
            const sizeSectionContainer = document.querySelector('#sizing .size-section-container');

            const activateSizeTab = (targetIndex, shouldFocus = false) => {
                if (!sizeToggleContainer || !sizeSectionContainer) {
                    return;
                }

                const tabs = sizeToggleContainer.querySelectorAll('.size-toggle-link[role="tab"]');
                const panels = sizeSectionContainer.querySelectorAll('.size-section[role="tabpanel"]');

                tabs.forEach((tab, tabIndex) => {
                    const isActive = tabIndex === targetIndex;
                    tab.classList.toggle('active', isActive);
                    tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
                    tab.setAttribute('tabindex', isActive ? '0' : '-1');
                    if (isActive && shouldFocus) {
                        tab.focus();
                    }
                });

                panels.forEach((panel, panelIndex) => {
                    const isActive = panelIndex === targetIndex;
                    panel.classList.toggle('active', isActive);
                    panel.hidden = !isActive;
                    panel.setAttribute('aria-hidden', isActive ? 'false' : 'true');
                });
            };

            const onSizeTabKeydown = (event) => {
                const tabs = Array.from(sizeToggleContainer.querySelectorAll('.size-toggle-link[role="tab"]'));
                const currentIndex = tabs.indexOf(event.currentTarget);

                if (currentIndex === -1) {
                    return;
                }

                let nextIndex = currentIndex;
                if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                    nextIndex = (currentIndex + 1) % tabs.length;
                } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                    nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
                } else if (event.key === 'Home') {
                    nextIndex = 0;
                } else if (event.key === 'End') {
                    nextIndex = tabs.length - 1;
                } else if (event.key === 'Enter' || event.key === ' ') {
                    activateSizeTab(currentIndex);
                    event.preventDefault();
                    return;
                } else {
                    return;
                }

                activateSizeTab(nextIndex, true);
                event.preventDefault();
            };

            const createSizingTab = (tabLabel) => {
                const tabIndex = sizeToggleContainer.querySelectorAll('.size-toggle-link').length;
                const tabElem = document.createElement('button');
                tabElem.type = 'button';
                tabElem.classList.add('size-toggle-link');
                tabElem.id = `sizing-tab-${tabIndex}`;
                tabElem.textContent = tabLabel;
                tabElem.setAttribute('role', 'tab');
                tabElem.setAttribute('aria-selected', 'false');
                tabElem.setAttribute('aria-controls', `sizing-panel-${tabIndex}`);
                tabElem.setAttribute('tabindex', '-1');
                tabElem.addEventListener('click', () => activateSizeTab(tabIndex));
                tabElem.addEventListener('keydown', onSizeTabKeydown);
                sizeToggleContainer.appendChild(tabElem);
                return tabIndex;
            };

            const createSizingPanel = () => {
                const panelIndex = sizeSectionContainer.querySelectorAll('.size-section').length;
                const panelElem = document.createElement('div');
                panelElem.classList.add('size-section');
                panelElem.id = `sizing-panel-${panelIndex}`;
                panelElem.setAttribute('role', 'tabpanel');
                panelElem.setAttribute('aria-labelledby', `sizing-tab-${panelIndex}`);
                panelElem.setAttribute('aria-hidden', 'true');
                panelElem.hidden = true;
                sizeSectionContainer.appendChild(panelElem);
                return panelElem;
            };

            if (this.validateFieldData(this.product_entry.sizeCharts, 'array')) {
                if (sizingContainer !== null && sizeToggleContainer !== null && sizeSectionContainer !== null) {
                    for (let i = 0; i < this.product_entry.sizeCharts.length; i++) {
                        if (this.validateFieldData(this.product_entry.sizeCharts[i], 'asset') && this.product_entry.sizeCharts[i].fields.file.url.indexOf('mobile') === -1) {
                            createSizingTab(this.product_entry.sizeCharts[i].fields.title);
                            const divElem = createSizingPanel();

                            if (this.validateFieldData(this.product_entry.sizeCharts[i + 1], 'asset') && this.product_entry.sizeCharts[i + 1].fields.file.url.indexOf('mobile') !== -1) {
                                const pictureElem = document.createElement('picture');
                                const pictureImg = document.createElement('img');
                                const figureElm = document.createElement('figure');
                                const figcaptionElm = document.createElement('figcaption');
                                figcaptionElm.innerHTML = this.product_entry.sizeCharts[i].fields.description;
                                pictureImg.src = this.product_entry.sizeCharts[i].fields.file.url;
                                pictureImg.setAttribute('alt', this.product_entry.sizeCharts[i].fields.description);
                                const mobileSource = document.createElement('source');
                                mobileSource.setAttribute('media', '(max-width: 767px)');
                                mobileSource.setAttribute('srcset', this.product_entry.sizeCharts[i + 1].fields.file.url);
                                const desktopSource = document.createElement('source');
                                desktopSource.setAttribute('media', '(min-width: 768px)');
                                desktopSource.setAttribute('srcset', this.product_entry.sizeCharts[i].fields.file.url);
                                pictureElem.appendChild(mobileSource);
                                pictureElem.appendChild(desktopSource);
                                pictureElem.appendChild(pictureImg);
                                figureElm.appendChild(pictureElem);
                                figureElm.appendChild(figcaptionElm);
                                divElem.appendChild(figureElm);
                            } else {
                                const imgElem = document.createElement('img');
                                const figure = document.createElement('figure');
                                const figcaption = document.createElement('figcaption');
                                figcaption.innerHTML = this.product_entry.sizeCharts[i].fields.description;
                                imgElem.src = this.product_entry.sizeCharts[i].fields.file.url;
                                imgElem.setAttribute('alt', this.product_entry.sizeCharts[i].fields.description);
                                figure.appendChild(imgElem);
                                figure.appendChild(figcaption);
                                divElem.appendChild(figure);
                            }

                        }
                    }

                    if (sizeToggleContainer.querySelector('.size-toggle-link') !== null) {
                        activateSizeTab(0);
                    }
                }
            } else

            if (this.validateFieldData(this.product_entry.measuringInstructions, 'array')) {
                if (sizingContainer !== null && sizeToggleContainer !== null && sizeSectionContainer !== null) {
                    for (let i = 0; i < this.product_entry.measuringInstructions.length; i++) {
                        if (this.validateFieldData(this.product_entry.measuringInstructions[i].fields.title, 'text')) {
                            createSizingTab(this.product_entry.measuringInstructions[i].fields.title);
                        }
                        if (this.validateFieldData(this.product_entry.measuringInstructions[i].fields.instructions, 'text')) {
                            const divElem = createSizingPanel();
                            divElem.innerHTML = converter.makeHtml(this.product_entry.measuringInstructions[i].fields.instructions);
                        }
                    }

                    if (sizeToggleContainer.querySelector('.size-toggle-link') !== null) {
                        activateSizeTab(0);
                    }
                }
            }

            if (!this.validateFieldData(this.product_entry.sizeCharts, 'array') && !this.validateFieldData(this.product_entry.measuringInstructions, 'array')) {
                if (document.querySelector('#sizing') !== null) {
                    document.querySelector('#sizing').parentElement.removeChild(document.querySelector('#sizing'));

                    if (document.querySelectorAll('a[href="#sizing"]').length) {
                        const sizingLinks = document.querySelectorAll('a[href="#sizing"]');
                        for (let i = 0; i < sizingLinks.length; i++) {
                            sizingLinks[i].parentElement.removeChild(sizingLinks[i]);
                        }
                    }
                }
            }



            // Related Products
    
            if (this.validateFieldData(this.product_entry.relatedProductv2)) {
                const IDArray = [];
                for (let i = 0; i < this.product_entry.relatedProductv2.length; i++) {
                    const productID = await getProductIdFromSku(this.product_entry.relatedProductv2[i], this.context.bearerToken);
                    if (productID) {
                     IDArray.push(productID);
                    }
                }                
                if (document.querySelector('#related-products .related') !== null) {
                    this.product_entry.selected_products = IDArray;
                    
                    const productCarousel = new ProductCarousel('productCarousel', this.product_entry.id, this.product_entry.relatedProductv2, this.context.bearerToken);

                    if (productCarousel !== null) {
                        if (document.querySelector('#related-products .related') !== null) {
                            document.querySelector('#related-products .related').innerHTML = '';
                            document.querySelector('#related-products .related').appendChild(productCarousel);
                        }
                    }
                }
            }
        } else {
            if (document.querySelector('#feature_blocks h2') !== null) {
                document.querySelector('#feature_blocks h2').parentElement.removeChild(document.querySelector('#feature_blocks h2'));
            }

            if (document.querySelector('#feature_blocks .content') !== null) {
                document.querySelector('#feature_blocks .content').parentElement.removeChild(document.querySelector('#feature_blocks .content'));
            }

            if (document.querySelector('#feature_blocks .feature-callout') !== null) {
                document.querySelector('#feature_blocks .feature-callout').parentElement.removeChild(document.querySelector('#feature_blocks .feature-callout'));
            }

            if (document.querySelector('#feature_blocks .feature-grid-wrapper') !== null) {
                document.querySelector('#feature_blocks .feature-grid-wrapper').parentElement.removeChild(document.querySelector('#feature_blocks .feature-grid-wrapper'));
            }

            if (document.querySelector('#tech_specs') !== null) {
                document.querySelector('#tech_specs').parentElement.removeChild(document.querySelector('#tech_specs'));

                if (document.querySelector('a[href="#tech_specs"]') !== null) {
                    document.querySelector('a[href="#tech_specs"]').parentElement.removeChild(document.querySelector('a[href="#tech_specs"]'));
                }
            }

            if (document.querySelector('#product_care') !== null) {
                document.querySelector('#product_care').parentElement.removeChild(document.querySelector('#product_care'));

                if (document.querySelector('a[href="#product_care"]') !== null) {
                    document.querySelector('a[href="#product_care"]').parentElement.removeChild(document.querySelector('a[href="#product_care"]'));
                }
            }

            if (document.querySelector('#sizing') !== null) {
                document.querySelector('#sizing').parentElement.removeChild(document.querySelector('#sizing'));

                if (document.querySelectorAll('a[href="#sizing"]').length) {
                    const sizingLinks = document.querySelectorAll('a[href="#sizing"]');
                    for (let i = 0; i < sizingLinks.length; i++) {
                        sizingLinks[i].parentElement.removeChild(sizingLinks[i]);
                    }
                }
            }
        }
    }
}
