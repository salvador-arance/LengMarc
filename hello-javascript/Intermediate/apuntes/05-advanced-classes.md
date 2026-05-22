# Clases 29 a 37 · Clases avanzadas

> Lección: [`Intermediate/05-advanced-classes.js`](../05-advanced-classes.js) — [Vídeo](https://youtu.be/iJvLAZ8MJ2E?t=9096)

## Conceptos

Sobre la sintaxis `class` se aplican patrones de programación orientada a
objetos más avanzados: clases abstractas, polimorfismo, mixins y patrones de
diseño, además de mecanismos del lenguaje como `Symbol`, `instanceof` y `Proxy`.

- **Clase abstracta**: no debe instanciarse directamente; se detecta con
  **`new.target`** y se lanza un error si alguien la instancia. Sus métodos
  "obligatorios" lanzan error hasta que una subclase los implementa.
- **Polimorfismo**: distintas subclases (`extends`) implementan el mismo método
  a su manera (`makeSound`).
- **Mixin**: objeto con métodos reutilizables que se "inyectan" en el
  `prototype` de varias clases con `Object.assign`, simulando herencia múltiple.
- **Patrón Singleton**: garantiza que solo exista **una** instancia de la clase;
  el constructor devuelve siempre la misma.
- **`Symbol`**: valor único e irrepetible, útil como clave de propiedad
  semi-oculta.
- **`instanceof`**: comprueba si un objeto es instancia de una clase (recorre la
  cadena de prototipos).
- **`Object.create(Clase.prototype)`**: crea una instancia sin ejecutar el
  constructor.
- **`Proxy`**: envuelve un objeto e intercepta operaciones (`get`, `set`) para
  añadir lógica (logging, validación).

## Definiciones

- **Clase abstracta**: clase no instanciable directamente (control con
  `new.target`).
- **`new.target`**: referencia a la función/clase invocada con `new`.
- **Polimorfismo**: mismo método, comportamiento distinto según la subclase.
- **Mixin**: objeto de métodos reutilizables aplicado con
  `Object.assign(Clase.prototype, mixin)`.
- **Singleton**: patrón que asegura una única instancia compartida.
- **`Symbol(desc)`**: identificador único; como clave no aparece como propiedad
  normal.
- **`obj instanceof Clase`**: `true` si `obj` deriva de `Clase`.
- **`Proxy(target, handler)`**: intercepta operaciones sobre `target`.

## Snippets de código

Clase abstracta y polimorfismo:

```js
class Animal {
  constructor(name) {
    if (new.target === Animal) {
      throw new Error("No se puede instanciar una clase abstracta")
    }
    this.name = name
  }
  makeSound() {
    throw new Error("Este método tiene que ser implementado por la subclase")
  }
}

class Cat extends Animal { makeSound() { console.log("Miau!") } }
class Dog extends Animal { makeSound() { console.log("Guau!") } }

new Cat("MoureCat").makeSound() // → Miau!
new Dog("MoureDog").makeSound() // → Guau!
// new Animal("Mou")            // ❌ Error: clase abstracta
```

Mixins (herencia múltiple simulada):

```js
const FlyMixin = {
  fly() { console.log(`${this.name} está volando`) }
}

class Bird extends Animal {}
class Dragon extends Animal {}

Object.assign(Bird.prototype, FlyMixin)
Object.assign(Dragon.prototype, FlyMixin)

new Bird("MoureBird").fly()     // → MoureBird está volando
new Dragon("MoureDragon").fly() // → MoureDragon está volando
```

Patrón Singleton:

```js
class Session {
  constructor(name) {
    if (Session.instance) return Session.instance // siempre la misma
    this.name = name
    Session.instance = this
  }
}

const session1 = new Session("Brais Moure")
const session2 = new Session()
console.log(session1 === session2) // → true
console.log(session2.name)         // → Brais Moure
```

`Symbol` como clave semi-oculta:

```js
const ID = Symbol("id")

class User {
  constructor(name) {
    this.name = name
    this[ID] = Math.random()
  }
  getId() { return this[ID] }
}

const user = new User("Brais")
console.log(user.ID)     // → undefined (no es accesible por nombre)
console.log(user.getId())// → valor del Symbol
```

`instanceof`, `Object.create` y `Proxy`:

```js
class Car {}
const car = new Car()
console.log(car instanceof Car) // → true

const anotherCar = Object.create(Car.prototype) // sin ejecutar constructor
console.log(anotherCar instanceof Car)          // → true

const handler = {
  get(target, prop) {
    console.log(`Se accede a la propiedad ${prop}`)
    return target[prop]
  },
  set(target, prop, value) {
    if (prop === "balance" && value < 0) {
      throw new Error("El saldo no puede ser negativo")
    }
    target[prop] = value
  }
}

class BankAccount {
  constructor(balance) { this.balance = balance }
}

const account = new Proxy(new BankAccount(100), handler)
console.log(account.balance) // log + → 100
account.balance = 50
// account.balance = -10     // ❌ Error: el saldo no puede ser negativo
```
