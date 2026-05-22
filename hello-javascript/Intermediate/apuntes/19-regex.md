# Clases 75 a 78 · Expresiones regulares

> Lección: [`Intermediate/19-regex.js`](../19-regex.js) — [Vídeo](https://youtu.be/iJvLAZ8MJ2E?t=24363)

## Conceptos

Una **expresión regular** (regex) es un patrón para buscar, validar o
reemplazar texto. En JavaScript se usan con métodos propios del objeto `RegExp`
y con métodos de `String`.

- **Sintaxis**: literal entre barras **`/patrón/`** o con el constructor
  **`RegExp("patrón")`**.
- **Clases y cuantificadores**:
  - **`\d`**: cualquier dígito. **`[4-6]`**: un carácter en ese rango.
  - **Flag `g`** (global): busca **todas** las coincidencias, no solo la
    primera.
- **`test()`**: devuelve **`true`/`false`** según haya coincidencia.
- **`replace()`** (de String): reemplaza el texto que coincide con el patrón.
- **`exec()`**: devuelve **detalles** de la coincidencia (texto, índice…) o
  `null`. Con la flag `g` y un bucle **`while`** se recorren todas las
  coincidencias una a una.

## Definiciones

- **Expresión regular**: patrón de búsqueda/validación de texto.
- **`/abc/`** / **`RegExp("abc")`**: dos formas de crear una regex.
- **`\d`**: metacarácter para un dígito (0-9).
- **`[4-6]`**: clase de caracteres (un carácter entre 4 y 6).
- **Flag `g`**: modo global (todas las coincidencias).
- **`regex.test(str)`**: `true` si hay coincidencia.
- **`str.replace(regex, reemplazo)`**: sustituye coincidencias.
- **`regex.exec(str)`**: devuelve la siguiente coincidencia con detalles, o
  `null`.

## Snippets de código

Crear regex y `test`:

```js
const regex  = /abc/
const regex2 = RegExp("abc")
const text = "Hola abc JavaScript"

console.log(regex.test(text))  // → true
console.log(regex2.test(text)) // → true

const text2  = "Mi edad es 37"
const regex3 = /\d/g           // un dígito, global
const regex4 = /[4-6]/         // un carácter entre 4 y 6
console.log(regex3.test(text2)) // → true
console.log(regex4.test(text2)) // → false (solo hay 3 y 7)
```

`replace` (sustituir coincidencias):

```js
const regex5 = /JavaScript/
console.log("Hola JavaScript".replace(regex5, "JS")) // → "Hola JS"

const text3 = "Estoy contando 1 2 3 4 5 6 7"
console.log(text3.replace(regex3, "[número]"))
// → "Estoy contando [número] [número] ... [número]"
```

`exec` y recorrido de todas las coincidencias con `while`:

```js
console.log(regex3.exec(text3)) // detalles de la 1ª coincidencia

let match
while ((match = regex3.exec(text3)) !== null) {
  console.log(match) // cada dígito, uno a uno (gracias a la flag g)
}
```
