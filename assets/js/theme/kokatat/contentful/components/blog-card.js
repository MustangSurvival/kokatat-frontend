import ComponentAbstract from './component-abstract';

export default class BlogCard extends ComponentAbstract {

    generateFrontEndComponent() {
        // Populate Content
        if (document.getElementById(this.templateId)) {
            const templateInstance = document.getElementById(this.templateId).cloneNode(true);
            // Configure Element
            templateInstance.id = this.entryId;
            templateInstance.removeAttribute('hidden');
            templateInstance.classList.add(this.templateId);

            if (this.validateFieldData(this.fieldData.thumbnailImage, 'image')) {
                if (templateInstance.querySelector('img') !== null) {
                    templateInstance.querySelector('img').src = this.fieldData.thumbnailImage.fields.file.url;
                    templateInstance.querySelector('img').setAttribute('alt', this.fieldData.thumbnailImage.fields.title);
                    templateInstance.querySelector('img').classList.remove('hidden');
                }
                if (templateInstance.querySelector('.placeholder') !== null) {
                    templateInstance.querySelector('.placeholder').parentElement.removeChild(templateInstance.querySelector('.placeholder'));
                }
            } else {
                if (templateInstance.querySelector('img') !== null) {
                    templateInstance.querySelector('img').parentElement.removeChild(templateInstance.querySelector('img'));
                }
            }

            if (this.validateFieldData(this.fieldData.activity, 'text')) {
                if (templateInstance.querySelector('.tag') !== null) {
                    templateInstance.querySelector('.tag').innerHTML = this.fieldData.activity;
                }
            }

            if (this.validateFieldData(this.fieldData.sport, 'text')) {
                if (templateInstance.querySelector('.tag') !== null) {
                    templateInstance.querySelector('.tag').innerHTML = this.fieldData.sport;
                }
            }

            if (this.validateFieldData(this.fieldData.publishDate, 'text')) {
                if (templateInstance.querySelector('.blog-date') !== null) {
                    const date = new Date(this.fieldData.publishDate);
                    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: '2-digit', month: 'numeric', day: 'numeric' });
                    const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat .formatToParts(date);
                    templateInstance.querySelector('.blog-date').innerHTML = `${day}.${month}.${year}`;
                }
            }

            if (this.validateFieldData(this.fieldData.title, 'text') && this.validateFieldData(this.fieldData.slug, 'text')) {
                if (templateInstance.querySelector('.blog-title') !== null) {
                    templateInstance.querySelector('.blog-title').innerHTML = `<a href="${this.fieldData.slug}">${this.fieldData.title}</a>`;
                }
            }

            if (this.validateFieldData(this.fieldData.teaser, 'text')) {
                if (templateInstance.querySelector('.teaser') !== null) {
                    templateInstance.querySelector('.teaser').innerHTML = this.fieldData.teaser;
                }
            }

            if (this.validateFieldData(this.fieldData.slug, 'text')) {
                if (templateInstance.querySelector('a.text-link') !== null) {
                    templateInstance.querySelector('a.text-link').href = this.fieldData.slug;
                }
            }

            if (this.validateFieldData(this.fieldData.slug, 'text')) {
                if (templateInstance.querySelector('a.overlay') !== null) {
                    templateInstance.querySelector('a.overlay').href = this.fieldData.slug;
                }
            }

            return templateInstance;
        }

        return null;
    }
}
