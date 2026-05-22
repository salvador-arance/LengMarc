# Clase 25 · Arrays

> Lección: [`Basic/10-array.js`](../10-array.js) — [Vídeo](https://youtu.be/1glVfFxj8a4?t=8741)

## Conceptos

Un **array** (arreglo) es una colección **ordenada** de valores, accesibles por su **índice** (posición), que empieza en `0`. Un array puede contener valores de distintos tipos a la vez.

- **Declaración**: con literal `[]` o con `new Array()`.
- **Índices y huecos**: se puede asignar directamente a una posición; si dejas posiciones sin asignar quedan *huecos* (`empty`) — un array **disperso**.
- **Mutación vs copia**: algunos métodos **modifican** el array original (`push`, `splice`, `sort`, `reverse`...) y otros **devuelven uno nuevo** sin tocarlo (`slice`, `map`, `filter`, `concat`...). Saber cuáles mutan evita errores difíciles.
- **Referencia, no valor**: un array es un objeto; al copiarlo con `=` copias la **referencia**, no los datos. Para copiar de verdad usa spread `[...arr]` (copia **superficial**).
- **Añadir/quitar por los extremos**: `push`/`pop` (final), `unshift`/`shift` (inicio).
- **`slice` vs `splice`**: `slice` **no muta** (devuelve copia parcial); `splice` **sí muta** (borra y/o inserta).
- **Iteración funcional**: `forEach`, `map`, `filter`, `reduce`, `find`, `some`, `every`... recorren el array con un callback y son la forma idiomática moderna.
- **Búsqueda**: `includes`, `indexOf`, `find`/`findIndex`.
- **Conversión**: spread, destructuring, `Array.from()`, `Array.of()`, `join`/`split`.

## Definiciones

### Acceso y propiedades

- **Índice**: posición de un elemento; el primero es `0`.
- **`.length`**: número de elementos del array.
- **`arr[i]`**: elemento en la posición `i` (o `undefined` si no existe).
- **`.at(i)`**: elemento en `i`; admite índices **negativos** (`-1` = último).

### Añadir / quitar (mutan)

- **`.push(x)`**: añade `x` al final; devuelve la nueva `length`.
- **`.pop()`**: elimina el último elemento y lo devuelve.
- **`.shift()`**: elimina el primer elemento y lo devuelve.
- **`.unshift(...)`**: añade elementos al principio.
- **`.splice(inicio, cuántos, ...nuevos)`**: elimina `cuántos` desde `inicio` e inserta `nuevos`; **muta** y devuelve los eliminados.
- **`.sort(comparador)`**: ordena **in situ**; por defecto como texto. **muta**.
- **`.reverse()`**: invierte el orden **in situ**. **muta**.
- **`.fill(valor, inicio, fin)`**: rellena con `valor`. **muta**.

### No mutan (devuelven nuevo)

- **`.slice(inicio, fin)`**: copia desde `inicio` hasta `fin` (sin incluir `fin`); admite negativos.
- **`.concat(...)`**: une arrays/valores en uno nuevo.
- **`.join(sep)`**: une los elementos en un **string** separados por `sep` (por defecto `,`).
- **`.flat(prof)`**: aplana arrays anidados hasta `prof` niveles (por defecto 1).

### Búsqueda

- **`.includes(x)`**: `true`/`false` según si contiene `x`.
- **`.indexOf(x)` / `.lastIndexOf(x)`**: posición de la primera/última aparición, o `-1`.
- **`.find(fn)` / `.findIndex(fn)`**: primer elemento / índice que cumple `fn`.
- **`.some(fn)` / `.every(fn)`**: `true` si **alguno** / **todos** cumplen `fn`.

### Iteración / transformación (callback, no mutan)

- **`.forEach(fn)`**: ejecuta `fn` por cada elemento (no devuelve nada).
- **`.map(fn)`**: nuevo array con el resultado de `fn` para cada elemento.
- **`.filter(fn)`**: nuevo array solo con los que cumplen `fn`.
- **`.reduce(fn, inicial)`**: reduce el array a un único valor acumulado.
- **`.flatMap(fn)`**: `map` + `flat(1)` en un paso.

### Creación / comprobación

- **`Array.isArray(x)`**: `true` si `x` es un array.
- **`Array.from(iterable, fn?)`**: crea un array desde un iterable o array-like.
- **`Array.of(...)`**: crea un array con los argumentos dados.

## Snippets de código

### Declaración e inicialización

```js
let myArray = []          // literal vacío
let myArray2 = new Array() // constructor

myArray = [1, 2, 3, 4]
myArray = ["Brais", "Moure", "mouredev", 37, true] // tipos mezclados

// Asignar por índice deja huecos
let arr = []
arr[2] = "Brais"
arr[1] = "mouredev"
console.log(arr) // → [ <1 empty item>, 'mouredev', 'Brais' ]
```

### `push` / `pop` y `shift` / `unshift`

```js
let a = []
a.push("Brais")
a.push("Moure")
console.log(a.pop()) // → Moure (lo elimina y lo devuelve)

console.log(a.shift()) // → Brais (elimina el primero)
a.unshift("Brais", "mouredev") // añade al inicio
console.log(a.length)  // → 2
```

### Vaciar un array

```js
let b = [1, 2, 3]
b = []          // reasignación
b.length = 0    // alternativa: poner length a 0
console.log(b)  // → []
```

### `slice` (no muta) frente a `splice` (muta)

```js
let c = ["Brais", "Moure", "mouredev", 37, true]

let copia = c.slice(1, 3)
console.log(copia) // → [ 'Moure', 'mouredev' ]
console.log(c)     // → intacto

c.splice(1, 2, "Nueva entrada") // borra 2 desde el índice 1 e inserta
console.log(c) // → [ 'Brais', 'Nueva entrada', 37, true ]
```

### Acceso, búsqueda y comprobación

```js
let nums = [10, 20, 30, 40]
console.log(nums[1])           // → 20
console.log(nums.at(-1))       // → 40 (último, índice negativo)
console.log(nums.includes(30)) // → true
console.log(nums.indexOf(30))  // → 2
console.log(nums.indexOf(99))  // → -1 (no está)
console.log(Array.isArray(nums)) // → true

console.log(nums.find(n => n > 25))      // → 30 (el primero que cumple)
console.log(nums.findIndex(n => n > 25)) // → 2
console.log(nums.some(n => n > 35))      // → true (al menos uno)
console.log(nums.every(n => n > 5))      // → true (todos)
```

### Iteración funcional: `forEach`, `map`, `filter`, `reduce`

```js
let valores = [1, 2, 3, 4]

valores.forEach((v, i) => console.log(i, v)) // recorre (no devuelve nada)

let dobles = valores.map(v => v * 2)
console.log(dobles)  // → [ 2, 4, 6, 8 ]
console.log(valores) // → [ 1, 2, 3, 4 ] (intacto: no muta)

let pares = valores.filter(v => v % 2 === 0)
console.log(pares)   // → [ 2, 4 ]

let suma = valores.reduce((acc, v) => acc + v, 0)
console.log(suma)    // → 10
```

### Ordenar y dar la vuelta (mutan: copia antes si necesitas el original)

```js
let n = [10, 2, 1, 21]
console.log([...n].sort())            // → [ 1, 10, 2, 21 ] (orden de TEXTO)
console.log([...n].sort((a, b) => a - b)) // → [ 1, 2, 10, 21 ] (numérico)
console.log([...n].reverse())         // → [ 21, 1, 2, 10 ]

console.log(["a", "b", "c"].join("-")) // → a-b-c
console.log([1, [2, [3]]].flat(2))     // → [ 1, 2, 3 ]
```

### Copiar, combinar y convertir (spread / destructuring / `Array.from`)

```js
let base = [1, 2, 3]
let copiaArr = [...base]            // copia superficial
let combinado = [...base, 4, 5]     // combinar/añadir
let unido = [...base, ...[6, 7]]    // unir dos arrays

let [primero, segundo, ...resto] = base // destructuring + rest
console.log(primero, segundo, resto)    // → 1 2 [ 3 ]

console.log(Array.from("abc"))          // → [ 'a', 'b', 'c' ]
console.log(Array.from({ length: 3 }, (_, i) => i)) // → [ 0, 1, 2 ]
console.log(Array.of(7))                // → [ 7 ] (no un array de longitud 7)
```

## Buenas prácticas y errores comunes

- **Cuidado con los métodos que mutan** (`sort`, `reverse`, `splice`, `push`...): si necesitas conservar el original, copia antes con `[...arr]`.
- **`sort` ordena como texto por defecto**: `[10, 2].sort()` → `[10, 2]`. Para números usa siempre `sort((a, b) => a - b)`.
- **Copiar un array no es `arr2 = arr1`**: eso copia la referencia; ambos apuntan al mismo array. Usa `[...arr1]` (copia **superficial**: objetos anidados se siguen compartiendo).
- **`forEach` no se puede cortar** con `break`/`return` ni devuelve valor: si necesitas parar, usa `for...of`, `some` o `find`.
- **Prefiere `map`/`filter`/`reduce`** sobre bucles manuales cuando transformes datos: más legible y sin índices que mantener.
- **No compares arrays con `===`**: `[1] === [1]` es `false` (compara referencias, no contenido).
- **`length` no garantiza elementos reales**: en arrays dispersos hay huecos `empty` que se comportan distinto en `map`/`forEach`.
