# Clases 61 a 68 · DOM

> Lección: [`Intermediate/11-dom.js`](../11-dom.js) — [Vídeo](https://youtu.be/iJvLAZ8MJ2E?t=18822)

## Conceptos

El **DOM** (Document Object Model) es la representación en forma de árbol de
objetos de una página HTML. Con JavaScript se pueden **seleccionar**,
**modificar**, **crear** y **eliminar** elementos, y **reaccionar a eventos**
del usuario. El punto de entrada es el objeto global **`document`**.

- **Selección de elementos**:
  - Clásicos: **`getElementById`**, **`getElementsByClassName`**,
    **`getElementsByTagName`**.
  - Modernos (selector CSS): **`querySelector`** (el primero) y
    **`querySelectorAll`** (todos).
- **Manipulación de contenido**: **`textContent`** (texto) e **`innerHTML`**
  (HTML interno).
- **Atributos**: **`getAttribute`**, **`setAttribute`**, **`hasAttribute`**,
  **`removeAttribute`**.
- **Clases y estilos CSS**: **`classList`** (`add`, `remove`, `toggle`) y la
  propiedad **`style`**.
- **Crear / insertar / eliminar**: **`createElement`**, **`appendChild`**,
  **`append` / `prepend`**, **`insertBefore`**, **`before` / `after`**,
  **`remove`** / **`removeChild`**.
- **Eventos**: **`addEventListener(tipo, manejador)`** para responder a `click`,
  `mouseenter`, `mouseleave`, `submit`, `DOMContentLoaded`, etc.

## Definiciones

- **DOM**: árbol de objetos que representa el documento HTML.
- **`document`**: objeto raíz del DOM.
- **`getElementById(id)`**: devuelve el elemento con ese `id`.
- **`querySelector(sel)` / `querySelectorAll(sel)`**: seleccionan por selector
  CSS (uno / todos).
- **`textContent`**: texto del elemento. **`innerHTML`**: su HTML interno.
- **`getAttribute` / `setAttribute` / `hasAttribute` / `removeAttribute`**:
  gestión de atributos.
- **`classList`**: API para añadir/quitar/alternar clases CSS.
- **`element.style.prop`**: estilo en línea del elemento.
- **`createElement(tag)`**: crea un nuevo elemento (aún no insertado).
- **`appendChild` / `append` / `prepend` / `insertBefore`**: insertan nodos.
- **`remove()` / `removeChild(nodo)`**: eliminan nodos.
- **`addEventListener(tipo, fn)`**: registra un manejador de evento.

## Snippets de código

Selección de elementos:

```js
const byId    = document.getElementById("id")
const byClass = document.getElementsByClassName("class")
const byTag   = document.getElementsByTagName("tag")

document.querySelector(".paragraph")     // el primero
document.querySelectorAll(".paragraph")  // todos (NodeList)
```

Manipulación de contenido y atributos:

```js
const title = document.getElementById("title")
title.textContent = "Hola JavaScript"

const container = document.querySelector(".container")
container.innerHTML = "<p>Esto es un nuevo párrafo</p>"

const link = document.querySelector("a")
const url = link.getAttribute("href")
link.setAttribute("href", "https://example.com")
const hasTarget = link.hasAttribute("target")
link.removeAttribute("target")
```

Clases CSS y estilos:

```js
const box = document.querySelector(".box")
box.classList.add("selected")
box.classList.remove("selected")
box.classList.toggle("selected")

const button = document.querySelector("button")
button.style.backgroundColor = "blue"
button.style.color = "white"
button.style.padding = "10px"
```

Crear, insertar y eliminar elementos:

```js
const newParagraph = document.createElement("p")
newParagraph.textContent = "Nuevo párrafo creado desde JS"
container.appendChild(newParagraph)

const itemsList = document.querySelector("ul")
const newItem = document.createElement("li")
newItem.textContent = "Nuevo elemento"

const secondItem = itemsList.children[1]
itemsList.insertBefore(newItem, secondItem) // en una posición concreta
itemsList.append(newItem)   // al final
itemsList.prepend(newItem)  // al principio
secondItem.before(newItem)
secondItem.after(newItem)

newParagraph.remove()                          // eliminación moderna
newParagraph.parentElement.removeChild(newParagraph) // tradicional
```

Eventos:

```js
function showMsg() { alert("Clic!") }

const sendButton = document.querySelector("#send")
sendButton.addEventListener("click", showMsg)
sendButton.addEventListener("click", () => alert("Clic con arrow function!"))

document.addEventListener("DOMContentLoaded", () => {
  console.log("El DOM está completamente cargado")
})

sendButton.addEventListener("mouseenter", () => {
  sendButton.style.backgroundColor = "green"
})
sendButton.addEventListener("mouseleave", () => {
  sendButton.style.backgroundColor = "blue"
})

const form = document.querySelector("form")
form.addEventListener("submit", (event) => {
  // event.preventDefault() para evitar el envío por defecto
})
```
