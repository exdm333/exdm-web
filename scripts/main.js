/**
 * ПУНКТ 1: Главный модуль — импортирует и запускает все подмодули.
 * Подключается в HTML как <script type="module" src="js/main.js"></script>
 *
 * Каждая функция — отдельный файл/модуль.
 * Для добавления нового модуля: создай файл в js/, экспортируй функцию init,
 * импортируй здесь и вызови.
 */

import { initTheme } from './theme.js';
import { initNavigation } from './navigation.js';
import { initReveal } from './reveal.js';
import { initCounters } from './counters.js';
import { initCursor } from './cursor.js';
import { initTilt } from './tilt.js';
import { initParallax } from './parallax.js';
import { initNavHighlight } from './nav_highlight.js';

// Запускаем всё после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initReveal();
    initCounters();
    initCursor();
    initTilt();
    initParallax();
    initNavHighlight();
});