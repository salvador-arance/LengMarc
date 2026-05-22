# Clase 44 · Módulos externos

> Lección: [`Basic/30-import-external-modules.cjs`](../30-import-external-modules.cjs) — [Vídeo](https://youtu.be/1glVfFxj8a4?t=21480)

## Conceptos

Node.js trae **módulos nativos** ya integrados (sistema de ficheros, sistema operativo, rutas...) que no hay que instalar. Además, con **npm** se pueden añadir **paquetes de terceros**. Esta lección usa el módulo nativo **`os`** para obtener información del sistema operativo.

- **`require()`**: forma de importar de **CommonJS** (CJS), el sistema de módulos clásico de Node, distinto de `import`/`export` (ESM).
- **`module.exports` / `exports`**: la cara "exportar" de CommonJS (equivalente a `export` de ESM).
- **Extensión `.cjs`**: fuerza a tratar el archivo como **CommonJS** aunque el `package.json` tenga `"type": "module"` (que activaría ESM por defecto). Por eso esta lección es `.cjs` y no `.js`.
- **Módulo `os`**: módulo nativo; expone funciones para consultar plataforma, arquitectura y memoria de la máquina.
- **Tres orígenes de módulos**:
  1. **Nativos** de Node (`os`, `fs`, `path`...): no se instalan.
  2. **Propios** del proyecto: rutas relativas (`./mi-modulo`).
  3. **Externos** (terceros): se instalan con npm y viven en `node_modules`.
- **npm y `package.json`**: `npm install <paquete>` descarga el paquete a `node_modules` y lo apunta en `package.json`. `package-lock.json` fija las versiones exactas instaladas.
- **Resolución de `require`**: si no es ruta (`./`/`/`), Node busca en `node_modules`; una carpeta se resuelve por su `main`/`index.js`.

## Definiciones

### Módulos y sistemas

- **Módulo nativo / interno**: módulo que viene con Node (no se instala con npm).
- **Módulo externo / de terceros**: paquete instalado con npm en `node_modules`.
- **CommonJS (CJS)**: sistema de módulos de Node con `require()` y `module.exports`.
- **ESM (ES Modules)**: sistema estándar con `import`/`export`.
- **`.cjs`**: extensión que indica explícitamente "este archivo es CommonJS".
- **`require("os")`**: importa el módulo `os`.
- **`module.exports = ...` / `exports.x = ...`**: exporta desde un módulo CommonJS.
- **`require.resolve("pkg")`**: devuelve la ruta real que resolvería `require` (sin cargarlo).

### npm / package.json

- **npm**: gestor de paquetes de Node (registro público de módulos).
- **`npm init -y`**: crea un `package.json` con valores por defecto.
- **`npm install <pkg>`**: instala un paquete y lo añade a `dependencies`.
- **`npm install -D <pkg>`**: lo añade a `devDependencies` (solo desarrollo: tests, build...).
- **`package.json`**: manifiesto del proyecto: `name`, `version`, `type`, `main`, `dependencies`...
- **`package-lock.json`**: versiones exactas instaladas (reproducibilidad).
- **SemVer**: versionado `MAYOR.MENOR.PARCHE`; `^1.2.3` permite actualizaciones menores/parche.

### Métodos del módulo `os`

- **`os.platform()`**: sistema operativo (`win32`, `linux`, `darwin`...).
- **`os.arch()`**: arquitectura del procesador (`x64`, `arm64`...).
- **`os.totalmem()` / `os.freemem()`**: memoria total / libre, en bytes.

## Snippets de código

### Importar un módulo nativo con `require` y usarlo

```js
const os = require("os")

console.log(os.platform()) // → p. ej. win32
console.log(os.arch())     // → p. ej. x64
console.log(os.totalmem()) // → memoria total en bytes
console.log(os.freemem())  // → memoria libre en bytes
```

### Exportar e importar en CommonJS (`module.exports`)

```js
// matematicas.cjs  (módulo CommonJS propio)
function add(a, b) { return a + b }
const PI = 3.1416
module.exports = { add, PI }   // exporta un objeto

// otro.cjs
const { add, PI } = require("./matematicas.cjs")
console.log(add(2, 3), PI)     // → 5 3.1416
```

### Flujo típico para usar un paquete externo (conceptual)

```bash
# 1. Crear el manifiesto del proyecto
npm init -y

# 2. Instalar un paquete de terceros (queda en node_modules/)
npm install chalk          # dependencia de producción
npm install -D jest        # dependencia solo de desarrollo
```

```js
// 3. Usarlo por su nombre (especificador "bare": se busca en node_modules)
const chalk = require("chalk")        // CommonJS
console.log(chalk.green("¡Hola en verde!"))

// Equivalente en ESM (.js con "type": "module"):
// import chalk from "chalk"
```

### `package.json` resultante (ejemplo)

```json
{
  "name": "mi-proyecto",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "dependencies": { "chalk": "^5.3.0" },
  "devDependencies": { "jest": "^29.7.0" }
}
```

> Comparación rápida de los dos sistemas de módulos:
>
> ```js
> // CommonJS (.cjs)        →  const os = require("os")
> // ES Modules (.js + "type": "module") →  import os from "os"
> ```

## Buenas prácticas y errores comunes

- **No edites `node_modules`**: se regenera con `npm install`. Lo que cambies se pierde.
- **Versiona `package.json` y `package-lock.json`**, pero **ignora `node_modules`** en `.gitignore` (se reinstala con `npm install`).
- **`dependencies` vs `devDependencies`**: lo que la app necesita en ejecución vs lo que solo hace falta para desarrollar/probar (linters, test runners).
- **Cuidado con la interoperabilidad ESM↔CJS**: desde ESM puedes `import` un paquete CJS, pero `require()` no existe en módulos ESM; usa `.cjs` o `import` para mezclar.
- **Especificador correcto**: `require("./util.cjs")` (módulo propio, ruta) vs `require("chalk")` (paquete, sin ruta, desde `node_modules`).
- **Fija expectativas con SemVer**: revisa `^`/`~` antes de actualizar; un salto de versión MAYOR puede romper la API.
- **Este proyecto** tiene `"type": "module"` y no usa dependencias externas: por eso la lección es `.cjs` y emplea solo el módulo nativo `os`. Instalar paquetes aquí no es necesario para seguir el curso.
