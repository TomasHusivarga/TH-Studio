const DESKTOP_QUERY = '(min-width: 901px)';

export function initHeroPresence({ motion } = {}) {
  const hero = document.getElementById('hero');
  if (!hero) return;

  hero.classList.add('hero-presence');

  if (motion?.reduced) {
    hero.classList.add('is-visible');
    return;
  }

  const desktopQuery = window.matchMedia(DESKTOP_QUERY);
  let rafId = null;
  let pointerX = 0;
  let pointerY = 0;

  const setVisible = () => {
    hero.classList.add('is-visible');
  };

  const updateDepth = () => {
    rafId = null;

    if (!desktopQuery.matches) {
      hero.style.removeProperty('--hero-x');
      hero.style.removeProperty('--hero-y');
      hero.style.removeProperty('--hero-scale');
      hero.style.removeProperty('--hero-glow-x');
      hero.style.removeProperty('--hero-glow-y');
      return;
    }

    const scrollProgress = Math.min(window.scrollY / Math.max(hero.offsetHeight, 1), 1);
    hero.style.setProperty('--hero-x', `${(pointerX * 0.45).toFixed(2)}px`);
    hero.style.setProperty('--hero-y', `${((pointerY * 0.35) + (scrollProgress * -18)).toFixed(2)}px`);
    hero.style.setProperty('--hero-scale', (1 - (scrollProgress * 0.018)).toFixed(3));
    hero.style.setProperty('--hero-glow-x', `${(pointerX * 0.16).toFixed(2)}px`);
    hero.style.setProperty('--hero-glow-y', `${(pointerY * 0.16).toFixed(2)}px`);
  };

  const requestDepthUpdate = () => {
    if (rafId) return;
    rafId = requestAnimationFrame(updateDepth);
  };

  const handlePointerMove = (event) => {
    const centerX = window.innerWidth * 0.5;
    const centerY = window.innerHeight * 0.5;

    pointerX = ((event.clientX - centerX) / centerX) * 10;
    pointerY = ((event.clientY - centerY) / centerY) * 7;
    requestDepthUpdate();
  };

  requestAnimationFrame(setVisible);
  window.addEventListener('pointermove', handlePointerMove, { passive: true });
  window.addEventListener('scroll', requestDepthUpdate, { passive: true });
  window.addEventListener('resize', requestDepthUpdate);
  desktopQuery.addEventListener?.('change', requestDepthUpdate);
  requestDepthUpdate();
}
