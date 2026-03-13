let nombre = window.prompt("Introduce tu nombre: ");
let edad = window.prompt("Introduce tu edad: ");
let resultado = window.prompt("¿Tienes carnet socio? S/N");
let carnetSocio = (resultado == "S") ? true:false;
let dinero = window.prompt("¿Cuánto dinero tienes?");
let access = (edad >= 16) && (carnetSocio || dinero >= 10);

if (access){
    console.log("Bienvenido.")
}else{
    console.log("No puedes entrar.")
}