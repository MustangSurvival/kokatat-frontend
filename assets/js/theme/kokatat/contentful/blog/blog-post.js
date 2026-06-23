import ContentfulAbstract from '../contentful-abstract';

const Slick = require('slick-carousel');
const showdown = require('showdown');

import { convertVideoUrlToEmbed, singleImageGallery } from '../utility-functions';
import ProductCarousel from '../components/product-carousel';

export default class ContentfulBlogPost extends ContentfulAbstract {
    constructor(context) {
        super(context);

        this.page_entry = null;
        if (window.Slick === 'undefined') window.Slick = Slick;
    }

    setEntryData(responseData) {
        const entryItems = responseData.items;
        const pageSlug = window.location.pathname;
        this.page_entry = entryItems[0].fields;
        // loop through entryItems
        for (let i = 0; i < entryItems.length; i++) {
            // match slug of page to entry
            if (entryItems[i].fields.slug === pageSlug) {
                this.page_entry = entryItems[i].fields;
                break;
            }
        }
    }

    populateContent() {
        // marquee image
        if (this.validateFieldData(this.page_entry.marqueeImage) && this.validateFieldData(this.page_entry.marqueeImage.fields.image, 'image')) {
            if (document.querySelector('#blog-article .blog-article-marquee') !== null) {
                document.querySelector('#blog-article .blog-article-marquee').src = this.page_entry.marqueeImage.fields.image.fields.file.url;
                document.querySelector('#blog-article .blog-article-marquee').title = this.page_entry.marqueeImage.fields.title;
                document.querySelector('#blog-article .blog-article-marquee').alt = this.page_entry.marqueeImage.fields.title;

                if (document.querySelector('#blog-article .blog-article-marquee + .placeholder') !== null) {
                    document.querySelector('#blog-article .blog-article-marquee + .placeholder').parentElement.removeChild(document.querySelector('#blog-article .blog-article-marquee + .placeholder'));
                }
            }
        } else {
            if (document.querySelector('#blog-article .blog-article-marquee') !== null) {
                document.querySelector('#blog-article .blog-article-marquee').parentElement.removeChild(document.querySelector('#blog-article .blog-article-marquee'));
            }
        }
        // thumbnail image
        if (this.validateFieldData(this.page_entry.thumbnailImage) && this.validateFieldData(this.page_entry.thumbnailImage, 'image')) {
            if (document.querySelector('#blog-article .blog-intro-block-image') !== null) {
                document.querySelector('#blog-article .blog-intro-block-image').src = this.page_entry.thumbnailImage.fields.file.url;
                document.querySelector('#blog-article .blog-intro-block-image').title = this.page_entry.thumbnailImage.fields.title;
                document.querySelector('#blog-article .blog-intro-block-image').alt = this.page_entry.thumbnailImage.fields.title;

                if (document.querySelector('#blog-article .blog-intro-block-image + .placeholder') !== null) {
                    document.querySelector('#blog-article .blog-intro-block-image + .placeholder').parentElement.removeChild(document.querySelector('#blog-article .blog-intro-block-image + .placeholder'));
                }
            }
        } else {
            if (document.querySelector('#blog-article .blog-intro-block-image') !== null) {
                document.querySelector('#blog-article .blog-intro-block-image').parentElement.removeChild(document.querySelector('#blog-article .blog-intro-block-image'));
            }
        }
        // blog post title and link
        if (this.validateFieldData(this.page_entry.title, 'text')) {
            if (document.querySelector('#blog-article .blog-intro-block-title a') !== null) {
                // title
                if (document.querySelector('#blog-article .blog-intro-block-title a:empty')) {
                    document.querySelector('#blog-article .blog-intro-block-title a').innerHTML = this.page_entry.title;
                }
                // link
                if (document.querySelector('.blog-intro-block-title a').getAttribute('href') === '') {
                    document.querySelector('.blog-intro-block-title a').href = this.page_entry.slug;
                }
            }
        }

        //blog tags
        if (this.validateFieldData(this.page_entry.tags, 'text')) {
          if (document.querySelector('#blog-tags .tags li a') !== null) {
            const tagNode = this.page_entry.tags;
            const tagArray = tagNode.length;
            for (var i = 0; i < tagArray; i++) {
              const tagInstance = document.querySelector('#blog-tags .tags li').cloneNode(true);
              tagInstance.querySelector('a').innerHTML = tagNode[i];
              tagInstance.querySelector('a').href = `/blog/?tag=${tagNode[i].trim()}`;
              document.querySelector('#blog-tags .tags').appendChild(tagInstance);
            }
          }
        }

        // publish date
        if (this.validateFieldData(this.page_entry.publishDate, 'text')) {
            if (document.querySelector('.blog-intro-block-subhead .date') !== null) {
                const date = new Date(this.page_entry.publishDate);
                const dateTimeFormat = new Intl.DateTimeFormat('en', { year: '2-digit', month: 'numeric', day: 'numeric' });
                const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat .formatToParts(date);
                document.querySelector('.blog-intro-block-subhead .date').innerHTML = `${day}.${month}.${year }`;
            }
        }
        // sport
        if (this.validateFieldData(this.page_entry.sport, 'text')) {
            if (document.querySelector('.blog-intro-block-subhead .sport') !== null) {
                document.querySelector('.blog-intro-block-subhead .sport').innerHTML = this.page_entry.sport;
            }
        }
        // subhead
        if (this.validateFieldData(this.page_entry.subhead, 'text')) {
            if (document.querySelector('.blog-intro-block-teaser') !== null) {
                document.querySelector('.blog-intro-block-teaser').innerHTML = this.page_entry.subhead;
            }
        }
        // post content
        if (this.validateFieldData(this.page_entry.content, 'text')) {
            if (document.querySelector('.blog-post-body .blog-post') !== null) {
                const converter = new showdown.Converter();
                const text = this.page_entry.content;
                const html = converter.makeHtml(text);
                document.querySelector('.blog-post-body .blog-post').innerHTML = html;
            }
        }

        // the team
        if (this.validateFieldData(this.page_entry.expeditionTeam, 'array')) {

          for (let i = 0; i < this.page_entry.expeditionTeam.length; i++) {

            if (document.querySelector('.blog-expeditions-team') !== null) {

                const teamInstance = document.querySelector('.blog-expeditions-team').cloneNode(true);
                teamInstance.removeAttribute('hidden');

                if (teamInstance.querySelector('img') !== null) {
                  if (this.validateFieldData(this.page_entry.expeditionTeam[i].fields.profileImage, 'asset')) {
                    teamInstance.querySelector('img').src = this.page_entry.expeditionTeam[i].fields.profileImage.fields.file.url;
                  } else {
                      teamInstance.querySelector('img').parentElement.removeChild(teamInstance.querySelector('img'));
                  }
                }

                if (teamInstance.querySelector('a .name') !== null) {
                  if (this.validateFieldData(this.page_entry.expeditionTeam[i].fields.title, 'text') && this.validateFieldData(this.page_entry.expeditionTeam[i].fields.slug, 'text')) {
                    teamInstance.querySelector('.name').innerHTML = this.page_entry.expeditionTeam[i].fields.title;
                    teamInstance.querySelector('a').href = this.page_entry.expeditionTeam[i].fields.slug;
                  } else {
                      teamInstance.querySelector('a').parentElement.removeChild(teamInstance.querySelector('a'));
                  }
                }

                if (document.querySelector('.expeditions-team') !== null) {
                  document.querySelector('#blog-space').hidden = false;
                  document.querySelector('.expeditions-team').hidden = false;
                  document.querySelector('.expeditions-team').appendChild(teamInstance);
                }
            }
          }

        }


        // expeditions quote
        if (this.validateFieldData(this.page_entry.quote, 'text')) {
            if (document.querySelector('.expeditions-quote .pullquote span') !== null) {
                document.querySelector('.expeditions-quote').hidden = false;
                document.querySelector('.et-title').hidden = false;
                document.querySelector('.expeditions-quote .pullquote span').innerHTML = this.page_entry.quote;
            }
        }

        // author / author bio
        if (this.validateFieldData(this.page_entry.author, 'text')) {
            // look for team member bio and display accordingly
            this.client.getEntries({ 'fields.title': this.page_entry.author, content_type: 'team' })
            .then((response) => {
                if (response.items.length) {
                    if (document.querySelector('.blog-intro-author-content') !== null) {
                        const teamEntries = response.items;
                        for (let i = 0; i < teamEntries.length; i++) {
                            if (teamEntries[i].fields.title === this.page_entry.author) {
                                const author = teamEntries[i].fields;
                                // profile image
                                if (this.validateFieldData(author.profileImage)) {
                                    if (document.querySelector('.blog-intro-author-content .profile-photo') !== null) {
                                        document.querySelector('.blog-intro-author-content .profile-photo').style.backgroundImage = `url(${author.profileImage.fields.file.url})`;
                                        document.querySelector('.blog-intro-author-content .profile-photo img').src = author.profileImage.fields.file.url;
                                        document.querySelector('.blog-intro-author-content .profile-photo img').title = author.profileImage.fields.file.title;
                                        document.querySelector('.blog-intro-author-content .profile-photo img').alt = author.profileImage.fields.file.title;
                                    }
                                }
                                // name
                                if (this.validateFieldData(author.title, 'text')) {
                                    if (document.querySelector('.blog-intro-author-content .name .value') !== null) {
                                        document.querySelector('.blog-intro-author-content .name .value').innerHTML = author.title;
                                    }
                                }
                                // bio
                                if (this.validateFieldData(author.shortBiography, 'text')) {
                                    if (document.querySelector('.blog-intro-author-content .short-bio') !== null) {
                                        document.querySelector('.blog-intro-author-content .short-bio').innerHTML = author.shortBiography;
                                    }
                                }
                                // read more
                                if (this.validateFieldData(author.slug, 'text') && author.teamCategory !== 'No Bio (authors with no team profile)') {
                                    if (document.querySelector('.blog-intro-author-content .read-more') !== null) {
                                        document.querySelector('.blog-intro-author-content .read-more').href = author.slug;
                                        document.querySelector('.blog-intro-author-content .read-more').hidden = false;
                                    }
                                }
                                // social media links
                                if (this.validateFieldData(author.facebookUrl, 'text')
                                    || this.validateFieldData(author.twitterUrl, 'text')
                                    || this.validateFieldData(author.instagramUrl, 'text')
                                    && document.querySelector('.blog-intro-author-content .author-links') !== null
                                ) {
                                    // show the link list
                                    document.querySelector('.blog-intro-author-content .author-links').hidden = false;
                                    // facebook
                                    if (this.validateFieldData(author.facebookUrl, 'text')) {
                                        document.querySelector('.blog-intro-author-content .author-links .social-links .facebook a').href = author.facebookUrl;
                                        document.querySelector('.blog-intro-author-content .author-links .facebook').classList.add('visible');
                                        document.querySelector('.blog-intro-author-content .author-links .facebook').hidden = false;
                                    }
                                    // twitter
                                    if (this.validateFieldData(author.twitterUrl, 'text')) {
                                        document.querySelector('.blog-intro-author-content .author-links .social-links .twitter a').href = author.twitterUrl;
                                        document.querySelector('.blog-intro-author-content .author-links .twitter').classList.add('visible');
                                        document.querySelector('.blog-intro-author-content .author-links .twitter').hidden = false;
                                    }
                                    // instagram
                                    if (this.validateFieldData(author.instagramUrl, 'text')) {
                                        document.querySelector('.blog-intro-author-content .author-links .social-links .instagram a').href = author.instagramUrl;
                                        document.querySelector('.blog-intro-author-content .author-links .instagram').classList.add('visible');
                                        document.querySelector('.blog-intro-author-content .author-links .instagram').hidden = false;
                                    }
                                }
                                document.querySelector('.blog-intro-author-content').hidden = false;
                                break;
                            }
                        }
                    }
                } else {
                    // display author from blog post if team member bio isn't found
                    if (document.querySelector('.blog-intro-block-subhead .author') !== null) {
                        if (document.querySelector('.blog-intro-author-content').hidden === true) {
                            document.querySelector('.blog-intro-block-subhead .author .value').innerHTML = this.page_entry.author;
                            document.querySelector('.blog-intro-block-subhead .author').hidden = false;
                        }
                    }
                }
            }).catch(console.error);
        }
        // video
        if (this.validateFieldData(this.page_entry.video)) {
            if (document.querySelector('.blog-post-video') !== null) {
                document.querySelector('.blog-post-video').innerHTML = convertVideoUrlToEmbed(this.page_entry.video, 750, 429);
                document.querySelector('.blog-post-video').classList.add('video-responsive-width');
            }
        }
        // photogrid
        if (this.validateFieldData(this.page_entry.photoGridTopLandscape, 'image')
            && this.validateFieldData(this.page_entry.photoGridBottomPortrait, 'image')
            && this.validateFieldData(this.page_entry.photoGridBottomLandscape, 'image')
            && this.validateFieldData(this.page_entry.photoGridCaption, 'text')
            && this.validateFieldData(this.page_entry.photoGridQuote, 'text')
        ) {
            if (document.querySelector('.blog-post-photo-grid') !== null) {
                // top landscape image
                if (document.querySelector('.blog-post-photo-grid .photo-grid-top-landscape-image') !== null) {
                    document.querySelector('.blog-post-photo-grid .photo-grid-top-landscape-image').style.backgroundImage = `url(${this.page_entry.photoGridTopLandscape.fields.file.url})`;
                    document.querySelector('.blog-post-photo-grid .photo-grid-top-landscape-image img').src = this.page_entry.photoGridTopLandscape.fields.file.url;
                    document.querySelector('.blog-post-photo-grid .photo-grid-top-landscape-image img').title = this.page_entry.photoGridTopLandscape.fields.title;
                    document.querySelector('.blog-post-photo-grid .photo-grid-top-landscape-image img').alt = this.page_entry.photoGridTopLandscape.fields.title;
                }
                // bottom landscape image
                if (document.querySelector('.blog-post-photo-grid .photo-grid-bottom-landscape-image') !== null) {
                    document.querySelector('.blog-post-photo-grid .photo-grid-bottom-landscape-image').style.backgroundImage = `url(${this.page_entry.photoGridBottomLandscape.fields.file.url})`;
                    document.querySelector('.blog-post-photo-grid .photo-grid-bottom-landscape-image img').src = this.page_entry.photoGridBottomLandscape.fields.file.url;
                    document.querySelector('.blog-post-photo-grid .photo-grid-bottom-landscape-image img').title = this.page_entry.photoGridBottomLandscape.fields.title;
                    document.querySelector('.blog-post-photo-grid .photo-grid-bottom-landscape-image img').alt = this.page_entry.photoGridBottomLandscape.fields.title;
                }
                // bottom portrait image
                if (document.querySelector('.blog-post-photo-grid .photo-grid-bottom-portrait-image') !== null) {
                    document.querySelector('.blog-post-photo-grid .photo-grid-bottom-portrait-image').style.backgroundImage = `url(${this.page_entry.photoGridBottomPortrait.fields.file.url})`;
                    document.querySelector('.blog-post-photo-grid .photo-grid-bottom-portrait-image img').src = this.page_entry.photoGridBottomPortrait.fields.file.url;
                    document.querySelector('.blog-post-photo-grid .photo-grid-bottom-portrait-image img').title = this.page_entry.photoGridBottomPortrait.fields.title;
                    document.querySelector('.blog-post-photo-grid .photo-grid-bottom-portrait-image img').alt = this.page_entry.photoGridBottomPortrait.fields.title;
                }
                // quote
                if (document.querySelector('.blog-post-photo-grid .photo-grid-quote') !== null) {
                    document.querySelector('.blog-post-photo-grid .photo-grid-quote .pullquote').innerHTML = this.page_entry.photoGridQuote;
                }
                // caption
                if (document.querySelector('.blog-post-photo-grid .photo-grid-caption') !== null) {
                    document.querySelector('.blog-post-photo-grid .photo-grid-caption .caption').innerHTML = this.page_entry.photoGridCaption;
                }
                // unhide photo grid
                document.querySelector('.blog-post-photo-grid').hidden = false;
            }
        }
        // photo gallery
        if (this.validateFieldData(this.page_entry.photoGallery)) {
            if (document.querySelector('.blog-post-photo-gallery') !== null) {
                singleImageGallery(this.page_entry.photoGallery);
                // unhide photo gallery
                document.querySelector('.blog-post-photo-gallery').hidden = false;
            }
        }
        // product
        if (this.validateFieldData(this.page_entry.relatedProductsV2, this.context.bearerToken)) {
            if (document.querySelector('#blog-article-featured')) {
                const productCarousel = new ProductCarousel('productCarousel', `${this.page_entry.title.toLowerCase().replace(' ', '-')}-related-products`, this.page_entry.relatedProductsV2, this.context.bearerToken);
                if (productCarousel !== null) {
                    document.querySelector('#blog-article-featured').appendChild(productCarousel);
                    if(this.page_entry.expeditionTeam) {
                        const gearHeader = document.createElement('h3');
                        gearHeader.className = 'carousel-header';
                        gearHeader.innerHTML = `<span>Gear that made this possible</span>`;
                        productCarousel.before(gearHeader);
                    }
                }
            }
        }
        // related related posts
        if (this.validateFieldData(this.page_entry.categories, 'array')) {
          this.client.getEntries({ 'fields.categories': this.page_entry.categories[0], 'fields.slug[ne]': this.page_entry.slug, content_type: 'blogPost', limit: 3 })
          .then((response) => {
              if (this.validateFieldData(response.items, 'array')) {
                  if (document.querySelector('#blog-article-feed') && response.items.length > 0) {
                      for (let i = 0; i < response.items.length; i++) {
                          const blogPost = response.items[i].fields;
                          if (typeof blogPost !== undefined) {
                              const clone = document.querySelector('.blog-card').cloneNode(true);
                              // title
                              if (this.validateFieldData(blogPost.title, 'text')) {
                                  clone.querySelector('.blog-title a').innerHTML = blogPost.title;
                              }
                              // slug
                              if (this.validateFieldData(blogPost.slug, 'text')) {
                                  clone.querySelector('.blog-title a').href = blogPost.slug;
                                  clone.querySelector('.blog-post .text-link').href = blogPost.slug;
                              }
                              // thumbnail image
                              if (this.validateFieldData(blogPost.thumbnailImage) && this.validateFieldData(blogPost.thumbnailImage, 'asset')) {
                                  clone.querySelector('.blog-thumbnail-image').src = blogPost.thumbnailImage.fields.file.url;
                                  clone.querySelector('.blog-thumbnail-image').title = blogPost.thumbnailImage.fields.title;
                                  clone.querySelector('.blog-thumbnail-image').alt = blogPost.thumbnailImage.fields.title;
                              }
                              // sport
                              if (this.validateFieldData(blogPost.sport, 'text')) {
                                  clone.querySelector('.tag').innerHTML = blogPost.sport;
                              }
                              // publish date
                              if (this.validateFieldData(blogPost.publishDate, 'text')) {
                                  const date = new Date(this.page_entry.publishDate);
                                  const dateTimeFormat = new Intl.DateTimeFormat('en', { year: '2-digit', month: 'numeric', day: 'numeric' });
                                  const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat .formatToParts(date);
                                  clone.querySelector('.blog-date').innerHTML = `${day}.${month}.${year }`;
                              }
                              // teaser
                              if (this.validateFieldData(blogPost.teaser, 'text')) {
                                  clone.querySelector('.blog-post p').innerHTML = blogPost.teaser;
                              }

                              document.querySelector('#blog-article-feed .blog-post-feed').appendChild(clone);

                              clone.hidden = false;
                          }
                      }
                      document.querySelector('#blog-article-feed').hidden = false;
                  }
              }
          });
        }
    }
}
