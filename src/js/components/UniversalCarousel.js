/**
 * UniversalCarousel
 * 
 * A reusable component for mouse-draggable horizontal scrolling carousels.
 * Supports snap points, dot navigation, and optional mobile-only activation.
 */
export default class UniversalCarousel {
  /**
   * @param {Object} options
   * @param {string} options.container - Selector for the scrollable container
   * @param {string} options.dots - Selector for the dots container
   * @param {string} options.cards - Selector for individual cards
   * @param {number} [options.gap=24] - Gap between cards in pixels
   * @param {boolean} [options.mobileOnly=false] - If true, only activates below 900px
   */
  constructor({ container, dots, cards, gap = 24, mobileOnly = false }) {
    this.selectors = { container, dots, cards };
    this.gap = gap;
    this.mobileOnly = mobileOnly;
    
    this.container = null;
    this.dotsContainer = null;
    this.cards = [];
    this.dots = [];
    
    this.isDown = false;
    this.startX = 0;
    this.scrollLeft = 0;
    this.hasMoved = false;
  }

  init() {
    this.container = document.querySelector(this.selectors.container);
    if (!this.container) return;

    // Check mobile-only constraint
    if (this.mobileOnly && !window.matchMedia('(max-width: 900px)').matches) {
      // If we are on desktop but it's mobile-only, ensure dots are hidden
      this.dotsContainer = document.querySelector(this.selectors.dots);
      if (this.dotsContainer) this.dotsContainer.style.display = 'none';
      return;
    }

    this.cards = [...this.container.querySelectorAll(this.selectors.cards)];
    if (this.cards.length === 0) return;

    this.dotsContainer = document.querySelector(this.selectors.dots);
    if (this.dotsContainer) this.dotsContainer.style.display = 'flex';

    this._initDrag();
    this._initDots();
    this._initScrollSync();
    
    // Initial UI state
    setTimeout(() => this._updateUI(), 100);

    // Handle resize
    window.addEventListener('resize', () => {
      const isMobile = window.matchMedia('(max-width: 900px)').matches;
      if (this.mobileOnly) {
        if (isMobile) {
          if (!this.cards.length) this.init(); // Re-init if switching to mobile
          if (this.dotsContainer) this.dotsContainer.style.display = 'flex';
        } else {
          if (this.dotsContainer) this.dotsContainer.style.display = 'none';
        }
      }
      this._updateUI();
    });
  }

  _initDrag() {
    const handleStart = (e) => {
      const pageX = e.type.startsWith('touch') ? e.touches[0].pageX : e.pageX;
      if (e.type === 'mousedown' && e.button !== 0) return;
      
      this.isDown = true;
      this.hasMoved = false;
      this.container.classList.add('is-dragging');
      this.startX = pageX - this.container.offsetLeft;
      this.scrollLeft = this.container.scrollLeft;
      
      // Disable snap during drag for smooth movement
      this.container.style.scrollSnapType = 'none';
      this.container.style.scrollBehavior = 'auto';
    };

    const handleMove = (e) => {
      if (!this.isDown) return;
      
      const pageX = e.type.startsWith('touch') ? e.touches[0].pageX : e.pageX;
      const x = pageX - this.container.offsetLeft;
      const dist = x - this.startX;
      
      if (!this.hasMoved && Math.abs(dist) > 8) {
        this.hasMoved = true;
      }

      if (this.hasMoved) {
        if (e.cancelable) e.preventDefault(); 
        const walk = dist * 1.5;
        this.container.scrollLeft = this.scrollLeft - walk;
      }
    };

    const handleEnd = () => {
      if (!this.isDown) return;
      this.isDown = false;
      this.container.classList.remove('is-dragging');
      
      // Restore snap and smooth behavior
      this.container.style.scrollSnapType = 'x mandatory';
      this.container.style.scrollBehavior = 'smooth';
    };

    // Mouse events
    this.container.addEventListener('mousedown', handleStart);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('mouseleave', handleEnd);

    // Touch events
    this.container.addEventListener('touchstart', handleStart, { passive: true });
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleEnd);

    this.container.addEventListener('click', (e) => {
      if (this.hasMoved) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);
  }

  _initDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = '';
    this.dots = [];

    this.cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'bento-nav-dot';
      dot.setAttribute('aria-label', `Strana ${i + 1}`);
      dot.addEventListener('click', () => {
        const cardWidth = this.cards[0].offsetWidth + this.gap;
        this.container.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
      });
      this.dotsContainer.appendChild(dot);
      this.dots.push(dot);
    });
  }

  _initScrollSync() {
    let timeout;
    this.container.addEventListener('scroll', () => {
      if (timeout) cancelAnimationFrame(timeout);
      timeout = requestAnimationFrame(() => this._updateUI());
    }, { passive: true });
  }

  _updateUI() {
    if (!this.container || this.cards.length === 0) return;

    const scrollPos = this.container.scrollLeft;
    const cardWidth = this.cards[0].offsetWidth + this.gap;
    const activeIndex = Math.round(scrollPos / cardWidth);

    this.dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === activeIndex);
    });
  }
}
