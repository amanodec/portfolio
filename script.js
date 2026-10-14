(() => {
  'use strict';

  const doc = document;
  const body = doc.body;
  const $ = (selector, context = doc) => context.querySelector(selector);
  const $$ = (selector, context = doc) => [...context.querySelectorAll(selector)];
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  requestAnimationFrame(() => body.classList.add('loaded'));

  const header = $('#site-header');
  const progressBar = $('#page-progress-bar');
  let lastScrollY = window.scrollY;
  let scrollTicking = false;

  function updateScrollScene() {
    const y = window.scrollY;
    const scrollable = Math.max(doc.documentElement.scrollHeight - window.innerHeight, 1);
    if (progressBar) progressBar.style.transform = `scaleX(${clamp(y / scrollable, 0, 1)})`;
    if (header) {
      const movingDown = y > lastScrollY + 5;
      const movingUp = y < lastScrollY - 5;
      if (movingDown && y > 520 && !body.classList.contains('menu-open')) header.classList.add('nav-hidden');
      if (movingUp || y < 520) header.classList.remove('nav-hidden');
    }
    lastScrollY = y;
    scrollTicking = false;
  }

  function requestScrollUpdate() {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(updateScrollScene);
  }

  addEventListener('scroll', requestScrollUpdate, { passive: true });
  addEventListener('resize', requestScrollUpdate, { passive: true });
  updateScrollScene();

  const menuToggle = $('#menu-toggle');
  const mobileMenu = $('#mobile-menu');
  const menuInertTargets = $$('.skip-link, #main-content, .site-footer');
  let lastFocusedElement = null;

  function focusableInMenu() {
    return mobileMenu ? $$('a, button, [tabindex]:not([tabindex="-1"])', mobileMenu).filter((element) => !element.disabled && element.offsetParent !== null) : [];
  }

  function setMenu(open) {
    if (!menuToggle || !mobileMenu) return;
    if (open) lastFocusedElement = doc.activeElement;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    mobileMenu.setAttribute('aria-hidden', String(!open));
    mobileMenu.inert = !open;
    menuInertTargets.forEach((target) => { target.inert = open; });
    mobileMenu.classList.toggle('open', open);
    body.classList.toggle('menu-open', open);
    if (open) requestAnimationFrame(() => focusableInMenu()[0]?.focus());
    else if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
  }

  menuToggle?.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
  if (mobileMenu) $$('a', mobileMenu).forEach((link) => link.addEventListener('click', () => setMenu(false)));
  doc.addEventListener('keydown', (event) => {
    if (!body.classList.contains('menu-open')) return;
    if (event.key === 'Escape') {
      setMenu(false);
      return;
    }
    if (event.key !== 'Tab') return;
    const items = focusableInMenu();
    if (!items.length) return;
    const first = items[0];
    const last = items.at(-1);
    if (event.shiftKey && doc.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && doc.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -7% 0px', threshold: .07 });
  $$('.reveal').forEach((item) => revealObserver.observe(item));

  const desktopNavigation = window.matchMedia('(min-width: 1121px)');
  desktopNavigation.addEventListener?.('change', (event) => {
    if (event.matches && body.classList.contains('menu-open')) setMenu(false);
  });

  // Any remaining standalone imagery gets a readable failure state too. This
  // keeps slow or blocked media from leaving a silent empty frame.
  function markStandaloneImageMissing(image) {
    const frame = image.closest('.media-frame, figure');
    if (!frame) return;
    image.hidden = true;
    image.setAttribute('aria-hidden', 'true');
    frame.classList.add('media-load-failed');
    if (frame.querySelector('.media-error')) return;
    const message = doc.createElement('span');
    message.className = 'media-error';
    message.textContent = 'Media unavailable. Use the linked product source or approved capture.';
    frame.append(message);
  }

  $$('img').forEach((image) => {
    image.decoding = 'async';
    image.addEventListener('error', () => markStandaloneImageMissing(image), { once: true });
    if (image.complete && !image.naturalWidth) markStandaloneImageMissing(image);
  });

  doc.addEventListener('visibilitychange', () => {
    body.classList.toggle('page-hidden', doc.hidden);
  });
})();
