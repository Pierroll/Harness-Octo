# Convenciones de los mockups: nombres, briefs de imagen, HTML y CSS

Aplica a todo lo que `ui-design` deja en `discovery/3-design/outputs/mockups/`.

## 1. Dónde va cada archivo

```
discovery/3-design/outputs/
  screen-inventory.md                 inventario (sobre harness/templates/screen-inventory.md)
  design-system.md                    design system (sobre harness/templates/design-system.md)
  mockups/
    index.html                        entrada: lista de flujos con estado
    design-system.css                 tokens como variables y componentes base
    design-system/                    la pantalla representativa del paso 2
      brief-A.md brief-B.md brief-C.md
      r1/variant-A.jpg variant-B.jpg variant-C.jpg     (r2/, r3/ si hubo más rondas)
      sets.json  board.html  feedback.json  approved.json
    <flujo>/                          una carpeta por flujo, nombre en minúsculas
      index.html                      el flujo, pantalla por pantalla, en orden
      <P-XXX-NN>-<nombre>.html        la pantalla aprobada
      <P-XXX-NN>-<nombre>--vacio.html, --error.html, --exito.html   estados, si los criterios los piden
      <P-XXX-NN>/                     brief-A.md.., r1/, r2/.., approved.json
      sets.json  board.html  feedback.json               un tablero por flujo
```

`feedback-pending.json` lo escribe el tablero al pedir otra ronda; el skill lo lee y lo mueve
a la carpeta de la ronda que cierra, como registro de por qué hubo otra. Todo se
versiona, imágenes incluidas: en JPEG comprimido, que es lo que `image.mjs` produce por
defecto (unos cientos de KB cada una; en PNG pasan del mega). Nada se borra entre rondas.

## 2. Identificadores

- Flujo: `F-<XXX>`, tres letras del módulo o del flujo (`F-INS` inscripción). Carpeta:
  `inscripcion`.
- Pantalla: `P-<XXX>-<NN>` (`P-INS-03`). Nombre de archivo: minúsculas, sin acentos, con
  guiones (`P-INS-03-datos-del-postulante.html`).
- Rondas: `r1`, `r2`. Alternativas: `A`, `B`, `C`.

## 3. El brief de una imagen

Un archivo por alternativa, `brief-<letra>.md`, en la carpeta de la pantalla. Lo escribe el
paso 3 (la dirección) y lo completa el subagente que genera. Plantilla:

```
Mockup de interfaz con aspecto de producto real en producción, no wireframe ni ilustración.
Pantalla: <nombre> (<ID>). Dispositivo: <escritorio, 1536x1024 / móvil, 1024x1536>.
Quién la usa: <rol y su perfil real: dónde trabaja, con qué, nivel técnico>.
Qué tiene que lograr: <el beneficio de la historia de usuario>.
Elementos obligatorios: <navegación del rol con "dónde estoy", título, campos agrupados así: ...,
acción principal, acción secundaria, el estado que se muestra>.
Dirección <letra>, "<nombre>": <la descripción confirmada en el paso 3, con la razón del filtro>.
Design system: tipografía <familia>, primario <hex>, fondo <hex>, texto <hex>, radios <n> px,
densidad <cómoda>. <Si hay referencia: "Misma familia visual que la imagen de referencia.">
Idioma de la interfaz: español, con las palabras del cliente: <tres ejemplos>.
No incluir: <lo que prohíbe ux-doctrine.md y lo que el requisito no pide>.
```

Reglas del brief: una pantalla por imagen; sin la clave ni rutas del repo; sin
instrucciones para el modelo de texto. El texto de la imagen es orientativo: las etiquetas
reales van en el HTML. Pero el modelo deforma el texto que no controla, y una imagen con
palabras inventadas no se le puede mostrar a nadie, así que el texto se pide así: cada frase
que debe aparecer va entre comillas, tal cual, corta (ocho palabras por línea como máximo),
y no se pide ninguna frase que no haga falta para la dirección. `image.mjs` hace dos cosas solo,
al final de todo brief: agrega la regla de que el texto sea español correcto y solo el
pedido, y repite como lista literal cada cadena entrecomillada de la línea "Elementos
obligatorios", con la orden de revisarla letra por letra. Esa lista al final es lo que de
verdad baja los errores: pedir buena ortografía en prosa, dentro del brief, ya se probó y no
alcanza. A esa lista le sigue la regla de diacríticos, porque el error que queda cuando el
texto ya sale bien es el signo equivocado sobre la vocal: el modelo sabe que ahí va una
tilde y dibuja circunflejo o virgulilla, y salen `mâs`, `nûñez`, `administraciõn`,
`cubíerta`. La regla dice que en español el único acento es el agudo, que la virgulilla va
solo sobre la ñ, y que una palabra con dos signos seguidos como Núñez se revisa dos veces.

Y después de generar, el script verifica el copy solo. Lee la imagen con el OCR de Vision,
que es nativo de macOS y no cuesta nada, y compara palabra por palabra contra las cadenas
del brief. Si algo no coincide avisa con `COPY MAL` las palabras que no están en el brief y
con `COPY FALTA` las del brief que no se dibujaron, y las deja en `textCheck` del JSON de
salida. La verificación va con `usesLanguageCorrection` en false a propósito: con la
corrección activada Vision "arregla" `Entror` a `Entrar` y esconde justo el error que se
busca. Para revisar una imagen ya generada, sin gastar un crédito, se corre
`node scripts/image.mjs check --image <imagen> --brief-file <brief>`, que sale con código 3
si encontró algo.

La imagen de referencia también se verifica antes de aprobarla, porque el endpoint de
edición hace que el modelo copie las formas del texto del original: una palabra mal escrita
en la referencia reaparece en todas las pantallas que se generen con ella.

Por eso el copy va **entre comillas y en la línea de elementos obligatorios**: lo que quede
fuera de ella no entra en la lista ni en la verificación. Y se genera con `--quality high` siempre que el
texto importe para elegir: en calidad media las palabras largas en cuerpo chico salen
deformadas (`habilitadas` como `habillladas`), y una imagen así no se le puede mostrar a
nadie. La imagen de referencia también empuja en contra: el endpoint de edición copia formas
del original y arrastra las del texto. Se usa igual, porque mantiene la familia visual entre
pantallas, y el error que queda se corrige en el HTML.

Tres cosas que enseñó la primera prueba real. El modelo no logra cinco campos en el alto de
un móvil sin cortar el botón o fusionar dos campos: pide cuatro campos visibles como máximo
y di que el resto sigue abajo; el HTML lleva los campos completos. Pide siempre la pantalla
completa del teléfono con margen, porque tiende a recortar el pie. Y el nombre de la
dirección pesa más que su descripción: "Bolsillo oscuro" produjo un tema oscuro entero
aunque el texto pedía cuerpo blanco. Nombra cada dirección por lo que cambia, sin adjetivos
que el modelo pueda tomar como tema.

## 4. `sets.json` y `approved.json`

`sets.json` es lo que lee `board.mjs`. Un conjunto por pantalla del flujo, con la ronda
vigente:

```json
{ "title": "Flujo: inscripción",
  "sets": [ { "id": "P-INS-03", "title": "Datos del postulante", "round": 1,
    "variants": [
      { "label": "A", "name": "Cuatro pasos", "direction": "Un paso por tipo de dato, barra de progreso arriba", "image": "P-INS-03/r1/variant-A.jpg" },
      { "label": "B", "name": "Una página con secciones", "direction": "Secciones plegables, resumen a la derecha", "image": "P-INS-03/r1/variant-B.jpg" },
      { "label": "C", "name": "Pestañas", "direction": "Una pestaña por tipo de dato", "image": "P-INS-03/r1/variant-C.jpg" } ] } ] }
```

`approved.json`, uno por pantalla, lo escribe el skill cuando llega `feedback.json`:

```json
{ "screen": "P-INS-03", "round": 1, "approved_variant": "B", "name": "Una página con secciones",
  "image": "P-INS-03/r1/variant-B.jpg", "ratings": { "A": 3, "B": 5, "C": 2 },
  "comments": { "B": "los pasos se entienden solos" }, "direction": "más aire entre campos",
  "chosen_by": "PM con diseño", "date": "2026-09-10" }
```

`title` de cada pantalla es solo su nombre, como en el inventario. El ID y la ronda los pinta el
tablero por su cuenta; si se repiten en el título, salen dos veces. El porqué de una ronda (qué
pidió el PM) va en `approved.json` y en el inventario, no en el título.

## 5. El HTML de una pantalla

- Un archivo por pantalla, `<ID>-<nombre>.html`. Estados adicionales como archivos aparte
  (`--vacio`, `--error`, `--exito`) solo cuando los criterios del requisito los definen.
- `<!DOCTYPE html>`, `<html lang="es">`, `<link rel="stylesheet" href="../design-system.css">`.
- Estructura semántica: `<header>` con la navegación del rol (solo sus módulos, con "dónde
  estoy"), `<main>` con la pantalla, `<nav class="flow">` con anterior, siguiente y volver al
  índice del flujo, y `<footer class="trace">` con la trazabilidad:
  `P-INS-03 · Datos del postulante · cubre RF-INS-004, RF-INS-005 (criterios 1, 2, 4) ·
  dirección B "Una página con secciones" · ronda r1 · generado con Opus el 2026-09-10`.
- Etiquetas y campos: los de `inventory-fields.md`, con el nombre que usa el cliente. Las
  validaciones aparecen como texto de ayuda; los mensajes de error son los literales de los
  criterios. La etiqueta nunca es solo el placeholder.
- Datos de ejemplo realistas del dominio del cliente. Nunca lorem ipsum ni "texto aquí".
- Sin JavaScript, sin frameworks, sin fuentes ni recursos externos: abre desde el disco sin
  red. Lo particular de una pantalla va en un `<style>` corto dentro de su archivo.
- Ancho de referencia: 1440 px en escritorio, 390 px en móvil o PDA, con botones de 44 px
  como mínimo.
- El HTML no funciona: los botones no hacen nada. Si hay que mostrar una transición, es
  otra pantalla o un estado.

## 6. `design-system.css`

Se genera en el paso 2 desde `design-system.md` y se regenera cuando este cambia. No se
edita a mano por pantalla. Con el design system del cliente o una librería pública (caminos 1
y 2), la librería va en `mockups/vendor/` y este archivo solo define las variables de abajo y
lo que la librería no trae. Con uno propio (camino 3), este archivo se escribe completo desde
esta sección.

- `:root` con las variables: `--color-primario`, `--color-secundario`, `--color-fondo`,
  `--color-superficie`, `--color-texto`, `--color-texto-suave`, `--color-borde`,
  `--color-exito`, `--color-aviso`, `--color-error`, `--fuente-titulos`, `--fuente-cuerpo`,
  `--tamano-base` (16 px como mínimo), `--espacio-1` a `--espacio-6`, `--radio-sm`,
  `--radio-md`, `--radio-lg`.
- Componentes base, solo los que usa el inventario: `.boton`, `.boton-secundario`, `.campo`
  (etiqueta, control, ayuda, error), `.tabla`, `.pasos`, `.aviso`, `.vacio`, `.tarjeta`,
  `.nav-app`, `.flow`, `.trace`.
- Unas 250 líneas como máximo.

## 7. Los índices

`mockups/index.html`: la lista de flujos, cada uno con enlace a su `index.html`, cuántas
pantallas tiene y su estado. `mockups/<flujo>/index.html`: las pantallas en orden, con ID,
nombre, requisitos y estado, cada una con enlace. Los dos usan `design-system.css`.
