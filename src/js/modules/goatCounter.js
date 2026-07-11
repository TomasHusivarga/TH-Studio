const GOATCOUNTER_ENDPOINT = 'https://tomashusivarga.goatcounter.com/count';
const GOATCOUNTER_SCRIPT = 'https://gc.zgo.at/count.js';

export function initGoatCounter() {
  if (document.querySelector('script[data-goatcounter]')) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = GOATCOUNTER_SCRIPT;
  script.dataset.goatcounter = GOATCOUNTER_ENDPOINT;
  document.head.append(script);
}
