export function initFaqTabs() {
  const faqPanel = document.querySelector('.faq-panel');
  if (!faqPanel) return;

  const tabs = [...faqPanel.querySelectorAll('.faq-tab')];
  const items = [...faqPanel.querySelectorAll('.faq-item')];
  const isDesktopFaq = () => window.matchMedia('(min-width: 769px)').matches;
  let faqTransitionTimer;

  const activateFaq = (tab) => {
    if (!tab || tab.classList.contains('is-active')) return;
    const targetId = tab.getAttribute('aria-controls');
    const targetItem = items.find((item) => item.id === targetId);

    tabs.forEach((candidate) => {
      const isActive = candidate === tab;
      candidate.classList.toggle('is-active', isActive);
      candidate.setAttribute('aria-selected', String(isActive));
    });

    clearTimeout(faqTransitionTimer);

    if (!isDesktopFaq()) {
      items.forEach((item) => {
        const isActive = item === targetItem;
        item.hidden = !isActive;
        item.classList.toggle('is-active', isActive);
        item.classList.remove('is-leaving');
      });
      return;
    }

    items.forEach((item) => {
      if (item === targetItem) return;
      if (item.classList.contains('is-active')) {
        item.classList.remove('is-active');
        item.classList.add('is-leaving');
      } else {
        item.hidden = true;
        item.classList.remove('is-leaving');
      }
    });

    if (targetItem) {
      targetItem.hidden = false;
      targetItem.classList.remove('is-leaving');
      requestAnimationFrame(() => {
        targetItem.classList.add('is-active');
      });
    }

    faqTransitionTimer = window.setTimeout(() => {
      items.forEach((item) => {
        if (item !== targetItem) {
          item.hidden = true;
          item.classList.remove('is-leaving');
        }
      });
    }, 320);
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => activateFaq(tab));
  });

  window.addEventListener('resize', () => {
    const activeTab = tabs.find((tab) => tab.classList.contains('is-active')) || tabs[0];
    const targetId = activeTab?.getAttribute('aria-controls');

    items.forEach((item) => {
      item.hidden = item.id !== targetId;
      item.classList.toggle('is-active', item.id === targetId);
      item.classList.remove('is-leaving');
    });
  });

  tabs[0]?.classList.remove('is-active');
  activateFaq(tabs[0]);
}
