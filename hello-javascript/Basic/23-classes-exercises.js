/*
Clase 39 - Ejercicios: Clases
Vídeo: https://youtu.be/1glVfFxj8a4?t=18630
*/

// 1. Crea una clase que reciba dos propiedades

class Device {
  constructor(id = null, type = null) {
    this.id = id;
    this.type = type;
  }

  static esDevice() {
    console.log("No lo sé");
  }
}

let m50x = new Device(1, "Auricular");
// 2. Añade un método a la clase que utilice las propiedades

m50x.reproduce = function () {
  console.log(`El dispositivo ${this.type} con id ${this.id} emite sonido`);
};

// 3. Muestra los valores de las propiedades e invoca a la función
let i = 1;

for (let key in m50x) {
  console.log(`Propiedad ${i}:  ${m50x[key]}`);
  i++;
}

m50x.reproduce();

// 4. Añade un método estático a la primera clase

// 5. Haz uso del método estático

Device.esDevice();

// 6. Crea una clase que haga uso de herencia

class Telefono extends Device {
  constructor(id = null, type = null, brand = null, model = null) {
    super(id, type);
    this.brand = brand;
    this.model = model;
  }
}

let pixel7A = new Telefono(1, "Smartphone", "Google", "Pixel 7A");

console.log(pixel7A);

// 7. Crea una clase que haga uso de getters y setters

class Cliente {
  #idCliente;
  #idBanco;
  #nombreCliente;

  constructor(idCliente = null, idBanco = null, nombreCliente = null) {
    this.#idCliente = idCliente;
    this.#idBanco = idBanco;
    this.#nombreCliente = nombreCliente;
  }

  get idCliente() {
    return this.#idCliente;
  }

  get idBanco() {
    return this.#idBanco;
  }

  get nombreCliente() {
    return this.#nombreCliente;
  }

  set nombreCliente(nombre) {
    this.#nombreCliente = nombre;
  }
}

// 8. Modifica la clase con getters y setters para que use propiedades privadas

// 9. Utiliza los get y set y muestra sus valores
let primerCliente = new Cliente(1, 1, "Salva");

console.log(primerCliente.idBanco);
console.log(primerCliente.idCliente);
console.log(primerCliente.nombreCliente);

primerCliente.nombreCliente = "Manuel";

console.log(primerCliente.nombreCliente);

// 10. Sobrescribe un método de una clase que utilice herencia

class Animal {
  constructor(nombre = "") {
    this.name = nombre;
  }
}

class Mamifero extends Animal {
  constructor(nombre = "", vuela = false) {
    super(nombre);
    this.vuela = vuela;
  }

  puedeVolar() {
    if (this.vuela === true) {
      console.log("Este animal puede volar");
    } else {
      console.log("Este animal no puede volar");
    }
  }
}

class Murcielago extends Mamifero {
  constructor(nombre = "", vuela = true, usaUltraSonido = true) {
    super(nombre, vuela);
    this.usaUltraSonido = usaUltraSonido;
  }

  puedeVolar() {
    console.log("Suele hacerlo.");
  }
}

let mur1 = new Murcielago("Drácula", true, true);

mur1.puedeVolar();
