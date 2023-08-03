import recommendedPlant from "./recommendPlant.js";

class ProductView {
  constructor() {
    this.productContainer = document.getElementById("productContainer");
    this.loadProductData();
  }

  loadProductData() {
    const storedRecommendation = JSON.parse(localStorage.getItem("recommendation"));
    if (storedRecommendation) {
      this.displayProductData(storedRecommendation);
      this.addBackToCustomizationButton();
    } else {
      this.displayErrorMessage("No plant recommendation found. Please customize a plant first.");
    }
  }

  displayProductData(data) {
    this.productContainer.innerHTML = "";

    // Create and append the title
    const title = document.createElement("h2");
    title.textContent = "Order Preview";
    this.productContainer.appendChild(title);

    // Create and append the plant image
    const plantImage = this.createImage(`../assets/images/${data.plantImage}.png`);
    this.productContainer.appendChild(plantImage);

    // Create and append the order information
    const orderInfo = document.createElement("div");
    orderInfo.classList.add("order-info");

    // Name
    const name = document.createElement("p");
    name.textContent = `Name: ${capitalize(data.name)}`;
    orderInfo.appendChild(name);

    // Soil
    const soil = document.createElement("p");
    soil.textContent = `Soil: ${data.soil}`;
    orderInfo.appendChild(soil);

    // Pot
    const pot = document.createElement("p");
    pot.textContent = `Pot: ${data.pot} ${data.potStyle ? `(${data.potStyle})` : ''}`;
    orderInfo.appendChild(pot);

    // Pot Color
    const potColor = document.createElement("p");
    potColor.textContent = `Color: ${data.potColor}`;
    orderInfo.appendChild(potColor);

    // Extras
    const extras = document.createElement("p");
    extras.textContent = `Extras: ${data.extras.join(", ")}`;
    orderInfo.appendChild(extras);

    // Price (Assuming you have a price variable or method to calculate the price)
    const price = document.createElement("p");
    price.textContent = `Price: $${calculatePrice(data)}`;
    orderInfo.appendChild(price);

    // General inventory alert
    const inventoryAlert = document.createElement("p");
    inventoryAlert.textContent = "Alert: Limited stock available!";
    orderInfo.appendChild(inventoryAlert);

    this.productContainer.appendChild(orderInfo);
  }

  createImage(src) {
    const img = document.createElement("img");
    img.src = src;
    return img;
  }

  displayErrorMessage(message) {
    const error = document.createElement("p");
    error.textContent = message;
    this.productContainer.appendChild(error);
  }

  addBackToCustomizationButton() {
    const backButton = document.createElement("button");
    backButton.textContent = "Back to customization";
    backButton.addEventListener("click", () => {
      // Redirect the user back to the customization view
      window.location.href = "customize.html";
    });
    this.productContainer.appendChild(backButton);
  }
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function calculatePrice(data) {
// Assuming you have a fixed price for each component
const componentPrices = {
  plant: 30,
  ceramicPot: 20,
  clayPot: 15,
  drainageSoil: 10,
  compostedSoil: 12,
  fertilizedSoil: 14,
  mossPole: 5,
  miniPlants: 8,
  pebbles: 3,
};

function calculatePrice(data) {
  let totalPrice = 0;

  // Calculate the price for the selected plant
  totalPrice += componentPrices.plant;

  // Calculate the price for the selected pot
  totalPrice += data.pot === "Ceramic pot" ? componentPrices.ceramicPot : componentPrices.clayPot;

  // Calculate the price for the selected soil
  switch (data.soil) {
    case "Drainage Soil":
      totalPrice += componentPrices.drainageSoil;
      break;
    case "Composted Soil":
      totalPrice += componentPrices.compostedSoil;
      break;
    case "Fertilized Soil":
      totalPrice += componentPrices.fertilizedSoil;
      break;
    default:
      break;
  }

  // Calculate the price for each extra
  data.extras.forEach((extra) => {
    switch (extra) {
      case "moss pole":
        totalPrice += componentPrices.mossPole;
        break;
      case "mini plants":
        totalPrice += componentPrices.miniPlants;
        break;
      case "pebbles":
        totalPrice += componentPrices.pebbles;
        break;
      default:
        break;
    }
  });

  return totalPrice;
}

  return 50;
}

document.addEventListener("DOMContentLoaded", () => {
  new ProductView();
});
