# Clase 31 · Funciones

> Lección: [`Basic/16-functions.js`](../16-functions.js) — [Vídeo](https://youtu.be/1glVfFxj8a4?t=12829)

## Conceptos

Una **función** es un bloque de código reutilizable con un nombre, que se ejecuta cuando se le **llama** (invoca). Evita repetir código y organiza el programa.

- **Declaración vs expresión**: `function f() {}` (declaración, se puede usar **antes** de definirla por *hoisting*) frente a `const f = function () {}` (expresión, solo disponible tras la línea).
- **Parámetros y argumentos**: valores de entrada. Si un parámetro no recibe argumento, vale `undefined`; se pueden dar **valores por defecto**, **rest** (`...args`) y **desestructurar** parámetros.
- **Función anónima**: función sin nombre, guardada en una variable (expresión de función).
- **Arrow function** (`=>`): sintaxis moderna y compacta. Si el cuerpo es una sola expresión, se puede omitir `{}` y `return`. **No** tiene su propio `this` ni `arguments`: los toma del contexto donde se definió.
- **`return`**: devuelve un valor al punto donde se llamó la función. Sin `return`, devuelve `undefined`.
- **Scope y closures**: una función definida dentro de otra solo es visible dentro de ella, pero **recuerda** las variables del entorno donde se creó (*closure*).
- **`this`**: a qué objeto pertenece la llamada; depende de **cómo** se invoca. Se puede fijar con `call`, `apply` o `bind`.
- **Funciones de orden superior**: reciben otra función como argumento o devuelven una (`forEach`, `map`, `filter`, `reduce`...).
- **Recursión**: una función que se llama a sí misma hasta llegar a un caso base.
- **IIFE**: función que se define y se ejecuta de inmediato.
- **`async` / generadoras**: variantes para asincronía y para producir valores bajo demanda (se ven en clases posteriores).

## Definiciones

### Base

- **Parámetro**: variable declarada en la definición de la función.
- **Argumento**: valor real que se pasa al llamarla.
- **Parámetro por defecto**: `function f(a = 0)` usa `0` si no se pasa argumento (o se pasa `undefined`).
- **Parámetro rest**: `function f(...args)` recoge el resto de argumentos en un **array**.
- **`arguments`**: objeto array-like con todos los argumentos (solo en funciones `function`, no en arrow).
- **`return`**: termina la función y entrega un valor.

### Tipos de función

- **Declaración**: `function f() {}` (con *hoisting*).
- **Función anónima / expresión**: `const f = function () { ... }` (sin *hoisting*).
- **Arrow function**: `const f = (x) => x * 2` (sin `this`/`arguments` propios).
- **IIFE**: `(function () { ... })()` — se ejecuta al definirse.
- **Función recursiva**: se llama a sí misma con un caso base que detiene la recursión.

### Conceptos clave

- **Scope**: ámbito de visibilidad de una variable o función.
- **Closure**: la función "recuerda" las variables del scope donde fue creada.
- **`this`**: objeto receptor de la llamada; cambia según cómo se invoque.
- **`fn.call(obj, ...args)` / `fn.apply(obj, [args])`**: invocan `fn` con un `this` concreto.
- **`fn.bind(obj)`**: devuelve una nueva función con `this` fijado.
- **Función de orden superior**: recibe o devuelve funciones (`.forEach`, `.map`, `.filter`, `.reduce`...).

## Snippets de código

### Declaración, parámetros y funciones anónimas

```js
function myFunc() {
  console.log("¡Hola, función!")
}
myFunc()

function myFuncWithParams(name) {
  console.log(`¡Hola, ${name}!`)
}
myFuncWithParams("Brais") // → ¡Hola, Brais!

const myFunc2 = function (name) { // anónima
  console.log(`¡Hola, ${name}!`)
}
```

### Arrow functions (con y sin llaves)

```js
const myFunc3 = (name) => {
  console.log(`¡Hola, ${name}!`)
}
const myFunc4 = (name) => console.log(`¡Hola, ${name}!`) // forma corta
```

### Parámetros por defecto y `return`

```js
function sum(a, b) { console.log(a + b) }
sum(5)  // → NaN  (b es undefined)

function defaultSum(a = 0, b = 0) { console.log(a + b) }
defaultSum(5)            // → 5
defaultSum(undefined, 5) // → 5

function mult(a, b) { return a * b }
let result = mult(5, 10)
console.log(result) // → 50
```

### Funciones anidadas (scope) y de orden superior

```js
function extern() {
  function intern() { console.log("Función interna") }
  intern()
}
extern()
// intern() // ❌ Error: fuera del scope

function applyFunc(func, param) { func(param) }
applyFunc(myFunc4, "función de orden superior")

const myArray = [1, 2, 3, 4]
myArray.forEach((value) => console.log(value)) // 1, 2, 3, 4
```

### Hoisting: declaración vs expresión

```js
saludar()                 // → ¡Hola! (funciona: la declaración se "eleva")
function saludar() { console.log("¡Hola!") }

// despedir()             // ❌ ReferenceError: aún no inicializada
const despedir = () => console.log("¡Adiós!")
despedir()                // → ¡Adiós!
```

### Rest, `arguments` y desestructuración de parámetros

```js
function sumarTodos(...nums) {        // rest: nums es un array
  return nums.reduce((a, b) => a + b, 0)
}
console.log(sumarTodos(1, 2, 3, 4))   // → 10

function clasico() {
  console.log(arguments.length)       // objeto arguments (solo en function)
}
clasico("a", "b")                     // → 2

function saludarUser({ name, age = 0 }) { // desestructurar el parámetro
  console.log(`${name} (${age})`)
}
saludarUser({ name: "Brais", age: 37 })   // → Brais (37)
```

### `this`, `call` / `apply` / `bind`

```js
const persona = {
  name: "Brais",
  saludar() { console.log(`Hola, soy ${this.name}`) },
}
persona.saludar()                       // → Hola, soy Brais

const otra = { name: "Sara" }
persona.saludar.call(otra)              // → Hola, soy Sara
const ligada = persona.saludar.bind(otra)
ligada()                                // → Hola, soy Sara

// La arrow function NO tiene this propio: lo toma del entorno
const obj = {
  name: "Moure",
  flecha: () => console.log(this.name), // this NO es obj aquí
}
obj.flecha()                            // → undefined
```

### Closures y recursión

```js
function contador() {
  let n = 0
  return () => ++n          // recuerda n aunque contador() ya terminó
}
const siguiente = contador()
console.log(siguiente())    // → 1
console.log(siguiente())    // → 2

function factorial(n) {
  if (n <= 1) return 1      // caso base
  return n * factorial(n - 1)
}
console.log(factorial(5))   // → 120
```

### IIFE y orden superior con `map`/`filter`/`reduce`

```js
(function () {
  console.log("Me ejecuto sola al definirme") // IIFE
})()

const nums = [1, 2, 3, 4, 5, 6]
console.log(nums.map(n => n * 2))               // → [ 2, 4, 6, 8, 10, 12 ]
console.log(nums.filter(n => n % 2 === 0))      // → [ 2, 4, 6 ]
console.log(nums.reduce((acc, n) => acc + n, 0))// → 21
```

## Buenas prácticas y errores comunes

- **Funciones puras cuando puedas**: misma entrada → misma salida, sin efectos secundarios. Más fáciles de probar y razonar.
- **Usa parámetros por defecto** en vez de comprobar `if (x === undefined)` dentro de la función.
- **Arrow vs `function` y `this`**: las arrow no tienen `this`/`arguments` propios. No las uses como métodos de objeto si necesitas `this`; sí son ideales como callbacks.
- **Hoisting**: las declaraciones `function` se elevan; las expresiones (`const f = ...`) no. Define antes de usar para evitar confusiones.
- **`return` explícito**: una función sin `return` devuelve `undefined`. En arrow de bloque (`=> { }`) hay que poner `return` aunque sea corta.
- **Cuidado con el número de parámetros**: argumentos de más se ignoran (o se recogen con `...rest`); de menos quedan `undefined`.
- **Recursión con caso base**: sin condición de parada provocas un *stack overflow* (`Maximum call stack size exceeded`).
