# Validaciones básicas de formularios HTML con JavaScript

Apuntes sobre cómo validar formularios en el cliente usando HTML5 y JavaScript.

## 1. Validación nativa con HTML5

Antes de tocar JS, conviene aprovechar los atributos que ya trae HTML. Cubren la mayoría de casos comunes sin escribir una sola línea de código.

```html
<form id="registro">
  <input type="text" name="usuario" required minlength="3" maxlength="20">
  <input type="email" name="correo" required>
  <input type="password" name="clave" required minlength="8">
  <input type="number" name="edad" min="18" max="99">
  <input type="url" name="web">
  <input type="text" name="dni" pattern="[0-9]{8}[A-Z]" title="8 dígitos y una letra">
  <button type="submit">Enviar</button>
</form>
```

Atributos útiles:

- `required`: el campo no puede quedar vacío.
- `minlength` / `maxlength`: longitud mínima y máxima de texto.
- `min` / `max`: valores numéricos o de fecha permitidos.
- `pattern`: expresión regular que debe cumplir el valor.
- `type`: ya valida formato (`email`, `url`, `number`, `tel`, `date`...).
- `title`: mensaje que aparece junto al error nativo.

El navegador muestra automáticamente los mensajes de error y bloquea el envío si algo no cumple.

## 2. Interceptar el envío con JavaScript

Para tener control total, se escucha el evento `submit` y se hace `preventDefault()` cuando algo falla.

```js
const form = document.getElementById('registro');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // siempre primero, así controlamos el flujo

  if (validarFormulario()) {
    form.submit(); // o hacer un fetch, etc.
  }
});
```

## 3. La Constraint Validation API

Cada campo de formulario expone una API muy útil para comprobar su estado sin reinventar la rueda.

```js
const correo = document.querySelector('input[name="correo"]');

correo.checkValidity();      // true/false
correo.validity.valueMissing; // ¿está vacío y es required?
correo.validity.typeMismatch; // ¿no cumple el type (email, url...)?
correo.validity.tooShort;     // ¿menos que minlength?
correo.validity.patternMismatch; // ¿no cumple el pattern?
correo.validationMessage;     // mensaje de error en texto
```

Y el formulario entero:

```js
form.checkValidity();   // valida todo y devuelve true/false
form.reportValidity();  // valida y muestra los mensajes nativos
```

## 4. Validaciones personalizadas

Cuando HTML no llega (por ejemplo, comprobar que dos contraseñas coinciden), se hace a mano.

```js
function validarFormulario() {
  const clave = form.clave.value;
  const repetir = form.repetirClave.value;
  const errores = [];

  if (clave !== repetir) {
    errores.push('Las contraseñas no coinciden');
  }

  if (!/[A-Z]/.test(clave)) {
    errores.push('La contraseña debe tener al menos una mayúscula');
  }

  if (!/[0-9]/.test(clave)) {
    errores.push('La contraseña debe tener al menos un número');
  }

  mostrarErrores(errores);
  return errores.length === 0;
}
```

Para integrar errores propios con la API nativa se usa `setCustomValidity`:

```js
form.repetirClave.addEventListener('input', () => {
  if (form.repetirClave.value !== form.clave.value) {
    form.repetirClave.setCustomValidity('Las contraseñas no coinciden');
  } else {
    form.repetirClave.setCustomValidity(''); // limpia el error
  }
});
```

## 5. Validar en tiempo real

Esperar al `submit` es frustrante para el usuario. Mejor validar mientras escribe:

- `input`: cada vez que cambia el valor (recomendado para feedback inmediato).
- `blur`: cuando el campo pierde el foco (menos agresivo).
- `change`: al confirmar el cambio en selects, checkboxes...

```js
const campos = form.querySelectorAll('input');

campos.forEach((campo) => {
  campo.addEventListener('blur', () => {
    if (!campo.checkValidity()) {
      campo.classList.add('error');
      mostrarError(campo, campo.validationMessage);
    } else {
      campo.classList.remove('error');
      limpiarError(campo);
    }
  });
});
```

## 6. Mostrar mensajes en la interfaz

Lo habitual es ocultar los mensajes nativos (usando `novalidate` en el `<form>`) y pintar los propios.

```html
<form id="registro" novalidate>
  <label>
    Email
    <input type="email" name="correo" required>
    <span class="mensaje-error" data-error="correo"></span>
  </label>
</form>
```

```js
function mostrarError(campo, mensaje) {
  const span = form.querySelector(`[data-error="${campo.name}"]`);
  if (span) span.textContent = mensaje;
}

function limpiarError(campo) {
  const span = form.querySelector(`[data-error="${campo.name}"]`);
  if (span) span.textContent = '';
}
```

Acompañando con CSS para resaltar el estado:

```css
input.error { border-color: #c00; }
.mensaje-error { color: #c00; font-size: 0.85em; }

/* Pseudoclases útiles */
input:invalid { border-color: #c00; }
input:valid   { border-color: #0a0; }
input:user-invalid { border-color: #c00; } /* solo tras interactuar */
```

## 7. Ejemplo completo

```html
<form id="registro" novalidate>
  <label>
    Usuario
    <input type="text" name="usuario" required minlength="3">
    <span data-error="usuario"></span>
  </label>

  <label>
    Email
    <input type="email" name="correo" required>
    <span data-error="correo"></span>
  </label>

  <label>
    Contraseña
    <input type="password" name="clave" required minlength="8">
    <span data-error="clave"></span>
  </label>

  <button type="submit">Registrar</button>
</form>

<script>
  const form = document.getElementById('registro');

  function mostrarError(campo, mensaje) {
    const span = form.querySelector(`[data-error="${campo.name}"]`);
    span.textContent = mensaje;
    campo.classList.toggle('error', !!mensaje);
  }

  function validarCampo(campo) {
    if (!campo.checkValidity()) {
      mostrarError(campo, campo.validationMessage);
      return false;
    }
    mostrarError(campo, '');
    return true;
  }

  form.querySelectorAll('input').forEach((campo) => {
    campo.addEventListener('blur', () => validarCampo(campo));
    campo.addEventListener('input', () => {
      if (campo.classList.contains('error')) validarCampo(campo);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const valido = [...form.querySelectorAll('input')]
      .map(validarCampo)
      .every(Boolean);

    if (valido) {
      console.log('Formulario enviado', new FormData(form));
      // form.submit() o fetch(...)
    }
  });
</script>
```

## 8. Buenas prácticas

- La validación en cliente es para UX; siempre hay que **volver a validar en el servidor**, ya que el cliente se puede saltar.
- No bloquear el envío sin explicar por qué: mostrar mensajes claros.
- Validar al `blur` la primera vez y al `input` cuando ya hay error (corrección en vivo).
- Aprovechar `type`, `required`, `pattern` y demás antes de escribir JS.
- Si el formulario es complejo, vale la pena usar librerías como Zod, Yup o el validador de un framework (React Hook Form, VeeValidate, etc.).

## 9. Expresiones regulares útiles

```js
const regex = {
  soloLetras: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
  soloNumeros: /^[0-9]+$/,
  telefonoES: /^[6-9][0-9]{8}$/,
  dniES: /^[0-9]{8}[A-Z]$/,
  codigoPostalES: /^[0-9]{5}$/,
  claveFuerte: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
};
```
