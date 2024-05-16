
// controlar formulario buscar del Index
export async function metodoDeBusquedaIndex() {
  //event.preventDefault(); // Evitar que el formulario se envíe
  // Obtener los valores a buscar
  console.log("dentro del metodo Busqueda Index")
  const filtro = document.getElementById("index-input-busqueda").value;
  // llamamos a la funcion mostrar datos y le pasamos los datos de filtrado
  let datosFiltrados = await obtenerDatos(filtro);
  console.log(datosFiltrados)
  // Limpiamos el contenedor
  document.getElementById("index-contenedor-resultados").innerHTML = "";
  // recorremos los datos filtrados y creamos los objetos puntos
  datosFiltrados.forEach((obj) => {
    const punto = new Punto(obj.descripcion, obj.titulo, obj.nombreImagen, obj.ubicacion);
    punto.agregarPunto(document.getElementById("index-contenedor-resultados"));
  });
  //mostrarUsuarios();
}

export function metodoEnviarUsuarioNuevo(event) {
  event.preventDefault(); // Evitar que el formulario se envíe
  // Obteniendo Datos
    let nuevoUsuario = new Usuario(
      document.getElementById("registro-nombre").value,
      document.getElementById("registro-apellido").value,
      document.getElementById("registro-fecha-nacimiento").value,
      document.getElementById("registro-nombre-usuario").value,
      document.getElementById("registro-clave").value,
      _fotoActual[0],
      _fotoActual[1]
      
    )
    // Grabar en la base de Datos el Usuario
    let respuesta = crearUsuario(nuevoUsuario)
}

export function prueba(){
  console.log("Imprimiendo .....")
}