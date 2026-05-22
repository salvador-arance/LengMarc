# Clase 44 · Módulos (exportación)

> Lección: [`Basic/28-export-modules.js`](../28-export-modules.js) — [Vídeo](https://youtu.be/1glVfFxj8a4?t=21480)

## Conceptos

Un **módulo** es un archivo de JavaScript que expone parte de su código para que otros archivos lo usen. Dividir el programa en módulos lo hace **organizado y reutilizable**.

- **`export`**: marca qué elementos (funciones, variables/constantes, clases) son visibles desde fuera del módulo. Puede haber **varias** exportaciones con nombre por archivo.
- **Export inline vs lista**: se puede exportar al declarar (`export const PI = 3`) o al final en bloque (`export { PI, add }`). El resultado es el mismo.
- **`export default`**: marca **una sola** exportación por defecto del módulo; al importarla no hacen falta llaves y se le puede dar cualquier nombre.
- **Renombrar al exportar**: `export { interno as publico }` cambia el nombre con el que se importa.
- **Re-exportar**: un módulo "índice" puede reenviar lo que exportan otros (`export { x } from "./otro.js"`).
- Para usar `import`/`export` con extensión `.js` en Node, el `package.json` debe tener `"type": "module"` (este proyecto ya lo tiene en [`Basic/package.json`](../package.json)).
- **ESM vs CommonJS**: `export`/`import` es el estándar moderno (ESM). Node también tiene el sistema clásico **CommonJS** con `module.exports`/`require` (ver [`30-import-external-modules.md`](./30-import-external-modules.md)).

## Definiciones

- **Módulo**: archivo `.js` que exporta/importa código; tiene su propio ámbito (no contamina el global).
- **Exportación con nombre**: `export function f() {}` — se importa con su nombre exacto entre llaves.
- **Export en bloque**: `export { a, b }` al final del archivo.
- **`export { x as y }`**: exporta `x` bajo el nombre `y`.
- **`export default`**: exportación principal y **única** del módulo; se importa sin llaves.
- **Re-export**: `export { x } from "./otro.js"` reenvía sin importar localmente.
- **`"type": "module"`**: ajuste del `package.json` que activa los módulos ES (ESM) en Node.

## Snippets de código

### Exportar funciones, propiedades y clases (exportaciones con nombre)

```js
// Funciones
export function add(a, b) {
  return a + b
}

// Propiedades (variables / constantes)
export const PI = 3.1416
export let name = "MoureDev"

// Clases
export class Circle {
  constructor(radius) { this.radius = radius }
  area() { return Math.PI * Math.pow(this.radius, 2) }
  perimeter() { return 2 * Math.PI * this.radius }
}
```

### Exportación por defecto (solo una por módulo)

```js
export default function substract(a, b) {
  return a - b
}

// También podría ser una clase por defecto:
// export default class MyClass {
//   func() { console.log("Mi clase") }
// }
```

### Export en bloque y renombrar al exportar

```js
function suma(a, b) { return a + b }
const VERSION = "1.0"

// Exportar al final, en bloque, y renombrar uno de paso
export { suma, VERSION as version }
// Se importará como:  import { suma, version } from "./este-modulo.js"
```

### Re-exportar desde un módulo "índice"

```js
// index.js que agrupa varios módulos
export { add, PI } from "./28-export-modules.js" // reenvía sin usarlos aquí
export { default as substract } from "./28-export-modules.js" // re-export del default
```

## Buenas prácticas y errores comunes

- **Prefiere exportaciones con nombre** sobre `export default`: facilitan el autocompletado, el *refactor* (renombrar) y los importadores no eligen nombres incoherentes.
- **Solo un `export default` por archivo**: declarar dos es error de sintaxis.
- **No mezcles ESM y CommonJS en el mismo archivo**: en un `.js` con `"type": "module"` no existe `module.exports`; usa `export`.
- **El nombre del archivo no es el del módulo**: lo que vale es **qué** exportas y con qué nombre, no cómo se llame el fichero.
- **Las exportaciones son "vivas"**: si el módulo cambia una variable exportada, los importadores ven el nuevo valor (a diferencia de copiar un valor).
- **Cada módulo tiene su propio scope**: lo no exportado es privado del archivo; no se filtra al global.

> Estos elementos se consumen desde otro archivo con `import` (ver [`29-import-modules.md`](./29-import-modules.md)).
