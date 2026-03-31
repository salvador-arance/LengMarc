let paises = ["España", "Francia", "Italia", "Alemania", "Portugal", "Argentina", "México", "Japón", "Canadá", "Brasil"];
let capitales = ["Madrid", "París", "Roma", "Berlín", "Lisboa", "Buenos Aires", "Ciudad de México", "Tokio", "Ottawa", "Brasilia"];

let indiceActual = 0;
let aciertos = 0;
let solucionesFallos = '';

let botonIniciar = document.getElementById("btnIniciar");
let botonComprobar = document.getElementById("btnComprobar");


function iniciarJuego() {
  document.getElementById("btnIniciar").style.display = "none";
  document.getElementById("zonaJuego").style.display = "block";
  mostrarPregunta();
}

function mostrarPregunta() {
  botonComprobar.disabled = false;
  document.getElementById("pregunta").innerText = '¿Cuál es la capital de ' + paises[indiceActual] + "?";
  document.getElementById("respuesta").style.backgroundColor = "white";
  document.getElementById("respuesta").style.borderColor = "";
  document.getElementById("respuesta").value = "";
  document.getElementById("respuesta").focus();
}

function comprobarRespuesta() {
  let respuesta = document.getElementById("respuesta").value;

  if (respuesta.toLowerCase() == capitales[indiceActual].toLowerCase()){
    document.getElementById("mensaje").innerText = "Correcto";
    document.getElementById("mensaje").className = "correcto";
    document.getElementById("respuesta").style.borderColor = "green";
    aciertos ++;
  }else{
    document.getElementById("mensaje").innerText = "Incorrecto";
    document.getElementById("mensaje").className = "incorrecto";
    document.getElementById("respuesta").style.backgroundColor = "red";
    solucionesFallos = solucionesFallos + "<p> La capital de " + paises[indiceActual] + " es " + capitales[indiceActual] + "</p>";
  }
  botonComprobar.disabled = true;
  setTimeout(continuarJuego, 500);
}   

function continuarJuego() {
    
    indiceActual ++;
    if (indiceActual <= paises.length - 1){
        mostrarPregunta();
        document.getElementById("mensaje").innerText = '';
        document.getElementById("respuesta").value = '';
    }else{
        mostrarResultadoFinal();
    }
}

function mostrarResultadoFinal() {
  document.getElementById("zonaJuego").style.display = "none";
  document.getElementById("resultadoFinal").style.display = "block";

  let numFallos = paises.length - aciertos;

  let mensajeResumen = "";
  if (aciertos >= 1 && aciertos <= 3) {
      mensajeResumen = "Eres un looser";
  } else if (aciertos >= 4 && aciertos <= 6) {
      mensajeResumen = "Lo puedes hacer mejor";
  } else if (aciertos >= 7 && aciertos <= 8) {
      mensajeResumen = "Te acercas al 9...";
  } else if (aciertos >= 9 && aciertos <= 10) {
      mensajeResumen = "¡Máquinaaa!";
  } else {
    mensajeResumen = "No has dado ni una :(";
  }

  document.getElementById("resultadoFinal").innerHTML =
    "<h2>Resultado Final</h2>" +
    "<p><span class='bold'>Número de aciertos:</span> " + aciertos + "</p>" +
    "<p><span class='bold'>Número de fallos:</span> " + numFallos + "</p>" +
    solucionesFallos +
    "<p><span class='bold'>Mensaje final:</span> " + mensajeResumen + "</p>";
}

botonIniciar.addEventListener('click', iniciarJuego);
botonComprobar.addEventListener('click', comprobarRespuesta);