/*
Clase 43 - Ejercicios: Console
Vídeo: https://youtu.be/1glVfFxj8a4?t=21421
*/

// 1. Crea un función que utilice error correctamente

function puedeFallar() {
  const generado = Math.random();

  if (generado < 0.9) {
    throw new Error("El número debe ser mayor a 0,9.");
  }
  return `Generado: ${generado}`;
}

function reintentos(func, maxIntentos = 10) {
  let ultimoError = null;

  for (let i = 0; i < maxIntentos; i++) {
    try {
      const resultado = func();
      return `Éxito en intento ${i + 1}: ${resultado}`;
    } catch (error) {
      ultimoError = error;
      console.warn(`Intento ${i + 1} falló: ${error.message}`);
    }
  }

  throw new Error(
    `Falló después de ${maxIntentos} intentos. Último error: ${ultimoError.message}`,
  );
}

try {
  console.log(reintentos(puedeFallar));
} catch (error) {
  console.error(error.message);
}

// 2. Crea una función que utilice warn correctamente



// 3. Crea una función que utilice info correctamente

// 4. Utiliza table

// 5. Utiliza group

// 6. Utiliza time

// 7. Valida con assert si un número es positivo

// 8. Utiliza count

// 9. Utiliza trace

// 10. Utiliza clear
