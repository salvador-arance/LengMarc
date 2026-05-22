# Clase 35 · Desestructuración y propagación

> Lección: [`Basic/20-destructuring-spreading.js`](../20-destructuring-spreading.js) — [Vídeo](https://youtu.be/1glVfFxj8a4?t=15747)

## Conceptos

Dos sintaxis modernas (ES6) muy usadas:

- **Desestructuración**: extraer valores de un array u objeto y asignarlos a variables en una sola línea, en vez de acceder uno a uno.
  - En **arrays** se asigna por **posición**; se pueden poner valores por defecto, **saltar** elementos con comas y recoger el resto con **rest** (`...resto`).
  - En **objetos** se asigna por **nombre** de propiedad; se pueden poner valores por defecto, **renombrar**, desestructurar **anidado** y recoger el resto con **rest**.
  - También funciona en **parámetros de función** y en bucles (`for (const [k, v] of ...)`).
- **Propagación (spread, `...`)**: "expandir" los elementos de un iterable u objeto. Sirve para **copiar**, **combinar** o **pasar como argumentos** sin mutar los originales.
- **Rest vs spread**: la **misma** sintaxis `...`. Es **rest** cuando *recoge* (lado izquierdo / parámetros) y **spread** cuando *expande* (lado derecho / llamadas).
- **Copia superficial**: spread copia el primer nivel; los objetos/arrays **anidados** se siguen compartiendo por referencia.

## Definiciones

### Desestructuración

- **Array**: `let [a, b] = arr` (por posición).
- **Objeto**: `let { x } = obj` (por nombre).
- **Valor por defecto**: se usa si el elemento/propiedad es `undefined` (`let [a = 0] = arr`).
- **Saltar elementos**: `let [ , , c] = arr` (huecos con comas).
- **Renombrar**: `let { name: nuevoNombre } = obj`.
- **Anidado**: `let { job: { name } } = obj`.
- **Rest en destructuring**: `let [a, ...resto] = arr` / `let { x, ...resto } = obj`.
- **Propiedad abreviada**: `{ name }` equivale a `{ name: name }` al crear objetos.
- **Asignación (sin `let`)**: hay que envolver el objeto en paréntesis: `({ x } = obj)`.

### Propagación (spread)

- **Operador spread (`...`)**: expande los elementos de un iterable u objeto.
- **En arrays/objetos**: `[...arr]`, `{ ...obj }` → copia/combinación **superficial**.
- **En llamadas**: `fn(...args)` pasa cada elemento como un argumento.
- **Con iterables**: funciona con arrays, strings, Set, Map (`[...str]`, `[...set]`).
- **Rest**: la cara opuesta — recoge varios elementos en uno (`[a, ...resto]`, `function f(...args)`).

## Snippets de código

### Desestructuración de arrays (con defaults y saltando elementos)

```js
let myArray = [1, 2, 3, 4]

let [a, b, c, d] = myArray
console.log(a, b, c, d) // → 1 2 3 4

let [x = 0, y = 0, z = 0, w = 0, v = 0] = myArray
console.log(v) // → 0 (no había 5º elemento)

let [primero, , , cuarto] = myArray // se saltan posiciones
console.log(primero, cuarto) // → 1 4
```

### Desestructuración de objetos (defaults, renombrar, anidados)

```js
let person = { name: "Brais", age: 37, alias: "MoureDev" }

let { name, age, alias } = person
console.log(name) // → Brais

let { email = "email@email.com" } = person
console.log(email) // → email@email.com (no existía)

let { alias: alias3 } = person // renombrar
console.log(alias3) // → MoureDev

let person3 = { name: "Brais", job: { name: "Programador" } }
let { job: { name: jobName } } = person3 // anidado
console.log(jobName) // → Programador
```

### Propagación (`...`) en arrays y objetos

```js
let arr = [1, 2, 3, 4]

let arr2 = [...arr, 5, 6]   // expandir y añadir → [1,2,3,4,5,6]
let copia = [...arr]        // copiar
let combinado = [...arr, ...arr2] // combinar

let obj = { name: "Brais" }
let obj2 = { ...obj, email: "braismoure@mouredev.com" } // expandir y añadir
let copiaObj = { ...obj } // copiar
```

### Rest en destructuring (recoger el resto)

```js
let [cabeza, ...cola] = [1, 2, 3, 4]
console.log(cabeza) // → 1
console.log(cola)   // → [ 2, 3, 4 ]

let { name: n, ...otros } = { name: "Brais", age: 37, alias: "MoureDev" }
console.log(n)      // → Brais
console.log(otros)  // → { age: 37, alias: 'MoureDev' }
```

### Spread en llamadas a función y con iterables

```js
let numeros = [5, 1, 9, 3]
console.log(Math.max(...numeros)) // → 9 (cada elemento como argumento)

function suma(a, b, c) { return a + b + c }
console.log(suma(...[1, 2, 3]))   // → 6

console.log([..."abc"])           // → [ 'a', 'b', 'c' ] (string es iterable)
console.log([...new Set([1, 1, 2])]) // → [ 1, 2 ]
```

### Desestructuración en parámetros e intercambio de variables

```js
function crearUsuario({ name, rol = "user" }) {
  console.log(`${name} → ${rol}`)
}
crearUsuario({ name: "Brais" }) // → Brais → user

let p = 1, q = 2
;[p, q] = [q, p]                // intercambio sin variable temporal
console.log(p, q)               // → 2 1

// Asignación a variables ya existentes: el objeto va entre paréntesis
let titulo
;({ titulo } = { titulo: "Hola" })
console.log(titulo)             // → Hola
```

### Copia superficial: cuidado con lo anidado

```js
let original = { nombre: "Brais", datos: { edad: 37 } }
let copiaSup = { ...original }

copiaSup.nombre = "Sara"          // no afecta al original (primer nivel)
copiaSup.datos.edad = 99          // ¡SÍ afecta! datos es la misma referencia

console.log(original.nombre)      // → Brais
console.log(original.datos.edad)  // → 99 (compartido)
```

## Buenas prácticas y errores comunes

- **Spread/rest crean copia superficial**: para clonar estructuras anidadas usa `structuredClone(obj)` o copia nivel a nivel; no basta `{ ...obj }`.
- **El rest siempre va el último**: `[...resto, a]` o `function f(...args, b)` son errores de sintaxis.
- **Valor por defecto solo con `undefined`**: si la propiedad vale `null`, `0` o `""`, el default **no** se aplica.
- **Renombrar y default a la vez**: `let { x: y = 0 } = obj` → crea `y`, valor `0` si `x` no existe.
- **Asignar (sin declarar) un objeto requiere paréntesis**: `({ a } = obj)`; si no, JS interpreta `{` como bloque.
- **`...` no copia métodos del prototipo** ni propiedades no enumerables: solo las propias enumerables.
- **Útil para inmutabilidad**: `{ ...estado, campo: nuevo }` crea un objeto nuevo en vez de mutar (patrón habitual en React/Redux).
