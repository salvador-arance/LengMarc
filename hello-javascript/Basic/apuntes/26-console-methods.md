# Clase 42 · Console

> Lección: [`Basic/26-console-methods.js`](../26-console-methods.js) — [Vídeo](https://youtu.be/1glVfFxj8a4?t=20444)

## Conceptos

El objeto **`console`** ofrece muchos métodos además de `log`, útiles para **depurar** (encontrar errores) y entender qué hace el programa.

- **Mensajes por nivel**: `log` (normal), `info` (información), `debug` (depuración), `warn` (advertencia), `error` (error). Ayudan a clasificar la salida.
- **Salida estándar**: `log`/`info`/`debug` escriben en **stdout**; `warn`/`error` en **stderr**. Útil para redirigir o filtrar.
- **`table`**: muestra arrays/objetos en forma de **tabla**, muy legible.
- **`dir`**: muestra un objeto como árbol de propiedades navegable (útil en navegador con nodos DOM).
- **`group` / `groupCollapsed` / `groupEnd`**: agrupan y **sangran** mensajes relacionados (`groupCollapsed` empieza plegado).
- **`time` / `timeLog` / `timeEnd`**: miden **cuánto tarda** un bloque de código.
- **`assert`**: muestra un mensaje **solo si** una condición es falsa.
- **`count` / `countReset`**: cuentan cuántas veces se ejecuta una línea.
- **`trace`**: imprime la **pila de llamadas** (qué funciones llevaron hasta ahí).
- **`clear`**: limpia la consola.
- **Múltiples argumentos y formato**: se pueden pasar varios valores; en navegador hay *placeholders* (`%s`, `%d`, `%o`, `%c` para estilos CSS).

## Definiciones

### Mensajes y niveles

- **`console.log/info/debug(msg)`**: imprime un mensaje informativo (stdout).
- **`console.warn(msg)` / `console.error(msg)`**: advertencia / error (stderr); aceptan objetos `Error`.
- **Placeholders**: `%s` (texto), `%d`/`%i` (entero), `%f` (decimal), `%o`/`%O` (objeto), `%c` (estilo CSS, solo navegador).

### Visualización

- **`console.table(datos)`**: muestra `datos` como tabla.
- **`console.dir(obj)`**: muestra el objeto como árbol de propiedades.
- **`console.group(t)` / `groupCollapsed(t)` / `groupEnd()`**: abre (expandido/plegado) y cierra un grupo sangrado.

### Diagnóstico

- **`console.time(et)` / `timeLog(et)` / `timeEnd(et)`**: inicia / consulta sin parar / detiene un cronómetro con etiqueta `et`.
- **`console.assert(cond, msg)`**: imprime `msg` solo si `cond` es `false`.
- **`console.count(et)` / `countReset(et)`**: incrementa / reinicia un contador con etiqueta.
- **`console.trace(msg)`**: imprime el rastro de llamadas.
- **`console.clear()`**: borra el contenido de la consola.

## Snippets de código

### Niveles de mensaje

```js
console.log("¡Hola, JavaScript!")
console.info("Información adicional.")
console.warn("Mensaje de advertencia.")
console.error("Mensaje de error.")
console.error("Error de BD:", new Error("Conexión fallida."))
```

### `table` y `group`

```js
console.table([
  { name: "Brais", age: 37 },
  { name: "Sara", age: 21 },
]) // → tabla con columnas name y age

console.group("Usuario:")
console.log("Nombre: Brais")
console.log("Edad: 37")
console.groupEnd()
```

### `time`, `assert`, `count` y `trace`

```js
console.time("bucle")
for (let i = 0; i < 10000; i++) {}
console.timeEnd("bucle") // → bucle: X ms

let age = 17
console.assert(age >= 18, "El usuario debe ser mayor de edad.")
// → Assertion failed: El usuario debe ser mayor de edad.

console.count("Click") // → Click: 1
console.count("Click") // → Click: 2
console.countReset("Click")
console.count("Click") // → Click: 1

function funcA() { funcB() }
function funcB() { console.trace("Seguimiento de la ejecución.") }
funcA() // → imprime la pila: funcB ← funcA

// console.clear() // limpia la consola
```

### Múltiples argumentos, `dir` y placeholders

```js
const user = { name: "Brais", age: 37 }

console.log("Usuario:", user, "activo:", true) // varios valores en una línea
console.dir(user)                              // árbol de propiedades

// Placeholders (sobre todo en navegador)
console.log("Nombre: %s, edad: %d", "Brais", 37) // → Nombre: Brais, edad: 37
console.log("%cTexto con estilo", "color: red; font-weight: bold") // navegador
```

### `groupCollapsed` y `timeLog`

```js
console.groupCollapsed("Detalles (plegado por defecto)")
console.log("Línea oculta hasta desplegar")
console.groupEnd()

console.time("proceso")
// ...trabajo parcial...
console.timeLog("proceso", "fase 1 lista") // consulta sin parar el cronómetro
// ...más trabajo...
console.timeEnd("proceso")                  // detiene y muestra el total
```

## Buenas prácticas y errores comunes

- **`console.log` no es para producción**: déjalo solo en depuración; usa un *logger* con niveles en código real y elimina logs sobrantes (o usa un linter que los detecte).
- **`warn`/`error` van a stderr**: en Node, redirigir solo stdout (`> salida.txt`) no captura esos mensajes.
- **`console.table` espera datos tabulares**: arrays de objetos con las mismas claves se ven mejor.
- **Logs de objetos mutados**: en algunos entornos `console.log(obj)` muestra el objeto *en el momento de expandirlo*, no cuando se llamó. Si dudas, registra una copia (`{ ...obj }`) o un string.
- **`assert` no detiene el programa**: solo imprime si la condición es falsa; no es un sustituto de validación real ni de tests.
- **Empareja `group`/`groupEnd` y `time`/`timeEnd`**: olvidar el cierre deja la consola sangrada o el cronómetro abierto.
- **`%c` y placeholders** funcionan en el navegador; en Node el formato es más limitado.
