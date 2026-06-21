import gsap from 'gsap';

export function initScrollProgress() {
  const nav = document.getElementById('nav');
  const progressBar = document.getElementById('scroll-progress');

  if (!nav && !progressBar) return;

  gsap.ticker.add(() => {
    const scrollY = window.scrollY;

    if (nav) {
      nav.style.background = scrollY > 40 ? 'rgba(8, 12, 24, 0.97)' : 'rgba(8, 12, 24, 0.8)';
    }

    if (progressBar) {
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollY / docHeight : 0;
      progressBar.style.transform = `scaleX(${scrollPercent})`;
    }
  });
}
