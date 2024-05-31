/**
 * Funcion a la que se le pasa un punto turistico y este lo guarda en el SheedDB
 * 
 * @param {Punto} punto  punto turistico on sus datos para ser subido al servidor de SheeDB
 * @returns {boolean}  si tubo exito o no.
 */

export async function subirPuntoTuristico(punto){
  try {
    // const url = `https://sheetdb.io/api/v1/tv96lgxabh427`    // --- Cuenta de bdidomingueznegro
    const url = `https://sheetdb.io/api/v1/m2snjn3r4siwv`       // --- Cuenta de Ayaiten
    // Creamos un objeto de Datos con los datos del Objeto Punto
    const datosPunto = {
      data: {
        id: "INCREMENT", // Con esto el servidor de SheetDB le asigna un ID automaticamente
        nombre: punto.nombre,
        provincia: punto.provincia,
        pais: punto.pais,
        descripcion: punto.descripcion,
        fotourl: punto.fotourl,
        miniaturaurl: punto.miniaturaurl,
        hospedajes: punto.hospedajes,
        transporte: punto.transporte,
        formas_llegar: punto.formas_llegar
      },
    }
    // Configuramos la solicitud POST
    const opciones = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(datosPunto),
    }
    // Enviamos la solicitud POST
    const response = await fetch(url,opciones)
    if (!response.ok){
      throw new Error("Error al guardar el Punto Turistico")
    }
    const data =  await response.json()
    return true // Si se guardo bien
  }catch(error) {
    console.error("Error ", error)
    return false
  }
}




import { Usuario } from "./objetos.js";


/**
 * Funcion que regresa un objeto con los registros que contengan un ID igual al pasado si por casualidad se crearn mas de 1 regresara todos pero solo mostrara el primero
 * 
 * @param {number} id  id del usuario
 * @returns  {Usuario}  
 */
export async function consultarUsuario(id){
  let resp = new Usuario;
  // const url = `https://sheetdb.io/api/v1/tv96lgxabh427/search?id=${id}&sheet=usuarios`  // -- bdidomingueznegro
  const url = `https://sheetdb.io/api/v1/m2snjn3r4siwv/search?id=${id}&sheet=usuarios`  // ayaiten
  const respuesta = await fetch(url)
  if (respuesta.ok) {
    const data = await respuesta.json()
    if (data && data.length > 0) {
      data.forEach(item => {
        const usuario = new Usuario(
          item.id,
          item.dni,
          item.correo,
          item.nombre,
          item.apellido,
          item.fechaNacimiento,
          item.usuario,
          item.clave,
          item.foto,
          item.fotoMiniatura
        )
        resp = (usuario)
      })
      return resp
    }else{
      return []
    }
  }else{
    // Si la respuesta del servidor no fue exitosa, lanzar un error o manejarlo según sea necesario
    throw new Error("Error al obtener los datos de los usuarios")
  }
}

/**
 * Funcion que regresa un objeto con los registros que contengan un ID igual al pasado si por casualidad se crearn mas de 1 regresara todos pero solo mostrara el primero
 * 
 * @param {number} dni  dni del usuario
 * @returns  {Usuario} regresa con el usuario
 */
export async function consultarUsuarioDNI(dni){
  let resp = new Usuario;
  //const url = `https://sheetdb.io/api/v1/tv96lgxabh427/search?dni=${dni}&sheet=usuarios`  // bdidomingueznegro
  const url = `https://sheetdb.io/api/v1/m2snjn3r4siwv/search?dni=${dni}&sheet=usuarios`  // ayaiten
  const respuesta = await fetch(url)
  if (respuesta.ok) {
    const data = await respuesta.json()
    if (data && data.length > 0) {
      data.forEach(item => {
        const usuario = new Usuario(
          item.id,
          item.dni,
          item.correo,
          item.nombre,
          item.apellido,
          item.fechaNacimiento,
          item.usuario,
          item.clave,
          item.foto,
          item.fotoMiniatura
        )
        resp = (usuario)
      })
      return resp
    }else{
      return []
    }
  }else{
    // Si la respuesta del servidor no fue exitosa, lanzar un error o manejarlo según sea necesario
    throw new Error("Error al obtener los datos de los usuarios")
  }
}



/**
 * Nos entrega una lista con todos los usuarios del servidor
 */
export async function listarUsuarios() {
  let listaUsuarios = []
  //const url = `https://sheetdb.io/api/v1/tv96lgxabh427?sheet=usuarios` // bdidominguezmegro
  const url = `https://sheetdb.io/api/v1/m2snjn3r4siwv?sheet=usuarios` // ayaiten
  const respuesta = await fetch(url)
  if (respuesta.ok) {
    const data = await respuesta.json()
    if (data && data.length > 0) {
      data.forEach(item => {
        const usuario = new Usuario(
          item.id,
          item.dni,
          item.correo,
          item.nombre,
          item.apellido,
          item.fechaNacimiento,
          item.usuario,
          item.clave,
          item.foto,
          item.fotoMiniatura
        )
        listaUsuarios.push(usuario)
      })
      return listaUsuarios
    }else{
      return []
    }
  }else{
    // Si la respuesta del servidor no fue exitosa, lanzar un error o manejarlo según sea necesario
    throw new Error("Error al obtener los datos de los usuarios")
  }
}

// datosFiltrados.forEach((obj) => {
//   const punto = new Punto(obj.descripcion, obj.titulo, obj.nombreImagen, obj.ubicacion);
//   punto.agregarPunto(document.getElementById("index-contenedor-resultados"));

/**
 * Funcion que sube un usuario a SheetDB
 * 
 * @param {Usuario} usuario intancia de un Usuario con los datos a persistir en el servidor SheetDB
 * 
 */
export async function subirUsuario(usuario) {
  //const url = "https://sheetdb.io/api/v1/tv96lgxabh427?sheet=usuarios"; // bdidomingueznegro
  const url = "https://sheetdb.io/api/v1/m2snjn3r4siwv?sheet=usuarios"; // ayaiten
  // Creemos un objeto con los datos del usuario
  const datosUsuario = {
    data: {
      id: "INCREMENT",
      dni: usuario.dni,
      correo: usuario.correo,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      fechaNacimiento: usuario.fechaNacimiento,
      usuario: usuario.usuario,
      clave: usuario.clave,
      foto: usuario.foto,
      fotoMiniatura: usuario.fotoMiniatura
      
    },
  };
  // configuramos la solicitud POST
  const opciones = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datosUsuario),
  };

  // Enviamos la solicitud POST
  try {
    const response = await fetch(url, opciones);
    if (!response.ok) {
      throw new Error("Error al guardar el usuario");
    }
    const data = await response.json();
    //console.log("Usuario Guardado Existosamente: ", data);
    return true;
  } catch (error) {
    console.error("Error ", error);
    return false;
  }
}

/********************************************************************/
// Funcion para obtener los datos de la Api SheetDB
// Definir el URL para usar un archivo en formato JSON para los Datos
//const urlApi = './assets/js/index-data.json';
// y en filtro se envian las palabras que queremos filtrar de la busqueda

import { Punto } from "./objetos.js";



/**
 * Funcion para buscar en el servidor SheetDB todos los puntos que tengan coincidencia con el criterio de busqueda. una falla solo busca por 1 palabra no soporta conbinaciones tipo "jujuy + yala"
 * eso es algo que tendremos que ver como corregir en un futuro pero creo que eso lo tendria que resolver el backend y no el frontend
 *
 * @param {string} filtro  palabra a buscar en los diferentes campos del punto
 * @returns 
 */
export async function bajarPuntos(filtro) {
  //const urlApi = "https://sheetdb.io/api/v1/tv96lgxabh427/search_or"; // bdidomingueznegro
  const urlApi = "https://sheetdb.io/api/v1/m2snjn3r4siwv/search_or"; // ayaiten
  const queryParams = [
    `nombre=*${encodeURIComponent(filtro)}*`,
    `provincia=*${encodeURIComponent(filtro)}*`,
    `pais=*${encodeURIComponent(filtro)}*`,
    `descripcion=*${encodeURIComponent(filtro)}*`,
    `hospedajes=*${encodeURIComponent(filtro)}*`
  ].join("&");

  const response = await fetch(`${urlApi}?${queryParams}`);
  if (!response.ok) {
    throw new Error("Error al obtener los datos");
  }

  const data = await response.json();
  return data;
}


// Funcion que sube imagenes a un servidor de Imagenes https://imgbb.com/ key de la pagina fb47470933bd10712434f449f011599a
// De la url borar el "expiration=600" ya que esto es un indicador de segundos que se almacenara la imagen antes de borrarla si la quitas las imagens quedan almacenadas para siempre dejar solo para pruebas XD

/**
 * Funcion que recibe un archivo de imagen y lo carga en https://imgbb.com/
 * 
 * @param {File} archivo archivo a ser subido
 * @returns  [url, url_miniatura,estado]  regresa la ruta HTTP para ver la imagen en alta calidad (url) y una miniatura (url_miniatura) y un boolean en estado indicando con true si todo esta correcto o false si hubo un error
 */
export async function subirImagen(archivo) {
  const archivoImagen = archivo.target.files[0];
  const nombreArchivo = archivoImagen.name;
  const nombreSinExtension = nombreArchivo.replace(/\.[^/.]+$/, "");
  const url = `https://api.imgbb.com/1/upload?key=fb47470933bd10712434f449f011599a&name=${nombreSinExtension}`;
  const data = new FormData();
  data.append("image", archivoImagen);
  try {
    const respuesta = await fetch(url, {
      method: "POST",
      body: data,
    });
    const datosregresados = await respuesta.json();
    // console.log("Datos de Respuesta " + datosregresados);
    // console.log("URL " + datosregresados.data.url);
    // console.log("Miniatura " + datosregresados.data.thumb.url);
    // console.log("Estado " + datosregresados.success);
    return [datosregresados.data.url, datosregresados.data.thumb.url, datosregresados.success];
  } catch (error) {
    console.error(error);
  }
}


// ENVIAR NUEVO SUBSCRIPTOR

/**
 * Funcion que carga en SheedDB el correo del suscriptor
 * 
 * @param {string} correo correo del suscriptor tener en cuenta que no comprueba que sea un corre, sube lo que sea ademas de que le agrega un id y la fecha actual para que se carge en el registro como fecha de alta
 * @returns  {boolean}  
 */

export async function subirSuscriptor(correo) {
  //const url = "https://sheetdb.io/api/v1/tv96lgxabh427?sheet=suscripcion"; // bdidomingueznegro
  const url = "https://sheetdb.io/api/v1/m2snjn3r4siwv?sheet=suscripcion"; // ayaiten
  // Cremos un objeto con los datos del usuario
  const datos = {
    data: {
      id: "INCREMENT",
      correo: correo,
      fecha: new Date,
    },
  };
  // configuramos la solicitud POST
  const opciones = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  };
  // Enviamos la solicitud POST
  try{
    const response = await fetch(url,opciones)
    if (!response.ok){
      throw new Error("Error al guardar el suscriptor ", data)
    }
    //console.log("Subida ",true)
    return true
  }catch (error) {
    console.error("Error ", error)
    console.log("Subida Suscriptor ",false)
    return false
  }
}

// CONSULTANDO  SUBSCRIPTOR

/**
 * Funcion que retorna true si existe el correo que se adjunta o false de no encontrarlo, no comprueba que el correo tenga formato alguno.
 * 
 * @param {string} correo correo que se buscara en SheetDB
 * @returns 
 */

export async function consultarSuscriptor(correo) {
  //const url = `https://sheetdb.io/api/v1/tv96lgxabh427/search?correo=${correo}&sheet=suscripcion`; // bdidominugez
  const url = `https://sheetdb.io/api/v1/m2snjn3r4siwv/search?correo=${correo}&sheet=suscripcion`; // bdidominugez
  try{
    const response = await fetch(url)
    const data = await response.json()
    // Verificamos si hay algun resultado
    if (data && data.length > 0){
      return true
    }else{
      return false
    }
  }catch (error){
    console.error("Error al cosultar un suscrptor ", error)
    return false
  }
}


  /**
   * Agrega en el Button una animacion de cargar
   * 
   * @param {string} nombreElemento id del elemento button que tendra la animacion
   * @param {boolean} accion - Indica si debe acticar (true) o desactivar (false) la animacion.
   */
  export function animacionBotonCarga(nombreElemento,accion){
    const elemento = document.getElementById(nombreElemento)
    if (accion){
      elemento.classList.add("loading-button")
    }else{
      elemento.classList.remove("loading-button")
    }
  }

  /**
 * Cambia el cursor a 'wait' cuando se necesita una animación de carga en un elemento.
 * 
 * @param {string} nombreElemento - El ID del elemento cuyo cursor cambiará.
 * @param {boolean} accion - Indica si se debe activar (true) o desactivar (false) la animación.
 */
  export function animacionCursoCarga(nombreElemento,accion){
    const elemento = document.getElementById(nombreElemento)
    if (accion){
      elemento.classList.add("loading-cursor")
    }else{
      elemento.classList.remove("loading-cursor")
    }
  }

    /**
   * Funcion que muestra un mensaje en la parte inferior de la pantalla
   * 
   * @param {string} msg  Cuerpo del mensaje que queremos dar
   * @param {string} tit  Titulo que llevara el mensaje
   * @param {number} tiempo tiempo en segundos que tardara en desaparecer el mensaje
   */
    export function miMensaje(msg, tit, tiempo) {
      // Creamos los elementos
      const contenedor = document.createElement("div");
      contenedor.classList.add("contenedor-miMensage");
      const titulo = document.createElement("h3");
      titulo.textContent = tit;
      const mensaje = document.createElement("p");
      mensaje.textContent = msg;
      
      // Insertamos los elementos al contenedor
      contenedor.appendChild(titulo);
      contenedor.appendChild(mensaje);
      
      // Seleccionamos el destino de la página (será el body) y agregamos el mensaje
      const hoja = document.querySelector("body");
      hoja.appendChild(contenedor);
      
      // Eliminamos el mensaje después de `tiempo` segundos
      setTimeout(() => {
          hoja.removeChild(contenedor);
      }, tiempo * 1000);
    }

    // FUNCION DE CARGA DEL CORREO
/**
 * Funcion que se usa para controlar el suscribir del footer desde todas las paginas, controla que el correo esta correcto y que no exista ya en el servidor de cumplir las condiciones se carga y se informa al usuario.
 * 
 * @param {string} correo 
 */

export async function cargarSuscriptor(correo) {
  let re = /\S+@\S+\.\S+/; // Explecion regular para validar el correo no se como funciona Todavia XD
  if (re.test(correo)) {
    // regresa true si es correo sino regresa false
    // COMPROBAR QUE EL CORREO NO EXISTE
    let existe = await consultarSuscriptor(correo);
    if (existe) {
      miMensaje("paraaaaaa ansioooosooo  ya estas suscripto!!! -- Gracias por elegirnos","Advertencia",4)
      //alert("paraaaaaa ansioooosooo  ya estas suscripto!!! -- Gracias por elegirnos");
    } else {
      // CARGAMOS EL CORREO AL ENDPOINT
      let respuesta = subirSuscriptor(correo);
      if (respuesta) {
        miMensaje("Gracias por suscribirte!","Informacion",4)
        //alert("Gracias por suscribirte!!");
        document.getElementById("footer-text-subscribir").value = ''
      }
    }
  } else {
    miMensaje("Correo no Valido!","Advertencia",3)
    //alert("Correo no Valido");
    //document.getElementById(nombreElemento).select();
  }
}