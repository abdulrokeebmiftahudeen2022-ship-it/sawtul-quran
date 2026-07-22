// =========================================================
// Sawtul Qur'an — script.js
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------
     1) WHATSAPP CTA LINKS
     -----------------------------------------------------
     EDIT THIS: replace with your real WhatsApp number in
     international format, no "+", no spaces, no leading 0.
     Example for Nigeria: 2348012345678
  --------------------------------------------------- */
  const WHATSAPP_NUMBER = '2349138852810'; // <-- put your real number here

  const WHATSAPP_MESSAGE =
    "Assalamu Alaikum, I'm interested in the free trial for the Sawtul Qur'an programme starting August 1st, 2026.";

  const whatsappUrl =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  document
    .querySelectorAll('.whatsapp-cta, #headerCta')
    .forEach((link) => {
      link.setAttribute('href', whatsappUrl);
    });

  /* ---------------------------------------------------
     2) MOBILE NAV TOGGLE
  --------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------------------------------------------------
     3) FAQ ACCORDION
  --------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isOpen = question.getAttribute('aria-expanded') === 'true';

      faqItems.forEach((otherItem) => {
        const otherQuestion = otherItem.querySelector('.faq-question');
        const otherAnswer = otherItem.querySelector('.faq-answer');
        otherQuestion.setAttribute('aria-expanded', 'false');
        otherAnswer.style.maxHeight = null;
      });

      if (!isOpen) {
        question.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ---------------------------------------------------
     4) VOICE WAVEFORM — generates the animated bars used
        as the site's signature visual (hero + final CTA)
  --------------------------------------------------- */
  function buildWaveform(container, barCount) {
    if (!container) return;
    for (let i = 0; i < barCount; i++) {
      const bar = document.createElement('span');
      bar.className = 'wf-bar';
      const duration = (1.6 + Math.random() * 1.6).toFixed(2);
      const delay = (Math.random() * -2).toFixed(2);
      bar.style.animationDuration = `${duration}s`;
      bar.style.animationDelay = `${delay}s`;
      container.appendChild(bar);
    }
  }

  buildWaveform(document.getElementById('heroWave'), 48);
  document.querySelectorAll('.final-wave').forEach((el) => buildWaveform(el, 40));

  /* ---------------------------------------------------
     5) SCROLL REVEAL ANIMATION
  --------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i % 6, 5) * 0.06}s`;
      observer.observe(el);
    });
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  /* ---------------------------------------------------
     6) FOOTER YEAR
  --------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
