import '../css/style.css';
import Cursor from './components/Cursor.js';
import PortfolioSlider from './components/PortfolioSlider.js';
import UniversalCarousel from './components/UniversalCarousel.js';

document.addEventListener('DOMContentLoaded', () => {
  new Cursor();
  
  // Lazy load heavy Three.js scene to improve TBT and FCP
  import('./gl/Scene.js').then(({ default: Scene }) => {
    new Scene();
  });

  // 1. Portfolio Slider (Desktop Grouping)
  new PortfolioSlider('.bento-grid').init();

  // 2. Reviews Carousel (Draggable)
  new UniversalCarousel({
    container: '.reviews-scroll',
    dots: '.reviews-dots',
    cards: '.review-card',
    gap: 24
  }).init();

  // 3. Projects Mobile Carousel (Draggable, Mobile Only)
  new UniversalCarousel({
    container: '.bento-grid',
    dots: '.projects-dots',
    cards: '.bento-wrapper',
    gap: 24,
    mobileOnly: true
  }).init();

  // Cookie Banner Logic
  const cookieBanner = document.getElementById('cookie-banner');
  const btnAccept = document.getElementById('cookie-accept');
  const btnDecline = document.getElementById('cookie-decline');

  if (cookieBanner && !localStorage.getItem('th-cookie-consent')) {
    // Show banner after a tiny delay for smooth animation
    setTimeout(() => {
      cookieBanner.classList.add('visible');
    }, 1000);

    const hideBanner = (consent) => {
      localStorage.setItem('th-cookie-consent', consent);
      cookieBanner.classList.remove('visible');
    };

    if (btnAccept) btnAccept.addEventListener('click', () => hideBanner('accepted'));
    if (btnDecline) btnDecline.addEventListener('click', () => hideBanner('declined'));
  }

  console.log('TH Studio — ready.');
});
