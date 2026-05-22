# Clase 29 · Bucles

> Lección: [`Basic/14-loops.js`](../14-loops.js) — [Vídeo](https://youtu.be/1glVfFxj8a4?t=11575)

## Conceptos

Un **bucle** (loop) repite un bloque de código varias veces. Es la herramienta para recorrer colecciones o repetir una acción.

- **`for`**: bucle clásico con contador. Se controla con tres partes: inicialización, condición y actualización.
- **`while`**: repite **mientras** la condición sea verdadera; comprueba la condición **antes** de cada vuelta (puede no ejecutarse nunca).
- **`do...while`**: como `while`, pero comprueba la condición **después**; por eso ejecuta el bloque **al menos una vez**.
- **`for...of`**: recorre directamente los **valores** de cualquier **iterable** (array, Set, Map, string, `arguments`...).
- **`for...in`**: recorre las **claves/índices** (propiedades enumerables) de un objeto. **No** se usa para arrays normalmente.
- **`.forEach()`**: método de arrays/Set/Map que ejecuta un callback por elemento; **no** se puede cortar con `break`.
- **`break` / `continue`**: `break` corta el bucle por completo; `continue` salta a la siguiente iteración.
- **Etiquetas (labels)**: permiten hacer `break`/`continue` sobre un bucle **externo** desde uno anidado.
- **Iterable**: objeto que se puede recorrer con `for...of` (implementa el protocolo de iteración). Son iterables arrays, strings, Set, Map; **no** lo son los objetos planos.

⚠️ Cuidado con el **bucle infinito**: si la condición nunca se vuelve falsa (p. ej. `while (true)` sin `break`, o olvidar el `i++`), el programa se queda colgado.

## Definiciones

### Tipos de bucle

- **Iteración**: cada repetición (vuelta) del bucle.
- **`for (init; cond; update)`**: bucle con contador.
- **`while (cond)`**: repite mientras `cond` sea verdadera (mínimo 0 veces).
- **`do { } while (cond)`**: ejecuta el bloque y luego comprueba `cond` (mínimo 1 vez).
- **`for (let v of iterable)`**: recorre los **valores** de un iterable.
- **`for (let k in objeto)`**: recorre las **claves** (propiedades enumerables) de un objeto.
- **`coleccion.forEach((v, i) => ...)`**: ejecuta el callback por cada elemento.

### Control de flujo

- **`break`**: termina el bucle inmediatamente.
- **`continue`**: salta el resto de la iteración actual y pasa a la siguiente.
- **`etiqueta: for (...)`**: nombra un bucle; `break etiqueta` / `continue etiqueta` actúan sobre ese bucle (útil en bucles anidados).

## Snippets de código

### `for` (contador y recorrido de array por índice)

```js
for (let i = 0; i < 5; i++) {
  console.log(`Hola ${i}`) // → Hola 0 ... Hola 4
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8]
for (let i = 0; i < numbers.length; i++) {
  console.log(`Elemento: ${numbers[i]}`)
}
```

### `while` y `do...while`

```js
let i = 0
while (i < 5) {
  console.log(`Hola ${i}`)
  i++
}

i = 6
do {
  console.log(`Hola ${i}`) // → Hola 6 (se ejecuta aunque la condición sea falsa)
  i++
} while (i < 5)
```

### `for...of` (sirve para array, Set, Map y string)

```js
const myArray = [1, 2, 3, 4]
const myString = "¡Hola!"

for (let value of myArray)  { console.log(value) } // 1, 2, 3, 4
for (let value of myString) { console.log(value) } // ¡, H, o, l, a, !

// Con índice usando entries()
for (const [i, value] of myArray.entries()) {
  console.log(i, value) // → 0 1 / 1 2 / 2 3 / 3 4
}
```

### `for...in` (claves de un objeto) y diferencia con `for...of`

```js
const persona = { name: "Brais", age: 37 }
for (const clave in persona) {
  console.log(clave, persona[clave]) // → name Brais / age 37
}

// for...of NO funciona sobre un objeto plano (no es iterable):
// for (const x of persona) {}  // ❌ TypeError: persona is not iterable
```

### `break` y `continue`

```js
for (let i = 0; i < 10; i++) {
  if (i == 5) {
    continue // se salta el 5
  } else if (i == 7) {
    break    // corta el bucle al llegar a 7
  }
  console.log(`Hola ${i}`) // → 0,1,2,3,4,6
}
```

### `forEach` (no se puede cortar) y alternativas

```js
const nums = [1, 2, 3, 4]
nums.forEach(n => console.log(n)) // recorre todo; break/return NO lo detienen

// Si necesitas "parar" antes de tiempo:
console.log(nums.some(n => n > 2))      // → true (se detiene al cumplirse)
const encontrado = nums.find(n => n > 2)
console.log(encontrado)                 // → 3
```

### Bucles anidados y etiquetas (labels)

```js
externo: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) break externo // corta AMBOS bucles
    console.log(i, j)
  }
}
// → 0 0 / 0 1 / 0 2 / 1 0
```

## Buenas prácticas y errores comunes

- **Evita el bucle infinito**: asegúrate de que la condición acabará siendo falsa (no olvides el `i++` o el `break` en `while (true)`).
- **`for...of` para valores, `for...in` para claves**: usar `for...in` sobre un array recorre **índices como strings** y puede incluir propiedades heredadas — no lo uses para arrays.
- **`forEach` no se interrumpe**: ni `break` (error de sintaxis) ni `return` (solo salta esa iteración) lo paran. Para cortar usa `for...of`, `some`, `every` o `find`.
- **`for...of` sobre objetos falla**: los objetos planos no son iterables; recórrelos con `for...in`, `Object.keys/values/entries`.
- **Declara el contador con `let`, no `var`**: con `var` en bucles asíncronos todas las iteraciones comparten la misma variable (bug clásico de closures).
- **Elegir el bucle adecuado**: `for` clásico cuando necesitas el índice o control fino; `for...of`/`forEach`/`map`/`filter` para recorrer colecciones de forma legible.
