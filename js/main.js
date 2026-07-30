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
        initScrollProgress();
        initMobileMenu();
        initThemeToggle();
        initMobileJoinVisibility();
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

    function initScrollProgress() {
        const bar = document.getElementById('scrollProgress');
        if (!bar) return;
        let ticking = false;
        const update = () => {
            const doc = document.documentElement;
            const scrollable = doc.scrollHeight - doc.clientHeight;
            const pct = scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0;
            bar.style.width = pct + '%';
            ticking = false;
        };
        window.addEventListener('scroll', () => {
            if (!ticking) { requestAnimationFrame(update); ticking = true; }
        }, { passive: true });
        update();
    }

    // Hide the floating "Join" bar while the in-page hero or CTA buttons are
    // already visible, so mobile users never see two competing join buttons.
    function initMobileJoinVisibility() {
        const bar = document.querySelector('.mobile-join');
        const hero = document.querySelector('.hero');
        const cta = document.querySelector('.cta-section');
        if (!bar || !hero) return;

        const hide = () => bar.classList.add('is-hidden');
        const show = () => bar.classList.remove('is-hidden');

        hide(); // start hidden until we know we're past the hero

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.target === hero) entry.isIntersecting ? hide() : show();
                if (cta && entry.target === cta) entry.isIntersecting ? hide() : show();
            });
        }, { threshold: .2 });

        observer.observe(hero);
        if (cta) observer.observe(cta);
    }

    function initMobileMenu() {
        const openBtn = document.getElementById('navToggle');
        const closeBtn = document.getElementById('mobileMenuClose');
        const menu = document.getElementById('mobileMenu');
        const overlay = document.getElementById('mobileMenuOverlay');
        if (!openBtn || !menu || !overlay) return;

        const links = menu.querySelectorAll('.nav-link');

        const open = () => {
            menu.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow = 'hidden';
            if (window.gsap) {
                gsap.fromTo(links, { opacity: 0, x: 16 }, { opacity: 1, x: 0, duration: .4, stagger: .06, delay: .15, ease: 'power2.out' });
            }
        };
        const close = () => { menu.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow = ''; };

        openBtn.addEventListener('click', open);
        closeBtn && closeBtn.addEventListener('click', close);
        overlay.addEventListener('click', close);
        links.forEach(a => a.addEventListener('click', close));
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
            const meta = document.getElementById('themeColorMeta');
            if (meta) meta.setAttribute('content', theme === 'dark' ? '#1F1F1F' : '#F4F7F2');
        }
    }
})();
