# Clases 2 a 11 · Funciones avanzadas

> Lección: [`Intermediate/00-advanced-functions.js`](../00-advanced-functions.js) — [Vídeo](https://youtu.be/iJvLAZ8MJ2E?t=346)

## Conceptos

En JavaScript las funciones son **ciudadanos de primera clase**: se pueden
guardar en variables, pasar como argumento y devolver desde otra función. Sobre
esa base se construyen patrones avanzados.

- **Ciudadanos de primera clase**: una función se trata como cualquier otro
  valor (se asigna, se pasa, se retorna).
- **Arrow functions avanzadas**: con **retorno implícito** (sin `{}` ni
  `return`) y con **`this` léxico** (heredan el `this` del contexto donde se
  definen; no tienen el suyo propio).
- **IIFE** (Immediately Invoked Function Expression): función que se define y se
  ejecuta en el acto; útil para aislar variables.
- **Parámetros rest (`...`)**: agrupan un número indefinido de argumentos en un
  array dentro de la función.
- **Operador spread (`...`)**: expande un array (o iterable) en argumentos o
  elementos individuales.
- **Closure (clausura)**: una función interna "recuerda" las variables del
  ámbito donde fue creada, aunque la función externa ya haya terminado.
- **Recursividad**: una función que se llama a sí misma hasta llegar a un caso
  base.
- **Funciones parciales**: fijan parte de los argumentos y devuelven una función
  que espera el resto.
- **Currying**: transforma una función de varios argumentos en una cadena de
  funciones de un solo argumento.
- **Callback**: función que se pasa a otra para que la ejecute cuando
  corresponda.

## Definiciones

- **Ciudadano de primera clase**: valor que puede asignarse, pasarse y
  retornarse.
- **Retorno implícito**: `const f = (a, b) => a * b` (sin `return`).
- **`this` léxico**: el `this` de una arrow function es el del contexto exterior.
- **IIFE**: `(function () { ... })()` o `(() => { ... })()`.
- **Parámetro rest**: `function f(...args)` → `args` es un array.
- **Spread**: `f(...array)` expande el array en argumentos.
- **Closure**: función que conserva acceso a variables de su ámbito de creación.
- **Recursividad**: función que se invoca a sí misma con un caso base.
- **Función parcial**: fija unos argumentos y devuelve otra función.
- **Currying**: `f(a)(b)(c)` — un argumento por llamada.
- **Callback**: función pasada como argumento que se ejecuta más tarde.

## Snippets de código

Funciones como ciudadanos de primera clase:

```js
const greet = function (name) {
  console.log(`Hola, ${name}`)
}

function processGreeting(greetFunction, name) {
  greetFunction(name)         // se recibe una función y se ejecuta
}

function returnGreeting() {
  return greet                // se devuelve una función
}

processGreeting(greet, "MoureDev")
const greet2 = returnGreeting()
greet2("Brais Moure")
```

Arrow functions: retorno implícito y `this` léxico:

```js
const multiply = (a, b) => a * b   // retorno implícito
console.log(multiply(2, 5))        // → 10

const handler = {
  name: "Brais",
  greeting: function () {
    console.log(`Hola, ${this.name}`)   // → Hola, Brais
  },
  arrowGreeting: () => {
    console.log(`Hola, ${this.name}`)   // → Hola, undefined (this léxico)
  }
}
handler.greeting()
handler.arrowGreeting()
```

IIFE (clásica y con arrow function):

```js
(function () {
  console.log("IIFE clásico")
})();

(() => {
  console.log("IIFE con arrow function")
})();
```

Parámetros rest y operador spread:

```js
function sum(...numbers) {       // rest: numbers es un array
  let result = 0
  for (let number of numbers) result += number
  return result
}
console.log(sum(1, 2, 3, 4, 5))  // → 15

const numbers = [1, 2, 3]
function sumWithSpread(a, b, c) { return a + b + c }
console.log(sumWithSpread(...numbers)) // → 6 (spread)
```

Closures (la función recuerda `counter`):

```js
function createCounter() {
  let counter = 0
  return function () {
    counter++
    console.log(`Contador: ${counter}`)
  }
}
const counter = createCounter()
counter() // → Contador: 1
counter() // → Contador: 2
```

Recursividad (factorial):

```js
function factorial(n) {
  if (n <= 1) return 1          // caso base
  return n * factorial(n - 1)   // caso recursivo
}
console.log(factorial(5)) // → 120
```

Funciones parciales y currying:

```js
function partialSum(a) {
  return function (b, c) { return sum(a, b, c) }
}
const sumWith = partialSum(4)
console.log(sumWith(2, 3)) // → 9

function currySum(a) {
  return (b) => (c) => (d) => sum(a, b, c, d)
}
console.log(currySum(1)(2)(3)(3)) // → 9
```

Callbacks:

```js
function processData(data, callback) {
  const result = sum(...data)
  callback(result)
}
processData([1, 2, 3], (result) => {
  console.log(`Mi resultado en la arrow function es: ${result}`) // → 6
})
```
