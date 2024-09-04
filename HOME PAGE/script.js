const carousel = document.querySelector('.carousel');
let isMoving = true;

function moveCarousel() {
    if (isMoving) {
        const firstCard = carousel.firstElementChild;
        const cardWidth = firstCard.offsetWidth + 20; // card width + gap

        // Move the carousel by one card width
        carousel.style.transition = 'transform 0.5s linear';
        carousel.style.transform = `translateX(-${cardWidth}px)`;

        carousel.addEventListener('transitionend', () => {
            // Move the first card to the end
            carousel.appendChild(firstCard);

            // Immediately reset the carousel position to the start without any delay
            carousel.style.transition = 'none';
            carousel.style.transform = 'translateX(0)';

            // Force a reflow to ensure the transition takes effect before restarting the animation
            carousel.offsetHeight; // This forces the reflow

            // Continue the loop
            setTimeout(() => {
                carousel.style.transition = 'transform 0.5s linear';
                moveCarousel();
            }, 10);
        }, { once: true });
    }
}

// Start the carousel
moveCarousel();

// Pause/Resume the carousel on hover
carousel.addEventListener('mouseover', () => isMoving = false);
carousel.addEventListener('mouseout', () => {
    isMoving = true;
    moveCarousel();
});
