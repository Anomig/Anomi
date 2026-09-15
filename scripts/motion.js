const revealTargets = document.querySelectorAll(
    '.hero-inner, .intro-content, .section-heading, .service-card, .project, .projects-hero, .projects-panel__intro, .filter, .about-hero, .cv-section, .contact-hero, .contact-content, .project-detail > section, .thank-you-hero, .thank-you-action'
);

if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    revealTargets.forEach((element, index) => {
        element.dataset.reveal = '';
        element.style.setProperty('--reveal-delay', `${Math.min(index * 60, 360)}ms`);
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -8%'
    });

    revealTargets.forEach(element => observer.observe(element));
}
