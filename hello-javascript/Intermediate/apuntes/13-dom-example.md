# Clase 69 · Ejemplo de DOM

> Lección: [`Intermediate/13-dom-example.js`](../13-dom-example.js) (HTML: [`Intermediate/12-dom-example.html`](../12-dom-example.html)) — [Vídeo](https://youtu.be/iJvLAZ8MJ2E?t=21754)

## Conceptos

Primer ejemplo práctico de DOM enlazando un archivo HTML con su JavaScript: el
script se carga desde la página y modifica un elemento existente.

- **Enlace HTML ↔ JS**: el archivo `.js` se incluye con
  `<script src="13-dom-example.js"></script>` al final del `<body>`, para que el
  HTML ya exista cuando el script se ejecute.
- **`document`**: representa todo el documento cargado; útil para inspeccionarlo
  con `console.log`.
- **Selección + modificación**: seleccionar un elemento con
  **`querySelector`** y cambiar su texto con **`textContent`**.

## Definiciones

- **`<script src="archivo.js">`**: carga un JS externo en la página.
- **`document`**: objeto raíz del DOM.
- **`document.querySelector("h1")`**: devuelve el primer `<h1>` del documento.
- **`elemento.textContent`**: lee o reemplaza el texto del elemento.

## Snippets de código

HTML de apoyo (el script se carga tras el contenido):

```html
<body>
  <h1>Mi título</h1>
  <button>Mi botón</button>
  <script src="13-dom-example.js"></script>
</body>
```

JavaScript: seleccionar el `<h1>` y cambiar su texto:

```js
console.log(document)

const myH1 = document.querySelector("h1")
console.log(myH1)               // <h1>Mi título</h1>

myH1.textContent = "Mi nuevo título" // el <h1> pasa a "Mi nuevo título"
```
