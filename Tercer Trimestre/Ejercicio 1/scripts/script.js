let btnAlert = document.getElementById('btnAlert');
let btnConfirm = document.getElementById('btnConfirm');
let btnPrompt = document.getElementById('btnPrompt');

function lanzarAlerta() {
    alert("Hola me llamo salva.")
}
function lanzarConfirm() {
    confirm("¿Continuar?");
}
function lanzarPrompt(){
    prompt("Hola que tal.")
}

btnAlert.addEventListener('click', lanzarAlerta);
btnConfirm.addEventListener('click', lanzarConfirm);
btnPrompt.addEventListener('click', lanzarPrompt);