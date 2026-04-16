/**
 * Лёгкий параллакс-эффект на hero при скролле.
 */
export function initParallax() {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            const opacity = 1 - (scrolled / (window.innerHeight * 0.8));
            const translateY = scrolled * 0.3;
            heroContent.style.opacity = Math.max(0, opacity);
            heroContent.style.transform = `translateY(\${translateY}px)`;
        }
    }, { passive: true });
}