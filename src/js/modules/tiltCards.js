export function initTiltCards({ motion } = {}) {
  if (motion?.reduced || window.matchMedia('(pointer: coarse)').matches) return;

  document.querySelectorAll('[data-tilt]').forEach((card) => {
    const glare = document.createElement('div');
    glare.className = 'tilt-glare';
    card.prepend(glare);

    let rect = null;

    card.addEventListener('mouseenter', () => {
      rect = card.getBoundingClientRect();
    });

    card.addEventListener('mousemove', (event) => {
      if (!rect) rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const multiplier = 6;

      card.style.setProperty('--tilt-x', `${(0.5 - y) * multiplier}deg`);
      card.style.setProperty('--tilt-y', `${(x - 0.5) * multiplier}deg`);
      glare.style.setProperty('--glare-x', `${x * 100}%`);
      glare.style.setProperty('--glare-y', `${y * 100}%`);
      glare.style.opacity = '1';
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
      glare.style.opacity = '0';
      rect = null;
    });
  });
}
