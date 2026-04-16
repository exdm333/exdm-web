/**
 * 3D tilt-эффект на карточках (только десктоп).
 */
export function initTilt() {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const tiltCards = document.querySelectorAll('.glass-tilt');
    if (!tiltCards.length) return;

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;

            card.style.transform = `perspective(800px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });
}