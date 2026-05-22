/*
Clase 71 - DOM (Nivel avanzado / experto)

20 ejercicios para dominar el DOM de verdad: delegación de eventos,
rendimiento, observers, accesibilidad, animaciones y web components.

Reglas del juego:
- Cada ejercicio es autocontenido: si necesitas HTML, créalo tú mismo
  desde JS (createElement / template) salvo que el enunciado diga lo
  contrario. Así practicas también la construcción del árbol.
- No uses innerHTML con datos dinámicos (riesgo de XSS): usa
  textContent, createElement o <template>. Parte del objetivo es
  escribir DOM seguro.
- Resuelve cada uno debajo de su enunciado, igual que en el archivo v1.
- La línea "Pista:" te dice QUÉ API investigar, no cómo resolverlo.
*/


// 1. DELEGACIÓN DE EVENTOS
//    Crea una <ul> y un botón "Añadir". Cada clic en "Añadir" inserta
//    un <li> con un texto y un botón "Eliminar" dentro. NO añadas un
//    listener por cada botón "Eliminar": registra UN SOLO listener en
//    la <ul> que, mediante event.target y closest(), elimine el <li>
//    correcto aunque el elemento se haya creado después.
//    Pista: event delegation, event.target, Element.closest()



// 2. INSERCIÓN MASIVA EFICIENTE CON DocumentFragment
//    Inserta 5.000 <li> en una lista. Hazlo de forma que el navegador
//    solo recalcule el layout (reflow) UNA vez, no 5.000. Mide el
//    tiempo con performance.now() y compáralo con la versión ingenua
//    (appendChild dentro del bucle directamente sobre el DOM).
//    Pista: document.createDocumentFragment(), performance.now()



// 3. BUSCADOR CON DEBOUNCE
//    Crea un <input> de búsqueda y una lista de ~30 elementos. Filtra
//    la lista en vivo según el texto, PERO la función de filtrado solo
//    debe ejecutarse 300 ms después de que el usuario deje de teclear.
//    Implementa tú la función debounce genérica (no uses librerías).
//    Pista: setTimeout / clearTimeout, closures, higher-order function



// 4. THROTTLE EN SCROLL
//    Crea un botón "Subir" fijo (position: fixed) oculto por defecto.
//    Debe aparecer cuando el scroll vertical supere 400px y ocultarse
//    si no. El handler de scroll debe ejecutarse como máximo una vez
//    cada 150 ms (implementa throttle tú mismo). Al hacer clic, hace
//    scroll suave hasta arriba.
//    Pista: window.scrollY, throttle, window.scrollTo({behavior})



// 5. MutationObserver
//    Crea un contenedor y un botón que le añade párrafos. Observa el
//    contenedor con un MutationObserver: cada vez que se añadan o
//    quiten nodos hijos, escribe en otro <div> un log del tipo
//    "Añadidos: 1, Eliminados: 0 (total hijos: 3)". Desconecta el
//    observer con un botón "Stop".
//    Pista: new MutationObserver(cb), observe({childList:true}), disconnect()



// 6. LAZY LOADING CON IntersectionObserver
//    Renderiza 20 imágenes pero guarda la URL real en data-src y deja
//    el src con un placeholder. Usa un IntersectionObserver para que
//    cada imagen cargue su src real SOLO cuando esté a punto de entrar
//    en el viewport. Deja de observar cada imagen una vez cargada.
//    Pista: IntersectionObserver, dataset, rootMargin, unobserve()



// 7. SCROLL INFINITO
//    Pinta 20 items. Coloca un elemento "centinela" al final de la
//    lista. Cuando ese centinela entre en el viewport, añade otros 20
//    items y vuelve a mover el centinela al final. Debe seguir
//    funcionando indefinidamente sin duplicar observers.
//    Pista: IntersectionObserver sobre un elemento sentinel



// 8. DRAG AND DROP: REORDENAR LISTA
//    Crea una lista de 5 elementos arrastrables (draggable="true").
//    Permite reordenarlos arrastrando un elemento sobre otro y
//    soltándolo. Al terminar, muestra el nuevo orden en un <div>.
//    Gestiona dragstart, dragover (preventDefault), drop y dragend.
//    Pista: HTML Drag and Drop API, e.dataTransfer, e.preventDefault()



// 9. RENDER CON <template>
//    Define un <template id="card"> en JS (createElement + content)
//    con la estructura de una "tarjeta de usuario" (nombre, email,
//    avatar). Dado un array de 4 usuarios, clona el template para
//    cada uno, rellena los datos y monta todas las tarjetas en el DOM
//    usando un DocumentFragment. Nada de innerHTML.
//    Pista: <template>.content, cloneNode(true), querySelector sobre el clon



// 10. TABLA CRUD CON DELEGACIÓN + dataset
//     Renderiza una tabla a partir de un array de objetos
//     {id, nombre, precio}. Cada fila tiene botones "Editar" y
//     "Borrar" con data-id. Con UN listener en el <tbody>: "Borrar"
//     elimina del array y re-renderiza; "Editar" convierte la celda
//     de nombre en un <input> y guarda al pulsar Enter.
//     Pista: delegación, dataset.id, render() idempotente desde estado



// 11. PROPAGACIÓN: CAPTURE vs BUBBLE
//     Crea 3 divs anidados (abuelo > padre > hijo), cada uno con su
//     propio listener de clic. Registra listeners en fase de captura
//     y de burbujeo y escribe en consola/pantalla el orden real en
//     que se disparan al hacer clic en el hijo. Añade un botón que
//     active stopPropagation en el "padre" y demuestra el cambio.
//     Pista: addEventListener(type, fn, {capture:true}), stopPropagation()



// 12. EVENTOS PERSONALIZADOS (patrón pub/sub)
//     Crea un "carrito": un botón "Añadir al carrito" que despacha un
//     CustomEvent "cart:add" con detail = { producto, precio }. En
//     OTRA parte del código, un contador y un total escuchan ese
//     evento en document y se actualizan. Los dos módulos no deben
//     conocerse entre sí, solo a través del evento.
//     Pista: new CustomEvent(name, {detail}), dispatchEvent, addEventListener



// 13. FORMULARIO: FormData + VALIDACIÓN EN VIVO
//     Crea un formulario (nombre, email, contraseña). Valida en cada
//     "input": email con formato válido, contraseña >= 8 caracteres.
//     Muestra mensajes de error junto a cada campo y deshabilita el
//     botón "Enviar" hasta que TODO sea válido. Al enviar, intercepta
//     el submit, construye un FormData y muéstralo como objeto.
//     Pista: submit + preventDefault, new FormData(form), Object.fromEntries



// 14. TABLA ORDENABLE Y FILTRABLE
//     Tabla de ~10 filas con columnas "Nombre" y "Edad". Al hacer
//     clic en una cabecera, ordena por esa columna alternando
//     asc/desc (indícalo con ▲/▼). Un <input> superior filtra filas
//     por nombre en vivo. Ordenar y filtrar deben poder combinarse
//     sin perderse uno al otro (mantén el estado, re-renderiza).
//     Pista: Array.prototype.sort comparador, estado {sortBy,dir,query}



// 15. MODAL ACCESIBLE CON FOCUS TRAP
//     Crea un botón que abre un modal. Requisitos de accesibilidad:
//     al abrir, el foco va al modal; Tab y Shift+Tab NO pueden salir
//     del modal (focus trap); Escape lo cierra; al cerrar, el foco
//     vuelve al botón que lo abrió. Marca el fondo como inerte/oculto
//     para lectores de pantalla.
//     Pista: querySelectorAll de focusables, keydown Tab/Escape, aria-hidden



// 16. COMPONENTE DE PESTAÑAS (TABS) ACCESIBLE
//     Construye un sistema de pestañas (3 tabs / 3 paneles). Solo se
//     ve el panel activo. Debe ser navegable por teclado con flechas
//     izquierda/derecha entre tabs y respetar el patrón ARIA
//     (role="tab", role="tabpanel", aria-selected, tabindex).
//     Pista: roving tabindex, keydown ArrowLeft/ArrowRight, aria-*



// 17. ACORDEÓN CON ANIMACIÓN REAL DE ALTURA
//     Crea un acordeón de 3 secciones. Solo una abierta a la vez. La
//     apertura/cierre debe animar la altura de forma suave (de 0 a la
//     altura real del contenido, que no conoces de antemano). No uses
//     height fijo "mágico"; calcula scrollHeight.
//     Pista: scrollHeight, transition de max-height/height, transitionend



// 18. CONTADOR ANIMADO CON requestAnimationFrame
//     Dado un número objetivo (p. ej. 12.345), anima un contador
//     desde 0 hasta ese valor en exactamente 2 segundos usando
//     requestAnimationFrame (NO setInterval). Aplica una curva de
//     easing (ease-out) y respeta prefers-reduced-motion (si el
//     usuario lo pide, muestra el valor final sin animar).
//     Pista: requestAnimationFrame(ts), interpolación, matchMedia()



// 19. TOOLTIP POSICIONADO CON getBoundingClientRect
//     Crea varios botones repartidos por la pantalla. Al pasar el
//     ratón (o enfocar con teclado) sobre uno, muestra un tooltip
//     flotante encima. El tooltip debe reposicionarse para NUNCA
//     salirse de la ventana (si no cabe arriba, va abajo; ajusta los
//     bordes laterales). Debe seguir bien al hacer scroll/resize.
//     Pista: getBoundingClientRect(), innerWidth/Height, mouseenter/focus



// 20. WEB COMPONENT CON SHADOW DOM
//     Crea un Custom Element <user-badge nombre="..." estado="online">
//     usando class extends HTMLElement y Shadow DOM. Encapsula sus
//     estilos (no deben filtrarse fuera ni recibir CSS de fuera).
//     Reacciona a cambios del atributo "estado" vía
//     observedAttributes / attributeChangedCallback (online = verde,
//     offline = gris). Instancia 3 badges y cambia uno por código.
//     Pista: customElements.define, attachShadow({mode:'open'}),
//     static get observedAttributes(), attributeChangedCallback()
