

document.getElementById('verificarButton').addEventListener('click', function () {
    const nombreUsuario = document.getElementById('nombreUsuarioInput').value || '';

    const mensaje = nombreUsuario ? `¡Hola ${nombreUsuario}! Bienvenido a Cinema233` : 'El campo de nombre de usuario está vacío.';
    console.log(mensaje);

    const nombreUsuarioJSON = JSON.stringify(nombreUsuario); // Convierte a JSON
    localStorage.setItem('usuario', nombreUsuarioJSON); // Guarda en el localStorage
});


/////////HASTA ACA OK

const entradas = [{
    precio: 4500,
    nombre: "General",
    disponible: true
},

{
    precio: 9000,
    nombre: "Full Experience",
    disponible: true
},


{
    precio: 8500,
    nombre: "VIP",
    disponible: true
},


{
    precio: 6000,
    nombre: "2x1",
    disponible: true
},]

const paquetes = [{

    precio: 4200,
    nombre: "La Verdadera",
    descripción: "Balde de Pochoclos grande y dos bebidas medianas",
    disponible: true
},

{
    precio: 6500,
    nombre: "La Bomba",
    descripción: "Balde de Pochoclos extra grande y dos bebidas agrandadas",
    disponible: true
},

{
    precio: 2900,
    nombre: "Opción 1",
    descripción: "Gaseosa a elección + pochoclos medianos",
    disponible: true
},

{
    precio: 3550,
    nombre: "Opción 2",
    descripción: "Gaseosa a elección grande + pochoclos extra grandes",
    disponible: true
},


{
    precio: 3600,
    nombre: "La ideal",
    descripción: "Cerveza linea Temple + nachos o tequeños",
    disponible: true
},]

const contenedorPaquetes = document.getElementById("paquetes");
const contenedorEntradas = document.getElementById("entradas");

function agregarElementoAlCarrito(elemento, tipo) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    carrito.push({
        elemento,
        tipo
    });
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guarda el carrito en localStorage
    carritoActualizado(); // Función para actualizar la visualización del carrito
}

function carritoActualizado() {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoElement = document.getElementById('carrito');
    carritoElement.innerHTML = '<h2>Carrito</h2>';

    carritoGuardado.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.classList.add('producto');
        productoElement.innerHTML = `
            ${producto.elemento.nombre} - Tipo: ${producto.tipo}
            <button onclick="eliminarDelCarrito('${producto.elemento.nombre}')">Eliminar</button>
        `;
        carritoElement.appendChild(productoElement);
    });

    mostrarTotalAPagar();
}

function eliminarDelCarrito(nombreProducto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    carrito = carrito.filter(producto => producto.elemento.nombre !== nombreProducto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    carritoActualizado();
}

function mostrarTotalAPagar() {
    let resultado = 0;
    let carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];

    carritoGuardado.forEach(producto => {
        resultado += producto.elemento.precio;
    });

    let totalPagarElement = document.getElementById('totalpagar');
    totalPagarElement.innerHTML = `<p>El valor a abonar es de $${resultado}. ¡Disfrute su película!</p>`;
}

paquetes.forEach(paquete => {
    const paqueteElement = document.createElement("div");
    paqueteElement.textContent = `Nombre: ${paquete.nombre}, Precio: $${paquete.precio}`;

    const botonAgregar = document.createElement("button");
    botonAgregar.textContent = "Agregar al carrito";
    botonAgregar.addEventListener("click", () => {
        agregarElementoAlCarrito(paquete, 'paquete');
    });

    paqueteElement.appendChild(botonAgregar);
    contenedorPaquetes.appendChild(paqueteElement);
});

entradas.forEach(entrada => {
    const entradaElement = document.createElement("div");
    entradaElement.textContent = `Nombre: ${entrada.nombre}, Precio: $${entrada.precio}`;

    const botonAgregar = document.createElement("button");
    botonAgregar.textContent = "Agregar al carrito";
    botonAgregar.addEventListener("click", () => {
        agregarElementoAlCarrito(entrada, 'entrada');
    });

    entradaElement.appendChild(botonAgregar);
    contenedorEntradas.appendChild(entradaElement);
});

carritoActualizado();


///////////////////////////////////////////////////////////CODIGOVIEJO

// const contenedorEntradas = document.getElementById("entradas");

// function agregarEntradaAlCarrito(nombreEntrada) {
//     let entrada = entradas.find(entrada => entrada.nombre === nombreEntrada);

//     if (entrada) {
//         carrito.push(entrada);
//         console.log(`${nombreEntrada} se agregó de forma exitosa.`);
//     } else {
//         console.log(`${nombreEntrada} no existe o no está disponible por ahora.`);
//     }
// }

// entradas.forEach(entrada => {
//     const entradaElement = document.createElement("div");
//     entradaElement.textContent = `Nombre: ${entrada.nombre}, Precio: $${entrada.precio}`;

//     const botonAgregar = document.createElement("button");
//     botonAgregar.textContent = "Agregar al carrito";
//     botonAgregar.addEventListener("click", () => {
//         agregarEntradaAlCarrito(entrada.nombre);
//     });


//     entradaElement.appendChild(botonAgregar);

//     contenedorEntradas.appendChild(entradaElement);
// });

// function agregarEntradaAlCarrito(nombreEntrada) {
//     let entrada = entradas.find(entrada => entrada.nombre === nombreEntrada);

//     if (entrada) {
//         carrito.push(entrada);
//         actualizarCarritoDOM();
//         console.log(`${nombreEntrada} se agregó de forma exitosa.`);
//     } else {
//         console.log(`${nombreEntrada} no existe o no esta disponible por ahora.`);
//     }
// }

// function carritoActualizado() {

//     let carritoContainer = document.getElementById('carrito-container');


//     carritoContainer.innerHTML = '';

//     carrito.forEach(producto => {
//         let li = document.createElement('li');
//         li.textContent = `${producto.nombre} - Precio: $${producto.precio}`;
//         carritoContainer.appendChild(li);
//     });
// }

// function agregarEntradaAlCarrito(nombreEntrada) {
//     let entrada = entradas.find(entrada => entrada.nombre === nombreEntrada);

//     if (entrada) {
//         carrito.push(entrada);
//         const carritoElement = document.getElementById('carrito');
//         carritoElement.innerHTML += `<div class="producto">${nombreEntrada}</div>`;
//         console.log(`${nombreEntrada} se agregó de forma exitosa.`);
//     } else {
//         console.log(`${nombreEntrada} no existe o no está disponible por ahora.`);
//     }
// }

// function carritoActualizado() {
//     const carritoElement = document.getElementById('carrito');
//     carritoElement.innerHTML = '<h2>Carrito</h2>';

//     carrito.forEach(producto => {
//         const productoElement = document.createElement('div');
//         productoElement.classList.add('producto');
//         productoElement.innerHTML = `
//             ${producto.nombre}
//             <button onclick="eliminarDelCarrito('${producto.nombre}')">Eliminar</button>
//         `;
//         carritoElement.appendChild(productoElement);
//     });

//     mostrarTotalAPagar();
// }

// function agregarEntradaAlCarrito(nombreEntrada) {
//     let entrada = entradas.find(entrada => entrada.nombre === nombreEntrada);

//     if (entrada) {
//         carrito.push(entrada);
//         console.log(`${nombreEntrada} se agregó de forma exitosa.`);
//         carritoActualizado();
//     } else {
//         console.log(`${nombreEntrada} no existe o no está disponible por ahora.`);

//     }
// }

// function eliminarDelCarrito(nombreProducto) {
//     carrito = carrito.filter(producto => producto.nombre !== nombreProducto);
//     console.log(`${nombreProducto} se eliminó correctamente.`);
//     carritoActualizado();
//     eliminarDelCarritoAgregado(nombreProducto);
// }

// function eliminarDelCarritoAgregado(nombreProducto) {
//     let carritoElement = document.getElementById('carrito');
//     let productos = carritoElement.getElementsByClassName('producto');

//     for (let i = 0; i < productos.length; i++) {
//         let producto = productos[i];
//         if (producto.textContent.includes(nombreProducto)) {
//             carritoElement.removeChild(producto);
//         }
//     }
// }
// function eliminarDelCarrito(nombreProducto) {
//     carrito = carrito.filter(producto => producto.nombre !== nombreProducto);
//     console.log(`${nombreProducto} se eliminó correctamente.`);
//     carritoActualizado();
//     eliminarDelCarritoAgregado();
// }


// const contenedorPaquetes = document.getElementById("paquetes");

// function agregarPaqueteAlCarrito(nombrePaquete) {
//     let paquete = paquetes.find(paquete => paquete.nombre === nombrePaquete);

//     if (paquete) {
//         carrito.push(paquete);
//         console.log(`${nombrePaquete} se agregó de forma exitosa.`);
//         carritoActualizado();
//     } else {
//         console.log(` ${nombrePaquete} no existe o no esta disponible por ahora.`);
//     }
// }

// paquetes.forEach(paquete => {
//     const paqueteElement = document.createElement("div");
//     paqueteElement.textContent = `Nombre: ${paquete.nombre}, Precio: $${paquete.precio}`;

//     const botonAgregar = document.createElement("button");
//     botonAgregar.textContent = "Agregar al carrito";
//     botonAgregar.addEventListener("click", () => {
//         agregarPaqueteAlCarrito(paquete.nombre);
//     });

//     paqueteElement.appendChild(botonAgregar);

//     contenedorPaquetes.appendChild(paqueteElement);
// });



// function mostrarTotalAPagar() {
//     let resultado = carrito.reduce((accum, p) => accum + p.precio, 0);
//     let totalPagarElement = document.getElementById('totalpagar');
//     totalPagarElement.innerHTML = `<p>El valor a abonar es de $${resultado}. ¡Disfrute su película!</p>`;
// }

// mostrarTotalAPa