// 9. Exporta una función, una constante y una clase desde una carpeta

function desdeOtroArchivo() {
  return "Hola, soy una función que se está ejecutando desde otro archivo.";
}

const RUTA_ARCHIVO = "Basic/carpeta-ejercicio-31/exports.js";

class OtroArchivo {
  constructor(funcion, ruta) {
    this.funcion = funcion;
    this.ruta = ruta;
  }

  toString() {
    let result = this.funcion();
    return `Resultado de la función:  ${result}.\nRuta: ${this.ruta}`;
  }
}

export default {
  desdeOtroArchivo,
  RUTA_ARCHIVO,
  OtroArchivo,
};
