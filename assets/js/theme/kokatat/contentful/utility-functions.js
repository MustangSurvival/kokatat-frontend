export function convertVideoUrlToEmbed(url, width, height) {
    const pattern1 = /(?:http?s?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?(.+)/g;
    const pattern2 = /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g;
    let replacement = '';
    let embedCode = '';
    let videoWidth = width;
    let videoHeight = height;
    if (width === undefined) {
        videoWidth = 420;
    }
    if (height === undefined) {
        videoHeight = 345;
    }
    if (pattern1.test(url)) {
        replacement = `<iframe width="${videoWidth}" height="${videoHeight}" title="Video player" src="//player.vimeo.com/video/$1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`;
        embedCode = url.replace(pattern1, replacement);
    }
    if (pattern2.test(url)) {
        replacement = `<iframe width="${videoWidth}" height="${videoHeight}" title="Video player" src="//www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>`;
        embedCode = url.replace(pattern2, replacement);
    }
    return embedCode;
}

export function singleImageGallery(array) {
    const slider = $('.single-image-gallery');
    if (slider) {
        const photos = array;
        for (let i = 0; i < photos.length; i++) {
            const slideElem = document.createElement('li');
            slideElem.classList.add('image');
            slideElem.innerHTML = `<img src="${photos[i].fields.file.url}">`;
            slider.slick('slickAdd', slideElem);
        }
    }
}

export function mapMonth(monthInt) {
    let returnVal = null;

    switch (monthInt) {
    case 0: {
        returnVal = 'January';
        break;
    }
    case 1: {
        returnVal = 'February';
        break;
    }
    case 2: {
        returnVal = 'March';
        break;
    }
    case 3: {
        returnVal = 'April';
        break;
    }
    case 4: {
        returnVal = 'May';
        break;
    }
    case 5: {
        returnVal = 'June';
        break;
    }
    case 6: {
        returnVal = 'July';
        break;
    }
    case 7: {
        returnVal = 'August';
        break;
    }
    case 8: {
        returnVal = 'September';
        break;
    }
    case 9: {
        returnVal = 'October';
        break;
    }
    case 10: {
        returnVal = 'November';
        break;
    }
    case 11: {
        returnVal = 'December';
        break;
    }
    default: {
        returnVal = null;
    }
    }

    return returnVal;
}

export function createAccordion(accordionData, idPrefix) {
    if (accordionData.length) {
        const ulElement = document.createElement('ul');
        ulElement.className = 'accordion accordion--navList';
        ulElement.setAttribute('data-accordion', '');

        for (let i = 0; i < accordionData.length; i++) {
            const liElem = document.createElement('li');
            liElem.className = 'accordion-item';
            liElem.setAttribute('data-accordion-item', '');
            liElem.innerHTML = `<a href="#${idPrefix}_${i}" class="accordion-title"><span>${accordionData[i].accordion_heading}</span><span class="toggle-indicator"></a><div id="${idPrefix}_${i}" class="accordion-content" data-tab-content>${accordionData[i].accordion_content}</div>`;

            ulElement.appendChild(liElem);
        }

        return ulElement;
    }
}




// eslint-disable-next-line no-inner-declarations
export function getProductIdFromSku(productSku, bearerToken) {
    return fetch('/graphql', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify({
            query: `query productBySku(
            $productSku: String!
            # Use GraphQL Query Variables to inject your product ID
          ) {
            site {
              product(sku: $productSku) {
                entityId
             }
           }
         }`,
            variables: {
                productSku: productSku,
            },
        }),
    })
        .then((res) => res.json())
        .then((data) => data.data.site.product != null ? data.data.site.product.entityId : null)
        .catch(error => console.error(error));
}

