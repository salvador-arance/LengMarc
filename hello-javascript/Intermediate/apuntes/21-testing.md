# Clases 80 a 81 · Testing

> Lección: [`Intermediate/21-testing.js`](../21-testing.js) y [`Intermediate/22-testing.test.js`](../22-testing.test.js) — [Vídeo](https://youtu.be/iJvLAZ8MJ2E?t=25938)

## Conceptos

**Testing** es escribir código que comprueba automáticamente que otro código
funciona como se espera. Permite detectar errores pronto y refactorizar con
confianza.

- **Tipos de testing**:
  - **Pruebas unitarias**: verifican una unidad pequeña y aislada (una función).
  - **Pruebas de integración**: verifican que varias piezas funcionan **juntas**.
  - **Pruebas end-to-end (E2E)**: simulan el uso real de la aplicación de
    principio a fin.
- **Aserción manual básica**: comparar el resultado con el esperado
  (`sum(3, 5) === 8`) e imprimir `true`/`false`. Sirve para entender la idea,
  pero no escala.
- **Framework de testing (Jest)**: estandariza la escritura y ejecución de
  tests.
  - El módulo a probar **exporta** su función con **`module.exports`** y el
    archivo de test la **importa** con **`require`**.
  - **`test(descripción, fn)`**: define un caso de prueba.
  - **`expect(valor).toBe(esperado)`**: aserción; el test **pasa** si coinciden
    y **falla** si no.
- **Convención de nombres**: el archivo de tests termina en **`.test.js`**
  (aquí, `22-testing.test.js` prueba a `21-testing.js`).
- **Test que falla**: si la aserción no se cumple, Jest marca el test como
  fallido (en la lección, el segundo test compara `sum(3, 4)` con `6` y por
  tanto falla: `3 + 4` es `7`).

## Definiciones

- **Prueba unitaria**: testea una unidad aislada (p. ej. una función pura).
- **Prueba de integración**: testea varios módulos combinados.
- **Prueba E2E**: testea el flujo completo de la aplicación.
- **Aserción**: comprobación de que un valor cumple lo esperado.
- **Jest**: framework de testing para JavaScript.
- **`module.exports = x`**: exporta `x` desde un módulo (CommonJS).
- **`require("./archivo")`**: importa lo exportado por ese módulo.
- **`test(desc, fn)`**: declara un caso de prueba en Jest.
- **`expect(v).toBe(e)`**: aserción de igualdad estricta.

## Snippets de código

Aserción manual básica (sin framework):

```js
function sum(a, b) {
  return a + b
}

console.log(sum(3, 5) === 8) // → true (comprobación manual)
```

Módulo bajo prueba — exporta la función (`21-testing.js`):

```js
function sum(a, b) {
  return a + b
}

module.exports = sum
```

Archivo de tests con Jest (`22-testing.test.js`):

```js
const sum = require('./21-testing')

test("Suma de 3 + 5 tiene que ser 8", () => {
  expect(sum(3, 5)).toBe(8)   // ✅ pasa
})

test("Suma de 3 + 3 tiene que ser 6", () => {
  expect(sum(3, 4)).toBe(6)   // ❌ falla: sum(3,4) es 7, no 6
})
```

> Ejecución típica: instalar Jest (`npm install --save-dev jest`) y lanzar los
> tests con `npx jest` o `npm test`. Jest detecta automáticamente los archivos
> `*.test.js`.
