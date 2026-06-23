import ContentfulAbstract from '../contentful-abstract';

const Slick = require('slick-carousel');

// Content Components
// import MarqueeSlide from '../components/marquee-slide';
// import ProductCarousel from '../components/product-carousel';

export default class ContentfulTeamLandingPage extends ContentfulAbstract {
    constructor(context) {
        super(context);

        this.page_entry = null;
        if (window.Slick === 'undefined') window.Slick = Slick;
    }

    setEntryData(responseData) {
        const entryItems = responseData.items;
        const teamEntries = this.team_entries.items;
        const pageSlug = window.location.pathname.split('/')[window.location.pathname.split('/').length - 2];
        this.page_entry = entryItems[0].fields;

        for (let i = 0; i < teamEntries.length; i++) {
            if (teamEntries[i].fields.slug === pageSlug) {
                this.page_entry = teamEntries[i].fields;
                break;
            }
        }
    }

    populateContent() {
        const teamEntries = this.team_entries.items;
        if (this.page_entry !== null) {
            if (this.validateFieldData(this.page_entry.marqueeImage) && this.validateFieldData(this.page_entry.marqueeImage.fields.image, 'asset')) {
                if (document.querySelector('.category-marquee') !== null) {
                    document.querySelector('.category-marquee').style.backgroundImage = `url('${this.page_entry.marqueeImage.fields.image.fields.file.url}')`;
                }
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

            if (this.validateFieldData(this.page_entry.proHeadline, 'text')) {
                if (document.querySelector('#pro-team .heading h3') !== null) {
                    document.querySelector('#pro-team .heading h3').innerHTML = this.page_entry.proHeadline;
                }

                if (document.querySelector('.team-nav-list .nav-link[href="#pro-team"]') !== null) {
                    document.querySelector('.team-nav-list .nav-link[href="#pro-team"]').innerHTML = this.page_entry.proHeadline;
                }
            }

            if (this.validateFieldData(this.page_entry.proCopy, 'text')) {
                if (document.querySelector('#pro-team .heading p') !== null) {
                    document.querySelector('#pro-team .heading p').innerHTML = this.page_entry.proCopy;
                }
            }

            if (this.validateFieldData(this.page_entry.ambassadorHeadline, 'text')) {
                if (document.querySelector('#ambassador-team .heading h3') !== null) {
                    document.querySelector('#ambassador-team .heading h3').innerHTML = this.page_entry.ambassadorHeadline;
                }

                if (document.querySelector('.team-nav-list .nav-link[href="#ambassador-team"]') !== null) {
                    document.querySelector('.team-nav-list .nav-link[href="#ambassador-team"]').innerHTML = this.page_entry.ambassadorHeadline;
                }
            }

            if (this.validateFieldData(this.page_entry.ambassadorCopy, 'text')) {
                if (document.querySelector('#ambassador-team .heading p') !== null) {
                    document.querySelector('#ambassador-team .heading p').innerHTML = this.page_entry.ambassadorCopy;
                }
            }

            if (this.validateFieldData(this.page_entry.kayakFishingHeadline, 'text')) {
                if (document.querySelector('#kayak-team .heading h3') !== null) {
                    document.querySelector('#kayak-team .heading h3').innerHTML = this.page_entry.kayakFishingHeadline;
                }

                if (document.querySelector('.team-nav-list .nav-link[href="#kayak-team"]') !== null) {
                    document.querySelector('.team-nav-list .nav-link[href="#kayak-team"]').innerHTML = this.page_entry.kayakFishingHeadline;
                }
            }

            if (this.validateFieldData(this.page_entry.kayakFishingCopy, 'text')) {
                if (document.querySelector('#kayak-team .heading p') !== null) {
                    document.querySelector('#kayak-team .heading p').innerHTML = this.page_entry.kayakFishingCopy;
                }
            }
        }

        if (this.team_entries.items !== null) {
            const teamMember = document.querySelector('.team-member');

            for (let i = 0; i < teamEntries.length; i++) {
                const teamEntry = teamEntries[i].fields;
                const clone = teamMember.cloneNode(true);

                if (this.validateFieldData(teamEntry.title, 'text')) {
                    clone.querySelector('.name').innerHTML = teamEntry.title;
                }

                if (this.validateFieldData(teamEntry.profileImage) && this.validateFieldData(teamEntry.profileImage, 'asset')) {
                    const profileImg = clone.querySelector('.profile-image');
                    profileImg.src = teamEntry.profileImage.fields.file.url;
                    profileImg.alt = teamEntry.title || '';
                }

                if (this.validateFieldData(teamEntry.flagIcon, 'asset')) {
                    clone.querySelector('.flag img').src = teamEntry.flagIcon.fields.file.url;
                    clone.querySelector('.flag').hidden = false;
                }

                if (this.validateFieldData(teamEntry.teamCategory, 'text')) {
                    clone.querySelector('.tag').innerHTML = teamEntry.teamCategory;

                    if (teamEntry.teamCategory === 'Pro') {
                        document.querySelector('#pro-team .team-members').appendChild(clone);
                    }
                    if (teamEntry.teamCategory === 'Ambassador') {
                        document.querySelector('#ambassador-team .team-members').appendChild(clone);
                    }
                    if (teamEntry.teamCategory === 'Kayak Fishing') {
                        document.querySelector('#kayak-team .team-members').appendChild(clone);
                    }
                }

                if (this.validateFieldData(teamEntry.slug, 'text')) {
                    clone.href = teamEntry.slug;
                }

                clone.hidden = false;
            }
        }
    }
}
