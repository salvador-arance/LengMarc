# Clase 70 · Lista de tareas (DOM)

> Lección: [`Intermediate/15-tasklist.js`](../15-tasklist.js) (HTML: [`Intermediate/14-tasklist.html`](../14-tasklist.html)) — [Vídeo](https://youtu.be/iJvLAZ8MJ2E?t=22342)

## Conceptos

Mini-proyecto que junta lo aprendido del DOM: una **lista de tareas** donde se
añaden elementos desde un `<input>` y se eliminan al hacer clic sobre ellos.

- **Leer el valor de un input**: la propiedad **`input.value`** contiene el
  texto escrito; se **valida** que no esté vacío antes de añadir.
- **Crear y añadir elementos**: **`createElement("li")`** + **`textContent`** +
  **`appendChild`** para insertarlo en la lista `<ul>`.
- **Eliminar al hacer clic**: a cada `<li>` se le añade un `addEventListener`
  que llama a **`remove()`** sobre sí mismo.
- **Limpiar el input**: tras añadir, se vacía con `input.value = ""`.
- **Evento de teclado**: con el evento **`keypress`** y `event.key === "Enter"`
  se permite añadir la tarea pulsando Enter, no solo con el botón.

## Definiciones

- **`input.value`**: texto actual del campo de entrada.
- **Validación**: comprobar `text.value === ""` para no añadir vacíos.
- **`createElement("li")`**: crea un nuevo elemento de lista.
- **`appendChild(nodo)`**: añade el nodo como último hijo.
- **`elemento.remove()`**: elimina el elemento del DOM.
- **Evento `keypress`**: se dispara al pulsar una tecla; `event.key` indica
  cuál.

## Snippets de código

HTML de apoyo (input, botón y lista vacía):

```html
<body>
  <h1>Mis tareas</h1>
  <input id="text" type="text" placeholder="Escribe una tarea">
  <button id="button">Agregar tarea</button>
  <ul id="list"></ul>
  <script src="15-tasklist.js"></script>
</body>
```

JavaScript: añadir y eliminar tareas:

```js
const text   = document.getElementById("text")
const button = document.getElementById("button")
const list   = document.getElementById("list")

function addTask() {
  if (text.value === "") return            // validación: no añadir vacío

  const newElement = document.createElement("li")
  newElement.textContent = text.value

  newElement.addEventListener("click", () => {
    newElement.remove()                    // clic en la tarea → se elimina
  })

  list.appendChild(newElement)
  text.value = ""                          // limpia el input
}

button.addEventListener("click", addTask)

text.addEventListener("keypress", (event) => {
  if (event.key === "Enter") addTask()     // Enter también añade
})
```
