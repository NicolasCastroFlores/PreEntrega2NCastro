document.getElementById('verificarButton').addEventListener('click', function () {
    const nombreUsuario = document.getElementById('nombreUsuarioInput').value || '';
    const mensaje = nombreUsuario ? `¡Hola ${nombreUsuario}! Bienvenido a Cinema233` : 'El campo de nombre de usuario está vacío.';
    console.log(mensaje);
    const nombreUsuarioJSON = JSON.stringify(nombreUsuario);
    localStorage.setItem('usuario', nombreUsuarioJSON);
});

const entradas = [
    {
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
    },
];

const paquetes = [
    {
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
    },
];

const contenedorPaquetes = document.getElementById("paquetes");
const contenedorEntradas = document.getElementById("entradas");

function agregarElementoAlCarrito(elemento, tipo) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push({
        elemento,
        tipo
    });
    localStorage.setItem('carrito', JSON.stringify(carrito));
    carritoActualizado();
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

    mostrarTotalAPagarPaquetesEntradas();
}

function eliminarDelCarrito(nombreProducto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(producto => producto.elemento.nombre !== nombreProducto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    carritoActualizado();
}

function mostrarTotalAPagarPaquetesEntradas() {
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



////////////////// 

carritoActualizado();
const apiKey = "dfefc6d7";
const lista = document.querySelector("#listado");
const totalPrecioPelicula = document.querySelector("#totalpagar");
const carritoPeliculas = new CarritoParaPeliculas();


function CarritoParaPeliculas() {
    this.carritoPeliculas = JSON.parse(localStorage.getItem('carritoPeliculas')) || [];

    this.agregarAlCarrito = function (pelicula) {
        pelicula.precio = parseFloat((Math.random() * 10).toFixed(2));
        this.carritoPeliculas.push(pelicula);
        this.guardarEnLocalStorage();
        console.log(`¡"${pelicula.Title}" ha sido agregada al carrito!`);
        this.renderizarEnDiv('carritoPeliculas');
    };

    this.quitarDelCarrito = function (index) {
        const peliculaEliminada = this.carritoPeliculas.splice(index, 1)[0];
        this.guardarEnLocalStorage();
        console.log(`Película "${peliculaEliminada.Title}" ha sido quitada del carrito.`);
        this.renderizarEnDiv('carritoPeliculas');
    };


    this.guardarEnLocalStorage = function () {
        localStorage.setItem('carritoPeliculas', JSON.stringify(this.carritoPeliculas));
    };

    this.renderizarEnDiv = function (divId) {
        const carritoContainer = document.getElementById(divId);

        if (carritoContainer) {
            carritoContainer.innerHTML = `
                <h2>Carrito de Películas</h2>
                <ul>
                    ${this.carritoPeliculas.map((pelicula, index) => `
                        <li>
                            ${pelicula.Title} - Precio: $${pelicula.precio.toFixed(2)}
                            <button onclick="carritoPeliculas.quitarDelCarrito(${index})">Eliminar</button>
                        </li>`).join('')}
                </ul>
                <p>Total: $${this.calcularTotal().toFixed(2)}</p>
            `;
        } else {
            console.error(`No se encontró el elemento con el ID ${divId}`);
        }
    };

    this.calcularTotal = function () {
        let total = 0;
        this.carritoPeliculas.forEach(pelicula => {
            total += pelicula.precio || 0;
        });
        return total;
    };
}

function manejarClicEnPelicula(resultado) {
    carritoPeliculas.agregarAlCarrito(resultado);
    mostrarTotalAPagarPeliculas();
}

async function cargarPeliculasDesdeAPI() {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=terminator`);

        if (!response.ok) {
            throw new Error('Error al cargar las películas desde la API');
        }

        const productos = await response.json();
        mostrarResultados(productos.Search);
    } catch (error) {
        console.error('Error al cargar las películas desde la API:', error.message);
    }
}

function mostrarResultados(resultados) {
    lista.innerHTML = "";

    resultados.forEach(resultado => {
        const pelicula = document.createElement("div");
        pelicula.innerHTML = `
            <h2>${resultado.Title}</h2>
            <p>Año: ${resultado.Year}</p>
            <p>Precio: $${(Math.random() * 10).toFixed(2)}</p>
            <img src="${resultado.Poster}" alt="${resultado.Title} Poster">
        `;

        pelicula.addEventListener('click', () => manejarClicEnPelicula(resultado));

        lista.appendChild(pelicula);
    });

    carritoPeliculas.renderizarEnDiv('carritoPeliculas');
}

cargarPeliculasDesdeAPI();

function calcularTotalPeliculas() {
    let total = 0;
    let carritoPeliculas = JSON.parse(localStorage.getItem('carritoPeliculas')) || [];

    carritoPeliculas.forEach(pelicula => {
        total += pelicula.precio || 0;
    });

    return total;
}

function ResultadoFinalDelValorTotal() {
    let totalPaquetes = calcularTotalPaquetesEntradas(paquetes);
    let totalPeliculas = calcularTotalPeliculas();

    let resultadoFinal = totalPaquetes + totalPeliculas;

    let resultadoFinalElement = document.getElementById('resultadoFinalElement');
    if (resultadoFinalElement) {
        resultadoFinalElement.innerHTML = `<p>El valor total a abonar es de $${resultadoFinal.toFixed(2)}. ¡Disfrute su experiencia en Cinema233!</p>`;
    } else {
        console.error('Elemento HTML no encontrado para mostrar el resultado final.');
    }
}

function mostrarTotalAPagarPeliculas() {
    let resultado = calcularTotalPeliculas();
    let totalPagarPeliculasElement = document.getElementById('totalpagarPeliculas');
    if (totalPagarPeliculasElement) {
        totalPagarPeliculasElement.innerHTML = `<p>El valor a abonar por películas es de $${resultado}. ¡Disfrute su película!</p>`;
    } else {
        console.error('Elemento HTML no encontrado para mostrar el total a pagar por películas.');
    }
}
