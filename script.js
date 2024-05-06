// Función para cargar los camiones desde el almacenamiento local
function cargarCamiones() {
    const camionesGuardados = localStorage.getItem('camiones');
    if (camionesGuardados) {
        return JSON.parse(camionesGuardados);
    } else {
        return [];
    }
}

// Función para guardar los camiones en el almacenamiento local
function guardarCamiones(camiones) {
    localStorage.setItem('camiones', JSON.stringify(camiones));
}

// Función para agregar un nuevo camión
function agregarCamion(camion) {
    const camiones = cargarCamiones();
    camiones.push(camion);
    guardarCamiones(camiones);
}

// Función para filtrar camiones por marca
function filtrarPorMarca(marca) {
    const camiones = cargarCamiones();
    return camiones.filter(camion => camion.marca.toLowerCase() === marca.toLowerCase());
}

// Función para filtrar camiones por modelo
function filtrarPorModelo(modelo) {
    const camiones = cargarCamiones();
    return camiones.filter(camion => camion.modelo.toLowerCase() === modelo.toLowerCase());
}

// Función para filtrar camiones por año
function filtrarPorAño(año) {
    const camiones = cargarCamiones();
    return camiones.filter(camion => camion.año === año);
}

// Función para mostrar camiones en la interfaz de usuario
function mostrarCamiones(camiones) {
    const listaCamiones = document.getElementById('listaCamiones');
    listaCamiones.innerHTML = ''; // Limpiar la lista antes de agregar los camiones filtrados

    camiones.forEach(camion => {
        const listItem = document.createElement('li');
        listItem.textContent = `Marca: ${camion.marca}, Modelo: ${camion.modelo}, Año: ${camion.año}`;
        listaCamiones.appendChild(listItem);
    });
}

// Función para manejar el evento de clic en el botón "Filtrar Camiones"
function manejarFiltrarCamiones() {
    const criterio = document.getElementById('criterio').value;
    const valor = document.getElementById('valor').value;

    let camionesFiltrados = [];

    switch (criterio) {
        case 'marca':
            camionesFiltrados = filtrarPorMarca(valor);
            break;
        case 'modelo':
            camionesFiltrados = filtrarPorModelo(valor);
            break;
        case 'año':
            camionesFiltrados = filtrarPorAño(parseInt(valor));
            break;
        default:
            // Opción inválida
            break;
    }

    // Mostrar los camiones filtrados en la interfaz de usuario
    mostrarCamiones(camionesFiltrados);
}

// Función para manejar el evento de clic en el botón "Agregar Camión"
function manejarAgregarCamion() {
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const año = document.getElementById('año').value;

    const nuevoCamion = {
        marca: marca,
        modelo: modelo,
        año: año
    };

    agregarCamion(nuevoCamion);

    // Limpiar el formulario después de agregar el camión
    document.getElementById('marca').value = '';
    document.getElementById('modelo').value = '';
    document.getElementById('año').value = '';

    // Actualizar la lista de camiones mostrada en la interfaz de usuario
    manejarFiltrarCamiones();
}

// Función para inicializar la página
function inicializar() {
    // Agregar oyentes de eventos
    document.getElementById('filtrarCamionesBtn').addEventListener('click', manejarFiltrarCamiones);
    document.getElementById('agregarCamionBtn').addEventListener('click', manejarAgregarCamion);

    // Mostrar todos los camiones al cargar la página
    manejarFiltrarCamiones();
}

// Ejecutar la función de inicialización cuando la página esté lista
document.addEventListener('DOMContentLoaded', inicializar);



// limpiar local storage
// localStorage.clear();