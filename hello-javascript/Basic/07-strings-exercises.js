/*
Clase 22 - Ejercicios: Strings
Vídeo: https://youtu.be/1glVfFxj8a4?t=7226
*/

// 1. Concatena dos cadenas de texto

let myString = "Hola soy";
let myString2 = "Salvador";

myString += " " + myString2;

console.log(myString);

// 2. Muestra la longitud de una cadena de texto

console.log(myString.length);

// 3. Muestra el primer y último carácter de un string

console.log(myString.substring(0, 1), myString[myString.length - 1]);

// 4. Convierte a mayúsculas y minúsculas un string

console.log(myString.toLocaleUpperCase(), myString.toLocaleLowerCase());

// 5. Crea una cadena de texto en varias líneas

myString += "\nsalto de línea\nhola";

console.log(myString);

// 6. Interpola el valor de una variable en un string

let age = 23;

myString += `\nTengo ${age} años`;

console.log(myString);

// 7. Reemplaza todos los espacios en blanco de un string por guiones

myString = myString.replaceAll(" ", "-");

console.log(myString);

// 8. Comprueba si una cadena de texto contiene una palabra concreta

console.log(myString.includes("Puerro"));

// 9. Comprueba si dos strings son iguales

console.log(myString === myString2);

myString = "Hola";
myString2 = "Hola";

console.log(myString === myString2);

// 10. Comprueba si dos strings tienen la misma longitud

console.log(myString.length === myString2.length);
