# HTML Avanzado — Apuntes completos

> Estos apuntes asumen que ya conoces lo básico (`<p>`, `<h1>`, `<a>`, `<img>`, atributos comunes, anidamiento) y se centran en todo lo que diferencia a un desarrollador junior de uno que escribe HTML moderno, semántico y profesional.

---

## 1. HTML semántico

El HTML semántico consiste en usar etiquetas que **describen el significado** del contenido, no su apariencia. Mejora la accesibilidad, el SEO y la mantenibilidad.

### 1.1. Estructura de página moderna

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Título de la página</title>
  </head>
  <body>
    <header>
      <nav aria-label="Principal">
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/blog">Blog</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <article>
        <header>
          <h1>Título del artículo</h1>
          <p>Publicado el <time datetime="2026-05-22">22 de mayo de 2026</time></p>
        </header>

        <section>
          <h2>Sección 1</h2>
          <p>Contenido...</p>
        </section>

        <aside>
          <h2>Artículos relacionados</h2>
        </aside>

        <footer>
          <p>Autor: ...</p>
        </footer>
      </article>
    </main>

    <footer>
      <p>&copy; 2026</p>
    </footer>
  </body>
</html>
```

### 1.2. Etiquetas semánticas clave

| Etiqueta | Significado | Uso típico |
|---|---|---|
| `<header>` | Cabecera de una sección o página | Logo, título, navegación principal |
| `<nav>` | Bloque de navegación | Menús principales, breadcrumbs |
| `<main>` | Contenido principal único de la página | **Solo uno por documento** |
| `<article>` | Contenido autónomo y reutilizable | Post de blog, noticia, comentario |
| `<section>` | Agrupación temática | Capítulos, pestañas |
| `<aside>` | Contenido relacionado pero secundario | Sidebar, glosario lateral |
| `<footer>` | Pie de sección o página | Copyright, links de contacto |
| `<figure>` / `<figcaption>` | Imagen, gráfico o código con leyenda | Imágenes con caption semántico |
| `<time datetime="...">` | Fechas legibles por máquina | Eventos, publicaciones |
| `<mark>` | Texto destacado/relevante | Resultados de búsqueda |
| `<details>` / `<summary>` | Bloques colapsables nativos | FAQs, spoilers |
| `<address>` | Información de contacto | Tarjetas de autor |

### 1.3. Reglas de oro

- **Una sola `<h1>`** por documento (ideal aunque ya no obligatorio en HTML5).
- Los `headings` deben seguir un orden jerárquico (`h1` → `h2` → `h3`), sin saltarse niveles.
- `<section>` SIEMPRE debe contener un heading.
- Si no hay valor semántico, usa `<div>` (bloque) o `<span>` (inline).

---

## 2. Formularios avanzados

### 2.1. Tipos de input modernos

```html
<input type="email" required />
<input type="url" />
<input type="tel" pattern="[0-9]{9}" />
<input type="number" min="0" max="100" step="0.1" />
<input type="range" min="0" max="10" />
<input type="date" min="2026-01-01" />
<input type="datetime-local" />
<input type="month" />
<input type="week" />
<input type="time" />
<input type="color" />
<input type="search" />
<input type="file" accept="image/png, image/jpeg" multiple />
<input type="hidden" name="csrf" value="..." />
```

### 2.2. Validación nativa (HTML5)

```html
<form>
  <label for="user">Usuario</label>
  <input
    id="user"
    name="user"
    type="text"
    required
    minlength="3"
    maxlength="20"
    pattern="[a-zA-Z0-9_]+"
    title="Solo letras, números y guiones bajos"
    autocomplete="username"
  />

  <label for="pass">Contraseña</label>
  <input
    id="pass"
    type="password"
    required
    minlength="8"
    autocomplete="new-password"
  />

  <button type="submit">Enviar</button>
</form>
```

**Pseudoclases CSS asociadas:** `:valid`, `:invalid`, `:required`, `:optional`, `:in-range`, `:out-of-range`, `:placeholder-shown`, `:user-invalid` (no se activa hasta que el usuario interactúa, evita el "todo rojo" al cargar).

### 2.3. Atributos clave

- `autocomplete` — usa los valores estándar (`username`, `email`, `name`, `street-address`, `cc-number`, `one-time-code`, etc.). Es crítico para UX y gestores de contraseñas.
- `inputmode` — controla el teclado móvil sin cambiar el tipo: `numeric`, `decimal`, `tel`, `email`, `url`, `search`.
- `enterkeyhint` — texto del botón Enter en móviles: `done`, `go`, `next`, `search`, `send`.
- `formnovalidate` — desactiva la validación en un botón concreto (útil para "Guardar borrador").

### 2.4. Agrupación

```html
<fieldset>
  <legend>Datos de contacto</legend>
  <label>Nombre <input type="text" name="nombre" /></label>
  <label>Email <input type="email" name="email" /></label>
</fieldset>
```

### 2.5. `<datalist>` — sugerencias nativas

```html
<input list="navegadores" name="browser" />
<datalist id="navegadores">
  <option value="Chrome"></option>
  <option value="Firefox"></option>
  <option value="Safari"></option>
</datalist>
```

### 2.6. `<output>` y formularios reactivos

```html
<form oninput="resultado.value = parseInt(a.value) + parseInt(b.value)">
  <input type="number" id="a" value="0" /> +
  <input type="number" id="b" value="0" /> =
  <output name="resultado" for="a b">0</output>
</form>
```

---

## 3. Multimedia

### 3.1. Imágenes responsive

**`srcset` + `sizes`** — el navegador elige la imagen adecuada según el viewport y la densidad de pantalla:

```html
<img
  src="foto-800.jpg"
  srcset="foto-400.jpg 400w, foto-800.jpg 800w, foto-1600.jpg 1600w"
  sizes="(max-width: 600px) 100vw, 50vw"
  alt="Descripción de la foto"
  loading="lazy"
  decoding="async"
/>
```

**`<picture>`** — para arte directivo (cambiar la imagen, no solo el tamaño) o formatos modernos con fallback:

```html
<picture>
  <source type="image/avif" srcset="foto.avif" />
  <source type="image/webp" srcset="foto.webp" />
  <source media="(max-width: 600px)" srcset="foto-movil.jpg" />
  <img src="foto.jpg" alt="..." />
</picture>
```

**Atributos clave:**
- `loading="lazy"` — carga diferida nativa.
- `decoding="async"` — no bloquea el renderizado.
- `fetchpriority="high|low|auto"` — prioridad de descarga.
- `width` y `height` — siempre defínelos para evitar CLS (Cumulative Layout Shift).

### 3.2. Audio y vídeo

```html
<video
  controls
  preload="metadata"
  poster="preview.jpg"
  width="800"
  playsinline
>
  <source src="video.webm" type="video/webm" />
  <source src="video.mp4" type="video/mp4" />
  <track kind="subtitles" src="es.vtt" srclang="es" label="Español" default />
  <track kind="captions" src="es-cap.vtt" srclang="es" />
  Tu navegador no soporta vídeo HTML5.
</video>
```

Atributos útiles: `autoplay` (requiere `muted` en la mayoría de navegadores), `loop`, `muted`, `playsinline` (evita el modo fullscreen forzado en iOS).

---

## 4. Accesibilidad (A11y) y ARIA

### 4.1. Principios básicos

1. **Usa HTML semántico antes que ARIA.** Un `<button>` siempre es mejor que `<div role="button">`.
2. **Toda imagen necesita `alt`.** Decorativa → `alt=""`. Informativa → describe lo que aporta.
3. **Asocia labels e inputs.** `<label for="x">` + `<input id="x">`.
4. **Navegación por teclado.** Todo elemento interactivo debe ser focusable y operable con Tab/Enter/Espacio.
5. **Contraste de color** mínimo 4.5:1 para texto normal.

### 4.2. Atributos ARIA esenciales

```html
<!-- Etiqueta accesible cuando no hay texto visible -->
<button aria-label="Cerrar modal">×</button>

<!-- Apunta a otro elemento como etiqueta -->
<input type="search" aria-labelledby="title-search" />
<h2 id="title-search">Buscador</h2>

<!-- Descripción extra -->
<input aria-describedby="hint" />
<small id="hint">Mínimo 8 caracteres</small>

<!-- Estados dinámicos -->
<button aria-expanded="false" aria-controls="menu">Menú</button>
<ul id="menu" hidden>...</ul>

<button aria-pressed="true">Negrita</button>

<!-- Regiones de página -->
<nav aria-label="Migas de pan">...</nav>

<!-- Contenido dinámico (notificaciones) -->
<div aria-live="polite">Guardado correctamente</div>
<div aria-live="assertive">¡Error crítico!</div>

<!-- Ocultar a tecnologías asistivas -->
<span aria-hidden="true">🎉</span>
```

### 4.3. Roles más usados

`role="button"`, `role="dialog"`, `role="alert"`, `role="status"`, `role="tab"`, `role="tabpanel"`, `role="tablist"`, `role="navigation"`, `role="search"`, `role="presentation"` (anula la semántica).

### 4.4. Atributo `tabindex`

- `tabindex="0"` — añade el elemento al orden natural de tabulación.
- `tabindex="-1"` — focusable por JS pero no con Tab (útil para modales).
- `tabindex="1+"` — **evítalo**, rompe el orden lógico.

---

## 5. Metadatos del `<head>`

### 5.1. Meta esenciales

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="Descripción de 150-160 caracteres para SEO" />
<meta name="theme-color" content="#0066ff" />
<meta name="color-scheme" content="light dark" />
<link rel="canonical" href="https://midominio.com/articulo" />
<link rel="icon" href="/favicon.ico" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/manifest.json" />
```

### 5.2. Open Graph (Facebook, LinkedIn, WhatsApp...)

```html
<meta property="og:title" content="Título compartible" />
<meta property="og:description" content="Descripción al compartir" />
<meta property="og:image" content="https://midominio.com/og.jpg" />
<meta property="og:url" content="https://midominio.com/articulo" />
<meta property="og:type" content="article" />
<meta property="og:locale" content="es_ES" />
```

### 5.3. Twitter Card

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="..." />
```

### 5.4. Performance hints

```html
<!-- Conexión anticipada a otro origen -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="dns-prefetch" href="https://api.midominio.com" />

<!-- Descarga crítica anticipada -->
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/hero.jpg" as="image" />

<!-- Carga diferida o de baja prioridad -->
<link rel="prefetch" href="/siguiente-pagina.html" />

<!-- Modulepreload para JS modular -->
<link rel="modulepreload" href="/app.js" />
```

---

## 6. Scripts

```html
<!-- Bloquea el parser hasta descargar y ejecutar -->
<script src="app.js"></script>

<!-- Descarga en paralelo, ejecuta cuando esté lista (orden no garantizado) -->
<script src="app.js" async></script>

<!-- Descarga en paralelo, ejecuta tras el parseo del HTML (orden garantizado) -->
<script src="app.js" defer></script>

<!-- Módulo ES6 nativo (defer por defecto, strict mode automático) -->
<script type="module" src="app.js"></script>

<!-- Fallback para navegadores sin soporte de módulos -->
<script nomodule src="legacy.js"></script>
```

---

## 7. Elementos interactivos nativos

### 7.1. `<details>` y `<summary>`

```html
<details>
  <summary>¿Cómo funciona?</summary>
  <p>Contenido oculto hasta que el usuario lo despliega.</p>
</details>
```

### 7.2. `<dialog>` — modales nativos

```html
<dialog id="miModal">
  <form method="dialog">
    <p>¿Estás seguro?</p>
    <button value="cancel">Cancelar</button>
    <button value="confirm">Confirmar</button>
  </form>
</dialog>

<script>
  document.getElementById('miModal').showModal(); // abre como modal
  // .show()      → no modal
  // .close()     → cierra
</script>
```

Con `<dialog>` el navegador gestiona el foco, el `Escape` para cerrar, el fondo (`::backdrop`) y la accesibilidad.

### 7.3. Popover API (moderno)

```html
<button popovertarget="info">Más info</button>
<div id="info" popover>Contenido flotante con cierre automático.</div>
```

---

## 8. Tablas avanzadas

```html
<table>
  <caption>Ventas trimestrales 2026</caption>
  <colgroup>
    <col span="1" style="background: #f5f5f5;" />
    <col span="2" />
  </colgroup>
  <thead>
    <tr>
      <th scope="col">Producto</th>
      <th scope="col">Q1</th>
      <th scope="col">Q2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Camisetas</th>
      <td>1200</td>
      <td>1500</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Total</th>
      <td>1200</td>
      <td>1500</td>
    </tr>
  </tfoot>
</table>
```

- `scope="col|row"` — asocia cabeceras con celdas (clave para lectores de pantalla).
- `<caption>` — título accesible de la tabla.
- `<colgroup>` y `<col>` — estilos por columna.

---

## 9. Web Components (introducción)

Los Web Components permiten crear elementos HTML personalizados y reutilizables.

```html
<mi-tarjeta titulo="Hola"></mi-tarjeta>

<script>
  class MiTarjeta extends HTMLElement {
    connectedCallback() {
      const shadow = this.attachShadow({ mode: 'open' });
      shadow.innerHTML = `
        <style>:host { display: block; padding: 1rem; border: 1px solid; }</style>
        <h3>${this.getAttribute('titulo')}</h3>
        <slot></slot>
      `;
    }
  }
  customElements.define('mi-tarjeta', MiTarjeta);
</script>
```

Tres pilares:
1. **Custom Elements** — `customElements.define()`.
2. **Shadow DOM** — encapsulación de estilos y estructura.
3. **`<template>` y `<slot>`** — plantillas reutilizables.

---

## 10. Microdatos y SEO estructurado

### 10.1. JSON-LD (recomendado por Google)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Título del artículo",
  "author": { "@type": "Person", "name": "Ana García" },
  "datePublished": "2026-05-22"
}
</script>
```

### 10.2. Microdatos inline

```html
<div itemscope itemtype="https://schema.org/Person">
  <span itemprop="name">Ana García</span>
  <span itemprop="jobTitle">Desarrolladora</span>
</div>
```

---

## 11. Atributos globales útiles

| Atributo | Función |
|---|---|
| `contenteditable="true"` | Permite editar el contenido directamente |
| `draggable="true"` | Habilita drag & drop |
| `hidden` | Oculta el elemento (equivalente a `display:none`) |
| `inert` | Desactiva interacción y foco (útil con modales) |
| `spellcheck="true|false"` | Corrección ortográfica |
| `translate="no"` | Evita traducción automática |
| `dir="ltr|rtl|auto"` | Dirección del texto |
| `lang="es"` | Idioma del contenido |
| `data-*` | Atributos personalizados accesibles vía `dataset` |
| `is="..."` | Customized built-in elements |

```html
<article data-id="42" data-categoria="tutorial">...</article>
<script>
  const art = document.querySelector('article');
  console.log(art.dataset.id);          // "42"
  console.log(art.dataset.categoria);   // "tutorial"
</script>
```

---

## 12. Buenas prácticas finales

- **Indenta y respeta el orden semántico**: header → main → footer.
- **Valida tu HTML** con [validator.w3.org](https://validator.w3.org).
- **Audita accesibilidad** con Lighthouse, axe DevTools o WAVE.
- **Atributos en orden lógico**: primero `id`/`class`, luego `type`/`name`, luego comportamiento (`required`, `disabled`), luego `data-*`.
- **Cierra todas las etiquetas** (excepto void elements como `<img>`, `<br>`, `<input>`).
- **Usa comillas dobles** consistentemente para atributos.
- **Minimiza el uso de `<div>`**: si no sabes qué etiqueta usar, replantéate la estructura.
- **Nunca uses tablas para maquetar**, solo para datos tabulares.
- **Test en múltiples navegadores** y con lectores de pantalla reales (NVDA, VoiceOver).
