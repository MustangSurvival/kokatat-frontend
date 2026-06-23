import ContentfulAbstract from '../contentful-abstract';
import * as contentful from 'contentful';
import ContentfulEnvironment from '../contentful-env';
import { mapMonth } from '../utility-functions';

// Components
import BlogCard from '../components/blog-card';
import FeaturedBlogPost from '../components/featured-blog-post';

export default class ContentfulBlogLandingPage extends ContentfulAbstract {
    constructor(context) {
        super(context);

        this.page_entry = null;
    }

    setEntryData(responseData) {
        const entryItems = responseData.items;
        this.page_entry = entryItems[0].fields;
    }

    populateContent() {
        if (this.page_entry !== null) {
            const componentInstance = this;

            // Marquee
            if (this.validateFieldData(this.page_entry.marqueeImage) && this.validateFieldData(this.page_entry.marqueeImage.fields.image, 'image')) {
                if (document.querySelector('#blog-marquee img') !== null) {
                    document.querySelector('#blog-marquee img').src = this.page_entry.marqueeImage.fields.image.fields.file.url;

                    if (document.querySelector('#blog-marquee .placeholder') !== null) {
                        document.querySelector('#blog-marquee .placeholder').parentElement.removeChild(document.querySelector('#blog-marquee .placeholder'));
                    }
                }
            } else {
                if (document.querySelector('#blog-marquee img') !== null) {
                    document.querySelector('#blog-marquee img').parentElement.removeChild(document.querySelector('#blog-marquee img'));
                }
            }

            if (this.validateFieldData(this.page_entry.headline, 'text')) {
                if (document.querySelector('#blog-marquee .title') !== null) {
                    document.querySelector('#blog-marquee .title').innerHTML = this.page_entry.headline;
                }
            }

            if (this.validateFieldData(this.page_entry.subhead, 'text')) {
                if (document.querySelector('#blog-marquee .description') !== null) {
                    document.querySelector('#blog-marquee .description').innerHTML = this.page_entry.subhead;
                }
            }

            if (document.querySelector('.mobile-filter-button') !== null) {
                document.querySelector('.mobile-filter-button').addEventListener('click', () => {
                    if (document.querySelector('#blog-filter-nav .nav-wrapper') !== null) {
                        document.querySelector('#blog-filter-nav .nav-wrapper').classList.toggle('visible');
                    }
                });
            }

            // Get both blog and expedition posts. Join and sort array by publishDate
            const blogPostPromise = this.client.getEntries({ content_type: 'blogPost', order: '-fields.publishDate' });
            const expeditionPromise = this.client.getEntries({ content_type: 'expedition', order: '-fields.publishDate' });

            Promise.all([blogPostPromise, expeditionPromise])
            .then((entries) => {
                const combinedEntries = entries[0].items.concat(entries[1].items);
                const sortedEntries = combinedEntries.sort((a, b) => new Date(b.fields.publishDate) - new Date(a.fields.publishDate));

                componentInstance.blog_entries = entries[0].items.sort((a, b) => new Date(b.fields.publishDate) - new Date(a.fields.publishDate));
                componentInstance.expedition_entries = entries[1].items.sort((a, b) => new Date(b.fields.publishDate) - new Date(a.fields.publishDate));
                componentInstance.all_sorted_entries = sortedEntries;

                // Display posts
                componentInstance.displayPosts();

                // Populate archive
                const archiveArray = [];
                if (sortedEntries.length) {
                    for (let i = 0; i < sortedEntries.length; i++) {
                        const publishDate = new Date(sortedEntries[i].fields.publishDate);

                        if (archiveArray.indexOf(`${mapMonth(publishDate.getMonth())} ${publishDate.getFullYear()}`) === -1) {
                            archiveArray.push(`${mapMonth(publishDate.getMonth())} ${publishDate.getFullYear()}`);
                        }
                    }

                    if (archiveArray.length) {
                        if (document.querySelector('#archive_dropdown') !== null) {
                            for (let i = 0; i < archiveArray.length; i++) {
                                const optionElem = document.createElement('option');
                                optionElem.setAttribute('value', archiveArray[i]);
                                optionElem.textContent = archiveArray[i];
                                document.querySelector('#archive_dropdown').appendChild(optionElem);
                            }
                        }
                    }
                }
            });

            // Set up filtering event listeners
            const categoryFilters = document.querySelectorAll('#blog-filter-nav ul.nav li a');
            if (categoryFilters.length) {
                for (let i = 0; i < categoryFilters.length; i++) {
                    categoryFilters[i].addEventListener('click', (e) => {
                        e.preventDefault();
                        const targetElem = e.target.tagName === 'A' ? e.target : e.target.closest('a');
                        if (targetElem.textContent !== 'All') {
                            location.search = `?category=${targetElem.textContent.replace(' & ', ' ')}`;

                        } else {
                            location.search = '';

                        }
                    });
                }
            }

            if (document.querySelector('#blog-filter-nav select#sport_dropdown') !== null) {
                document.querySelector('#blog-filter-nav select#sport_dropdown').addEventListener('change', (e) => {
                    const targetElem = e.target.tagName === 'SELECT' ? e.target : e.target.closest('select');
                    location.search = `?sport=${targetElem.value.replace(' & ', ' ')}`;
                });
            }

            // Set up archive
            if (document.querySelector('#blog-filter-nav select#archive_dropdown') !== null) {
                document.querySelector('#blog-filter-nav select#archive_dropdown').addEventListener('change', (e) => {
                    const targetElem = e.target.tagName === 'SELECT' ? e.target : e.target.closest('select');
                    location.search = `?archive=${targetElem.value}`;
                });
            }
        }
    }

    displayPosts() {
        const params = new URLSearchParams(document.location.search.substring(1));

        if (params.get('category') !== null) {
          // Set active state
            if (document.querySelectorAll('#blog-filter-nav .nav li a').length) {
                const navItems = document.querySelectorAll('#blog-filter-nav .nav li a');
                for (let i = 0; i < navItems.length; i++) {
                    if (navItems[i].textContent === params.get('category')) {
                        navItems[i].classList.add('active');
                        break;
                    }
                }
            }

            if (params.get('category') === 'Expeditions') {
                if (this.expedition_entries.length) {
                    for (let i = 0; i < this.expedition_entries.length; i++) {
                        const blogCard = new BlogCard('articlePost', this.expedition_entries[i].sys.id, this.expedition_entries[i].fields);

                        if (blogCard !== null) {
                            if (document.querySelector('.blog-post-feed') !== null) {
                                document.querySelector('.blog-post-feed').appendChild(blogCard);
                            }
                        }
                    }
                }
            } else {
                for (let i = 0; i < this.blog_entries.length; i++) {
                    if (this.validateFieldData(this.blog_entries[i].fields.categories) && this.blog_entries[i].fields.categories.indexOf(params.get('category')) !== -1) {
                        const blogCard = new BlogCard('articlePost', this.blog_entries[i].sys.id, this.blog_entries[i].fields);

                        if (blogCard !== null) {
                            if (document.querySelector('.blog-post-feed') !== null) {
                                document.querySelector('.blog-post-feed').appendChild(blogCard);
                            }
                        }
                    }
                }
            }
        } else if (params.get('sport') !== null) {
            if (this.all_sorted_entries.length) {
                for (let i = 0; i < this.all_sorted_entries.length; i++) {
                    if (this.validateFieldData(this.all_sorted_entries[i].fields.sport) && this.all_sorted_entries[i].fields.sport.replace(' & ', ' ') === params.get('sport')) {
                        const blogCard = new BlogCard('articlePost', this.all_sorted_entries[i].sys.id, this.all_sorted_entries[i].fields);

                        if (blogCard !== null) {
                            if (document.querySelector('.blog-post-feed') !== null) {
                                document.querySelector('.blog-post-feed').appendChild(blogCard);
                            }
                        }
                    }
                }
            }
        } else if (params.get('archive') !== null) {
            if (this.all_sorted_entries.length) {
                for (let i = 0; i < this.all_sorted_entries.length; i++) {
                    const publishDate = new Date(this.all_sorted_entries[i].fields.publishDate);
                    const dateCompare = `${mapMonth(publishDate.getMonth())} ${publishDate.getFullYear()}`;

                    if (this.validateFieldData(this.all_sorted_entries[i].fields.publishDate) && dateCompare === params.get('archive')) {
                        const blogCard = new BlogCard('articlePost', this.all_sorted_entries[i].sys.id, this.all_sorted_entries[i].fields);

                        if (blogCard !== null) {
                            if (document.querySelector('.blog-post-feed') !== null) {
                                document.querySelector('.blog-post-feed').appendChild(blogCard);
                            }
                        }
                    }
                }
            }
        } else if (params.get('tag') !== null) {
            if (this.all_sorted_entries.length) {
                for (let i = 0; i < this.all_sorted_entries.length; i++) {
                    if (this.validateFieldData(this.all_sorted_entries[i].fields.tags, 'array') && this.all_sorted_entries[i].fields.tags.indexOf(params.get('tag')) !== -1) {
                        const blogCard = new BlogCard('articlePost', this.all_sorted_entries[i].sys.id, this.all_sorted_entries[i].fields);

                        if (blogCard !== null) {
                            if (document.querySelector('.blog-post-feed') !== null) {
                                document.querySelector('.blog-post-feed').appendChild(blogCard);
                            }
                        }
                    }
                }
            }
        } else {
            if (this.all_sorted_entries.length) {
                if(document.querySelector('#blog-filter-nav .nav li a')) {
                    document.querySelector('#blog-filter-nav .nav li a').classList.add('active');
                }
                for (let i = 0; i < this.all_sorted_entries.length; i++) {
                    const blogCard = new BlogCard('articlePost', this.all_sorted_entries[i].sys.id, this.all_sorted_entries[i].fields);

                    if (blogCard !== null) {
                        if (document.querySelector('.blog-post-feed') !== null) {
                            document.querySelector('.blog-post-feed').appendChild(blogCard);
                        }
                    }
                }
            }
        }

        this.displayFeaturedPosts();
    }

    displayFeaturedPosts() {
        if (this.page_entry !== null && this.validateFieldData(this.page_entry.featuredPosts, 'array')) {
            for (let i = 0; i < this.page_entry.featuredPosts.length; i++) {
                const featuredPost = new FeaturedBlogPost('blog-featured-story', this.page_entry.featuredPosts[i].sys.id, this.page_entry.featuredPosts[i].fields);
                if (featuredPost !== null) {
                    if (this.validateFieldData(this.page_entry.featuredPosts[i].fields.featuredPosition)) {
                        const injectIndex = this.page_entry.featuredPosts[i].fields.featuredPosition - 1;
                        const blogItems = document.querySelectorAll('.blog-post-feed .blog-card');

                        if (blogItems.length) {
                            if (typeof blogItems[injectIndex] !== 'undefined') {
                                blogItems[injectIndex].before(featuredPost);
                            } else {
                                blogItems[blogItems.length - 1].after(featuredPost);
                            }
                        }
                    }
                }
            }
        }
    }
}
