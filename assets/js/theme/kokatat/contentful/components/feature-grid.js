import ComponentAbstract from './component-abstract';
import { defaultModal } from '../../../global/modal';
import { convertVideoUrlToEmbed } from '../utility-functions';

export default class FeatureGrid extends ComponentAbstract {

    generateFrontEndComponent() {
        if (document.getElementById(this.templateId)) {
            const templateInstance = document.getElementById(this.templateId).cloneNode(true);
            // Configure Element
            templateInstance.id = this.entryId;
            templateInstance.removeAttribute('hidden');
            templateInstance.classList.add(this.templateId);

            if (this.validateFieldData(this.fieldData.headline, 'text')) {
                if (templateInstance.querySelector('.content .headline') !== null) {
                    templateInstance.querySelector('.content .headline').innerHTML = this.fieldData.headline;
                }
            }

            if (this.validateFieldData(this.fieldData.subhead, 'text')) {
                if (templateInstance.querySelector('.content .copy') !== null) {
                    templateInstance.querySelector('.content .copy').innerHTML = this.fieldData.subhead;
                }
            }

            if (this.validateFieldData(this.fieldData.ctaText, 'text') && this.validateFieldData(this.fieldData.ctaUrl, 'text')) {
                if (templateInstance.querySelector('.content a.text-link') !== null) {
                    templateInstance.querySelector('.content a.text-link').href = this.fieldData.ctaUrl;
                    templateInstance.querySelector('.content a.text-link').innerHTML = this.fieldData.ctaText;
                }
            } else {
                if (templateInstance.querySelector('.content a.text-link') !== null) {
                    templateInstance.querySelector('.content a.text-link').parentElement.removeChild(templateInstance.querySelector('.content a.text-link'));
                }
            }

            if (this.validateFieldData(this.fieldData.video, 'text')) {
                const modal = defaultModal();

                if (templateInstance.querySelector('.content a.video-link') !== null) {
                    templateInstance.querySelector('.content a.video-link').addEventListener('click', (e) => {
                        e.preventDefault();

                        const divElem = document.createElement('div');
                        divElem.classList.add('embed-responsive');
                        divElem.innerHTML = convertVideoUrlToEmbed(this.fieldData.video);

                        modal.open({ size: 'large' });
                        modal.updateContent(divElem);
                    });
                }
            } else {
                if (templateInstance.querySelector('.content .video-link') !== null) {
                    templateInstance.querySelector('.content .video-link').parentElement.removeChild(templateInstance.querySelector('.content .video-link'));
                }
            }

            if (this.validateFieldData(this.fieldData.image, 'asset')) {
                if (templateInstance.querySelector('.image') !== null) {
                    templateInstance.querySelector('.image').style.backgroundImage = `url('${this.fieldData.image.fields.file.url}')`;
                }
            }

            return templateInstance;
        }

        return null;
    }
}
