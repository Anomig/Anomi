document.addEventListener('DOMContentLoaded', () => {
    const featureItems = Array.from(document.querySelectorAll('.featured-item[data-preview]'));

    if (!featureItems.length || window.matchMedia('(max-width: 768px)').matches) {
        return;
    }

    const preview = document.createElement('div');
    preview.className = 'project-preview';
    const previewImage = document.createElement('img');
    previewImage.className = 'project-preview-image';
    previewImage.alt = '';
    preview.appendChild(previewImage);
    document.body.appendChild(preview);

    let activeItem = null;
    let targetX = -999;
    let targetY = -999;
    let currentX = -999;
    let currentY = -999;

    function movePreview() {
        currentX += (targetX - currentX) * 0.18;
        currentY += (targetY - currentY) * 0.18;
        preview.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(1) rotate(-2deg)`;
        requestAnimationFrame(movePreview);
    }

    movePreview();

    featureItems.forEach((item) => {
        item.addEventListener('mouseenter', () => {
            activeItem = item;
            previewImage.src = item.dataset.preview;
            previewImage.alt = item.dataset.previewAlt || '';
            preview.classList.add('is-visible');
        });

        item.addEventListener('mousemove', (event) => {
            if (!activeItem) {
                return;
            }

            const offsetX = 28;
            const offsetY = 24;
            targetX = event.clientX + offsetX;
            targetY = event.clientY - 40;

            const previewWidth = 220;
            const previewHeight = previewWidth * 0.75;

            if (targetX + previewWidth > window.innerWidth - 20) {
                targetX = event.clientX - previewWidth - offsetX;
            }

            if (targetY + previewHeight > window.innerHeight - 20) {
                targetY = window.innerHeight - previewHeight - 20;
            }

            if (targetY < 20) {
                targetY = 20;
            }
        });

        item.addEventListener('mouseleave', () => {
            activeItem = null;
            preview.classList.remove('is-visible');
        });
    });
});