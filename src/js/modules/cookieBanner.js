export function initCookieBanner() {
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptButton = document.getElementById('cookie-accept');
  const declineButton = document.getElementById('cookie-decline');

  if (!cookieBanner || localStorage.getItem('th-cookie-consent')) return;

  setTimeout(() => {
    cookieBanner.classList.add('visible');
  }, 1000);

  const hideBanner = (consent) => {
    localStorage.setItem('th-cookie-consent', consent);
    cookieBanner.classList.remove('visible');
  };

  acceptButton?.addEventListener('click', () => hideBanner('accepted'));
  declineButton?.addEventListener('click', () => hideBanner('declined'));
}
