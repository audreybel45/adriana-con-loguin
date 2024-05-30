
import {miMensaje} from "./persistencia.js";

document.getElementById('filtrar').addEventListener('click', function() {
  const ubicacion = document.getElementById('ubicacion').value;
  const servicios = document.getElementById('servicios').value;
  const precio = document.getElementById('precio').value;
  const idiomas = document.getElementById('idiomas').value;

  const guias = [
    {
      nombre: 'Daniela Roman',
      foto: '../assets/images/guies-pictures/daniela-roman.jpg',
      contacto: {
        mail: 'daniela@example.com',
        telefono: '+543885273263'
      },
      ubicacion: 'buenos-aires',
      servicios: ['recepcion', 'itinerario'],
      precio: 'medio',
      idiomas: ['espanol', 'ingles']
    },
    // Agrega más guías aquí
  ];

  const guiasFiltradas = guias.filter(guia => {
    return (ubicacion === 'todas' || guia.ubicacion === ubicacion) &&
           (servicios === 'todos' || guia.servicios.includes(servicios)) &&
           (precio === 'todos' || guia.precio === precio) &&
           (idiomas === 'todos' || guia.idiomas.includes(idiomas));
  });

  const contenedorGuias = document.getElementById('contenedor-guias');
  contenedorGuias.innerHTML = '';

  guiasFiltradas.forEach(guia => {
    

    const guiaDiv = document.createElement('div');
    guiaDiv.classList.add('guia');
    guiaDiv.innerHTML = `
      <img src="${guia.foto}" alt="imagen-${guia.nombre}">
      <div class="guia-info">
        <h3>${guia.nombre}</h3>
        <p><strong>Idiomas:</strong> ${guia.idiomas.join(', ')}</p>
        <p><strong>Servicios:</strong> ${guia.servicios.join(', ')}</p>
        <p><strong>Contacto:</strong> <a href="mailto:${guia.contacto.mail}">${guia.contacto.mail}</a>, ${guia.contacto.telefono}</p>
        <p><strong>Precio:</strong> ${guia.precio}</p>
        
        <a href="#">Enviar mensaje</a>
      </div>
    `;
    contenedorGuias.appendChild(guiaDiv);
  });
});
