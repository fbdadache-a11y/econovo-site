/* ==========================================================================
   ECONOVO — faq.js
   Accordion behavior. Exposed as window.EconovoFAQ.bind() so language.js
   can (re)attach it after it re-renders the FAQ list in a new language.
   ========================================================================== */

(function () {
    'use strict';

    function bind() {
        const wrapper = document.getElementById('faqWrapper');
        if (!wrapper || wrapper.dataset.bound === 'true') return;
        wrapper.dataset.bound = 'true';

        wrapper.addEventListener('click', (e) => {
            const btn = e.target.closest('.faq-question');
            if (!btn) return;
            const item = btn.parentElement;
            const wasActive = item.classList.contains('active');
            wrapper.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
            if (!wasActive) item.classList.add('active');
        });
    }

    document.addEventListener('DOMContentLoaded', bind);
    window.EconovoFAQ = { bind };
})();
