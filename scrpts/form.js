import PlantBuilder from "./builder.js";
import recomendedPlant from "./recommendPlant.js";
import handleClearButton from "./Button.js";

export default function initializeForm() {
  const form = document.getElementById("form");
  const plantContainer = document.getElementById("recommendation");

  form.addEventListener("submit", handleFormSubmit);

  function handleFormSubmit(event) {
    event.preventDefault();

    const place = getSelectedValue('input[name="place"]');
    const sunlight = getSelectedValue('input[name="sunlight"]');
    const pets = getSelectedValue('input[name="pets"]');
    const water = getSelectedValue('input[name="water"]');
    const style = getSelectedValue('input[name="style"]');
    const extras = getCheckedValues('input[name="extras"]');

    if (place && sunlight && pets && water && style) {
      const builder = new PlantBuilder();

      const plantData = getPlantData(place);
      builder.withName(plantData.name).withPlantImage(plantData.image);

      builder.withSoil(sunlight === "yes" ? "Composted Soil" : "Fertilized Soil");

      if (pets === "yes") {
        builder.withPot("Ceramic pot");
        builder.withPotStyle("Substitute the soil for the easy drainage soil");
      } else {
        builder.withPot("Ceramic pot");
      }

      builder.withPotMaterial(water === "overwater" ? "Clay pot" : "Ceramic pot");

      builder.withPotStyle(getPotStyle(style));

      builder.withExtras(extras);

      const recommendation = builder.build();

      recomendedPlant(recommendation, plantContainer);

      // Guardar la recomendación en el localStorage
      localStorage.setItem("recommendation", JSON.stringify(recommendation));
    } else {
      // eslint-disable-next-line no-alert
      alert("Please check all boxes");
    }
  }

  function getSelectedValue(selector) {
    const selectedInput = document.querySelector(selector);
    return selectedInput ? selectedInput.value : null;
  }

  function getCheckedValues(selector) {
    const checkedInputs = Array.from(document.querySelectorAll(selector))
      .filter((input) => input.checked);
    return checkedInputs.map((input) => input.value);
  }

  function getPlantData(place) {
    const plantData = {
      inside_indirect: { name: "Sansevieria", image: "plant-sansevieria" },
      inside_lot: { name: "Aglaonema", image: "plant-aglaonema" },
      outside: { name: "Aloe", image: "plant-aloe" }
    };
    return plantData[place] || { name: "", image: "" };
  }

  function getPotStyle(style) {
    const potStyles = {
      minimalism: "Simple pot",
      decoration: "Simple pot decorated",
      bright_colors: "Painted pot decorated"
    };
    return potStyles[style] || "";
  }

  // Recuperar la recomendación guardada en LocalStorage al cargar la página
  const storedRecommendation = JSON.parse(localStorage.getItem("recommendation"));
  if (storedRecommendation) {
    recomendedPlant(storedRecommendation, plantContainer);
  }

  handleClearButton(form, plantContainer);
}
