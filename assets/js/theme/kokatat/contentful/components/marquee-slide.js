import ComponentAbstract from './component-abstract';

export default class MarqueeSlide extends ComponentAbstract {
    generateFrontEndComponent() {
        if (document.getElementById(this.templateId)) {
            const templateInstance = document.getElementById(this.templateId).cloneNode(true);
            // Configure Element
            templateInstance.id = this.entryId;
            templateInstance.removeAttribute('hidden');
            templateInstance.classList.add(this.templateId);
            
            // Set layout classes
            if (this.validateFieldData(this.fieldData.slideLayout)) {
                switch (this.fieldData.slideLayout) {
                case 'Left': {
                    templateInstance.querySelector('.heroCarousel-content').classList.add('left-content');
                    break;
                }
                case 'Right': {
                    templateInstance.querySelector('.heroCarousel-content').classList.add('right-content');
                    break;
                }
                default: {
                    templateInstance.querySelector('.heroCarousel-content').classList.add('left-content');
                }
                }
            }

            if (this.validateFieldData(this.fieldData.whiteBackground) && this.fieldData.whiteBackground) {
                if (templateInstance.querySelector('.copy-container') !== null) {
                    templateInstance.querySelector('.copy-container').classList.add('bg-white');
                }
            }

            // Populate Content
            if (this.validateFieldData(this.fieldData.backgroundImage) && this.validateFieldData(this.fieldData.backgroundImage.fields.image, 'asset')) {
                if (templateInstance.querySelector('.heroCarousel-image') !== null) {
                    templateInstance.querySelector('.heroCarousel-image').src = `${this.fieldData.backgroundImage.fields.image.fields.file.url}`;
                }
                if (templateInstance.querySelector('.slide-bg') !== null) {
                    templateInstance.querySelector('.slide-bg').style.backgroundImage = `url('https:${this.fieldData.backgroundImage.fields.image.fields.file.url}')`;
                }

                if (document.querySelector('.placeholder') !== null) {
                    document.querySelector('.placeholder').parentElement.removeChild(document.querySelector('.placeholder'));
                }
            }
            if (this.validateFieldData(this.fieldData.midGroundImage, 'asset')) {
                if (templateInstance.querySelector('.content-bg') !== null) {
                    templateInstance.querySelector('.content-bg').src = this.fieldData.midGroundImage.fields.file.url;
                }
            } else {
                if (templateInstance.querySelector('.content-bg') !== null) {
                    templateInstance.querySelector('.content-bg').parentElement.removeChild(templateInstance.querySelector('.content-bg'));
                }
            }
            if (this.validateFieldData(this.fieldData.foregroundImage, 'asset')) {
                if (templateInstance.querySelector('.content-fg') !== null) {
                    templateInstance.querySelector('.content-fg').src = this.fieldData.foregroundImage.fields.file.url;
                }
            } else {
                if (templateInstance.querySelector('.content-fg') !== null) {
                    templateInstance.querySelector('.content-fg').parentElement.removeChild(templateInstance.querySelector('.content-fg'));
                }
            }
            if (this.validateFieldData(this.fieldData.headline, 'text')) {
                if (templateInstance.querySelector('.heroCarousel-title') !== null) {
                    templateInstance.querySelector('.heroCarousel-title').innerHTML = this.fieldData.headline;

                    if (this.validateFieldData(this.fieldData.textColor)) {
                      switch (this.fieldData.textColor) {
                        case 'White': {
                           templateInstance.querySelector('.heroCarousel-title').classList.add('white-text');
                          break;
                        }
                        default: {
                          templateInstance.querySelector('.heroCarousel-title').classList.add('black-text');
                        }
                      }
                    }
                }
            }
            
            if (this.validateFieldData(this.fieldData.subhead, 'text')) {
                if (templateInstance.querySelector('.heroCarousel-subhead') !== null) {
                    templateInstance.querySelector('.heroCarousel-subhead').innerHTML = this.fieldData.subhead;
                }
            }
            if (this.validateFieldData(this.fieldData.copy, 'text')) {
                if (templateInstance.querySelector('.heroCarousel-description') !== null) {
                    templateInstance.querySelector('.heroCarousel-description').innerHTML = this.fieldData.copy;

                    if (this.validateFieldData(this.fieldData.textColor)) {
                        switch(this.fieldData.textColor) {
                        case 'White': {
                            templateInstance.querySelector('.heroCarousel-description').style.color = '#FFFFFF';
                            break;
                        }
                        default: {
                            templateInstance.querySelector('.heroCarousel-description').style.color = '#000000';
                        }
                        }
                    }
                }
            }
            if (this.validateFieldData(this.fieldData.ctaButtonText, 'text') && this.validateFieldData(this.fieldData.ctaButtonUrl, 'text')) {
                if (templateInstance.querySelector('.heroCarousel-action') !== null) {
                    templateInstance.querySelector('.heroCarousel-action').innerHTML = `${this.fieldData.ctaButtonText}`;
                    templateInstance.querySelector('.heroCarousel-action').href = this.fieldData.ctaButtonUrl;
                }
            } else {
                if (templateInstance.querySelector('.heroCarousel-action') !== null) {
                    templateInstance.querySelector('.heroCarousel-action').parentElement.removeChild(templateInstance.querySelector('.heroCarousel-action'));
                }
            }
            if (this.validateFieldData(this.fieldData.ctaTextLinkText, 'text') && this.validateFieldData(this.fieldData.ctaTextLinkUrl, 'text')) {
                if (templateInstance.querySelector('.marq-links .text-link') !== null) {
                    templateInstance.querySelector('.marq-links .text-link').innerHTML = `<span>${this.fieldData.ctaTextLinkText}</span>`;
                    templateInstance.querySelector('.marq-links .text-link').href = this.fieldData.ctaTextLinkUrl;
                }
            } else {
                if (templateInstance.querySelector('.marq-links .text-link') !== null) {
                    templateInstance.querySelector('.marq-links .text-link').parentElement.removeChild(templateInstance.querySelector('.marq-links .text-link'));
                }
            }

            return templateInstance;
        }

        return null;
    }
}
