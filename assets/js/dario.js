// Definir el URL para usar un archivo en formato JSON para los Datos
const urlApi = './assets/js/index-data.json';

//Clase Puntos para representar los datos
class Punto{
    constructor(descripcion,titulo,nombreImagen){
        this.descripcion = descripcion;
        this.titulo = titulo;
        this.nombreImagen = nombreImagen;
    }

    // metodo para agregar un punto a la pagina
    agregarPunto(contenedor){
        // creamos el html para ser agregado al contenedor
        const contenedorPunto = document.createElement('div');
        contenedorPunto.classList.add('index-punto');
        const elementoTitulo = document.createElement('h3');
        elementoTitulo.textContent = this.titulo;
        const elementoDescripcion = document.createElement('p');
        elementoDescripcion.textContent = this.descripcion;
        const elementoImagen = document.createElement('img');
        elementoImagen.src = `./assets/images/${this.nombreImagen}`;
        elementoImagen.alt = this.titulo;
        // agregamos al div los elemento
        contenedorPunto.appendChild(elementoImagen);
        contenedorPunto.appendChild(elementoTitulo);
        contenedorPunto.appendChild(elementoDescripcion);
        // Agregamos el el div a la pagina
        contenedor.appendChild(contenedorPunto);
    }
}

// Funcion para obtener los datos del archivo index-data.json
function obtenerDatos(){
    fetch(urlApi)
      .then(Response => Response.json())
      .then(data => {
        // recorremos los datos y creamos los objetos puntos
        data.forEach(obj => {
            const punto = new Punto(obj.descripcion, obj.titulo, obj.nombreImagen);
            punto.agregarPunto(document.getElementById('index-contenedor-resultados'));
        });
      })
      .catch(error => {
        console.error('Error al obtener los datos', error);
      });
}

//llamamos a la funcion para obtener datos y mostrarlos en la pagina
obtenerDatos();
