/**
 * Эффект свечения курсора (только десктоп с мышью).
 */
export function initCursor() {
    const cursorGlow = document.getElementById('cursorGlow');
    if (!cursorGlow) return;

    // Только для устройств с точным указателем (мышь)
    if (!window.matchMedia('(pointer: fine)').matches) {
        cursorGlow.style.display = 'none';
        return;
    }

    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
            document.body.style.setProperty('--mouse-x', e.clientX + 'px');
            document.body.style.setProperty('--mouse-y', e.clientY + 'px');
        });
    });
}