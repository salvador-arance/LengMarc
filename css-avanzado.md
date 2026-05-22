# CSS Avanzado — Apuntes completos

> Asume que ya conoces selectores básicos, el box model, colores, fuentes y propiedades comunes. Aquí cubrimos todo lo que hace falta para escribir CSS moderno, mantenible y profesional en 2026.

---

## 1. Selectores avanzados

### 1.1. Selectores de relación

```css
A B    /* descendente: B dentro de A (a cualquier nivel) */
A > B  /* hijo directo */
A + B  /* hermano adyacente inmediato */
A ~ B  /* todos los hermanos siguientes */
```

### 1.2. Selectores de atributo

```css
[disabled]              /* tiene el atributo */
[type="email"]          /* valor exacto */
[class~="btn"]          /* contiene la palabra (separada por espacios) */
[lang|="es"]            /* empieza por "es" o "es-" */
[href^="https://"]      /* empieza por... */
[href$=".pdf"]          /* termina por... */
[href*="github"]        /* contiene... */
[type="text" i]         /* case-insensitive */
```

### 1.3. Pseudoclases estructurales

```css
:first-child            /* primer hijo del padre */
:last-child
:only-child
:nth-child(2n+1)        /* impares */
:nth-child(odd)
:nth-child(3n)          /* cada 3 */
:nth-last-child(2)

:first-of-type          /* primer hijo DE SU TIPO */
:nth-of-type(2)
:last-of-type
:only-of-type

:empty                  /* sin hijos ni texto */
:not(.activo)           /* negación */
:is(h1, h2, h3)         /* agrupa, reduce especificidad */
:where(h1, h2, h3)      /* como :is pero con especificidad 0 */
:has(> img)             /* selector "padre": tiene un hijo img */
```

**`:has()`** es revolucionario. Por fin tenemos selector de padre:

```css
/* Tarjetas que contienen una imagen reciben padding extra */
.card:has(img) { padding-top: 0; }

/* Form que contiene un input inválido */
form:has(:invalid) button { opacity: 0.5; }

/* Sin necesidad de JS para muchos casos */
label:has(input:checked) { background: lightblue; }
```

### 1.4. Pseudoclases de estado

```css
:hover, :focus, :active, :focus-visible, :focus-within
:checked, :disabled, :enabled, :required, :optional
:valid, :invalid, :user-invalid
:in-range, :out-of-range
:placeholder-shown
:read-only, :read-write
:default, :indeterminate
:target              /* elemento al que apunta el hash de la URL */
:lang(es)
:dir(rtl)
```

**`:focus-visible`** es clave para accesibilidad: solo aplica cuando el foco viene del teclado, no del ratón.

```css
button:focus { outline: none; }           /* ❌ malo, rompe a11y */
button:focus-visible { outline: 2px solid blue; }  /* ✅ correcto */
```

### 1.5. Pseudoelementos

```css
::before, ::after
::first-line, ::first-letter
::selection              /* texto seleccionado */
::placeholder            /* texto del placeholder */
::marker                 /* viñeta o número de lista */
::backdrop               /* fondo de <dialog> o fullscreen */
::file-selector-button   /* botón de input file */
::details-content        /* contenido de <details> */
```

### 1.6. Especificidad

Se calcula como `(inline, IDs, clases/atributos/pseudoclases, elementos/pseudoelementos)`:

| Selector | Especificidad |
|---|---|
| `*` | 0,0,0,0 |
| `div` | 0,0,0,1 |
| `.clase` | 0,0,1,0 |
| `#id` | 0,1,0,0 |
| `style=""` | 1,0,0,0 |
| `!important` | gana sobre todo (excepto otro `!important` más específico) |

`:is()` toma la especificidad **mayor** de su lista. `:where()` siempre vale 0. `:not(X)` toma la de `X`.

---

## 2. Variables CSS (Custom Properties)

```css
:root {
  --primary: #0066ff;
  --space: 1rem;
  --radius: 8px;
  --shadow: 0 2px 8px rgb(0 0 0 / 0.1);
}

.btn {
  background: var(--primary);
  padding: var(--space);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

/* Fallback si no existe */
.btn { color: var(--text-color, black); }

/* Scope local */
.card {
  --space: 2rem;
  padding: var(--space);
}
```

**Trucos:**

```css
/* Cambio dinámico con JS */
document.documentElement.style.setProperty('--primary', '#f00');

/* Modo oscuro con un solo toggle */
[data-theme="dark"] {
  --bg: #111;
  --text: #eee;
}

/* Encadenar variables */
:root {
  --hue: 220;
  --primary: hsl(var(--hue) 80% 50%);
  --primary-light: hsl(var(--hue) 80% 70%);
}
```

### 2.1. `@property` — variables tipadas

```css
@property --gradient-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

.box {
  background: linear-gradient(var(--gradient-angle), red, blue);
  transition: --gradient-angle 1s;
}
.box:hover { --gradient-angle: 360deg; }
```

Permite **animar variables**, validar tipos y dar valores iniciales.

---

## 3. Layout moderno

### 3.1. Flexbox

```css
.container {
  display: flex;
  flex-direction: row | row-reverse | column | column-reverse;
  flex-wrap: nowrap | wrap | wrap-reverse;
  justify-content: flex-start | center | space-between | space-around | space-evenly;
  align-items: stretch | flex-start | center | flex-end | baseline;
  align-content: stretch | center | space-between;  /* solo con wrap */
  gap: 1rem;
}

.item {
  flex: 1 1 200px;     /* grow shrink basis */
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 200px;
  align-self: center;  /* sobreescribe align-items para este item */
  order: -1;           /* cambia el orden visual */
}
```

**Atajos útiles:**
- `flex: 1` → `1 1 0` (todos iguales).
- `flex: auto` → `1 1 auto` (proporcionales al contenido).
- `flex: none` → `0 0 auto` (rígido).

### 3.2. Grid

```css
.grid {
  display: grid;
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
  /* o por separado: row-gap y column-gap */
}

/* Repetición y unidades flexibles */
.grid {
  grid-template-columns: repeat(3, 1fr);
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));   /* responsive sin media queries */
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));  /* deja huecos vacíos */
}
```

**Posicionamiento explícito:**

```css
.item {
  grid-column: 1 / 3;         /* desde la línea 1 a la 3 */
  grid-column: 1 / span 2;    /* desde la 1, ocupando 2 */
  grid-row: 2 / -1;           /* fila 2 hasta la última */
}
```

**Áreas con nombre:**

```css
.layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  min-height: 100dvh;
}
.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
```

**Subgrid** (heredar la grid del padre):

```css
.parent { display: grid; grid-template-columns: repeat(3, 1fr); }
.child  { display: grid; grid-template-columns: subgrid; grid-column: span 3; }
```

### 3.3. `place-*` (atajos para Flex y Grid)

```css
.container {
  place-items: center;        /* align-items + justify-items */
  place-content: center;      /* align-content + justify-content */
  place-self: center;
}
```

### 3.4. Container queries — responsividad por contenedor

Hasta hace poco solo podíamos reaccionar al **viewport**. Ahora podemos reaccionar al **tamaño del contenedor padre**:

```css
.card-list {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card { display: flex; }
}

/* Unidades relativas al contenedor */
.title { font-size: 5cqw; }  /* 5% del ancho del contenedor */
```

Unidades disponibles: `cqw`, `cqh`, `cqi`, `cqb`, `cqmin`, `cqmax`.

---

## 4. Unidades modernas

| Unidad | Significado |
|---|---|
| `rem` | Tamaño de fuente del `<html>` (usa esto por defecto) |
| `em` | Tamaño de fuente del padre |
| `%` | Porcentaje del padre |
| `vw` / `vh` | 1% del viewport (problema con barra de móvil) |
| `svw`/`svh` | Small viewport (sin barras) |
| `lvw`/`lvh` | Large viewport (con barras) |
| `dvw`/`dvh` | Dynamic viewport (ajusta en tiempo real) |
| `vmin` / `vmax` | El menor / mayor entre vw y vh |
| `ch` | Ancho del carácter "0" |
| `ex` | Altura de la "x" |
| `cqw`/`cqh` | 1% del contenedor (container queries) |

### 4.1. Funciones matemáticas

```css
.box {
  width: min(90%, 1200px);              /* nunca mayor que 1200px */
  width: max(300px, 50%);               /* nunca menor que 300px */
  width: clamp(300px, 50%, 1200px);     /* fluido entre límites */
  font-size: clamp(1rem, 2vw + 1rem, 2rem);   /* tipografía fluida */
  padding: calc(1rem + 2vw);
}
```

`clamp()` es especialmente útil para tipografía fluida sin necesidad de media queries.

---

## 5. Colores modernos

```css
/* Sintaxis moderna (separación por espacios, alpha con /) */
color: rgb(255 0 0 / 0.5);
color: hsl(220 80% 50% / 0.8);

/* Nuevos espacios de color (gamut amplio) */
color: oklch(70% 0.2 240);          /* perceptualmente uniforme */
color: oklab(60% 0.1 -0.1);
color: color(display-p3 1 0.5 0);

/* Mezclado de colores */
background: color-mix(in oklch, blue 60%, white);
background: color-mix(in srgb, var(--primary), black 20%);

/* Color relativo */
.btn:hover { background: oklch(from var(--primary) calc(l - 0.1) c h); }
```

`oklch` es el espacio recomendado actualmente: cambios perceptuales uniformes, mejor que HSL para crear paletas.

---

## 6. Transformaciones, transiciones y animaciones

### 6.1. Transform

```css
.box {
  transform: translate(10px, 20px) rotate(45deg) scale(1.2) skew(10deg);
  /* o por separado (CSS moderno): */
  translate: 10px 20px;
  rotate: 45deg;
  scale: 1.2;
}
```

**3D:**

```css
.scene { perspective: 1000px; }
.card {
  transform-style: preserve-3d;
  transform: rotateY(45deg) translateZ(50px);
}
.cara-trasera { backface-visibility: hidden; transform: rotateY(180deg); }
```

### 6.2. Transitions

```css
.btn {
  transition: background 0.3s ease, transform 0.2s;
  /* propiedad | duración | timing | delay */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.1s;
}
```

Timing functions: `linear`, `ease`, `ease-in`, `ease-out`, `ease-in-out`, `steps(N)`, `cubic-bezier(...)`.

### 6.3. Keyframes

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes spin {
  0%   { transform: rotate(0deg); }
  50%  { transform: rotate(180deg); }
  100% { transform: rotate(360deg); }
}

.elemento {
  animation: fadeIn 0.5s ease-out forwards;
  /* nombre | duración | timing | delay | iteraciones | dirección | fill-mode | play-state */
  animation: spin 2s linear infinite alternate;
}
```

**Propiedades de animación:**
- `animation-fill-mode: forwards | backwards | both | none`
- `animation-direction: normal | reverse | alternate | alternate-reverse`
- `animation-iteration-count: N | infinite`
- `animation-play-state: running | paused`

### 6.4. Animaciones modernas

**Scroll-driven animations** — animar según el scroll sin JS:

```css
@keyframes reveal {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.elemento {
  animation: reveal linear;
  animation-timeline: view();
  animation-range: entry 0% cover 30%;
}
```

**View Transitions API** — transiciones suaves entre estados o páginas:

```css
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 0.5s;
}
```

```js
document.startViewTransition(() => {
  // cambia el DOM
});
```

### 6.5. Respeta `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 7. Pseudo-elementos creativos

```css
/* Comillas tipográficas automáticas */
blockquote::before { content: "« "; }
blockquote::after  { content: " »"; }

/* Iconos sin etiquetas extra */
.externa::after {
  content: " ↗";
  color: gray;
}

/* Decoración pura */
.titulo::after {
  content: "";
  display: block;
  width: 50px;
  height: 3px;
  background: var(--primary);
  margin-top: 0.5rem;
}

/* Contadores */
ol { counter-reset: item; }
ol li::marker { content: counter(item) ". "; }
ol li { counter-increment: item; }
```

---

## 8. Filtros, blends y efectos visuales

### 8.1. Filtros

```css
.img {
  filter: blur(5px) brightness(1.2) contrast(1.1) saturate(2) hue-rotate(90deg) grayscale(1) sepia(0.5);
  filter: drop-shadow(0 4px 6px rgb(0 0 0 / 0.3));   /* respeta transparencia, a diferencia de box-shadow */
  filter: invert(1);
}
```

### 8.2. Backdrop-filter (efectos glassmorphism)

```css
.glass {
  background: rgb(255 255 255 / 0.2);
  backdrop-filter: blur(10px) saturate(180%);
  border: 1px solid rgb(255 255 255 / 0.3);
}
```

### 8.3. Blend modes

```css
.overlay {
  mix-blend-mode: multiply | screen | overlay | difference | ...;
}

.bg {
  background-blend-mode: multiply;
  background: url(textura.jpg), linear-gradient(red, blue);
}
```

### 8.4. Máscaras y clip-path

```css
.recortado {
  clip-path: circle(50%);
  clip-path: polygon(0 0, 100% 0, 100% 75%, 0 100%);
  clip-path: inset(10px 20px round 10px);
}

.mask {
  mask-image: linear-gradient(black, transparent);
  mask-image: url(mascara.svg);
}
```

---

## 9. Gradientes avanzados

```css
/* Lineal */
background: linear-gradient(45deg, red, blue);
background: linear-gradient(to right, red 0%, blue 50%, green 100%);

/* Radial */
background: radial-gradient(circle at top right, red, blue);
background: radial-gradient(ellipse closest-side, red, transparent);

/* Cónico (en torno a un punto) */
background: conic-gradient(red, yellow, green, blue, red);
background: conic-gradient(from 90deg at 50% 50%, red, blue);

/* Repetidos (patrones) */
background: repeating-linear-gradient(45deg, #eee 0 10px, #fff 10px 20px);

/* Múltiples gradientes */
background:
  linear-gradient(rgb(0 0 0 / 0.5), rgb(0 0 0 / 0.5)),
  url(foto.jpg);
```

---

## 10. Posicionamiento

```css
position: static | relative | absolute | fixed | sticky;

.sticky-header {
  position: sticky;
  top: 0;
  z-index: 10;
}
```

**`inset` (atajo moderno):**

```css
.modal {
  position: fixed;
  inset: 0;          /* top: 0; right: 0; bottom: 0; left: 0 */
  inset: 10px 20px;  /* top/bottom y left/right */
}
```

### 10.1. Anchor positioning (nuevo)

Permite posicionar elementos respecto a otros sin JS:

```css
.tooltip {
  position: absolute;
  position-anchor: --boton;
  top: anchor(bottom);
  left: anchor(center);
}

.boton { anchor-name: --boton; }
```

---

## 11. Tipografía avanzada

```css
body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  font-feature-settings: "liga" 1, "kern" 1, "ss01" 1;
  font-variant-numeric: tabular-nums;
  font-variation-settings: "wght" 450, "wdth" 100;  /* variable fonts */
  font-optical-sizing: auto;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  line-height: 1.5;
  letter-spacing: -0.01em;
  text-wrap: balance | pretty | nowrap;   /* balance: equilibra líneas en titulares */
  hyphens: auto;
  word-break: break-word;
  overflow-wrap: anywhere;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;     /* clave para performance */
}
```

`text-wrap: balance` para titulares y `text-wrap: pretty` para párrafos mejoran muchísimo la legibilidad.

---

## 12. Media queries modernas

```css
@media (min-width: 768px) { ... }
@media (max-width: 767px) { ... }

/* Sintaxis de rango (moderna) */
@media (768px <= width <= 1200px) { ... }

/* Lógica */
@media (min-width: 768px) and (orientation: landscape) { ... }
@media (max-width: 600px), (max-height: 400px) { ... }
@media not all and (hover: hover) { ... }

/* Preferencias del usuario */
@media (prefers-color-scheme: dark) { ... }
@media (prefers-reduced-motion: reduce) { ... }
@media (prefers-contrast: more) { ... }
@media (prefers-reduced-transparency: reduce) { ... }

/* Capacidades del dispositivo */
@media (hover: hover) and (pointer: fine) { ... }   /* ratón */
@media (hover: none) and (pointer: coarse) { ... }  /* móvil táctil */
@media (resolution: 2dppx) { ... }                  /* retina */
@media (display-mode: standalone) { ... }           /* PWA instalada */
```

---

## 13. Modo oscuro

```css
:root {
  --bg: white;
  --text: black;
  color-scheme: light dark;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #111;
    --text: #eee;
  }
}

/* O con toggle manual */
[data-theme="dark"] {
  --bg: #111;
  --text: #eee;
}

body { background: var(--bg); color: var(--text); }
```

`color-scheme: light dark` permite al navegador adaptar scrollbars, inputs y otros elementos nativos.

---

## 14. Organización y metodologías

### 14.1. BEM (Block Element Modifier)

```css
.card { }                     /* bloque */
.card__title { }              /* elemento */
.card__title--big { }         /* modificador */
.card--featured { }
```

### 14.2. Cascade Layers — control de la cascada

```css
@layer reset, base, components, utilities;

@layer reset { * { margin: 0; padding: 0; box-sizing: border-box; } }
@layer base { body { font-family: system-ui; } }
@layer components { .btn { ... } }
@layer utilities { .text-center { text-align: center; } }
```

Las capas posteriores ganan sobre las anteriores, **sin importar la especificidad**. Resuelve definitivamente los conflictos de CSS.

### 14.3. Nesting nativo

```css
.card {
  padding: 1rem;

  & .title {
    font-size: 1.5rem;
  }

  &:hover {
    background: #f5f5f5;
  }

  @media (min-width: 768px) {
    padding: 2rem;
  }
}
```

### 14.4. `@scope` — limitar el alcance

```css
@scope (.card) to (.card-footer) {
  p { color: gray; }
}
```

---

## 15. Lógica condicional CSS

```css
/* Soporte de propiedades */
@supports (display: grid) {
  .layout { display: grid; }
}

@supports not (backdrop-filter: blur(10px)) {
  .glass { background: rgb(255 255 255 / 0.9); }
}

/* Importar condicional */
@import "print.css" print;
@import "mobile.css" (max-width: 600px);
```

---

## 16. Scroll y snap

```css
html { scroll-behavior: smooth; }

.contenedor {
  scroll-snap-type: x mandatory;
  overflow-x: auto;
  display: flex;
}
.slide {
  scroll-snap-align: center;
  scroll-snap-stop: always;
}

/* Sticky scroll padding (evita que un header tape el destino) */
html { scroll-padding-top: 80px; }
```

---

## 17. Aspect ratio

```css
.video {
  aspect-ratio: 16 / 9;
  width: 100%;
}

.cuadrado { aspect-ratio: 1; }
```

Adiós al truco del `padding-top: 56.25%`.

---

## 18. Logical properties

CSS lógico se adapta a la dirección del idioma (LTR/RTL) automáticamente:

```css
/* Físico (antiguo) */
margin-left: 1rem;
padding-top: 2rem;
border-right: 1px solid;

/* Lógico (moderno) */
margin-inline-start: 1rem;
padding-block-start: 2rem;
border-inline-end: 1px solid;

/* Atajos */
margin-inline: 1rem 2rem;   /* start end */
padding-block: 1rem;
inset-block-start: 0;
```

---

## 19. Performance

### Reglas básicas

1. **Anima solo `transform` y `opacity`** (las únicas propiedades aceleradas por GPU sin reflow).
2. **`will-change`** úsalo con moderación, solo en elementos que vayan a animarse pronto.
3. **`contain`** aísla elementos para que el navegador no recalcule todo el árbol:
   ```css
   .card { contain: layout style paint; }
   ```
4. **`content-visibility: auto`** difiere el renderizado de secciones fuera del viewport:
   ```css
   article { content-visibility: auto; contain-intrinsic-size: 0 500px; }
   ```

---

## 20. Resets y bases recomendadas

```css
*, *::before, *::after { box-sizing: border-box; }

* { margin: 0; }

html { -webkit-text-size-adjust: 100%; }

body {
  min-height: 100dvh;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select { font: inherit; }

p, h1, h2, h3, h4, h5, h6 { overflow-wrap: break-word; }

h1, h2, h3 { text-wrap: balance; line-height: 1.1; }

p { text-wrap: pretty; }

:root { color-scheme: light dark; }
```

---

## 21. Buenas prácticas finales

- **Mobile-first**: empieza con estilos para móvil, añade `min-width` para pantallas mayores.
- **No abuses de `!important`**. Si lo necesitas, replantéate la cascada (usa `@layer`).
- **Variables CSS** para colores, espaciados, radios, sombras y tipografías.
- **Especificidad baja** siempre que puedas: usa clases, no IDs ni selectores anidados profundos.
- **Comprueba el contraste** (mínimo 4.5:1).
- **Test con teclado** y `prefers-reduced-motion`.
- **No reinventes la rueda**: aprovecha `:has()`, `@container`, `subgrid`, etc. antes que recurrir a JS.
- **Comenta el porqué**, no el qué.
- **Usa una metodología** (BEM, capas, utilities…) y sé consistente.
