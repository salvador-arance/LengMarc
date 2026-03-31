let btnInicio = document.getElementById('btnInicio');
let btnVerificar = document.getElementById('btnVerificar');
let btnEnviar = document.getElementById('btnEnviar'); 
let inputRespuesta = document.getElementById('inputRespuesta');
let indicesErrores = [];

let paises = ['España', 'Portugal', 'Rusia', 'Alemania', 'Estados Unidos', 'Japón', 'China', 'Francia', 'Reino Unido', 'Austria'];
let capitales = ['Madrid', 'Lisboa', 'Moscú', 'Berlín', 'Washington DC', 'Tokio', 'Pekín', 'París', 'Londres', 'Viena'];

let indiceActual = 0;
let numAcertadas = 0;


function empezarJuego() {
    indiceActual = 0;
    numAcertadas = 0;
    indicesErrores = [];
    document.getElementById('pPregunta').innerText = '';
    document.getElementById('pResultado').innerHTML = '';
    mostrarPregunta();
}

function mostrarPregunta() {
    document.getElementById('pResultado').innerHTML = ''
    btnEnviar.disabled = true;
    if (indiceActual < paises.length) {
        document.getElementById('pPregunta').innerText = `¿Cuál es la capital de ${paises[indiceActual]}?`;
        inputRespuesta.value = ""; 
        inputRespuesta.focus();
    } else {
        document.getElementById('pPregunta').innerText = "Juego terminado";
        document.getElementById('pResultado').innerHTML = `Has acertado ${numAcertadas} de ${paises.length}.`;

        for (let i = 0; i < indicesErrores.length; i++){
            document.getElementById('pResultado').innerHTML += `<p>La capital de  ${paises[indicesErrores[i]]} era ${capitales[indicesErrores[i]]}</p>`;
        }
    }
}

function verificarRespuesta() {
    let respuestaUsuario = inputRespuesta.value.trim();

    if (respuestaUsuario.toLowerCase() === capitales[indiceActual].toLowerCase()) {
        numAcertadas++;
        document.getElementById('pResultado').innerHTML = '<div style="background-color:green; margin: auto;"><p>¡Correcto!</p></div>';
    } else {
        document.getElementById('pResultado').innerHTML = `<div style="background-color:red; margin: auto;"><p>Error. Era ${capitales[indiceActual]}</p></div>`;
        indicesErrores.push(indiceActual);
    }

    btnEnviar.disabled = false;
}

function enviar() {
    ++ indiceActual;
    mostrarPregunta();
}

btnInicio.addEventListener('click', empezarJuego);
btnVerificar.addEventListener('click', verificarRespuesta);
btnEnviar.addEventListener('click', enviar)