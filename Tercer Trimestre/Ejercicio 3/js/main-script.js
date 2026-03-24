let btnInicio = document.getElementById('btnInicio');
let btnEnviar = document.getElementById('btnEnviar'); 
let inputRespuesta = document.getElementById('inputRespuesta');

let paises = ['España', 'Portugal', 'Rusia', 'Alemania', 'Estados Unidos', 'Japón', 'China', 'Francia', 'Reino Unido', 'Austria'];
let capitales = ['Madrid', 'Lisboa', 'Moscú', 'Berlín', 'Washington DC', 'Tokio', 'Pekín', 'París', 'Londres', 'Viena'];

let indiceActual = 0;
let numAcertadas = 0;

function empezarJuego() {
    indiceActual = 0;
    numAcertadas = 0;
    document.getElementById('pPregunta').innerText = '';
    document.getElementById('pResultado').innerText = '';
    mostrarPregunta();
}

function mostrarPregunta() {
    if (indiceActual < paises.length) {
        document.getElementById('pPregunta').innerText = `¿Cuál es la capital de ${paises[indiceActual]}?`;
        inputRespuesta.value = ""; 
        inputRespuesta.focus();
    } else {
        document.getElementById('pPregunta').innerText = "¡Juego terminado!";
        document.getElementById('pResultado').innerText = `Has acertado ${numAcertadas} de ${paises.length}.`;
    }
}

function verificarRespuesta() {
    let respuestaUsuario = inputRespuesta.value.trim();

    if (respuestaUsuario.toLowerCase() === capitales[indiceActual].toLowerCase()) {
        numAcertadas++;
        document.getElementById('pResultado').innerText = '¡Correcto!';
    } else {
        document.getElementById('pResultado').innerText = `Error. Era ${capitales[indiceActual]}`;
    }
    indiceActual++;
    setTimeout(mostrarPregunta, 1500); // Esperamos 1.5s para que el usuario vea si acertó
}

btnInicio.addEventListener('click', empezarJuego);
btnEnviar.addEventListener('click', verificarRespuesta);