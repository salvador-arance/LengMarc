# Clase 33 · Objetos

> Lección: [`Basic/18-objects.js`](../18-objects.js) — [Vídeo](https://youtu.be/1glVfFxj8a4?t=14229)

## Conceptos

Un **objeto** agrupa datos relacionados como pares **propiedad: valor**. Modela "cosas" del mundo real (una persona, un coche...). Los valores pueden ser de cualquier tipo, incluidas funciones (que entonces se llaman **métodos**) y otros objetos (**anidación**).

- **Acceso a propiedades**: notación punto (`obj.prop`) o corchetes (`obj["prop"]`).
- **Modificar / eliminar / añadir**: las propiedades se cambian asignándolas, se borran con `delete` y se crean asignando una nueva.
- **Métodos y `this`**: una propiedad que es función; `this` dentro del método se refiere al propio objeto.
- **Igualdad por referencia**: dos objetos con el mismo contenido **no** son iguales con `==`/`===`; solo son iguales si son exactamente el mismo objeto en memoria.
- **Iteración**: `for...in` recorre las claves del objeto.
- **Función constructora**: una función llamada con `new` crea objetos (precursora de las clases).

## Definiciones

- **Propiedad**: par clave-valor dentro del objeto.
- **Método**: propiedad cuyo valor es una función.
- **`this`**: referencia al objeto sobre el que se ejecuta el método.
- **Notación punto / corchetes**: `obj.nombre` / `obj["nombre"]`.
- **`delete obj.prop`**: elimina la propiedad.
- **Igualdad por referencia**: `==`/`===` entre objetos comparan si son el mismo objeto, no su contenido.
- **`for (let clave in obj)`**: itera las claves del objeto.
- **Función constructora**: función usada con `new` para construir objetos.

## Snippets de código

Sintaxis, acceso, modificación, borrado y nuevas propiedades:

```js
let person = { name: "Brais", age: 37, alias: "MoureDev" }

console.log(person.name)    // → Brais (notación punto)
console.log(person["name"]) // → Brais (notación corchetes)

person.name = "Brais Moure" // modificar
delete person.age           // eliminar
person.email = "braismoure@mouredev.com" // añadir
```

Métodos, `this` y anidación:

```js
let person3 = {
  name: "Brais",
  age: 37,
  walk: function () { console.log("La persona camina.") },
  job: {
    name: "Programador",
    work: function () {
      console.log(`La persona de ${this.age} años trabaja.`)
    },
  },
}

person3.walk()          // → La persona camina.
console.log(person3.job.name) // → Programador
person3.job.work()
```

Igualdad por referencia e iteración:

```js
let p1 = { name: "Brais" }
let p2 = { name: "Brais" }

console.log(p1 == p2)            // → false (objetos distintos)
console.log(p1.name == p2.name)  // → true  (mismo valor de propiedad)

for (let key in p1) {
  console.log(key + ": " + p1[key]) // → name: Brais
}
```

Función constructora con `new`:

```js
function Person(name, age) { // debería ser una clase
  this.name = name
  this.age = age
}
let person5 = new Person("Brais", 37)
console.log(person5.name) // → Brais
console.log(typeof person5) // → object
```
