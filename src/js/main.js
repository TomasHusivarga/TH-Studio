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

  // Update Portfolio Counter dynamically
  const portfolioCounter = document.getElementById('portfolio-counter');
  const portfolioProjects = document.querySelectorAll('#prace .bento-wrapper');
  if (portfolioCounter && portfolioProjects.length > 0) {
    portfolioCounter.textContent = portfolioProjects.length;
  }

  const faqPanel = document.querySelector('.faq-panel');
  if (faqPanel) {
    const tabs = [...faqPanel.querySelectorAll('.faq-tab')];
    const items = [...faqPanel.querySelectorAll('.faq-item')];
    const activateFaq = (tab) => {
      tabs.forEach((candidate) => {
        const isActive = candidate === tab;
        candidate.classList.toggle('is-active', isActive);
        candidate.setAttribute('aria-selected', String(isActive));
      });
      items.forEach((item) => {
        const isActive = item.id === tab.getAttribute('aria-controls');
        item.classList.toggle('is-active', isActive);
        if (window.matchMedia('(min-width: 769px)').matches) {
          item.hidden = !isActive;
        } else {
          item.hidden = false;
        }
      });
    };

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => activateFaq(tab));
    });

    window.addEventListener('resize', () => {
      const activeTab = tabs.find((tab) => tab.classList.contains('is-active')) || tabs[0];
      if (activeTab) activateFaq(activeTab);
    });

    activateFaq(tabs[0]);
  }

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
