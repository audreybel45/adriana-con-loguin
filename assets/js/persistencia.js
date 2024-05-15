// Funcion para obtener los datos de la Api SheetDB
// Definir el URL para usar un archivo en formato JSON para los Datos
//const urlApi = './assets/js/index-data.json';

export async function obtenerDatos(filtro) {
  const urlApi = "https://sheetdb.io/api/v1/tv96lgxabh427"; // Direccion para almacenr el Mismo
  return fetch(urlApi)
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
      return datosFiltrados
    })
    .catch((error) => {
      console.error("Error al obtener los datos", error);
    });
}

// Funcion que sube imagenes a un servidor de Imagenes https://imgbb.com/ key de la pagina fb47470933bd10712434f449f011599a
// De la url borar el "expiration=600" ya que esto es un indicador de segundos que se almacenara la imagen antes de borrarla si la quitas las imagens quedan almacenadas para siempre dejar solo para pruebas XD
export async function subirImagen(archivo){
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
    console.log("Datos de Respuesta " + datosregresados);
    console.log("URL " + datosregresados.data.url);
    console.log("Miniatura " + datosregresados.data.thumb.url);
    console.log("Estado " + datosregresados.success);
    return [datosregresados.data.url, datosregresados.data.thumb.url, datosregresados.success];
  } catch (error) {
    console.error(error);
  }
};

// Manejar los datos del furmulario para ser usados cargar el registro
export function crearUsuario(usuario) {
  const url = "https://sheetdb.io/api/v1/tv96lgxabh427?sheet=usuarios";
  // Cremos un objeto con los datos del usuario
  const datosUsuario = {
    data: {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      fechaNacimiento: usuario.fechaNacimiento,
      usuario: usuario.usuario,
      clave: usuario.clave,
      foto: usuario.foto,
      fotoMiniatura: usuario.fotoMiniatura,
    },
  };
  // configuramos la solicitud POST
  const opciones = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datosUsuario),
  };
  // Enviamos la solicitud POST
  fetch(url, opciones)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al guardar el usuario");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Usuario Guardado Existosamente: ", data);
    })
    .catch((error) => {
      console.error("Error ", error);
    });
}
