# Clases 24 a 28 · Objetos avanzados

> Lección: [`Intermediate/04-advanced-objects.js`](../04-advanced-objects.js) — [Vídeo](https://youtu.be/iJvLAZ8MJ2E?t=7639)

## Conceptos

Antes de las `class`, JavaScript ya tenía herencia mediante **prototipos**: cada
objeto enlaza con otro objeto (su prototipo) del que hereda propiedades y
métodos. Entender esto es clave porque las clases son "azúcar sintáctico" sobre
los prototipos.

- **Prototipo**: objeto del que otro objeto hereda. Se consulta con
  **`__proto__`** (informal) o **`Object.getPrototypeOf()`** (recomendado).
- **Herencia con `Object.create()`**: crea un objeto cuyo prototipo es el objeto
  que se le pasa; hereda sus propiedades y métodos.
- **Sombreado de propiedades**: asignar una propiedad en el hijo no modifica la
  del prototipo; la "tapa" solo para ese objeto.
- **Función constructora**: función pensada para usarse con `new`; las propiedades
  se asignan con `this` y los métodos compartidos se ponen en su
  **`prototype`**.
- **Métodos avanzados de `Object`**: **`Object.assign`** (copia/combina
  propiedades), **`Object.keys` / `values` / `entries`** (claves, valores y
  pares clave-valor).

## Definiciones

- **Prototipo**: objeto del que se heredan miembros.
- **`obj.__proto__`** / **`Object.getPrototypeOf(obj)`**: acceden al prototipo.
- **`Object.create(proto)`**: crea un objeto con `proto` como prototipo.
- **Función constructora**: `function Person(...) { this.x = ... }`, se usa con
  `new`.
- **`Constructor.prototype.metodo`**: método compartido por todas las instancias.
- **`Object.assign(destino, ...fuentes)`**: copia propiedades en `destino` y lo
  devuelve.
- **`Object.keys(obj)`** / **`values`** / **`entries`**: arrays de claves,
  valores o pares `[clave, valor]`.

## Snippets de código

Prototipos y acceso al prototipo:

```js
let person = {
  name: "Brais",
  age: 37,
  greet() { console.log(`Hola, soy ${this.name}`) }
}

console.log(Object.getPrototypeOf(person)) // prototipo de person (Object)

person.sayAge = function () {              // se añade un método en runtime
  console.log(`Tengo ${this.age} años`)
}
person.sayAge() // → Tengo 37 años
```

Herencia con `Object.create` (y sombreado de propiedades):

```js
let programmer = Object.create(person)  // hereda de person
programmer.language = "JavaScript"
programmer.name = "MoureDev"            // sombrea name solo en programmer

console.log(person.name)        // → Brais (no cambia)
console.log(programmer.name)    // → MoureDev
console.log(programmer.age)     // → 37 (heredado)
programmer.greet()              // → Hola, soy MoureDev (método heredado)
programmer.sayAge()             // → Tengo 37 años
```

Función constructora con métodos en `prototype`:

```js
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.greet = function () {
  console.log(`Hola, soy ${this.name}`)
}

let newPerson = new Person("Brais", 37)
newPerson.greet() // → Hola, soy Brais
```

Métodos avanzados de `Object`:

```js
let personCore = { name: "Brais" }
let personDetails = { age: 37, alias: "MoureDev" }

let fullPerson = Object.assign(personCore, personDetails)
console.log(fullPerson) // → { name:"Brais", age:37, alias:"MoureDev" }

console.log(Object.keys(fullPerson))    // → ["name","age","alias"]
console.log(Object.values(fullPerson))  // → ["Brais",37,"MoureDev"]
console.log(Object.entries(fullPerson)) // → [["name","Brais"],["age",37],...]
```
