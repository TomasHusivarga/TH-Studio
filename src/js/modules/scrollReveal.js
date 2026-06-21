const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';

function scrambleText(element) {
  const final = element.dataset.text || element.textContent;
  let frame = 0;
  const totalFrames = 30;

  const interval = setInterval(() => {
    element.textContent = final
      .split('')
      .map((char, index) => {
        if (char === ' ' || char === '\n') return char;
        if (frame / totalFrames > index / final.length) return char;
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      })
      .join('');

    if (frame >= totalFrames) {
      element.textContent = final;
      clearInterval(interval);
    }

    frame += 1;
  }, 28);
}

function countUp(element) {
  const target = parseInt(element.dataset.count, 10);
  const duration = 1400;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.round(eased * target);

    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

export function initScrollReveal({ motion } = {}) {
  const animatedElements = document.querySelectorAll('[data-animate]');
  const scrambleElements = document.querySelectorAll('.scramble');
  const counterElements = document.querySelectorAll('[data-count]');

  if (motion?.reduced) {
    animatedElements.forEach((element) => element.classList.add('visible'));
    scrambleElements.forEach((element) => {
      element.textContent = element.dataset.text || element.textContent;
    });
    counterElements.forEach((element) => {
      if (element.dataset.count) element.textContent = element.dataset.count;
    });
    return;
  }

  const triggered = new Set();

  const reveal = (element) => {
    if (triggered.has(element)) return;

    triggered.add(element);
    const section = element.closest('section');
    const siblings = section ? [...section.querySelectorAll('[data-animate]')] : [element];
    const index = siblings.indexOf(element);
    const delay = Math.min(index * 90, 360);

    setTimeout(() => element.classList.add('visible'), delay);
  };

  const revealVisibleElements = () => {
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    animatedElements.forEach((element) => {
      if (triggered.has(element)) return;
      const rect = element.getBoundingClientRect();

      if (rect.top < viewportHeight * 0.9 && rect.bottom > viewportHeight * -0.15) {
        reveal(element);
      }
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      if (entry.target.hasAttribute('data-animate') && !triggered.has(entry.target)) {
        reveal(entry.target);
      }

      if (entry.target.classList.contains('scramble')) {
        setTimeout(() => scrambleText(entry.target), 200);
        observer.unobserve(entry.target);
      }

      if (entry.target.hasAttribute('data-count')) {
        countUp(entry.target);
        observer.unobserve(entry.target);
      }

      if (
        triggered.has(entry.target) &&
        !entry.target.classList.contains('scramble') &&
        !entry.target.hasAttribute('data-count')
      ) {
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

  animatedElements.forEach((element) => observer.observe(element));
  scrambleElements.forEach((element) => observer.observe(element));
  counterElements.forEach((element) => observer.observe(element));

  revealVisibleElements();
  window.addEventListener('scroll', revealVisibleElements, { passive: true });
  window.addEventListener('resize', revealVisibleElements);
}
