document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const items = Array.from(track.children);
    const totalItems = items.length;
    let currentIndex = 0;
    let scrollSpeed = 1;
    let paused = false;

    // Clone items and append to the end
    items.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });

    const itemWidth = items[0].clientWidth;
    const totalWidth = itemWidth * totalItems;

    // Set track width to fit all items (original + clones)
    track.style.width = `${itemWidth * totalItems * 2}px`;

    function scrollCarousel() {
        if (!paused) {
            currentIndex += scrollSpeed;
            track.style.transform = `translateX(-${currentIndex}px)`;

            // When we've scrolled past the original items, reset instantly to the start
            if (currentIndex >= totalWidth) {
                // Instantly jump back by the width of the original set (user won't notice)
                currentIndex -= totalWidth;
                track.style.transform = `translateX(-${currentIndex}px)`;
            }
        }
        requestAnimationFrame(scrollCarousel);
    }

    scrollCarousel();

    const carousel = document.querySelector('.carousel-track');
    carousel.addEventListener('mouseover', () => { paused = true; });
    carousel.addEventListener('mouseout', () => { paused = false; });
});