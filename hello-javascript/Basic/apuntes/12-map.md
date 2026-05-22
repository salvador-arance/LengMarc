# Clase 27 · Maps

> Lección: [`Basic/12-map.js`](../12-map.js) — [Vídeo](https://youtu.be/1glVfFxj8a4?t=10755)

## Conceptos

Un **Map** es una colección de pares **clave → valor**. Se parece a un objeto, pero está pensado específicamente para asociar datos por clave, mantiene el **orden de inserción** y **cualquier tipo** puede ser clave (no solo strings).

- **Declaración**: `new Map()`, opcionalmente inicializado con un array de pares `[clave, valor]`.
- **`set` / `get`**: guardar y recuperar valores por su clave. Si haces `set` sobre una clave existente, se sobrescribe su valor. `set` **devuelve el propio Map**, así que se puede **encadenar**.
- **`has` / `delete`**: comprobar si existe una clave y eliminarla.
- **`keys` / `values` / `entries`**: iteradores de claves, valores o pares.
- **`size` / `clear`**: contar elementos y vaciar el Map por completo.
- **Es iterable**: se recorre con `for...of` (cada vuelta es `[clave, valor]`), `forEach` o spread.
- **Claves de cualquier tipo**: objetos, funciones, números... La igualdad de claves es por **identidad** (como `===`, con `NaN` igual a `NaN`). Dos objetos distintos son claves distintas.
- **Map vs objeto**: usa Map cuando las claves son dinámicas, no-string, o necesitas tamaño/iteración fiables; el objeto sigue siendo cómodo para datos fijos conocidos.
- **`WeakMap`**: variante con claves objeto que no impiden la recolección de memoria (uso avanzado).

## Definiciones

### Base

- **Map**: estructura de pares clave-valor con orden de inserción.
- **`new Map([[k, v], ...])`**: crea un Map, opcionalmente con pares iniciales.
- **`.size`**: número de pares.

### Métodos

- **`.set(clave, valor)`**: añade o actualiza el par; **devuelve el Map** (encadenable).
- **`.get(clave)`**: devuelve el valor de la clave (o `undefined` si no existe).
- **`.has(clave)`**: `true`/`false` según si la clave existe.
- **`.delete(clave)`**: elimina el par; devuelve `true`/`false`.
- **`.clear()`**: elimina todos los pares.

### Iteración y conversión

- **`.keys()` / `.values()` / `.entries()`**: iteradores de claves / valores / pares.
- **`.forEach((valor, clave) => ...)`**: recorre cada par (¡valor primero, clave después!).
- **`[...map]`**: array de pares `[clave, valor]`.
- **`Object.fromEntries(map)`**: convierte el Map en objeto (claves string/symbol).
- **`new Map(Object.entries(obj))`**: convierte un objeto en Map.

## Snippets de código

### Declaración e inicialización

```js
let myMap = new Map()

myMap = new Map([
  ["name", "Brais"],
  ["email", "braismoure@mouredev.com"],
  ["age", 37],
])
```

### `set` y `get` (set sobre clave existente la sobrescribe)

```js
myMap.set("alias", "mouredev")
myMap.set("name", "Brais Moure") // sobrescribe "Brais"

console.log(myMap.get("name"))    // → Brais Moure
console.log(myMap.get("surname")) // → undefined (no existe)
```

### `has` y `delete`

```js
console.log(myMap.has("surname")) // → false
console.log(myMap.has("age"))     // → true

myMap.delete("email")
```

### `keys`, `values`, `entries`, `size` y `clear`

```js
console.log(myMap.keys())    // → [Map Iterator] { 'name', 'age', 'alias' }
console.log(myMap.values())  // → [Map Iterator] { ... }
console.log(myMap.entries()) // → [Map Entries] { [k, v], ... }
console.log(myMap.size)      // → 3

myMap.clear()
console.log(myMap) // → Map(0) {}
```

### Recorrer un Map

```js
let m = new Map([["a", 1], ["b", 2]])

for (const [clave, valor] of m) {
  console.log(clave, valor)        // → a 1 / b 2
}

m.forEach((valor, clave) => console.log(clave, "=", valor)) // → a = 1 / b = 2

console.log([...m.keys()])   // → [ 'a', 'b' ]
console.log([...m.values()]) // → [ 1, 2 ]
console.log([...m])          // → [ [ 'a', 1 ], [ 'b', 2 ] ]
```

### Encadenar `set` y usar claves no-string

```js
let conf = new Map()
conf.set("debug", true).set("nivel", 3).set("nombre", "app") // encadenado
console.log(conf.size) // → 3

let objKey = { id: 1 }
let fnKey = () => {}
let m2 = new Map()
m2.set(objKey, "valor por objeto")
m2.set(fnKey, "valor por función")
console.log(m2.get(objKey))      // → valor por objeto
console.log(m2.get({ id: 1 }))   // → undefined (otro objeto distinto)
```

### Conversión Map ↔ objeto

```js
let mapa = new Map([["name", "Brais"], ["age", 37]])

let obj = Object.fromEntries(mapa)       // Map → objeto
console.log(obj)                          // → { name: 'Brais', age: 37 }

let deVuelta = new Map(Object.entries(obj)) // objeto → Map
console.log(deVuelta.get("name"))         // → Brais
```

## Buenas prácticas y errores comunes

- **`forEach` pasa `(valor, clave)`**, en ese orden — al revés que la intuición. Cuidado al desestructurar.
- **Las claves objeto se comparan por referencia**: `map.get({id:1})` no encuentra lo guardado con otro `{id:1}`. Guarda la referencia si necesitas recuperarla.
- **Usa Map en vez de objeto** cuando: las claves no son strings, se añaden/quitan claves con frecuencia, necesitas `size` o iterar en orden de inserción de forma fiable.
- **El objeto tiene claves heredadas del prototipo** (`toString`, etc.); el Map solo contiene lo que insertas: más seguro para datos arbitrarios del usuario.
- **No accedas con corchetes**: `map["clave"]` crea una propiedad normal del objeto Map, no usa el almacenamiento del Map. Usa siempre `set`/`get`.
- **`new Map(obj)` no funciona**: el constructor espera un iterable de pares; convierte primero con `Object.entries(obj)`.
