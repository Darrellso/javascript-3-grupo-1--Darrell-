//Builder.js
export default class PlantBuilder {
  constructor() {
    this.attributes = {
      name: "",
      soil: "",
      pot: "",
      potMaterial: "",
      potStyle: "",
      extras: [],
      plantImage: "",
    };
  }

  withAttribute(attribute, value) {
    this.attributes[attribute] = value;
    return this;
  }

  withPlantImage(plantImage) {
    return this.withAttribute("plantImage", plantImage);
  }

  withName(name) {
    return this.withAttribute("name", capitalize(name));
  }

  withSoil(soil) {
    return this.withAttribute("soil", soil);
  }

  withPot(pot) {
    return this.withAttribute("pot", pot);
  }

  withPotMaterial(potMaterial) {
    return this.withAttribute("potMaterial", potMaterial);
  }

  withPotStyle(potStyle) {
    return this.withAttribute("potStyle", potStyle);
  }

  withExtras(extras) {
    return this.withAttribute("extras", extras);
  }

  build() {
    return { ...this.attributes };
  }
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
