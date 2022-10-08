// Botones
const botonesIniciarJuego = document.querySelectorAll('.botonIniciar');
const botonAgregarPalabra = document.querySelector("#botonAgregarPalabra");

// Áreas
const contenedorInicio = document.querySelector("#contenedorInicio");
const contenedorJuego = document.querySelector("#contenedorJuego");

// Palabras
const palabraProgramación = ["HTML", "CSS", "JAVASCRIPT", "REACT", "NODEJS", "JAVA", "C", "GIT", "GITHUB", "SQL"];
const palabrasEmpresas = ["ALURA", "GLOBANT", "ALKEMY", "ACCENTURE", "SOFTTEK", "DESPEGAR", "TELEFONICA", "ORACLE", "CODERHOUSE", "GOOGLE"];
const palabrasAnimales = ["MONO", "GATO", "PERRO", "ELEFANTE", "AVESTRUZ", "LEON", "PAJARO", "LORO", "SERPIENTE", "DELFIN"]
const palabrasPaíses = ["ARGENTINA", "BRASIL", "PERU", "URUGUAY", "CHILE", "BOLIVIA", "ECUADOR", "MEXICO", "PARAGUAY", "COLOMBIA"];
const palabrasTodos = palabraProgramación.concat(palabrasEmpresas).concat(palabrasPaíses).concat(palabrasAnimales);

const nuevasPalabras = [];

palabrasTodos.sort();   // Esto es para que tenga más desorden y no estén separas por categoría las palabras

let palabrasSecretas = [];
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