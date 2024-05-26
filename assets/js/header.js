document.addEventListener("DOMContentLoaded", () => {
    fetch('../pages/header.html')  // Ajusta la ruta según la nueva estructura
      .then(response => response.text())
      .then(data => {
        document.querySelector('header').innerHTML = data;
      })
      .catch(error => console.error('Error al cargar el header:', error));
});

  