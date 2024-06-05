import { Usuario, Punto } from "./objetos.js";
import { subirSuscriptor, consultarSuscriptor, bajarPuntos, animacionBotonCarga, animacionCursoCarga,cargarSuscriptor} from "./persistencia.js";
import {  } from "./dario.js";

// ESCUCHANDO AL BOTON BUSCAR
const btBuscarPuntos = "index-buscar-puntos";
document.getElementById(btBuscarPuntos).addEventListener("click", () => consultarPuntos(document.getElementById("index-input-busqueda").value));
// ESCUCHANDO AL INPUT DE BUSQUEDA DE CITIO TURISTICO
document.getElementById("index-input-busqueda").addEventListener("keydown",function (event){
    if (event.key === "Enter"){
        event.preventDefault()
        consultarPuntos(document.getElementById("index-input-busqueda").value)
    }
})

async function consultarPuntos(filtro) {
    // console.log("Se ingreso a la consultarPuntos");
    animacionBotonCarga("index-buscar-puntos",true)
    try {
      const listaPuntos = await bajarPuntos(filtro);
      // Limpiamos el contenedor
      document.getElementById("index-contenedor-resultados").innerHTML = "";
      listaPuntos.forEach((obj) => {
        const punto = new Punto(
          obj.id,
          obj.nombre,
          obj.provincia,
          obj.pais, 
          obj.descripcion,
          obj.fotourl,
          obj.miniaturaurl,
          obj.hospedajes,
          obj.transporte,
          obj.formas_llegar
        );
        punto.agregarPunto(document.getElementById("index-contenedor-resultados"));
      });
    } catch (error) {
      console.error("Error al consultar los puntos: ", error);
    }
    animacionBotonCarga("index-buscar-puntos",false)
  }

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
});


// Probando el git