# Clase 17 · Tipos de datos

> Lección: [`Basic/02-datatypes.js`](../02-datatypes.js) — [Vídeo](https://youtu.be/1glVfFxj8a4?t=3599)

## Conceptos

Cada valor en JavaScript tiene un **tipo de dato**. Los **tipos primitivos** son los bloques básicos del lenguaje:

- **string**: texto.
- **number**: números, tanto enteros como decimales (no hay distinción entre ellos).
- **boolean**: verdadero o falso (`true` / `false`).
- **undefined**: una variable declarada pero a la que aún no se le ha dado valor.
- **null**: ausencia de valor *intencionada* (asignada por el programador).
- **symbol**: identificador único e inmutable.
- **bigint**: números enteros muy grandes, más allá del límite seguro de `number`.

Con el operador **`typeof`** podemos preguntar de qué tipo es un valor. Una curiosidad histórica: `typeof null` devuelve `"object"` (es un error conocido del lenguaje que se mantiene por compatibilidad).

## Definiciones

- **Tipo primitivo**: valor simple e inmutable; no es un objeto.
- **`undefined`**: valor por defecto de una variable sin inicializar.
- **`null`**: "vacío" asignado a propósito; representa "ningún valor".
- **`Symbol(desc)`**: crea un valor único; aunque dos symbols tengan la misma descripción, son distintos.
- **`BigInt`**: tipo para enteros enormes; se crea con `BigInt(...)` o añadiendo `n` al final del número.
- **`typeof valor`**: operador que devuelve, como string, el tipo del valor.

## Snippets de código

Declaración de valores de cada tipo primitivo:

```js
// string
let myName = "Brais Moure"
let alias = 'MoureDev'
let email = `braismoure@mouredev.com`

// number (no se distingue entero de decimal)
let age = 37     // Entero
let height = 1.77 // Decimal

// boolean
let isTeacher = true
let isStudent = false

// undefined (declarada pero sin valor)
let undefinedValue
console.log(undefinedValue) // → undefined

// null (vacío intencionado)
let nullValue = null

// symbol
let mySymbol = Symbol("mysymbol")

// bigint (dos formas equivalentes)
let myBigInt = BigInt(817239871289371986589716389471628379612983761289376129)
let myBigInt2 = 817239871289371986589716389471628379612983761289376129n
```

Comprobación de tipos con `typeof`:

```js
console.log(typeof myName)        // → string
console.log(typeof age)           // → number
console.log(typeof height)        // → number
console.log(typeof isTeacher)     // → boolean
console.log(typeof undefinedValue)// → undefined
console.log(typeof nullValue)     // → object  (¡error histórico de JS!)
console.log(typeof mySymbol)      // → symbol
console.log(typeof myBigInt)      // → bigint
console.log(typeof myBigInt2)     // → bigint
```
