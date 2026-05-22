# Clase 19 · Operadores

> Lección: [`Basic/04-operators.js`](../04-operators.js) — [Vídeo](https://youtu.be/1glVfFxj8a4?t=4937)

## Conceptos

Los **operadores** son símbolos que realizan operaciones sobre uno o más valores (*operandos*). Categorías:

- **Aritméticos**: cálculos matemáticos, más incremento `++` y decremento `--`.
- **De asignación**: dan o actualizan el valor de una variable. Los compuestos (`+=`, `-=`, etc.) combinan operación + asignación.
- **De comparación**: comparan dos valores y devuelven un `boolean`. Distinción crucial entre `==` (compara solo el valor, con conversión de tipos) y `===` (compara valor **y** tipo, sin conversión). Se recomienda usar siempre `===`.
- **Lógicos**: `&&` (y), `||` (o), `!` (no). Combinan condiciones.
- **Ternario**: forma corta de un `if/else` que devuelve un valor.

También aparece el concepto de **truthy / falsy**: cualquier valor, sin ser `boolean`, se comporta como verdadero o falso en un contexto booleano.

## Definiciones

- **Coerción de tipos**: conversión automática de un tipo a otro que hace `==` (p. ej. `5 == "5"` es `true`).
- **`==` (igualdad por valor)**: compara tras convertir tipos.
- **`===` (igualdad estricta)**: compara valor y tipo, sin convertir.
- **`!=` / `!==`**: desigualdad por valor / estricta.
- **Truthy**: valores que equivalen a `true` (todos los números salvo `0`, strings no vacíos, `true`...).
- **Falsy**: `0`, `0n`, `null`, `undefined`, `NaN`, `false` y la cadena vacía `""`.
- **Operador ternario**: `condición ? valorSiVerdadero : valorSiFalso`.

## Snippets de código

Aritméticos, incremento y decremento:

```js
let a = 5
let b = 10

console.log(a + b)  // → 15
console.log(a % b)  // → 5  (resto)
console.log(a ** b) // → 9765625 (exponente)

a++ // Incremento → a = 6
b-- // Decremento → b = 9
```

Asignación compuesta:

```js
let myVariable = 2
myVariable += 2 // suma y asigna → 4
myVariable -= 2 // resta y asigna
myVariable *= 2 // multiplica y asigna
myVariable /= 2 // divide y asigna
myVariable %= 2 // módulo y asigna
myVariable **= 2 // exponente y asigna
```

Comparación y coerción (`==` vs `===`):

```js
console.log(a == 6)       // → true   (mismo valor)
console.log(a == "6")     // → true   (convierte el string a número)
console.log(a === "6")    // → false  (distinto tipo)
console.log(0 == false)   // → true   (coerción)
console.log(0 == "")      // → true
console.log(0 === "")     // → false
console.log(undefined == null)  // → true
console.log(undefined === null) // → false
```

Lógicos y negación:

```js
console.log(5 < 10 && 15 < 20) // → true  (and: ambas verdaderas)
console.log(5 > 10 || 15 > 20) // → false (or: ninguna verdadera)
console.log(!true)             // → false (not)
console.log(!(5 > 10 && 15 > 20)) // → true
```

Operador ternario:

```js
const isRaining = false
isRaining
  ? console.log("Está lloviendo")
  : console.log("No está lloviendo") // → No está lloviendo
```
