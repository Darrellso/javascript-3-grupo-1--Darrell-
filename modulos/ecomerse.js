document.addEventListener('DOMContentLoaded', () => {
    const chisteContainer = document.getElementById('chisteContainer');
    const selectedJoke = localStorage.getItem('selectedJoke'); // Obtiene el chiste almacenado en el localStorage
    if (selectedJoke) {
      chisteContainer.textContent = selectedJoke;
    } else {
      chisteContainer.textContent = 'No se ha seleccionado un chiste.';
    }
  });

  
