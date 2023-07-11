document.addEventListener('DOMContentLoaded', init);

function init() {
  const favoritesTab = document.querySelector('.tab[data-tab="favorites"]');
  const interestedTab = document.querySelector('.tab[data-tab="interested"]');
  const goingTab = document.querySelector('.tab[data-tab="going"]');
  const favoritesContent = document.querySelector('.tab-content.favorites .events-container');
  const interestedContent = document.querySelector('.tab-content.interested .events-container');
  const goingContent = document.querySelector('.tab-content.going .events-container');

  if (favoritesTab) {
    favoritesTab.addEventListener('click', () => showEvents('favorites'));
  }
  if (interestedTab) {
    interestedTab.addEventListener('click', () => showEvents('interested'));
  }
  if (goingTab) {
    goingTab.addEventListener('click', () => showEvents('going'));
  }

  function showEvents(list) {

    hideAllTabContents();

    switch (list) {
      case 'favorites':
        if (favoritesTab) {
          favoritesTab.classList.add('active');
        }
        if (favoritesContent) {
          favoritesContent.style.display = 'block';
          loadEvents(favoritesContent, 'favorites');
        }
        break;
      case 'interested':
        if (interestedTab) {
          interestedTab.classList.add('active');
        }
        if (interestedContent) {
          interestedContent.style.display = 'block';
          loadEvents(interestedContent, 'interested');
        }
        break;
      case 'going':
        if (goingTab) {
          goingTab.classList.add('active');
        }
        if (goingContent) {
          goingContent.style.display = 'block';
          loadEvents(goingContent, 'going');
        }
        break;
    }
  }

  function hideAllTabContents() {
    if (favoritesTab) {
      favoritesTab.classList.remove('active');
    }
    if (interestedTab) {
      interestedTab.classList.remove('active');
    }
    if (goingTab) {
      goingTab.classList.remove('active');
    }
    if (favoritesContent) {
      favoritesContent.style.display = 'none';
    }
    if (interestedContent) {
      interestedContent.style.display = 'none';
    }
    if (goingContent) {
      goingContent.style.display = 'none';
    }
  }

  function loadEvents(container, list) {
    const state = Estado.getInstance();
    const events = state.getEventsByList(list);

    if (container && events.length > 0) {
      container.innerHTML = '';
      events.forEach(event => {
        const eventElement = createEventElement(event);
        container.appendChild(eventElement);
      });
    } else if (container) {
      container.innerHTML = 'There are no events in your ' + list;
    }
  }


  function createEventElement(event) {
    // ...

    return eventElement;
  }
  function openTab(event, tabName) {

    const tabContents = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabContents.length; i++) {
      tabContents[i].style.display = "none";
    }
  

    const tabLinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tabLinks.length; i++) {
      tabLinks[i].classList.remove("active");
    }
  

    const selectedTab = document.getElementById(tabName);
    selectedTab.style.display = "block";
  
 
    event.currentTarget.classList.add("active");
  }
  
}
