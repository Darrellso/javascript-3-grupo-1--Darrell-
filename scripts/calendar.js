var favoriteEvents = [];
var interestedEvents = [];
var goingEvents = [];


var currentMonth;
var currentYear;
s
function getMonthName(month) {
  var monthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];
  return monthNames[month];
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}


function getFirstDayOfWeek(year, month) {
  return new Date(year, month, 1).getDay();
}

function loadEventsForMonth(year, month) {

    favoriteEvents = getFavoriteEvents(year, month);
    interestedEvents = getInterestedEvents(year, month);
    goingEvents = getGoingEvents(year, month);

    renderCalendar(year, month);
  }
  
  function getFavoriteEvents(year, month) {

    var favoriteEvents = [
      { title: "Favorite Event 1", date: "2023-07-01", location: "Location 1" },
      { title: "Favorite Event 2", date: "2023-07-05", location: "Location 2" },
      { title: "Favorite Event 3", date: "2023-07-10", location: "Location 3" },
      // ...
    ];
  
    return favoriteEvents;
  }
  
  
  function getInterestedEvents(year, month) {

    var interestedEvents = [
      { title: "Interested Event 1", date: "2023-07-02", location: "Location 4" },
      { title: "Interested Event 2", date: "2023-07-06", location: "Location 5" },
      { title: "Interested Event 3", date: "2023-07-11", location: "Location 6" },
      // ...
    ];
  
    return interestedEvents;
  }
  
  
  function getGoingEvents(year, month) {

    var goingEvents = [
      { title: "Going Event 1", date: "2023-07-03", location: "Location 7" },
      { title: "Going Event 2", date: "2023-07-09", location: "Location 8" },
      { title: "Going Event 3", date: "2023-07-15", location: "Location 9" },
      // ...
    ];
  
    return goingEvents;
  }
  
  


function renderCalendar(year, month) {
  var calendarContainer = document.getElementById("calendar-container");
  var calendarTitle = document.getElementById("calendar-title");
  var calendarGrid = document.createElement("div");


  calendarContainer.innerHTML = "";
  calendarGrid.innerHTML = "";


  calendarTitle.textContent = getMonthName(month) + " " + year;


  var previousButton = document.createElement("button");
  previousButton.textContent = "Previous Month";
  previousButton.onclick = function() {
    previousMonth();
  };
  var nextButton = document.createElement("button");
  nextButton.textContent = "Next Month";
  nextButton.onclick = function() {
    nextMonth();
  };


  calendarContainer.appendChild(previousButton);
  calendarContainer.appendChild(nextButton);

  calendarContainer.appendChild(calendarGrid);


  var daysInMonth = getDaysInMonth(year, month);
  var firstDayOfWeek = getFirstDayOfWeek(year, month);


  var dayOfWeekLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


  for (var i = 0; i < 7; i++) {
    var dayLabel = document.createElement("div");
    dayLabel.textContent = dayOfWeekLabels[i];
    calendarGrid.appendChild(dayLabel);
  }


  for (var i = 0; i < firstDayOfWeek; i++) {
    var emptyDay = document.createElement("div");
    calendarGrid.appendChild(emptyDay);
  }


  for (var i = 1; i <= daysInMonth; i++) {
    var day = document.createElement("div");
    day.textContent = i;


    day.onclick = function() {
      showEventCard(this);
    };


    var event = getEventForDay(year, month, i);
    if (event) {
      day.classList.add("event");
      day.classList.add(event.color);
    }

    calendarGrid.appendChild(day);
  }


  calendarContainer.style.display = "block";
}

function getEventForDay(year, month, day) {
    // Obtener la fecha en formato "YYYY-MM-DD"
    var date = year + "-" + (month + 1).toString().padStart(2, "0") + "-" + day.toString().padStart(2, "0");
  
    // Buscar el evento en los diferentes tipos de eventos
    var event = favoriteEvents.find(function(e) {
      return e.date === date;
    });
  
    if (!event) {
      event = interestedEvents.find(function(e) {
        return e.date === date;
      });
    }
  
    if (!event) {
      event = goingEvents.find(function(e) {
        return e.date === date;
      });
    }
  
    return event;
  }
  


function showEventCard(dayElement) {

    var day = dayElement.textContent;

    var event = getEventForDay(currentYear, currentMonth, day);
  
    var eventCard = document.getElementById("event-card");
  

    eventCard.innerHTML = ""; 
  
    if (event) {

      var eventTitle = document.createElement("h4");
      eventTitle.textContent = event.title;
      var eventDate = document.createElement("p");
      eventDate.textContent = "Date: " + event.date;
      var eventLocation = document.createElement("p");
      eventLocation.textContent = "Location: " + event.location;
      var eventDescription = document.createElement("p");
      eventDescription.textContent = "Description: " + event.description;
  

      eventCard.appendChild(eventTitle);
      eventCard.appendChild(eventDate);
      eventCard.appendChild(eventLocation);
      eventCard.appendChild(eventDescription);
    } else {
  
      eventCard.textContent = "No event for this day.";
    }
  

    eventCard.style.display = "block";
    document.getElementById("overlay").style.display = "block";
  }


function closeEventCard() {

    var eventCard = document.getElementById("event-card");
    var overlay = document.getElementById("overlay");
  

    eventCard.style.display = "none";
    overlay.style.display = "none";
  }
  


function openTab(event, tabName) {

  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }
  document.getElementById(tabName).style.display = "block";
  event.currentTarget.classList.add("active");

  if (tabName === "calendar") {
    loadEventsForMonth(currentYear, currentMonth);
  }
}


function previousMonth() {

    currentMonth--;
  

    if (currentMonth < 0) {
      currentMonth = 11; 
      currentYear--;
    }
  

    loadEventsForMonth(currentYear, currentMonth);
  }
  


function nextMonth() {
    
    currentMonth++;
  

    if (currentMonth > 11) {
      currentMonth = 0; 
      currentYear++;
    }
  

    loadEventsForMonth(currentYear, currentMonth);
  }
  


var currentDate = new Date();
currentMonth = currentDate.getMonth();
currentYear = currentDate.getFullYear();
loadEventsForMonth(currentYear, currentMonth);
