// DOM
const letrasCorrectasContainer = document.querySelector('.letras-correctas');
const letrasIncorrectasContainer = document.querySelector('.letras-incorrectas');
const botonDesistir = document.querySelector('#botonDesistir');
const botonReiniciar = document.querySelector("#botonReiniciar");
const tituloPantalla = document.querySelector('#tituloJuego');

// Variables
const letrasCorrectas = [];
const letrasIncorrectas = [];
const indicesPalabrasUsadas = [];
let vidas = 9;
let aciertos = 0;

// Funciones sobre la palabra o validaciones
const generateRandomIndexWithoutRep = (palabras) => {
    let randomNumber;

    if (indicesPalabrasUsadas.length < palabras.length) {
        do {
            randomNumber = Math.floor(Math.random() * palabras.length);
        } while (indicesPalabrasUsadas.includes(randomNumber));
    } else {
        randomNumber = -1;
    }

    return randomNumber;
}

const getRandomPalabra = (palabras) => {
    const randomIndex = generateRandomIndexWithoutRep(palabras); 

    if (randomIndex != -1) {
        indicesPalabrasUsadas.push(randomIndex);
        return palabras[randomIndex];
    } else {
        return '';
    }
}

const dibujarGuiones = (n) => {
    for (let i = 0; i < n; i++) {
        const guion = document.createElement('span');
        guion.classList.add('letra-correcta');
        guion.innerHTML = '&nbsp&nbsp';
        letrasCorrectasContainer.appendChild(guion);
    }
}

const letraEsValida = (letra) => {
    const pattern = new RegExp('^[A-Z]$');

    return pattern.test(letra);
}

const getIndicesDeLetra = (palabra, letra) => {
    const indices = [];
    for (let i = 0; i < palabra.length; i++) {
        palabra[i] == letra && indices.push(i);
    }

    return indices;
}

// Juego
botonesIniciarJuego.forEach((boton) =>  {
    boton.addEventListener("click", ({ target }) => {
        // Selecciono la lista de palabras
        const valueBoton = target.innerText;
        switch (valueBoton) {
            case 'Programación':
                palabrasSecretas = palabraProgramación;
                break;
            case 'Empresas de Tecnología':
                palabrasSecretas = palabrasEmpresas;
                break;
            case 'Animales':
                palabrasSecretas = palabrasAnimales;
                break;
            case 'Países':
                palabrasSecretas = palabrasPaíses;
                break;
            case 'Mis palabras':
                palabrasSecretas = nuevasPalabras;
                break;
            case 'Todas las categorías':
                palabrasSecretas = palabrasTodos;
                break;
        }

        // Setteo el título
        tituloPantalla.innerText = valueBoton;

        // Modifico el DOM
        contenedorInicio.classList.remove('container-active');
        contenedorInicio.classList.add('container-inactive');
    
        contenedorJuego.classList.remove('container-inactive');
        contenedorJuego.classList.add('container-active');
    
        cargarJuego();
    }) 
});


const setCondicionesIniciales = () => {
    // Setteo de variables
    letrasCorrectas.splice(0, letrasCorrectas.length);
    letrasIncorrectas.splice(0, letrasIncorrectas.length);
    vidas = 9;
    aciertos = 0;

    // Setteo del DOM
    letrasCorrectasContainer.innerHTML = '';
    letrasIncorrectasContainer.innerHTML = '';

    // Setteo horca
    const actualImage = document.querySelector('.image-active');
    const firstImage = actualImage.parentElement.querySelector('img');
    actualImage.classList.remove('image-active');
    actualImage.classList.add('image-inactive');

    firstImage.classList.remove('image-inactive');
    firstImage.classList.add('image-active');
}

const cargarJuego = (generateNewWord = true) => {
    setCondicionesIniciales();

    // Flag para saber si generar una nueva palabra o dejar la misma
    palabra = generateNewWord ? getRandomPalabra(palabrasSecretas) : palabra;

    if (palabra){
        dibujarGuiones(palabra.length);
        window.addEventListener('keydown', inputHandler);   
        
        // Eventos de botones de juego
        botonDesistir.addEventListener('click', () => {
            finDelJuego('./images/lose.jpg', 'Imagen de derrota en juego del ahorcado', 'Perdiste', `La palabra era: ${palabra}`, 'red');
        });

        botonReiniciar.addEventListener('click', () => {
            cargarJuego(false);
        });
    } else {   // Si ya usé todas las palabras
        const swalCustom = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
            },
            buttonsStyling: false
        })
    
        swalCustom.fire({
            icon: 'info',
            title: 'No hay más palabras en esta categoría.',
            confirmButtonText: 'Volver al menú principal',
        }).then(() => {
            resetearJuego();
        })
    }
}

const resetearJuego = () => {
    setCondicionesIniciales();
    indicesPalabrasUsadas.splice(0, indicesPalabrasUsadas.length);
    
    contenedorJuego.classList.remove('container-active');
    contenedorJuego.classList.add('container-inactive');

    contenedorInicio.classList.remove('container-inactive');
    contenedorInicio.classList.add('container-active');
}

const inputHandler = (e) => {
    const letra = e.key.toUpperCase();
    if (letraEsValida(letra)) {
        agregarLetra(palabra, letra);
    } else {
        Toast.fire({
            icon: 'error',
            title: 'Caracter inválido'
        })
    }
}

const agregarLetra = (palabra, letra) => {
    const indices = getIndicesDeLetra(palabra, letra);

    if (indices.length > 0) {   // Letra correcta
        dibujarLetraCorrecta(letra, indices, palabra);
    } else {    // Letra incorrecta
        dibujarLetraIncorrecta(letra, palabra);
    }
}

const dibujarLetraCorrecta = (letra, indices, palabra) => {
    const letraCorretaExiste = letrasCorrectas.includes(letra);
    if (!letraCorretaExiste) {
        // Actualizo el DOM
        for (const index of indices) {
            letrasCorrectasContainer.childNodes[index].innerText = letra;
        }

        // La agrego al arreglo
        letrasCorrectas.push(letra);

        // Verifico si gana
        aciertos += indices.length;

        if ( aciertos == palabra.length ) {
            finDelJuego('./images/win.jpg', 'Imagen de victoria en juego del ahorcado', 'Ganaste', '¡Felicitaciones!', 'green');
        }
    } else {
        // Le aviso al usuario que ya está
        Toast.fire({
            icon: 'info',
            title: '¡Ya ingresaste esa letra!'
        })
    }
}

const dibujarLetraIncorrecta = (letra, palabra) => {
    const indiceLetrasInc = letrasIncorrectas.indexOf(letra);
    if (indiceLetrasInc == -1) {
        // Agrego al DOM
        const letraInc = document.createElement('span');
        letraInc.innerText = letra;
        letrasIncorrectasContainer.appendChild(letraInc);

        // Agrego al arreglo
        letrasIncorrectas.push(letra);

        // Le agrego una parte al ahorcado
        computarError(palabra);
    } else {
        // Le aviso al usuario que ya está
        const letraIncNode = letrasIncorrectasContainer.childNodes[indiceLetrasInc];
        letraIncNode.classList.add("shake-horizontal");

        letraIncNode.addEventListener("animationend", () => {
            letraIncNode.classList.remove("shake-horizontal");
        });
    }
}

const computarError = (palabra) => {
    const actualImage = document.querySelector('.image-active');
    const nextSibling = actualImage.nextElementSibling;

    if (nextSibling) {
        actualImage.classList.remove('image-active');
        actualImage.classList.add('image-inactive');

        nextSibling.classList.remove('image-inactive');
        nextSibling.classList.add('image-active');

        if (--vidas == 0) {
            finDelJuego('./images/lose.jpg', 'Imagen de derrota en juego del ahorcado', 'Perdiste', `La palabra era: ${palabra}`, 'red');
        }
    }
}

const finDelJuego = (imgUrl, imgAlt, title, subtitle, textColor) => {
    window.removeEventListener('keydown', inputHandler);
    const popUpNodo = document.querySelector('.result-popUp');
    popUpNodo.classList.remove('hidden');
    popUpNodo.classList.add('bg-black/20');
    popUpNodo.innerHTML = `<div class="planet"></div>`;

    setTimeout(() => {   
        popUpNodo.classList.add('bg-black/80'); 
        popUpNodo.innerHTML = `
        <img src=${imgUrl} alt=${imgAlt} class='rounded-lg'>
        <span class="text-4xl font-bowlby text-${textColor}-500 uppercase">${title}</span>
        <span class="text-lg font-bowlby italic text-${textColor}-400 uppercase">${subtitle}</span>
        <div class='flex gap-3 mt-4'>
            <button class="btn btn-info flex justify-center items-center gap-2" id='botonOtraPalabra'>
                <span>Probar con otra palabra</span>
                <i class="fa-solid fa-rotate"></i>
            </button>
            <button class="btn btn-success flex justify-center items-center gap-2" id='botonVolverAlMenu'>
                <span>Volver al menú principal</span>
                <i class="fa-solid fa-rotate-left"></i>
            </button>
        </div>
        `

        const botonOtraPalabra = popUpNodo.querySelector('#botonOtraPalabra');
        botonOtraPalabra.addEventListener('click', () => {
            popUpNodo.classList.add('hidden')
            cargarJuego();
        });

        const botonVolverAlMenu = popUpNodo.querySelector('#botonVolverAlMenu');
        botonVolverAlMenu.addEventListener('click', () => {
            popUpNodo.classList.add('hidden');
            resetearJuego();
        });

    }, 1000);
}
