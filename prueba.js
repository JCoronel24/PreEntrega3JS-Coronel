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

let containerCamiones = document.getElementById('Camiones'); 
let inputModeloCamion = document.getElementById('modeloCamion');
let inputUrlCamion = document.getElementById('urlCamion');
let inputMarcaCamion = document.getElementById('marcaCamion');
let inputAnoCamion = document.getElementById('anoCamion');
let button = document.getElementById('agregar');


button.addEventListener("click", agregarCamion);

function agregarCamion () {
    let camion = {
        marca: inputMarcaCamion.value,
        modelo: inputModeloCamion.value,
        url: inputUrlCamion.value,
        año: inputAnoCamion.value
    }
    camiones.push(camion);
    
    // Limpiar inputs
    inputModeloCamion.value = '';
    inputUrlCamion.value = '';
    inputMarcaCamion.value = '';
    inputAnoCamion.value = '';

    // Actualizar visualización camiones
    mostrarCamiones(camiones);

    containerCamiones.innerHTML += `
    <div class="camion">
        <h2>${camion.modelo}</h2>
        <img src=${camion.url}></img>
        <p>Marca: ${camion.marca}</p>
        <p>Año: ${camion.año}</p>
        <button id=${camion.modelo}>Eliminar</button>
    </div>
`
}



camiones.forEach(camion => {
    containerCamiones.innerHTML += `
    <div class="camion">
        <h2>${camion.modelo}</h2>
        <img src=${camion.url}></img>
        <p>Marca: ${camion.marca}</p>
        <p>Año: ${camion.año}</p>
        <button id=${camion.modelo}>Eliminar</button>
    </div>
`
})


// boton eliminar de cada camion

let botonesEliminar = document.querySelectorAll('button');
botonesEliminar.forEach(boton => {
    boton.addEventListener('click', eliminarCamion);
})

function eliminarCamion(event) {
    let modelo = event.target.id;
    camiones = camiones.filter(camion => camion.modelo !== modelo);
    containerCamiones.innerHTML = '';
    camiones.forEach(camion => {
        containerCamiones.innerHTML += `
        <div class="camion">
            <h2>${camion.modelo}</h2>
            <img src=${camion.url}></img>
            <p>Marca: ${camion.marca}</p>
            <p>Año: ${camion.año}</p>
            <button id=${camion.modelo}>Eliminar</button>
        </div>
    `
    })
    botonesEliminar = document.querySelectorAll('button');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', eliminarCamion);
    })
}


let filtroCamionesInput = document.getElementById('filtroCamiones');
filtroCamionesInput.addEventListener('input', filtrarCamiones);

function filtrarCamiones() {
    let filtro = filtroCamionesInput.value.trim().toLowerCase();

    // Obtener todos los elementos de camión
    let camionesElementos = document.querySelectorAll('.camion');

    camionesElementos.forEach(camionElement => {
        let modeloCamion = camionElement.querySelector('h2').textContent.toLowerCase();

        if (modeloCamion.includes(filtro)) {
            camionElement.style.display = 'flex'; 
        } else {
            camionElement.style.display = 'none'; 
        }
    });
}









