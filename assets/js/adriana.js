import {Punto} from "./objetos.js"
import {subirImagen, subirPuntoTuristico} from "./persistencia.js"

let adriana = new Punto ()
adriana.id = 0
adriana.nombre =  document.getElementById('nombre').value;
adriana.provincia = document.getElementById('provincia').value;
adriana.pais = document.getElementById('pais').value;
adriana.descripcion = document.getElementById('descripcion').value;
adriana.hospedajes = document.getElementById('hospedajes').value;
adriana.transporte = document.getElementById('transporte').value;
adriana.formas_llegar = document.getElementById('formas_llegar').value

// CREAREMOS UN PUNTOTURISTICO PERO LE AGREGAREMOS LA FOTO PARA QUE ESTE COMPLETO!!
// EMPEZAREMOS CON LA OPCION DE CARGAR IMANGEN QUE ESTAMOS SACANDO DE LA PAGINA REGISTRAR.HTML
// ESTE EJEMPLO SE LANZARA DESDE UNA VEZ CAMBIE EL ESTADO DEL INPUT QUE SE ENCUENTRA EN EL REGISTRAR.HTML
// ES SOLO PARA PRUEBAS O BASARSE EN EL//
const inputFile = document.getElementById('foto');
    if (inputFile.files.length > 0) {
        const [url, miniatura, success] = await subirImagen({ target: { files: [inputFile.files[0]] } });

  
    // EN ESTE PUNTO TENEMOS LA IMAGEN GUARDADA O NO Y PODEMOS DECIDIR SI GUARDAR O NO EL PUNTO
    if (success){ // Si dice que si creamos el Punto sacando los datos desde la pagina
      //CARGAMOS UN PUNTO TURISTICO SIN LAS FOTOS ESO SERIA EL PASO SIGUIENTE"
        let desc = document.getElementById('descripcion').value;
        let punto = new Punto(
            adriana.id,
            adriana.nombre,
            adriana.provincia,
            adriana.pais,
            desc,
            url,
            miniatura,
            adriana.hospedajes,
            adriana.transporte,
            adriana.formas_llegar)
        let vResp = subirPuntoTuristico(punto)
        console.log(vResp)
            
    }else{
      console.log("Error al cargar la imagen del punto por ende se cancela el proceso")
    }
    

  }else {
    console.log("No se Selecciono ningun archivo.")
  }




// FUNCION QUE SUBE UNA FOTO  CON ESTE METODO SE PUEDE CARGAR UNA IMAGEN AL SERVIDOR DE IMAGENS y nos regresa 3 datos
// url  que contiene la direccion de la foto en formato grande, osea pesada pero de mejor calidad en formato https://...
// miniatura tambien una url pero como dice de una foto en miniatura para una carga mas rapida tambien en formato http://....
// y success que si tiene un true como valor es que la foto se subio sin problemas//

const idinputFile = "foto"
document.getElementById(idinputFile).addEventListener('change', async () => {
  const inputFile = document.getElementById(idinputFile)
  if (inputFile.files.length > 0 ){ // Verificamos que haya un archivo en el input
    const [url, miniatura, success] = await subirImagen({ target: { files: [inputFile.files[0]] } })
    console.log("URL de la imagen: ", url);
    console.log("URL de la miniatura: ", miniatura);
    console.log("Éxito: ", success);

  }else {
    console.log("No se Selecciono ningun archivo.")
  }
})





    // Crear un objeto con los datos del formulario
    const nuevoSitio = {
        
        "nombre": nombre,
        "provincia": provincia,
        "pais": pais,
        "descripcion": descripcion,
        "foto": foto,
        "hospedajes": hospedajes,
        "transporte": transporte,
        "formas_llegar": formas_llegar
    };

    // Obtener los datos existentes del archivo JSON
    fetch(urlApi)
        .then(response => response.json())
        .then(data => {
            // Agregar el nuevo sitio al array de datos existentes
            data.push(nuevoSitio);
            // Convertir el objeto de datos a una cadena JSON
            const jsonData = JSON.stringify(data, null, 4);
            
            // Crear un blob con los datos JSON
            const blob = new Blob([jsonData], { type: 'application/json' });
            
            // Crear una URL para el blob
            const blobURL = URL.createObjectURL(blob);
            
            // Crear un enlace para descargar el archivo JSON
            const a = document.createElement('a');
            a.href = blobURL;
            a.download = 'index-data.json';
            
            // Simular un clic en el enlace
            a.click();
            
            // Liberar el objeto URL creado
            URL.revokeObjectURL(blobURL);
        })
        .catch(error => {
            console.error('Error al obtener los datos del archivo JSON', error);
            alert("Error al obtener los datos del archivo JSON");
        });

