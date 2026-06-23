import * as contentful from 'contentful';
import ContentfulEnvironment from './contentful-env';

export default class ContentfulAbstract {
    constructor(context) {
        this.context = context;
        if (typeof this.context.contentfulData !== 'undefined' && this.context.contentfulData[1] === '{' && this.context.contentfulData[this.context.contentfulData.length - 2] === '}') {
            this.fallback_data = JSON.parse(JSON.parse(this.context.contentfulData));
        } else {
            this.fallback_data = null;
        }
        this.env = new ContentfulEnvironment();
        this.client = contentful.createClient({
            space: this.env.space,
            environment: this.env.environment,
            accessToken: this.env.access_token,
        });
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

    setEntryData() {
    }

    populateContent() {
    }
}
