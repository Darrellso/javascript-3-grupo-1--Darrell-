export default class Tabs {
    constructor() {
      this.tabsContainer = document.querySelector('.tabs');
      this.tabContents = document.querySelectorAll('.tab-content');
      this.tabLinks = this.tabsContainer.querySelectorAll('.tab-link');
  
      this.tabLinks.forEach(link => {
        link.addEventListener('click', e => this.onTabClick(e));
      });
    }
  
    onTabClick(event) {
      event.preventDefault();
      const selectedTab = event.target.dataset.tab;
  
      this.tabLinks.forEach(link => {
        link.classList.remove('active');
      });
  
      this.tabContents.forEach(content => {
        content.classList.remove('active');
      });
  
      event.target.classList.add('active');
      const selectedContent = document.querySelector(`#${selectedTab}`);
      selectedContent.classList.add('active');
    }
  }
  