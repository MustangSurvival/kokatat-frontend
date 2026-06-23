export default class ComponentAbstract {
    constructor(contentType, entryId, fieldData, bearerToken) {
        this.templateId = contentType;
        this.entryId = entryId;
        this.fieldData = fieldData;
        this.bearerToken = bearerToken;

        return this.generateFrontEndComponent();
    }

    type() {
        return this.constructor.name;
    }

    validateFieldData(field, type) {
        let returnVal = false;
        switch (type) {
        case 'text': {
            returnVal = typeof field !== 'undefined' && field !== null;
            break;
        }
        case 'array': {
            returnVal = typeof field !== 'undefined' && field !== null && field.length > 0;
            break;
        }
        case 'asset': {
            if (typeof field !== 'undefined' && field !== null) {
                returnVal = typeof field.fields.file.url !== 'undefined' && field.fields.file.url !== null;
            } else {
                returnVal = false;
            }
            break;
        }
        default: {
            returnVal = typeof field !== 'undefined' && field !== null;
        }
        }

        return returnVal;
    }

    generateFrontEndComponent() {
    }
}
