/**
 * Подсветка активного пункта навигации при скролле.
 */
export function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-links a');

    if (!sections.length || !navLinksAll.length) return;

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinksAll.forEach(a => {
                    a.style.color = '';
                });
                const activeLink = document.querySelector(`.nav-links a[href="#\${id}"]`);
                if (activeLink) {
                    activeLink.style.color = 'var(--text-primary)';
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px'
    });

    sections.forEach(section => navObserver.observe(section));
}