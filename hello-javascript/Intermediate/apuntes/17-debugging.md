# Clases 72 a 73 · Depuración

> Lección: [`Intermediate/17-debugging.js`](../17-debugging.js) — [Vídeo](https://youtu.be/iJvLAZ8MJ2E?t=23085)

## Conceptos

**Depurar** es el proceso de localizar y entender por qué el código no se
comporta como se espera. Hay un enfoque básico (imprimir valores) y uno
profesional (depurador con puntos de interrupción).

- **Depuración con `console.log` (básico)**: imprimir los valores y su
  **`typeof`** en puntos clave para ver qué llega realmente a una función. Útil
  para detectar errores de tipo (p. ej. sumar un número y un texto produce
  concatenación).
- **Depurador (profesional)**: usar **breakpoints** (puntos de interrupción) en
  las DevTools del navegador o en el editor para **pausar** la ejecución,
  inspeccionar variables y avanzar paso a paso. Más potente que llenar el código
  de `console.log`.
- **Errores controlados con `throw`**: lanzar `new Error(...)` ante condiciones
  inválidas hace que el fallo sea explícito y fácil de localizar (p. ej.
  dividir entre cero).

## Definiciones

- **Depurar (debugging)**: encontrar y corregir errores en el código.
- **`console.log(...)`**: imprime valores en la consola para inspeccionarlos.
- **`typeof x`**: devuelve el tipo del valor (`"number"`, `"string"`…).
- **Breakpoint**: marca que pausa la ejecución en una línea para inspeccionar el
  estado.
- **Depurador**: herramienta (DevTools / editor) para ejecutar paso a paso.
- **`throw new Error("...")`**: lanza una excepción con un mensaje descriptivo.

## Snippets de código

Depuración básica con `console.log` y `typeof`:

```js
function sum(a, b) {
  console.log("a:", a)
  console.log("typeof a:", typeof a)
  console.log("b:", b)
  console.log("typeof b:", typeof b)
  return a + b
}

console.log(sum(3, "5")) // → "35"  (b es string: concatena, no suma)
```

Lanzar un error explícito ante una entrada inválida:

```js
function divide(a, b) {
  if (b === 0) {
    throw new Error("No se puede dividir por cero")
  }
  return a / b
}

// console.log(divide(5, 0)) // ❌ Error: No se puede dividir por cero
```

> Consejo: en lugar de muchos `console.log`, coloca un **breakpoint** en la
> línea sospechosa desde las DevTools (pestaña *Sources*) o el editor y revisa
> las variables paso a paso.
