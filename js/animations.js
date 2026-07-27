/* ==========================================================================
   ECONOVO — animations.js
   One orchestrated hero entrance (GSAP) + a single scroll-reveal mechanism
   used everywhere else (IntersectionObserver, no dependency). Deliberately
   restrained — see /README.md "Design notes".
   ========================================================================== */

(function () {
    'use strict';

    let observer;

    document.addEventListener('DOMContentLoaded', () => {
        heroEntrance();
        idleFloat();
        initRevealObserver();
    });

    // Re-observe newly rendered cards after a language switch re-renders lists
    document.addEventListener('econovo:rendered', () => {
        observeReveals();
    });

    function initRevealObserver() {
        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
        observeReveals();
    }

    function observeReveals() {
        document.querySelectorAll('.reveal:not(.active)').forEach(el => observer.observe(el));
    }

    function heroEntrance() {
        const items = [
            '.hero-content .eyebrow',
            '.hero-content h1',
            '.hero-content p',
            '.hero-content .hero-tags',
            '.hero-content .hero-actions',
            '.hero-visual'
        ].map(sel => document.querySelector(sel)).filter(Boolean);

        if (!items.length) return;

        if (window.gsap) {
            gsap.set(items, { opacity: 0, y: 24 });
            gsap.to(items, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.15 });
        } else {
            items.forEach((el, i) => {
                el.style.transition = `opacity .6s ease ${i * 0.1}s, transform .6s ease ${i * 0.1}s`;
                requestAnimationFrame(() => { el.style.opacity = '1'; el.style.transform = 'none'; });
            });
        }
    }

    function idleFloat() {
        if (!window.gsap) return;
        gsap.to('.floating-badge', { y: -10, duration: 2.6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        gsap.to('.floating-tag', { y: -8, rotate: -2, duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.3 });
        gsap.to('.hero-img-container', { y: -8, duration: 3.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }
})();
