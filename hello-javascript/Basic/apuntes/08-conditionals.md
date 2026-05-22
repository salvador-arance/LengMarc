# Clase 23 · Condicionales

> Lección: [`Basic/08-conditionals.js`](../08-conditionals.js) — [Vídeo](https://youtu.be/1glVfFxj8a4?t=7277)

## Conceptos

Los **condicionales** permiten que el programa **tome decisiones**: ejecutar un bloque de código u otro según si una condición es verdadera o falsa.

- **`if`**: ejecuta su bloque solo si la condición es `true`.
- **`else`**: bloque alternativo cuando el `if` es `false`.
- **`else if`**: encadena varias condiciones; se evalúan en orden y se ejecuta la primera que sea verdadera.
- **Operador ternario**: versión compacta de `if/else` que **devuelve un valor**, ideal para asignaciones.
- **`switch`**: alternativa al `if/else if` largo cuando comparamos **una misma variable** contra varios valores concretos.

## Definiciones

- **Condición**: expresión que se evalúa a `true` o `false`.
- **`if (cond) { ... }`**: ejecuta el bloque si `cond` es verdadera.
- **`else { ... }`**: se ejecuta si ningún `if`/`else if` previo se cumplió.
- **`else if (cond) { ... }`**: condición adicional encadenada.
- **`switch (valor)`**: compara `valor` con cada `case`.
- **`case`**: cada posible valor a comparar dentro del `switch`.
- **`break`**: corta el `switch` para que no siga ejecutando los siguientes `case`.
- **`default`**: bloque que se ejecuta si ningún `case` coincide.

## Snippets de código

`if`, `else` y `else if`:

```js
let age = 37

if (age == 37) {
  console.log("La edad es 37")
}

if (age == 37) {
  console.log("La edad es 37")
} else {
  console.log("La edad no es 37")
}

if (age == 37) {
  console.log("La edad es 37")
} else if (age < 18) {
  console.log("Es menor de edad")
} else {
  console.log("La edad no es 37 ni es menor de edad")
}
// → La edad es 37
```

Operador ternario (devuelve un valor):

```js
const message = age == 37 ? "La edad es 37" : "La edad no es 37"
console.log(message) // → La edad es 37
```

`switch` (sin `break`, la ejecución "caería" al siguiente `case`):

```js
let day = 3
let dayName

switch (day) {
  case 0: dayName = "Lunes"; break
  case 1: dayName = "Martes"; break
  case 2: dayName = "Miércoles"; break
  case 3: dayName = "Jueves"; break
  case 4: dayName = "Viernes"; break
  case 5: dayName = "Sábado"; break
  case 6: dayName = "Domingo"; break
  default: dayName = "Número de día incorrecto"
}

console.log(dayName) // → Jueves
```
