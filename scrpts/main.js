import initializeForm from "./form.js";
import recommendedPlant from "./recommendPlant.js";

// Inicializar el formulario
initializeForm();

// Obtener el botón "Customize"
const customizeButton = document.getElementById("customizeButton");

// Manejar el evento click del botón "Customize"
customizeButton.addEventListener("click", handleCustomize);

function handleCustomize() {
  const storedRecommendation = JSON.parse(localStorage.getItem("recommendation"));

  if (storedRecommendation) {
    const queryParams = new URLSearchParams(storedRecommendation);
    const customizeURL = `customize.html?${queryParams.toString()}`;
    redirectToCustomizePage(customizeURL);
  } else {
    alert("No plant recommendation found. Please fill out the form first.");
  }
}

function redirectToCustomizePage(url) {
  // Redireccionar al usuario a la página de customización (customize.html)
  window.location.href = url;
}
