/**
 * Модуль переключения темы (dark/light).
 * Сохраняет выбор в localStorage.
 */
export function initTheme() {
    const html = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');

    if (!themeToggle || !themeIcon) return;

    const sunIcon = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';

    const moonIcon = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';

    function updateIcon(theme) {
        themeIcon.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
    }

    // Загрузка сохранённой темы
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';

        themeIcon.style.transform = 'rotate(360deg) scale(0)';

        setTimeout(() => {
            html.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            updateIcon(next);
            themeIcon.style.transform = 'rotate(0deg) scale(1)';
        }, 250);
    });
}