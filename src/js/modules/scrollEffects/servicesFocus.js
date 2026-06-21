const DESKTOP_QUERY = '(min-width: 901px)';

export function initServicesFocus({ motion } = {}) {
  if (motion?.reduced) return;

  const section = document.getElementById('sluzby');
  if (!section) return;

  const cards = [...section.querySelectorAll('.service-card')];
  if (cards.length < 2) return;

  const desktopQuery = window.matchMedia(DESKTOP_QUERY);
  let rafId = null;

  const clearActiveCard = () => {
    cards.forEach((card) => card.classList.remove('is-scroll-focused'));
  };

  const updateActiveCard = () => {
    rafId = null;

    if (!desktopQuery.matches) {
      clearActiveCard();
      return;
    }

    const viewportCenter = window.innerHeight * 0.5;
    const sectionRect = section.getBoundingClientRect();

    if (sectionRect.bottom < viewportCenter || sectionRect.top > viewportCenter) {
      clearActiveCard();
      return;
    }

    const scrollRange = Math.max(sectionRect.height, window.innerHeight * 0.65);
    const progress = Math.min(Math.max((viewportCenter - sectionRect.top) / scrollRange, 0), 0.999);
    const activeIndex = Math.min(cards.length - 1, Math.floor(progress * cards.length));

    cards.forEach((card, index) => {
      card.classList.toggle('is-scroll-focused', index === activeIndex);
    });
  };

  const requestUpdate = () => {
    if (rafId) return;
    rafId = requestAnimationFrame(updateActiveCard);
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  desktopQuery.addEventListener?.('change', requestUpdate);

  requestUpdate();
}
