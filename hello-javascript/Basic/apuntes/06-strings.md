# Clase 21 · Strings

> Lección: [`Basic/06-strings.js`](../06-strings.js) — [Vídeo](https://youtu.be/1glVfFxj8a4?t=6565)

## Conceptos

Un **string** es una cadena de texto: una secuencia ordenada de caracteres. Es uno de los tipos primitivos de JavaScript.

- **Formas de escribirlo**: comillas dobles `"..."`, comillas simples `'...'` o backticks `` `...` `` (template literals). Las tres crean strings; los backticks añaden multilínea e interpolación.
- **Inmutabilidad**: un string **no se puede modificar** una vez creado. Todos los métodos que "transforman" en realidad **devuelven un string nuevo**; el original queda intacto.
- **Indexado**: cada carácter tiene una posición (índice) que empieza en `0`. Se accede con `[i]` o, mejor, con `.at(i)` (admite índices negativos).
- **Longitud**: `.length` cuenta el número de unidades de código (no siempre coincide con "caracteres visibles" si hay emojis).
- **Concatenación**: unir strings con `+`, `+=`, `.concat()` o, idealmente, con template literals.
- **Métodos**: funciones propias del string para buscar, extraer, transformar o consultar. Ninguno muta el original.
- **Caracteres de escape**: secuencias como `\n`, `\t` o `\"` para representar saltos de línea, tabulaciones o comillas dentro del texto.
- **Conversión**: cualquier valor se puede pasar a string (`String(x)`, `${x}`, `x.toString()`) y un string numérico se puede pasar a número (`Number()`, `parseInt()`, `+`).

## Definiciones

### Propiedades y acceso

- **`.length`**: número de unidades de código del string.
- **`str[i]`**: carácter en la posición `i` (o `undefined` si se sale).
- **`.at(i)`**: carácter en la posición `i`; admite índices **negativos** (`-1` = último).
- **`.charAt(i)`**: como `[i]`, pero devuelve `""` si se sale del rango.
- **`.charCodeAt(i)` / `.codePointAt(i)`**: código numérico del carácter en `i`.

### Búsqueda

- **`.indexOf(txt)`**: posición de la **primera** aparición de `txt`, o `-1` si no está.
- **`.lastIndexOf(txt)`**: posición de la **última** aparición, o `-1`.
- **`.includes(txt)`**: `true` / `false` según si contiene `txt`.
- **`.startsWith(txt)` / `.endsWith(txt)`**: `true` / `false` según empiece / termine por `txt`.
- **`.search(regex)` / `.match(regex)` / `.matchAll(regex)`**: búsqueda con expresiones regulares.

### Extracción

- **`.slice(inicio, fin)`**: porción desde `inicio` hasta `fin` (sin incluir `fin`); admite índices negativos.
- **`.substring(inicio, fin)`**: similar a `slice`, pero **no** admite negativos y reordena los argumentos si `inicio > fin`.
- **`.split(separador)`**: divide el string en un **array** usando `separador`.

### Transformación (devuelven un string nuevo)

- **`.toUpperCase()` / `.toLowerCase()`**: a mayúsculas / minúsculas.
- **`.trim()` / `.trimStart()` / `.trimEnd()`**: elimina espacios sobrantes (a ambos lados / al inicio / al final).
- **`.padStart(n, relleno)` / `.padEnd(n, relleno)`**: rellena hasta longitud `n` por delante / por detrás.
- **`.repeat(n)`**: repite el string `n` veces.
- **`.replace(a, b)`**: cambia la **primera** aparición de `a` por `b`.
- **`.replaceAll(a, b)`**: cambia **todas** las apariciones de `a` por `b`.
- **`.concat(...strings)`**: concatena strings (equivale a `+`).

### Comparación

- **`===`**: compara dos strings carácter a carácter (sensible a mayúsculas).
- **`.localeCompare(otro)`**: compara según el idioma; devuelve `-1`, `0` o `1` (útil para ordenar).

## Snippets de código

### Formas de crear un string

```js
let dobles = "Hola"
let simples = 'Hola'
let plantilla = `Hola`
let conComillas = 'Dijo "hola"'  // comillas distintas para no escapar
console.log(typeof dobles)       // → string

// String como primitivo vs objeto (evita `new String`)
let prim = "texto"
let obj = new String("texto")
console.log(typeof prim)         // → string
console.log(typeof obj)          // → object
console.log(prim === "texto")    // → true
console.log(obj === "texto")     // → false (es un objeto envoltorio)
```

### Inmutabilidad

```js
let palabra = "hola"
palabra[0] = "H"                 // no hace nada (no lanza error en modo no estricto)
console.log(palabra)             // → hola

palabra = "H" + palabra.slice(1) // para "cambiarlo" hay que crear uno nuevo
console.log(palabra)             // → Hola
```

### Concatenación, longitud y acceso por índice

```js
let myName = "Brais"
let greeting = "Hola, " + myName + "!"
console.log(greeting)            // → Hola, Brais!
console.log(typeof greeting)     // → string
console.log(greeting.length)     // → 12
console.log(greeting[0])         // → H
console.log(greeting[11])        // → !
console.log(greeting[99])        // → undefined (fuera de rango)
console.log(greeting.at(-1))     // → ! (último carácter, índice negativo)
console.log(greeting.charAt(0))  // → H

let saludo = "Hola"
saludo += ", mundo"              // concatenar y reasignar
console.log(saludo)              // → Hola, mundo
```

### Caracteres de escape

```js
console.log("Línea 1\nLínea 2")  // → salto de línea
console.log("Col1\tCol2")        // → tabulación
console.log("Comillas: \"\"")    // → Comillas: ""
console.log('Apóstrofo: \'')     // → Apóstrofo: '
console.log("Barra: \\")         // → Barra: \
console.log("Unicode: ñ")   // → Unicode: ñ
```

### Recorrer un string

```js
let texto = "abc"

for (let i = 0; i < texto.length; i++) {
  console.log(texto[i])          // → a, b, c
}

for (const letra of texto) {
  console.log(letra)             // → a, b, c
}

console.log([...texto])          // → [ 'a', 'b', 'c' ]
```

### Búsqueda

```js
console.log(greeting.indexOf("Hola"))      // → 0
console.log(greeting.indexOf("MoureDev"))  // → -1 (no existe)
console.log(greeting.lastIndexOf("a"))     // → 9
console.log(greeting.includes("Brais"))    // → true
console.log(greeting.startsWith("Hola"))   // → true
console.log(greeting.endsWith("!"))        // → true
```

### Extracción

```js
console.log(greeting.slice(0, 10))   // → Hola, Brai
console.log(greeting.slice(-6))      // → Brais! (desde el final)
console.log(greeting.substring(6, 11)) // → Brais

let csv = "rojo,verde,azul"
console.log(csv.split(","))          // → [ 'rojo', 'verde', 'azul' ]
console.log("hola".split(""))        // → [ 'h', 'o', 'l', 'a' ]
```

### Transformación

```js
console.log(greeting.toUpperCase())  // → HOLA, BRAIS!
console.log(greeting.toLowerCase())  // → hola, brais!
console.log("  hola  ".trim())       // → "hola"
console.log("5".padStart(3, "0"))    // → 005
console.log("ab".repeat(3))          // → ababab
console.log(greeting.replace("Brais", "MoureDev"))    // → Hola, MoureDev!
console.log("a-b-a".replace("a", "X"))                // → X-b-a (solo la 1ª)
console.log("a-b-a".replaceAll("a", "X"))             // → X-b-X (todas)
```

### Comparación

```js
console.log("abc" === "abc")         // → true
console.log("abc" === "ABC")         // → false (sensible a mayúsculas)
console.log("a" < "b")               // → true (orden por código)
console.log("manzana".localeCompare("naranja")) // → -1 (va antes)

// Comparar ignorando mayúsculas/minúsculas
console.log("Hola".toLowerCase() === "hola".toLowerCase()) // → true
```

### Template literals (multilínea e interpolación)

```js
let message = `Hola, este
es mi
curso de
JavaScript`
console.log(message)                 // → se imprime en 4 líneas

let email = "braismoure@mouredev.com"
console.log(`Hola, ${myName}! Tu email es ${email}.`)
// → Hola, Brais! Tu email es braismoure@mouredev.com.

// Se pueden poner expresiones dentro de ${...}
let a = 2, b = 3
console.log(`${a} + ${b} = ${a + b}`)            // → 2 + 3 = 5
console.log(`Mayúsculas: ${myName.toUpperCase()}`) // → Mayúsculas: BRAIS
```

### Conversión entre strings y números

```js
// Número → string
console.log(String(42))          // → "42"
console.log((42).toString())     // → "42"
console.log(`${42}`)             // → "42"
console.log(7 + "")              // → "7" (truco con concatenación)

// String → número
console.log(Number("42"))        // → 42
console.log(Number("42px"))      // → NaN (no es un número válido)
console.log(parseInt("42px"))    // → 42 (lee mientras pueda)
console.log(parseFloat("3.14m")) // → 3.14
console.log(+"42")               // → 42 (operador unario +)
```

### Unicode y emojis (cuidado con `.length`)

```js
let emoji = "😀"
console.log(emoji.length)        // → 2 (¡no 1! ocupa 2 unidades de código)
console.log([...emoji].length)   // → 1 (el spread cuenta caracteres reales)
console.log("café".length)       // → 4
```

## Buenas prácticas y errores comunes

- **Usa template literals** en lugar de concatenar con `+` cuando mezcles texto y variables: es más legible.
- **Recuerda la inmutabilidad**: `str.toUpperCase()` no cambia `str`; tienes que **guardar el resultado** (`str = str.toUpperCase()`).
- **No uses `new String(...)`**: crea un objeto, no un primitivo, y rompe las comparaciones con `===`.
- **`slice` vs `substring`**: usa `slice` (admite índices negativos y es más predecible).
- **Comparar texto del usuario**: normaliza con `.trim()` y `.toLowerCase()` antes de comparar.
- **`==` vs `===`**: usa siempre `===`; `"5" == 5` es `true` (conversión implícita) y suele dar errores.
- **`.length` con emojis**: no asumas que cuenta caracteres visibles; usa `[...str].length` si necesitas el conteo real.
