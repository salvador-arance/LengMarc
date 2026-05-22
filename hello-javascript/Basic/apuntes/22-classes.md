# Clases 37-38 · Clases y herencia

> Lección: [`Basic/22-classes.js`](../22-classes.js) — [Vídeo (Clases)](https://youtu.be/1glVfFxj8a4?t=16864) · [Vídeo (Herencia)](https://youtu.be/1glVfFxj8a4?t=17999)

## Conceptos

Una **clase** es una **plantilla** para crear objetos con la misma estructura y comportamiento. Es la forma moderna y recomendada de programación orientada a objetos en JavaScript. Por debajo sigue siendo *azúcar sintáctico* sobre los **prototipos** de JS.

- **`constructor`**: método especial que se ejecuta al crear el objeto con `new`; inicializa las propiedades. Admite **valores por defecto**.
- **Métodos**: funciones definidas dentro de la clase (viven en el prototipo, compartidas por todas las instancias).
- **Campos de instancia**: propiedades declaradas en el cuerpo de la clase (`x = 0`) sin necesidad de `constructor`.
- **Propiedades/métodos privados (`#`)**: solo accesibles desde dentro de la clase; no se pueden leer ni escribir desde fuera.
- **Getters / setters**: métodos especiales (`get` / `set`) que se usan como si fueran propiedades, normalmente para exponer datos privados de forma controlada.
- **Miembros estáticos (`static`)**: propiedades/métodos que pertenecen a la **clase**, no a las instancias; se llaman sobre la clase directamente.
- **Herencia (`extends`)**: una clase hija hereda propiedades y métodos de una clase padre. Con **`super`** llama al constructor (`super(...)`) o a métodos del padre (`super.metodo()`). La hija puede **sobrescribir** métodos.
- **`instanceof`**: comprueba si un objeto es instancia de una clase (o de un ancestro suyo).
- **Expresión de clase**: una clase también se puede asignar a una variable (`const C = class { }`).

## Definiciones

### Base

- **Clase**: plantilla para crear objetos (instancias).
- **Instancia**: objeto creado a partir de una clase con `new`.
- **`constructor(...)`**: inicializa la instancia.
- **Campo de instancia**: `nombre = valor` en el cuerpo de la clase.
- **Método**: función en la clase; vive en el prototipo y la comparten las instancias.

### Encapsulación

- **Propiedad/método privado `#x`**: accesible solo dentro de la clase.
- **`get` / `set`**: definen lectura/escritura controlada de una propiedad.

### Estáticos y herencia

- **`static`**: método/propiedad de la clase, no de las instancias.
- **`extends`**: hace que una clase herede de otra.
- **`super(...)`**: invoca el **constructor** de la clase padre (obligatorio antes de usar `this` en la hija).
- **`super.metodo()`**: invoca un **método** del padre desde la hija.
- **`obj instanceof Clase`**: `true` si `obj` deriva de `Clase`.

## Snippets de código

### Clase básica, valores por defecto y métodos

```js
class Person {
  constructor(name, age, alias) {
    this.name = name
    this.age = age
    this.alias = alias
  }
}
let person = new Person("Brais", 37, "MoureDev")

class DefaultPerson {
  constructor(name = "Sin nombre", age = 0, alias = "Sin alias") {
    this.name = name; this.age = age; this.alias = alias
  }
}
let p3 = new DefaultPerson("Brais", 37)
console.log(p3.alias) // → Sin alias

class PersonWithMethod {
  constructor(name) { this.name = name }
  walk() { console.log("La persona camina.") }
}
new PersonWithMethod("Brais").walk()
```

### Propiedades privadas, getters y setters

```js
class GetSetPerson {
  #name
  #bank
  constructor(name, bank) { this.#name = name; this.#bank = bank }
  get name() { return this.#name }   // lectura controlada
  set bank(bank) { this.#bank = bank } // escritura controlada
}
let p6 = new GetSetPerson("Brais", "IBAN123")
console.log(p6.name)        // → Brais (usa el getter)
p6.bank = "new IBAN123"     // usa el setter
// console.log(p6.#bank)    // ❌ Error: propiedad privada
```

### Herencia con `extends` y `super`

```js
class Animal {
  constructor(name) { this.name = name }
  sound() { console.log("Sonido genérico") }
}

class Dog extends Animal {
  sound() { console.log("Guau!") }     // sobrescribe
  run() { console.log("El perro corre") }
}

class Fish extends Animal {
  constructor(name, size) {
    super(name) // llama al constructor de Animal
    this.size = size
  }
  swim() { console.log("El pez nada") }
}

new Dog("MoureDog").sound()  // → Guau!
new Fish("MoureFish", 10).sound() // → Sonido genérico (heredado)
```

### Métodos estáticos

```js
class MathOperations {
  static sum(a, b) { return a + b }
}
console.log(MathOperations.sum(5, 10)) // → 15 (sin crear instancia)
```

### Campos de instancia y campos estáticos

```js
class Contador {
  cuenta = 0                 // campo de instancia (sin constructor)
  static total = 0           // campo estático (de la clase)

  incrementar() {
    this.cuenta++
    Contador.total++         // se accede por el nombre de la clase
  }
}
const c1 = new Contador(), c2 = new Contador()
c1.incrementar(); c2.incrementar(); c2.incrementar()
console.log(c1.cuenta, c2.cuenta) // → 1 2
console.log(Contador.total)       // → 3 (compartido por la clase)
```

### Llamar a un método del padre con `super.metodo()`

```js
class Vehiculo {
  describir() { return "Soy un vehículo" }
}
class Coche extends Vehiculo {
  describir() {
    return super.describir() + " de 4 ruedas" // amplía, no reemplaza
  }
}
console.log(new Coche().describir()) // → Soy un vehículo de 4 ruedas
```

### `instanceof` y expresión de clase

```js
const perro = new Dog("Toby")
console.log(perro instanceof Dog)    // → true
console.log(perro instanceof Animal) // → true (hereda de Animal)
console.log(perro instanceof Array)  // → false

const Punto = class {                // clase como expresión
  constructor(x, y) { this.x = x; this.y = y }
}
console.log(new Punto(1, 2))         // → Punto { x: 1, y: 2 }
```

## Buenas prácticas y errores comunes

- **`super()` antes de `this`**: en el constructor de una clase hija debes llamar a `super(...)` antes de usar `this`, o lanza `ReferenceError`.
- **Privados de verdad con `#`**: el viejo convenio `_campo` no protege nada; `#campo` sí es inaccesible desde fuera (y da error de sintaxis al intentarlo).
- **`static` para utilidades sin estado de instancia** (fábricas, helpers tipo `Math`). No uses `this` de instancia dentro de un método estático.
- **Composición sobre herencia**: cadenas de `extends` largas se vuelven frágiles; muchas veces es mejor componer objetos/funciones.
- **Los métodos no se enumeran**: viven en el prototipo, así que `Object.keys(instancia)` no los lista (sí lista los campos de instancia).
- **`class` no tiene hoisting útil**: a diferencia de `function`, usar una clase antes de declararla lanza `ReferenceError`.
- **Sin `new` falla**: invocar una clase como función (`Person()`) lanza `TypeError`.
