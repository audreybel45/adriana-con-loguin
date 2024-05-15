// Definir el URL para usar un archivo en formato JSON para los Datos
//const urlApi = './assets/js/index-data.json';
const urlApi = "https://sheetdb.io/api/v1/tv96lgxabh427";

//Clase Puntos para representar los datos
class Punto {
  constructor(descripcion, titulo, nombreImagen, ubicacion) {
    this.descripcion = descripcion;
    this.titulo = titulo;
    this.nombreImagen = nombreImagen;
    this.ubicacion = ubicacion;
  }

  // metodo para agregar un punto a la pagina
  agregarPunto(contenedor) {
    // creamos el html para ser agregado al contenedor
    const contenedorPunto = document.createElement("div");
    contenedorPunto.classList.add("index-punto");
    const elementoTitulo = document.createElement("h3");
    elementoTitulo.textContent = this.titulo;
    const elementoDescripcion = document.createElement("p");
    elementoDescripcion.textContent = this.descripcion;
    const elementoUbicacion = document.createElement("p");
    elementoUbicacion.textContent = this.ubicacion;
    const elementoImagen = document.createElement("img");
    elementoImagen.src = `./assets/images/${this.nombreImagen}`;
    elementoImagen.alt = this.titulo;
    // agregamos al div los elemento
    contenedorPunto.appendChild(elementoImagen);
    contenedorPunto.appendChild(elementoTitulo);
    contenedorPunto.appendChild(elementoDescripcion);
    contenedorPunto.appendChild(elementoUbicacion);
    // Agregamos el el div a la pagina
    contenedor.appendChild(contenedorPunto);
  }
}

// Funcion para obtener los datos del archivo index-data.json
function obtenerDatos(filtro) {
  fetch(urlApi)
    .then((Response) => Response.json())
    .then((data) => {
      // filtramos los datos segun lo solicitado en el filtro
      const datosFiltrados = data.filter((obj) => {
        return (
          obj.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
          obj.descripcion.toLowerCase().includes(filtro.toLowerCase()) ||
          obj.ubicacion.toLowerCase().includes(filtro.toLowerCase())
        );
      });
      // Limpiamos el contenedor
      document.getElementById("index-contenedor-resultados").innerHTML = "";
      // recorremos los datos filtrados y creamos los objetos puntos
      datosFiltrados.forEach((obj) => {
        const punto = new Punto(
          obj.descripcion,
          obj.titulo,
          obj.nombreImagen,
          obj.ubicacion
        );
        punto.agregarPunto(
          document.getElementById("index-contenedor-resultados")
        );
      });
    })
    .catch((error) => {
      console.error("Error al obtener los datos", error);
    });
}

// controlar el formulario del formulario buscar del Index
function metodoDeBusquedaIndex(event) {
  event.preventDefault(); // Evitar que el formulario se envíe
  // Obtener los valores a buscar
  const filtro = document.getElementById("index-input-busqueda").value;
  // llamamos a la funcion mostrar datos y le pasamos los datos de filtrado
  obtenerDatos(filtro);
  mostrarUsuarios();
}

const urlApiU = "https://sheetdb.io/api/v1/tv96lgxabh427?sheet=usuarios";

//Clase Puntos para representar los datos
class Usuario {
  constructor(id, nombre, clave, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.clave = clave;
    this.imagen = imagen;
  }
}

function mostrarUsuarios() {
  fetch(urlApiU)
    .then((Response) => Response.json())
    .then((data) => {
      data.forEach((obj) => {
        const usuario = new Usuario(obj.id, obj.nombre, obj.clave, obj.imagen);
        console.log(data);
      });
    })
    .catch((error) => {
      console.error("Error al obtener los Usuario ", error);
    });
}

// Funcion que sube imagenes a un servidor de Imagenes https://imgbb.com/ key de la pagina fb47470933bd10712434f449f011599a
// De la url borar el "expiration=600" ya que esto es un indicador de segundos que se almacenara la imagen antes de borrarla si la quitas las imagens quedan almacenadas para siempre dejar solo para pruebas XD
const subirImagen = async (archivo) => {
  const archivoImagen = archivo.target.files[0];
  const nombreArchivo = archivoImagen.name;
  const nombreSinExtension = nombreArchivo.replace(/\.[^/.]+$/, "");
  const url = `https://api.imgbb.com/1/upload?expiration=600&key=fb47470933bd10712434f449f011599a&name=${nombreSinExtension}`;
  const data = new FormData();
  data.append("image", archivoImagen);
  try {
    const respuesta = await fetch(url, {
      method: "POST",
      body: data,
    });
    const datosregresados = await respuesta.json();
    console.log("Datos de Respuesta " + datosregresados)
    console.log("URL " + datosregresados.data.url);
    console.log("Miniatura " + datosregresados.data.thumb.url);
    console.log("Estado " + datosregresados.success);
    return [datosregresados.data.url, datosregresados.data.thumb.url, datosregresados.success,];
  } catch (error) {
    console.error(error);
  }
};

async function cargarImagenPerfil() {
  let archivo = document.getElementById("registro-foto-perfil");
  let foto = document.getElementById("registro-foto-actual");
  let respuesta = [undefined, undefined, -1];
  if (archivo.files.length > 0) {
    respuesta = await subirImagen({target: { files: [archivo.files[0]] },
    });
  }
  console.log("Respuesta desde el servidor "  + respuesta)
  if (respuesta[2] == true) {
    console.log("correcto true");
    foto.src = respuesta[1];
  } else if (respuesta[2] == -1) {
    console.log("Respuesta -");
    console.log("se llamo a la carga de imagenes, pero no se selecciono archivo"
    );
  } else {
    console.log("Foto por defecto");
    foto.src = "https://i.ibb.co/8MPLpzp/imagen.jpg";
  }
}


// Manejar los datos del furmulario para ser usados cargar el registro

