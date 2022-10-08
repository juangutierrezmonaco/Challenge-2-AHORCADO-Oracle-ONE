// DOM
const botonSubmitPalabra = document.querySelector('#submitPalabra');
const botonVolverAtras = document.querySelector('#volverAtras');
const botonSubmitPalabras = document.querySelector('#submitPalabras');

const palabraInput = document.querySelector('#palabraInput');
const paraAgregarContainer = document.querySelector('#paraAgregar');

// Variables
const palabrasParaAgregar = [];

const palabraEsValida = (palabra) => {
    const pattern = new RegExp('^[A-Za-z]{1,20}$');

    return pattern.test(palabra);
}

const agregarPalabra = () => {
    const palabra = palabraInput.value.toUpperCase();
    if (palabraEsValida(palabra)) {

        // Si está repetida
        if (palabrasParaAgregar.includes(palabra)) {
            Toast.fire({
                icon: 'info',
                title: '¡Ya ingresaste esa palabra!'
            })
        } else {
            // Agrego al arreglo
            palabrasParaAgregar.push(palabra);

            // Agrego al DOM
            paraAgregarContainer.innerText = `Palabras a agregar: ${palabrasParaAgregar.join(', ')}`;
            palabraInput.value = '';

            // Si ya ingresó 8, deshabilito el botón.
            palabrasParaAgregar.length == 8 && botonSubmitPalabra.classList.add('btn-disabled');
        }

    } else {
        let reglas = document.querySelector("#reglas");
        reglas.classList.add("shake-horizontal", 'text-red-500');

        reglas.addEventListener("animationend", () => {
            reglas.classList.remove("shake-horizontal", 'text-red-500');
        });
    }
}

// Activar contenedor
botonAgregarPalabra.addEventListener('click', () => {
    const contenedorPalabra = document.querySelector('.contenedorPalabra');
    contenedorPalabra.classList.remove('hidden');

    iniciarEventosPalabras();
})

const clearData = () => {
    // Setteo de variables
    palabrasParaAgregar.splice(0, palabrasParaAgregar.length);

    // Setteo del DOM
    paraAgregarContainer.innerText = 'Palabras a agregar: ';
    palabraInput.value = '';
}

const iniciarEventosPalabras = () => {
    const contenedorPalabra = document.querySelector('.contenedorPalabra');

    botonSubmitPalabra.addEventListener('click', agregarPalabra);

    botonVolverAtras.addEventListener('click', () => {
        contenedorPalabra.classList.add('hidden');
        clearData();
    })

    botonSubmitPalabras.addEventListener('click', () => {
        // Agrego las palabras
        nuevasPalabras.push(...palabrasParaAgregar);
        palabrasTodos.push(...palabrasParaAgregar);

        // Modifico el DOM
        document.querySelector('#botonMisPalabras').classList.remove('btn-disabled');

        // Setteo las condiciones iniciales y saco de la vista el contenedor
        contenedorPalabra.classList.add('hidden');
        clearData();
    })
}
