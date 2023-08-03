import recommendedPlant from "./recommendPlant.js";

class CustomizeForm {
  constructor() {
    this.errorContainer = document.getElementById("error-container");
    this.customizeForm = document.getElementById("customizeForm");
    this.plantPreviewImage = document.getElementById("plantPreviewImage");
    this.previewPlantName = document.getElementById("previewPlantName");
    this.previewSoil = document.getElementById("previewSoil");
    this.previewPot = document.getElementById("previewPot");
    this.previewPotColor = document.getElementById("previewPotColor");
    this.previewExtras = document.getElementById("previewExtras");
    this.checkAvailabilityButton = document.getElementById("checkAvailabilityButton");

    this.loadStoredRecommendation();
    this.addFormSubmitListener();
    this.addFormChangeListener();
    this.addCheckAvailabilityButtonListener();
  }

  showError(message) {
    this.errorContainer.textContent = message;
    this.errorContainer.style.display = "block";
  }

  hideError() {
    this.errorContainer.style.display = "none";
  }

  loadStoredRecommendation() {
    const storedRecommendation = JSON.parse(localStorage.getItem("recommendation"));
    if (storedRecommendation) {
      this.loadPreviewData(storedRecommendation);
    }
  }

  loadPreviewData(data) {
    this.previewPlantName.textContent = data.name;
    this.previewSoil.textContent = data.soil;
    this.previewPot.textContent = data.pot;
    this.previewPotColor.textContent = data.potColor;
    this.previewExtras.textContent = Array.isArray(data.extras) ? data.extras.join(", ") : "";

    this.loadPreviewImages(data);
  }

  loadPreviewImages(data) {
    this.plantPreviewImage.innerHTML = "";

    const potImage = this.createImage(`../assets/images/pot-${data.pot.replace(" pot", "")}.png`);
    const plantImage = this.createImage(`../assets/images/${data.plantImage}.png`);
    const soilImage = this.createImage(`../assets/images/soil-${data.soil.replace(" Soil", "")}.png`);

    this.plantPreviewImage.appendChild(potImage);
    this.plantPreviewImage.appendChild(plantImage);
    this.plantPreviewImage.appendChild(soilImage);

    data.extras.forEach((extra) => {
      const extraImage = this.createImage(`../assets/images/${extra}.png`);
      this.plantPreviewImage.appendChild(extraImage);
    });
  }

  createImage(src) {
    const img = document.createElement("img");
    img.src = src;
    return img;
  }

  addFormSubmitListener() {
    this.customizeForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.hideError();

      const formData = new FormData(this.customizeForm);

      const place = formData.get("place");
      const sunlight = formData.get("sunlight");
      const pets = formData.get("pets");
      const water = formData.get("water");
      const style = formData.get("style");
      const extras = formData.getAll("extras");

      if (place && sunlight && pets && water && style) {
        const recommendation = {
          name: "",
          soil: "",
          pot: "",
          potColor: "",
          potMaterial: "",
          potStyle: "",
          extras,
        };

        switch (place) {
          case "inside_indirect":
            recommendation.name = "Sansevieria";
            recommendation.plantImage = "plant-sansevieria";
            break;
          case "inside_lot":
            recommendation.name = "Aglaonema";
            recommendation.plantImage = "plant-aglaonema";
            break;
          case "outside":
            recommendation.name = "Aloe Vera";
            recommendation.plantImage = "plant-aloe";
            break;
          default:
            break;
        }

        recommendation.soil = sunlight === "yes" ? "Composted Soil" : "Fertilized Soil";
        recommendation.pot = pets === "yes" ? "Ceramic pot" : "Clay pot";

        if (pets === "yes") {
          recommendation.potStyle = "Substitute the soil for the easy drainage soil";
        }

        recommendation.potMaterial = water === "overwater" ? "Clay pot" : "Ceramic pot";

        switch (style) {
          case "minimalism":
            recommendation.potStyle = "Simple pot";
            break;
          case "decoration":
            recommendation.potStyle = "Simple pot decorated";
            break;
          case "bright_colors":
            recommendation.potStyle = "Painted pot decorated";
            break;
          default:
            break;
        }

        const plantSelect = formData.get("plant");
        recommendation.plantImage = `plant-${plantSelect.toLowerCase().replace(" ", "-")}`;

        const potColor = formData.get("potColor");
        recommendation.potColor = potColor || "No color";

        recommendedPlant(recommendation, document.getElementById("plant-preview"));
        this.loadPreviewData(recommendation);
        localStorage.setItem("recommendation", JSON.stringify(recommendation));
      } else {
        this.showError("Please check all boxes");
      }
    });
  }

  addFormChangeListener() {
    this.customizeForm.addEventListener("change", () => {
      this.hideError();
    });
  }

  addCheckAvailabilityButtonListener() {
    this.checkAvailabilityButton.addEventListener("click", () => {
      // Redirigir al usuario a la vista del producto
      window.location.href = "productView.html";
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new CustomizeForm();
});
