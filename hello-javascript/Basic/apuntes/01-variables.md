# Clase 16 · Variables

> Lección: [`Basic/01-variables.js`](../01-variables.js) — [Vídeo](https://youtu.be/1glVfFxj8a4?t=3049)

## Conceptos

Una **variable** es un contenedor con nombre donde guardamos un valor para usarlo o cambiarlo más tarde. En JavaScript hay tres formas de declarar variables: `var`, `let` y `const`. La diferencia clave entre ellas es **si su valor se puede reasignar** (y, más adelante, su ámbito o *scope*).

- `var`: forma antigua. Se puede reasignar. Hoy se recomienda evitarla.
- `let`: forma moderna para valores que **van a cambiar**. Se puede reasignar.
- `const`: para valores que **no van a cambiar**. Si intentas reasignarla, se produce un error. Es la opción recomendada por defecto.

Regla práctica: usa `const` siempre que puedas, `let` si necesitas reasignar, y `var` casi nunca.

## Definiciones

- **Declarar**: crear la variable indicando su nombre (`let edad`).
- **Inicializar**: darle su primer valor (`let edad = 37`).
- **Reasignar**: cambiar el valor de una variable ya existente (`edad = 38`), sin volver a usar `let`/`const`.
- **`var`**: declara una variable reasignable (mecanismo heredado).
- **`let`**: declara una variable reasignable con ámbito de bloque.
- **`const`**: declara una constante; su asignación no puede cambiarse después.

## Snippets de código

`var` — se puede reasignar:

```js
var helloWorld = "¡Hola, JavaScript!"
console.log(helloWorld) // → ¡Hola, JavaScript!

helloWorld = "¡Hola de nuevo, JavaScript!"
console.log(helloWorld) // → ¡Hola de nuevo, JavaScript!
```

`let` — también se puede reasignar:

```js
let helloWorld2 = "¡Hola, JavaScript 2!"
console.log(helloWorld2) // → ¡Hola, JavaScript 2!

helloWorld2 = "¡Hola de nuevo, JavaScript 2!"
console.log(helloWorld2) // → ¡Hola de nuevo, JavaScript 2!
```

`const` — NO se puede reasignar:

```js
const helloWorld3 = "¡Hola, JavaScript 3!"
console.log(helloWorld3) // → ¡Hola, JavaScript 3!

// Las siguientes líneas darían un error:
// TypeError: Assignment to constant variable.
// helloWorld3 = "¡Hola de nuevo, JavaScript 3!"
// console.log(helloWorld3)
```
