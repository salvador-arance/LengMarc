# Clases 39 a 44 · Asincronía

> Lección: [`Intermediate/07-async.js`](../07-async.js) — [Vídeo](https://youtu.be/iJvLAZ8MJ2E?t=11890)

## Conceptos

JavaScript es **monohilo**: ejecuta una cosa a la vez. La asincronía permite
iniciar tareas largas (temporizadores, peticiones de red) sin **bloquear** el
hilo, gracias al **Event Loop**.

- **Código síncrono**: se ejecuta línea a línea; un bucle pesado **bloquea**
  todo lo demás hasta terminar.
- **Event Loop**: coordina la ejecución. Componentes:
  1. **Call Stack** (pila de ejecución).
  2. **Web APIs / Node.js** (temporizadores, red…).
  3. **Task Queue** (`setTimeout`) y **Microtask Queue** (Promesas, con
     prioridad sobre la Task Queue).
- **Callbacks asíncronos**: función que se ejecuta cuando la operación termina
  (p. ej. el callback de `setTimeout`).
- **Callback Hell**: anidar callbacks dependientes genera código ilegible "en
  pirámide".
- **Promesa**: objeto que representa un valor futuro; está **pendiente**, y
  acaba **resuelta** (`resolve`) o **rechazada** (`reject`). Se consume con
  **`.then()`** y **`.catch()`**.
- **Encadenamiento de promesas**: devolver una promesa dentro de `.then()`
  encadena pasos en secuencia, evitando el callback hell.
- **`async`/`await`**: sintaxis que hace que el código asíncrono se lea como
  síncrono; `await` espera a que la promesa se resuelva.

## Definiciones

- **Monohilo**: un único hilo de ejecución.
- **Bloquear**: ocupar el hilo impidiendo que avance otro código.
- **Call Stack**: pila de llamadas en curso.
- **Task Queue / Microtask Queue**: colas de tareas pendientes; las microtareas
  (promesas) se procesan antes.
- **`setTimeout(fn, ms)`**: ejecuta `fn` tras `ms` milisegundos.
- **Callback Hell**: anidamiento excesivo de callbacks.
- **Promesa**: `new Promise((resolve, reject) => { ... })`.
- **`.then(fn)` / `.catch(fn)`**: manejan resolución / rechazo.
- **`async function`**: función que devuelve una promesa.
- **`await`**: pausa la función `async` hasta resolver la promesa.

## Snippets de código

Código síncrono (bloquea el hilo):

```js
console.log("Inicio")
for (let i = 0; i < 100000000; i++) {} // bloquea hasta terminar
console.log("Fin")
```

Callback asíncrono con `setTimeout`:

```js
console.log("Inicio")
setTimeout(() => {
  console.log("Esto se ejecuta después de 2 segundos")
}, 2000)
console.log("Fin")
// Orden de salida: Inicio, Fin, (2s) Esto se ejecuta...
```

Callback Hell (anidamiento difícil de leer):

```js
step1(() => {
  step2(() => {
    step3(() => {
      console.log("Todos los pasos completados")
    })
  })
})
```

Promesa con `resolve` / `reject`:

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const ok = false
    if (ok) resolve("Operación exitosa")
    else    reject("Se ha producido un error")
  }, 4000)
})

promise
  .then(result => console.log(result))
  .catch(error => console.log(error)) // → Se ha producido un error
```

Encadenamiento de promesas (secuencia legible):

```js
function step1Promise() {
  return new Promise(resolve => {
    setTimeout(() => { console.log("Paso 1 con promesa completado"); resolve() }, 1000)
  })
}
// step2Promise / step3Promise análogas

step1Promise()
  .then(step2Promise)
  .then(step3Promise)
  .then(() => console.log("Todos los pasos con promesa completados"))
```

`async`/`await` (lectura secuencial):

```js
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function process() {
  console.log("Inicio del proceso")
  await wait(5000)
  console.log("Proceso después de 5 segundos")
  await wait(1000)
  console.log("Proceso después de 1 segundo")
  console.log("Fin del proceso")
}

process()
```
