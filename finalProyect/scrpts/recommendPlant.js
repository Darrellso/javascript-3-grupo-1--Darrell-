//recoment
export default function displayRecommendation(recommendation, plantContainer) {
  // Clear the previous content
  plantContainer.innerHTML = "";

  // Create and append the pot image
  const imgPot = document.createElement("img");
  imgPot.src = `../assets/images/pot-${recommendation.pot.replace(" pot", "")}.png`;
  plantContainer.appendChild(imgPot);

  // Create and append the plant image
  const imgPlant = document.createElement("img");
  imgPlant.src = `../assets/images/plant-${recommendation.name}.png`;
  plantContainer.appendChild(imgPlant);

  // Create and append the soil image
  const imgSoil = document.createElement("img");
  imgSoil.src = `../assets/images/soil-${recommendation.soil.replace(" Soil", "")}.png`;
  plantContainer.appendChild(imgSoil);

  // Create the recommendation info container
  const recommendationInfo = document.createElement("div");
  recommendationInfo.classList.add("recommendation-info");

  // Create and append the plant title
  const plantTitle = document.createElement("h3");
  plantTitle.classList.add("plant-created-title");
  plantTitle.textContent = `The perfect plant for you is... ${recommendation.name}`;
  recommendationInfo.appendChild(plantTitle);

  // Create the result container
  const resultContainer = document.createElement("div");
  resultContainer.classList.add("result-container");

  // Create the left column for the result text
  const resultTextLeft = document.createElement("div");
  resultTextLeft.classList.add("result-text-left");

  const textLabels = ["Name", "Soil", "Pot", "Extras"];
  textLabels.forEach((label) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = label;
    resultTextLeft.appendChild(paragraph);
  });

  // Create the right column for the result text
  const resultTextRight = document.createElement("div");
  resultTextRight.classList.add("result-text-right");

  const textValues = [recommendation.name, recommendation.soil, recommendation.pot, recommendation.extras.join(", ")];
  textValues.forEach((value) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = value;
    resultTextRight.appendChild(paragraph);
  });

  // Append the left and right columns to the result container
  resultContainer.appendChild(resultTextLeft);
  resultContainer.appendChild(resultTextRight);

  // Create and append the "Customize" button
  const customizeButton = document.createElement("button");
  customizeButton.id = "customizeButton";
  customizeButton.classList.add("customize-button");
  customizeButton.textContent = "Customize";
  recommendationInfo.appendChild(customizeButton);

  // Append the recommendation info container to the plant container
  plantContainer.appendChild(recommendationInfo);

  // Handle the click event of the "Customize" button
  customizeButton.addEventListener("click", () => {
    // Redirect the user to the customization page
    window.location.href = "customize.html";
  });

  // Display the plant recommendation
  plantContainer.style.display = "block";
}
