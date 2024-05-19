import { Punto } from "./objetos.js";
import { subirImagen, subirPuntoTuristico } from "./persistencia.js";

// Función para manejar el evento de clic en el botón "Guardar Datos"
async function guardarDatos() {
  try {
    // Obtener los valores de los campos del formulario
    const nombre = document.getElementById('nombre').value;
    const provincia = document.getElementById('provincia').value;
    const pais = document.getElementById('pais').value;
    const descripcion = document.getElementById('descripcion').value;
    const hospedajes = document.getElementById('hospedajes').value;
    const transporte = document.getElementById('transporte').value;
    const formas_llegar = document.getElementById('formas_llegar').value;
    const inputFile = document.getElementById('foto');

    // Verificar si se ha seleccionado un archivo de imagen
    if (inputFile.files.length > 0) {
      // Subir la imagen
      const [url, miniatura, success] = await subirImagen({ target: { files: [inputFile.files[0]] } });

      // Verificar si la imagen se subió correctamente
      if (success) {
        // Crear un nuevo punto turístico con los datos del formulario y la imagen subida
        const punto = new Punto(0, nombre, provincia, pais, descripcion, url, miniatura, hospedajes, transporte, formas_llegar);

        // Subir el punto turístico a la base de datos
        const vResp = await subirPuntoTuristico(punto);
        console.log(vResp);
      } else {
        console.log("Error al cargar la imagen del punto, por lo tanto, se cancela el proceso.");
      }
    } else {
      console.log("No se seleccionó ningún archivo de imagen.");
    }
  } catch (error) {
    console.error("Error al guardar los datos:", error);
  }
}

// Agregar un event listener al botón "Guardar Datos"
document.querySelector('button[type="button"]').addEventListener('click', guardarDatos);
