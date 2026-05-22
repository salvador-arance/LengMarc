# Clase 44 · Módulos (importación)

> Lección: [`Basic/29-import-modules.js`](../29-import-modules.js) — [Vídeo](https://youtu.be/1glVfFxj8a4?t=21480)

## Conceptos

La otra cara de los módulos: **`import`** trae a un archivo el código que otro módulo **exportó**. Así se reutiliza código entre archivos.

- **Importación con nombre**: entre llaves `{ }` y con el **mismo nombre** con que se exportó. Se pueden importar varios elementos a la vez.
- **Alias (`as`)**: renombrar lo importado para evitar choques o aclarar (`import { add as sumar } from ...`).
- **Importación por defecto**: sin llaves; se le puede poner **cualquier nombre** porque el módulo solo tiene un `export default`. Se puede combinar con imports con nombre.
- **Namespace (`* as`)**: importa **todo** el módulo en un objeto (`import * as utils from ...`).
- **Import de solo efecto**: `import "./fichero.js"` ejecuta el módulo sin traer nada (por sus efectos secundarios).
- **`import()` dinámico**: importar bajo demanda en tiempo de ejecución; **devuelve una Promesa** (útil para *lazy loading*).
- **Ruta relativa**: se indica el archivo de origen (`"./28-export-modules.js"`), normalmente **incluyendo la extensión** `.js` (obligatorio en ESM de Node).
- **Especificador "bare"**: sin `./` ni `/` (`import x from "lodash"`) → se resuelve desde `node_modules` (paquetes).
- **`import` estático va arriba**: las declaraciones `import` se "elevan" y se ejecutan **antes** que el resto del código; deben estar en el nivel superior del módulo.
- **Caché de módulos**: un módulo se evalúa **una sola vez**; sucesivos imports reutilizan la misma instancia (comportamiento *singleton*).

## Definiciones

- **`import { a, b } from "ruta"`**: importación con nombre (deben coincidir con los `export`).
- **`import { a as alias } from "ruta"`**: importación con nombre renombrada.
- **`import nombre from "ruta"`**: importación por defecto (nombre libre).
- **`import nombre, { a } from "ruta"`**: default + con nombre a la vez.
- **`import * as ns from "ruta"`**: importa todo en el objeto `ns` (`ns.a`, `ns.default`).
- **`import "ruta"`**: solo ejecuta el módulo (efectos secundarios).
- **`import("ruta")`**: importación dinámica; devuelve `Promise` del módulo.
- **Ruta relativa**: `./` (misma carpeta), `../` (carpeta superior), etc.
- **Especificador bare**: nombre de paquete sin ruta (resuelto en `node_modules`).

## Snippets de código

### Importación con nombre y por defecto desde otro módulo

```js
import { add, PI, name, Circle } from "./28-export-modules.js"
import defaultImport from "./28-export-modules.js" // export default
```

### Uso de lo importado (como si fuera local)

```js
// Funciones
console.log(add(5, 10)) // → 15

// Propiedades
console.log(PI)   // → 3.1416
console.log(name) // → MoureDev

// Clases
let circle = new Circle(10)
console.log(circle.area().toFixed(2))      // → 314.16
console.log(circle.perimeter().toFixed(2)) // → 62.83

// Importación por defecto
console.log(defaultImport(5, 10)) // → -5 (función substract)
```

### Importar desde otra carpeta (proyecto modular)

```js
// import { MyImport } from "./directory/file.js"
```

### Alias, namespace, default + nombre y solo efecto

```js
// Renombrar para evitar choques de nombres
import { add as sumar } from "./28-export-modules.js"
console.log(sumar(2, 3)) // → 5

// Todo el módulo en un objeto
import * as mod from "./28-export-modules.js"
console.log(mod.PI)        // → 3.1416
console.log(mod.default(8, 3)) // → 5 (el export default)

// Default + con nombre en una sola línea
import substract, { add } from "./28-export-modules.js"

// Solo ejecuta el módulo (sin traer nada): por sus efectos secundarios
import "./28-export-modules.js"
```

### Importación dinámica (`import()` devuelve una Promesa)

```js
async function cargar() {
  const mod = await import("./28-export-modules.js") // bajo demanda
  console.log(mod.add(10, 20)) // → 30
}
cargar()

// O con then:
import("./28-export-modules.js").then(m => console.log(m.PI)) // → 3.1416
```

## Buenas prácticas y errores comunes

- **Incluye la extensión `.js`** en rutas relativas: en ESM de Node es obligatoria (`"./util.js"`, no `"./util"`).
- **`import` estático solo en el nivel superior**: no se puede poner dentro de un `if`/función. Para condicional o diferido usa `import()` dinámico.
- **El nombre con `{ }` debe coincidir** con el `export`; si no, error. Usa `as` para renombrar, no para "adivinar".
- **El default se puede llamar como quieras**, pero usa un nombre coherente con lo que el módulo realmente exporta (no confundas al lector).
- **Módulos en caché (singleton)**: importar el mismo módulo desde varios sitios comparte el **mismo estado**. Útil (config compartida) y peligroso (estado global accidental).
- **Dependencias circulares**: si A importa B y B importa A, puede haber valores `undefined` durante la carga. Evítalas extrayendo lo común a un tercer módulo.
- **ESM vs CommonJS**: no se puede `require()` en un módulo ESM; para módulos nativos/CJS en proyecto ESM, usa `import` o un `.cjs` (ver [`30-import-external-modules.md`](./30-import-external-modules.md)).
