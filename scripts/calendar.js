// Variables para los eventos del calendario
var favoriteEvents = [];
var interestedEvents = [];
var goingEvents = [];

// Variables para el calendario
var currentMonth;
var currentYear;

// Función para obtener el nombre del mes
function getMonthName(month) {
  var monthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];
  return monthNames[month];
}

// Función para obtener el número de días en un mes
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

// Función para obtener el primer día de la semana de un mes
function getFirstDayOfWeek(year, month) {
  return new Date(year, month, 1).getDay();
}

// Función para cargar los eventos del mes correspondiente
function loadEventsForMonth(year, month) {
    // Obtener los eventos correspondientes al año y mes seleccionados
    favoriteEvents = getFavoriteEvents(year, month);
    interestedEvents = getInterestedEvents(year, month);
    goingEvents = getGoingEvents(year, month);
  
    // Llamada a la función para renderizar el calendario
    renderCalendar(year, month);
  }
  
  function getFavoriteEvents(year, month) {
    // Lógica para obtener los eventos favoritos del mes y año seleccionados
    // Aquí puedes utilizar una base de datos, una API u otra fuente de datos para obtener los eventos
  
    // Ejemplo de retorno de eventos favoritos (array de eventos)
    var favoriteEvents = [
      { title: "Favorite Event 1", date: "2023-07-01", location: "Location 1" },
      { title: "Favorite Event 2", date: "2023-07-05", location: "Location 2" },
      { title: "Favorite Event 3", date: "2023-07-10", location: "Location 3" },
      // ...
    ];
  
    return favoriteEvents;
  }
  
  
  function getInterestedEvents(year, month) {
    // Lógica para obtener los eventos interesados del mes y año seleccionados
    // Aquí puedes utilizar una base de datos, una API u otra fuente de datos para obtener los eventos
  
    // Ejemplo de retorno de eventos interesados (array de eventos)
    var interestedEvents = [
      { title: "Interested Event 1", date: "2023-07-02", location: "Location 4" },
      { title: "Interested Event 2", date: "2023-07-06", location: "Location 5" },
      { title: "Interested Event 3", date: "2023-07-11", location: "Location 6" },
      // ...
    ];
  
    return interestedEvents;
  }
  
  
  function getGoingEvents(year, month) {
    // Lógica para obtener los eventos a los que se asistirá del mes y año seleccionados
    // Aquí puedes utilizar una base de datos, una API u otra fuente de datos para obtener los eventos
  
    // Ejemplo de retorno de eventos a los que se asistirá (array de eventos)
    var goingEvents = [
      { title: "Going Event 1", date: "2023-07-03", location: "Location 7" },
      { title: "Going Event 2", date: "2023-07-09", location: "Location 8" },
      { title: "Going Event 3", date: "2023-07-15", location: "Location 9" },
      // ...
    ];
  
    return goingEvents;
  }
  
  

// Función para renderizar el calendario
function renderCalendar(year, month) {
  var calendarContainer = document.getElementById("calendar-container");
  var calendarTitle = document.getElementById("calendar-title");
  var calendarGrid = document.createElement("div");

  // Limpiar el contenido anterior del calendario
  calendarContainer.innerHTML = "";
  calendarGrid.innerHTML = "";

  // Establecer el título del mes y año
  calendarTitle.textContent = getMonthName(month) + " " + year;

  // Crear los botones de navegación
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

  // Agregar los botones de navegación al contenedor del calendario
  calendarContainer.appendChild(previousButton);
  calendarContainer.appendChild(nextButton);

  // Agregar el calendario al contenedor
  calendarContainer.appendChild(calendarGrid);

  // Obtener el número de días y el primer día de la semana del mes
  var daysInMonth = getDaysInMonth(year, month);
  var firstDayOfWeek = getFirstDayOfWeek(year, month);

  // Lógica para crear los elementos del calendario
  var dayOfWeekLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Crear los elementos de los días de la semana
  for (var i = 0; i < 7; i++) {
    var dayLabel = document.createElement("div");
    dayLabel.textContent = dayOfWeekLabels[i];
    calendarGrid.appendChild(dayLabel);
  }

  // Agregar los espacios en blanco para el primer día de la semana
  for (var i = 0; i < firstDayOfWeek; i++) {
    var emptyDay = document.createElement("div");
    calendarGrid.appendChild(emptyDay);
  }

  // Crear los elementos para los días del mes
  for (var i = 1; i <= daysInMonth; i++) {
    var day = document.createElement("div");
    day.textContent = i;

    // Agregar el evento onclick para mostrar el card del evento
    day.onclick = function() {
      showEventCard(this);
    };

    // Agregar clases para el estilo y el color del evento
    var event = getEventForDay(year, month, i);
    if (event) {
      day.classList.add("event");
      day.classList.add(event.color);
    }

    calendarGrid.appendChild(day);
  }

  // Mostrar el contenedor del calendario
  calendarContainer.style.display = "block";
}

// Función para obtener el evento correspondiente a un día del mes
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
  
    return event; // Devolver el evento encontrado o null si no hay evento para el día
  }
  

// Función para mostrar el card del evento
// Función para mostrar el card del evento
function showEventCard(dayElement) {
    // Obtener el día seleccionado
    var day = dayElement.textContent;
  
    // Obtener el evento correspondiente al día seleccionado
    var event = getEventForDay(currentYear, currentMonth, day);
  
    // Obtener el elemento del card del evento
    var eventCard = document.getElementById("event-card");
  
    // Mostrar el card del evento
    eventCard.innerHTML = ""; // Limpiar el contenido anterior del card
  
    if (event) {
      // Crear los elementos para mostrar la información del evento
      var eventTitle = document.createElement("h4");
      eventTitle.textContent = event.title;
      var eventDate = document.createElement("p");
      eventDate.textContent = "Date: " + event.date;
      var eventLocation = document.createElement("p");
      eventLocation.textContent = "Location: " + event.location;
      var eventDescription = document.createElement("p");
      eventDescription.textContent = "Description: " + event.description;
  
      // Agregar los elementos al card del evento
      eventCard.appendChild(eventTitle);
      eventCard.appendChild(eventDate);
      eventCard.appendChild(eventLocation);
      eventCard.appendChild(eventDescription);
    } else {
      // Mostrar un mensaje si no hay evento para el día seleccionado
      eventCard.textContent = "No event for this day.";
    }
  
    // Mostrar el card del evento y el overlay
    eventCard.style.display = "block";
    document.getElementById("overlay").style.display = "block";
  }

// Función para ocultar el card del evento y el overlay
// Función para cerrar el card del evento y ocultar el overlay
function closeEventCard() {
    // Obtener el elemento del card del evento y el overlay
    var eventCard = document.getElementById("event-card");
    var overlay = document.getElementById("overlay");
  
    // Ocultar el card del evento y el overlay
    eventCard.style.display = "none";
    overlay.style.display = "none";
  }
  

// Función para mostrar la pestaña correspondiente al evento
function openTab(event, tabName) {
  // Lógica para mostrar la pestaña correspondiente y ocultar las demás
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

// Función para mostrar el mes anterior
// Función para mostrar el mes anterior y cargar los eventos correspondientes
function previousMonth() {
    // Restar 1 al mes actual
    currentMonth--;
  
    // Verificar si se debe retroceder al año anterior
    if (currentMonth < 0) {
      currentMonth = 11; // Establecer el mes a diciembre
      currentYear--; // Retroceder al año anterior
    }
  
    // Cargar los eventos del mes anterior
    loadEventsForMonth(currentYear, currentMonth);
  }
  

// Función para mostrar el mes siguiente y cargar los eventos correspondientes
function nextMonth() {
    // Sumar 1 al mes actual
    currentMonth++;
  
    // Verificar si se debe avanzar al siguiente año
    if (currentMonth > 11) {
      currentMonth = 0; // Establecer el mes a enero
      currentYear++; // Avanzar al siguiente año
    }
  
    // Cargar los eventos del mes siguiente
    loadEventsForMonth(currentYear, currentMonth);
  }
  

// Cargar los eventos del mes actual al cargar la página
var currentDate = new Date();
currentMonth = currentDate.getMonth();
currentYear = currentDate.getFullYear();
loadEventsForMonth(currentYear, currentMonth);
