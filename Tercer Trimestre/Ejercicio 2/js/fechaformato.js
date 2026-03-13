let btnFechaHora = document.getElementById('btnFechaHora');
let hoy = new Date();
let strFecha = hoy.getDate() + '/' + (hoy.getMonth() + 1) + '/' + hoy.getFullYear();
let strHora = hoy.toLocaleTimeString();

function mostrarFechaHora() {
    alert(strFecha);
    alert(strHora);
}

btnFechaHora.addEventListener('click', mostrarFechaHora);