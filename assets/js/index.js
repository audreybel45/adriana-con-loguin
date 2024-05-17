import { Usuario, Punto } from "./objetos.js";
import { } from "./persistencia.js";
import {consultarPuntos} from "./dario.js";
 
// ESCUCHANDO AL BOTON BUSCAR
 const btBuscarPuntos = "index-buscar-puntos";
 document.getElementById(btBuscarPuntos).addEventListener("click", () => consultarPuntos());