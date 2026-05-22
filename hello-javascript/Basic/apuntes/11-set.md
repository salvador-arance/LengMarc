# Clase 26 · Sets

> Lección: [`Basic/11-set.js`](../11-set.js) — [Vídeo](https://youtu.be/1glVfFxj8a4?t=9952)

## Conceptos

Un **Set** es una colección de valores **sin duplicados**. A diferencia de un array, un `Set` no admite elementos repetidos: si añades el mismo valor varias veces, solo se guarda una. Es ideal para listas de elementos únicos.

- **Declaración**: con `new Set()`, opcionalmente inicializado desde un iterable (normalmente un array).
- **Métodos**: `add` (añadir), `delete` (eliminar), `has` (comprobar existencia), `clear` (vaciar).
- **Propiedad `size`**: número de elementos (equivale al `length` de los arrays).
- **Es iterable**: mantiene el **orden de inserción** y se puede recorrer con `for...of`, `forEach` o spread.
- **Unicidad por identidad**: usa una comparación tipo `===` (con la salvedad de que `NaN` se considera igual a `NaN`). Dos objetos distintos son siempre únicos aunque tengan el mismo contenido.
- **Conversión**: `[...set]` o `Array.from(set)` → array; `new Set(array)` → Set (eliminando duplicados de paso). Patrón clásico para **quitar duplicados** de un array.
- **Sensible a mayúsculas y a tipo**: `"a"` y `"A"` son distintos; `1` y `"1"` también.
- **`WeakSet`**: variante que solo guarda objetos y no impide que se recolecten en memoria (uso avanzado).

## Definiciones

### Base

- **Set**: colección de valores únicos, sin acceso por índice, con orden de inserción.
- **`new Set([...])`**: crea un Set, opcionalmente con valores iniciales.
- **`.size`**: cantidad de elementos.

### Métodos

- **`.add(x)`**: añade `x` (si ya existe, no hace nada); devuelve el propio Set (se puede encadenar).
- **`.delete(x)`**: elimina `x`; devuelve `true` si existía, `false` si no.
- **`.has(x)`**: devuelve `true`/`false` según si `x` está en el Set.
- **`.clear()`**: elimina todos los elementos.

### Iteración y conversión

- **`.forEach(fn)`**: ejecuta `fn` por cada valor.
- **`.values()` / `.keys()`**: iterador de los valores (en un Set son lo mismo).
- **`.entries()`**: iterador de pares `[valor, valor]` (por compatibilidad con Map).
- **`[...set]` / `Array.from(set)`**: convierte el Set en array.
- **`new Set(array)`**: convierte un array en Set (sin duplicados).

## Snippets de código

### Declaración e inicialización

```js
let mySet = new Set()

mySet = new Set(["Brais", "Moure", "mouredev", 37, true, "braismoure@mouredev.com"])
```

### `add`, `delete`, `has` y `size`

```js
mySet.add("https://moure.dev")
mySet.delete("https://moure.dev")

console.log(mySet.delete("Brais")) // → true (existía y se eliminó)
console.log(mySet.delete(4))       // → false (no existía)

console.log(mySet.has("Moure")) // → true
console.log(mySet.has("Brais")) // → false (se eliminó antes)
console.log(mySet.size)         // → número de elementos
```

### Conversión Set ↔ Array

```js
let myArray = Array.from(mySet) // Set → Array
mySet = new Set(myArray)        // Array → Set
```

### No admite duplicados (pero distingue mayúsculas)

```js
mySet.add("braismoure@mouredev.com")
mySet.add("braismoure@mouredev.com") // ignorado: ya existe
mySet.add("BraisMoure@mouredev.com") // SÍ se añade (mayúsculas distintas)
```

### Recorrer un Set

```js
let s = new Set(["a", "b", "c"])

for (const v of s) {
  console.log(v)                 // → a, b, c (orden de inserción)
}

s.forEach(v => console.log(v))   // → a, b, c
console.log([...s])              // → [ 'a', 'b', 'c' ]
console.log([...s.values()])     // → [ 'a', 'b', 'c' ]
```

### Eliminar duplicados de un array (patrón típico)

```js
let conRepetidos = [1, 1, 2, 3, 3, 3, 4]
let unicos = [...new Set(conRepetidos)]
console.log(unicos) // → [ 1, 2, 3, 4 ]
```

### Identidad: objetos y `NaN`

```js
let set = new Set()
set.add({ id: 1 })
set.add({ id: 1 })   // objeto DISTINTO aunque el contenido sea igual
console.log(set.size) // → 2

set.add(NaN)
set.add(NaN)          // NaN se considera igual a NaN aquí
console.log(set.has(NaN)) // → true
```

## Buenas prácticas y errores comunes

- **Úsalo cuando lo importante es la unicidad** (listas de IDs, eliminar duplicados, pertenencia rápida con `has`). Para datos por índice o repetidos, usa un array.
- **No tiene acceso por índice**: `set[0]` es `undefined`. Conviértelo a array (`[...set]`) si necesitas posiciones.
- **Objetos no se deduplican por contenido**: dos objetos `{id:1}` distintos cuentan como dos. La unicidad es por **referencia**.
- **`add` sobre un valor existente no lanza error**: simplemente se ignora.
- **`has` en un Set es más eficiente** que `includes` en un array grande para comprobar pertenencia.
- **`delete` devuelve booleano**, no el valor eliminado (a diferencia de `pop`/`shift` en arrays).
