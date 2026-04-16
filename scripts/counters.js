/**
 * Анимация счётчиков: числа плавно увеличиваются от 0 до target.
 */
export function initCounters() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    const statsSection = document.querySelector('.about-stats');

    if (!statsSection || !statNumbers.length) return;

    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;
        countersAnimated = true;

        statNumbers.forEach((el) => {
            const target = parseInt(el.getAttribute('data-target'), 10);
            const suffix = el.getAttribute('data-suffix') || '';
            const duration = 1800;
            const startTime = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(eased * target);

                el.textContent = current + suffix;

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    el.textContent = target + suffix;
                }
            }

            requestAnimationFrame(update);
        });
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
}