import { initGoatCounter } from './modules/goatCounter.js';

const projects = [
  ['Rehamax', '/TH-Studio/projects/rehamax.html'],
  ['DonnaBella', '/TH-Studio/projects/donnabella.html'],
  ['Eko-Profit SK', '/TH-Studio/projects/ekoprofit.html'],
  ['Safe Place Clinic', '/TH-Studio/projects/safe-place-clinic.html'],
  ['Carepoint', '/TH-Studio/projects/carepoint.html'],
  ['Humienok', '/TH-Studio/projects/humienok.html'],
  ['MiningFlow', '/TH-Studio/projects/miningflow.html'],
  ['ECPro', '/TH-Studio/projects/ecpro.html'],
  ['Waventry', '/TH-Studio/projects/waventry.html'],
  ['Viamax', '/TH-Studio/projects/viamax.html'],
  ['Slová so zmyslom', '/TH-Studio/projects/slovasozmyslom.html'],
  ['Modafinil CZ', '/TH-Studio/projects/modafinil-cz.html'],
  ['Profi Výživa', '/TH-Studio/projects/profivyziva.html'],
];

const servicesSk = [
  ['Prehľad služieb', '/TH-Studio/#sluzby'],
  ['Tvorba webstránok', '/TH-Studio/sluzby/tvorba-webstranok.html'],
  ['Tvorba e-shopov', '/TH-Studio/sluzby/tvorba-eshopov.html'],
  ['Úpravy WordPressu', '/TH-Studio/sluzby/uprava-wordpress-webu.html'],
];

const servicesEn = [
  ['Services overview', '/TH-Studio/en/#sluzby'],
  ['Website development', '/TH-Studio/en/sluzby/tvorba-webstranok.html'],
  ['E-shop development', '/TH-Studio/en/sluzby/tvorba-eshopov.html'],
  ['WordPress edits', '/TH-Studio/en/sluzby/uprava-wordpress-webu.html'],
];

const text = {
  sk: {
    navLabel: 'NAVIGÁCIA',
    homeLabel: 'TH Studio Home',
    logoTitle: 'TH Studio - Domov',
    homeUrl: '/TH-Studio/',
    workUrl: '/TH-Studio/#prace',
    blogUrl: '/TH-Studio/blog/',
    pricingUrl: '/TH-Studio/#ceny',
    aboutUrl: '/TH-Studio/#o-mne',
    contactUrl: '/TH-Studio/#kontakt',
    work: 'Práce',
    workAll: 'Všetky práce',
    workTitle: 'Pozrieť moje práce a projekty',
    workAria: 'Práce - vybrať projekt',
    services: 'Služby',
    blog: 'Blog',
    blogTitle: 'Články z praxe',
    servicesTitle: 'Moje webové služby',
    servicesAria: 'Služby - vybrať službu',
    pricing: 'Ceny',
    pricingTitle: 'Cenník tvorby webstránok',
    about: 'O mne',
    aboutTitle: 'O mne - Tomáš Husivarga',
    contact: 'Ozvi sa',
    contactTitle: 'Kontaktovať - bezplatná konzultácia',
    langUrl: '/TH-Studio/en/',
    langLabel: 'EN',
    langTitle: 'Switch to English',
    footerRole: 'Freelance web developer - Slovensko',
    privacy: 'Ochrana osobných údajov',
    top: 'Späť hore ↑',
    topTitle: 'Späť na začiatok stránky',
    servicesList: servicesSk,
  },
  en: {
    navLabel: 'NAVIGATION',
    homeLabel: 'TH Studio Home',
    logoTitle: 'TH Studio - Home',
    homeUrl: '/TH-Studio/en/',
    workUrl: '/TH-Studio/en/#prace',
    blogUrl: '/TH-Studio/en/blog/',
    pricingUrl: '/TH-Studio/en/#ceny',
    aboutUrl: '/TH-Studio/en/#o-mne',
    contactUrl: '/TH-Studio/en/#kontakt',
    work: 'Work',
    workAll: 'All work',
    workTitle: 'View work and projects',
    workAria: 'Work - choose a project',
    services: 'Services',
    blog: 'Blog',
    blogTitle: 'Practical project notes',
    servicesTitle: 'Web services',
    servicesAria: 'Services - choose a service',
    pricing: 'Pricing',
    pricingTitle: 'Website pricing',
    about: 'About',
    aboutTitle: 'About Tomáš Husivarga',
    contact: 'Contact',
    contactTitle: 'Contact - free consultation',
    langUrl: '/TH-Studio/',
    langLabel: 'SK',
    langTitle: 'Prepnúť do slovenčiny',
    footerRole: 'Freelance web developer - Slovakia',
    privacy: 'Privacy policy',
    top: 'Back to top ↑',
    topTitle: 'Back to top',
    servicesList: servicesEn,
  },
};

function isEnglishPage() {
  return document.documentElement.lang === 'en' || window.location.pathname.includes('/en/');
}

function navMenu(items) {
  return items.map(([label, href]) => `<a href="${href}">${label}</a>`).join('');
}

function languageUrl(lang) {
  const path = window.location.pathname;
  const servicePath = '/TH-Studio/sluzby/';
  const servicePathEn = '/TH-Studio/en/sluzby/';
  const blogPath = '/TH-Studio/blog/';
  const blogPathEn = '/TH-Studio/en/blog/';
  const blogArticleMap = {
    '/TH-Studio/blog/kolko-stoji-wordpress-webstranka.html': '/TH-Studio/en/blog/how-much-does-a-wordpress-website-cost.html',
    '/TH-Studio/en/blog/how-much-does-a-wordpress-website-cost.html': '/TH-Studio/blog/kolko-stoji-wordpress-webstranka.html',
    '/TH-Studio/blog/ako-mi-ai-pomaha-pri-tvorbe-webstranok-pre-klientov.html': '/TH-Studio/en/blog/how-ai-helps-me-build-client-websites.html',
    '/TH-Studio/en/blog/how-ai-helps-me-build-client-websites.html': '/TH-Studio/blog/ako-mi-ai-pomaha-pri-tvorbe-webstranok-pre-klientov.html',
    '/TH-Studio/blog/preco-kazdy-biznis-potrebuje-webstranku.html': '/TH-Studio/en/blog/why-every-business-needs-a-website.html',
    '/TH-Studio/en/blog/why-every-business-needs-a-website.html': '/TH-Studio/blog/preco-kazdy-biznis-potrebuje-webstranku.html',
    '/TH-Studio/blog/preco-portfolio-ma-impresie-bez-klikov.html': '/TH-Studio/en/blog/why-portfolio-gets-impressions-without-clicks.html',
    '/TH-Studio/en/blog/why-portfolio-gets-impressions-without-clicks.html': '/TH-Studio/blog/preco-portfolio-ma-impresie-bez-klikov.html',
    '/TH-Studio/blog/ako-pouzit-ai-pri-cisteni-napadnuteho-wordpress-webu.html': '/TH-Studio/en/blog/how-to-use-ai-when-cleaning-infected-wordpress-site.html',
    '/TH-Studio/en/blog/how-to-use-ai-when-cleaning-infected-wordpress-site.html': '/TH-Studio/blog/ako-pouzit-ai-pri-cisteni-napadnuteho-wordpress-webu.html',
    '/TH-Studio/blog/ako-presunut-wordpress-web-cez-backup-migration-plugin.html': '/TH-Studio/en/blog/how-to-move-wordpress-site-with-backup-migration-plugin.html',
    '/TH-Studio/en/blog/how-to-move-wordpress-site-with-backup-migration-plugin.html': '/TH-Studio/blog/ako-presunut-wordpress-web-cez-backup-migration-plugin.html',
    '/TH-Studio/blog/woocommerce-problem-oprava-diagnostika-eshopu.html': '/TH-Studio/en/blog/woocommerce-issue-repair-store-diagnostics.html',
    '/TH-Studio/en/blog/woocommerce-issue-repair-store-diagnostics.html': '/TH-Studio/blog/woocommerce-problem-oprava-diagnostika-eshopu.html',
  };

  if (blogArticleMap[path]) {
    return blogArticleMap[path];
  }

  if (lang === 'en' && path === blogPathEn) {
    return blogPath;
  }

  if (lang === 'sk' && path === blogPath) {
    return blogPathEn;
  }

  if (lang === 'en' && path.startsWith(servicePathEn)) {
    return path.replace(servicePathEn, servicePath);
  }

  if (lang === 'sk' && path.startsWith(servicePath)) {
    return path.replace(servicePath, servicePathEn);
  }

  return text[lang].langUrl;
}

function logoSvg() {
  return `
    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">
      <rect width="100" height="100" rx="20" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" />
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="var(--accent)" />
          <stop offset="100%" stop-color="var(--amber)" />
        </linearGradient>
      </defs>
      <path d="M25 35 H75 V45 H55 V75 H45 V45 H25 V35 Z" fill="url(#logo-gradient)" />
    </svg>`;
}

export function renderHeader() {
  const target = document.querySelector('[data-shared-header]');
  if (!target) return;

  const lang = isEnglishPage() ? 'en' : 'sk';
  const t = text[lang];
  const langUrl = languageUrl(lang);
  target.outerHTML = `
    <nav id="nav" class="nav">
      <div class="nav-container">
        <a href="${t.homeUrl}" class="nav-logo" aria-label="${t.homeLabel}" title="${t.logoTitle}">
          ${logoSvg()}
          <span>TH Studio</span>
        </a>
        <ul class="nav-links" data-label="${t.navLabel}">
          <li class="nav-projects">
            <button type="button" class="nav-projects-toggle" data-number="01" title="${t.servicesTitle}" aria-label="${t.servicesAria}" aria-expanded="false">${t.services}</button>
            <div class="nav-projects-menu">
              ${navMenu(t.servicesList)}
            </div>
          </li>
          <li class="nav-projects">
            <button type="button" class="nav-projects-toggle" data-number="02" title="${t.workTitle}" aria-label="${t.workAria}" aria-expanded="false">${t.work}</button>
            <div class="nav-projects-menu">
              <a href="${t.workUrl}">${t.workAll}</a>
              ${navMenu(projects)}
            </div>
          </li>
          <li><a href="${t.pricingUrl}" data-number="03" title="${t.pricingTitle}">${t.pricing}</a></li>
          <li><a href="${t.blogUrl}" data-number="04" title="${t.blogTitle}">${t.blog}</a></li>
          <li><a href="${t.aboutUrl}" data-number="05" title="${t.aboutTitle}">${t.about}</a></li>
          <li class="nav-links-divider"></li>
          <li class="nav-links-actions">
            <a href="${langUrl}" class="lang-switch" title="${t.langTitle}" aria-label="${t.langLabel}">${t.langLabel}</a>
            <a href="${t.contactUrl}" class="nav-cta" title="${t.contactTitle}">${t.contact}</a>
          </li>
        </ul>
        <button class="nav-hamburger" id="hamburger" aria-label="${t.services}" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>`;
}

export function renderFooter() {
  const target = document.querySelector('[data-shared-footer]');
  if (!target) return;

  const lang = isEnglishPage() ? 'en' : 'sk';
  const t = text[lang];
  target.outerHTML = `
    <footer id="footer">
      <div class="footer-inner">
        <div class="footer-left" style="display:flex; flex-direction:column; gap:0.2rem;">
          <span class="footer-brand">TH Studio</span>
          <span class="footer-copy">
            © 2026 Tomáš Husivarga · ${t.footerRole}<br>
            <a href="/TH-Studio/gdpr.html" title="${t.privacy}" style="text-decoration: underline; display: inline-block; margin-top: 0.2rem;">${t.privacy}</a>
          </span>
        </div>
        <a href="#" class="footer-top" title="${t.topTitle}" aria-label="${t.topTitle}">${t.top}</a>
      </div>
    </footer>`;
}

export function initSharedNavigation() {
  const links = document.querySelector('.nav-links');
  const hamburger = document.getElementById('hamburger');
  const projectMenus = document.querySelectorAll('.nav-projects');
  const desktopNav = window.matchMedia('(min-width: 769px)');
  let closeTimer;

  const closeOtherMenus = (activeMenu) => {
    projectMenus.forEach((menu) => {
      if (menu !== activeMenu) {
        menu.classList.remove('is-open');
        const toggle = menu.querySelector('.nav-projects-toggle');
        if (toggle) {
          toggle.setAttribute('aria-expanded', 'false');
          toggle.blur();
        }
      }
    });
  };

  projectMenus.forEach((menu) => {
    const toggle = menu.querySelector('.nav-projects-toggle');
    if (!toggle) return;

    menu.addEventListener('pointerenter', () => {
      if (desktopNav.matches) {
        window.clearTimeout(closeTimer);
        closeOtherMenus(menu);
        menu.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });

    menu.addEventListener('pointerleave', () => {
      if (desktopNav.matches) {
        closeTimer = window.setTimeout(() => menu.classList.remove('is-open'), 180);
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    toggle.addEventListener('click', () => {
      window.clearTimeout(closeTimer);
      closeOtherMenus(menu);
      const isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  });

  document.addEventListener('click', (event) => {
    projectMenus.forEach((menu) => {
      if (!menu.contains(event.target)) menu.classList.remove('is-open');
    });
  });

  if (links && hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    links.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        projectMenus.forEach((menu) => menu.classList.remove('is-open'));
      });
    });
  }
}

export function renderSharedLayout() {
  initGoatCounter();
  renderHeader();
  renderFooter();
  initSharedNavigation();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderSharedLayout);
} else {
  renderSharedLayout();
}
