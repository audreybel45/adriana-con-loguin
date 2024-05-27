import { cargarSuscriptor } from "./persistencia.js";
// ESCUCHAMOS AL BOTON SUSCRIBIR Y LLAMAMOS A LA FUNCION DE CARGA
document.getElementById("footer-boton-suscriptor").addEventListener("click", () => {
    const correo = document.getElementById("footer-text-subscribir").value
    //console.log("Probando", correo)
    cargarSuscriptor(correo)
  });
  // ESCUCHAMOS AL INPUT POR SI ALGUINE PRECIONA ENTER QUE EJECUTE LA FUNCION DE CARGA
  document.getElementById("footer-text-subscribir").addEventListener("keydown", function (event) {
    // Verificar si la tecla presionada es Enter
    if (event.key === "Enter") {
      // Detener la propagación del evento para evitar el envío del formulario
      event.preventDefault();
      const correo = document.getElementById("footer-text-subscribir").value
      cargarSuscriptor(correo);
    }
  });
