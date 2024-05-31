//import { Punto } from "./datos.js";
//import { subirImagen, subirPuntoTuristico } from "./datos.js";
import { cargarSuscriptor, subirImagen, subirPuntoTuristico, animacionBotonCarga,miMensaje} from "./persistencia.js";
import {Punto } from "./objetos.js";
// comente los import y puse las funciones que necesitaba ademas de las que cree  dentro de mi script porque con el import no las tomaba

 
  
// Función para guardar datos
async function guardarDatos() {
    try {
        animacionBotonCarga("guardarDatos",true)
        // Obtener los valores de los campos del formulario
        const nombre = document.getElementById('nombre').value;
        const provincia = document.getElementById('provincia').value;
        const pais = document.getElementById('pais').value;
        const descripcion = document.getElementById('descripcion').value;
        const hospedajes = document.getElementById('hospedajes').value;
        const transporte = document.getElementById('transporte').value;
        const formas_llegar = document.getElementById('formas_llegar').value;
        const elementoImagen = document.getElementById('foto');
  
        console.log("Datos del formulario obtenidos:");
  
        // Verificar si se ha seleccionado un archivo de imagen
        if (elementoImagen.files.length > 0) {
            console.log("Archivo de imagen seleccionado. Procediendo a subir la imagen...");
  
            // Subir la imagen
            const [url, miniatura, success] = await subirImagen({ target: { files: [elementoImagen.files[0]] } });
  
            console.log("Resultado de la subida de imagen:", { url, miniatura, success });
  
            // Verificar si la imagen se subió correctamente
            if (success) {
                // Crear un nuevo punto turístico con los datos del formulario y la imagen subida
                const punto = new Punto(0, nombre, provincia, pais, descripcion, url, miniatura, hospedajes, transporte, formas_llegar);
  
                console.log("Punto turístico creado:", punto);
  
                // Subir el punto turístico a la base de datos
                const vResp = await subirPuntoTuristico(punto);
                console.log("Respuesta de la subida del punto turístico:", vResp);
  
                // Si se ha subido correctamente, agregar el punto turístico a la página
                if (vResp) {
                    // Obtener el contenedor donde se agregarán los puntos turísticos
                    const contenedor = document.getElementById("contenedor-puntos");
                    // Agregar el punto turístico al contenedor
                    punto.agregarPunto(contenedor);
                } else {
                    console.log("Error al guardar el punto turístico, no se agregará a la página.");
                }
            } else {
                console.log("Error al cargar la imagen del punto, por lo tanto, se cancela el proceso.");
            }
        } else {
            console.log("No se seleccionó ningún archivo de imagen.");
        }
    } catch (error) {
        console.error("Error al guardar los datos:", error);
    }
    animacionBotonCarga("guardarDatos",false)
}
  
document.addEventListener("DOMContentLoaded", function() {
    // Verificar si el usuario está logueado
    //const formularioContainer = document.getElementById('formulario-container');
    //const accessDeniedMessage = document.getElementById('access-denied-message');
    //const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado')); // Verificar si el usuario está logueado

    // Mostrar el formulario o el mensaje de acceso denegado
    //if (usuarioLogueado) {
        //formularioContainer.style.display = 'block';
    //} else {
    //    accessDeniedMessage.style.display = 'block';
    //}
    // Función para manejar la vista previa de la imagen seleccionada
    // document.getElementById("foto").addEventListener("change", e => {
    //     const elementoImagen = document.getElementById("registrar-foto-actual");
  
    //     if (e.target.files[0]) { // Si existe algún archivo, regresa true
    //         const lector = new FileReader();
    //         lector.onload = function(evento) {
    //             elementoImagen.src = evento.target.result;
    //         };
    
    //         lector.readAsDataURL(e.target.files[0]);
    //     } else {
    //         elementoImagen.src = "https://i.ibb.co/8MPLpzp/imagen.jpg";
    //     }
    // });
    
    // Agregar evento click al botón "Guardar Datos"
    document.getElementById("guardarDatos").addEventListener("click", guardarDatos);


    
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
    }); // FIN SUBSCRIBIRSE


});  