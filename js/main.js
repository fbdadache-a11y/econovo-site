/* ==========================================================================
   ECONOVO — main.js
   Navbar state, mobile menu, dark mode toggle, footer year.
   No external dependency required for this file.
   ========================================================================== */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        initYear();
        initNavbarScroll();
        initMobileMenu();
        initThemeToggle();
        if (window.lucide) window.lucide.createIcons();
    });

    function initYear() {
        const el = document.getElementById('currentYear');
        if (el) el.textContent = new Date().getFullYear();
    }

    function initNavbarScroll() {
        const nav = document.getElementById('navbar');
        if (!nav) return;
        const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    function initMobileMenu() {
        const openBtn = document.getElementById('navToggle');
        const closeBtn = document.getElementById('mobileMenuClose');
        const menu = document.getElementById('mobileMenu');
        const overlay = document.getElementById('mobileMenuOverlay');
        if (!openBtn || !menu || !overlay) return;

        const open = () => { menu.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow = 'hidden'; };
        const close = () => { menu.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow = ''; };

        openBtn.addEventListener('click', open);
        closeBtn && closeBtn.addEventListener('click', close);
        overlay.addEventListener('click', close);
        menu.querySelectorAll('.nav-link').forEach(a => a.addEventListener('click', close));
    }

    function initThemeToggle() {
        const btn = document.getElementById('themeToggle');
        const root = document.documentElement;
        const stored = localStorage.getItem('econovo-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initial = stored || (prefersDark ? 'dark' : 'light');
        applyTheme(initial);

        if (!btn) return;
        btn.addEventListener('click', () => {
            const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(next);
            localStorage.setItem('econovo-theme', next);
        });

        function applyTheme(theme) {
            if (theme === 'dark') root.setAttribute('data-theme', 'dark');
            else root.removeAttribute('data-theme');
            const icon = document.getElementById('themeToggleIcon');
            if (icon) icon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
            if (window.lucide) window.lucide.createIcons();
        }
    }
})();
