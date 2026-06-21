import gsap from 'gsap';

export function initMobileNav() {
  const button = document.getElementById('hamburger');
  const links = document.querySelector('.nav-links');
  if (!button || !links) return;

  button.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    button.classList.toggle('open', isOpen);
    button.setAttribute('aria-expanded', String(isOpen));

    if (isOpen) {
      gsap.fromTo(
        links.querySelectorAll('li, .nav-links-actions > a'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.1 },
      );
    }
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      button.classList.remove('open');
      button.setAttribute('aria-expanded', 'false');
    });
  });
}
