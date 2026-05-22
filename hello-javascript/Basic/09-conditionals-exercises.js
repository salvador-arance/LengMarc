/*
Clase 24 - Ejercicios: Condicionales
Vídeo: https://youtu.be/1glVfFxj8a4?t=8652
*/

// if/else/else if/ternaria

let numero = 12;

const mensaje =
  numero === 12 ? "El número es igual a 12" : "El número es diferente a 12";

console.log(mensaje);

// 1. Imprime por consola tu nombre si una variable toma su valor

let nombre = "Salva";

if (nombre === "Salva") {
  console.log(nombre);
}

// 2. Imprime por consola un mensaje si el usuario y contraseña concide con unos establecidos

let usuario = "Manu";
let passwd = "1234";

if (usuario === "Manu" && passwd === "1234") {
  console.log("Acceso concedido.");
}

// 3. Verifica si un número es positivo, negativo o cero e imprime un mensaje

if (numero > 0) {
  console.log(`El número ${numero} es positivo.`);
} else if (numero < 0) {
  console.log(`El número ${numero} es negativo.`);
} else {
  console.log(`El número ${numero} es 0.`);
}

// 4. Verifica si una persona puede votar o no (mayor o igual a 18) e indica cuántos años le faltan

let age = 30;

let puedeVotar =
  age >= 18
    ? "Puede votar"
    : `No puede votar y le faltan ${18 - age} años para poder`;

console.log(puedeVotar);

// 5. Usa el operador ternario para asignar el valor "adulto" o "menor" a una variable
//    dependiendo de la edad

let etapaVital = age >= 21 ? "adulto" : "menor";

console.log(etapaVital);

// 6. Muestra en que estación del año nos encontramos dependiendo del valor de una variable "mes"

let mes = 10;

let estacion = "";

switch (mes) {
  case 0:
  case 1:
  case 2:
    estacion = "Invierno";
    break;
  case 3:
  case 4:
  case 5:
    estacion = "Primavera";
    break;
  case 6:
  case 7:
  case 8:
    estacion = "Verano";
    break;
  case 9:
  case 10:
  case 11:
    estacion = "Otoño";
    break;
}

console.log(estacion);

// 7. Muestra el número de días que tiene un mes dependiendo de la variable del ejercicio anterior

let numDias = 0;

if (
  mes === 0 ||
  mes === 2 ||
  mes === 4 ||
  mes === 6 ||
  mes === 7 ||
  mes === 9 ||
  mes === 11
) {
  numDias = 31;
} else if (mes === 1) {
  numDias = 28;
} else {
  numDias = 30;
}

console.log(numDias);

// switch
mes = 1;

switch (mes) {
  case 0:
  case 2:
  case 4:
  case 6:
  case 7:
  case 9:
  case 11:
    numDias = 31;
    break;
  case 1:
    numDias = 28;
    break;
  case 3:
  case 5:
  case 8:
  case 10:
    numDias = 30;
    break;
}

console.log(numDias);

// 8. Usa un switch para imprimir un mensaje de saludo diferente dependiendo del idioma

let idioma = "euskera";

switch (idioma) {
  case "inglés":
    console.log("Hello!");
    break;
  case "español":
    console.log("Hola!");
    break;
  case "francés":
    console.log("Salut!");
    break;
  default:
    console.log("No me sé este idioma");
    break;
}

// 9. Usa un switch para hacer de nuevo el ejercicio 6

// 10. Usa un switch para hacer de nuevo el ejercicio 7
