//Clase punto que se usa en el INDEX para cada una de las consultas del 
// es necesario modificarla para que regrese la Estructura HTML a insertar y que el que llamo la inserte en dode quiera
export class Punto {
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

// Usuario de la pagina y sus metodos
export class Usuario {
    constructor (nombre,apellido,fechaNacimiento,usuario,clave,foto,fotoMiniatura){
      this.nombre = nombre
      this.apellido = apellido
      this.fechaNacimiento = fechaNacimiento
      this.usuario = usuario
      this.clave = clave
      this.foto = foto
      this.fotoMiniatura = fotoMiniatura
    }
  
    usuarioEdad(){
      const fechaNacimiento = new Date(this.fechaNacimiento);
      const fechaActual = new Date();
      let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
      // Verificar si el cumpleaños ya pasó este año
      const mesActual = fechaActual.getMonth();
      const mesNacimiento = fechaNacimiento.getMonth();
      if (mesActual < mesNacimiento || (mesActual === mesNacimiento && fechaActual.getDate() < fechaNacimiento.getDate())) {
        edad--;
      }
      return edad;
    }
  }