const track = document.querySelector('.carousel-track');
const items = Array.from(track.children);
const totalItems = items.length;
let currentIndex = 0;
let scrollSpeed = 1; // Pas de snelheid naar wens aan

function cloneItems() {
    // Clone items aan het einde van de track
    items.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });
}

function scrollCarousel() {
    currentIndex += scrollSpeed;
    track.style.transform = `translateX(-${currentIndex}px)`;

    // Reset de carrousel zodra het einde is bereikt
    if (currentIndex >= items[0].clientWidth * totalItems) {
        currentIndex = 0;
        track.style.transform = 'translateX(0)';
    }

    requestAnimationFrame(scrollCarousel);
}

cloneItems(); // Clone de items om de illusie van oneindigheid te creëren
scrollCarousel();

document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.querySelector('.carousel-track');

    function pauseAnimation() {
        carouselTrack.style.animationPlayState = 'paused';
    }

    function resumeAnimation() {
        carouselTrack.style.animationPlayState = 'running';
    }

    document.querySelector('.carousel').addEventListener('mouseover', pauseAnimation);
    document.querySelector('.carousel').addEventListener('mouseout', resumeAnimation);
});

// document.body.addEventListener('mousemove', function(e) {
//     const x = e.clientX / window.innerWidth;
//     const y = e.clientY / window.innerHeight;
// document.body.style.background = `radial-gradient(circle 100px at ${x * 100}% ${y * 100}%, #9C1A04, #f9f2eb)`;
// });