import '../css/style.css';
import PortfolioSlider from './components/PortfolioSlider.js';
import UniversalCarousel from './components/UniversalCarousel.js';
import { initContactForm } from './modules/contactForm.js';
import { initCookieBanner } from './modules/cookieBanner.js';
import { initCursorRing } from './modules/cursorRing.js';
import { initFaqTabs } from './modules/faqTabs.js';
import { initLeadSourceTracking } from './modules/leadSourceTracking.js';
import { initMagneticButtons } from './modules/magneticButtons.js';
import { initMobileNav } from './modules/mobileNav.js';
import { getMotionPreferences } from './modules/motionPreferences.js';
import { initPortfolioCounter } from './modules/portfolioCounter.js';
import { initScene } from './modules/sceneLoader.js';
import { initHeroPresence } from './modules/scrollEffects/heroPresence.js';
import { initServicesFocus } from './modules/scrollEffects/servicesFocus.js';
import { initScrollProgress } from './modules/scrollProgress.js';
import { initScrollReveal } from './modules/scrollReveal.js';
import { initTiltCards } from './modules/tiltCards.js';

document.addEventListener('DOMContentLoaded', () => {
  const motion = getMotionPreferences();

  initCursorRing();
  initScrollProgress();
  initMagneticButtons();
  initScrollReveal({ motion });
  initMobileNav();
  initLeadSourceTracking();
  initContactForm();
  initTiltCards({ motion });
  initScene();
  initHeroPresence({ motion });
  initServicesFocus({ motion });
  initPortfolioCounter();
  initFaqTabs();

  new PortfolioSlider('.bento-grid').init();

  new UniversalCarousel({
    container: '.reviews-scroll',
    dots: '.reviews-dots',
    cards: '.review-card',
    gap: 24,
  }).init();

  new UniversalCarousel({
    container: '.bento-grid',
    dots: '.projects-dots',
    cards: '.bento-wrapper',
    gap: 24,
    mobileOnly: true,
  }).init();

  initCookieBanner();
});
