import { hola, NOMBRE, Persona } from "./31-modules-exercises.js";

import bloque from "./31-modules-exercises.js";

// 4. Importa una función

console.log(hola());

// 5. Importa una constante

console.log(NOMBRE);

// 6. Importa una clase

const salva = new Persona("Salva", 23, "26523239f");

// 8. Importa una función, una constante y una clase por defecto (en caso de que lo permita)

const miBloque = new bloque.ClaseDeBloque("CODE", bloque.NUMERO_BLOQUE);

console.log(miBloque.toString());

// 10. Importa una función, una constante y una clase desde un directorio diferente al anterior

import extern from "./carpeta-ejercicio-31/exports.js";

const RUTA_ARCHIVO = extern.RUTA_ARCHIVO;
const desdeOtroArchivo = extern.desdeOtroArchivo;

let instancia = new extern.OtroArchivo(desdeOtroArchivo, RUTA_ARCHIVO);

console.log(instancia.toString());
