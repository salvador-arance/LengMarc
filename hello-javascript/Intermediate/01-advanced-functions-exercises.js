/*
Clase 12 - Funciones avanzadas
Vídeo: https://youtu.be/iJvLAZ8MJ2E?t=4112
*/

// 1. Crea una función que retorne a otra función

function retornando(mensaje) {
  return () => console.log(`Retornando... ${mensaje}`);
}

const retornada = retornando("Hola Salva!!!");

// retornada();

// 2. Implementa una función currificada que multiplique 3 números

function curryMultiply(a) {
  return function (b) {
    return function (c) {
      return a * b * c;
    };
  };
}

// 3. Desarrolla una función recursiva que calcule la potencia de un número elevado a un exponente

/*
Solución óptima que me ha dado claude:

function recursiveExponent(num, exp) {
  if (num === 0) return exp > 0 ? 0 : undefined;
  if (exp === 0) return 1;
  if (exp > 0) return num * recursiveExponent(num, exp - 1);
  return (1 / num) * recursiveExponent(num, exp + 1);
}

*/

function recursiveExponent(num, exp) {
  if (num === 0 && exp > 0) {
    return 0;
  }

  if (num === 0 && exp <= 0) {
    return undefined;
  }

  if (exp === 0) {
    return 1;
  }

  if (exp > 0) {
    if (exp === 1) {
      return num;
    }

    return num * recursiveExponent(num, exp - 1);
  }

  if (exp === -1) {
    return 1 / num;
  }

  return (1 / num) * recursiveExponent(num, exp + 1);
}

console.log(recursiveExponent(5, 10));

// 4. Crea una función createCounter() que reciba un valor inicial y retorne un objeto con métodos para increment(), decrement() y getValue(), utilizando un closure para mantener el estado

function createCounter(value) {
  function increment() {
    value++;
  }

  function decrement() {
    value--;
  }

  function getValue() {
    return value;
  }

  return {
    increment,
    decrement,
    getValue,
  };
}

// 5. Crea una función sumManyTimes(multiplier, ...numbers) que primero sume todos los números (usando parámetros Rest) y luego multiplique el resultado por multiplier

function sumManyTimes(multiplier, ...numbers) {
  let result = 0;

  for (let n of numbers) {
    result += n;
  }

  return result * multiplier;
}

//console.log(sumManyTimes(2, 2, 2, 2));

// 6. Crea un Callback que se invoque con el resultado de la suma de todos los números que se le pasan a una función

function sumNumbers(callback, ...numbers) {
  const result = sumManyTimes(1, ...numbers);
  callback(result);
}

function showResult(result) {
  console.log(result);
}

sumNumbers(showResult, 5, 2, 2, 20);

// 7. Desarrolla una función parcial

/*
function sumNumbers(multiplier) {
  return function (...numbers) {
    return sumManyTimes(multiplier, ...numbers);
  };
}

const sumAndMultiplyBy5 = sumNumbers(5);

// console.log(sumAndMultiplyBy5(5, 5));
*/
// 8. Implementa un ejemplo que haga uso de Spread

const numeros = [2, 3, 4, 5, 6];

function incrementElements(...numbers) {
  let newArray = [];
  for (let n of numbers) {
    newArray.push(n + 1);
  }
  return newArray;
}

// console.log(incrementElements(...numeros));

// 9. Implementa un retorno implícito

const f = (a, b) => a * b + 10;

// console.log(f(10, 10));

// 10. Haz uso del this léxico

let cliente = {
  name: "salva",
  fechaNacimiento: new Date("2002-10-11"),

  calcularEdad() {
    let today = new Date();
    let age = today.getFullYear() - this.fechaNacimiento.getFullYear();

    if (
      this.fechaNacimiento.getMonth() > today.getMonth() ||
      (this.fechaNacimiento.getMonth() === today.getMonth() &&
        this.fechaNacimiento.getDate() > today.getDate())
    ) {
      age -= 1;
    }

    return age;
  },

  obtenerInfo() {
    return () => {
      return `${this.name} nació el día ${this.fechaNacimiento.toLocaleDateString()} y tiene ${this.calcularEdad()} años`;
    };
  },
};

const info = cliente.obtenerInfo();

console.log(info());
