import { Usuario, Punto } from './objetos.js';
import {_fotoActual, _usuarioLogeado} from './variables.js';
import {obtenerDatos, subirImagen, crearUsuario, consultarUsaurios} from './persistencia.js';
import {cargarImagenPerfil, metodoDeBusquedaIndex, metodoEnviarUsuarioNuevo, prueba} from './dario.js';

/*
const idBtn = "search-button"

console.log("hola!")

document
.getElementById(idBtn)
.addEventListener(
        'click'
    , () => prueba()
)
*/

let nuevo = new Usuario("dario","Dominguez",new Date,"dario","dario","","");
//let respuesta = crearUsuario(nuevo);
//console.log(respuesta)

consultarUsaurios()
  .then(respuesta => {
    console.log(respuesta);
  })
  .catch(error => {
    console.error("Error:", error);
  });