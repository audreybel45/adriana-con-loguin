import { Usuario, Punto } from './objetos.js';
import {_fotoActual, _usuarioLogeado} from './variables.js';
import {obtenerDatos, subirImagen, crearUsuario} from './persistencia.js';
import {cargarImagenPerfil, metodoDeBusquedaIndex, metodoEnviarUsuarioNuevo, prueba} from './dario.js';


const idBtn = "search-button"

console.log("hola!")

document
.getElementById(idBtn)
.addEventListener(
        'click'
    , () => prueba()
)