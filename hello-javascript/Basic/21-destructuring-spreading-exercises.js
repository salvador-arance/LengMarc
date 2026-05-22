/*
Clase 36 - Ejercicios: Desestructuración y propagación
Vídeo: https://youtu.be/1glVfFxj8a4?t=16802
*/

// 1. Usa desestructuración para extraer los dos primeros elementos de un array

let myArray = [1, 2, 3, 4];

let [valor1, valor2] = myArray;

console.log(valor1 + ", " + valor2);

// 2. Usa desestructuración en un array y asigna un valor predeterminado a una variable

let myArrayStr = ["Manuel", "Salvador", "Yeray", "Elena"];

let [str1 = "España", str2 = "Andrés", str3 = "Maribel", str4 = "Hocico"] =
  myArrayStr;

console.log(str1, str2, str3, str4);

// 3. Usa desestructuración para extraer dos propiedades de un objeto

let myObject = {
  nombre: "Lámpara",
  tipo: "tecnología",
  potencia: 15,
  calidad: "MAX",
};

let {
  nombre: nombre1,
  tipo: tipo1,
  potencia: potencia1,
  calidad: calidad1,
} = myObject;

console.log(calidad1);

// 4. Usa desestructuración para extraer dos propiedades de un objeto y asígnalas
//    a nuevas variables con nombres diferentes

let {
  nombre: nombre2,
  tipo: tipo2,
  potencia: potencia2,
  calidad: calidad2,
} = myObject;

console.log(calidad2);

// 5. Usa desestructuración para extraer dos propiedades de un objeto anidado

let objetoAnidado = {
  name: "objeto",
  type: "objeto",
  subObjeto: {
    name: "Objeto Anidado",
    type: "objeto",
  },
};

let { name: nombreObjeto, type: tipoObjeto } = objetoAnidado.subObjeto;

console.log(tipoObjeto);

// 6. Usa propagación para combinar dos arrays en uno nuevo

let ints = [1, 2, 3];

let ints2 = [...ints, 4, 5];

console.log(ints2);

// 7. Usa propagación para crear una copia de un array

let ints3 = [...ints2];

console.log(ints3);

// 8. Usa propagación para combinar dos objetos en uno nuevo

let torso = {
  nombre: "torso",
  hola: 12,
};

const accion = () => {
  console.log("una pierna detrás de la otra.");
};

let persona = { ...torso, caminar: accion };

console.log(persona.caminar());

// 9. Usa propagación para crear una copia de un objeto

let persona2 = { ...persona };

console.log(persona2);

// 10. Combina desestructuración y propagación

const diasMes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const [v1, , v3, , v5] = diasMes;

const diasLibres = [v1, v3, v5];

const [, v2, , v4] = diasMes;

const diasOcupados = [v2, v4];

console.log(diasLibres);
console.log(diasOcupados);

const diasLibresYOcupados = [...diasLibres, ...diasOcupados];

console.log(diasLibresYOcupados);
