import recommendedPlant from "./recommendPlant.js";

// Definir los middlewares
const middlewares = [
  obtenerRecomendacion,
  calcularPrecio,
  verificarInventario,
  obtenerDescripcionPlanta,
  obtenerConsejosCuidado,
  mostrarResumenOrden,
];


// Función para obtener la cantidad de inventario de un elemento
async function obtenerInventario(productType, itemId) {
  const url = `https://qfble0gquj.execute-api.us-east-2.amazonaws.com/plant-store/inventory/${productType}/${itemId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.quantity;
}

// Función para obtener la información de una planta
async function obtenerInformacionPlanta(plantId) {
  const url = `https://qfble0gquj.execute-api.us-east-2.amazonaws.com/plant-store/info/${plantId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Función para calcular el precio de la orden
function calcularPrecio(orderData) {
  const precios = {
    "Aglaonema Silver Bay": 12.99,
    "Aloe Vera": 5.25,
    "Boston Fern": 10.25,
    "Cactus": 8.25,
    "Monstera Deliciosa": 18.00,
    "Peace Lily": 8.75,
    "Sansevieria": 5.75,
    "Clay pot simple": 3.00,
    "Clay pot decorated": 4.00,
    "Clay pot painted": 4.00,
    "Clay pot painted and decorated": 5.00,
    "Ceramic pot simple": 5.00,
    "Ceramic pot decorated": 6.00,
    "Ceramic pot painted": 6.00,
    "Ceramic pot painted and decorated": 7.00,
    "Soil composted": 3.25,
    "Soil fertilized": 5.00,
    "Soil easy drainage": 5.50,
    "Moss Pole": 2.25,
    "Pebbles": 2.00,
    "Mini plants": 3.75,
  };

  let precioPlant = precios[orderData.name];
  let precioSoil = precios[orderData.soil];
  let precioPot = precios[orderData.pot];
  let precioExtras = orderData.extras.reduce((total, extra) => total + precios[extra], 0);

  const precioTotal = precioPlant + precioSoil + precioPot + precioExtras;

  // Actualizar los valores en la tabla HTML
  document.getElementById("plant-price").textContent = `$${precioPlant}`;
  document.getElementById("soil-price").textContent = `$${precioSoil}`;
  document.getElementById("pot-price").textContent = `$${precioPot}`;
  document.getElementById("extras-price").textContent = `$${precioExtras}`;
  document.getElementById("total-price").textContent = `$${precioTotal}`;

  return precioTotal;
}

// Función para verificar el inventario y mostrar las alertas adecuadas
async function verificarInventario(orderData) {
  const inventarioSuficiente = true; // Asumimos que todos los elementos tienen suficiente inventario

  let tieneInventarioSuficiente = true;
  let tieneInventarioLimitado = false;

  for (const extra of orderData.extras) {
    // Asumimos que cada extra tiene 8 items en stock (por fines de demostración)
    const stockDisponible = 8;

    if (extra === "moss_pole" && stockDisponible === 0) {
      tieneInventarioSuficiente = false;
    } else if (extra === "moss_pole" && stockDisponible < 10) {
      tieneInventarioLimitado = true;
    }
  }

  const mensajeInventario = document.getElementById("alerta-inventario");

  if (!tieneInventarioSuficiente && !tieneInventarioLimitado) {
    mensajeInventario.textContent = "Lo sentimos, el artículo seleccionado está agotado.";
    mensajeInventario.style.color = "red";
  } else if (!tieneInventarioSuficiente && tieneInventarioLimitado) {
    mensajeInventario.textContent = "One of the items in your order is out of stock. Please select a different item.";
    mensajeInventario.style.color = "red";
  } else if (tieneInventarioLimitado) {
    mensajeInventario.textContent = "One of the items in your order has limited stock. Order soon!";
    mensajeInventario.style.color = "yellow";
  } else {
    mensajeInventario.textContent = "En Stock";
    mensajeInventario.style.color = "green";
  }

  return {
    tieneInventarioSuficiente,
    tieneInventarioLimitado,
  };
}

// Función para obtener la descripción de la planta desde el API y mostrarla
async function obtenerDescripcionPlanta(orderData) {
  const plantId = orderData.name.toLowerCase();
  const plantInfo = await obtenerInformacionPlanta(plantId);
  const descripcionPlanta = plantInfo.description;

  const descripcionParrafo = document.createElement("p");
  descripcionParrafo.textContent = descripcionPlanta;
  document.getElementById("plant-description").appendChild(descripcionParrafo);
}

// Función para obtener los consejos de cuidado desde el API y mostrarlos
async function obtenerConsejosCuidado(orderData) {
  const plantId = orderData.name.toLowerCase();
  const plantInfo = await obtenerInformacionPlanta(plantId);
  const consejosCuidado = plantInfo.care;

  document.getElementById("light").textContent = consejosCuidado.light;
  document.getElementById("water").textContent = consejosCuidado.water;
  document.getElementById("humidity").textContent = consejosCuidado.humidity;
  document.getElementById("temperature").textContent = consejosCuidado.temperature;
}

// Evento "DOMContentLoaded"
document.addEventListener("DOMContentLoaded", async () => {
  // Controlador para los accordions
  // .../ Controladores para los accordions
const accordionPrice = document.getElementById("accordion-price");
const accordionInventory = document.getElementById("accordion-inventory");
const accordionPlantDescription = document.getElementById("accordion-plant-description");
const accordionCaringTips = document.getElementById("accordion-caring-tips");

// Paneles de los accordions
const panelPrice = document.getElementById("panel-price");
const panelInventory = document.getElementById("panel-inventory");
const panelPlantDescription = document.getElementById("panel-plant-description");
const panelCaringTips = document.getElementById("panel-caring-tips");

// Event listeners para los accordions
accordionPrice.addEventListener("click", () => {
  panelPrice.style.display = panelPrice.style.display === "block" ? "none" : "block";
  panelInventory.style.display = "none";
  panelPlantDescription.style.display = "none";
  panelCaringTips.style.display = "none";
});

accordionInventory.addEventListener("click", () => {
  panelInventory.style.display = panelInventory.style.display === "block" ? "none" : "block";
  panelPrice.style.display = "none";
  panelPlantDescription.style.display = "none";
  panelCaringTips.style.display = "none";
});

accordionPlantDescription.addEventListener("click", () => {
  panelPlantDescription.style.display = panelPlantDescription.style.display === "block" ? "none" : "block";
  panelPrice.style.display = "none";
  panelInventory.style.display = "none";
  panelCaringTips.style.display = "none";
});

accordionCaringTips.addEventListener("click", () => {
  panelCaringTips.style.display = panelCaringTips.style.display === "block" ? "none" : "block";
  panelPrice.style.display = "none";
  panelInventory.style.display = "none";
  panelPlantDescription.style.display = "none";
});

  const recomendacionGuardada = JSON.parse(localStorage.getItem("recommendation"));

  if (recomendacionGuardada) {
// Mostrar resumen de la orden y desglose de precio
document.addEventListener("DOMContentLoaded", async () => {
  const recomendacionGuardada = JSON.parse(localStorage.getItem("recommendation"));

  if (recomendacionGuardada) {
    recommendedPlant(recomendacionGuardada, document.getElementById("vista-previa-planta"));

    // Obtener información de la planta desde el API
    try {
      const descripcionPlanta = await obtenerDescripcionPlanta(recomendacionGuardada);
      const consejosCuidado = await obtenerConsejosCuidado(recomendacionGuardada);

      // Mostrar la descripción de la planta en el accordion Plant description
      const plantDescriptionAccordion = document.getElementById("plant-description");
      const descripcionParrafo = document.createElement("p");
      descripcionParrafo.textContent = descripcionPlanta;
      plantDescriptionAccordion.appendChild(descripcionParrafo);

      // Mostrar los consejos de cuidado en el accordion Caring tips
      const lightElement = document.getElementById("light");
      const waterElement = document.getElementById("water");
      const humidityElement = document.getElementById("humidity");
      const temperatureElement = document.getElementById("temperature");

      lightElement.textContent = consejosCuidado.light;
      waterElement.textContent = consejosCuidado.water;
      humidityElement.textContent = consejosCuidado.humidity;
      temperatureElement.textContent = consejosCuidado.temperature;

      // Calcular y mostrar el desglose de precio
      const precio = calcularPrecio(recomendacionGuardada);
      document.getElementById("precio").textContent = `$${precio}`;

      // Verificar el inventario y mostrar las alertas correspondientes
      const { tieneInventarioSuficiente, tieneInventarioLimitado } = verificarInventario(recomendacionGuardada);
      const mensajeInventario = document.getElementById("alerta-inventario");

      if (tieneInventarioLimitado) {
        mensajeInventario.textContent = "One of the items in your order has limited stock. Order soon!";
        mensajeInventario.style.color = "yellow";
      } else if (!tieneInventarioSuficiente) {
        mensajeInventario.textContent = "One of the items in your order is out of stock. Please check the inventory alerts.";
        mensajeInventario.style.color = "red";
      } else {
        mensajeInventario.textContent = "In Stock";
        mensajeInventario.style.color = "green";
      }

      // Habilitar o deshabilitar el botón "Order now!" según el inventario
      const orderNowButton = document.getElementById("order-now-button");
      orderNowButton.disabled = !tieneInventarioSuficiente;

    } catch (error) {
      console.error("Error al obtener la información de la planta o los consejos de cuidado:", error);
    }

    // Resto del código...
  } else {
    alert("No se encontró ninguna recomendación de planta. Por favor personaliza tu planta primero.");
    window.location.href = "customize.html";
  }
});


    // Verificar inventario y mostrar alertas
    const tieneInventarioSuficiente = await verificarInventario(recomendacionGuardada);
    // ...

    // Obtener descripción de la planta y consejos de cuidado
    await obtenerDescripcionPlanta(recomendacionGuardada);
    await obtenerConsejosCuidado(recomendacionGuardada);
    // ...

// Botón "Order now!"
const orderNowButton = document.getElementById("order-now-button");

orderNowButton.addEventListener("click", async () => {
  const recomendacionGuardada = JSON.parse(localStorage.getItem("recommendation"));

  if (recomendacionGuardada) {
    // Verificar el inventario nuevamente antes de hacer el pedido
    const { tieneInventarioSuficiente, tieneInventarioLimitado } = verificarInventario(recomendacionGuardada);

    if (!tieneInventarioSuficiente) {
      // Si alguno de los elementos está agotado, mostrar un mensaje de error
      alert("One of the items in your order is out of stock. Please check the inventory alerts before placing the order.");
    } else if (tieneInventarioLimitado) {
      // Si alguno de los elementos tiene poco inventario, mostrar un mensaje de advertencia
      const confirmarPedido = confirm("One of the items in your order has limited stock. Do you still want to place the order?");
      if (confirmarPedido) {
        // Aquí realizarías la lógica para hacer el pedido
        // Por ejemplo, podrías enviar la orden al servidor o almacenarla en una base de datos
        alert("Order placed successfully!");
      }
    } else {
      // Si todos los elementos tienen inventario suficiente, proceder con el pedido
      // Aquí realizarías la lógica para hacer el pedido
      // Por ejemplo, podrías enviar la orden al servidor o almacenarla en una base de datos
      alert("Order placed successfully!");
    }
  } else {
    alert("No se encontró ninguna recomendación de planta. Por favor personaliza tu planta primero.");
    window.location.href = "customize.html";
  }
});

  } else {
    alert("No se encontró ninguna recomendación de planta. Por favor personaliza tu planta primero.");
    window.location.href = "customize.html";
  }
});
