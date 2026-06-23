// import _ from 'lodash';

function minMaxValidate(minInputSelector, maxInputSelector) {
    function validate(cb) {
        const minValue = parseFloat($(minInputSelector).val());
        const maxValue = parseFloat($(maxInputSelector).val());

        // if (maxValue > minValue || _.isNaN(maxValue) || _.isNaN(minValue)) {
        if (maxValue > minValue || Number.isNaN(maxValue) || Number.isNaN(minValue)) {
            return cb(true);
        }

        return cb(false);
    }

    return validate;
}

export default minMaxValidate;
