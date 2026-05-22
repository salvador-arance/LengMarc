/*
Clase 71 - DOM
Vídeo: https://youtu.be/iJvLAZ8MJ2E?t=23010
*/

// 1. Crea un elemento (por ejemplo, un <h1 id="title">) y cambia su contenido a "¡Hola Mundo!"" al cargar la página

const title = document.createElement("h1");

title.textContent = "¡Hola Mundo!";

const titleSection = document.getElementById("title");

titleSection.appendChild(title);

// 2. Inserta una imagen con id="myImage" y cambia su atributo src a otra URL

const myImage = document.createElement("img");
myImage.setAttribute("id", "myImage");

myImage.setAttribute("src", "https://ethic.es/wp-content/uploads/2023/03/imagen-1280x768.jpg");

myImage.setAttribute("width", "250px")

titleSection.appendChild(myImage);

// 3. Crea un <div id="box"> sin clases y agrega la clase resaltado cuando se cargue la página

const myDiv = document.querySelector("div")

myDiv.setAttribute("class", "resaltado");

// 4. Crea un párrafo con id="paragraph" y cambia su color de texto a azul

const myP = document.createElement("p");
myP.innerText = "Hola.";
myP.setAttribute("id", "paragraph");
myP.setAttribute("style", "color: blue");
myDiv.appendChild(myP);


// 5. Agrega un botón que, al hacer clic, cree un nuevo elemento <li> con el texto "Nuevo elemento y lo agregue a una lista <ul id="list">

const myButton = document.createElement("button");
myButton.innerText = "Nuevo elemento";
myDiv.appendChild(myButton);


function crearLi() {
    const newLi = document.createElement("li");
    const ulInsert = document.getElementById("list");
    newLi.innerText = "Nuevo elemento";
    ulInsert.appendChild(newLi);
}

myButton.addEventListener("click", crearLi)

// 6. Crea un párrafo con id="deleteParagraph" y un botón. Al hacer clic en el botón, elimina el párrafo del DOM

const deleteP = document.createElement("p");

deleteP.setAttribute("id", "deleteParagraph");
deleteP.innerText = "Hola";

const deleteButton = document.createElement("button");

deleteButton.innerText = "Borrar párrafo";

myDiv.appendChild(deleteP);
myDiv.appendChild(deleteButton);

function removeP() {
    myDiv.removeChild(deleteP);
}

deleteButton.addEventListener("click", removeP);

// 7. Crea un <div id="content"> con algún texto y reemplaza su contenido por un <h2> con el mensaje "Nuevo Contenido"

const divContent = document.createElement("div");
divContent.setAttribute("id", "content");
divContent.innerText = "Hola";
myDiv.appendChild(divContent);
const h2 = document.createElement("h2");
h2.innerText = "Nuevo contenido";

divContent.replaceChildren(h2);

// 8. Crea un botón con id="greetBtn" y añade un evento que muestre una alerta con el mensaje "¡Hola!" al hacer clic

const greetBtn = document.createElement("button");
greetBtn.innerText = "Saludo";
divContent.appendChild(greetBtn);


greetBtn.addEventListener("click", () => alert("¡Hola!"));

// 9. Crea un <input id="textInput"> y un <div id="result">. Al escribir en el input, el <div> se debe actualizarse mostrando lo que se escribe

const input = document.getElementById("textInput");

function actualizarText(event) {
    const div = document.getElementById("result");
    div.innerText = event.target.value;
}

input.addEventListener("input", actualizarText);


// 10. Crea un botón con id="backgroundBtn" y, al hacer clic, cambia el color de fondo del <body> a un color diferente

const backgroundBtn = document.getElementById("backgroundBtn");

function cambiarFondo() {

    document.body.setAttribute("style", "background-color: blue;");
}

backgroundBtn.addEventListener("click", cambiarFondo);