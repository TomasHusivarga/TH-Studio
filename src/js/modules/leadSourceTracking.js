const STORAGE_KEYS = {
  landingPage: 'th_landing_page',
  referrer: 'th_referrer',
  utm: 'th_utm_params',
};

const TRACKED_FIELDS = [
  'page_url',
  'landing_page',
  'referrer',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
];

const getStoredValue = (key) => {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return '';
  }
};

const setStoredValue = (key, value) => {
  if (!value) return;

  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // Private browsing or strict settings can block storage; the form still works without it.
  }
};

const getUtmParams = () => {
  const params = new URLSearchParams(window.location.search);
  const utm = {};

  for (const field of TRACKED_FIELDS.filter((field) => field.startsWith('utm_'))) {
    const value = params.get(field);
    if (value) utm[field] = value;
  }

  return utm;
};

const getStoredUtmParams = () => {
  const stored = getStoredValue(STORAGE_KEYS.utm);
  if (!stored) return {};

  try {
    return JSON.parse(stored);
  } catch {
    return {};
  }
};

const ensureHiddenField = (form, name) => {
  const existing = form.querySelector(`input[name="${name}"]`);
  if (existing) return existing;

  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = name;
  input.dataset.leadSourceField = name;
  form.append(input);

  return input;
};

const getTrackingValues = () => {
  const storedUtm = getStoredUtmParams();

  return {
    page_url: window.location.href,
    landing_page: getStoredValue(STORAGE_KEYS.landingPage) || window.location.href,
    referrer: getStoredValue(STORAGE_KEYS.referrer) || document.referrer || 'direct',
    utm_source: storedUtm.utm_source || '',
    utm_medium: storedUtm.utm_medium || '',
    utm_campaign: storedUtm.utm_campaign || '',
    utm_term: storedUtm.utm_term || '',
    utm_content: storedUtm.utm_content || '',
  };
};

const fillTrackingFields = (form) => {
  const values = getTrackingValues();

  TRACKED_FIELDS.forEach((name) => {
    ensureHiddenField(form, name).value = values[name] || '';
  });
};

export function initLeadSourceTracking() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  setStoredValue(STORAGE_KEYS.landingPage, getStoredValue(STORAGE_KEYS.landingPage) || window.location.href);
  setStoredValue(STORAGE_KEYS.referrer, getStoredValue(STORAGE_KEYS.referrer) || document.referrer || 'direct');

  const currentUtm = getUtmParams();
  if (Object.keys(currentUtm).length > 0 && !getStoredValue(STORAGE_KEYS.utm)) {
    setStoredValue(STORAGE_KEYS.utm, JSON.stringify(currentUtm));
  }

  fillTrackingFields(form);
  form.addEventListener('submit', () => fillTrackingFields(form), { capture: true });
}
