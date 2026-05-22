# CSS con Bulma Avanzado — Apuntes completos

> Bulma es un framework CSS moderno basado en Flexbox (y desde la v1, también en CSS Grid y variables CSS nativas). No incluye JavaScript: es **solo CSS**. Estos apuntes cubren desde su filosofía hasta su personalización avanzada y los componentes más complejos.

---

## 1. Filosofía y diferencias clave

- **Solo CSS**: Bulma no obliga a usar JS. Eres tú quien añade los `is-active`, `is-hidden`, etc.
- **Mobile-first**: todos los estilos parten de móvil; los breakpoints añaden estilos para pantallas mayores.
- **Modular**: puedes importar solo lo que uses.
- **Modificadores**: clases como `is-*` (estado) y `has-*` (contenido) que se combinan con elementos base.
- **Desde Bulma v1**: usa variables CSS nativas, soporta dark mode integrado y abandona Sass como única vía de personalización.

### Convenciones de nomenclatura

| Prefijo | Función | Ejemplo |
|---|---|---|
| `is-*` | Estado o modificador del propio elemento | `is-primary`, `is-large`, `is-active` |
| `has-*` | Comportamiento o contenido del elemento | `has-text-centered`, `has-background-dark` |

---

## 2. Instalación e importación

### 2.1. CDN (rápido)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1/css/bulma.min.css">
```

### 2.2. NPM

```bash
npm install bulma
```

```scss
// importación completa
@import "bulma/css/bulma.css";

// o por capas (recomendado para tree-shaking)
@use "bulma/sass/utilities";
@use "bulma/sass/base";
@use "bulma/sass/elements";
@use "bulma/sass/components";
@use "bulma/sass/form";
@use "bulma/sass/grid";
@use "bulma/sass/helpers";
@use "bulma/sass/layout";
```

---

## 3. Sistema de breakpoints

| Modificador | Desde | Descripción |
|---|---|---|
| `mobile` | hasta 768px | móvil |
| `tablet` | desde 769px | tablet en adelante |
| `desktop` | desde 1024px | desktop |
| `widescreen` | desde 1216px | widescreen |
| `fullhd` | desde 1408px | fullHD |

Muchas clases admiten sufijos para aplicarse solo en cierto rango:

```html
<div class="column is-12-mobile is-6-tablet is-4-desktop">
```

Y existen los rangos `-only` y `-touch` / `-desktop`:

- `is-hidden-mobile`, `is-hidden-tablet-only`, `is-hidden-desktop`
- `is-size-3-mobile`, `is-size-5-tablet`

---

## 4. Columns — sistema de rejilla principal

Sistema de 12 columnas basado en Flexbox.

```html
<div class="columns">
  <div class="column">Auto</div>
  <div class="column">Auto</div>
  <div class="column">Auto</div>
</div>
```

### 4.1. Anchos numéricos

```html
<div class="columns">
  <div class="column is-3">25%</div>
  <div class="column is-6">50%</div>
  <div class="column is-3">25%</div>
</div>
```

Disponibles: `is-1` a `is-12`, `is-three-quarters`, `is-two-thirds`, `is-half`, `is-one-third`, `is-one-quarter`, `is-full`, `is-four-fifths`, etc.

### 4.2. Offsets

```html
<div class="column is-half is-offset-one-quarter"></div>
```

### 4.3. Modificadores de columns

```html
<div class="columns is-mobile">       <!-- mantiene columnas en móvil -->
<div class="columns is-multiline">    <!-- permite saltos de línea -->
<div class="columns is-gapless">      <!-- sin gap -->
<div class="columns is-vcentered">    <!-- alineación vertical -->
<div class="columns is-centered">     <!-- centrado horizontal -->
<div class="columns is-variable is-8"><!-- gap personalizado (0 a 8) -->
```

### 4.4. Anidamiento

```html
<div class="columns">
  <div class="column">
    <div class="columns is-mobile">
      <div class="column">A</div>
      <div class="column">B</div>
    </div>
  </div>
  <div class="column">Otro</div>
</div>
```

### 4.5. Responsive columns

```html
<div class="columns is-multiline">
  <div class="column is-12-mobile is-6-tablet is-4-desktop is-3-widescreen">
    Adaptativa
  </div>
</div>
```

---

## 5. Layout — estructuras de página

### 5.1. Container

```html
<div class="container">              <!-- centrado, responsive -->
<div class="container is-fluid">     <!-- ancho completo con padding -->
<div class="container is-widescreen"><!-- ancho hasta widescreen -->
<div class="container is-max-desktop">
```

### 5.2. Section

```html
<section class="section">
  <h2 class="title">Sección</h2>
</section>

<section class="section is-medium"></section>
<section class="section is-large"></section>
```

### 5.3. Hero

```html
<section class="hero is-primary is-medium">
  <div class="hero-head">
    <nav class="navbar">...</nav>
  </div>
  <div class="hero-body">
    <p class="title">Título principal</p>
    <p class="subtitle">Subtítulo</p>
  </div>
  <div class="hero-foot">
    <nav class="tabs">...</nav>
  </div>
</section>
```

Tamaños: `is-small`, `is-medium`, `is-large`, `is-halfheight`, `is-fullheight`, `is-fullheight-with-navbar`.

Colores: `is-primary`, `is-link`, `is-info`, `is-success`, `is-warning`, `is-danger`, `is-dark`, `is-light`.

### 5.4. Footer

```html
<footer class="footer">
  <div class="content has-text-centered">...</div>
</footer>
```

### 5.5. Tiles — layouts complejos en 2D

Sistema de mosaicos para layouts tipo dashboard. Solo dos niveles válidos:

```html
<div class="tile is-ancestor">
  <div class="tile is-vertical is-8">
    <div class="tile">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child notification is-primary">Caja 1</article>
        <article class="tile is-child notification is-warning">Caja 2</article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child notification is-info">Caja 3</article>
      </div>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child notification is-danger">Caja 4</article>
    </div>
  </div>
  <div class="tile is-parent">
    <article class="tile is-child notification is-success">Sidebar</article>
  </div>
</div>
```

Reglas clave:
- `is-ancestor`: contenedor raíz.
- `is-parent`: contiene `is-child`.
- `is-child`: tu contenido real.
- Para anidar más profundo se usan `is-vertical`.

---

## 6. Componentes

### 6.1. Navbar

```html
<nav class="navbar is-primary" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <img src="logo.png" width="112" height="28">
    </a>
    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navMenu">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navMenu" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item">Inicio</a>
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">Más</a>
        <div class="navbar-dropdown">
          <a class="navbar-item">Sub 1</a>
          <hr class="navbar-divider">
          <a class="navbar-item">Sub 2</a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-primary"><strong>Registro</strong></a>
          <a class="button is-light">Login</a>
        </div>
      </div>
    </div>
  </div>
</nav>
```

**JS mínimo para el burger** (Bulma no lo trae):

```js
document.querySelectorAll('.navbar-burger').forEach(el => {
  el.addEventListener('click', () => {
    const target = document.getElementById(el.dataset.target);
    el.classList.toggle('is-active');
    target.classList.toggle('is-active');
  });
});
```

Modificadores: `is-fixed-top`, `is-fixed-bottom`, `is-spaced`, `is-transparent`.

### 6.2. Card

```html
<div class="card">
  <div class="card-image">
    <figure class="image is-4by3">
      <img src="foto.jpg" alt="">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img src="avatar.jpg" alt="">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">Título</p>
        <p class="subtitle is-6">@usuario</p>
      </div>
    </div>
    <div class="content">Contenido principal de la tarjeta.</div>
  </div>
  <footer class="card-footer">
    <a class="card-footer-item">Guardar</a>
    <a class="card-footer-item">Editar</a>
    <a class="card-footer-item">Borrar</a>
  </footer>
</div>
```

### 6.3. Modal

```html
<div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-content">
    <!-- contenido arbitrario, p.ej. una card -->
  </div>
  <button class="modal-close is-large" aria-label="close"></button>
</div>

<!-- Variante card -->
<div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Título</p>
      <button class="delete" aria-label="close"></button>
    </header>
    <section class="modal-card-body">Contenido</section>
    <footer class="modal-card-foot">
      <button class="button is-success">Guardar</button>
      <button class="button">Cancelar</button>
    </footer>
  </div>
</div>
```

Necesitas JS para añadir/quitar `is-active`.

### 6.4. Dropdown

```html
<div class="dropdown is-active">
  <div class="dropdown-trigger">
    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
      <span>Opciones</span>
      <span class="icon is-small"><i class="fas fa-angle-down"></i></span>
    </button>
  </div>
  <div class="dropdown-menu" id="dropdown-menu" role="menu">
    <div class="dropdown-content">
      <a class="dropdown-item">Opción 1</a>
      <a class="dropdown-item is-active">Opción 2</a>
      <hr class="dropdown-divider">
      <a class="dropdown-item">Opción 3</a>
    </div>
  </div>
</div>
```

Variantes: `is-hoverable`, `is-right`, `is-up`.

### 6.5. Tabs

```html
<div class="tabs is-boxed is-centered is-medium">
  <ul>
    <li class="is-active"><a>Pictures</a></li>
    <li><a>Music</a></li>
    <li><a>Videos</a></li>
  </ul>
</div>
```

Modificadores: `is-centered`, `is-right`, `is-boxed`, `is-toggle`, `is-toggle-rounded`, `is-fullwidth`. Tamaños: `is-small`, `is-medium`, `is-large`.

### 6.6. Pagination

```html
<nav class="pagination is-rounded" role="navigation" aria-label="pagination">
  <a class="pagination-previous">Anterior</a>
  <a class="pagination-next">Siguiente</a>
  <ul class="pagination-list">
    <li><a class="pagination-link" aria-label="Goto page 1">1</a></li>
    <li><span class="pagination-ellipsis">&hellip;</span></li>
    <li><a class="pagination-link is-current" aria-label="Page 46">46</a></li>
    <li><span class="pagination-ellipsis">&hellip;</span></li>
    <li><a class="pagination-link">86</a></li>
  </ul>
</nav>
```

### 6.7. Message

```html
<article class="message is-warning">
  <div class="message-header">
    <p>Aviso</p>
    <button class="delete" aria-label="delete"></button>
  </div>
  <div class="message-body">Texto del mensaje.</div>
</article>
```

### 6.8. Menu (sidebar)

```html
<aside class="menu">
  <p class="menu-label">General</p>
  <ul class="menu-list">
    <li><a class="is-active">Dashboard</a></li>
    <li><a>Clientes</a></li>
  </ul>
  <p class="menu-label">Administración</p>
  <ul class="menu-list">
    <li>
      <a>Equipo</a>
      <ul>
        <li><a>Miembros</a></li>
        <li><a>Plugins</a></li>
      </ul>
    </li>
  </ul>
</aside>
```

### 6.9. Breadcrumb

```html
<nav class="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
  <ul>
    <li><a>Bulma</a></li>
    <li><a>Components</a></li>
    <li class="is-active"><a aria-current="page">Breadcrumb</a></li>
  </ul>
</nav>
```

Separadores: `has-arrow-separator`, `has-bullet-separator`, `has-dot-separator`, `has-succeeds-separator`.

### 6.10. Panel

```html
<nav class="panel is-primary">
  <p class="panel-heading">Repositorios</p>
  <div class="panel-block">
    <p class="control has-icons-left">
      <input class="input" type="text" placeholder="Buscar">
      <span class="icon is-left"><i class="fas fa-search"></i></span>
    </p>
  </div>
  <p class="panel-tabs">
    <a class="is-active">Todos</a>
    <a>Públicos</a>
    <a>Privados</a>
  </p>
  <a class="panel-block is-active">
    <span class="panel-icon"><i class="fas fa-book"></i></span>
    bulma
  </a>
  <a class="panel-block">
    <span class="panel-icon"><i class="fas fa-book"></i></span>
    marksheet
  </a>
</nav>
```

---

## 7. Elementos

### 7.1. Buttons

```html
<button class="button is-primary is-large is-rounded is-outlined">
  Botón
</button>

<div class="buttons has-addons">
  <button class="button is-success is-selected">Sí</button>
  <button class="button">Tal vez</button>
  <button class="button">No</button>
</div>
```

Modificadores: `is-primary`, `is-link`, `is-info`, `is-success`, `is-warning`, `is-danger`, `is-light`, `is-dark`, `is-text`, `is-ghost`.
Tamaños: `is-small`, `is-normal`, `is-medium`, `is-large`.
Estados: `is-outlined`, `is-inverted`, `is-rounded`, `is-loading`, `is-static`, `is-fullwidth`, `is-active`, `is-focused`, `is-hovered`.

### 7.2. Tags

```html
<span class="tag is-primary is-medium is-rounded">Tag</span>

<div class="tags has-addons">
  <span class="tag is-dark">npm</span>
  <span class="tag is-info">1.0.0</span>
</div>

<div class="tags">
  <span class="tag">v1</span>
  <span class="tag">latest</span>
</div>
```

### 7.3. Title y Subtitle

```html
<h1 class="title is-1">Título</h1>
<h2 class="subtitle is-3">Subtítulo</h2>
```

Tamaños: `is-1` a `is-6`. Para no quebrar tamaños con clase `subtitle`, añade `is-spaced` al title.

### 7.4. Notification

```html
<div class="notification is-danger is-light">
  <button class="delete"></button>
  Mensaje importante.
</div>
```

### 7.5. Progress

```html
<progress class="progress is-primary" value="60" max="100">60%</progress>
<progress class="progress is-large is-warning" max="100">Cargando</progress>
```

### 7.6. Box

```html
<div class="box">
  <article class="media">
    <div class="media-left">
      <figure class="image is-64x64">
        <img src="avatar.jpg" alt="">
      </figure>
    </div>
    <div class="media-content">
      <strong>Juan</strong> <small>@juan</small>
      <p>Contenido del media.</p>
    </div>
  </article>
</div>
```

### 7.7. Image

```html
<figure class="image is-128x128">
  <img src="foto.jpg" alt="">
</figure>

<figure class="image is-16by9">
  <img src="banner.jpg" alt="">
</figure>

<figure class="image is-128x128">
  <img class="is-rounded" src="avatar.jpg" alt="">
</figure>
```

Ratios disponibles: `is-square`, `is-1by1`, `is-5by4`, `is-4by3`, `is-3by2`, `is-5by3`, `is-16by9`, `is-2by1`, `is-3by1`, `is-4by5`, `is-3by4`, `is-2by3`, `is-3by5`, `is-9by16`, `is-1by2`, `is-1by3`.

### 7.8. Icon

```html
<span class="icon has-text-info">
  <i class="fas fa-info-circle"></i>
</span>

<span class="icon-text">
  <span class="icon"><i class="fas fa-home"></i></span>
  <span>Inicio</span>
</span>
```

---

## 8. Formularios

### 8.1. Estructura básica

```html
<div class="field">
  <label class="label">Nombre</label>
  <div class="control">
    <input class="input" type="text" placeholder="Tu nombre">
  </div>
  <p class="help">Indica tu nombre completo</p>
</div>
```

Estados del input: `is-primary`, `is-info`, `is-success`, `is-warning`, `is-danger`. Tamaños: `is-small`, `is-medium`, `is-large`. Modificadores: `is-rounded`, `is-hovered`, `is-focused`, `is-loading`, `is-static`.

### 8.2. Field con iconos

```html
<div class="field">
  <p class="control has-icons-left has-icons-right">
    <input class="input is-success" type="email" value="hello@example.com">
    <span class="icon is-small is-left"><i class="fas fa-envelope"></i></span>
    <span class="icon is-small is-right"><i class="fas fa-check"></i></span>
  </p>
  <p class="help is-success">Email válido</p>
</div>
```

### 8.3. Field has-addons (botón pegado a input)

```html
<div class="field has-addons">
  <div class="control is-expanded">
    <input class="input" type="text" placeholder="Buscar">
  </div>
  <div class="control">
    <button class="button is-info">Buscar</button>
  </div>
</div>
```

### 8.4. Field grouped (varios controles en línea)

```html
<div class="field is-grouped">
  <div class="control"><button class="button is-primary">Guardar</button></div>
  <div class="control"><button class="button is-light">Cancelar</button></div>
</div>
```

### 8.5. Field horizontal

```html
<div class="field is-horizontal">
  <div class="field-label is-normal">
    <label class="label">Desde</label>
  </div>
  <div class="field-body">
    <div class="field">
      <p class="control"><input class="input" type="text"></p>
    </div>
    <div class="field">
      <p class="control"><input class="input" type="text"></p>
    </div>
  </div>
</div>
```

### 8.6. Select

```html
<div class="select is-primary is-rounded is-multiple">
  <select multiple size="4">
    <option>Opción 1</option>
    <option>Opción 2</option>
  </select>
</div>
```

### 8.7. Textarea

```html
<textarea class="textarea has-fixed-size" placeholder="..." rows="6"></textarea>
```

### 8.8. Checkbox y Radio

```html
<label class="checkbox">
  <input type="checkbox">
  Acepto las <a>condiciones</a>
</label>

<div class="control">
  <label class="radio">
    <input type="radio" name="r"> Sí
  </label>
  <label class="radio">
    <input type="radio" name="r"> No
  </label>
</div>
```

### 8.9. File upload

```html
<div class="file is-primary has-name is-boxed">
  <label class="file-label">
    <input class="file-input" type="file" name="resume">
    <span class="file-cta">
      <span class="file-icon"><i class="fas fa-upload"></i></span>
      <span class="file-label">Subir archivo…</span>
    </span>
    <span class="file-name">screenshot.png</span>
  </label>
</div>
```

Modificadores: `is-boxed`, `is-fullwidth`, `is-right`, `is-centered`, `has-name`.

---

## 9. Helpers (clases utilitarias)

### 9.1. Color de texto y fondo

```html
<p class="has-text-primary">Texto</p>
<p class="has-background-light">Fondo</p>
```

Todos los colores Bulma + variantes `-light`, `-dark`, `-50`, `-100`...`-900`.

### 9.2. Tipografía

```html
<p class="has-text-centered has-text-weight-bold is-size-3 is-uppercase is-italic">
  Texto
</p>
```

Alineación: `has-text-left`, `has-text-centered`, `has-text-right`, `has-text-justified`.
Tamaños: `is-size-1` a `is-size-7` (con variantes `-mobile`, `-tablet`, `-desktop`).
Pesos: `has-text-weight-light`, `-normal`, `-medium`, `-semibold`, `-bold`.
Estilo: `is-italic`, `is-underlined`, `is-uppercase`, `is-capitalized`, `is-lowercase`.
Familia: `is-family-primary`, `is-family-secondary`, `is-family-sans-serif`, `is-family-monospace`.

### 9.3. Visibilidad

```html
<div class="is-hidden-mobile">Solo desktop</div>
<div class="is-hidden-tablet">Solo móvil</div>
<div class="is-sr-only">Solo lectores de pantalla</div>
<div class="is-invisible">Oculto pero ocupa espacio</div>
```

### 9.4. Display

```html
<div class="is-block is-flex is-inline is-inline-block is-inline-flex is-grid">...</div>
<div class="is-flex-mobile is-block-tablet">Responsive</div>
```

### 9.5. Flexbox helpers

```html
<div class="is-flex is-justify-content-space-between is-align-items-center is-flex-direction-column is-flex-wrap-wrap">
```

`is-justify-content-*`: `start`, `end`, `center`, `space-between`, `space-around`, `space-evenly`, `flex-start`, `flex-end`.
`is-align-items-*`: `start`, `end`, `center`, `baseline`, `stretch`.
`is-flex-direction-*`: `row`, `row-reverse`, `column`, `column-reverse`.
`is-flex-wrap-*`: `nowrap`, `wrap`, `wrap-reverse`.

### 9.6. Spacing

Patrón: `<propiedad><lados>-<tamaño>`

- **Propiedad:** `m` (margin) o `p` (padding).
- **Lados:** `t` (top), `r` (right), `b` (bottom), `l` (left), `x` (left+right), `y` (top+bottom), o nada (todos).
- **Tamaño:** `0` a `6` (0, 0.25rem, 0.5rem, 0.75rem, 1rem, 1.5rem, 3rem). También `auto`.

```html
<div class="mt-4 px-2 pb-6 mx-auto">...</div>
```

### 9.7. Otros helpers

```html
<div class="is-clipped">         <!-- overflow: hidden -->
<div class="is-clearfix">
<div class="is-pulled-left">     <!-- float: left -->
<div class="is-pulled-right">
<div class="is-marginless">
<div class="is-paddingless">
<div class="is-overlay">         <!-- position absolute inset 0 -->
<div class="is-relative">
<div class="is-clickable">       <!-- cursor: pointer -->
<div class="is-unselectable">
```

---

## 10. Personalización con Sass (avanzado)

Crea un `mystyles.scss`:

```scss
// 1. Importa las utilidades de Bulma (variables y mixins)
@use "bulma/sass/utilities/initial-variables" with (
  $family-primary: '"Inter", system-ui, sans-serif',
  $radius: 4px,
  $radius-large: 8px,
);

// 2. Sobreescribe colores
@use "bulma/sass/utilities/derived-variables" with (
  $primary: #6c63ff,
  $link: #4a47ff,
  $info: #209cee,
  $success: #23d160,
);

// 3. Importa los módulos que vayas a usar
@use "bulma/sass/base";
@use "bulma/sass/elements";
@use "bulma/sass/components";
@use "bulma/sass/form";
@use "bulma/sass/grid";
@use "bulma/sass/helpers";
@use "bulma/sass/layout";

// 4. Tus estilos custom
.btn-special {
  // puedes usar las variables de Bulma:
  background: var(--bulma-primary);
}
```

---

## 11. Personalización con variables CSS (Bulma v1)

Desde la v1, todas las variables están expuestas como CSS custom properties con prefijo `--bulma-*`:

```css
:root {
  --bulma-primary-h: 270deg;
  --bulma-primary-s: 70%;
  --bulma-primary-l: 50%;

  --bulma-radius: 0.25rem;
  --bulma-radius-large: 0.75rem;

  --bulma-family-primary: 'Inter', system-ui, sans-serif;

  --bulma-body-background-color: hsl(0, 0%, 98%);
  --bulma-body-color: hsl(0, 0%, 20%);
}

/* Modo oscuro automático */
@media (prefers-color-scheme: dark) {
  :root {
    --bulma-scheme-h: 220;
    --bulma-scheme-s: 14%;
    --bulma-light-l: 90%;
    --bulma-dark-l: 20%;
  }
}

/* Tema personalizado por sección */
.tema-rojo {
  --bulma-primary-h: 0deg;
  --bulma-primary-s: 80%;
}
```

Esta es la **vía recomendada** desde Bulma v1: no necesita compilación.

---

## 12. Modo oscuro

Bulma v1 lo soporta nativamente:

```html
<html data-theme="dark"><!-- forzar oscuro --></html>
<html data-theme="light"><!-- forzar claro --></html>
```

O dejarlo automático con la preferencia del sistema (es el comportamiento por defecto desde v1).

Toggle con JS:

```js
const toggle = () => {
  const html = document.documentElement;
  const current = html.dataset.theme;
  html.dataset.theme = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', html.dataset.theme);
};

// Aplicar al cargar
const saved = localStorage.getItem('theme');
if (saved) document.documentElement.dataset.theme = saved;
```

---

## 13. Skeletons (Bulma v1)

Estados de carga animados nativos:

```html
<div class="is-skeleton">Texto cargando</div>

<button class="button is-skeleton">Botón cargando</button>

<div class="skeleton-block"></div>

<div class="skeleton-lines">
  <div></div><div></div><div></div><div></div>
</div>
```

Cualquier elemento con `is-skeleton` se convierte en skeleton automáticamente.

---

## 14. Patrones avanzados y trucos

### 14.1. Layout responsive con sidebar

```html
<div class="columns is-gapless" style="min-height: 100vh;">
  <aside class="column is-2 has-background-dark">
    <!-- menu -->
  </aside>
  <main class="column">
    <section class="section">Contenido</section>
  </main>
</div>
```

### 14.2. Tarjeta hover elevada

```css
.card {
  transition: transform 0.2s, box-shadow 0.2s;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgb(0 0 0 / 0.15);
}
```

### 14.3. Hero con imagen de fondo

```html
<section class="hero is-fullheight"
  style="background: url('bg.jpg') center/cover; position: relative;">
  <div class="is-overlay" style="background: rgb(0 0 0 / 0.5);"></div>
  <div class="hero-body" style="position: relative; z-index: 1;">
    <p class="title has-text-white">Hello</p>
  </div>
</section>
```

### 14.4. Grid de tarjetas auto-fit (sin columns)

```html
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
  <div class="card">...</div>
  <div class="card">...</div>
  <div class="card">...</div>
</div>
```

A veces, `columns` queda corto. Combinar Bulma con CSS Grid puro es totalmente válido.

### 14.5. Formulario inline responsive

```html
<div class="field is-grouped is-grouped-multiline">
  <div class="control is-expanded">
    <input class="input" type="email" placeholder="Email">
  </div>
  <div class="control">
    <button class="button is-primary">Suscribir</button>
  </div>
</div>
```

`is-grouped-multiline` permite que los controles bajen a la siguiente línea en móvil.

### 14.6. Stack vertical en móvil, horizontal en desktop

```html
<div class="is-flex is-flex-direction-column is-flex-direction-row-tablet">
```

---

## 15. Buenas prácticas

- **Aprovecha helpers** antes de escribir CSS propio (`mt-4`, `has-text-centered`...).
- **No abuses de `style="..."`**: si necesitas algo recurrente, crea una clase.
- **Combina con CSS Grid nativo** para layouts complejos: las `columns` de Bulma son útiles pero menos potentes que Grid.
- **Personaliza vía variables CSS** (`--bulma-*`) salvo que necesites algo profundo (entonces Sass).
- **Tree-shake** si usas npm: importa solo los módulos que necesites.
- **Atento a la accesibilidad**: añade siempre `aria-label`, `role`, etc. Bulma no lo hace por ti.
- **Bulma no incluye JavaScript**. Para modales, dropdowns, navbar burger, tabs activas y toasts, escribe tú el JS o usa una librería como [bulma-js](https://github.com/jgthms/bulma) o frameworks como Vue/React.
- **Carga `fontawesome` o `material-icons`** si quieres iconos: Bulma reserva los espacios pero no incluye los iconos.

---

## 16. Recursos

- [bulma.io](https://bulma.io) — documentación oficial.
- [bulma.io/expo](https://bulma.io/expo/) — galería de ejemplos.
- [bulmatemplates](https://bulmatemplates.github.io/bulma-templates/) — plantillas gratuitas.
- [github.com/jgthms/bulma](https://github.com/jgthms/bulma) — código fuente.
