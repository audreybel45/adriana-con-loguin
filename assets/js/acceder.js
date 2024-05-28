import { miMensaje } from "./persistencia.js";


// Define la función listarUsuarios directamente en este archivo
async function listarUsuarios() {
  try {
    const response = await fetch('https://sheetdb.io/api/v1/tv96lgxabh427?sheet=usuarios');
    if (!response.ok) {
      throw new Error('Error en la solicitud a SheetDB');
    }
    const usuarios = await response.json();
    console.log('Usuarios obtenidos:', usuarios); // Log para depuración
    return usuarios;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
}

// Agrega el listener al botón de acceso cuando el DOM se haya cargado
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("acceder-boton").addEventListener("click", async function () {
    const nombreUsuario = document.getElementById("acceder-usuario").value;
    const clave = document.getElementById("acceder-clave").value;

    console.log('Nombre de usuario ingresado:', nombreUsuario); // Log para depuración
    console.log('Clave ingresada:', clave); // Log para depuración

    if (!nombreUsuario || !clave) {
      alert('Por favor, complete todos los campos');
      return;
    }

    try {
      const usuarios = await listarUsuarios();
      console.log('Usuarios obtenidos:', usuarios); // Log para depuración

      const usuarioEncontrado = usuarios.find(usuario => usuario.usuario === nombreUsuario && usuario.clave === clave);

      if (usuarioEncontrado) {
       // alert('Acceso exitoso');
        miMensaje("Acceso exitoso","bienvenido "+ usuarioEncontrado.nombreUsuario,6)
        window.location.href = '../index.html';
      } else {
        alert('Nombre de usuario o clave incorrectos');
      }
    } catch (error) {
      console.error('Error al listar usuarios:', error);
      alert('Hubo un error al intentar acceder. Intente nuevamente más tarde.');
    }
  });
});
