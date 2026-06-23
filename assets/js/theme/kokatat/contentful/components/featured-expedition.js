import ComponentAbstract from './component-abstract';
import * as contentful from 'contentful';
import ContentfulEnvironment from '../contentful-env';

export default class FeaturedExpedition extends ComponentAbstract {
    generateFrontEndComponent() {
        this.env = new ContentfulEnvironment();
        this.client = contentful.createClient({
            space: this.env.space,
            accessToken: this.env.access_token,
        });
        const componentInstance = this;

        // Populate Content
        if (document.getElementById(this.templateId)) {
            const templateInstance = document.getElementById(this.templateId).cloneNode(true);
            // Configure Element
            templateInstance.id = this.entryId;
            templateInstance.removeAttribute('hidden');
            templateInstance.classList.add(this.templateId);

            if (this.validateFieldData(this.fieldData.title)) {
                if (templateInstance.querySelector('.desktop .page-heading') !== null) {
                    templateInstance.querySelector('.desktop .page-heading').innerHTML = this.fieldData.title;
                }
                if (templateInstance.querySelector('.mobile .page-heading') !== null) {
                    templateInstance.querySelector('.mobile .page-heading').innerHTML = this.fieldData.title;
                }
            }

            if (this.validateFieldData(this.fieldData.teaser)) {
                if (templateInstance.querySelector('.desktop .text-copy') !== null) {
                    templateInstance.querySelector('.desktop .text-copy').innerHTML = this.fieldData.teaser;
                }
                if (templateInstance.querySelector('mobile .text-copy') !== null) {
                    templateInstance.querySelector('mobile .text-copy').innerHTML = this.fieldData.teaser;
                }
            }

            if (this.validateFieldData(this.fieldData.marqueeImage) && this.validateFieldData(this.fieldData.marqueeImage.sys.id, 'text')) {
                this.client.getEntry(this.fieldData.marqueeImage.sys.id)
                .then((response) => {
                    if (componentInstance.validateFieldData(response.fields.image, 'asset')) {
                        if (templateInstance.querySelector('.marquee-block') !== null) {
                            templateInstance.querySelector('.marquee-block').style.backgroundImage = `url('${response.fields.image.fields.file.url}')`;
                        }
                    }
                });
            }

            if (this.validateFieldData(this.fieldData.slug, 'text')) {
                if (templateInstance.querySelector('a.button--secondary') !== null) {
                    templateInstance.querySelector('a.button--secondary').href = this.fieldData.slug;
                }
            } else {
                if (templateInstance.querySelector('a.button--secondary') !== null) {
                    templateInstance.querySelector('a.button--secondary').parentElement.removeChild(templateInstance.querySelector('.story-image a.text-link'));
                }
            }
            
            if (this.validateFieldData(this.fieldData.slug, 'text')) {
                if (templateInstance.querySelector('a.button--primary') !== null) {
                    templateInstance.querySelector('a.button--primary').href = this.fieldData.slug;
                }
              }
            

            return templateInstance;
        }

        return null;
    }
}
