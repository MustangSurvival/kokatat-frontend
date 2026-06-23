import ContentfulAbstract from '../contentful-abstract';

const Slick = require('slick-carousel');
const showdown = require('showdown');

import { convertVideoUrlToEmbed, singleImageGallery } from '../utility-functions';
import ProductCarousel from '../components/product-carousel';
import BlogCard from '../components/blog-card';

export default class ContentfulTeamDetailPage extends ContentfulAbstract {
    constructor(context) {
        super(context);
        this.page_entry = null;
        if (window.Slick === 'undefined') window.Slick = Slick;
    }

    setEntryData(responseData) {
        const entryItems = responseData.items;
        const pageSlug = window.location.pathname;

        for (let i = 0; i < entryItems.length; i++) {
            if (entryItems[i].fields.slug === pageSlug) {
                this.page_entry = entryItems[i].fields;
                break;
            }
        }
    }

    populateContent() {
        if (this.page_entry !== null) {
            // marquee image
            if (this.validateFieldData(this.page_entry.marqueeImage) && this.validateFieldData(this.page_entry.marqueeImage.fields.image, 'image')) {
                if (document.querySelector('.team-detail .team-member-marquee') !== null) {
                    document.querySelector('.team-detail .team-member-marquee').style.backgroundImage = `url('${this.page_entry.marqueeImage.fields.image.fields.file.url}')`;
                }
            }
            // profile image
            if (this.validateFieldData(this.page_entry.profileImage)) {
                const headshotImg = document.querySelector('.team-detail .member-headshot .image');
                if (headshotImg !== null) {
                    headshotImg.src = this.page_entry.profileImage.fields.file.url;
                    headshotImg.alt = this.page_entry.title || '';
                }
            }
            // name
            if (this.validateFieldData(this.page_entry.title)) {
                if (document.querySelector('.team-detail .name') !== null) {
                    document.querySelector('.team-detail .name').innerHTML = this.page_entry.title;
                }
                if (document.querySelector('.team-member-featured .gear-heading .value') !== null) {
                    document.querySelector('.team-member-featured .gear-heading .value').innerHTML = this.page_entry.title;
                }
            }
            // age
            // if (this.validateFieldData(this.page_entry.age)) {
            //     if (document.querySelector('.team-detail .age .value') !== null) {
            //         document.querySelector('.team-detail .age .value').innerHTML = this.page_entry.age;
            //     }
            // }
            if (this.validateFieldData(this.page_entry.birthDate)) {
                if (document.querySelector('.team-detail .age .value') !== null) {
                    document.querySelector('.team-detail .age .value').innerHTML = Math.abs(new Date(Date.now() - new Date(this.page_entry.birthDate)).getUTCFullYear() - 1970);
                }
            }
            // hometown
            if (this.validateFieldData(this.page_entry.hometown)) {
                if (document.querySelector('.team-detail .hometown .value') !== null) {
                    document.querySelector('.team-detail .hometown .value').innerHTML = this.page_entry.hometown;
                }
            }
            // team
            if (this.validateFieldData(this.page_entry.teamCategory)) {
                if (document.querySelector('.team-detail .team-info .team .value') !== null) {
                    document.querySelector('.team-detail .team-info .team .value').innerHTML = this.page_entry.teamCategory;
                }
            }
            // activity
            if (this.validateFieldData(this.page_entry.activity)) {
                if (document.querySelector('.team-detail .team-info .type') !== null) {
                    document.querySelector('.team-detail .team-info .type').innerHTML = this.page_entry.activity;
                }
            }
            // facebook
            if (this.validateFieldData(this.page_entry.facebookUrl)) {
                if (document.querySelector('.team-detail .social-links .facebook') !== null) {
                    document.querySelector('.team-detail .social-links .facebook').href = this.page_entry.facebookUrl;
                }
            }
            // twitter
            if (this.validateFieldData(this.page_entry.twitterUrl)) {
                if (document.querySelector('.team-detail .social-links .twitter') !== null) {
                    document.querySelector('.team-detail .social-links .twitter').href = this.page_entry.twitterUrl;
                }
            }
            // instagram
            if (this.validateFieldData(this.page_entry.instagramUrl)) {
                if (document.querySelector('.team-detail .social-links .instagram') !== null) {
                    document.querySelector('.team-detail .social-links .instagram').href = this.page_entry.instagramUrl;
                }
            }
            // quote
            if (this.validateFieldData(this.page_entry.quote)) {
                if (document.querySelector('.team-detail .member-quote') !== null) {
                    document.querySelector('.team-detail .member-quote').innerHTML = this.page_entry.quote;
                }
            }
            // bio
            if (this.validateFieldData(this.page_entry.biography)) {
                if (document.querySelector('.team-detail .member-bio') !== null) {
                    const converter = new showdown.Converter();
                    const text = this.page_entry.biography;
                    const html = converter.makeHtml(text);
                    document.querySelector('.team-detail .member-bio').innerHTML = html;
                }
            }
            // video
            if (this.validateFieldData(this.page_entry.video)) {
                if (document.querySelector('.team-detail .member-video') !== null) {
                    document.querySelector('.team-detail .member-video').innerHTML = convertVideoUrlToEmbed(this.page_entry.video, 750, 429);
                    document.querySelector('.team-detail .member-video iframe').classList.add('video-responsive-width');
                }
            }
            // products
            if (this.validateFieldData(this.page_entry.favoriteGearV2)) {
                if (document.querySelector('.team-detail .team-member-featured')) {
                    const productCarousel = new ProductCarousel('productCarousel', `${this.page_entry.title.toLowerCase().replace(' ', '-')}-favorite-gear`, this.page_entry.favoriteGearV2, this.context.bearerToken);
                    if (productCarousel !== null) {
                        productCarousel.classList.add('content-container');
                        document.querySelector('.team-detail .team-member-featured').appendChild(productCarousel);
                    }
                }
            }
            // gallery
            if (this.validateFieldData(this.page_entry.activityPhotos)) {
                singleImageGallery(this.page_entry.activityPhotos);
            } else {
              if (document.querySelector('.team-member-photos') !== null) {
                let noPhotos = document.querySelector('.team-member-photos');
                noPhotos.style.display = 'none';
              }
            }

            // blog posts
            this.client.getEntries({ 'fields.author': this.page_entry.title, content_type: 'blogPost', order: '-fields.publishDate', limit: 2 })
            .then((response) => {
              if (this.validateFieldData(response.items, 'array')) {
                for (let i = 0; i < response.items.length; i++) {
                  const blogCard = new BlogCard('articlePost', response.items[i].sys.id, response.items[i].fields);

                  if (blogCard !== null) {
                    if (document.querySelector('.blog-post-feed') !== null) {
                      document.querySelector('.blog-post-feed').appendChild(blogCard);
                    }
                  }
                }
              } else {
                if (document.querySelector('.blog-post-feed .no-posts') !== null) {
                  let noPosts = document.querySelector('.blog-post-feed .no-posts');
                  noPosts.style.display = 'block';
                }
              }
            })
            .catch(console.error);
        }
    }
}
