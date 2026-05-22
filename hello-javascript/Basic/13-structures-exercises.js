/*
Clase 28 - Ejercicios: Estructuras
Vídeo: https://youtu.be/1glVfFxj8a4?t=11451
*/

// 1. Crea un array que almacene cinco animales

let animales = ["Perro", "Caimán", "Mirlo"];

// 2. Añade dos más. Uno al principio y otro al final

animales.unshift("Murciélago");
animales.push("Ratón");

// 3. Elimina el que se encuentra en tercera posición

console.log(animales);

// con splice, primero se pone la posición, luego el número de elementos
animales.splice(2, 1);

console.log(animales);

// 4. Crea un set que almacene cinco libros

let libros = new Set([
  "El Principito",
  "Nada",
  "El Quijote",
  "Crítica de la Razón Pura",
  "La fenomenología del Espíritu",
]);

console.log(libros);
// 5. Añade dos más. Uno de ellos repetido

libros.add("La ética demostrada según el orden geométrico");
libros.add("Nada");
console.log(libros);

// 6. Elimina uno concreto a tu elección

libros.delete("Nada");
console.log(libros);

// 7. Crea un mapa que asocie el número del mes a su nombre

let meses = new Map([
  [1, "Enero"],
  [2, "Febrero"],
  [3, "Marzo"],
  [4, "Abril"],
  [5, "Mayo"],
  [6, "Junio"],
  [7, "Julio"],
  [8, "Agosto"],
  [9, "Septiembre"],
  [10, "Octubre"],
  [11, "Noviembre"],
  [12, "Diciembre"],
]);

// 8. Comprueba si el mes número 5 existe en el map e imprime su valor

console.log(meses.has(5));

console.log(meses.get(5));

// 9. Añade al mapa una clave con un array que almacene los meses de verano

meses.set("verano", ["Junio", "Julio", "Agosto"]);

console.log(meses.get("verano"));

console.log(meses);

// 10. Crea un Array, transfórmalo a un Set y almacénalo en un Map

// Lo creo
let arrayEjemplo = [1, 2, 3, 4, 5];
// Lo transformo en un set
let setEjemplo = new Set(arrayEjemplo);
// creo un map
let mapEjemplo = new Map();
// almaceno el set en el map
mapEjemplo.set("ejemplo", setEjemplo);
// imprimo el resultado
console.log(mapEjemplo);
