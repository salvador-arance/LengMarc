let btnFechaHora = document.getElementById('btnFechaHora');
let hoy = new Date();
var dia = hoy.getDate().toString();
var mes = (hoy.getMonth() + 1).toString();
let strHora = hoy.toLocaleTimeString();
let strFecha;

if (mes.length === 1) {
    mes = '0' + mes;
}
if (dia.length === 1) {
    dia = '0' + dia;
}

strFecha = dia + '/' + mes + '/' + hoy.getFullYear();

function mostrarFechaHora() {
    alert(strFecha);
    alert(strHora);
}

btnFechaHora.addEventListener('click', mostrarFechaHora);