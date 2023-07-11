function hideAllTabContents() {
  const favoritesTab = document.querySelector('.tab[data-tab="favorites"]');
  const interestedTab = document.querySelector('.tab[data-tab="interested"]');
  const goingTab = document.querySelector('.tab[data-tab="going"]');
  const favoritesContent = document.querySelector('.tab-content.favorites .events-container');
  const interestedContent = document.querySelector('.tab-content.interested .events-container');
  const goingContent = document.querySelector('.tab-content.going .events-container');

  favoritesTab.classList.remove('active');
  interestedTab.classList.remove('active');
  goingTab.classList.remove('active');
  favoritesContent.style.display = 'none';
  interestedContent.style.display = 'none';
  goingContent.style.display = 'none';
}

export { hideAllTabContents };
