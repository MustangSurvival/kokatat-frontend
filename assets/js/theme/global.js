import './global/jquery-migrate';
import './common/select-option-plugin';
import PageManager from './page-manager';
import quickSearch from './global/quick-search';
import currencySelector from './global/currency-selector';
import mobileMenuToggle from './global/mobile-menu-toggle';
import menu from './global/menu';
import foundation from './global/foundation';
import quickView from './global/quick-view';
import cartPreview from './global/cart-preview';
import privacyCookieNotification from './global/cookieNotification';
import maintenanceMode from './global/maintenanceMode';
import carousel from './common/carousel';
import loadingProgressBar from './global/loading-progress-bar';
import svgInjector from './global/svg-injector';
import objectFitImages from './global/object-fit-polyfill';
import { swatchToolTip, hideLinks } from './kokatat/global';
import './kokatat/pdp';
// import ContentfulEnvironment from './kokatat/contentful/contentful-env';
import ContentfulHomePage from './kokatat/contentful/pages/home';
import ContentfulCategoryLandingPage from './kokatat/contentful/pages/category-landing';
import ContentfulTeamLandingPage from './kokatat/contentful/pages/team-landing';
import ContentfulTeamDetailPage from './kokatat/contentful/pages/team-detail';
import ContentfulBlogPost from './kokatat/contentful/blog/blog-post';
import ContentfulCategory from './kokatat/contentful/pages/category';
import ContentfulBlogLandingPage from './kokatat/contentful/pages/blog-landing';
import ContentfulSupportPage from './kokatat/contentful/pages/support';
import ContentfulLifeLandingPage from './kokatat/contentful/pages/life-landing';
import ContentfulAboutPage from './kokatat/contentful/pages/about';
import ContentfulCareersPage from './kokatat/contentful/pages/careers';
import ContentfulContactPage from './kokatat/contentful/pages/contact';
import ContentfulCustomSuitLandingPage from './kokatat/contentful/pages/custom-suit-landing';
import ContentfulSalesRepPage from './kokatat/contentful/pages/sales-rep';
import ContentfulSupportLandingPage from './kokatat/contentful/pages/support-landing';
import ContentfulTermsPrivacyPage from './kokatat/contentful/pages/terms-privacy';
import ContentfulAboutUsPage from './kokatat/contentful/pages/about-us';

export default class Global extends PageManager {
    onReady() {
        // cartPreview(this.context.secureBaseUrl, this.context.cartId);
        const { cartId, secureBaseUrl } = this.context;
        cartPreview(secureBaseUrl, cartId);
        quickSearch();
        // currencySelector();
        currencySelector(cartId);
        foundation($(document));
        quickView(this.context);
        // carousel();
        carousel(this.context);
        menu();
        mobileMenuToggle();
        privacyCookieNotification();
        maintenanceMode(this.context.maintenanceMode);
        loadingProgressBar();
        svgInjector();
        objectFitImages();
        swatchToolTip();
        hideLinks();
        const _tmpl = this.context.template;
        const _tmplKey = _tmpl.split(/[/\\]/).pop();
        switch (_tmplKey) {
        case 'home': {
            const contentfulHomePage = new ContentfulHomePage(this.context);
            contentfulHomePage.client.getEntries({ content_type: 'homePage' })
                .then((response) => {
                    for (let i = 0; i < response.items.length; i++) {
                        if (response.items[i].fields.title === 'Home Page') {
                            contentfulHomePage.setEntryData(response.items[i]);
                            contentfulHomePage.populateContent();
                            break;
                        }
                    }
                })
                .catch(console.error);
            break;
        }
        case 'strike-home': {
            const contentfulHomePage = new ContentfulHomePage(this.context);
            contentfulHomePage.client.getEntries({ content_type: 'homePage' })
                .then((response) => {
                    for (let i = 0; i < response.items.length; i++) {
                        if (response.items[i].fields.title === 'Strike Home Page') {
                            contentfulHomePage.setEntryData(response.items[i]);
                            contentfulHomePage.populateContent();
                            break;
                        }
                    }
                })
                .catch(console.error);
            break;
        }
        case 'category-landing': {
            const contentfulCategoryLandingPage = new ContentfulCategoryLandingPage(this.context);
            contentfulCategoryLandingPage.client.getEntries({ content_type: 'categoryLandingPage' })
                .then((response) => {
                    contentfulCategoryLandingPage.setEntryData(response);
                    contentfulCategoryLandingPage.populateContent();
                })
                .catch(console.error);
            break;
        }
        case 'category': {
            const contentfulCategory = new ContentfulCategory(this.context);
            contentfulCategory.client.getEntries({ 'fields.slug': location.pathname, content_type: 'category' })
            .then((response) => {
                contentfulCategory.setEntryData(response);
                contentfulCategory.populateContent();
            })
            .catch(console.error);
            break;
        }
        case 'strike-category': {
            const contentfulCategory = new ContentfulCategory(this.context);
            contentfulCategory.client.getEntries({ 'fields.slug': location.pathname, content_type: 'category' })
            .then((response) => {
                contentfulCategory.setEntryData(response);
                contentfulCategory.populateContent();
            })
            .catch(console.error);
            break;
        }
        case 'team-member': {
            const contentfulTeamDetailPage = new ContentfulTeamDetailPage(this.context);
            contentfulTeamDetailPage.client.getEntries({ 'fields.slug': location.pathname, content_type: 'team' })
                .then((response) => {
                    contentfulTeamDetailPage.setEntryData(response);
                    contentfulTeamDetailPage.populateContent();
                })
                .catch(console.error);
            break;
        }
        case 'blog': {
            const contentfulBlogLandingPage = new ContentfulBlogLandingPage(this.context);
            contentfulBlogLandingPage.client.getEntries({ content_type: 'blogLandingPage' })
            .then((response) => {
                contentfulBlogLandingPage.setEntryData(response);
                contentfulBlogLandingPage.populateContent();
            })
            .catch(console.error);
            break;
        }
        case 'blog-post': {
            const contentfulBlogPost = new ContentfulBlogPost(this.context);
            contentfulBlogPost.client.getEntries({ 'fields.slug': location.pathname, content_type: 'blogPost' })
            .then((response) => {
                if (response.items.length) {
                    contentfulBlogPost.setEntryData(response);
                    contentfulBlogPost.populateContent();
                } else {
                    contentfulBlogPost.client.getEntries({ 'fields.slug': location.pathname, content_type: 'expedition' })
                    .then((responseData) => {
                        contentfulBlogPost.setEntryData(responseData);
                        contentfulBlogPost.populateContent();
                    })
                    .catch(console.error);
                }
            })
            .catch(console.error);
            break;
        }
        case 'support-landing': {
            const contentfulSupportLandingPage = new ContentfulSupportLandingPage(this.context);
            contentfulSupportLandingPage.client.getEntries({ content_type: 'supportLandingPage' })
            .then((response) => {
                contentfulSupportLandingPage.setEntryData(response);
                contentfulSupportLandingPage.populateContent();
            })
            .catch(console.error);
            break;
        }
        case 'support': {
            const contentfulSupportPage = new ContentfulSupportPage(this.context);
            contentfulSupportPage.client.getEntries({ content_type: 'supportPage' })
            .then((response) => {
                contentfulSupportPage.setEntryData(response);
                contentfulSupportPage.populateContent();
            })
            .catch(console.error);
            break;
        }
        case 'strike-support': {
            const contentfulSupportPage = new ContentfulSupportPage(this.context);
            contentfulSupportPage.client.getEntries({ content_type: 'supportPage' })
            .then((response) => {
                contentfulSupportPage.setEntryData(response);
                contentfulSupportPage.populateContent();
            })
            .catch(console.error);
            break;
        }
        case 'about': {
            const contentfulAboutPage = new ContentfulAboutPage(this.context);
            contentfulAboutPage.client.getEntries({ content_type: 'aboutPage' })
            .then((response) => {
                contentfulAboutPage.setEntryData(response);
                contentfulAboutPage.populateContent();
            })
            .catch(console.error);
            break;
        }
        case 'strike-static': {
            const contentfulAboutPage = new ContentfulAboutPage(this.context);
            contentfulAboutPage.client.getEntries({ content_type: 'aboutPage' })
            .then((response) => {
                contentfulAboutPage.setEntryData(response);
                contentfulAboutPage.populateContent();
            })
            .catch(console.error);
            break;
        }
        case 'careers': {
            const contentfulCareersPage = new ContentfulCareersPage(this.context);
            contentfulCareersPage.client.getEntries({ content_type: 'careersPage' })
            .then((response) => {
                contentfulCareersPage.setEntryData(response);
                contentfulCareersPage.populateContent();
            })
            .catch(console.error);
            break;
        }
        case 'contact': {
            const contentfulContactPage = new ContentfulContactPage(this.context);
            contentfulContactPage.client.getEntries({ content_type: 'contactPage' })
            .then((response) => {
                contentfulContactPage.setEntryData(response);
                contentfulContactPage.populateContent();
            })
            .catch(console.error);
            break;
        }
        case 'strike-contact': {
            const contentfulContactPage = new ContentfulContactPage(this.context);
            contentfulContactPage.client.getEntries({ content_type: 'contactPage' })
            .then((response) => {
                contentfulContactPage.setEntryData(response);
                contentfulContactPage.populateContent();
            })
            .catch(console.error);
            break;
        }
        case 'custom-suit-landing': {
            const contentfulCustomSuitLandingPage = new ContentfulCustomSuitLandingPage(this.context);
            contentfulCustomSuitLandingPage.client.getEntries({ content_type: 'customLandingPage' })
            .then((response) => {
                contentfulCustomSuitLandingPage.setEntryData(response);
                contentfulCustomSuitLandingPage.populateContent();
            })
            .catch(console.error);
            break;
        }
        case 'life-landing': {
            const contentfulLifeLandingPage = new ContentfulLifeLandingPage(this.context);
            contentfulLifeLandingPage.client.getEntries({ content_type: 'lifeLandingPage' })
            .then((response) => {
                contentfulLifeLandingPage.setEntryData(response);
                contentfulLifeLandingPage.populateContent();
            })
            .catch(console.error);
            break;
        }
        case 'about-us': {
            const contentfulAboutUsPage = new ContentfulAboutUsPage(this.context);
            contentfulAboutUsPage.client.getEntries({ content_type: 'lifeLandingPage' })
            .then((response) => {
                contentfulAboutUsPage.setEntryData(response);
                contentfulAboutUsPage.populateContent();
            })
            .catch(console.error);
            break;
        }
        case 'team-landing': {
            const contentfulTeamLandingPage = new ContentfulTeamLandingPage(this.context);
            contentfulTeamLandingPage.client.getEntries({ content_type: 'team', 'fields.teamCategory[ne]': 'No Bio (authors with no team profile)', order: 'fields.sortOrder' })
                .then((response) => {
                    contentfulTeamLandingPage.team_entries = response;
                    contentfulTeamLandingPage.client.getEntries({ content_type: 'teamLandingPage' })
                        .then((responseData) => {
                            contentfulTeamLandingPage.setEntryData(responseData);
                            contentfulTeamLandingPage.populateContent();
                        })
                        .catch(console.error);
                })
                .catch(e => console.error('[KOK] team entries fetch error:', e));
            break;
        }
        case 'sales-rep': {
            const contentfulSalesRepPage = new ContentfulSalesRepPage(this.context);
            contentfulSalesRepPage.client.getEntries({ content_type: 'salesRepPage' })
            .then((response) => {
                contentfulSalesRepPage.setEntryData(response);
                contentfulSalesRepPage.populateContent();
            })
            .catch(console.error);
            break;
        }
        case 'terms-privacy': {
            const contentfulTermsPrivacyPage = new ContentfulTermsPrivacyPage(this.context);
            contentfulTermsPrivacyPage.client.getEntries({ content_type: 'termsPrivacy' })
            .then((response) => {
                contentfulTermsPrivacyPage.setEntryData(response);
                contentfulTermsPrivacyPage.populateContent();
            })
            .catch(console.error);
            break;
        }
        case 'page': {
            const path = window.location.pathname.replace(/\/$/, '') || '/';
            if (path === '/team') {
                const p = new ContentfulTeamLandingPage(this.context);
                p.client.getEntries({ content_type: 'team', 'fields.teamCategory[ne]': 'No Bio (authors with no team profile)', order: 'fields.sortOrder' })
                    .then((response) => {
                        p.team_entries = response;
                        p.client.getEntries({ content_type: 'teamLandingPage' })
                            .then((responseData) => { p.setEntryData(responseData); p.populateContent(); })
                            .catch(console.error);
                    })
                    .catch(console.error);
            } else if (path.startsWith('/team/')) {
                const p = new ContentfulTeamDetailPage(this.context);
                p.client.getEntries({ 'fields.slug': location.pathname, content_type: 'team' })
                    .then((response) => { p.setEntryData(response); p.populateContent(); })
                    .catch(console.error);
            } else if (path === '/about-us') {
                const p = new ContentfulAboutUsPage(this.context);
                p.client.getEntries({ content_type: 'lifeLandingPage' })
                    .then((response) => { p.setEntryData(response); p.populateContent(); })
                    .catch(console.error);
            } else if (path === '/life') {
                const p = new ContentfulLifeLandingPage(this.context);
                p.client.getEntries({ content_type: 'lifeLandingPage' })
                    .then((response) => { p.setEntryData(response); p.populateContent(); })
                    .catch(console.error);
            } else if (path === '/careers') {
                const p = new ContentfulCareersPage(this.context);
                p.client.getEntries({ content_type: 'careersPage' })
                    .then((response) => { p.setEntryData(response); p.populateContent(); })
                    .catch(console.error);
            } else if (path === '/contact-us') {
                const p = new ContentfulContactPage(this.context);
                p.client.getEntries({ content_type: 'contactPage' })
                    .then((response) => { p.setEntryData(response); p.populateContent(); })
                    .catch(console.error);
            } else if (path === '/reps') {
                const p = new ContentfulSalesRepPage(this.context);
                p.client.getEntries({ content_type: 'salesRepPage' })
                    .then((response) => { p.setEntryData(response); p.populateContent(); })
                    .catch(console.error);
            } else if (path === '/support') {
                const p = new ContentfulSupportLandingPage(this.context);
                p.client.getEntries({ content_type: 'supportLandingPage' })
                    .then((response) => { p.setEntryData(response); p.populateContent(); })
                    .catch(console.error);
            } else if (path.startsWith('/support/') || path.startsWith('/strike/support/')) {
                const p = new ContentfulSupportPage(this.context);
                p.client.getEntries({ content_type: 'supportPage' })
                    .then((response) => { p.setEntryData(response); p.populateContent(); })
                    .catch(console.error);
            } else if (path === '/terms-of-use' || path === '/privacy-policy') {
                const p = new ContentfulTermsPrivacyPage(this.context);
                p.client.getEntries({ content_type: 'termsPrivacy' })
                    .then((response) => { p.setEntryData(response); p.populateContent(); })
                    .catch(console.error);
            } else if (path === '/strike') {
                const p = new ContentfulHomePage(this.context);
                p.client.getEntries({ content_type: 'homePage' })
                    .then((response) => {
                        for (let i = 0; i < response.items.length; i++) {
                            if (response.items[i].fields.title === 'Strike Home Page') {
                                p.setEntryData(response.items[i]); p.populateContent(); break;
                            }
                        }
                    })
                    .catch(console.error);
            }
            break;
        }
        default: {
            // return;
        }
        }
    }
}
