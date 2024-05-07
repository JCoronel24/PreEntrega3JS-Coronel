let camiones = [
    {
        marca: 'Mercedes-Benz',
        modelo: 'Actros',
        url: 'https://panel.construproductos.com/images/thumbnails/65ef8047bad26.jpg',
        año: 2019
    },
    {
        marca: 'Volvo',
        modelo: 'FH',
        url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPeeSVZyKSVhLc6gS07VEqcwFngCbEaawtGOLZ53jgmg&s',
        año: 2018
    },
    {
        marca: 'Scania',
        modelo: 'S500',
        url : 'https://img.remediosdigitales.com/809da4/toyota-camion-fcev-1/200_200.jpeg',
        año: 2020
    },
    {
        marca: 'Mercedes-Benz',
        modelo: 'Atego',
        url : 'https://es-data.manualslib.com/product-images/5a3/212078/200x200/komatsu-hm400-3m0-camiones.jpg',
        año: 2017
    }
];

// Obtener los datos guardados del almacenamiento local al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    // Obtener los datos guardados o inicializarlos si no hay ninguno
    let storedCamiones = JSON.parse(localStorage.getItem('camiones')) || camiones;

    // Mostrar los camiones guardados
    mostrarCamiones(storedCamiones);
});

// Elementos del DOM
let containerCamiones = document.getElementById('Camiones'); 
let inputModeloCamion = document.getElementById('modeloCamion');
let inputUrlCamion = document.getElementById('urlCamion');
let inputMarcaCamion = document.getElementById('marcaCamion');
let inputAnoCamion = document.getElementById('anoCamion');
let button = document.getElementById('agregar');

// Event listener para el botón de agregar
button.addEventListener("click", agregarCamion);

// Función para agregar un camión
function agregarCamion () {
    let camion = {
        marca: inputMarcaCamion.value,
        modelo: inputModeloCamion.value,
        url: inputUrlCamion.value,
        año: inputAnoCamion.value
    }

    // Agregar el camión a la lista
    camiones.push(camion);

    // Guardar los camiones en el almacenamiento local
    localStorage.setItem('camiones', JSON.stringify(camiones));

    // Limpiar inputs
    inputModeloCamion.value = '';
    inputUrlCamion.value = '';
    inputMarcaCamion.value = '';
    inputAnoCamion.value = '';

    // Actualizar visualización camiones
    mostrarCamiones(camiones);
}

// Función para mostrar los camiones
function mostrarCamiones(camiones) {
    containerCamiones.innerHTML = '';

    camiones.forEach(camion => {
        const camionElemento = document.createElement('div');
        camionElemento.classList.add('camion');
        camionElemento.innerHTML = `
            <h2>${camion.modelo}</h2>
            <img src=${camion.url}></img>
            <p>Marca: ${camion.marca}</p>
            <p>Año: ${camion.año}</p>
            <button id=${camion.modelo}>Eliminar</button>
        `;
        containerCamiones.appendChild(camionElemento);
    });

    // Actualizar botones eliminar
    actualizarBotonesEliminar();
}

// Función para filtrar los camiones
function filtrarCamiones() {
    let filtro = filtroCamionesInput.value.trim().toLowerCase();

    // Filtrar camiones basado en el filtro
    let camionesFiltrados = camiones.filter(camion => {
        let modeloCamion = camion.modelo.toLowerCase();
        let marcaCamion = camion.marca.toLowerCase();
        let anoCamion = camion.año.toString(); // Convertir año a string para comparación

        return modeloCamion.includes(filtro) || marcaCamion.includes(filtro) || anoCamion.includes(filtro);
    });

    // Mostrar los camiones filtrados
    mostrarCamiones(camionesFiltrados);
}

let filtroCamionesInput = document.getElementById('filtroCamiones');
filtroCamionesInput.addEventListener('input', filtrarCamiones);

// Función para eliminar un camión
function eliminarCamion(event) {
    let modelo = event.target.id;

    // Filtrar los camiones para eliminar el camión correspondiente
    camiones = camiones.filter(camion => camion.modelo !== modelo);

    // Guardar los camiones actualizados en el almacenamiento local
    localStorage.setItem('camiones', JSON.stringify(camiones));

    // Actualizar visualización camiones
    mostrarCamiones(camiones);
}

// Función para actualizar los eventos de los botones eliminar
function actualizarBotonesEliminar() {
    let botonesEliminar = document.querySelectorAll('button');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', eliminarCamion);
    });
}








