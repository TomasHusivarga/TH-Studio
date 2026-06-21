import gsap from 'gsap';

export function initMagneticButtons() {
  document.querySelectorAll('[data-magnetic]').forEach((element) => {
    let rect = null;

    element.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hovering');
      rect = element.getBoundingClientRect();
    });

    element.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hovering');
      gsap.to(element, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
      rect = null;
    });

    element.addEventListener('mousemove', (event) => {
      if (!rect) rect = element.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      gsap.to(element, {
        x: (event.clientX - cx) * 0.3,
        y: (event.clientY - cy) * 0.3,
        duration: 0.22,
        overwrite: 'auto',
      });
    });
  });

  document.querySelectorAll('a, button, .bento-card, .service-card, .skill-tag').forEach((element) => {
    element.addEventListener('mouseenter', () => document.body.classList.add('cursor-hovering'));
    element.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hovering'));
  });
}
