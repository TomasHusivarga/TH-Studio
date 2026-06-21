import gsap from 'gsap';

export function initCursorRing() {
  const ring = document.getElementById('cursor-ring');
  let rx = window.innerWidth / 2;
  let ry = window.innerHeight / 2;
  let mx = rx;
  let my = ry;

  window.addEventListener('mousemove', (event) => {
    mx = event.clientX;
    my = event.clientY;
    document.documentElement.style.setProperty('--mx', `${event.clientX}px`);
    document.documentElement.style.setProperty('--my', `${event.clientY}px`);
  });

  gsap.ticker.add(() => {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;

    if (ring) {
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
    }
  });
}
