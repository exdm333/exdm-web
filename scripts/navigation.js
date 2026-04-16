/**
 * Мобильная навигация: бургер-меню + плавный скролл по якорям.
 * ПУНКТ 4: Анимация через CSS (max-height/opacity), JS только toggle класса.
 */
export function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const burgerIcon = document.getElementById('burgerIcon');
    const navbar = document.getElementById('navbar');
    const html = document.documentElement;

    if (!navToggle || !navLinks || !burgerIcon) return;

    const burgerOpen = '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>';
    const burgerClose = '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>';

    let menuOpen = false;

    function closeMenu() {
        menuOpen = false;
        navLinks.classList.remove('open');
        burgerIcon.innerHTML = burgerOpen;
        navToggle.setAttribute('aria-expanded', 'false');
    }

    navToggle.addEventListener('click', () => {
        menuOpen = !menuOpen;
        navLinks.classList.toggle('open', menuOpen);
        burgerIcon.innerHTML = menuOpen ? burgerClose : burgerOpen;
        navToggle.setAttribute('aria-expanded', String(menuOpen));
    });

    // Закрытие при клике на ссылку
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Закрытие при клике вне меню
    document.addEventListener('click', (e) => {
        if (menuOpen && !navbar.contains(e.target)) {
            closeMenu();
        }
    });

    // Стиль навбара при скролле
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = html.getAttribute('data-theme') === 'dark'
                ? 'rgba(15,15,15,0.8)'
                : 'rgba(242,242,242,0.75)';
            navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.12)';
        } else {
            navbar.style.background = '';
            navbar.style.boxShadow = '';
        }
    }, { passive: true });

    // Плавный скролл по якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}