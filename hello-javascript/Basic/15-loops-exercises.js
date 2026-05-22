/*
Clase 30 - Ejercicios: Bucles
Vídeo: https://youtu.be/1glVfFxj8a4?t=12732
*/

// NOTA: Explora diferentes sintaxis de bucles para resolver los ejercicios

// 1. Crea un bucle que imprima los números del 1 al 20

for (let i = 1; i <= 20; i++) {
  console.log(i);
}

// 2. Crea un bucle que sume todos los números del 1 al 100 y muestre el resultado

let result = 0;

for (let i = 1; i <= 100; i++) {
  result += i;
}

console.log(result);

// 3. Crea un bucle que imprima todos los números pares entre 1 y 50

for (let i = 2; i <= 50; i++) {
  if (i % 2 === 0) {
    console.log(i);
  }
}

// 4. Dado un array de nombres, usa un bucle para imprimir cada nombre en la consola

let nombres = ["Manu", "Salva", "Elena", "Joana", "Miguel"];

for (let n of nombres) {
  console.log(n);
}

// 5. Escribe un bucle que cuente el número de vocales en una cadena de texto

let name = "Paralelo";
result = 0;
let vocales = ["a", "e", "i", "o", "u"];

for (let i = 0; i < name.length; i++) {
  if (vocales.includes(name[i].toLowerCase())) {
    result += 1;
  }
}

console.log(result);

// 6. Dado un array de números, usa un bucle para multiplicar todos los números y mostrar el producto

let arrayNumeros = [21, 45, 56, 45];
result = 1;

for (let i = 0; i < arrayNumeros.length; i++) {
  result *= arrayNumeros[i];
}

console.log(result);

// 7. Escribe un bucle que imprima la tabla de multiplicar del 5

const numAMultiplicar = 5;

for (let i = 1; i <= 10; i++) {
  console.log(numAMultiplicar * i);
}

// 8. Usa un bucle para invertir una cadena de texto

let nuevaCadena = [];
for (let i = name.length - 1; i >= 0; i--) {
  nuevaCadena.push(name[i]);
}

nuevaCadena = nuevaCadena.join("");

console.log(nuevaCadena);

// 9. Usa un bucle para generar los primeros 10 números de la secuencia de Fibonacci

let a = 1;
let b = 1;
let tmp = 0;

for (let i = 0; i < 10; i++) {
  console.log(a);
  tmp = a + b;
  a = b;
  b = tmp;
}

// 10. Dado un array de números, usa un bucle para crear un nuevo array que contenga solo los números mayores a 10

let ultimoArray = [1, 12, 2, 23, 3, 34];
let arrayResult = [];

for (let n of ultimoArray) {
  if (n > 10) {
    arrayResult.push(n);
  }
}

console.log(arrayResult);
