import { consultarUsuario, cargarSuscriptor } from "./persistencia.js";

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("acceder-boton").addEventListener("click", async function () {
    const nombreUsuario = document.getElementById("acceder-usuario").value;
    const clave = document.getElementById("acceder-clave").value;
    const usuarios = await listarUsuarios(); // Suponiendo que listarUsuarios devuelve todos los usuarios

    const usuarioEncontrado = usuarios.find(usuario => usuario.usuario === nombreUsuario && usuario.clave === clave);

    if (usuarioEncontrado) {
      alert("Acceso exitoso");
      // Redireccionar o mostrar contenido para usuarios registrados
      window.location.href = "./pagina_usuario.html"; // Redirige a una página para usuarios registrados
    } else {
      alert("Nombre de usuario o clave incorrectos");
    }
  });
  
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


});

