import {
  subirImagen,
  subirSuscriptor,
  consultarSuscriptor,
  consultarUsuarioDNI,
  subirUsuario,
} from "./persistencia.js";
import { Usuario } from "./objetos.js";

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("registrar-foto-perfil").addEventListener("change", e => {
    const elementoImagen = document.getElementById("registrar-foto-actual");
    if (e.target.files[0]) {
      const lector = new FileReader();
      lector.onload = function(e) {
        elementoImagen.src = e.target.result;
      }
      lector.readAsDataURL(e.target.files[0]);
    } else {
      elementoImagen.src = "https://i.ibb.co/8MPLpzp/imagen.jpg";
    }
  });

  document.getElementById("registrar-boton-cargar").addEventListener("click", cargarRegistro);

  async function cargarRegistro() {
    const botonCargar = document.getElementById("registrar-boton-cargar");
    const formulario = document.getElementById("formulario-de-registro");
    botonCargar.classList.add("loading-button");
    formulario.classList.add("loading-cursor");

    const dni = document.getElementById("registrar-dni").value;
    const existe = await consultarUsuarioDNI(dni);

    if (!existe || !existe.dni) {
      let url = "", miniatura = "", success = false;
      const inputFile = document.getElementById("registrar-foto-perfil");
      if (inputFile.files.length > 0) {
        [url, miniatura, success] = await subirImagen({ target: { files: [inputFile.files[0]] } });
      }

      const fechaNacimiento = new Date(document.getElementById("registrar-fecha-nacimiento").value);
      const fechaFormateada = fechaNacimiento.toISOString().split('T')[0];
      const usuario = new Usuario(
        0,
        dni,
        document.getElementById("registrar-correo").value,
        document.getElementById("registrar-nombre").value,
        document.getElementById("registrar-apellido").value,
        fechaFormateada,
        document.getElementById("registrar-nombre-usuario").value,
        document.getElementById("registrar-clave").value,
        url,
        miniatura
      );

      const vResp = await subirUsuario(usuario);
      if (vResp) {
        alert("Se cargo con exito el usuario");
      } else {
        alert("Hubo un error al cargar el usuario");
      }
    } else {
      alert("Ese Usuario ya existe");
    }

    botonCargar.classList.remove("loading-button");
    formulario.classList.remove("loading-cursor");
  }

  document.getElementById("footer-boton-suscriptor").addEventListener("click", cargarSuscriptor);

  document.getElementById("footer-text-subscribir").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      cargarSuscriptor();
    }
  });

  async function cargarSuscriptor() {
    let correo = document.getElementById("footer-text-subscribir").value;
    let re = /\S+@\S+\.\S+/;
    if (re.test(correo)) {
      let existe = await consultarSuscriptor(correo);
      if (existe) {
        alert("Ya estás suscripto");
      } else {
        let respuesta = await subirSuscriptor(correo);
        if (respuesta) {
          alert("Gracias por suscribirte!!");
          document.getElementById("footer-text-subscribir").value = "";
        }
      }
    } else {
      alert("Correo no Valido");
      document.getElementById("footer-text-subscribir").select();
    }
  }
});
