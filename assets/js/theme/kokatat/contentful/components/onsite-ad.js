import ComponentAbstract from './component-abstract';

export default class OnsiteAd extends ComponentAbstract {
    generateFrontEndComponent() {
        if (document.getElementById(this.templateId)) {
            const gridItem = document.createElement('li');
            gridItem.classList.add('onsite-ad');
            // if (typeof this.fieldData.fullWidth !== 'undefined' && this.fieldData.fullWidth !== null) {
            //     if (this.fieldData.fullWidth === true) {
            //         gridItem.classList.add('full-width');
            //     }
            // }
            const templateInstance = document.getElementById(this.templateId).cloneNode(true);
            // Configure Element
            templateInstance.id = this.entryId;
            templateInstance.removeAttribute('hidden');
            templateInstance.classList.add(this.templateId);

            // Populate Content
            if (this.validateFieldData(this.fieldData.image, 'asset')) {
                const imgElem = document.createElement('img');
                imgElem.src = this.fieldData.image.fields.file.url;
                imgElem.setAttribute('alt', this.fieldData.image.fields.title);
                templateInstance.querySelector('figure').appendChild(imgElem);
            }
            if (this.validateFieldData(this.fieldData.headline, 'text')) {
                templateInstance.querySelector('.title').textContent = this.fieldData.headline;
            }
            if (this.validateFieldData(this.fieldData.subhead, 'text')) {
                templateInstance.querySelector('.subtitle').textContent = this.fieldData.subhead;
            }
            if (this.validateFieldData(this.fieldData.ctaText, 'text') && this.validateFieldData(this.fieldData.ctaUrl, 'text')) {
                templateInstance.querySelector('a.kok-btn.btn-arrow.primary-button').href = this.fieldData.ctaUrl;
                templateInstance.querySelector('a.kok-btn.btn-arrow.primary-button').innerHTML = this.fieldData.ctaText;
            }

            gridItem.appendChild(templateInstance);

            return gridItem;
        }

        return document.createElement('li');
    }
}
