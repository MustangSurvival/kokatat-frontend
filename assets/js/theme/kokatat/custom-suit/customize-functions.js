import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { defaultModal } from '../../global/modal';

function measurementSystem(system) {
    const numberInputs = document.querySelectorAll('#modal-sizing-form #size_input .form-field[data-product-attribute="input-number"]');
    const changeEvent = new Event('change');

    switch (system) {
    case 'US': {
        if (numberInputs.length) {
            for (let i = 0; i < numberInputs.length; i++) {
                const label = numberInputs[i].querySelector('label').textContent.replace(':', '').toLowerCase().trim();

                if (label !== 'shoe size') {
                    if (label !== 'weight') {
                        if (numberInputs[i].querySelector('input[type="number"]').value !== '' && !Number.isNaN(numberInputs[i].querySelector('input[type="number"]').value)) {
                            numberInputs[i].querySelector('input[type="number"]').value = parseFloat(numberInputs[i].querySelector('input[type="number"]').value / 2.54).toFixed(2);
                            numberInputs[i].closest('.input-wrapper').querySelector('span.uom-indicator').textContent = 'in';
                            numberInputs[i].querySelector('input[type="number"]').dispatchEvent(changeEvent);
                        } else {
                            numberInputs[i].closest('.input-wrapper').querySelector('span.uom-indicator').textContent = 'in';
                        }
                    } else {
                        if (numberInputs[i].querySelector('input[type="number"]').value !== '' && !Number.isNaN(numberInputs[i].querySelector('input[type="number"]').value)) {
                            numberInputs[i].querySelector('input[type="number"]').value = parseFloat(numberInputs[i].querySelector('input[type="number"]').value * 2.205).toFixed(2);
                            numberInputs[i].closest('.input-wrapper').querySelector('span.uom-indicator').textContent = 'lbs';
                            numberInputs[i].querySelector('input[type="number"]').dispatchEvent(changeEvent);
                        } else {
                            numberInputs[i].closest('.input-wrapper').querySelector('span.uom-indicator').textContent = 'lbs';
                        }
                    }
                }
            }
        }
        break;
    }
    case 'Metric': {
        if (numberInputs.length) {
            for (let i = 0; i < numberInputs.length; i++) {
                const label = numberInputs[i].querySelector('label').textContent.replace(':', '').toLowerCase().trim();

                if (label !== 'shoe size') {
                    if (label !== 'weight') {
                        if (numberInputs[i].querySelector('input[type="number"]').value !== '' && !Number.isNaN(numberInputs[i].querySelector('input[type="number"]').value)) {
                            numberInputs[i].querySelector('input[type="number"]').value = parseFloat(numberInputs[i].querySelector('input[type="number"]').value * 2.54).toFixed(2);
                            numberInputs[i].closest('.input-wrapper').querySelector('span.uom-indicator').textContent = 'cm';
                            numberInputs[i].querySelector('input[type="number"]').dispatchEvent(changeEvent);
                        } else {
                            numberInputs[i].closest('.input-wrapper').querySelector('span.uom-indicator').textContent = 'cm';
                        }
                    } else {
                        if (numberInputs[i].querySelector('input[type="number"]').value !== '' && !Number.isNaN(numberInputs[i].querySelector('input[type="number"]').value)) {
                            numberInputs[i].querySelector('input[type="number"]').value = parseFloat(numberInputs[i].querySelector('input[type="number"]').value / 2.205).toFixed(2);
                            numberInputs[i].closest('.input-wrapper').querySelector('span.uom-indicator').textContent = 'kgs';
                            numberInputs[i].querySelector('input[type="number"]').dispatchEvent(changeEvent);
                        } else {
                            numberInputs[i].closest('.input-wrapper').querySelector('span.uom-indicator').textContent = 'kgs';
                        }
                    }
                }
            }
        }
        break;
    }
    default: {
        return;
    }
    }
}

function checkSizeInputs() {
    let allSet = true;
    const sizeInputs = document.querySelectorAll('#modal-sizing-form input[type="number"]');
    if (sizeInputs.length) {
        for (let i = 0; i < sizeInputs.length; i++) {
            if (sizeInputs[i].value === '' || sizeInputs[i].validity.valueMissing || sizeInputs[i].validity.typeMismatch) {
                allSet = false;
            }
        }
    }

    if (allSet) {
        document.querySelector('#size_input button.kok-btn').removeAttribute('disabled');
    } else {
        document.querySelector('#size_input button.kok-btn').setAttribute('disabled', true);
    }
}

function summarize(customSuitInstance) {
    // Clear out summary sections
    document.querySelector('#base_summary ul.summary-items').innerHTML = '';
    document.querySelector('#addon_summary ul.summary-items').innerHTML = '';
    document.querySelector('#size_summary ul.summary-items').innerHTML = '';

    // Populate summary dropdown
    const summaryAttributes = document.querySelectorAll('[data-summary-attribute]');
    if (summaryAttributes.length) {
        for (let i = 0; i < summaryAttributes.length; i++) {
            const key = summaryAttributes[i].dataset.summaryAttribute.toLowerCase().replace(/ /g, '_');
            const liElem = document.createElement('li');

            if (customSuitInstance[key] !== null) {
                liElem.innerHTML = `<div class="summary-description"><strong>${summaryAttributes[i].dataset.summaryAttribute.toUpperCase()}</strong>: ${customSuitInstance[key]}</div><div class="summary-swatch custom-suit-swatches"></div><div class="up-charge"></div>`;
            } else {
                liElem.innerHTML = `<div class="summary-description"><strong>${summaryAttributes[i].dataset.summaryAttribute.toUpperCase()}</strong>: No</div><div class="summary-swatch custom-suit-swatches"></div><div class="up-charge"></div>`;
            }

            if (summaryAttributes[i].closest('#base_stock') !== null || summaryAttributes[i].closest('#base_customize') !== null) {
                if (key === 'base' && customSuitInstance[key] !== 'Custom' && document.querySelector('#base_stock input[type="radio"]:checked + label') !== null) {
                    liElem.querySelector('.summary-swatch').innerHTML = document.querySelector('#base_stock input[type="radio"]:checked + label').innerHTML;
                    document.querySelector('#base_summary ul.summary-items').appendChild(liElem);
                }

                if (key === 'base' && customSuitInstance[key] === 'Custom') {
                    document.querySelector('#base_summary ul.summary-items').appendChild(liElem);
                }

                if (customSuitInstance.baseColorPieces.indexOf(key) !== -1 && document.querySelector(`#base_customize a.ui-selector[data-summary-attribute="${summaryAttributes[i].dataset.summaryAttribute}"] + .ui-options input[type="radio"]:checked + label`) !== null) {
                    liElem.querySelector('.summary-swatch').innerHTML = document.querySelector(`#base_customize a.ui-selector[data-summary-attribute="${summaryAttributes[i].dataset.summaryAttribute}"] + .ui-options input[type="radio"]:checked + label`).innerHTML;
                    document.querySelector('#base_summary ul.summary-items').appendChild(liElem);
                }
            }

            if (summaryAttributes[i].closest('#addon_options') !== null) {
                if (customSuitInstance.baseColorPieces.indexOf(key) === -1 && customSuitInstance.imgDepAttr.indexOf(key) !== -1 && customSuitInstance.colorAttr.indexOf(`${key}_color`) !== -1 && document.querySelector(`#addon_options a.ui-selector[data-summary-attribute="${summaryAttributes[i].dataset.summaryAttribute}"] + .ui-options input[type="radio"]:checked + label`) !== null) {
                    if (customSuitInstance[key] !== null && customSuitInstance[key] !== 'No') {
                        liElem.innerHTML = `<div class="summary-description"><strong>${summaryAttributes[i].dataset.summaryAttribute.toUpperCase()}</strong>: ${customSuitInstance[`${key}_color`]}</div><div class="summary-swatch custom-suit-swatches"></div><div class="up-charge"></div>`;
                        liElem.querySelector('.summary-swatch').innerHTML = document.querySelector(`#addon_options a.ui-selector[data-summary-attribute="${summaryAttributes[i].dataset.summaryAttribute}"] + .ui-options input[type="radio"]:checked + label`).innerHTML;
                    }
                    document.querySelector('#addon_summary ul.summary-items').appendChild(liElem);
                }

                if (customSuitInstance.baseColorPieces.indexOf(key) === -1 && customSuitInstance.imgDepAttr.indexOf(key) !== -1 && customSuitInstance.colorAttr.indexOf(`${key}_color`) === -1) {
                    document.querySelector('#addon_summary ul.summary-items').appendChild(liElem);
                }

                if (key !== 'base' && customSuitInstance.baseColorPieces.indexOf(key) === -1 && customSuitInstance.imgDepAttr.indexOf(key) === -1 && customSuitInstance.colorAttr.indexOf(`${key}_color`) === -1) {
                    document.querySelector('#addon_summary ul.summary-items').appendChild(liElem);
                }
            }

            if (summaryAttributes[i].closest('#select-your-size') !== null) {
                document.querySelector('#size_summary ul.summary-items').appendChild(liElem);
            }
        }
    }
}

function locallyCheck() {
    if (window.locallyCounter < 100) {
        if (document.querySelector('#lcly-iframe-0') !== null) {
            clearInterval(window.locallyIntervalId);

            const instructionsDiv = document.createElement('div');
            instructionsDiv.style.padding = '30px';
            instructionsDiv.style.backgroundColor = '#fff';
            instructionsDiv.innerHTML = '<h4 style="margin-top: 0;">Kokatat Buy From Dealer</h4><span>We have generated a PDF of your custom suit, which has downloaded to your device automatically. Select an authorized Kokatat dealer below and contact them with the PDF to complete your custom suit order.</span>';

            document.querySelector('#lcly-iframe-0').prepend(instructionsDiv);
            document.querySelector('#lcly-iframe-0').style.overflowY = 'auto';
        } else {
            window.locallyCounter = window.locallyCounter++;
        }
    } else {
        clearInterval(window.locallyIntervalId);
    }
}

function buyFromDealer(customSuitInstance) {
    const doc = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: 'letter',
        putOnlyUsedFonts: true,
        floatPrecision: 16,
        compress: true,
    });

    const pdfHtml = document.createElement('div');
    // pdfHtml.style.padding = '5px 10px';
    // pdfHtml.style.position = 'relative';
    // pdfHtml.style.height = '1056px';
    // pdfHtml.style.width = '816px';

    // Logo
    const logo = document.createElement('div');
    logo.innerHTML = '<img src="data:image/png;base64,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">';
    logo.style.width = '5px';
    logo.style.width = '50px';
    logo.style.top = '0px';
    logo.style.left = '15px';
    logo.style.position = 'absolute';
    pdfHtml.appendChild(logo);

    // Custom suit image
    pdfHtml.appendChild(document.querySelector('#custom_product_image').cloneNode(true));
    pdfHtml.querySelector('#custom_product_image').style.height = '150px';
    pdfHtml.querySelector('#custom_product_image').style.width = '100px';
    pdfHtml.querySelector('#custom_product_image').style.top = '10px';
    pdfHtml.querySelector('#custom_product_image').style.left = '100px';
    pdfHtml.querySelector('#custom_product_image').style.position = 'absolute';

    const instructionsRow = document.createElement('span');
    instructionsRow.style.fontSize = '4px';
    instructionsRow.style.fontFamily = 'Arial';
    instructionsRow.style.fontStyle = 'italic';
    instructionsRow.style.width = '400px';
    instructionsRow.style.position = 'absolute';
    instructionsRow.style.top = '20px';
    instructionsRow.style.left = '15px';
    instructionsRow.style.zIndex = 10;
    instructionsRow.textContent = 'Please deliver this to your local Kokatat dealer to complete your custom suit order.';
    pdfHtml.appendChild(instructionsRow);

    // Title
    const title = document.createElement('h4');
    title.textContent = customSuitInstance.name;
    title.style.fontSize = '6px';
    title.style.color = 'black';
    title.style.font = 'Arial';
    title.style.width = '400px';
    title.style.position = 'absolute';
    title.style.top = '-8px';
    title.style.left = '15px';
    title.style.zIndex = 10;

    // Options table and price
    const summaryTable = document.createElement('table');
    summaryTable.style.fontSize = '4px';
    summaryTable.style.font = 'Arial';
    summaryTable.style.width = '80px';
    summaryTable.style.position = 'absolute';
    summaryTable.style.top = '40px';
    summaryTable.style.left = '15px';
    summaryTable.style.zIndex = 20;

    // Populate summary dropdown
    const summaryAttributes = document.querySelectorAll('[data-summary-attribute]');
    if (summaryAttributes.length) {
        for (let i = 0; i < summaryAttributes.length; i++) {
            const key = summaryAttributes[i].dataset.summaryAttribute.toLowerCase().replace(/ /g, '_');
            const adjustmentValues = ['-1"', '-2"', '-3"'];
            const trElem = document.createElement('tr');

            if (customSuitInstance.hasOwnProperty(key) && customSuitInstance[key] !== null) {
                if (adjustmentValues.indexOf(customSuitInstance[key]) !== -1) {
                    trElem.innerHTML = `<td class="summary-description"><strong>${summaryAttributes[i].dataset.summaryAttribute.toUpperCase().replace(/ /g, '&nbsp;').replace(/-/g, '&nbsp;')}</strong></td><td>${customSuitInstance[key].replace(/ /g, '&nbsp;')}</td>`;
                } else {
                    // Hood, Left Pocket, Right Pocket
                    if (customSuitInstance.hasOwnProperty(`${key}_color`)) {
                        trElem.innerHTML = `<td class="summary-description"><strong>${summaryAttributes[i].dataset.summaryAttribute.toUpperCase().replace(/ /g, '&nbsp;').replace(/-/g, '&nbsp;')}</strong></td><td>${customSuitInstance[key].replace(/ /g, '&nbsp;').replace(/-/g, '&nbsp;')}&nbsp;,&nbsp;${customSuitInstance[`${key}_color`]}</td>`;
                    } else {
                        trElem.innerHTML = `<td class="summary-description"><strong>${summaryAttributes[i].dataset.summaryAttribute.toUpperCase().replace(/ /g, '&nbsp;').replace(/-/g, '&nbsp;')}</strong></td><td>${customSuitInstance[key].replace(/ /g, '&nbsp;').replace(/-/g, '&nbsp;')}</td>`;
                    }
                }
            } else {
                trElem.innerHTML = `<td class="summary-description"><strong>${summaryAttributes[i].dataset.summaryAttribute.toUpperCase().replace(/ /g, '&nbsp;').replace(/-/g, '&nbsp;')}</strong></td><td>No</td>`;
            }

            summaryTable.appendChild(trElem);
        }

        const priceRow = document.createElement('tr');
        priceRow.innerHTML = `<td style="font-size: 6px; color:black; font-family: Arial; font-weight: bold; padding-top: 2.5px;">PRICE: ${document.querySelector('.price--withoutTax').innerHTML}</td>`;
        summaryTable.appendChild(priceRow);
    }

    pdfHtml.appendChild(title);
    pdfHtml.appendChild(summaryTable);

    doc.html(pdfHtml, {
        callback: (docRendered) => {
            docRendered.deletePage(2);
            docRendered.deletePage(3);
            docRendered.deletePage(4);
            docRendered.deletePage(2);
            docRendered.save('dealer_pdf');
        },
        html2canvas: { scale: 2, width: 816, height: 1056 },
    });
    return customSuitInstance;
}

function updateFormAction(customSuitInstance) {
    if (customSuitInstance.validateRequiredOptions()) {
        if (document.querySelector('#form-trigger-addToCart') !== null) {
            document.querySelector('#form-trigger-addToCart').disabled = false;
        }

        if (document.querySelector('#lcly-button-0') !== null) {
            document.querySelector('#lcly-button-0').disabled = false;
        }
    } else {
        if (document.querySelector('#form-trigger-addToCart') !== null) {
            document.querySelector('#form-trigger-addToCart').disabled = true;
        }

        if (document.querySelector('#lcly-button-0') !== null) {
            document.querySelector('#lcly-button-0').disabled = true;
        }
    }
}

export function initializeUI(customSuitInstance) {
    window.html2canvas = html2canvas;

    if (document.querySelector('#custom_product_ui') !== null) {
        document.querySelector('#custom_product_ui').addEventListener('change', (e) => {
            if (e.target.nextElementSibling.classList.contains('form-option-swatch')) {
                e.target.nextElementSibling.click();
            }

            if (e.target.closest('.radio-facade-form-fields') !== null) {
                if (typeof e.target.nextElementSibling.dataset.name !== 'undefined' && e.target.nextElementSibling.dataset.name === 'None') {
                    e.target.closest('.radio-facade-form-fields').classList.add('hidden');

                    if (e.target.closest('.radio-facade-form-fields').previousElementSibling.querySelector('button.remove-component-button') !== null) {
                        e.target.closest('.radio-facade-form-fields').previousElementSibling.querySelector('button.remove-component-button').setAttribute('disabled', true);
                    }

                    if (e.target.closest('.radio-facade-form-fields').previousElementSibling.querySelector('button.remove-component-button') !== null) {
                        e.target.closest('.radio-facade-form-fields').previousElementSibling.querySelector('button.add-component-button').removeAttribute('disabled');
                    }
                } else {
                    e.target.closest('.radio-facade-form-fields').classList.remove('hidden');

                    if (e.target.closest('.radio-facade-form-fields').previousElementSibling.querySelector('button.remove-component-button') !== null) {
                        e.target.closest('.radio-facade-form-fields').previousElementSibling.querySelector('button.remove-component-button').removeAttribute('disabled');
                    }

                    if (e.target.closest('.radio-facade-form-fields').previousElementSibling.querySelector('button.remove-component-button') !== null) {
                        e.target.closest('.radio-facade-form-fields').previousElementSibling.querySelector('button.add-component-button').setAttribute('disabled', true);
                    }
                }
            }
        });
    }

    const swatches = document.querySelectorAll('#custom_product_form .form-option-swatch');
    if (swatches.length) {
        for (let i = 0; i < swatches.length; i++) {
            // Add CSS class
            swatches[i].classList.add('custom-suit-swatches');

            // Hide Custom swatch from base section
            if (swatches[i].previousElementSibling.id === `attribute_swatch_${customSuitInstance.custom_attribute_id}_${customSuitInstance.custom_value_id}`) {
                swatches[i].style.visibility = 'hidden';
            }

            // Set up click handler
            swatches[i].addEventListener('click', (e) => {
                const targetElem = (e.target.tagName === 'SPAN' && e.target.classList.contains('form-option-variant--color')) ? e.target : e.target.closest('.form-option-swatch').querySelector('span.form-option-variant--color');

                if (targetElem.closest('li').querySelector('.ui-selector') !== null) {
                    if (targetElem.closest('#add-and-customize-features') !== null) {
                        if (targetElem.closest('li').querySelector('.ui-selector span.label i').classList.contains('enabled')) {
                            targetElem.closest('li').querySelector('.ui-selector span.label i').style.backgroundColor = targetElem.style.backgroundColor;
                            targetElem.closest('li').querySelector('.ui-selector span.label i').classList.add('filled');
                            targetElem.closest('li').querySelector('.ui-selector span.value').textContent = targetElem.getAttribute('title');
                        } else {
                            targetElem.closest('li').querySelector('.ui-selector span.label i').style.backgroundColor = 'none';
                            targetElem.closest('li').querySelector('.ui-selector span.label i').classList.remove('filled');
                            targetElem.closest('li').querySelector('.ui-selector span.value').textContent = '';
                        }
                    } else {
                        targetElem.closest('li').querySelector('.ui-selector span.label i').style.backgroundColor = targetElem.style.backgroundColor;
                        targetElem.closest('li').querySelector('.ui-selector span.label i').classList.add('filled');
                        targetElem.closest('li').querySelector('.ui-selector span.value').textContent = targetElem.getAttribute('title');
                    }
                }

                customSuitInstance.swatchHandler(targetElem, true);
                updateFormAction(customSuitInstance);
            });

            // Run handler initially for selected/default items
            if (swatches[i].previousElementSibling.checked) {
                if (swatches[i].closest('li').querySelector('.ui-selector') !== null) {
                    if (swatches[i].closest('#add-and-customize-features') !== null) {
                        if (swatches[i].closest('li').querySelector('.ui-selector span.label i').classList.contains('enabled')) {
                            swatches[i].closest('li').querySelector('.ui-selector span.label i').style.backgroundColor = swatches[i].querySelector('span.form-option-variant--color').style.backgroundColor;
                            swatches[i].closest('li').querySelector('.ui-selector span.label i').classList.add('filled');
                            swatches[i].closest('li').querySelector('.ui-selector span.value').textContent = swatches[i].querySelector('span.form-option-variant--color').getAttribute('title');
                        } else {
                            swatches[i].closest('li').querySelector('.ui-selector span.label i').style.backgroundColor = 'none';
                            swatches[i].closest('li').querySelector('.ui-selector span.label i').classList.remove('filled');
                            swatches[i].closest('li').querySelector('.ui-selector span.value').textContent = '';
                        }
                    } else {
                        swatches[i].closest('li').querySelector('.ui-selector span.label i').style.backgroundColor = swatches[i].querySelector('span.form-option-variant--color').style.backgroundColor;
                        swatches[i].closest('li').querySelector('.ui-selector span.label i').classList.add('filled');
                        swatches[i].closest('li').querySelector('.ui-selector span.value').textContent = swatches[i].querySelector('span.form-option-variant--color').getAttribute('title');
                    }
                }

                customSuitInstance.swatchHandler(swatches[i].querySelector('span.form-option-variant--color'), false);
            }
        }
    }

    const selectDropdowns = document.querySelectorAll('#custom_product_form .form-select');
    if (selectDropdowns.length) {
        for (let i = 0; i < selectDropdowns.length; i++) {
            // Set up change handler
            selectDropdowns[i].addEventListener('change', (e) => {
                const targetElem = e.target;
                customSuitInstance.selectHandler(targetElem, true);
                updateFormAction(customSuitInstance);
            });

            // Run handler initially for selected/default items
            if (selectDropdowns[i].querySelector('option[selected]') !== null) {
                customSuitInstance.selectHandler(selectDropdowns[i], false);
            }
        }
    }

    const checkBoxes = document.querySelectorAll('#custom_product_form .form-checkbox');
    if (checkBoxes.length) {
        for (let i = 0; i < checkBoxes.length; i++) {
            // Set up change handler
            checkBoxes[i].addEventListener('change', (e) => {
                const targetElem = e.target;
                customSuitInstance.checkboxHandler(targetElem, true);
                updateFormAction(customSuitInstance);
            });

            // Run handler initially for selected/default items
            if (checkBoxes[i].checked) {
                customSuitInstance.checkboxHandler(checkBoxes[i], false);
            }
        }
    }

    const radioButtons = document.querySelectorAll('#custom_product_form .form-radio');
    if (radioButtons.length) {
        for (let i = 0; i < radioButtons.length; i++) {
            // Avoid swatch radio buttons
            if (radioButtons[i].parentElement.dataset.productAttribute === 'set-radio') {
                // Set up change handler
                radioButtons[i].addEventListener('change', (e) => {
                    const targetElem = e.target;
                    customSuitInstance.radioHandler(targetElem, true);
                    if (targetElem.checked && targetElem.closest('.ui-options') !== null) {
                        targetElem.closest('.ui-options').previousElementSibling.querySelector('span.label i').classList.add('enabled');
                    }

                    if (targetElem.checked && targetElem.closest('#system_of_measurement') !== null) {
                        measurementSystem(targetElem.nextElementSibling.textContent.trim());
                    }

                    if (targetElem.closest('.radio-facade-wrapper') !== null && typeof targetElem.nextElementSibling.dataset.name !== 'undefined' && targetElem.nextElementSibling.dataset.name !== 'None') {
                        if (targetElem.closest('.radio-facade-wrapper').querySelector('.facade-button') != null) {
                            targetElem.closest('.radio-facade-wrapper').querySelector('.facade-button').removeAttribute('disabled');
                        }

                        if (targetElem.closest('.radio-facade-wrapper').querySelector('span.label i') !== null) {
                            targetElem.closest('.radio-facade-wrapper').querySelector('span.label i').classList.add('enabled');
                        }
                    }

                    updateFormAction(customSuitInstance);
                });

                // Run handler initially for selected/default items
                if (radioButtons[i].checked) {
                    customSuitInstance.radioHandler(radioButtons[i], false);
                    if (radioButtons[i].closest('.ui-options') !== null) {
                        radioButtons[i].closest('.ui-options').previousElementSibling.querySelector('span.label i').classList.add('enabled');
                    }

                    if (radioButtons[i].closest('.radio-facade-wrapper') !== null && typeof radioButtons[i].nextElementSibling.dataset.name !== 'undefined' && radioButtons[i].nextElementSibling.dataset.name !== 'None') {
                        if (radioButtons[i].closest('.radio-facade-wrapper').querySelector('.facade-button') != null) {
                            radioButtons[i].closest('.radio-facade-wrapper').querySelector('.facade-button').removeAttribute('disabled');
                        }

                        if (radioButtons[i].closest('.radio-facade-wrapper').querySelector('span.label i') !== null) {
                            radioButtons[i].closest('.radio-facade-wrapper').querySelector('span.label i').classList.add('enabled');
                        }
                    }
                }
            }
        }
    }

    const customUIButtons = document.querySelectorAll('.custom-ui-button');
    if (customUIButtons.length) {
        for (let i = 0; i < customUIButtons.length; i++) {
            customUIButtons[i].addEventListener('click', (e) => {
                const targetElem = e.target.tagName === 'BUTTON' ? e.target : e.target.closest('button.custom-ui-button');

                if (targetElem.parentElement.querySelector('button.custom-ui-button.active') !== null && targetElem.parentElement.querySelector('button.custom-ui-button.active') !== targetElem) {
                    targetElem.parentElement.querySelector('button.custom-ui-button.active').classList.remove('active');
                    targetElem.classList.add('active');

                    if (targetElem.parentElement.id === 'custom_base_ui_buttons') {
                        document.querySelector('#base_stock').classList.toggle('visible');
                        document.querySelector('#base_customize').classList.toggle('visible');
                        if (i === 1 && document.querySelector(`#attribute_swatch_${customSuitInstance.custom_attribute_id}_${customSuitInstance.custom_value_id}`) !== null) {
                            document.querySelector(`#attribute_swatch_${customSuitInstance.custom_attribute_id}_${customSuitInstance.custom_value_id}`).nextElementSibling.click();
                        } else {
                            document.querySelector('#base_stock .ui-options .form-option.form-option-swatch.custom-suit-swatches').click();
                        }
                    }
                }
            });
        }
    }

    const uiSelectors = document.querySelectorAll('a.ui-selector');
    if (uiSelectors.length) {
        for (let i = 0; i < uiSelectors.length; i++) {
            uiSelectors[i].addEventListener('click', (e) => {
                e.preventDefault();
                const targetElem = e.target.tagName === 'A' ? e.target : e.target.closest('a.ui-selector');

                if (targetElem.closest('ul').querySelector('a.ui-selector.active') !== null && targetElem.closest('ul').querySelector('a.ui-selector.active') !== targetElem) {
                    targetElem.closest('ul').querySelector('a.ui-selector.active').classList.remove('active');
                    targetElem.closest('ul').querySelector('div.ui-options.visible').classList.remove('visible');
                    targetElem.classList.add('active');
                    targetElem.nextElementSibling.classList.add('visible');
                } else {
                    targetElem.classList.add('active');
                    targetElem.nextElementSibling.classList.add('visible');
                }
            });
        }
    }

    const checkboxFacadeButtons = document.querySelectorAll('.checkbox-facade .facade-button');
    if (checkboxFacadeButtons.length) {
        for (let i = 0; i < checkboxFacadeButtons.length; i++) {
            checkboxFacadeButtons[i].addEventListener('click', (e) => {
                const targetElem = e.target.tagName === 'BUTTON' ? e.target : e.target.closest('button.facade-button');

                if (targetElem.classList.contains('add-component-button')) {
                    targetElem.setAttribute('disabled', true);
                    if (targetElem.parentElement.querySelector('.remove-component-button') !== null) {
                        targetElem.parentElement.querySelector('.remove-component-button').removeAttribute('disabled');
                    }

                    if (targetElem.parentElement.querySelector('span.label i') !== null) {
                        targetElem.parentElement.querySelector('span.label i').classList.add('enabled');
                    }
                }

                if (targetElem.classList.contains('remove-component-button')) {
                    targetElem.setAttribute('disabled', true);
                    if (targetElem.parentElement.querySelector('.add-component-button') !== null) {
                        targetElem.parentElement.querySelector('.add-component-button').removeAttribute('disabled');
                    }

                    if (targetElem.parentElement.querySelector('span.label i') !== null) {
                        targetElem.parentElement.querySelector('span.label i').classList.remove('enabled');
                    }
                }

                // Find associated checkbox and change state
                const checkboxLabel = targetElem.parentElement.dataset.addon;
                const checkboxItems = document.querySelectorAll('#checkbox_items .form-field[data-product-attribute="input-checkbox"]');
                if (checkboxItems.length) {
                    for (let j = 0; j < checkboxItems.length; j++) {
                        if (checkboxItems[j].querySelector('.form-label.form-label--alternate.form-label--inlineSmall') !== null && checkboxItems[j].querySelector('.form-label.form-label--alternate.form-label--inlineSmall').textContent.replace(':', '').trim() === checkboxLabel) {
                            if (checkboxItems[j].querySelector('input.form-checkbox[type="checkbox"]') !== null) {
                                const checkboxElem = checkboxItems[j].querySelector('input.form-checkbox[type="checkbox"]');
                                checkboxElem.click();

                                if (checkboxElem.checked) {
                                    targetElem.closest('.ui-options').previousElementSibling.querySelector('.ui-selector span.label i').classList.add('enabled');

                                    // Update i background for color options
                                    if (targetElem.closest('.ui-options') !== null && targetElem.closest('.ui-options').querySelector('.form-field[data-product-attribute="swatch"]') !== null) {
                                        targetElem.closest('.ui-options').querySelector('.form-field[data-product-attribute="swatch"]').classList.remove('disabled');
                                        if (targetElem.closest('.ui-options').querySelector('.form-field[data-product-attribute="swatch"] input:checked + .form-option.form-option-swatch .form-option-variant--color') !== null) {
                                            targetElem.closest('.ui-options').previousElementSibling.querySelector('.ui-selector span.label i').classList.add('filled');
                                            targetElem.closest('.ui-options').previousElementSibling.querySelector('.ui-selector span.label i').style.backgroundColor = targetElem.closest('.ui-options').querySelector('.form-field[data-product-attribute="swatch"] input:checked + .form-option.form-option-swatch .form-option-variant--color').style.backgroundColor;
                                            targetElem.closest('.ui-options').previousElementSibling.querySelector('.ui-selector span.value').textContent = targetElem.closest('.ui-options').querySelector('.form-field[data-product-attribute="swatch"] input:checked + .form-option.form-option-swatch .form-option-variant--color').getAttribute('title');
                                        }
                                    }
                                } else {
                                    targetElem.closest('.ui-options').previousElementSibling.querySelector('.ui-selector span.label i').classList.remove('enabled');
                                    targetElem.closest('.ui-options').previousElementSibling.querySelector('.ui-selector span.label i').classList.remove('filled');
                                    targetElem.closest('.ui-options').previousElementSibling.querySelector('.ui-selector span.label i').style.backgroundColor = 'transparent';
                                    targetElem.closest('.ui-options').previousElementSibling.querySelector('.ui-selector span.value').textContent = '';

                                    if (targetElem.closest('.ui-options') !== null && targetElem.closest('.ui-options').querySelector('.form-field[data-product-attribute="swatch"]') !== null) {
                                        targetElem.closest('.ui-options').querySelector('.form-field[data-product-attribute="swatch"]').classList.add('disabled');
                                    }
                                }
                            }
                            break;
                        }
                    }
                }

                const lowerAlterationOptions = document.querySelector('#lower-alteration-options');
                const lowerAlterationEnabled = [];
                if (lowerAlterationOptions.children.length > 1) {
                    for (let m = 0; m < lowerAlterationOptions.children.length; m++) {
                        if (lowerAlterationOptions.children[m].querySelector('span.label i').classList.contains('enabled')) {
                            lowerAlterationEnabled.push(1);
                        } else {
                            lowerAlterationEnabled.push(0);
                        }
                    }
                    const contains = (arr, criteria) => arr.some(v => criteria(v));
                    if (contains(lowerAlterationEnabled, v => v > 0) === false) {
                        if (document.querySelector('.multi-radio-addons span.label i').classList.contains('enabled')) {
                            document.querySelector('.multi-radio-addons span.label i').classList.remove('enabled');
                        }
                    } else {
                        document.querySelector('.multi-radio-addons span.label i').classList.add('enabled');
                    }
                }
            });
        }
    }

    const radioFacadeButtons = document.querySelectorAll('.radio-facade .facade-button');
    if (radioFacadeButtons.length) {
        for (let i = 0; i < radioFacadeButtons.length; i++) {
            radioFacadeButtons[i].addEventListener('click', (e) => {
                const targetElem = e.target.tagName === 'BUTTON' ? e.target : e.target.closest('button.facade-button');

                if (targetElem.classList.contains('remove-component-button')) {
                    targetElem.setAttribute('disabled', true);
                    targetElem.nextElementSibling.removeAttribute('disabled');
                    targetElem.parentElement.nextElementSibling.classList.add('hidden');

                    if (targetElem.parentElement.querySelector('span.label i') !== null) {
                        targetElem.parentElement.querySelector('span.label i').classList.remove('enabled');
                    }

                    if (targetElem.parentElement.nextElementSibling.querySelector('label[data-name="None"]') !== null) {
                        targetElem.parentElement.nextElementSibling.querySelector('label[data-name="None"]').previousElementSibling.click();
                        customSuitInstance.radioHandler(targetElem.parentElement.nextElementSibling.querySelector('label[data-name="None"]').previousElementSibling, true);
                    }
                } else if (targetElem.classList.contains('add-component-button')) {
                    if (targetElem.parentElement.nextElementSibling.querySelector('label[data-name="None"]')) {
                        targetElem.parentElement.nextElementSibling.querySelector('label[data-name="None"]').nextElementSibling.nextElementSibling.click();
                        targetElem.parentElement.nextElementSibling.classList.remove('hidden');
                        targetElem.setAttribute('disabled', true);
                        targetElem.previousElementSibling.removeAttribute('disabled');
                        return;
                    }
                }

                const lowerAlterationOptions = document.querySelector('#lower-alteration-options');
                const lowerAlterationEnabled = [];
                if (lowerAlterationOptions.children.length > 1) {
                    for (let m = 0; m < lowerAlterationOptions.children.length; m++) {
                        if (lowerAlterationOptions.children[m].querySelector('span.label i').classList.contains('enabled')) {
                            lowerAlterationEnabled.push(1);
                        } else {
                            lowerAlterationEnabled.push(0);
                        }
                    }
                    const contains = (arr, criteria) => arr.some(v => criteria(v));
                    if (contains(lowerAlterationEnabled, v => v > 0) === false) {
                        if (document.querySelector('.multi-radio-addons span.label i').classList.contains('enabled')) {
                            document.querySelector('.multi-radio-addons span.label i').classList.remove('enabled');
                        }
                    }
                }
            });
        }
    }

    const sizeButtons = document.querySelectorAll('.size-item .ui-button-group > button');
    if (sizeButtons.length) {
        for (let i = 0; i < sizeButtons.length; i++) {
            sizeButtons[i].addEventListener('click', (e) => {
                const targetElem = e.target.tagName === 'BUTTON' ? e.target : e.target.closest('button');
                const sizeRadios = targetElem.closest('.size-item').querySelectorAll('.form-field[data-product-attribute="set-radio"] input[type="radio"]');

                if (!targetElem.classList.contains('active')) {
                    if (targetElem.parentElement.querySelector('button.active') !== null) {
                        targetElem.parentElement.querySelector('button.active').classList.remove('active');
                    }
                    targetElem.classList.add('active');
                }

                if (sizeRadios.length) {
                    for (let j = 0; j < sizeRadios.length; j++) {
                        if (sizeRadios[j].nextElementSibling.textContent === targetElem.textContent) {
                            sizeRadios[j].click();
                            customSuitInstance.radioHandler(sizeRadios[j], true);
                            break;
                        }
                    }
                }

                if (targetElem.closest('.size-item') !== null && targetElem.closest('.size-item').dataset.option === 'size') {
                    // Update Gaskets
                    if (customSuitInstance.hasOwnProperty('wrist_gaskets') && customSuitInstance.hasOwnProperty('neck_gasket')) {
                        let wristButtons = [];
                        if (document.querySelector('#select-your-size .size-item[data-option="wrist-gaskets"]') !== null) {
                            wristButtons = document.querySelectorAll('#select-your-size .size-item[data-option="wrist-gaskets"] .ui-button-group button');
                        }

                        let neckButtons = [];
                        if (document.querySelector('#select-your-size .size-item[data-option="neck-gasket"]') !== null) {
                            neckButtons = document.querySelectorAll('#select-your-size .size-item[data-option="neck-gasket"] .ui-button-group button');
                        }

                        if (customSuitInstance.size === 'X Small' || customSuitInstance.size === 'Small') {
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
                        } else if (customSuitInstance.size === 'Medium' && customSuitInstance.gender === 'Womens') {
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
                }
            });
        }
    }

    const rangeSliders = document.querySelectorAll('#custom_product_form input[type="range"]');
    if (rangeSliders.length) {
        for (let i = 0; i < rangeSliders.length; i++) {
            rangeSliders[i].addEventListener('change', (e) => {
                const targetElem = e.target.tagName === 'INPUT' ? e.target : e.target.closest('input[type="range"]');
                const sizeRadios = targetElem.closest('.size-item').querySelectorAll('.form-field[data-product-attribute="set-radio"] input[type="radio"]');

                if (sizeRadios.length) {
                    for (let j = 0; j < sizeRadios.length; j++) {
                        if (j === targetElem.value - 1) {
                            sizeRadios[j].click();
                            customSuitInstance.radioHandler(sizeRadios[j], true);
                            break;
                        }
                    }
                }
            });
        }
    }

    const rangeLabels = document.querySelectorAll('#custom_product_form .range-label');
    if (rangeLabels.length) {
        for (let i = 0; i < rangeLabels.length; i++) {
            rangeLabels[i].addEventListener('click', (e) => {
                const targetElem = e.target.classList.contains('range-label') ? e.target : e.target.closest('.range-label');
                const sizeRadios = targetElem.closest('.size-item').querySelectorAll('.form-field[data-product-attribute="set-radio"] input[type="radio"]');

                targetElem.parentElement.previousElementSibling.value = targetElem.dataset.value;
                if (sizeRadios.length) {
                    for (let j = 0; j < sizeRadios.length; j++) {
                        if (j === targetElem.dataset.value - 1) {
                            sizeRadios[j].click();
                            customSuitInstance.radioHandler(sizeRadios[j], true);
                            break;
                        }
                    }
                }
            });
        }
    }

    const sizeInputs = document.querySelectorAll('#custom_product_form input[type="number"]');
    if (sizeInputs.length) {
        for (let i = 0; i < sizeInputs.length; i++) {
            sizeInputs[i].addEventListener('change', (e) => {
                const targetElem = e.target;
                targetElem.value = parseFloat(targetElem.value).toFixed(2);

                // Call customSuitInstance handler
                customSuitInstance.inputHandler(targetElem);

                // Update UI selctor state
                if (targetElem.value === '' || targetElem.validity.valueMissing || targetElem.validity.typeMismatch) {
                    targetElem.style.borderColor = '#e80202';
                    targetElem.closest('.ui-options').previousElementSibling.querySelector('span.value').textContent = '';
                    targetElem.closest('.ui-options').previousElementSibling.querySelector('span.label i').classList.remove('enabled');
                } else {
                    targetElem.style.borderColor = '#e6e6e6';
                    targetElem.closest('.ui-options').previousElementSibling.querySelector('span.value').textContent = `${targetElem.value} ${targetElem.closest('.input-wrapper').querySelector('span.uom-indicator').textContent}`;
                    targetElem.closest('.ui-options').previousElementSibling.querySelector('span.label i').classList.add('enabled');
                    targetElem.closest('.instructions-input').querySelector('button.text-link').click();
                }

                // Enable get my size button if all inputs have values
                checkSizeInputs();
                updateFormAction(customSuitInstance);
            });
        }
    }

    const sizeInputTextLinks = document.querySelectorAll('#custom_product_form #modal-sizing-form .size-input-wrapper button.text-link');
    if (sizeInputTextLinks.length) {
        for (let i = 0; i < sizeInputTextLinks.length; i++) {
            sizeInputTextLinks[i].addEventListener('click', (e) => {
                const targetElem = e.target.tagName === 'BUTTON' ? e.target : e.target.closest('button.text-link');

                if (targetElem.closest('.size-input-wrapper').querySelector('.input-wrapper input[type="number"]') !== null && (targetElem.closest('.size-input-wrapper').querySelector('.input-wrapper input[type="number"]').value === '' || Number.isNaN(targetElem.closest('.size-input-wrapper').querySelector('.input-wrapper input[type="number"]').value))) {
                    targetElem.closest('.size-input-wrapper').querySelector('.input-wrapper input[type="number"]').style.borderColor = '#e80202';
                    targetElem.closest('.size-input-wrapper').querySelector('.input-wrapper input[type="number"]').focus();
                } else {
                    if (targetElem.closest('.size-input-wrapper').querySelector('.input-wrapper input[type="number"]') !== null) {
                        targetElem.closest('.size-input-wrapper').querySelector('.input-wrapper input[type="number"]').style.borderColor = '#e6e6e6';
                    }

                    if (targetElem.closest('li').nextElementSibling !== null && targetElem.closest('li').nextElementSibling.querySelector('a.ui-selector') !== null) {
                        targetElem.closest('li').nextElementSibling.querySelector('a.ui-selector').click();
                        targetElem.closest('li').nextElementSibling.querySelector('.input-wrapper input[type="number"]').focus();
                    }
                }
            });
        }
    }

    if (document.querySelector('#modal-sizing-form a.modal-close') !== null) {
        document.querySelector('#modal-sizing-form a.modal-close').addEventListener('click', () => {
            if (document.querySelector('#custom_sizing_ui_buttons button') !== null) {
                document.querySelector('#custom_sizing_ui_buttons button').click();
            }

            if (document.querySelector('#size_input') !== null && document.querySelector('#size_recommendation') !== null) {
                document.querySelector('#size_input').classList.remove('hidden');
                document.querySelector('#size_recommendation').classList.add('hidden');
            }
        });
    }

    if (document.querySelector('#modal-sizing-form #size_input button.kok-btn') !== null) {
        document.querySelector('#modal-sizing-form #size_input button.kok-btn').addEventListener('click', () => {
            if (customSuitInstance.findSize()) {
                if (document.querySelector('#modal-sizing-form #size_recommendation') !== null) {
                    document.querySelector('#modal-sizing-form #size_input').classList.add('hidden');
                    document.querySelector('#modal-sizing-form #size_recommendation').classList.remove('hidden');
                }
            }
        });
    }

    if (document.querySelector('#modal-sizing-form #size_recommendation button.text-link') !== null) {
        document.querySelector('#modal-sizing-form #size_recommendation button.text-link').addEventListener('click', () => {
            if (customSuitInstance.findSize()) {
                if (document.querySelector('#size_recommendation') !== null) {
                    document.querySelector('#size_input').classList.remove('hidden');
                    document.querySelector('#size_recommendation').classList.add('hidden');
                }
            }
        });
    }

    if (document.querySelector('#modal-sizing-form #size_recommendation button.kok-btn') !== null) {
        document.querySelector('#modal-sizing-form #size_recommendation button.kok-btn').addEventListener('click', () => {
            const sizeItems = document.querySelectorAll('#modal-sizing-form #size_recommendation_values .size-item');

            // Map recommended values to form values
            if (sizeItems.length) {
                for (let i = 0; i < sizeItems.length; i++) {
                    if (sizeItems[i].querySelector('.ui-button-group button.active') !== null) {
                        const uiButtons = document.querySelectorAll(`#select-your-size .size-item[data-option="${sizeItems[i].dataset.option}"] .ui-button-group button`);

                        if (uiButtons.length) {
                            for (let j = 0; j < uiButtons.length; j++) {
                                if (uiButtons[j].textContent.trim() === sizeItems[i].querySelector('.ui-button-group button.active').textContent.trim()) {
                                    uiButtons[j].click();
                                    break;
                                }
                            }
                        }
                    }

                    if (sizeItems[i].querySelector('input[type="range"]') !== null) {
                        if (document.querySelector(`#select-your-size .size-item[data-option="${sizeItems[i].dataset.option}"] .range-label[data-value="${sizeItems[i].querySelector('input[type="range"]').value}"]`) !== null) {
                            document.querySelector(`#select-your-size .size-item[data-option="${sizeItems[i].dataset.option}"] .range-label[data-value="${sizeItems[i].querySelector('input[type="range"]').value}"]`).click();
                        }
                    }
                }
            }

            // Close the modal
            if (document.querySelector('.modal-background') !== null) {
                document.querySelector('.modal-background').click();
            }
        });
    }

    if (document.querySelector('[data-size-item="shoe-size"] span.uom-indicator') !== null && customSuitInstance.gender !== null) {
        document.querySelector('[data-size-item="shoe-size"] span.uom-indicator').textContent = customSuitInstance.gender;
    }

    if (document.querySelector('#modal-sizing-form li > a.ui-selector') !== null) {
        document.querySelector('#modal-sizing-form li > a.ui-selector').click();
    }

    if (document.querySelector('#form-trigger-addToCart') !== null) {
        document.querySelector('#form-trigger-addToCart').addEventListener('click', () => {
            // Show Returns and Exchanges Acceptance modal
            if (document.querySelector('#returns-exchanges-terms input[type="checkbox"]') !== null) {
                if (document.querySelector('#returns-exchanges-terms input[type="checkbox"]:checked') === null) {
                    const modal = defaultModal();
                    modal.open();
                    modal.updateContent(`<div class="modal-header"><h2 class="modal-header-title">Custom Suit Returns & Exchanges Policy</h2></div><div class="modal-body"><p>Kokatat does not accept returns or exchanges on customized dry suits. Custom suit orders can't be modified or cancelled once submitted to Kokatat. Orders for custom suits ship 4-5 weeks from order date.</p><button class="kok-btn primary-button">Accept</button></div>`);
                    modal.$content.css('background-color', '#fff');
                    modal.$content.find('button.kok-btn.primary-button').on('click', () => {
                        // Check terms checkbox
                        document.querySelector('#returns-exchanges-terms input[type="checkbox"]').click();

                        // Close modal
                        modal.close();

                        if (document.querySelector('#form-action-addToCart') !== null) {
                            document.querySelector('#form-action-addToCart').click();
                        }
                    });
                } else {
                    if (document.querySelector('#form-action-addToCart') !== null) {
                        document.querySelector('#form-action-addToCart').click();
                    }
                }
            } else {
                if (document.querySelector('#form-action-addToCart') !== null) {
                    document.querySelector('#form-action-addToCart').click();
                }
            }
        });

        document.querySelector('#form-trigger-addToCart').disabled = true;
    }

    if (document.querySelector('#lcly-button-0') !== null) {
        window.locallyCounter = 0;
        document.querySelector('#lcly-button-0').addEventListener('click', (e) => {
            if (e.target.querySelector('a') !== null) {
                e.target.querySelector('a').click();
            } else {
                window.locallyIntervalId = setInterval(locallyCheck, 100);
                buyFromDealer(customSuitInstance);
            }
        });

        document.querySelector('#lcly-button-0').disabled = true;
    }

    const uiSections = document.querySelectorAll('.ui-section');
    if (uiSections.length) {
        for (let i = 0; i < uiSections.length; i++) {
            if (uiSections[i].querySelector('.ui-selector') !== null) {
                uiSections[i].querySelector('.ui-selector').click();
            }
        }
    }

    const colorOptions = document.querySelectorAll('#add-and-customize-features .ui-selector span.label i');
    if (colorOptions.length) {
        for (let i = 0; i < colorOptions.length; i++) {
            if (!colorOptions[i].classList.contains('enabled') && colorOptions[i].closest('li') !== null && colorOptions[i].closest('li').querySelector('.ui-options .form-field[data-product-attribute="swatch"]') !== null) {
                colorOptions[i].closest('li').querySelector('.ui-options .form-field[data-product-attribute="swatch"]').classList.add('disabled');
            }
        }
    }

    const checkBoxAddons = document.querySelectorAll('.addon-checkbox-image');
    if (checkBoxAddons.length) {
        for (let i = 0; i < checkBoxAddons.length; i++) {
            if (checkBoxAddons[i].querySelector('span.label') !== null) {
                const divElem = document.createElement('div');
                divElem.classList.add('form-field');
                divElem.setAttribute('data-product-attribute', 'swatch');
                if (!checkBoxAddons[i].querySelector('.add-component-button').hasAttribute('hidden')) {
                    divElem.classList.add('disabled');
                }
                const imgElem = document.createElement('img');
                imgElem.src = `/content/custom_suit_features/${checkBoxAddons[i].querySelector('span.label').textContent.trim().toLowerCase().replace(/ /g, '_')}.jpg`;

                divElem.appendChild(imgElem);

                if (checkBoxAddons[i].querySelector('.ui-options') !== null) {
                    checkBoxAddons[i].querySelector('.ui-options').appendChild(divElem);
                }
            }
        }
    }

    const radioAddons = document.querySelectorAll('.addon-radio-image');
    if (radioAddons.length) {
        for (let i = 0; i < radioAddons.length; i++) {
            if (radioAddons[i].querySelector('span.label') !== null) {
                const radioLabels = radioAddons[i].querySelectorAll('input[type="radio"] + label.form-label');
                if (radioLabels.length) {
                    for (let j = 0; j < radioLabels.length; j++) {
                        const imgElem = document.createElement('img');
                        imgElem.src = `/content/custom_suit_features/${radioAddons[i].querySelector('span.label').textContent.trim().toLowerCase().replace(/ /g, '_')}_${radioLabels[j].textContent.trim().toLowerCase().replace(/ /g, '_')}.jpg`;

                        radioLabels[j].prepend(imgElem);
                    }
                }
            }
        }
    }

    if (document.querySelector('#summary_button') !== null) {
        document.querySelector('#summary_button').addEventListener('click', () => {
            summarize(customSuitInstance);
            if (document.querySelector('#summary_dropdown') !== null) {
                document.querySelector('#summary_dropdown').classList.toggle('visible');
            }
        });
    }

    if (document.querySelector('#current_selections') !== null) {
        document.querySelector('#current_selections').addEventListener('click', (e) => {
            e.preventDefault();
            summarize(customSuitInstance);
            if (document.querySelector('#summary_dropdown') !== null) {
                document.querySelector('#summary_dropdown').classList.toggle('visible');
            }
        });
    }

    if (document.querySelector('#ui_accordion li.accordion-item > a.accordion-title') !== null) {
        document.querySelector('#ui_accordion li.accordion-item > a.accordion-title').click();
    }

    // Hide features section if there are no features
    if (customSuitInstance.baseColorPieces.length === customSuitInstance.colorAttr.length && customSuitInstance.baseColorPieces.length === customSuitInstance.imgDepAttr.length) {
        if (document.querySelector('#feature_options') !== null) {
            document.querySelector('#feature_options').style.display = 'none';
        }
    }
}
