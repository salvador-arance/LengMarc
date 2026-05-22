/*
Clase 34 - Ejercicios: Objetos
Vídeo: https://youtu.be/1glVfFxj8a4?t=15675
*/

// 1. Crea un objeto con 3 propiedades

const salva = {
  name: "Salvador",
  age: 23,
  alias: "Salva",
};

// 2. Accede y muestra su valor

console.log(salva.name, salva.age, salva.alias);

// 3. Agrega una nueva propiedad

salva.email = "salvaarancegallego@gmail.com";
console.log(salva.email);

// 4. Elimina una de las 3 primeras propiedades

delete salva.email;
console.log(salva.email);

// 5. Agrega una función e invócala

salva["trabaja"] = function trabaja() {
  console.log(`${this.name} es un chico trabajador.`);
};

salva.trabaja();

// 6. Itera las propiedades del objeto

for (let key in salva) {
  console.log(key + " : " + salva[key]);
}

// 7. Crea un objeto anidado

const alumnoCuatoVientos = {
  name: "Salvador",
  apellido1: "Aizpun",
  apellido2: "Pellejero",
  job: {
    name: "Streamer",
    exp: 5,
    salary: 1300.25,
    work: function () {
      console.log(`${alumnoCuatoVientos.name} está streameando`);
    },
  },
};

// 8. Accede y muestra el valor de las propiedades anidadas

alumnoCuatoVientos.job.work();

// 9. Comprueba si los dos objetos creados son iguales

let sonIguales = alumnoCuatoVientos === salva;

console.log(sonIguales);

// 10. Comprueba si dos propiedades diferentes son iguales

sonIguales = alumnoCuatoVientos.name === salva.name;

console.log(sonIguales);
