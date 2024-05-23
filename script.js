let camiones = []

function getCamiones() {
    fetch("./camiones.json")
        .then(response => response.json())
        .then((data) => {
            // Guardar camiones predeterminados en localStorage si no existen
            if (!localStorage.getItem('camiones')) {
                localStorage.setItem('camiones', JSON.stringify(data));
            }
            camiones = JSON.parse(localStorage.getItem('camiones')) || data;
            mostrarCamiones(camiones);
        })
        .catch(error => {
            console.error('Error al cargar camiones.json:', error);
        });
}


getCamiones()
// Obtener los datos guardados del almacenamiento local al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    // Obtener los datos guardados o inicializarlos si no hay ninguno
    let storedCamiones = JSON.parse(localStorage.getItem('camiones')) || camiones

    mostrarCamiones(storedCamiones)
})

// Elementos del DOM
let containerCamiones = document.getElementById('Camiones')
let inputModeloCamion = document.getElementById('modeloCamion')
let inputUrlCamion = document.getElementById('urlCamion')
let inputMarcaCamion = document.getElementById('marcaCamion')
let inputAnoCamion = document.getElementById('anoCamion')
let button = document.getElementById('agregar')

// Event listener para el botón de agregar
button.addEventListener("click", agregarCamion)

// Función para mostrar un toast
function mostrarToast(mensaje, tipo) {
    Toastify({
        text: mensaje,
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: tipo === 'error' ? "#FF0000" : "#00C851",
        stopOnFocus: true
    }).showToast()
}

// Función para agregar un camión
function agregarCamion () {
    if (inputModeloCamion.value && inputUrlCamion.value && inputMarcaCamion.value && inputAnoCamion.value) {
        let camion = {
            marca: inputMarcaCamion.value,
            modelo: inputModeloCamion.value,
            url: inputUrlCamion.value,
            año: inputAnoCamion.value
        }

    // Agregar el camión a la lista
    camiones.push(camion)

    // Guardar los camiones en el almacenamiento local
    localStorage.setItem('camiones', JSON.stringify(camiones))

    // Limpiar inputs
    inputModeloCamion.value = ''
    inputUrlCamion.value = ''
    inputMarcaCamion.value = ''
    inputAnoCamion.value = ''

    // Actualizar visualización camiones
    mostrarCamiones(camiones)

    // Mostrar mensaje de éxito
    mostrarToast('Camión agregado exitosamente!', 'success')
    }
    else {
    // Mostrar mensaje de error
        mostrarToast('Por favor, llene todos los campos', 'error')
    }
}

// Función para mostrar los camiones
function mostrarCamiones(camiones) {
    containerCamiones.innerHTML = ''

    camiones.forEach(camion => {
        const camionElemento = document.createElement('div')
        camionElemento.classList.add('camion')
        camionElemento.innerHTML = `
            <h2>${camion.modelo}</h2>
            <img src=${camion.url}></img>
            <p>Marca: ${camion.marca}</p>
            <p>Año: ${camion.año}</p>
            <button id=${camion.modelo}>Eliminar</button>
        `
        containerCamiones.appendChild(camionElemento)
    })

    // Actualizar botones de eliminar
    actualizarBotonesEliminar()
}

// Función para filtrar los camiones
function filtrarCamiones() {
    let filtro = filtroCamionesInput.value.trim().toLowerCase()

    // Filtrar camiones basado en el filtro
    let camionesFiltrados = camiones.filter(camion => {
        let modeloCamion = camion.modelo.toLowerCase()
        let marcaCamion = camion.marca.toLowerCase()
        let anoCamion = camion.año.toString();

        return modeloCamion.includes(filtro) || marcaCamion.includes(filtro) || anoCamion.includes(filtro)
    })

    // Mostrar los camiones filtrados
    mostrarCamiones(camionesFiltrados)
}

let filtroCamionesInput = document.getElementById('filtroCamiones')
filtroCamionesInput.addEventListener('input', filtrarCamiones)

// Listener para el contenedor de camiones
containerCamiones.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        eliminarCamion(event);
    }
})

// Función para eliminar un camión
function eliminarCamion(event) {
    let modelo = event.target.id

    // Filtrar los camiones para eliminar el camión correspondiente
    camiones = camiones.filter(camion => camion.modelo !== modelo)

    // Guardar los camiones actualizados en el almacenamiento local
    localStorage.setItem('camiones', JSON.stringify(camiones))

    // Actualizar visualización camiones
    mostrarCamiones(camiones)
}









