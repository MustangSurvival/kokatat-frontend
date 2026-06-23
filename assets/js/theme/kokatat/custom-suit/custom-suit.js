import dependencies from './dependencies';

export default class CustomSuit {
    constructor(context) {
        this.context = context;

        this.baseColorPieces = [];
        this.colorAttr = [];
        this.imgDepAttr = [];
        this.stock_configurations = {};

        if (this.validateData(context.productData)) {
            this.sku = this.validateData(context.productData.sku) ? context.productData.sku : location.pathname.split('/')[1].split('-')[location.pathname.split('/')[1].split('-').length - 1].toUpperCase();
            this.name = this.validateData(context.productData.title) ? context.productData.title : null;
            this.description = this.validateData(context.productData.description) ? context.productData.description : null;
            this.basePrice = this.validateData(context.productData.price.without_tax.value) ? context.productData.price.without_tax.value : null;
            this.suit_sizes = [];
            this.suit_boundaries = {};
            this.dependencies = null;
            this.custom_attribute_id = null;
            this.custom_value_id = null;
            this.lower_alteration_id = null;
            this.gender = null;
            // this.pro_suit_skus = ['DSUPMERCONFIG', 'DSWPMEDCONFIG', 'DSUPODRCONFIG', 'DSWPODDCONFIG', 'DSUPLERCONFIG', 'DSWPLEDCONFIG', 'DTWFPOMCONFIG', 'DTUFPOMCONFIG', 'DSWFPMEDCONFIG', 'DSUFPMERCONFIG', 'DSWFPLEDCONFIG', 'DSUFPLERCONFIG', 'DSWFPODDCONFIG', 'DSUFPODRCONFIG', 'DSWFPICDCONFIG', 'DSUFPICRCONFIG', 'DSUFHSECONFIG', 'DSWFHMEDCONFIG', 'DSWFHSECONFIG', 'DSUFHMERCONFIG'];
            this.pro_suit_skus = ['DSUPMERCONFIG', 'DSWPMEDCONFIG', 'DSUPODRCONFIG', 'DSWPODDCONFIG', 'DSUPLERCONFIG', 'DSWPLEDCONFIG', 'DTWHSTCONFIG', 'DTUHSTCONFIG', 'DSWFPMEDCONFIG', 'DSUFPMERCONFIG', 'DSWFPLEDCONFIG', 'DSUFPLERCONFIG', 'DSWFPODDCONFIG', 'DSUFPODRCONFIG', 'DSWFPICDCONFIG', 'DSUFPICRCONFIG', 'DSUHSECONFIG', 'DSWHMECONFIG', 'DSWHSECONFIG', 'DSUHMECONFIG', 'DSUHMECONFIG', 'DSUHODRCONFIG', 'DSWHICDCONFIG', 'DSUHICRCONFIG', 'DSWHODDCONFIG'];

            if (this.validateData(dependencies[this.sku.toLowerCase()])) {
                this.dependencies = dependencies[this.sku.toLowerCase()];
            }

            // Set up suit data fields
            if (this.validateData(context.productData.custom_fields)) {
                const measuringAttributes = ['Chest', 'Girth', 'Height', 'Hips', 'Inseam', 'Sleeve', 'Waist', 'Weight'];

                for (let i = 0; i < context.productData.custom_fields.length; i++) {
                    if (context.productData.custom_fields[i].name.indexOf('Base') !== -1) {
                        const basePieces = context.productData.custom_fields[i].value.split('|');
                        const stockObj = {};

                        for (let x = 0; x < basePieces.length; x++) {
                            stockObj[basePieces[x].split(':')[0].trim().toLowerCase().replace(/ /g, '_')] = basePieces[x].split(':')[1].trim();
                        }

                        this.stock_configurations[context.productData.custom_fields[i].name.replace('Base ', '').trim().toLowerCase().replace(/ /g, '_')] = stockObj;
                    }

                    if (context.productData.custom_fields[i].name === 'Gender') {
                        this.gender = context.productData.custom_fields[i].value.replace(/'/g, '');
                    }

                    for (let j = 0; j < measuringAttributes.length; j++) {
                        if (context.productData.custom_fields[i].name.indexOf(measuringAttributes[j]) !== -1) {
                            const key = context.productData.custom_fields[i].name.toLowerCase().replace(/ /g, '_');
                            this.suit_boundaries[key] = context.productData.custom_fields[i].value;
                        }
                    }
                }
            }

            // Set up options
            if (this.validateData(context.productData.options)) {
                const excludeArray = [
                    'Base',
                    'Lower Alteration',
                    'Entry Zipper',
                    'Rear Entry Zipper',
                    'Socks',
                    'Suspenders',
                    'Units',
                    'Size',
                    'Chest',
                    'Waist',
                    'Girth',
                    'Hips',
                    'Inseam',
                    'Sleeve',
                    'Height',
                    'Weight',
                    'Shoe Size',
                    'Sock Size',
                    'Torso Adjustment',
                    'Sleeve Adjustment',
                    'Inseam Adjustment',
                    'Wrist Gaskets',
                    'Neck Gasket',
                    'Accepted Terms',
                ];

                for (let i = 0; i < context.productData.options.length; i++) {
                    const key = context.productData.options[i].display_name.toLowerCase().replace(/ /g, '_');
                    this[key] = null;

                    // Populate default values if any
                    if (context.productData.options[i].type === 'Configurable_Entry_Checkbox' && this.validateData(context.productData.options[i].checked) && context.productData.options[i].checked) {
                        this[key] = 'Yes';
                    }

                    if (context.productData.options[i].type === 'Configurable_Entry_Checkbox' && this.validateData(context.productData.options[i].checked) && !context.productData.options[i].checked) {
                        this[key] = 'No';
                    }

                    if (context.productData.options[i].type === 'Configurable_Entry_Checkbox' && context.productData.options[i].display_name === 'Lower Alteration') {
                        this.lower_alteration_id = context.productData.options[i].id;
                    }

                    if (this.validateData(context.productData.options[i].values) && context.productData.options[i].values.length > 0) {
                        for (let j = 0; j < context.productData.options[i].values.length; j++) {
                            if (context.productData.options[i].values[j].selected) {
                                this[key] = context.productData.options[i].values[j].label;
                            }

                            if (context.productData.options[i].display_name === 'Base' && context.productData.options[i].values[j].label === 'Custom') {
                                this.custom_attribute_id = context.productData.options[i].id;
                                this.custom_value_id = context.productData.options[i].values[j].id;
                            }

                            if (context.productData.options[i].display_name === 'Size') {
                                this.suit_sizes.push(context.productData.options[i].values[j].label.toLowerCase().replace(/ /g, '_'));
                            }
                        }
                    }

                    if (context.productData.options[i].type === 'Configurable_PickList_Swatch' && context.productData.options[i].display_name !== 'Base') {
                        this.colorAttr.push(key);

                        if (context.productData.options[i].display_name.indexOf('Color') === -1) {
                            this.baseColorPieces.push(key);
                            this.imgDepAttr.push(key);
                        }
                    }

                    if (context.productData.options[i].type !== 'Configurable_PickList_Swatch' && excludeArray.indexOf(context.productData.options[i].display_name) === -1) {
                        this.imgDepAttr.push(key);
                    }
                }

                this.setImage();
            }
        }
    }

    validateData(data) {
        return typeof data !== 'undefined' && data !== null;
    }

    validateRequiredOptions() {
        if (this.size === null || this.sock_size === null) {
            return false;
        }

        return true;
    }

    mapBaseComponent(component) {
        let baseComponent = null;

        switch (component) {
        case 'cordura_bottoms': {
            baseComponent = 'bottom';
            break;
        }
        case 'drop_seat': {
            baseComponent = 'bottom';
            break;
        }
        case 'relief_zipper_cover': {
            if (this.validateData(this.cordura_bottoms) && this.cordura_bottoms === 'Yes') {
                baseComponent = 'cordura_bottoms_color';
            } else {
                baseComponent = 'bottom';
            }
            break;
        }
        case 'relief_zipper': {
            if (this.validateData(this.cordura_bottoms) && this.cordura_bottoms === 'Yes') {
                baseComponent = 'cordura_bottoms_color';
            } else {
                baseComponent = 'bottom';
            }
            break;
        }
        case 'entry_zipper_cover': {
            baseComponent = 'top';
            break;
        }
        default: {
            baseComponent = component;
        }
        }

        return baseComponent;
    }

    mapUpdateDependency(option, value, disabled) {
        // Get option ID from context to query select form element
        let optionId = null;
        for (let i = 0; i < this.context.productData.options.length; i++) {
            if (option === this.context.productData.options[i].display_name.toLowerCase().replace(/ /g, '_')) {
                optionId = this.context.productData.options[i].id;

                switch (this.context.productData.options[i].type) {
                case 'Configurable_Entry_Checkbox': {
                    const facadeButtons = document.querySelectorAll(`[data-attribute="${optionId}"] button`);

                    if (disabled) {
                        // Update checkbox
                        document.querySelector(`input[name="attribute[${optionId}]"]:not([type="hidden"])`).checked = false;
                        document.querySelector(`input[name="attribute[${optionId}]"]:not([type="hidden"])`).setAttribute('disabled', true);

                        // Update Facade buttons
                        if (facadeButtons.length) {
                            for (let j = 0; j < facadeButtons.length; j++) {
                                facadeButtons[j].setAttribute('disabled', true);
                            }
                        }

                        // Update label indicator
                        if (document.querySelector(`[data-attribute="${optionId}"] span.label i.enabled`) !== null) {
                            document.querySelector(`[data-attribute="${optionId}"] span.label i.enabled`).classList.remove('enabled');
                        }
                    } else {
                        document.querySelector(`input[name="attribute[${optionId}]"]:not([type="hidden"])`).removeAttribute('disabled');
                        // Update Facade buttons
                        if (facadeButtons.length) {
                            facadeButtons[0].removeAttribute('disabled');
                        }
                    }

                    this.checkboxHandler(document.querySelector(`input[name="attribute[${optionId}]"]:not([type="hidden"])`), false);

                    break;
                }
                case 'Configurable_PickList_Set': {
                    let valueId = '';
                    for (let j = 0; j < this.context.productData.options[i].values.length; j++) {
                        if (this.context.productData.options[i].values[j].data === value) {
                            valueId = this.context.productData.options[i].values[j].id;
                            break;
                        }
                    }
                    if (disabled) {
                        if (document.querySelectorAll(`[name="attribute[${optionId}]"]`).length > 1) {
                            const radioButtons = document.querySelectorAll(`[name="attribute[${optionId}]"]`);
                            const facadeButtons = document.querySelector(`[name="attribute[${optionId}]"]`).closest('.size-item').querySelectorAll('.ui-button-group button');
                            for (let x = 0; x < radioButtons.length; x++) {
                                if (radioButtons[x].nextElementSibling.textContent === 'None') {
                                    radioButtons[x].removeAttribute('disabled');
                                    facadeButtons[x].removeAttribute('disabled');
                                    facadeButtons[x].click();
                                } else {
                                    radioButtons[x].setAttribute('disabled', true);
                                    facadeButtons[x].setAttribute('disabled', true);
                                }
                            }
                        } else {
                            document.querySelector(`[name="attribute[${optionId}]"]`).value = valueId;
                            document.querySelector(`[name="attribute[${optionId}]"]`).setAttribute('disabled', true);
                        }
                    } else {
                        if (document.querySelectorAll(`[name="attribute[${optionId}]"]`).length > 1) {
                            const radioButtons = document.querySelectorAll(`[name="attribute[${optionId}]"]`);
                            const facadeButtons = document.querySelector(`[name="attribute[${optionId}]"]`).closest('.size-item').querySelectorAll('.ui-button-group button');
                            for (let x = 0; x < radioButtons.length; x++) {
                                if (radioButtons[x].nextElementSibling.textContent === 'None') {
                                    radioButtons[x].setAttribute('disabled', true);
                                    radioButtons[x].selected = false;
                                    facadeButtons[x].setAttribute('disabled', true);
                                } else if (this.validateData(this.socks) && this.socks === 'Latex' && radioButtons[x].nextElementSibling.textContent === 'X Small') {
                                    radioButtons[x].setAttribute('disabled', true);
                                    radioButtons[x].selected = false;
                                    facadeButtons[x].setAttribute('disabled', true);
                                } else {
                                    radioButtons[x].removeAttribute('disabled');
                                    facadeButtons[x].removeAttribute('disabled');
                                }
                            }
                        } else {
                            document.querySelector(`[name="attribute[${optionId}]"]`).value = valueId;
                            document.querySelector(`[name="attribute[${optionId}]"]`).setAttribute('disabled', true);
                        }
                    }

                    break;
                }
                default: {
                    let valueId = '';
                    for (let j = 0; j < this.context.productData.options[i].values.length; j++) {
                        if (this.context.productData.options[i].values[j].data === value) {
                            valueId = this.context.productData.options[i].values[j].id;
                            break;
                        }
                    }

                    document.querySelector(`[name="attribute[${optionId}]"]:not([type="hidden"])`).value = valueId;
                }
                }

                break;
            }
        }
    }

    updateDependencies(caseKey) {
        if (this.dependencies !== null) {
            // Handle Color and Image specific dependencies
            if (this.validateData(this.dependencies.visual_dependencies)) {
                for (let i = 0; i < this.dependencies.visual_dependencies.length; i++) {
                    const key = this.dependencies.visual_dependencies[i];
                    const addonKey = key.replace('_color', '');
                    const colorKey = `${key}_color`;
                    const value = this[key];

                    // Check if is add-on color and handle appropriately
                    if (this.baseColorPieces.indexOf(key) !== -1) {
                        document.getElementById(key).src = `/content/custom_suits/${this.sku}/${key}_${value.toLowerCase().replace(/ /g, '_').substring(0, 3)}.png`;
                    } else {
                        // Check if add-on is enabled
                        if (this.validateData(this[addonKey]) && addonKey !== 'base') {
                            if (this.colorAttr.indexOf(key) !== -1 && this[key] !== null) {
                                if (this[key] === 'Yes') {
                                    document.getElementById(key).src = `/content/custom_suits/${this.sku}/${this.mapBaseComponent(key)}_${this[colorKey].toLowerCase().replace(/ /g, '_').substring(0, 3)}.png`;
                                } else {
                                    document.getElementById(key).src = '/content/custom_suits/blank.png';
                                }
                            }

                            if (this.imgDepAttr.indexOf(key) !== -1 && this.colorAttr.indexOf(colorKey) === -1 && this.colorAttr.indexOf(key) === -1) {
                                if (this[key] === 'Yes') {
                                    if (key.indexOf('_cover') !== -1 || (key === 'relief_zipper' && this.pro_suit_skus.indexOf(this.sku) !== -1) || (key === 'drop_seat' && this.pro_suit_skus.indexOf(this.sku) !== -1)) {
                                        document.getElementById(key).src = `/content/custom_suits/${this.sku}/${key}_${this[this.mapBaseComponent(key)].toLowerCase().replace(/ /g, '_').substring(0, 3)}.png`;
                                    } else {
                                        document.getElementById(key).src = `/content/custom_suits/${this.sku}/${key}.png`;
                                    }
                                } else {
                                    document.getElementById(key).src = '/content/custom_suits/blank.png';
                                }
                            }
                        }
                    }
                }
            }

            // Handle non-color or image specific dependencies
            if (this.validateData(this.dependencies.dependency_cases) && this.validateData(this.dependencies.dependency_cases[caseKey])) {
                for (let i = 0; i < this.dependencies.dependency_cases[caseKey].length; i++) {
                    if (this[caseKey] === this.dependencies.dependency_cases[caseKey][i].value) {
                        for (const option in this.dependencies.dependency_cases[caseKey][i].rules) {
                            if (this.dependencies.dependency_cases[caseKey][i].rules.hasOwnProperty(option)) {
                                this.mapUpdateDependency(option, this.dependencies.dependency_cases[caseKey][i].rules[option].value, this.dependencies.dependency_cases[caseKey][i].rules[option].disabled);
                            }
                        }
                        break;
                    }
                }
            }
        }
    }

    checkLowerAlteration() {
        document.querySelector(`input[name="attribute[${this.lower_alteration_id}]"]:not([type="hidden"])`).checked = false;

        if (this.validateData(this.dependencies.lower_alteration_cases)) {
            for (let i = 0; i < this.dependencies.lower_alteration_cases.length; ++i) {
                let isCase = true;

                for (const caseKey in this.dependencies.lower_alteration_cases[i]) {
                    if (this.dependencies.lower_alteration_cases[i].hasOwnProperty(caseKey)) {
                        if (this[caseKey] !== this.dependencies.lower_alteration_cases[i][caseKey]) {
                            isCase = false;
                        }
                    }
                }

                if (isCase) {
                    document.querySelector(`input[name="attribute[${this.lower_alteration_id}]"]:not([type="hidden"])`).checked = true;
                    break;
                }
            }
        }

        this.checkboxHandler(document.querySelector(`input[name="attribute[${this.lower_alteration_id}]"]:not([type="hidden"])`), false);
    }

    swatchHandler(elem, doUpdate) {
        const key = elem.closest('.form-field').querySelector('.form-label').textContent.trim().replace(':', '').toLowerCase().replace(/ /g, '_');
        const value = elem.getAttribute('title');
        this[key] = value;

        // Check if is base stock configuration
        if (elem.closest('#base_stock') !== null) {
            if (this.stock_configurations.hasOwnProperty(value.toLowerCase().replace(/ /g, '_'))) {
                const stockConfig = this.stock_configurations[value.toLowerCase().replace(/ /g, '_')];

                if (document.querySelector('#base_customize') !== null) {
                    const baseUiSelectors = document.querySelectorAll('#base_customize a.ui-selector');

                    if (baseUiSelectors.length) {
                        for (let i = 0; i < baseUiSelectors.length; i++) {
                            const itemKey = baseUiSelectors[i].parentElement.querySelector('.ui-options .form-field .form-label').textContent.trim().replace(':', '').toLowerCase().replace(/ /g, '_');
                            if (stockConfig.hasOwnProperty(itemKey)) {
                                if (baseUiSelectors[i].parentElement.querySelector(`.ui-options .form-field .form-option-swatch .form-option-variant--color[title="${stockConfig[itemKey]}"]`) !== null) {
                                    baseUiSelectors[i].parentElement.querySelector(`.ui-options .form-field .form-option-swatch .form-option-variant--color[title="${stockConfig[itemKey]}"]`).parentElement.click();
                                }
                            }
                        }
                    }
                }
            }
        }

        // Check if is add-on color and handle appropriately
        if (this.baseColorPieces.indexOf(key) !== -1) {
            document.getElementById(key).src = `/content/custom_suits/${this.sku}/${key}_${value.toLowerCase().replace(/ /g, '_').substring(0, 3)}.png`;
        } else {
            // Check if add-on is enabled
            const addonKey = key.replace('_color', '');
            if (this.validateData(this[addonKey]) && addonKey !== 'base') {
                if (this[addonKey] === 'Yes') {
                    document.getElementById(addonKey).src = `/content/custom_suits/${this.sku}/${this.mapBaseComponent(addonKey)}_${value.toLowerCase().replace(/ /g, '_').substring(0, 3)}.png`;
                } else {
                    document.getElementById(addonKey).src = '/content/custom_suits/blank.png';
                }
            }
        }

        if (doUpdate) {
            this.updateDependencies(key);
        }
    }

    selectHandler(elem, doUpdate) {
        const key = elem.closest('.form-field').querySelector('.form-label').textContent.trim().replace(':', '').toLowerCase().replace(/ /g, '_');
        if (elem.selectedOptions.length > 0) {
            this[key] = elem.selectedOptions[0].text;
        }

        if (this.dependencies.other_dependencies.indexOf(key) !== -1 && doUpdate) {
            this.updateDependencies(key);
        }

        if (this.dependencies.lower_alteration_dependencies.indexOf(key) !== -1 && doUpdate) {
            this.checkLowerAlteration();
        }
    }

    checkboxHandler(elem, doUpdate) {
        const key = elem.closest('.form-field').querySelector('.form-label').textContent.trim().replace(':', '').toLowerCase().replace(/ /g, '_');
        const colorKey = `${key}_color`;
        this[key] = elem.checked ? 'Yes' : 'No';

        if (this.colorAttr.indexOf(colorKey) !== -1 && this[colorKey] !== null) {
            if (elem.checked) {
                document.getElementById(key).src = `/content/custom_suits/${this.sku}/${this.mapBaseComponent(key)}_${this[colorKey].toLowerCase().replace(/ /g, '_').substring(0, 3)}.png`;
            } else {
                document.getElementById(key).src = '/content/custom_suits/blank.png';
            }
        }

        if (this.imgDepAttr.indexOf(key) !== -1 && this.colorAttr.indexOf(colorKey) === -1 && this.colorAttr.indexOf(key) === -1) {
            if (elem.checked) {
                if (key.indexOf('_cover') !== -1 || (key === 'relief_zipper' && this.pro_suit_skus.indexOf(this.sku) !== -1) || (key === 'drop_seat' && this.pro_suit_skus.indexOf(this.sku) !== -1)) {
                    document.getElementById(key).src = `/content/custom_suits/${this.sku}/${key}_${this[this.mapBaseComponent(key)].toLowerCase().replace(/ /g, '_').substring(0, 3)}.png`;
                } else {
                    document.getElementById(key).src = `/content/custom_suits/${this.sku}/${key}.png`;
                }
            } else {
                document.getElementById(key).src = '/content/custom_suits/blank.png';
            }
        }

        if (this.dependencies.visual_dependencies.indexOf(key) !== -1 && doUpdate) {
            this.updateDependencies(key);
        }

        if (this.dependencies.other_dependencies.indexOf(key) !== -1 && doUpdate) {
            this.updateDependencies(key);
        }

        if (this.dependencies.lower_alteration_dependencies.indexOf(key) !== -1 && doUpdate) {
            this.checkLowerAlteration();
        }
    }

    radioHandler(elem, doUpdate) {
        const key = elem.closest('.form-field').querySelector('.form-label').textContent.trim().replace(':', '').toLowerCase().replace(/ /g, '_');

        if (elem.checked) {
            this[key] = elem.nextElementSibling.textContent;
        }

        if (this.dependencies.visual_dependencies.indexOf(key) !== -1 && doUpdate) {
            this.updateDependencies(key);
        }

        if (this.dependencies.other_dependencies.indexOf(key) !== -1 && doUpdate) {
            this.updateDependencies(key);
        }

        if (this.dependencies.lower_alteration_dependencies.indexOf(key) !== -1 && doUpdate) {
            this.checkLowerAlteration();
        }
    }

    inputHandler(elem) {
        const key = elem.closest('.form-field').querySelector('.form-label').textContent.trim().replace(':', '').toLowerCase().replace(/ /g, '_');
        this[key] = elem.value;
    }

    setImage() {
        // Set product image based on default selected options and colors
        document.querySelector('#custom_product_image .inner-wrapper').innerHTML = `<img id="base_image" src="/content/custom_suits/${this.sku}/base.png">`;
        for (let a = 0; a < this.imgDepAttr.length; a++) {
            const imgElem = document.createElement('img');
            imgElem.src = '/content/custom_suits/blank.png';
            imgElem.id = this.imgDepAttr[a];
            imgElem.style.position = 'absolute';
            imgElem.style.zIndex = a + 1;
            document.querySelector('#custom_product_image .inner-wrapper').appendChild(imgElem);
        }
    }

    findSize() {
        const sizeArray = this.suit_sizes;

        // Metric division variable
        const t = this.units === 'US' ? 1 : 2.54;
        const u = this.units === 'US' ? '"' : 'cm';

        let chestSize = null;
        let waistSize = null;
        let hipsSize = null;

        // Determine sizes for Chest, Waist, and Hips first
        let chestError = true;
        for (let s = 0; s < sizeArray.length; s++) {
            // CHEST
            if ((this.chest / t) >= parseFloat(this.suit_boundaries[`${sizeArray[s]}_chest`].split('|')[0]) && (this.chest / t) < parseFloat(this.suit_boundaries[`${sizeArray[s]}_chest`].split('|')[1])) {
                chestSize = sizeArray[s];
                chestError = false;
                break;
            }
        }

        if (chestError) {
            alert('Oops! Please check your Chest measurement.');
            return false;
        }

        let waistError = true;
        for (let s = 0; s < sizeArray.length; s++) {
            // WAIST
            if ((this.waist / t) >= parseFloat(this.suit_boundaries[`${sizeArray[s]}_waist`].split('|')[0]) && (this.waist / t) < parseFloat(this.suit_boundaries[`${sizeArray[s]}_waist`].split('|')[1])) {
                waistSize = sizeArray[s];
                waistError = false;
                break;
            }
        }

        if (waistError) {
            alert('Oops! Please check your Waist measurement.');
            return false;
        }

        if (this.hips) {
            let hipsError = true;
            for (let s = 0; s < sizeArray.length; s++) {
                // HIPS
                if ((this.hips / t) >= parseFloat(this.suit_boundaries[`${sizeArray[s]}_hips`].split('|')[0]) && (this.hips / t) < parseFloat(this.suit_boundaries[`${sizeArray[s]}_hips`].split('|')[1])) {
                    hipsSize = sizeArray[s];
                    hipsError = false;
                    break;
                }
            }
    
            if (hipsError) {
                alert('Oops! Please check your Hip measurement.');
                return false;
            }
        }

        // Determine user's size
        let mySize = chestSize;

        if (sizeArray.indexOf(waistSize) >= sizeArray.indexOf(mySize)) {
            mySize = waistSize;
        }

        if (sizeArray.indexOf(hipsSize) >= sizeArray.indexOf(mySize)) {
            mySize = hipsSize;
        }

        // TORSO
        // Modify Torso length for girth that exceeds max girth for the Base Size.
        // Alteration Range: +0-5 inches
        let customTorso = '';
        if (this.girth) {
            let torsoMod = 0;
    
            if ((this.girth / t) > parseInt(this.suit_boundaries[`${sizeArray[parseInt(sizeArray.indexOf(mySize), 10)]}_girth`].split('|')[1], 10)) {
                torsoMod = Math.ceil(((this.girth / t) - parseInt(this.suit_boundaries[`${sizeArray[parseInt(sizeArray.indexOf(mySize), 10)]}_girth`].split('|')[1], 10)));
            }
    
            if (Math.abs(torsoMod) > 5) {
                alert('Please check your Girth measurement.');
                return false;
            }
    
            
            if (torsoMod > 0) {
                customTorso = `+${torsoMod}"`;
            } else {
                customTorso = 'Standard';
            }
        }

        // INSEAM
        // Modify Inseam length for inseam measurement that is out of min/max ranges for the Base Size.
        let customInseam = '';
        if (this.inseam) {
            let inseamMod = 0;
    
            if ((this.inseam / t) > parseInt(this.suit_boundaries[`${sizeArray[parseInt(sizeArray.indexOf(mySize), 10)]}_inseam`].split('|')[1], 10)) {
                inseamMod = Math.ceil(((this.inseam / t) - parseInt(this.suit_boundaries[`${sizeArray[parseInt(sizeArray.indexOf(mySize), 10)]}_inseam`].split('|')[1], 10)));
            } else if ((this.inseam / t) < parseInt(this.suit_boundaries[`${sizeArray[parseInt(sizeArray.indexOf(mySize), 10)]}_inseam`].split('|')[0], 10)) {
                inseamMod = Math.ceil((this.inseam / t) - parseInt(this.suit_boundaries[`${sizeArray[parseInt(sizeArray.indexOf(mySize), 10)]}_inseam`].split('|')[0], 10));
            } else {
                inseamMod = 0;
            }
    
            if (Math.abs(inseamMod) > 3) {
                alert('Please check your Inseam measurement.');
                return false;
            }
    
            
            if (inseamMod < 0) {
                customInseam = `-${Math.abs(inseamMod)}"`;
            } else if (inseamMod > 0) {
                customInseam = `+${inseamMod}"`;
            } else {
                customInseam = 'Standard';
            }
        }

        // SLEEVE
        // Modify Sleeve length for sleeve measurement that is out of min/max ranges for the Base Size.
        let sleeveMod = 0;

        if ((this.sleeve / t) > parseInt(this.suit_boundaries[`${sizeArray[parseInt(sizeArray.indexOf(mySize), 10)]}_sleeve`].split('|')[1], 10)) {
            sleeveMod = Math.ceil(((this.sleeve / t) - parseInt(this.suit_boundaries[`${sizeArray[parseInt(sizeArray.indexOf(mySize), 10)]}_sleeve`].split('|')[1], 10)));
        } else if ((this.sleeve / t) < parseInt(this.suit_boundaries[`${sizeArray[parseInt(sizeArray.indexOf(mySize), 10)]}_sleeve`].split('|')[0], 10)) {
            sleeveMod = Math.ceil((this.sleeve / t) - parseInt(this.suit_boundaries[`${sizeArray[parseInt(sizeArray.indexOf(mySize), 10)]}_sleeve`].split('|')[0], 10));
        } else {
            sleeveMod = 0;
        }

        if (Math.abs(sleeveMod) > 3) {
            alert('Please check your Sleeve measurement.');
            return false;
        }

        let customSleeve = '';
        if (sleeveMod < 0) {
            customSleeve = `-${Math.abs(sleeveMod)}"`;
        } else if (sleeveMod > 0) {
            customSleeve = `+${sleeveMod}"`;
        } else {
            customSleeve = 'Standard';
        }

        // SHOE SIZE
        let sockSize = '';
        if (this.shoe_size) {
    
            switch (this.gender) {
            case 'Mens': {
                if (this.shoe_size <= 5) {
                    sockSize = 'x_small';
                } else if ((this.shoe_size > 5) && (this.shoe_size <= 8)) {
                    sockSize = 'small';
                } else if ((this.shoe_size > 8) && (this.shoe_size <= 11)) {
                    sockSize = 'medium';
                } else if ((this.shoe_size > 11) && (this.shoe_size <= 15)) {
                    sockSize = 'large';
                } else {
                    alert('Please check your Shoe Size.');
                    return false;
                }
                break;
            }
            case 'Womens': {
                if (this.shoe_size <= 7) {
                    sockSize = 'x_small';
                } else if ((this.shoe_size > 7) && (this.shoe_size <= 10)) {
                    sockSize = 'small';
                } else if ((this.shoe_size > 10) && (this.shoe_size <= 12)) {
                    sockSize = 'medium';
                } else if ((this.shoe_size > 12) && (this.shoe_size <= 14)) {
                    sockSize = 'large';
                } else {
                    alert('Please check your Shoe Size.');
                    return false;
                }
                break;
            }
            default: {
                return false;
            }
            }
        }

        if (document.querySelector(`#modal-sizing-form #size_recommendation #size_recommendation_values [data-option="size"] .ui-button-group button[data-label="${mySize}"]`) !== null) {
            document.querySelector(`#modal-sizing-form #size_recommendation #size_recommendation_values [data-option="size"] .ui-button-group button[data-label="${mySize}"]`).click();
        }

        const rangeArray = ['inseam', 'sleeve', 'torso'];

        for (let l = 0; l < rangeArray.length; l++) {
            const rangeLabels = document.querySelectorAll(`#modal-sizing-form #size_recommendation #size_recommendation_values [data-option="${rangeArray[l]}-adjustment"] span.range-label`);

            if (rangeLabels.length) {
                for (let n = 0; n < rangeLabels.length; n++) {
                    let str = '';

                    switch (rangeArray[l]) {
                    case 'inseam': {
                        str = customInseam;
                        break;
                    }
                    case 'sleeve': {
                        str = customSleeve;
                        break;
                    }
                    case 'torso': {
                        str = customTorso;
                        break;
                    }
                    default: {
                        str = '';
                    }
                    }

                    if (rangeLabels[n].textContent.trim() === str) {
                        if (document.querySelector(`#modal-sizing-form #size_recommendation #size_recommendation_values [data-option="${rangeArray[l]}-adjustment"] input[type="range"]`) !== null) {
                            document.querySelector(`#modal-sizing-form #size_recommendation #size_recommendation_values [data-option="${rangeArray[l]}-adjustment"] input[type="range"]`).value = rangeLabels[n].dataset.value;
                        }
                    }
                }
            }
        }

        if (sockSize) {
            // Sock Size
            if (document.querySelector(`#modal-sizing-form #size_recommendation #size_recommendation_values [data-option="sock-size"] .ui-button-group button[data-label="${sockSize}"]`) !== null) {
                document.querySelector(`#modal-sizing-form #size_recommendation #size_recommendation_values [data-option="sock-size"] .ui-button-group button[data-label="${sockSize}"]`).click();
            }
        }

        // Gaskets
        if (this.hasOwnProperty('wrist_gaskets') && this.hasOwnProperty('neck_gasket')) {
            let wristButtons = [];
            if (document.querySelector('#select-your-size .size-item[data-option="wrist-gaskets"]') !== null) {
                wristButtons = document.querySelectorAll('#modal-sizing-form #size_recommendation_values .size-item[data-option="wrist-gaskets"] .ui-button-group button');
            }

            let neckButtons = [];
            if (document.querySelector('#select-your-size .size-item[data-option="neck-gasket"]') !== null) {
                neckButtons = document.querySelectorAll('#modal-sizing-form #size_recommendation_values .size-item[data-option="neck-gasket"] .ui-button-group button');
            }

            if (mySize === 'x_small' || mySize === 'small') {
                if (wristButtons.length) {
                    for (let w = 0; w < wristButtons.length; w++) {
                        if (wristButtons[w].textContent === 'Small') {
                            wristButtons[w].click();
                        }
                    }
                }

                if (neckButtons.length) {
                    for (let n = 0; n < neckButtons.length; n++) {
                        if (neckButtons[n].textContent === 'Small') {
                            neckButtons[n].click();
                        }
                    }
                }
            } else if (mySize === 'medium' && this.gender === 'Womens') {
                if (wristButtons.length) {
                    for (let w = 0; w < wristButtons.length; w++) {
                        if (wristButtons[w].textContent === 'Small') {
                            wristButtons[w].click();
                        }
                    }
                }

                if (neckButtons.length) {
                    for (let n = 0; n < neckButtons.length; n++) {
                        if (neckButtons[n].textContent === 'Large') {
                            neckButtons[n].click();
                        }
                    }
                }
            } else {
                if (wristButtons.length) {
                    for (let w = 0; w < wristButtons.length; w++) {
                        if (wristButtons[w].textContent === 'Large') {
                            wristButtons[w].click();
                        }
                    }
                }

                if (neckButtons.length) {
                    for (let n = 0; n < neckButtons.length; n++) {
                        if (neckButtons[n].textContent === 'Large') {
                            neckButtons[n].click();
                        }
                    }
                }
            }
        }

        return true;
    }
}
