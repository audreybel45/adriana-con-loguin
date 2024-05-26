import { consultarUsuario } from "./persistencia.js";

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
});

