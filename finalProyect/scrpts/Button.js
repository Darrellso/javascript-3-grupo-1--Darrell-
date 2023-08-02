// clearButton.js
export default function handleClearButton(form, plantContainer) {
  const clearButton = document.getElementById("clearButton");

  clearButton.addEventListener("click", clearForm);

  function clearForm() {
    form.reset();
    clearPlantContainer();
    removeRecommendationFromLocalStorage();
  }

  function clearPlantContainer() {
    plantContainer.innerHTML = "";
    plantContainer.style.display = "none";
  }

  function removeRecommendationFromLocalStorage() {
    localStorage.removeItem("recommendation");
  }
}
