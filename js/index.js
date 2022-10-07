// Botones
const botonIniciarJuego = document.querySelector('#botonIniciar');
const botonAgregarPalabra = document.querySelector("#botonAgregarPalabra");

// Áreas
const contenedorInicio = document.querySelector("#contenedorInicio");
const contenedorJuego = document.querySelector("#contenedorJuego");

// Palabras
const palabrasSecretas = ["ARGENTINA","JAVASCRIPT","HTML","CSS","ALURA","BRASIL","PERU","URUGUAY","CHILE","BOLIVIA","ECUADOR"];
let palabra = '';

const botonDudas = document.querySelector("#botonDudas");
botonDudas.addEventListener('click', () => {
    const swalCustom = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
        },
        buttonsStyling: false
    })

    swalCustom.fire({
        title: 'Instrucciones',
        text: 'Escribí desde el teclado para jugar.',
        confirmButtonText: '¡Entendido!',
    });
});

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})