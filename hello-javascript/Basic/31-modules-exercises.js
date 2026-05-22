/*
Clase 45 - Ejercicios: Módulos
Vídeo: https://youtu.be/1glVfFxj8a4?t=22720
*/

// 1. Exporta una función

export function hola() {
  return "Saludo";
}

// 2. Exporta una constante

export const NOMBRE = "Salvador";

// 3. Exporta una clase

export class Persona {
  #dni;
  constructor(nombre, edad, dni) {
    this.nombre = nombre;
    this.edad = edad;
    this.#dni = dni;
  }

  saludar() {
    return `Hola, mi nombre es ${this.nombre} y tengo ${this.edad} años.`;
  }
}

// 7. Exporta una función, una constante y una clase por defecto (en caso de que lo permita)

function dentroDelBloque() {
  console.log("Estamos dentro del bloque.");
}

const NUMERO_BLOQUE = 1;

class ClaseDeBloque {
  constructor(nombre, numero) {
    this.nombre = nombre;
    this.numero = numero;
  }

  toString() {
    return `Nombre del bloque: ${this.nombre}\nNúmero del bloque: ${this.numero}`;
  }
}

export default {
  dentroDelBloque,
  NUMERO_BLOQUE,
  ClaseDeBloque,
};

