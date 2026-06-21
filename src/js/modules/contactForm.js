export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const button = form.querySelector('button[type="submit"]');
  if (!button) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (form.action.includes('REPLACE_WITH_YOUR_ID')) {
      const subject = encodeURIComponent(form.querySelector('[name=subject]')?.value || 'Dopyt z webu');
      const body = encodeURIComponent(form.querySelector('[name=message]')?.value || '');
      window.location.href = `mailto:Husivarga1412@gmail.com?subject=${subject}&body=${body}`;
      return;
    }

    button.textContent = 'Odosielam...';
    button.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) throw new Error('Form submit failed');

      button.textContent = 'Odoslané ✓';
      button.style.background = '#22c55e';
      form.reset();

      setTimeout(() => {
        button.textContent = 'Odoslať správu';
        button.style.background = '';
        button.disabled = false;
      }, 4000);
    } catch {
      button.textContent = 'Chyba — skús znova';
      button.style.background = '#ef4444';
      button.disabled = false;

      setTimeout(() => {
        button.textContent = 'Odoslať správu';
        button.style.background = '';
      }, 3000);
    }
  });
}
