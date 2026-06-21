export function initPortfolioCounter() {
  const portfolioCounter = document.getElementById('portfolio-counter');
  const portfolioProjects = document.querySelectorAll('#prace .bento-wrapper');

  if (portfolioCounter && portfolioProjects.length > 0) {
    portfolioCounter.textContent = portfolioProjects.length;
  }
}
