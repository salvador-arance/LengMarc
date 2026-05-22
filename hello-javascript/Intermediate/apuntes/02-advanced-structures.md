# Clases 13 a 22 · Estructuras avanzadas

> Lección: [`Intermediate/02-advanced-structures.js`](../02-advanced-structures.js) — [Vídeo](https://youtu.be/iJvLAZ8MJ2E?t=4355)

## Conceptos

Los arrays, Sets y Maps ofrecen **métodos de orden superior** y operaciones que
permiten transformar, filtrar y convertir colecciones de forma declarativa
(diciendo *qué* queremos, no *cómo* recorrerlo).

- **Métodos funcionales de array**:
  - **`forEach`**: ejecuta una función por cada elemento (no devuelve nada).
  - **`map`**: crea un nuevo array transformando cada elemento.
  - **`filter`**: crea un nuevo array con los elementos que cumplen una
    condición.
  - **`reduce`**: reduce el array a un único valor acumulado.
- **Manipulación**: **`flat`** aplana arrays anidados hasta una profundidad dada;
  **`flatMap`** mapea y aplana un nivel.
- **Ordenación**: **`sort`** ordena (por defecto como texto; con función
  comparadora para números); **`reverse`** invierte el orden.
- **Búsqueda**: **`includes`** (¿existe el valor?), **`find`** (primer elemento
  que cumple), **`findIndex`** (su índice).
- **Sets avanzados**: eliminar duplicados, y simular **unión**,
  **intersección** y **diferencia** combinando spread y `filter`.
- **Conversiones**: Set ↔ Array, y Map ↔ Array ↔ Objeto con `Array.from`,
  `Object.fromEntries` y `Object.entries`.

## Definiciones

- **`arr.forEach(fn)`**: ejecuta `fn` por elemento; sin retorno.
- **`arr.map(fn)`**: nuevo array con cada resultado de `fn`.
- **`arr.filter(fn)`**: nuevo array con los que cumplen `fn`.
- **`arr.reduce(fn, inicial)`**: acumula en un solo valor.
- **`arr.flat(n)`**: aplana `n` niveles de anidamiento.
- **`arr.flatMap(fn)`**: `map` + `flat(1)`.
- **`arr.sort([cmp])`**: ordena; `cmp = (a, b) => a - b` para números.
- **`arr.reverse()`**: invierte el array (lo muta).
- **`arr.includes(v)`** / **`find(fn)`** / **`findIndex(fn)`**: búsqueda.
- **`Set`**: colección de valores únicos. `set.has(v)` comprueba pertenencia.
- **`Array.from(map)`** / **`Object.fromEntries(map)`** /
  **`Object.entries(obj)`**: conversiones entre estructuras.

## Snippets de código

Métodos funcionales (`forEach`, `map`, `filter`, `reduce`):

```js
let numbers = [1, 2, 3, 4, 5, 6]

numbers.forEach(element => console.log(element)) // imprime 1..6
let doubled = numbers.map(e => e * 2)            // → [2,4,6,8,10,12]
let evens   = numbers.filter(e => e % 2 === 0)   // → [2,4,6]
let sum     = numbers.reduce((acc, cur) => acc + cur, 0) // → 21
```

Manipulación con `flat` y `flatMap`:

```js
let nested = [1, [2, [3, [4]]]]
console.log(nested.flat(1)) // → [1, 2, [3, [4]]]
console.log(nested.flat(3)) // → [1, 2, 3, 4]

let phrases = ["Hola mundo", "Adiós mundo"]
let words = phrases.flatMap(p => p.split(" "))
console.log(words) // → ["Hola","mundo","Adiós","mundo"]
```

Ordenación y búsqueda:

```js
console.log(["b","a","d","c"].sort())          // → ["a","b","c","d"]
let sorted = [3, 4, 1, 6, 10].sort((a, b) => a - b) // → [1,3,4,6,10]
sorted.reverse()                                // → [10,6,4,3,1]

console.log(sorted.includes(4))                 // → true
console.log(sorted.find(e => e % 2 === 0))      // → 10
console.log(sorted.findIndex(e => e % 2 === 0)) // → 0
```

Operaciones con Sets:

```js
let nums = [1, 2, 2, 3, 4, 5, 6, 6]
nums = [...new Set(nums)]            // sin duplicados → [1,2,3,4,5,6]

const setA = new Set([1, 2, 3])
const setB = new Set([2, 3, 4, 5])
const union        = new Set([...setA, ...setB])                       // 1,2,3,4,5
const intersection = new Set([...setA].filter(e => setB.has(e)))       // 2,3
const difference   = new Set([...setA].filter(e => !setB.has(e)))      // 1
console.log([...setA])               // Set → Array → [1,2,3]
```

Conversiones con Map:

```js
let myMap = new Map([["name", "MoureDev"], ["age", 37]])

myMap.forEach((value, key) => console.log(`${key}: ${value}`))

const arrayFromMap  = Array.from(myMap)            // [["name","MoureDev"],["age",37]]
const objectFromMap = Object.fromEntries(myMap)    // { name:"MoureDev", age:37 }
const mapFromObject = new Map(Object.entries(objectFromMap)) // Objeto → Map
```
