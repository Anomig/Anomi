const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('.form-status');
const submitButton = contactForm?.querySelector('button[type="submit"]');
const honeypot = contactForm?.querySelector('[name="_honey"]');
const successMessage = document.querySelector('.contact-success');
const resetButton = successMessage?.querySelector('.contact-success__reset');

if (contactForm && formStatus && submitButton && honeypot) {
    const setStatus = (message, type = '') => {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`.trim();
    };

    contactForm.addEventListener('invalid', () => {
        setStatus('Controleer de gemarkeerde velden en probeer opnieuw.', 'form-status--error');
    }, true);

    contactForm.addEventListener('input', () => {
        if (formStatus.classList.contains('form-status--error')) {
            setStatus('');
        }
    });

    contactForm.addEventListener('submit', async event => {
        event.preventDefault();

        if (honeypot.value) {
            setStatus('Er ging iets mis. Probeer het opnieuw.', 'form-status--error');
            return;
        }

        submitButton.disabled = true;
        submitButton.classList.add('is-sending');
        setStatus('Je bericht wordt verstuurd...', 'form-status--sending');

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    Accept: 'application/json'
                }
            });
            const result = await response.json();

            if (!response.ok || (result.success !== true && result.success !== 'true')) {
                throw new Error('The form submission was not accepted.');
            }

            contactForm.hidden = true;
            successMessage.hidden = false;
            successMessage.focus();
        } catch (error) {
            submitButton.disabled = false;
            submitButton.classList.remove('is-sending');
            setStatus('Je bericht kon niet worden verstuurd. Probeer het opnieuw.', 'form-status--error');
        }
    });

    resetButton?.addEventListener('click', () => {
        contactForm.reset();
        contactForm.hidden = false;
        successMessage.hidden = true;
        submitButton.disabled = false;
        submitButton.classList.remove('is-sending');
        setStatus('');
        contactForm.querySelector('input')?.focus();
    });
}
