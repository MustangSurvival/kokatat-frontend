const IFRAME_LABELS = [
    { pattern: /123formbuilder\.com|form\.123formbuilder/i, title: 'Contact form' },
    { pattern: /alsoenergy\.com|solaredge\.com|powerwall|solar/i, title: 'Solar energy dashboard' },
    { pattern: /youtube\.com|youtu\.be/i, title: 'Video player' },
    { pattern: /locally\.com|locally-widget/i, title: 'Dealer locator' },
    { pattern: /elfsight\.com/i, title: 'Instagram feed' },
    { pattern: /googletagmanager\.com/i, title: 'Tag manager' },
    { pattern: /facebook\.com\/plugins/i, title: 'Facebook' },
];

const SCROLLABLE_IDS = ['conv-locations-wrapper'];

function labelIframe(iframe) {
    if (iframe.title) return;
    const src = iframe.src || iframe.getAttribute('data-src') || '';
    for (const { pattern, title } of IFRAME_LABELS) {
        if (pattern.test(src)) {
            iframe.title = title;
            return;
        }
    }
    iframe.title = 'Embedded content';
}

function fixScrollableRegion(el) {
    if (!el.hasAttribute('tabindex')) {
        el.setAttribute('tabindex', '0');
    }
}

function applyFixes(root) {
    root.querySelectorAll('iframe:not([title])').forEach(labelIframe);
    SCROLLABLE_IDS.forEach((id) => {
        const el = root.querySelector(`#${id}`) || document.getElementById(id);
        if (el) fixScrollableRegion(el);
    });
}

export default function a11yIframeFix() {
    applyFixes(document);

    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType !== 1) continue;
                if (node.tagName === 'IFRAME') {
                    labelIframe(node);
                } else {
                    node.querySelectorAll('iframe:not([title])').forEach(labelIframe);
                    SCROLLABLE_IDS.forEach((id) => {
                        const el = node.id === id ? node : node.querySelector(`#${id}`);
                        if (el) fixScrollableRegion(el);
                    });
                }
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}
