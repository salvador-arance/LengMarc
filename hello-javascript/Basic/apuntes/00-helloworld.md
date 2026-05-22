# Clase 15 · Hola mundo

> Lección: [`Basic/00-helloworld.js`](../00-helloworld.js) — [Vídeo](https://youtu.be/1glVfFxj8a4?t=2390)

## Conceptos

Primer contacto con JavaScript. Se cubren tres cosas básicas:

1. **Comentarios**: texto que el motor de JavaScript ignora. Sirven para documentar el código. Hay de una línea (`//`) y de varias líneas (`/* ... */`).
2. **`console.log()`**: la función que imprime (muestra) un valor por la consola. Es la herramienta principal para ver qué hace nuestro programa.
3. **Tipos de comillas y valores**: una cadena de texto se puede escribir con tres comillas distintas, y `console.log` puede mostrar tanto texto como números o el resultado de operaciones aritméticas.

## Definiciones

- **Comentario de línea (`//`)**: ignora todo lo que haya desde `//` hasta el final de la línea.
- **Comentario de bloque (`/* */`)**: ignora todo lo que haya entre `/*` y `*/`, aunque ocupe varias líneas. Sirve también para "desactivar" código temporalmente.
- **`console.log(valor)`**: instrucción que escribe `valor` en la consola.
- **String (cadena de texto)**: secuencia de caracteres. Se delimita con comillas dobles `"..."`, comillas simples `'...'` o comillas invertidas (backticks) `` `...` ``.
- **Operadores aritméticos**: símbolos para hacer cálculos: suma `+`, resta `-`, multiplicación `*`, división `/`, módulo (resto) `%` y exponente `**`.

## Snippets de código

Comentarios:

```js
// Esto es un comentario simple

/*
Esto es
un comentario
en varias líneas
*/
```

Imprimir texto con las tres comillas (las tres producen lo mismo):

```js
console.log("¡Hola, JavaScript!") // → ¡Hola, JavaScript!
console.log('¡Hola, JavaScript!') // → ¡Hola, JavaScript!
console.log(`¡Hola, JavaScript!`) // → ¡Hola, JavaScript!
```

Desactivar código con comentarios (estas líneas no se ejecutan):

```js
// console.log("¡Hola, JavaScript!")

/*
console.log("¡Hola, JavaScript!")
console.log('¡Hola, JavaScript!')
*/
```

Texto vs. número, y operaciones aritméticas:

```js
console.log("5")    // → 5   (es un string, texto)
console.log(5)      // → 5   (es un number)
console.log(5 + 2)  // → 7   (suma)
console.log(5 - 2)  // → 3   (resta)
console.log(5 * 2)  // → 10  (multiplicación)
console.log(5 / 2)  // → 2.5 (división)
console.log(5 % 2)  // → 1   (módulo: resto de la división)
console.log(5 ** 2) // → 25  (exponente: 5 elevado a 2)
```
