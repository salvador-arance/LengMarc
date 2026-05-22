/*
Clase 32 - Ejercicios: Funciones
Vídeo: https://youtu.be/1glVfFxj8a4?t=14146
*/

// NOTA: Explora diferentes sintaxis de funciones para resolver los ejercicios

// 1. Crea una función que reciba dos números y devuelva su suma

export const PI = 3.141592;

export function sum(a, b) {
  return a + b;
}

// console.log(sum(1, 1));

// 2. Crea una función que reciba un array de números y devuelva el mayor de ellos

let arr1 = [1, 2, 3, 4, 5, 1, -2];

function mayor(array) {
  let result = array[0];

  for (let i = 0; i < array.length; i++) {
    if (array[i] > result) {
      result = array[i];
    }
  }

  return result;
}

// console.log(mayor(arr1));

// 3. Crea una función que reciba un string y devuelva el número de vocales que contiene

export default function numVocales(string) {
  let vocales = ["a", "e", "i", "o", "u"];
  let result = 0;

  for (let i = 0; i < string.length; i++) {
    if (vocales.includes(string[i].toLowerCase())) {
      result += 1;
    }
  }

  return result;
}

// console.log(numVocales("Paralelo"));

// 4. Crea una función que reciba un array de strings y devuelva un nuevo array con las strings en mayúsculas
let arrStrings = ["hola", "salva"];

const strMayus = (arrStr) => {
  let newArrStr = [];

  for (let i = 0; i < arrStr.length; i++) {
    newArrStr.push(arrStr[i].toLocaleUpperCase());
  }

  return newArrStr;
};

// console.log(strMayus(arrStrings));

// 5. Crea una función que reciba un número y devuelva true si es primo, y false en caso contrario

function esPrimo(num) {
  if (num < 2) return false;

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

// console.log(esPrimo(37));

// 6. Crea una función que reciba dos arrays y devuelva un nuevo array que contenga los elementos comunes entre ambos

function elementosComunes(arra, arrb) {
  let newArr = [];

  for (let i = 0; i < arra.length; i++) {
    for (let j = arrb.length - 1; j >= 0; j--) {
      if (arra[i] === arrb[j] && !newArr.includes(arrb[j])) {
        newArr.push(arrb[j]);
      }
    }
  }

  return newArr;
}

let arrayEjemplo = [1, 2, 3, 4, 5];
let arrayEjemplo2 = [2, 4];

// console.log(elementosComunes(arrayEjemplo, arrayEjemplo2));

// 7. Crea una función que reciba un array de números y devuelva la suma de todos los números pares

function sumaPares(arr) {
  let result = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      result += arr[i];
    }
  }

  return result;
}

// console.log(sumaPares(arrayEjemplo));

// 8. Crea una función que reciba un array de números y devuelva un nuevo array con cada número elevado al cuadrado

function arrayExp(arr) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i] ** 2);
  }

  return result;
}

// console.log(arrayExp(arrayEjemplo));

// 9. Crea una función que reciba una cadena de texto y devuelva la misma cadena con las palabras en orden inverso

function reversingString(str) {
  return str.split(" ").reverse().join(" ");
}

// console.log(reversingString("hola mundo"));

// 10. Crea una función que calcule el factorial de un número dado

function calcularFactorial(num) {
  if (num === 0) return 1;

  let result = num;
  for (let i = num - 1; i > 0; i--) {
    result *= i;
  }

  return result;
}

// console.log(calcularFactorial(10));
