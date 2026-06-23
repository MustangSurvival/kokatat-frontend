export function swatchToolTip() {
    const swatches = document.querySelectorAll('.form-option-variant--color');
    if (swatches.length) {
        for (let i = 0; i < swatches.length; i++) {
            const toolTipElem = document.createElement('span');
            toolTipElem.classList.add('tool-tip');
            toolTipElem.textContent = swatches[i].getAttribute('title');
            swatches[i].parentElement.appendChild(toolTipElem);
        }
    }
}

export function hideLinks() {
    const menuHeaders = $('a.h6-subHead-sm:contains(Accessories), a.h6-subHead-sm:contains(Activity)')
    menuHeaders.addClass('no-link')
    menuHeaders.click(function(e){
        e.preventDefault();
    });
}
