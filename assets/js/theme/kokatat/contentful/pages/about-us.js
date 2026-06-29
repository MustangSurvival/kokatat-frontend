import ContentfulAbstract from '../contentful-abstract';

const Slick = require('slick-carousel');
const showdown = require('showdown');
const pageSlug = '/about-us';

export default class ContentfulAboutUsPage extends ContentfulAbstract {
    constructor(context) {
        super(context);

        this.page_entry = null;
        if (window.Slick === 'undefined') window.Slick = Slick;
    }

    setEntryData(response) {
        const entryItems = response.items;
        // this.page_entry = entryItems[0].fields;
        this.page_entry = entryItems.find(item => item.fields.slug == pageSlug).fields;
    }

    populateContent() {
        const componentInstance = this;
        const converter = new showdown.Converter();
        
        if (this.page_entry !== null) {
            // marquee image
            if (this.validateFieldData(this.page_entry.marqueeImage) && this.validateFieldData(this.page_entry.marqueeImage.fields.image, 'asset')) {
                if (document.querySelector('.life-landing .category-marquee') !== null) {
                    document.querySelector('.life-landing .category-marquee').style.backgroundImage = `url('${this.page_entry.marqueeImage.fields.image.fields.file.url}')`;
                }
            }
            // marquee headline
            if (this.validateFieldData(this.page_entry.headline, 'text')) {
                if (document.querySelector('.life-landing .marquee-text .page-heading') !== null) {
                    document.querySelector('.life-landing .marquee-text .page-heading').innerHTML = this.page_entry.headline;
                }
            }
            // marquee text
            if (this.validateFieldData(this.page_entry.subhead, 'text')) {
                if (document.querySelector('.life-landing .marquee-text .text-copy') !== null) {
                    document.querySelector('.life-landing .marquee-text .text-copy').innerHTML = this.page_entry.subhead;
                }
            }
            // subcategory heading
            if (this.validateFieldData(this.page_entry.subcategoryHeader, 'text')) {
                if (document.querySelector('.life-landing .subcategory-container .h6-subHead-sm') !== null) {
                    document.querySelector('.life-landing .subcategory-container .h6-subHead-sm').innerHTML = this.page_entry.subcategoryHeader;
                }
            }
            // top links
            if (this.validateFieldData(this.page_entry.topLinks, 'array')) {
                if (document.querySelectorAll('.subcategory-links a').length) {
                    const topLinks = document.querySelectorAll('.subcategory-links a');
                    for (let i = 0; i < topLinks.length; i++) {
                        if (this.validateFieldData(this.page_entry.topLinks[i])) {
                            topLinks[i].href = this.page_entry.topLinks[i].url;
                            topLinks[i].querySelector('p').innerHTML = this.page_entry.topLinks[i].text;
                        }
                    }
                }
            }
            // team block image
            if (this.validateFieldData(this.page_entry.contentBlock1Image) && this.validateFieldData(this.page_entry.contentBlock1Image, 'asset')) {
                if (document.querySelector('.life-landing .team-images img') !== null) {
                    document.querySelector('.life-landing .team-images img').src = this.page_entry.contentBlock1Image.fields.file.url;
                    document.querySelector('.life-landing .team-images img').alt = this.page_entry.contentBlock1Image.fields.file.title;
                    document.querySelector('.life-landing .team-images img').title = this.page_entry.contentBlock1Image.fields.file.title;
                }
            }
            // team block heading
            if (this.validateFieldData(this.page_entry.contentBlock1CTAHeader, 'text')) {
                if (document.querySelector('.life-landing .team-copy .h6-subHead-sm') !== null) {
                    document.querySelector('.life-landing .team-copy .h6-subHead-sm').innerHTML = this.page_entry.contentBlock1CTAHeader;
                }
            }
            // team block subheading
            if (this.validateFieldData(this.page_entry.contentBlock1CTASubHeader, 'text')) {
                if (document.querySelector('.life-landing .team-copy h3') !== null) {
                    document.querySelector('.life-landing .team-copy h3').innerHTML = this.page_entry.contentBlock1CTASubHeader;
                }
            }
            // team block copy
            if (this.validateFieldData(this.page_entry.contentBlock1CTACopy, 'text')) {
                if (document.querySelector('.life-landing .team-copy p') !== null) {
                    document.querySelector('.life-landing .team-copy p').innerHTML = this.page_entry.contentBlock1CTACopy;
                }
            }
            // team link
            if (this.validateFieldData(this.page_entry.contentBlock1CtaButtonText, 'text')) {
                if (document.querySelector('.life-landing .team-copy .button') !== null) {
                    document.querySelector('.life-landing .team-copy .button').innerHTML = this.page_entry.contentBlock1CtaButtonText;
                }
                if (document.querySelector('.life-landing .team-copy .text-link.mobile') !== null) {
                    document.querySelector('.life-landing .team-copy .text-link.mobile').innerHTML = this.page_entry.contentBlock1CtaButtonText;
                }
            }
            // about posts header
            if (this.validateFieldData(this.page_entry.aboutPostsHeader, 'text')) {
                if (document.querySelector('.life-landing .about-container .h6-subHead-sm') !== null) {
                    document.querySelector('.life-landing .about-container .h6-subHead-sm').innerHTML = this.page_entry.aboutPostsHeader;
                }
            }
            // about posts slider
            if (this.validateFieldData(this.page_entry.aboutPosts) && this.validateFieldData(this.page_entry.aboutPosts, 'array')) {
                const slider = $('.life-carousel');
                if (slider) {
                    const slides = this.page_entry.aboutPosts;
                    for (let i = 0; i < slides.length; i++) {
                        const slideContent = slides[i].fields;
                        const slideElem = document.querySelector('.life-carousel + .about-post-slide-template').cloneNode(true);
                        // post marquee image
                        if (this.validateFieldData(slideContent.marqueeImage) && this.validateFieldData(slideContent.marqueeImage.sys.id, 'text')) {
                            this.client.getEntry(slideContent.marqueeImage.sys.id)
                                .then((response) => {
                                    if (componentInstance.validateFieldData(response.fields.image, 'asset')) {
                                        if (slideElem.querySelector('.about-post-image') !== null) {
                                            slideElem.querySelector('.about-post-image').src = response.fields.image.fields.file.url;
                                            slideElem.querySelector('.about-post-image').alt = response.fields.image.fields.description || slideContent.title || '';
                                        }
                                    }
                                });
                        }
                        // post title
                        if (this.validateFieldData(slideContent.title, 'text')) {
                            if (slideElem.querySelector('.about-post-title') !== null) {
                                slideElem.querySelector('.about-post-title').innerHTML = slideContent.title;
                            }
                        }
                        // post link
                        if (this.validateFieldData(slideContent.slug, 'text')) {
                            if (slideElem.querySelector('.about-post-slug') !== null) {
                                slideElem.querySelector('.about-post-slug').href = slideContent.slug;
                            }
                        }
                        // post teaser
                        if (this.validateFieldData(slideContent.teaser, 'text')) {
                            if (slideElem.querySelector('.about-post-teaser') !== null) {
                                slideElem.querySelector('.about-post-teaser').innerHTML = slideContent.teaser;
                            }
                        }
                        slider.slick('slickAdd', slideElem);
                        slideElem.hidden = false;
                    }
                }
            }
            // stories
            if (this.validateFieldData(this.page_entry.featuredStoriesBlock, 'array')) {
                const stories = this.page_entry.featuredStoriesBlock;
                for (let i = 0; i < stories.length; i++) {
                    const story = stories[i].fields;
                    const storyElem = document.querySelector('#stories-cta .story').cloneNode(true);

                    // subheader
                    if (this.validateFieldData(stories[i].sys.contentType.sys.id)) {
                        if (this.validateFieldData(stories[i].sys.contentType.sys.id === 'blogPost') || this.validateFieldData(stories[i].sys.contentType.sys.id === 'expedition')) {
                            if (storyElem.querySelector('.stories-subhead') !== null) {
                                storyElem.querySelector('.stories-subhead').innerHTML = 'From the Blog';
                            }
                        } else if (this.validateFieldData(stories[i].sys.contentType.sys.id === 'team')) {
                            if (storyElem.querySelector('.stories-subhead') !== null) {
                                storyElem.querySelector('.stories-subhead').innerHTML = 'Kokatat Team';
                            }
                        }
                    }
                    // title
                    if (this.validateFieldData(story.title, 'text')) {
                        if (storyElem.querySelector('.stories-title') !== null) {
                            storyElem.querySelector('.stories-title').innerHTML = story.title;
                        }
                    }
                    // teaser
                    if (this.validateFieldData(story.teaser, 'text')) {
                        if (storyElem.querySelector('.stories-description') !== null) {
                            storyElem.querySelector('.stories-description').innerHTML = story.teaser;
                        }
                    }
                    // slug
                    if (this.validateFieldData(story.slug, 'text')) {
                        if (storyElem.querySelector('.text-link') !== null) {
                            storyElem.querySelector('.text-link').href = story.slug;
                        }
                    }
                    // post image
                    if (this.validateFieldData(story.thumbnailImage, 'asset')) {
                        if (storyElem.querySelector('.stories-image') !== null) {
                            storyElem.querySelector('.stories-image').src = story.thumbnailImage.fields.file.url;
                            storyElem.querySelector('.stories-image').alt = story.thumbnailImage.fields.title;
                            storyElem.querySelector('.stories-image').title = story.thumbnailImage.fields.title;
                        }
                    }

                    document.querySelector('#stories-cta').appendChild(storyElem);
                    storyElem.hidden = false;
                }
                // add classes for left and right
                document.querySelector('#stories-cta .story:nth-child(2)').classList.add('stories-left');
                document.querySelector('#stories-cta .story:last-child').classList.add('stories-right');
            }
            // from the blog header
            if (this.validateFieldData(this.page_entry.fromTheBlogHeader, 'text')) {
                if (document.querySelector('.from-the-blog .heading .h6-subHead-sm')) {
                    document.querySelector('.from-the-blog .heading .h6-subHead-sm').innerHTML = this.page_entry.fromTheBlogHeader;
                }
            }
            // from the blog posts
            if (this.validateFieldData(this.page_entry.fromTheBlog, 'array')) {
                const posts = this.page_entry.fromTheBlog;
                for (let i = 0; i < posts.length; i++) {
                    if (this.validateFieldData(posts[i]) && this.validateFieldData(posts[i].sys.id, 'text')) {
                        this.client.getEntry(posts[i].sys.id)
                            .then((response) => {
                                const postElem = document.querySelector('.from-the-blog .blog-card').cloneNode(true);
                                const postContent = response.fields;
                                // title
                                if (componentInstance.validateFieldData(postContent.title, 'text')) {
                                    if (postElem.querySelector('.blog-title a') !== null) {
                                        postElem.querySelector('.blog-title a').href = postContent.slug;
                                        postElem.querySelector('.blog-title a').innerHTML = postContent.title;
                                    }
                                }
                                // sport
                                if (componentInstance.validateFieldData(postContent.sport, 'text')) {
                                    if (postElem.querySelector('.tag') !== null) {
                                        postElem.querySelector('.tag').innerHTML = postContent.sport;
                                    }
                                }
                                // date
                                if (componentInstance.validateFieldData(postContent.expeditionDate, 'text') || componentInstance.validateFieldData(postContent.publishDate, 'text')) {
                                    if (postElem.querySelector('.blog-date') !== null) {
                                        if (componentInstance.validateFieldData(postContent.expeditionDate, 'text')) {
                                            postElem.querySelector('.blog-date').innerHTML = postContent.expeditionDate;
                                        }
                                        if (componentInstance.validateFieldData(postContent.publishDate, 'text')) {
                                            postElem.querySelector('.blog-date').innerHTML = postContent.publishDate;
                                        }
                                    }
                                }
                                // teaser
                                if (componentInstance.validateFieldData(postContent.teaser, 'text')) {
                                    if (postElem.querySelector('.blog-post p') !== null) {
                                        postElem.querySelector('.blog-post p').innerHTML = postContent.teaser;
                                    }
                                }
                                // slug
                                if (componentInstance.validateFieldData(postContent.slug, 'text')) {
                                    if (postElem.querySelector('.blog-post .text-link') !== null) {
                                        postElem.querySelector('.blog-post .text-link').href = postContent.slug;
                                    }
                                }
                                // image
                                if (componentInstance.validateFieldData(postContent.thumbnailImage, 'asset')) {
                                    if (postElem.querySelector('img') !== null) {
                                        postElem.querySelector('img').src = postContent.thumbnailImage.fields.file.url;
                                    }
                                }
                                document.querySelector('.life-landing .from-the-blog .blog-post-feed').appendChild(postElem);
                                postElem.hidden = false;
                            });
                    }
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
