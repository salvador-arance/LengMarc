/*
Clase 41 - Ejercicios: Manejo de errores
Vídeo: https://youtu.be/1glVfFxj8a4?t=20392
*/

// 1. Captura una excepción utilizando try-catch
let a = 1;

try {
  console.log(a.toLocaleUpperCase());
} catch (error) {
  console.log("Error!!");
}

// 2. Captura una excepción utilizando try-catch y finally

try {
  console.log(a.toLocaleUpperCase());
} catch (error) {
  console.log("Error.", error.message);
} finally {
  console.log("Esto siempre se ejecuta");
}
// 3. Lanza una excepción genérica

function lanzarExcepcion(a) {
  if (a !== "a") {
    throw new Error("a no es a");
  }

  return a;
}

try {
  console.log(lanzarExcepcion("1"));
} catch (error) {
  console.log("ERROR!:", error.message);
}

// 4. Crea una excepción personalizada

function lanzarExcepcionPersonalizada(a) {
  if (a !== "a") {
    throw new ANoEsAError("ERROR: ", a);
  }

  return a;
}

class ANoEsAError extends Error {
  constructor(message, a) {
    super(message);
    this.a = a;
    this.exactMessage = `${this.message} ${a} es diferente a 'a'.`;
  }
}
// 5. Lanza una excepción personalizada

try {
  console.log(lanzarExcepcionPersonalizada("b"));
} catch (error) {
  if (error instanceof ANoEsAError) {
    console.log(error.exactMessage);
  } else {
    throw error;
  }
}

// 6. Lanza varias excepciones según una lógica definida

function dividirReales(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Sólo se puede dividir entre datos numéricos.");
  }

  if (Number.isInteger(a) || Number.isInteger(b)) {
    throw new TypeError("Aquí sólo dividimos entre números REALES");
  }
  return a / b;
}

// 7. Captura varias excepciones en un mismo try-catch

try {
  console.log(dividirReales("a", 2.2));
  console.log(lanzarExcepcionPersonalizada("3"));
} catch (error) {
  if (error instanceof ANoEsAError) {
    console.log(error.exactMessage);
  }
  if (error instanceof TypeError) {
    console.log(error.message, " piénsa mejor en los tipos.");
  }
}

// 8. Crea un bucle que intente transformar a float cada valor y capture y muestre los errores

let arrayMixto = [2, 2.3, "lucifer", 23.7, -12];

function parsearArrayAFloat(arr) {
  let arrayParseado = [];
  let errores = [];

  for (let e of arr) {
    try {
      let parseado = parseFloat(e);
      if (Number.isNaN(parseado)) {
        throw new TypeError(`"${e}" no es un número válido`);
      }
      arrayParseado.push(parseado);
    } catch (error) {
      errores.push(error);
      arrayParseado.push(NaN);
    }
  }

  return { arrayParseado, errores };
}

let resultado = parsearArrayAFloat(arrayMixto);
console.log("Array parseado:", resultado.arrayParseado);
console.log(
  "Errores:",
  resultado.errores.map((e) => e.message),
);

// 9. Crea una función que verifique si un objeto tiene una propiedad específica y lance una excepción personalizada

class InvalidPropertyError extends Error {
  constructor(message, obj, propiedadBuscada) {
    super(message);
    this.name = "InvalidPropertyError";
    this.obj = obj;
    this.propiedadBuscada = propiedadBuscada;
  }

  listProperties() {
    for (let key in this.obj) {
      if (this.obj.hasOwnProperty(key)) {
        console.log(`  - ${key}: ${this.obj[key]}`);
      }
    }

    console.log(`Propiedad no encontrada: ${this.propiedadBuscada}`);
  }
}

function propiedadExiste(obj, propiedad) {
  if (typeof obj !== "object" || obj === null) {
    throw new TypeError(`ERROR: ${obj} no es un objeto.`);
  }
  if (!obj.hasOwnProperty(propiedad)) {
    throw new InvalidPropertyError(
      "ERROR: la propiedad no existe.",
      obj,
      propiedad,
    );
  }

  return `La propiedad existe y su contenido es: ${obj[propiedad]}`;
}

let objetoPrueba = {
  name: "Salvador",
  email: "salvaarancegallego@gmail.com",
};

let objetoPruebaDos = {
  name: "Salvador",
};

try {
  console.log(propiedadExiste(objetoPruebaDos, "email"));
} catch (error) {
  if (error instanceof InvalidPropertyError) {
    console.log(error.message);
    console.log("Propiedades que existen:");
    error.listProperties();
  } else {
    console.log(error.message);
  }
}

// 10. Crea una función que realice reintentos en caso de error hasta un máximo de 10

// Operación inestable: falla ~70% de las veces (simula red/API)
function operacionInestable() {
  if (Math.random() < 0.7) {
    throw new Error("Fallo transitorio");
  }
  return "¡Éxito!";
}

function conReintentos(operacion, maxIntentos = 10) {
  let errores = [];

  for (let intento = 1; intento <= maxIntentos; intento++) {
    try {
      let resultado = operacion();
      return { resultado, intentos: intento, errores }; //
    } catch (error) {
      errores.push(`Intento ${intento}: ${error.message}`);
    }
  }

  throw new Error(
    `Fallo tras ${maxIntentos} intentos. Errores: ${errores.length}`,
  );
}

try {
  let { resultado, intentos, errores } = conReintentos(operacionInestable);
  console.log(`${resultado} a la ${intentos}ª`);
  console.log("Errores por el camino:", errores);
} catch (error) {
  console.log(error.message);
}
