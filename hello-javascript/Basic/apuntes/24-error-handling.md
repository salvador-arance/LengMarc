# Clase 40 · Manejo de errores

> Lección: [`Basic/24-error-handling.js`](../24-error-handling.js) — [Vídeo](https://youtu.be/1glVfFxj8a4?t=18751)

## Conceptos

Por mucho que cuidemos el código, en tiempo de ejecución pueden pasar cosas que no estaban previstas: un dato llega en un formato raro, una propiedad no existe, una petición a un servidor falla... Cuando ocurre algo así, JavaScript **lanza una excepción**, que no es más que un objeto (normalmente un `Error`) que sube por la pila de llamadas buscando a alguien que se haga cargo de él. Si nadie lo recoge, ese error llega hasta arriba del todo y **el programa se detiene de golpe**.

Manejar errores consiste precisamente en eso: ponerse en medio para que un fallo no tumbe toda la aplicación, sino que podamos reaccionar de forma controlada (avisar al usuario, reintentar, guardar un registro, usar un valor por defecto...). La idea importante es que **un error no es el fin del mundo**: es información, y podemos decidir qué hacer con ella.

Las piezas que vamos a usar:

- **`try...catch`**: metemos en `try` el código que *sospechamos* que puede fallar. Si lanza una excepción, JavaScript abandona el resto del `try` y salta directamente al `catch`, en lugar de reventar el programa.
- **El objeto `error`**: lo que recibe `catch (error)` es el error en sí. Sus datos más útiles son `.message` (la descripción legible), `.name` (el tipo, p. ej. `"TypeError"`), `.stack` (el rastro de por dónde pasó el fallo, oro puro para depurar) y `.cause` (el error original que provocó este, desde ES2022).
- **`finally`**: un bloque que se ejecuta **pase lo que pase**: haya error o no, e incluso aunque haya un `return` de por medio. Es el sitio natural para "recoger la mesa" (cerrar una conexión, liberar un recurso).
- **`throw`**: lanzar un error a propósito cuando *nosotros* detectamos que algo no cuadra. Lo idiomático es lanzar un `Error` (o un subtipo), nunca un simple string: un string no tiene `stack` ni `name` y rompe las comprobaciones con `instanceof`.
- **Tipos de error integrados**: además del `Error` genérico, JavaScript trae subtipos que ya describen *qué* clase de fallo es: `TypeError`, `RangeError`, `ReferenceError`, `SyntaxError`, `URIError`, `EvalError`.
- **`instanceof`**: dentro del `catch` nos permite preguntar "¿de qué tipo es este error?" para reaccionar de forma distinta según el caso.
- **Excepciones personalizadas**: cuando los tipos de serie se nos quedan cortos, creamos una clase propia que `extends Error` para añadir nuestros propios datos y mensajes.
- **Errores asíncronos**: en `async/await` se capturan con un `try...catch` normal y corriente; en promesas "sueltas", con `.catch()`. Lo que **no** funciona es esperar atrapar una promesa rechazada con un `try` síncrono: para cuando el rechazo ocurre, el `try` ya terminó.

## Definiciones

### Bloques

- **Excepción**: un error que ocurre durante la ejecución e interrumpe el flujo normal del programa.
- **`try { }`**: el bloque "vigilado", donde va el código que podría fallar.
- **`catch (error) { }`**: el bloque que se hace cargo del error. El parámetro es **opcional** desde ES2019 (`catch { }` es válido si no necesitas inspeccionar el error).
- **`finally { }`**: se ejecuta siempre, después del `try`/`catch`, ocurra lo que ocurra.
- **`throw expr`**: lanza una excepción manualmente. A partir de ahí, el código que sigue *no* se ejecuta: el control salta al `catch` más cercano.
- **Relanzar (*re-throw*)**: hacer `throw error` dentro de un `catch` para pasarle el problema a un nivel superior cuando aquí no sabemos resolverlo.

### El objeto Error

- **`error.message`**: el texto descriptivo del fallo, pensado para que lo lea una persona.
- **`error.name`**: el nombre del tipo (`"TypeError"`, `"Error"`, el de tu clase personalizada...).
- **`error.stack`**: la traza de la pila de llamadas; te dice *desde dónde* se llegó al error.
- **`error.cause`**: el error subyacente, si se creó con `new Error(msg, { cause })`. Sirve para **encadenar** errores sin perder el original.

### Tipos integrados

- **`Error`**: la clase base de la que heredan todos los demás.
- **`TypeError`**: un valor no es del tipo esperado (p. ej. llamar como función a algo que no lo es, o leer una propiedad de `undefined`).
- **`RangeError`**: un valor está fuera del rango permitido (p. ej. un array de longitud negativa).
- **`ReferenceError`**: se usa una variable que no existe o aún no está inicializada.
- **`SyntaxError`**: el código (o un dato como un JSON) está mal formado; típico de `JSON.parse` con texto inválido.
- **`URIError`** / **`EvalError`**: errores de las funciones de URI y de `eval`; rara vez los verás.
- **`error instanceof Tipo`**: comprueba si el error pertenece a un tipo (o a uno que herede de él).
- **Excepción personalizada**: `class MiError extends Error { ... }`, para errores con significado propio en tu dominio.

## Snippets de código

### `try` / `catch` / `finally`

El caso más básico: leemos una propiedad de algo que es `undefined`, lo cual revienta. Sin el `try`, el programa moriría en esa línea; con él, seguimos vivos.

```js
let myObject

try {
  console.log(myObject.email) // 💥 produce una excepción
  console.log("esto NO se ejecuta") // el try se abandona en cuanto falla
} catch (error) {
  console.log("Se ha producido un error:", error.message)
} finally {
  console.log("Este código se ejecuta siempre")
}
```

### Lanzar errores con `throw`

A veces el fallo no lo provoca JavaScript: lo detectamos nosotros validando la entrada. En ese caso somos *nosotros* quienes lanzamos el error, eligiendo el tipo que mejor lo describe.

```js
function sumIntegers(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Esta operación sólo suma números")
  }
  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    throw new Error("Esta operación sólo suma números enteros")
  }
  return a + b
}

try {
  console.log(sumIntegers("5", 10)) // lanza TypeError
} catch (error) {
  console.log("Error:", error.message)
}
```

### Distinguir varios tipos de error con `instanceof`

Un mismo `catch` puede recibir errores de orígenes distintos. Con `instanceof` decidimos cómo tratar cada uno. Conviene comprobar **de lo más específico a lo más general**, porque todos los errores son también `instanceof Error`.

```js
try {
  console.log(sumIntegers("5", 10))
} catch (error) {
  if (error instanceof TypeError) {
    console.log("Error de tipo:", error.message)
  } else if (error instanceof Error) {
    console.log("Error genérico:", error.message)
  }
}
```

### Excepción personalizada (`extends Error`)

Cuando queremos un error con *significado propio* y datos extra, creamos una clase. Detalle importante que mucha gente olvida: conviene fijar `this.name` con el nombre de la clase, para que `error.name` y los mensajes de la consola sean claros.

```js
class SumZeroIntegerError extends Error {
  constructor(message, a, b) {
    super(message)            // mensaje del Error base
    this.name = "SumZeroIntegerError" // si no, error.name sería "Error"
    this.a = a
    this.b = b
  }
  printNumbers() {
    console.log(this.a, " + ", this.b)
  }
}

try {
  throw new SumZeroIntegerError("Se intenta sumar cero", 0, 10)
} catch (error) {
  console.log("Error personalizado:", error.message)
  error.printNumbers() // → 0  +  10
}
```

### Relanzar lo que no sabemos tratar

Un `catch` no está obligado a "tragarse" todos los errores. Si solo sabes resolver un tipo concreto, maneja ese y **relanza el resto** para que se encargue quien llamó a tu código.

```js
try {
  hacerAlgoQuePuedeFallar()
} catch (error) {
  if (error instanceof TypeError) {
    console.log("Esto sí sé arreglarlo:", error.message)
  } else {
    throw error // no es asunto mío: que lo gestione el de arriba
  }
}
```

### Propiedades del error: `name`, `stack`, `cause`

`cause` (ES2022) es muy útil para no perder el rastro: capturas un error de bajo nivel y lanzas otro más claro, pero **dejando enganchado el original** por si hace falta depurar.

```js
try {
  noExiste()                       // ReferenceError
} catch (error) {
  console.log(error.name)          // → ReferenceError
  console.log(error.message)       // → noExiste is not defined
  console.log(typeof error.stack)  // → string (rastro de llamadas)
}

try {
  try {
    JSON.parse("{ roto")           // SyntaxError
  } catch (e) {
    throw new Error("No se pudo leer la config", { cause: e }) // ES2022
  }
} catch (error) {
  console.log(error.message)       // → No se pudo leer la config
  console.log(error.cause.name)    // → SyntaxError (error original)
}
```

### Errores en código asíncrono (`async/await` y promesas)

Con `async/await` el manejo de errores se parece muchísimo al síncrono: un `try...catch` de toda la vida. Lo que cambia es el caso de las promesas "sueltas", que se manejan con `.catch()`.

```js
async function pedirDatos() {
  try {
    const res = await fetch("https://url-invalida.ejemplo")
    return await res.json()
  } catch (error) {
    console.log("Fallo en la petición:", error.message)
  }
}

// Con promesas: el rechazo se captura con .catch(), NO con un try síncrono
Promise.reject(new Error("rechazada"))
  .catch(e => console.log("Capturado:", e.message)) // → Capturado: rechazada

// ⚠️ Esto NO funciona: cuando la promesa se rechaza, el try ya terminó
try {
  Promise.reject(new Error("se escapa"))
} catch (e) {
  console.log("nunca llega aquí")
}
```

### `finally` se ejecuta aunque haya `return`

Un detalle que sorprende: `finally` corre **antes** de que la función devuelva de verdad el valor del `return`. Por eso es el sitio perfecto para limpiar recursos sin importar cómo se salga de la función.

```js
function probar() {
  try {
    return "valor de try"
  } finally {
    console.log("finally se ejecuta antes de devolver") // se imprime igual
  }
}
console.log(probar()) // → finally se ejecuta antes de devolver / valor de try
```

### Patrón de reintentos (*retry*)

Un uso muy habitual del manejo de errores: si una operación puede fallar de forma **transitoria** (una red que va y viene), no nos rendimos al primer fallo, sino que reintentamos hasta un máximo.

```js
function conReintentos(operacion, maxIntentos = 10) {
  const errores = []

  for (let intento = 1; intento <= maxIntentos; intento++) {
    try {
      const resultado = operacion()
      return { resultado, intentos: intento, errores } // ✅ éxito → salimos
    } catch (error) {
      errores.push(`Intento ${intento}: ${error.message}`)
    }
  }

  throw new Error(`Fallo tras ${maxIntentos} intentos`) // nos rendimos
}
```

Las tres piezas del patrón: un **contador con tope** (el `for` lo lleva integrado, así que nunca es infinito), una **salida en cuanto hay éxito** (`return` dentro del `try`) y **rendirse al agotar** los intentos (`throw` tras el bucle).

## Buenas prácticas y errores comunes

- **Lanza `Error` (o subtipos), nunca strings**: `throw "fallo"` pierde `stack` y `name`, y hace que los `instanceof` no funcionen. Cuesta lo mismo `throw new Error("fallo")`.
- **No te "tragues" los errores en silencio**: un `catch {}` vacío esconde el problema y luego nadie entiende por qué algo no va. Como mínimo, regístralo o reláznalo.
- **Captura lo específico, relanza lo demás**: comprueba con `instanceof` y maneja solo lo que sepas resolver; lo que no, `throw error` para que lo trate quien deba.
- **`try/catch` solo atrapa lo síncrono**: para promesas usa `await` *dentro* del `try`, o `.catch()`. Un rechazo sin manejar provoca un *unhandled rejection*.
- **`finally` para limpieza**: cerrar ficheros, conexiones, *spinners*... Se ejecuta haya error o no, y antes de propagar el error o devolver el valor.
- **No uses excepciones para el flujo normal**: si un caso es *esperable*, valídalo con un `if`. Lanzar y capturar es más caro y menos claro que una comprobación normal.
- **Mensajes con contexto**: `"No se pudo guardar el usuario " + id` ayuda muchísimo más que un escueto `"error"` cuando estés depurando a las 3 de la mañana.
- **Ponle `name` a tus errores personalizados**: sin `this.name = "MiError"`, la consola los mostrará como `"Error"` genéricos y costará identificarlos.
- **Encadena con `cause`**: al transformar un error de bajo nivel en uno más legible, pasa el original como `{ cause }` para no perder la pista de qué pasó realmente.
