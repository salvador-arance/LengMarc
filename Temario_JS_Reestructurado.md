# JavaScript (JS) — Temario

**CFGS · 1 DAM**
Silvia Sanz — silvia_sanz@cuatrovientos.org

---

## Índice general

### Parte 1/3 — Introducción y sintaxis básica
1. ¿Para qué vamos a usar JS?
2. ¿Qué es JS?
3. JS en páginas HTML
4. Sintaxis: normas y convenciones

### Parte 2/3 — Fundamentos del lenguaje
5. Constantes y variables
6. Tipos de datos
7. Operadores
8. Sentencias de control
9. Plantillas literales
10. Métodos de objetos nativos (String, Array, Number)
11. Más objetos nativos: `Date` y `Math`

### Parte 3/3 — Interacción con el navegador
12. Funciones
13. Scope (ámbito)
14. BOM — Browser Object Model
15. DOM — Document Object Model
16. Eventos
17. Debugger y snippets en Chrome DevTools

---

# Parte 1/3 — Introducción y sintaxis básica

## 1. ¿Para qué vamos a usar JS?

JavaScript nos sirve para dos grandes propósitos:

### 1.1. Hacer páginas dinámicas
- Cambiar contenido dinámicamente
- Validar información

### 1.2. Interactuar con el usuario
- Dar avisos
- Pedir confirmación
- Pedir información

---

## 2. ¿Qué es JS?

- Lenguaje **interpretado** (no compilado).
- Se interpreta en **tiempo de ejecución**.
- Basta un navegador para ejecutarlo.
- **Distinto a Java** (no confundir).

---

## 3. JS en páginas HTML

Existen varias formas de incluir código JavaScript en un documento HTML.

### 3.1. Opción 1 — JS embebido en el HTML

**Opción 1A: dentro de `<head>`**

```html
<head>
    …
    <script type="text/javascript">
        alert('Hola 4vientos!!');
    </script>
</head>
```

**Opción 1B: dentro de `<body>`**

```html
<body>
    …
    <script type="text/javascript">
        alert('Hola 4vientos!!');
    </script>
</body>
```

> **Objetivo a mantener: SEPARACIÓN DE CÓDIGO** (HTML — CSS — JS).

### 3.2. Opción 2 — Fichero externo

```html
<head>
  ...
  <script type="text/javascript" src="./js/ficheroexterno.js"></script>
</head>

<body>
  ...
  <script type="text/javascript" src="./js/ficheroexterno.js"></script>
</body>
```

### 3.3. `<head>` vs `<body>` — diferencias clave

Tres preguntas a tener en cuenta:
1. ¿Cuándo se **descarga** el script?
2. ¿Cuándo se **ejecuta** el script?
3. Si el script trabaja con el DOM, ¿tiene **acceso** a los elementos?

**Diagrama temporal (timeline):**

- **`<script>` dentro de `<head>`:** se interpreta el HTML → pausa en la interpretación → descarga del script → ejecución del script → se reanuda la interpretación del HTML.
- **`<script>` antes de `</body>`:** se interpreta el HTML completo primero → al final, descarga del script → ejecución del script.

**Leyenda del diagrama:**
- 🟢 Interpretación de HTML
- ⬜ Pausa en la interpretación de HTML
- 🟣 Descarga de script
- 🟥 Ejecución de script

### 3.4. Fichero externo con `async` / `defer`

```html
<script async type="text/javascript" src="./js/ficheroexterno.js"></script>
```

VS

```html
<script defer type="text/javascript" src="./js/ficheroexterno.js"></script>
```

**Diagrama temporal:**

- **ASYNC:** se interpreta el HTML → cuando el script termina de descargarse en paralelo, se **pausa** el HTML para ejecutar el script → continúa la interpretación del HTML.
- **DEFER:** se interpreta el HTML mientras se descarga el script en paralelo → el script se ejecuta **al final**, justo antes de `DOMContentLoaded`.

**Tabla comparativa ASYNC vs DEFER:**

| | ORDEN | CARGA DOM (evento `DOMContentLoaded`) |
|---|---|---|
| **ASYNC** | No se espera a otros scripts. El que primero descarga, ejecuta primero. | El script puede ejecutarse mientras el documento HTML no se ha descargado por completo. |
| **DEFER** | Se respeta el orden del código HTML. | El script se ejecuta después de descargar el documento HTML, justo antes del evento `DOMContentLoaded`. |

### 3.5. ¿Cuándo usar cada uno?

- **ASYNC:** scripts independientes del sitio/aplicación web (no trabajan con el DOM).
- **DEFER:** scripts que acceden al DOM. También cuando el orden de ejecución entre scripts es relevante.

> 📎 Info detallada: https://www.freecodecamp.org/news/javascript-performance-async-defer/

### 3.6. Resumen visual — las 4 opciones

1. `<script>` dentro de `<head>`
2. `<script>` antes de `</body>`
3. `async`
4. `defer`

---

## 4. Sintaxis: normas y convenciones

- Las sentencias acaban con `;`
- **Case sensitive** (mayúsculas vs. minúsculas)
- Tabular/indentar el código
- 1 espacio entre variables y operadores
- Consistencia en el uso de comillas
- 1 sentencia, 1 línea
- Salto de línea después de operadores o comas
- Líneas de ±80 caracteres

**Comentarios:**

```js
// esto es un comentario de 1 línea

/* también puedo comentar
   varias líneas, así */
```

---

# Parte 2/3 — Fundamentos del lenguaje

## 5. Constantes y variables

### 5.1. Constantes

Sólo se les asigna valor **1 vez, en la declaración**.

```js
const PI = 3.1415;
```

### 5.2. Variables

```js
let num1 = 3;        // inicialización
let num2 = num1 + 3;
let num3;
```

### 5.3. Normas para los nombres

- Nombres cortos y significativos.
- Deben empezar por letra.
- No se pueden usar operadores en el nombre.
- No pueden contener espacios.
- No pueden usarse palabras reservadas.
- Evitar uso de letras como `ñ`, `-`, `$`, `&`, `%`, …
- **Variables:** escritas en `camelCase`.
- **Constantes:** escritas en MAYÚSCULAS.
- ¡Piensa en quien lo tenga que modificar!
- ¡Piensa en retocar tu código 8 meses después!

---

## 6. Tipos de datos

- No hay que hacer declaración explícita del tipo.
- Se "asignan" al dar valor a la variable.
- Algunos objetos nativos: **Numéricos, Booleanos, Strings, Arrays**, …

### 6.1. Numéricos

Para almacenar enteros y decimales.

```js
let num1 = 16;
let num2 = 234.56;
```

### 6.2. Booleanos

Para almacenar valores lógicos.

```js
let continuar = true;
let error = false;
```

**Tabla AND:**

| AND | T | F |
|---|---|---|
| **T** | T | F |
| **F** | F | F |

**Tabla OR:**

| OR | T | F |
|---|---|---|
| **T** | T | T |
| **F** | T | F |

### 6.3. Strings (cadenas de caracteres)

Para almacenar caracteres sueltos, palabras, frases, textos…

```js
let vocales = 'aAeEiIoOuU';
let letra = 'a';
```

Si la cadena contiene comillas por sí misma, hay que **mezclar comillas simples y dobles**, o usar **escape characters** (`\`):

```js
let cadena = 'Según el autor: "Tararí tarará"';
let cadena = "Según el autor: \"Tararí tarará\"";
```

### 6.4. Arrays

Para almacenar una colección/conjunto de variables (se pueden mezclar tipos).

```js
let semana = ['Lunes', 'Martes', 'Miércoles',
              'Jueves', 'Viernes', 'Sábado', 'Domingo'];
```

**Acceso por índice**, desde `0` hasta `numElementos - 1`:

```js
semana[0]   // 'Lunes'
semana[3]   // 'Jueves'
semana[6]   // 'Domingo'
```

**Declaración como objeto JS — varias formas equivalentes:**

```js
// Forma 1: instanciación vacía + asignación por índice
let semana = new Array();
semana[0] = 'Lunes';
semana[1] = 'Martes';
// ...

// Forma 2: constructor con valores
let semana = new Array('Lunes', 'Martes', …);

// Forma 3: literal de array (la más habitual)
let semana = ['Lunes', 'Martes', …];
```

---

## 7. Operadores

| Operador | Operación | Ejemplo |
|---|---|---|
| `=` | Asignación | `x = 5;` |
| `++` / `--` | Incremento / Decremento | `z++;` vs `++z;` — `x = z++;` vs `x = ++z;` |
| `&&` | AND | `seguir = (x > 5) && (z < 10)` |
| `\|\|` | OR | `seguir = (cont < 8) \|\| parar` |
| `!` | NOT | `seguir = !parar` |
| `+`, `-`, `*`, `/`, `%` | Matemática | `num1 + num2` |
| `==`, `!=` | Igualdad / desigualdad | comparan **valor** |
| `===`, `!==` | Igualdad / desigualdad **estricta** | comparan **valor y tipo** |
| `<`, `>`, `<=`, `>=` | Relación | `contador <= total` |

---

## 8. Sentencias de control

Las sentencias de control disponibles son: `if` / `if-else`, `switch`, `for`, `while`, `do while`.

### 8.1. IF / IF-ELSE

**IF simple:**

```js
if (condición) {
    sentencia1;
    sentencia2;
}
```

**IF-ELSE:**

```js
if (condición) {
    sentencia1;
    sentencia2;
} else {
    sentencia3;
    sentencia4;
}
```

**IF-ELSE IF-ELSE:**

```js
if (condición) {
    sentencia1;
    sentencia2;
} else if (condición) {
    sentencia3;
    sentencia4;
} else {
    sentencia5;
}
```

### 8.2. SWITCH

```js
switch (variable/expresión) {
    case 1:
        bloqueSentencias1;
        break;              // sale del switch
    case 2:
        bloqueSentencias2;
        break;
    case 3:
        sentencia3;
        break;
    default:
        sentencia;
        break;
}
```

### 8.3. Operador condicional ternario

**Equivalente a `if-else`:**

```js
if (edad >= 18) {
    login = true;
} else {
    login = false;
}

// equivalente con ternario:
login = (edad >= 18) ? true : false;
```

**Uso dentro de una expresión:**

```js
'La matrícula es de: ' + (esBecario ? '50€' : '75€');
```

**Equivalente a `if-else if`:**

```js
let check1 = false,
    check2 = false,
    access = check1 ? 'Denegado' : check2 ? 'Denegado' : 'Permitido';
// ¿Cuál es el valor de access?  → 'Permitido'
```

**Equivalente a `if-else` con varias operaciones por rama:**

```js
(edad > 18) ? (
    alert('OK, puedes pasar!'),
    location.assign('bienvenido.html')
) : (
    stop = true,
    alert('Eres menor de edad. Nos vemos otro día!')
);
```

### 8.4. FOR

```js
for (inicialización; condición; incremento) {
    sentencia1;
    sentencia2;
}

// Ejemplo:
for (i = 0; i < 10; i++) {
    msg = 'Valor ' + i + 'º: ' + hobby[i];
    alert(msg);
}
```

### 8.5. WHILE

```js
while (condición) {
    sentencia1;
    sentencia2;
}
```

**Funcionamiento:**
1. Se evalúa la condición.
2. Si la condición es:
   - **Verdadera**, se ejecutan las sentencias y se vuelve al paso 1.
   - **Falsa**, no se ejecutan las sentencias y se sale del bucle.

> ⚠️ **¡¡Indispensable!!** Alguna de las variables que forman parte de la condición tiene que cambiar su valor dentro del bucle.

### 8.6. DO WHILE

```js
do {
    sentencia1;
    sentencia2;
} while (condición);
```

**Funcionamiento:**
1. Se ejecutan las sentencias **1 vez siempre**.
2. Se evalúa la condición.
3. Si la condición es:
   - **Verdadera**, se ejecutan las sentencias y se vuelve al paso 2.
   - **Falsa**, no se ejecutan las sentencias y se sale del bucle.

> ⚠️ **¡¡Indispensable!!** Alguna de las variables que forman parte de la condición tiene que cambiar su valor dentro del bucle.

---

## 9. Plantillas literales (template literals)

También llamadas **string interpolation**.

### 9.1. ¿Para qué sirven?
- Escribir cadenas y cadenas multilínea.
- Incrustar expresiones JS.
- Escribir cadenas con operador ternario.

### 9.2. ¿Cómo se usan?
- Inicio y cierre con comilla simple invertida (`` ` ``).
- Incrustar código JS así: `${código js}`.

### 9.3. Ejemplos

**Ejemplo 1 — interpolación básica:**

```js
cuotaFinal = `La cuota es de ${cuota * descuento}€`;
```

**Ejemplo 2 — multilínea:**

```js
cuotaFinal = `La cuota es de ${cuota * descuento}€.

Deberá abonarse en un plazo de 15 días.

Gracias.`;
```

**Ejemplo 3 — con operador ternario:**

```js
salida = `La matrícula es de: ${(esBecario ? `50€` : `75€`)}`;

salida = `La matrícula es de: ${(esBecario ? matOrd : matBeca)}`;

salida = `La matrícula es de: ${totalMat}.
${(totalMat > 30) ? 'Disponible pago en efectivo y tarjeta' : 'Pago solo en efectivo'}`;
```

---

## 10. Métodos de objetos nativos

Existen dos tipos de "rutinas" en JS:
- **Predefinidas:** métodos de objetos JS (Number, String, Array).
- **Creadas por el desarrollador:** funciones (normales, anónimas y flecha).

### 10.1. Métodos String

Uso: `variable.metodo()` y `variable.propiedad`.

- `concat()`
- `toUpperCase()`
- `toLowerCase()`
- `charAt()`
- `search()`
- `indexOf()`
- `lastIndexOf()`
- `substring()`
- `split()`
- `join()`
- `trim()`
- `replace()`
- `includes()`
- `slice()`

**Propiedad:** `length` (propiedad del objeto String).
**Operador `+`** para concatenar objetos String.

> 📎 Consultar los métodos en MDN.

### 10.2. Métodos Array

Uso: `variable.metodo()` y `variable.propiedad`.

- `concat()`
- `join()`
- `reverse()`
- `fill()`
- `toString()`
- `indexOf()`
- `lastIndexOf()`
- `slice()`
- `includes()`
- `splice()`
- `pop()`
- `push()`
- `shift()`
- `unshift()`
- `forEach()`

**Propiedad:** `length` (propiedad del objeto Array).

> 📎 Consultar los métodos en MDN.

### 10.3. Métodos Number

Uso: `variable.metodo()`.

- `isNaN()`
- `isInteger()`
- `toFixed()`
- `toPrecision()`
- `toString()`

> 📎 Consultar los métodos en MDN.

### 📝 Ejercicio
1. Repartir métodos.
2. Buscar información de uso.
3. Implementar un ejemplo.

---

## 11. Más objetos nativos JS

### 11.1. `Date`

**Declaración – instanciación:**

```js
let fecha = new Date();
```

**Algunos métodos:**

- `getMonth()` — ⚠️ los meses van de **0 (enero) a 11 (diciembre)**
- `getFullYear()`
- `getDate()`
- `getDay()`
- `getHours()`
- …

### 11.2. `Math`

- **No se puede editar.**
- **No se instancia** (se usa directamente como `Math.xxx`).

**Algunos métodos:**

```js
Math.random();   // genera un número aleatorio entre 0 y 1
Math.ceil(x);    // redondea x hacia arriba
Math.floor(x);   // redondea x hacia abajo
Math.abs(x);     // valor absoluto de x
Math.min(x, y);  // devuelve valor mínimo
```

### 📝 Ejercicio
Programa en un snippet el juego de las capitales (enunciado en Aula0).

---

# Parte 3/3 — Interacción con el navegador

## 12. Funciones

### 12.1. Sintaxis
- Escritas en modo `camelCase`.
- Se delimitan con `{ }`.
- Llave de abrir en la misma línea de la función.

### 12.2. Ventajas
- Reutilización de código.
- Mantenimiento más eficiente.

### 12.3. A tener en cuenta
- Pueden utilizar o no parámetros.
- Pueden devolver 1 valor o ninguno.
- Los **argumentos** en la llamada deben tener mismo número, tipo y orden que los **parámetros** en la definición.
- Parámetros y argumentos pueden tener el mismo nombre o no.

### 12.4. Función sin parámetros (con `return`)

```js
function funcionSinParametros() {
    bloque sentencias;
    return valor;
}
```

Hay que "recoger" el valor:
- en una variable, o
- usando el valor en una expresión.

**Ej. llamada:**

```js
valorDevuelto = funcionSinParametros();
```

### 12.5. Función con parámetros

```js
function funcionConParametros(param1, param2) {
    bloque de sentencias;
}
```

Los argumentos pueden ser variables o valores literales.

**Ej. llamada:**

```js
funcionConArgumentos(arg1, arg2);
```

### 12.6. Funciones anónimas

Funciones como expresiones:

```js
let suma = function(a, b) {
    return a + b;
}
let b = 4;
alert(suma(5, b));
```

### 12.7. Funciones flecha (arrow functions)

Funciones como expresiones:

```js
let suma = (a, b) => a + b;
let b = 4;
alert(suma(5, b));
```

---

## 13. BOM — Browser Object Model

### 13.1. Estructura jerárquica

```
                 window
                   │
   ┌────────┬──────┼──────┬─────────┐
location  navigator  screen  history  document
```

### 13.2. `window`

- Es la ventana del navegador.
- Objeto por defecto (no es necesario referenciarlo).

**Propiedades relevantes:**
- `outerWidth`
- `outerHeight`
- `innerWidth`
- `innerHeight`

**Métodos relevantes:**
- `window.open()`
- `window.close()`
- `window.print()`
- `window.alert()`
- `window.confirm()`
- `window.prompt()`

### 📝 Ejercicio — alert / confirm / prompt
Implementa una página con 3 botones: uno lanza un `alert`, otro un `confirm` y otro un `prompt`.

- **ALERT:** código JS directamente en el valor del parámetro `onclick` de la etiqueta HTML.
- **CONFIRM:** llamada a función en el valor del parámetro `onclick`; código de la función entre etiquetas `<script></script>` (en el fichero HTML).
- **PROMPT:** llamada a función en el valor del parámetro `onclick`; código de la función en fichero JS externo.

### 📝 Ejercicio — fecha y hora con alert
Desarrolla una página web en la que al pulsar un botón muestre en dos `alert`:
1. La fecha en formato `DD/MM/AAAA`
2. La hora en formato `HH:MM:SS`

### 13.3. `location`

- Representa la URL/URI de la página.

**Propiedades** (¿qué es cada una?):
- `href`, `hostname`, `protocol`, `pathname`, `search`, `hash` (`#`), …

**Métodos:**
- `reload()` — recargar el recurso actual.
- `assign(stringNuevaUrl)` — cargar un nuevo recurso.

### 📝 Ejercicio — confirm con redirección
Mejora el ejercicio anterior. El `confirm` pregunta si quiere continuar en la página o no. Si continúa, le lleva a una página que muestra un mensaje de bienvenida; si no, le lleva a una página con un mensaje de despedida y una imagen apropiada al mensaje.

### 📝 Ejercicio — prompt personalizado
Mejora el ejercicio anterior. El `prompt` pregunta el nombre del usuario y muestra un `alert` con un mensaje de bienvenida personalizado. El nombre del usuario se muestra en mayúsculas (sea cual sea la entrada).

### 13.4. `navigator`

- Contiene info referente al UA (user agent).

**Propiedades:**
- `cookieEnabled`
- `geolocation`
- `language`
- `userAgent`
- `virtualKeyboard`
- …

### 13.5. `screen`

- Representa a la pantalla del usuario.

**Propiedades:**
- `availHeight`
- `availWidth`
- `colorDepth`
- `isExtended`
- `orientation`
- …

### 13.6. `history`

- Contiene el historial de páginas.

**Métodos:**
- `back()` = botón navegador.
- `forward()` = botón navegador.
- `go(avance)`:
  - Si **+**, equivale a `forward`.
  - Si **-**, equivale a `back`.
  - Si **vacío**, equivale a `reload`.

### 13.7. `document`

- Representa al documento HTML.
- Da acceso a todos los elementos HTML.
- Se estructura según el DOM.

---

## 14. DOM — Document Object Model

### 14.1. Ubicación dentro del BOM

```
                 window
                   │
   ┌────────┬──────┼──────┬─────────┐
location  navigator  screen  history  document
                                         │
                                        DOM
```

### 14.2. ¿Qué es el DOM?

- **D**ocument **O**bject **M**odel.
- Estructura en árbol de nodos.
- Refleja la estructura de anidación de etiquetas HTML.

### 14.3. Árbol de nodos — ejemplo

```
                       html
                        │
            ┌───────────┴───────────┐
           head                    body
            │                       │
       ┌────┴────┐    ┌─────┬───────┼────────┬───────┐
      meta    title  header  nav  section footer
                                    │
                              ┌─────┼─────┐
                              ul    div   div
                              │
                         ┌────┼────┐
                         li   li   li
```

### 14.4. Tipos de nodos

- **Nodo raíz:** documento HTML (`document`).
- **Elemento:** elementos HTML (`header`, `nav`, `section`, `footer`, `div`, `form`, `p`, `ul`, `li`…).
- **Atributo:** atributos de elementos HTML (`name`, `type`, `src`…).
- **Texto:** texto de las etiquetas HTML (`innerHTML` vs `value`).

### 14.5. Acceso a nodos — métodos clásicos

**Acceso directo a los nodos:**

```js
getElementById('identificador')        // 1 elemento

getElementsByTagName('etiqueta')
getElementsByName('nombre')            // array de elementos
getElementsByClassName('clase')
```

> Estos métodos pueden invocarse sobre `document` o sobre un **nodo a partir del cual se realiza la búsqueda del elemento**.

**Recogida de info — variable para guardar elemento/s:**

```js
let unElemento = document.getElementById('id');
let unArray = document.getElementsByTagName('p');
```

```js
let unElemento = getElementById('section1').getElementById('id');
let unArray = getElementsByTagName('div')[0].getElementsByTagName('p');
```

**Recogida de info — ejemplo con `input`:**

```js
let apellido1 = document.getElementById('ap1').value;
if (apellido1 = null) {
    alert('Debe introducir un apellido');
    document.getElementById('ap1').focus();
}
// ¿QUÉ ERROR HAY EN ESTE CÓDIGO?
// → "apellido1 = null" es asignación, debería ser "apellido1 == null" (o ===)
```

> **Acceso a atributos:** notación de punto + nombre del atributo.

```js
let parrafos = document.getElementsByTagName('p');
let i;
for (i = 0; i < parrafos.length; i++) {
    let parrafoActual = parrafos[i];
    // tratamiento del párrafo
    …
}
```

### 14.6. Acceso a nodos — selectores CSS (`querySelector`)

**Acceso directo al primer nodo que cumple un selector CSS:**

```js
document.querySelector('#name')
document.querySelector('.titulo1')
document.querySelector('p.ejemplo')
```

**Acceso directo a todos los nodos que cumplen un selector CSS:**

```js
document.querySelectorAll('.titulo1')
document.querySelectorAll('input[type=text]')
```

**Recogida de info — ejemplos:**

```js
const parrafos = document.querySelectorAll('p.demo');
for (let i = 0; i < parrafos.length; i = i + 2) {
    parrafos[i].innerText = "OCULTO";
}
// ¿DIFERENCIAS?
//   innerHTML
//   innerText
//   textContent
```

```js
const laDemo = document.getElementById('divdemo');
const sumas = laDemo.querySelectorAll('.suma');
for (let i = 0; i < sumas.length; i++) {
    sumas[i].style.backgroundColor = "blue";
}
```

### 📝 Ejercicio — fecha y hora en párrafos
Recupera el ejercicio que mostraba la fecha y hora. Ahora se tiene que mostrar la información en dos párrafos `<p></p>` diferentes:
1. La fecha en formato `DD/MM/AAAA`
2. La hora en formato `HH:MM:SS`

### 📝 Ejercicio — fecha y hora en inputs
Y ahora se tiene que mostrar la información en dos campos `<input>`:
1. La fecha en formato `DD/MM/AAAA`
2. La hora en formato `HH:MM:SS`

### 📝 Ejercicio — juego de las capitales con DOM
Recupera el snippet del juego de las capitales. Modifica el código para interactuar con una página web:
- Un botón da inicio al juego.
- La pregunta aparece en un párrafo y el usuario tiene que responder en un campo input.
- El resultado de cada respuesta aparece al lado del input (correcto en verde, incorrecto en rojo).
- El resumen final del juego se muestra en un título `H1` (resultado final) + un párrafo (resto de información).

---

## 15. Eventos

### 15.1. ¿Qué es un evento?

- Acción que ocurre en el navegador (habitualmente: elemento, documento, ventana).
- El sistema informa del evento.
- El programador "recoge" el evento y lo trata.

**Ejemplos típicos:**
- Una página acaba de cargarse.
- Se cambia el contenido de un campo de formulario.
- Se hace clic en un botón.
- Se pone el foco en un campo de formulario.
- Se pasa el ratón por encima de un elemento.
- Se pulsa una tecla.
- Se termina de cargar una página HTML.
- Se envía un formulario.
- Se cambia el tamaño de la ventana.
- Se reproduce/pausa/finaliza un vídeo.
- …

### 15.2. Tipos de eventos

**Eventos de ratón:**
- `click`
- `dblclick`
- `contextmenu` — al clicar el botón derecho
- `mousemove` — al mover el ratón sobre un elemento
- `select` — cuando se selecciona algún texto
- `wheel` — cuando se gira la rueda del ratón
- `mousedown` — al clicar un botón del ratón sobre un elemento
- `mouseenter` — al poner el puntero sobre un elemento
- `mouseleave` — al mover el puntero fuera de un elemento
- `mouseover` — al poner el puntero sobre un elemento o cualquiera de sus hijos
- `mouseout` — al mover el puntero fuera de un elemento o cualquiera de sus hijos

**Eventos de teclado:**
- `keypress` — cuando se "teclea" una tecla (bajar + subir)
- `keydown` — cuando se presiona una tecla
- `keyup` — cuando se suelta una tecla

**Eventos de portapapeles:**
- `cut`
- `copy`
- `paste`

Ejemplo:

```js
event.clipboardData.setData('text/plain',
    selection.toString().toUpperCase());
```

**Eventos de foco:**
- `focus` — un elemento recibe el foco.
- `blur` — un elemento pierde el foco.

**Eventos de formulario:**
- `submit` — cuando se hace clic en el botón submit.
- `reset` — cuando se hace clic en el botón reset.
- `change` — cuando cambia el contenido de un elemento `<input>`, `<select>` o `<textarea>`.

**Eventos de vista/ventana:**
- `fullscreenchange` — cuando se entra en o sale del modo pantalla completa.
- `fullscreenerror` — cuando no se puede visualizar en modo pantalla completa.
- `resize` — cuando se redimensiona la ventana.
- `scroll` — cuando se hace scroll sobre el documento (u otro elemento que lo tenga).

**Eventos de impresión:**
- `beforeprint` — cuando se abre la ventana de impresión.
- `afterprint` — cuando se cierra la ventana de impresión.

**Eventos de red:**
- `online` — el navegador tiene acceso a la red.
- `offline` — el navegador no tiene acceso a la red.

**Eventos de recursos:**
- `error` — falla la carga de un recurso.
- `abort` — se aborta la carga de un recurso.
- `load` — un recurso ha completado su carga.

**Eventos de multimedia:**
- `canplay` — se puede empezar a reproducir pero puede haber pausas de carga.
- `canplaythrough` — se puede empezar a reproducir sin pausas de carga.
- `play` — la reproducción ha empezado.
- `ended` — la reproducción ha llegado a su punto final.
- `pause` — la reproducción se ha pausado.
- `playing` — la reproducción está lista para comenzar después de haber sido pausada (por el usuario o por falta de datos).
- `suspend` — la carga de datos se ha suspendido.
- `volumechange` — se ha modificado el volumen del recurso.
- `waiting` — la reproducción se ha parado por falta de datos.

### 15.3. Recoger un evento — 3 opciones

1. **Atributo** de etiqueta HTML.
2. **Propiedad** de elemento HTML.
3. **Controlador / manejador** de evento asociado a elemento HTML.

#### Opción 1 — Atributo de etiqueta HTML

**HTML:**

```html
<button id="btn1" onclick="cambiarFondo()">Clic y cambio color fondo</button>
<button id="btn1" onclick="alert('Me acabas de lanzar');">Lanzar un alert</button>
```

**JS:**

```js
function cambiarFondo() {
    var rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
    document.body.style.backgroundColor = rndCol;
}
```

#### Opción 2 — Propiedad de elemento HTML

**HTML:**

```html
<button id="btn2">Pasa ratón y cambio color fondo</button>
```

**JS:**

```js
const btn2 = document.getElementById('btn2');

function cambiarFondo2() {
    var rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
    document.body.style.backgroundColor = rndCol;
}

btn2.onmouseover = cambiarFondo2;
// cuidado: no es una llamada a función con (). Propiedad onxxxx
```

#### Opción 3 — Controlador de evento (`addEventListener`)

**HTML:**

```html
<button id="btn3">Doble clic y cambio color fondo</button>
```

**JS:**

```js
const btn3 = document.getElementById('btn3');

function cambiarFondo3() {
    var rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
    document.body.style.backgroundColor = rndCol;
}

btn3.addEventListener('dblclick', cambiarFondo3);
// cuidado: no es una llamada a función con ()
```

**Variante con función anónima:**

```html
<button id="btn3b">Doble clic y cambio tb color fondo</button>
```

```js
const btn3b = document.getElementById('btn3b');

btn3b.addEventListener('dblclick', function() { // la función se define como función anónima
    var rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
    document.body.style.backgroundColor = rndCol;
});
```

**Ventajas del manejador (`addEventListener`):**
- Separación HTML – CSS – JS.
- Poder usar el método `removeEventListener()`.
- 1 mismo evento → varios manejadores.

### 15.4. Controlador de evento CON PARÁMETRO

Mismo comportamiento para varios elementos:

```js
function random(number) {
    return Math.floor(Math.random() * number);
}

function bgChange() {
    var rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
    return rndCol;
}

// recoger TODOS los elementos div del HTML
var divs = document.querySelectorAll('div');

// el parámetro e de la función es el evento que se genera (igual que antes)
// e.target es el elemento sobre el que se ha generado el evento (igual que antes)
for (let i = 0; i < divs.length; i++) {
    divs[i].addEventListener('mouseover', function(e) {
        e.target.style.backgroundColor = bgChange();
    });
}
```

### 📝 Ejercicio — juego de las capitales completo
Crea una página web para jugar a adivinar capitales de países. Vamos a jugar con 10 países y capitales (las que tú quieras).

Al pulsar en el botón **"Iniciar juego"**, la página irá preguntando, sin repetir, por las capitales de los 10 países. Para cada país se le indicará al usuario si ha acertado o no (sin más datos).

Al finalizar el juego, hay que mostrarle al usuario una página con los resultados. En concreto hay que decirle:
1. El número de aciertos.
2. El número de fallos y las soluciones correctas.
3. Un mensaje final según este baremo:
   - **1–3 aciertos** → "Eres un looser ;-P"
   - **4–6 aciertos** → "Lo puedes hacer mejor…"
   - **7–8 aciertos** → "Estás cerca del 10…"
   - **9–10 aciertos** → "¡Eres una máquina!"

---

## 16. Debugger — Chrome DevTools

- **"Comenzar a depurar JS en Chrome con DevTools":**
  https://developers.google.com/web/tools/chrome-devtools/javascript/?hl=es
- **Ejemplo para ejecutar:**
  https://googlechrome.github.io/devtools-samples/debug-js/get-started

---

## 17. Snippets — Chrome DevTools

### 17.1. Cómo crear y ejecutar snippets

1. Abrir DevTools en el panel **Sources**.
2. Ir a la pestaña **Snippets** (panel lateral izquierdo, junto a *Page*/*Filesystem*).
3. Pulsar **+ New snippet** para crear uno nuevo.
4. Escribir el **código JS** en el editor central.
5. **Botón derecho sobre el snippet** → opciones (Run / Rename / Remove / Save as…) para ejecutarlo o gestionarlo.

### 17.2. Ejemplo de snippet sencillo

```js
let str1 = "un string";
let str2 = "otro sgring";
console.log(str1 + " " + str2);
console.log(str1.toUpperCase());
```

### 17.3. Ejemplo de snippet — función inmediatamente evaluada

```js
// funcion Inmediatamente Evaluada disponible en consola
// 1. Cargar página web
// 2. Ejecutar snippet (run)
// 3. Ejecutar función en consola

(function() {
    window.borrarSeleccionados = function(selector) {

        // Seleccionar eltos. por selector CSS
        let elementos = document.querySelectorAll(selector);

        // Recorrer eltos. para ocultarlos o borrarlos
        elementos.forEach(function(nodo) {
            nodo.style.display = "none";           // ocultar completamente
            // nodo.style.visibility = "hidden";   // ocultar dejando "su hueco"
            // nodo.parentNode.removeChild(nodo);  // borrar
        });
    }
})();
```
