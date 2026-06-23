import { defaultModal } from '../global/modal';

if (document.querySelector('#request-quote-form') !== null && document.querySelector('#request-quote-button') !== null) {
    const modal = defaultModal();
    document.querySelector('#request-quote-button').addEventListener('click', (e) => {
        e.preventDefault();
        modal.open({ size: 'large' });
        modal.updateContent(document.querySelector('#request-quote-form').innerHTML);
    });
}
