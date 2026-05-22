# JAVASCRIPT – JS

**CFGS – 1 DAM**
Silvia Sanz — silvia_sanz@cuatrovientos.org

---

## Índice

**Parte 1/3**
- ¿Para qué vamos a usar JS?
- ¿Qué es JS?
- JS en páginas HTML
- Sintaxis general

**Parte 2/3**
- Constantes y variables
- Tipos de datos
- Operadores
- Sentencias de control
- Más objetos nativos JS

**Parte 3/3**
- Funciones
- Scope (ámbito)
- Objetos del navegador (BOM)
- DOM (Document Object Model)
- Eventos
- Debugger

---

## ¿Para qué vamos a usar JS?

- **Hacer páginas dinámicas**
  - Cambiar contenido dinámicamente
  - Validar información
- **Interactuar con el usuario**
  - Dar avisos
  - Pedir confirmación
  - Pedir información

---

## ¿Qué es JS?

- Lenguaje **interpretado** (no compilado)
- Se interpreta en **tiempo de ejecución**
- Basta un navegador para ejecutarlo
- **Distinto a Java**

---

## JS en páginas HTML

### Opción 1A: Dentro del código HTML en `<head>`

```html
<head>
    …
    <script type="text/javascript">
        alert('Hola 4vientos!!');
    </script>
</head>
```

### Opción 1B: Dentro del código HTML en `<body>`

```html
<body>
    …
    <script type="text/javascript">
        alert('Hola 4vientos!!');
    </script>
</body>
```

### Mantenemos objetivo: SEPARACIÓN DE CÓDIGO

(HTML — CSS — JS)

### Opción 2: Fichero externo

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

### `<head>` vs `<body>`

Diferencias a tener en cuenta:
- ¿Cuándo se descarga el script?
- ¿Cuándo se ejecuta el script?
- Si el script trabaja con el DOM, ¿tiene acceso a los elementos?

**Diagrama temporal (timeline):**

- **`<script>` dentro de `<head>`:** se interpreta el HTML → pausa en la interpretación → descarga del script → ejecución del script → se reanuda la interpretación del HTML.
- **`<script>` antes de `</body>`:** se interpreta el HTML completo primero → al final, descarga del script → ejecución del script.

Leyenda:
- 🟢 Interpretación de HTML
- ⬜ Pausa en la interpretación de HTML
- 🟣 Descarga de script
- 🟥 Ejecución de script

### Opción 2: Fichero externo con `async` / `defer`

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

### Tabla comparativa ASYNC vs DEFER

| | ORDEN | CARGA DOM (evento `DOMContentLoaded`) |
|---|---|---|
| **ASYNC** | No se espera a otros scripts. El que primero descarga, ejecuta primero. | El script puede ejecutarse mientras el documento HTML no se ha descargado por completo. |
| **DEFER** | Se respeta el orden del código HTML. | El script se ejecuta después de descargar el documento HTML, justo antes del evento `DOMContentLoaded`. |

### ¿Cuándo usar cada uno?

- **ASYNC:** scripts independientes del sitio/aplicación web (no trabajan con el DOM).
- **DEFER:** scripts que acceden al DOM. También cuando el orden de ejecución entre scripts es relevante.

**Info detallada:** https://www.freecodecamp.org/news/javascript-performance-async-defer/

### Resumen visual de las 4 opciones

- `<script>` dentro de `<head>`
- `<script>` antes de `</body>`
- `async`
- `defer`

---

## Sintaxis: normas & convenciones

- Las sentencias acaban con `;`
- **Case sensitive** (mayúsculas vs. minúsculas)
- Tabular/indentar el código
- 1 espacio entre variables y operadores
- Consistencia en el uso de comillas
- 1 sentencia, 1 línea
- Salto de línea después de operadores o comas
- Líneas de ±80 caracteres
- **Comentarios:**
  - 1 línea: `//esto es un comentario de 1 línea`
  - Varias líneas:
    ```js
    /*también puedo comentar
    varias líneas, así */
    ```

---

## Constantes y variables

### Constantes

```js
const PI = 3.1415;   // SÓLO 1 VEZ, EN LA DECLARACIÓN
```

### Variables

```js
let num1 = 3;        // inicialización
let num2 = num1 + 3;
let num3;
```

### Normas para nombres

- Nombres cortos y significativos
- Deben empezar por letra
- No se pueden usar operadores en el nombre
- No pueden contener espacios
- No pueden usarse palabras reservadas
- Evitar uso de letras como `ñ`, `-`, `$`, `&`, `%`, …
- **Variables:** escritas en `camelCase`
- **Constantes:** escritas en MAYÚSCULAS
- ¡Piensa en quien lo tenga que modificar!
- ¡Piensa en retocar tu código 8 meses después!

---

## Tipos de datos

- No hay que hacer declaración explícita
- Se "asignan" al dar valor a la variable
- Algunos objetos nativos:
  - Numéricos
  - Booleanos
  - Cadenas de caracteres (strings)
  - Arrays
  - …

### Tipos — Numéricos

Para almacenar enteros y decimales.

```js
let num1 = 16;
let num2 = 234.56;
```

### Tipos — Booleanos

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

### Tipos — Strings

Para almacenar cadenas de caracteres (caracteres sueltos, palabras, frases, textos…).

```js
let vocales = 'aAeEiIoOuU';
let letra = 'a';
```

Hay que mezclar comillas simples y dobles si la cadena contiene, por sí misma, comillas, **o** usar **escape characters**:

```js
let cadena = 'Según el autor: "Tararí tarará"';
let cadena = "Según el autor: \"Tararí tarará\"";
```

### Tipos — Arrays

Para almacenar colección/conjunto de variables (se pueden mezclar tipos).

```js
let semana = ['Lunes', 'Martes', 'Miércoles',
              'Jueves', 'Viernes', 'Sábado', 'Domingo'];
```

**Acceso:** por índice, desde `0` hasta `numElementos - 1`.

```js
semana[0]   // 'Lunes'
semana[3]   // 'Jueves'
semana[6]   // 'Domingo'
```

**Declaración como objeto JS (varias formas equivalentes):**

```js
let semana = new Array();
semana[0] = 'Lunes';
semana[1] = 'Martes';
// ...
```

```js
let semana = new Array('Lunes', 'Martes', …);
```

```js
let semana = ['Lunes', 'Martes', …];
```

---

## Operadores

| Operador | Operación | Ejemplo |
|---|---|---|
| `=` | Asignación | `x = 5;` |
| `++` / `--` | Incremento / Decremento | `z++;` vs `++z;` — `x = z++;` vs `x = ++z;` |
| `&&` | AND | `seguir = (x > 5) && (z < 10)` |
| `\|\|` | OR | `seguir = (cont < 8) \|\| parar` |
| `!` | NOT | `seguir = !parar` |
| `+`, `-`, `*`, `/`, `%` | Matemática | `num1 + num2` |
| `==`, `!=` | Igualdad / desigualdad | `==` y `!=` comparan valor |
| `===`, `!==` | Igualdad / desigualdad **estricta** | `===` y `!==` comparan valor y tipo |
| `<`, `>`, `<=`, `>=` | Relación | `contador <= total` |

---

## Sentencias de control

- `if` / `if-else`
- `switch`
- `for`
- `while`
- `do while`

### Sentencia IF / IF-ELSE

```js
if (condición) {
    sentencia1;
    sentencia2;
}
```

```js
if (condición) {
    sentencia1;
    sentencia2;
} else {
    sentencia3;
    sentencia4;
}
```

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

### Sentencia SWITCH

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

### Operador condicional ternario

Equivalente a `if-else`:

```js
if (edad >= 18) {
    login = true;
} else {
    login = false;
}

// equivalente:
login = (edad >= 18) ? true : false;
```

Uso dentro de una expresión:

```js
'La matrícula es de: ' + (esBecario ? '50€' : '75€');
```

Equivalente a `if-else if`:

```js
let check1 = false,
    check2 = false,
    access = check1 ? 'Denegado' : check2 ? 'Denegado' : 'Permitido';
// ¿Cuál es el valor de access?  → 'Permitido'
```

Equivalente a `if-else` con varias operaciones por rama:

```js
(edad > 18) ? (
    alert('OK, puedes pasar!'),
    location.assign('bienvenido.html')
) : (
    stop = true,
    alert('Eres menor de edad. Nos vemos otro día!')
);
```

### Sentencia FOR

```js
for (inicialización; condición; incremento) {
    sentencia1;
    sentencia2;
}

for (i = 0; i < 10; i++) {
    msg = 'Valor ' + i + 'º: ' + hobby[i];
    alert(msg);
}
```

### Sentencia WHILE

```js
while (condición) {
    sentencia1;
    sentencia2;
}
```

1. Se evalúa la condición.
2. Si la condición es:
   - **Verdadera**, se ejecutan las sentencias y se vuelve al paso 1.
   - **Falsa**, no se ejecutan las sentencias y se sale del bucle.

> **¡¡Indispensable!!** Alguna de las variables que forman parte de la condición tiene que cambiar su valor dentro del bucle.

### Sentencia DO WHILE

```js
do {
    sentencia1;
    sentencia2;
} while (condición);
```

1. Se ejecutan las sentencias 1 vez **siempre**.
2. Se evalúa la condición.
3. Si la condición es:
   - **Verdadera**, se ejecutan las sentencias y se vuelve al paso 2.
   - **Falsa**, no se ejecutan las sentencias y se sale del bucle.

> **¡¡Indispensable!!** Alguna de las variables que forman parte de la condición tiene que cambiar su valor dentro del bucle.

---

## Plantillas literales (template literals)

**String interpolation.**

### ¿Para qué sirven?

- Escribir cadenas y cadenas multilínea
- Incrustar expresiones JS
- Escribir cadenas con operador ternario

### ¿Cómo se usan?

- Inicio y cierre con comilla simple invertida (`` ` ``)
- Incrustar código JS así: `${código js}`

### Ejemplo 1

```js
cuotaFinal = `La cuota es de ${cuota * descuento}€`;
```

### Ejemplo 2 (multilínea)

```js
cuotaFinal = `La cuota es de ${cuota * descuento}€.

Deberá abonarse en un plazo de 15 días.

Gracias.`;
```

### Ejemplo 3 (con operador ternario)

```js
salida = `La matrícula es de: ${(esBecario ? `50€` : `75€`)}`;

salida = `La matrícula es de: ${(esBecario ? matOrd : matBeca)}`;

salida = `La matrícula es de: ${totalMat}.
${(totalMat > 30) ? 'Disponible pago en efectivo y tarjeta' : 'Pago solo en efectivo'}`;
```

---

## Métodos y funciones

- **Predefinidas:** métodos de objetos JS
  - Number
  - String
  - Array
- **Creadas por el desarrollador:** funciones
  - Funciones "normales"
  - Funciones anónimas y flecha

### Métodos String

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

Propiedad: `length` (propiedad del objeto String).
Operador `+` para concatenar objetos String.

> Pincha aquí para consultar los métodos en **MDN**.

### Métodos Array

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

Propiedad: `length` (propiedad del objeto Array).

> Pincha aquí para consultar los métodos en **MDN**.

### Métodos Number

Uso: `variable.metodo()`.

- `isNaN()`
- `isInteger()`
- `toFixed()`
- `toPrecision()`
- `toString()`

> Pincha aquí para consultar los métodos en **MDN**.

### Ejercicio

1. Repartir métodos
2. Buscar información de uso
3. Implementar un ejemplo

---

## Funciones

### Sintaxis

- Escritas en modo `camelCase`
- Se delimitan con `{ }`
- Llave de abrir en la misma línea de la función

### Ventajas

- Reutilización de código
- Mantenimiento más eficiente

### A tener en cuenta

- Pueden utilizar o no parámetros
- Pueden devolver 1 valor o ninguno
- Los **argumentos** en la llamada deben tener mismo número, tipo y orden que los **parámetros** en la definición
- Parámetros y argumentos pueden tener el mismo nombre o no

### Definición de función sin parámetros (con `return`)

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

### Definición de función con parámetros

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

### Funciones anónimas

Funciones como expresiones:

```js
let suma = function(a, b) {
    return a + b;
}
let b = 4;
alert(suma(5, b));
```

### Funciones flecha (arrow functions)

Funciones como expresiones:

```js
let suma = (a, b) => a + b;
let b = 4;
alert(suma(5, b));
```

---

## Más objetos nativos JS

### `Date`

**Declaración – instanciación:**

```js
let fecha = new Date();
```

**Algunos métodos:**

- `getMonth()` — **¡ojo!** los meses van de **0 (enero)** a **11 (diciembre)**
- `getFullYear()`
- `getDate()`
- `getDay()`
- `getHours()`
- …

### `Math`

- **No se puede editar.**
- **No se instancia.**

**Algunos métodos:**

```js
Math.random();   // genera un número aleatorio entre 0 y 1
Math.ceil(x);    // redondea x hacia arriba
Math.floor(x);   // redondea x hacia abajo
Math.abs(x);     // valor absoluto de x
Math.min(x, y);  // devuelve valor mínimo
```

### Ejercicio

Programa en un snippet el juego de las capitales (enunciado en Aula0).

---

## BOM — Browser Object Model

Estructura jerárquica:

```
                 window
                   │
   ┌────────┬──────┼──────┬─────────┐
location  navigator  screen  history  document
```

### Objetos del navegador — `window`

- Es la ventana del navegador.
- Objeto por defecto (no es necesario referenciarlo).
- **Propiedades relevantes:**
  - `outerWidth`
  - `outerHeight`
  - `innerWidth`
  - `innerHeight`
- **Métodos relevantes:**
  - `window.open()`
  - `window.close()`
  - `window.print()`
  - `window.alert()`
  - `window.confirm()`
  - `window.prompt()`

### Ejercicio

Implementa una página con 3 botones: uno lanza un `alert`, otro un `confirm` y otro un `prompt`.

- **ALERT:** código JS directamente en el valor del parámetro `onclick` de la etiqueta HTML.
- **CONFIRM:** llamada a función en el valor del parámetro `onclick`; código de la función entre etiquetas `<script></script>` (en el fichero HTML).
- **PROMPT:** llamada a función en el valor del parámetro `onclick`; código de la función en fichero JS externo.

### Ejercicio

Desarrolla una página web en la que al pulsar un botón muestre en dos `alert`:

1. La fecha en formato `DD/MM/AAAA`
2. La hora en formato `HH:MM:SS`

### Objetos del navegador — `location`

- Representa la URL/URI de la página.
- **Propiedades** (¿qué es cada una?):
  - `href`, `hostname`, `protocol`, `pathname`, `search`, `hash` (`#`), …
- **Métodos:**
  - `reload()` — recargar el recurso actual
  - `assign(stringNuevaUrl)` — cargar un nuevo recurso

### Ejercicio

Mejora el ejercicio anterior. El `confirm` pregunta si quiere continuar en la página o no. Si continúa, le lleva a una página que muestra un mensaje de bienvenida; si no, le lleva a una página con un mensaje de despedida y una imagen apropiada al mensaje.

### Ejercicio

Mejora el ejercicio anterior. El `prompt` pregunta el nombre del usuario y muestra un `alert` con un mensaje de bienvenida personalizado. El nombre del usuario se muestra en mayúsculas (sea cual sea la entrada).

### Objetos del navegador — `navigator`

- Contiene info referente al UA (user agent).
- **Propiedades:**
  - `cookieEnabled`
  - `geolocation`
  - `language`
  - `userAgent`
  - `virtualKeyboard`
  - …

### Objetos del navegador — `screen`

- Representa a la pantalla del usuario.
- **Propiedades:**
  - `availHeight`
  - `availWidth`
  - `colorDepth`
  - `isExtended`
  - `orientation`
  - …

### Objetos del navegador — `history`

- Contiene el historial de páginas.
- **Métodos:**
  - `back()` = botón navegador
  - `forward()` = botón navegador
  - `go(avance)`:
    - Si **+**, `forward`
    - Si **-**, `back`
    - Si **vacío**, `reload`

### Objetos del navegador — `document`

- Representa al documento HTML.
- Da acceso a todos los elementos HTML.
- Se estructura según el DOM.

---

## DOM — Document Object Model

```
                 window
                   │
   ┌────────┬──────┼──────┬─────────┐
location  navigator  screen  history  document
                                         │
                                        DOM
```

- **D**ocument **O**bject **M**odel
- Estructura en árbol de nodos
- Estructura de anidación de etiquetas HTML

### DOM — árbol de nodos

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

### DOM — tipos de nodos

- **Nodo raíz:** documento HTML (`document`)
- **Elemento:** elementos HTML (`header`, `nav`, `section`, `footer`, `div`, `form`, `p`, `ul`, `li`…)
- **Atributo:** atributos de elementos HTML (`name`, `type`, `src`…)
- **Texto:** texto de las etiquetas HTML (`innerHTML` vs `value`)

### DOM — acceso a nodos

**Acceso directo a los nodos:**

```js
getElementById('identificador')        // 1 elemento

getElementsByTagName('etiqueta')
getElementsByName('nombre')            // array de elementos
getElementsByClassName('clase')
```

> Estos métodos pueden invocarse sobre `document` o sobre un **nodo a partir del cual se realiza la búsqueda del elemento**.

**Recogida de info:**

```js
let unElemento = document.getElementById('id');
let unArray = document.getElementsByTagName('p');
// Variable para guardar elemento/s
```

```js
let unElemento = getElementById('section1').getElementById('id');
let unArray = getElementsByTagName('div')[0].getElementsByTagName('p');
```

**Recogida de info — ejemplos (elemento `input`):**

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

**Acceso directo al primer nodo que… (argumento = selector CSS):**

```js
document.querySelector('#name')
document.querySelector('.titulo1')
document.querySelector('p.ejemplo')
```

**Acceso directo a todos los nodos que… (argumento = selector CSS):**

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

### Ejercicio

Recupera el ejercicio que mostraba la fecha y hora. Ahora se tiene que mostrar la información en dos párrafos `<p></p>` diferentes:

1. La fecha en formato `DD/MM/AAAA`
2. La hora en formato `HH:MM:SS`

### Ejercicio

Y ahora se tiene que mostrar la información en dos campos `<input>`:

1. La fecha en formato `DD/MM/AAAA`
2. La hora en formato `HH:MM:SS`

### Ejercicio

Recupera el snippet del juego de las capitales. Modifica el código para interactuar con una página web:

- Un botón da inicio al juego.
- La pregunta aparece en un párrafo y el usuario tiene que responder en un campo input.
- El resultado de cada respuesta aparece al lado del input (correcto en verde, incorrecto en rojo).
- El resumen final del juego se muestra en un título `H1` (resultado final) + un párrafo (resto de información).

---

## Eventos

- Acción que ocurre en el navegador (habitualmente: elemento, documento, ventana).
- El sistema informa del evento.
- El programador "recoge" el evento y lo trata.

### Ejemplos

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

### Eventos de ratón

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

### Eventos de teclado

- `keypress` — cuando se "teclea" una tecla (bajar + subir)
- `keydown` — cuando se presiona una tecla
- `keyup` — cuando se suelta una tecla

### Eventos de portapapeles

- `cut`
- `copy`
- `paste`

Ejemplo:

```js
event.clipboardData.setData('text/plain',
    selection.toString().toUpperCase());
```

(–pincha para ver ejemplo–)

### Eventos de foco

- `focus` — un elemento recibe el foco
- `blur` — un elemento pierde el foco

### Eventos de formulario

- `submit` — cuando se hace clic en el botón submit
- `reset` — cuando se hace clic en el botón reset
- `change` — cuando cambia el contenido de un elemento `<input>`, `<select>` o `<textarea>`

### Eventos de vista/ventana

- `fullscreenchange` — cuando se entra en o sale del modo pantalla completa
- `fullscreenerror` — cuando no se puede visualizar en modo pantalla completa
- `resize` — cuando se redimensiona la ventana
- `scroll` — cuando se hace scroll sobre el documento (u otro elemento que lo tenga)

### Eventos de impresión

- `beforeprint` — cuando se abre la ventana de impresión
- `afterprint` — cuando se cierra la ventana de impresión

### Eventos de red

- `online` — el navegador tiene acceso a la red
- `offline` — el navegador no tiene acceso a la red

### Eventos de recursos

- `error` — falla la carga de un recurso
- `abort` — se aborta la carga de un recurso
- `load` — un recurso ha completado su carga

### Eventos de multimedia

- `canplay` — se puede empezar a reproducir pero puede haber pausas de carga
- `canplaythrough` — se puede empezar a reproducir sin pausas de carga
- `play` — la reproducción ha empezado
- `ended` — la reproducción ha llegado a su punto final
- `pause` — la reproducción se ha pausado
- `playing` — la reproducción está lista para comenzar después de haber sido pausada (por el usuario o por falta de datos)
- `suspend` — la carga de datos se ha suspendido
- `volumechange` — se ha modificado el volumen del recurso
- `waiting` — la reproducción se ha parado por falta de datos

---

## Recoger un evento

**3 opciones:**

1. Atributo de etiqueta HTML
2. Propiedad de elemento HTML
3. Controlador / manejador de evento asociado a elemento HTML

### Opción 1: ATRIBUTO de etiqueta HTML

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

### Opción 2: PROPIEDAD de elemento HTML

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

### Opción 3: CONTROLADOR de evento de elemento HTML

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

### Opción 3 (variante): controlador con función anónima

**HTML:**

```html
<button id="btn3b">Doble clic y cambio tb color fondo</button>
```

**JS:**

```js
const btn3b = document.getElementById('btn3b');

btn3b.addEventListener('dblclick', function() { // la función se define como función anónima
    var rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
    document.body.style.backgroundColor = rndCol;
});
```

### Ventajas del manejador (`addEventListener`)

- Separación HTML – CSS – JS
- Poder usar el método `removeEventListener()`
- 1 mismo evento → varios manejadores

### Controlador de evento CON PARÁMETRO (mismo comportamiento para varios elementos)

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

### Ejercicio

Crea una página web para jugar a adivinar capitales de países. Vamos a jugar con 10 países y capitales (las que tú quieras).

Al pulsar en el botón **"Iniciar juego"**, la página irá preguntando, sin repetir, por las capitales de los 10 países. Para cada país se le indicará al usuario si ha acertado o no (sin más datos).

Al finalizar el juego, hay que mostrarle al usuario una página con los resultados. En concreto hay que decirle:

1. El número de aciertos.
2. El número de fallos y las soluciones correctas.
3. Un mensaje final según este baremo:
   - 1–3 aciertos → "Eres un looser ;-P"
   - 4–6 aciertos → "Lo puedes hacer mejor…"
   - 7–8 aciertos → "Estás cerca del 10…"
   - 9–10 aciertos → "¡Eres una máquina!"

---

## Debugger – Chrome DevTools

- **"Comenzar a depurar JS en Chrome con DevTools":**
  https://developers.google.com/web/tools/chrome-devtools/javascript/?hl=es
- **Ejemplo para ejecutar:**
  https://googlechrome.github.io/devtools-samples/debug-js/get-started

---

## Snippets – Chrome DevTools

### Cómo crear y ejecutar snippets

1. Abrir DevTools en el panel **Sources**.
2. Ir a la pestaña **Snippets** (panel lateral izquierdo, junto a *Page*/*Filesystem*).
3. Pulsar **+ New snippet** para crear uno nuevo.
4. Escribir el **código JS** en el editor central.
5. **Botón derecho sobre el snippet** → opciones (Run / Rename / Remove / Save as…) para ejecutarlo o gestionarlo.

### Ejemplo de snippet sencillo

```js
let str1 = "un string";
let str2 = "otro sgring";
console.log(str1 + " " + str2);
console.log(str1.toUpperCase());
```

### Ejemplo de snippet: función inmediatamente evaluada

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
