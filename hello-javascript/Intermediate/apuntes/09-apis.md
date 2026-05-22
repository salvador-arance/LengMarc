# Clases 46 a 59 · Manejo de APIs

> Lección: [`Intermediate/09-apis.js`](../09-apis.js) — [Vídeo](https://youtu.be/iJvLAZ8MJ2E?t=14777)

## Conceptos

Una **API REST** permite que el código se comunique con un servidor por HTTP
para leer y modificar datos (normalmente en formato JSON). En el navegador y en
Node se consume con la función **`fetch`**.

- **REST = HTTP + URLs + JSON**. Métodos HTTP principales:
  - **GET** (leer), **POST** (crear), **PUT** (reemplazar), **PATCH**
    (actualizar parcialmente), **DELETE** (borrar).
- **Códigos de respuesta HTTP**: `200 OK`, `201 Created`, `400 Bad Request`,
  `404 Not Found`, `500 Internal Server Error`.
- **`fetch`** devuelve una **promesa**. Se puede consumir con `.then()` o con
  `async`/`await`. La respuesta se convierte a objeto con **`response.json()`**.
- **Petición con cuerpo** (POST/PATCH): se indica `method`, `headers`
  (`Content-Type: application/json`) y `body` con **`JSON.stringify`**.
- **Manejo de errores**: `fetch` **no** rechaza ante errores HTTP (404, 500);
  hay que comprobar **`response.ok`** / **`response.status`** y lanzar el error,
  además de `try/catch` o `.catch()`.
- **Autenticación**: por **API Key** en la URL, o métodos como **Bearer
  Tokens** / **JWT**.
- **Versionado de APIs**: la versión va en la ruta (`/v1/`, `/v2/`).

## Definiciones

- **API REST**: interfaz HTTP basada en URLs y JSON.
- **Método HTTP**: GET, POST, PUT, PATCH, DELETE.
- **Código de estado**: número que indica el resultado (2xx ok, 4xx cliente,
  5xx servidor).
- **`fetch(url, [opciones])`**: realiza una petición HTTP; devuelve una promesa.
- **`response.json()`**: convierte el cuerpo de la respuesta a objeto JS.
- **`response.ok`**: `true` si el estado está en el rango 200-299.
- **`JSON.stringify(obj)`**: convierte un objeto a texto JSON para el `body`.
- **API Key**: clave de acceso que identifica al cliente ante la API.

## Snippets de código

GET con `.then()` y con `async`/`await`:

```js
fetch("https://jsonplaceholder.typicode.com/posts")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log("Error", error))

async function getPosts() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts")
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.log("Error", error)
  }
}
getPosts()
```

POST (crear recurso con `headers` y `body`):

```js
async function createPost() {
  try {
    const newPost = { userId: 1, title: "Mi post", body: "Cuerpo del post" }
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost)
    })
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.log("Error", error)
  }
}
createPost()
```

Manejo de errores HTTP (comprobar `response.ok`):

```js
fetch("https://jsonplaceholder.typicode.com/mouredev")
  .then(response => {
    if (!response.ok) throw Error(`Status HTTP: ${response.status}`)
    return response.json()
  })
  .catch(error => console.log("Error", error))
```

PATCH (actualización parcial):

```js
async function partialPostUpdate() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/10", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "Nuevo título" })
  })
  console.log(await response.json())
}
partialPostUpdate()
```

Autenticación por API Key y otra API (PokeAPI):

```js
async function getWeather(city) {
  const apiKey = "TU_API_KEY"
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  const response = await fetch(url)
  console.log(await response.json())
}

async function getPokemon(pokemon) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  const response = await fetch(url)
  const data = await response.json()
  console.log(`Habilidades de ${data.name}`)
  data.abilities.forEach(a => console.log(a.ability.name))
}
getPokemon("pikachu")
```

> Herramientas útiles para probar peticiones HTTP: Postman, Apidog,
> Thunder Client.
