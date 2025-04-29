const filterButtons = document.querySelectorAll('.filter-btn');
const projectLinks = document.querySelectorAll('.projects-grid a'); // Target the <a> wrapper

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button styling
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const selectedCategory = button.getAttribute('data-category');

        projectLinks.forEach(link => {
            const card = link.querySelector('.project-card');
            const categories = card.getAttribute('data-category').split(' ');

            if (selectedCategory === 'all' || categories.includes(selectedCategory)) {
                link.style.display = 'block';
            } else {
                link.style.display = 'none';
            }
        });
    });
});
