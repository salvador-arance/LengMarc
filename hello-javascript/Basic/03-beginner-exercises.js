/*
Clase 18 - Ejercicios: primeros pasos
Vídeo: https://youtu.be/1glVfFxj8a4?t=4733
*/

// 1. Escribe un comentario en una línea

// Hola qué tal. Soy subnormal

// 2. Escribe un comentario en varias líneas

/* 
Esto
Puede valer.
*/

// 3. Declara variables con valores asociados a todos los datos de tipo primitivos

let str = "";
let int = 1;
let decimal = 1.1;
let bool = true;
let symbol = Symbol("Mi símbolo.");

// 4. Imprime por consola el valor de todas las variables

console.log(str, int, decimal, bool, symbol);

// 5. Imprime por consola el tipo de todas las variables

console.log(typeof str, typeof int, typeof decimal, typeof bool, typeof symbol);

// 6. A continuación, modifica los valores de las variables por otros del mismo tipo

str = "Hola";
int = 12;
decimal = 3.4;
bool = false;
symbol = Symbol("Otro símbolo");

// 7. A continuación, modifica los valores de las variables por otros de distinto tipo

str = 2;
int = Symbol(12);
decimal = true;
bool = 12.3;
symbol = 2;

console.log(str, int, decimal, bool, symbol);

// 8. Declara constantes con valores asociados a todos los tipos de datos primitivos

const const1 = "";
const const2 = 1;
const const3 = 12.4;
const const4 = true;
const const5 = Symbol("hola");

console.log(const1, const2, const3, const3, const4);

// 9. A continuación, modifica los valores de las constantes

/*
const1 = 12;
const2 = "hola";
const3 = false;
const4 = Symbol("María");
const5 = 2.2;
*/

// 10. Comenta las líneas que produzcan algún tipo de error al ejecutarse
