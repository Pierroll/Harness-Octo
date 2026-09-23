---
name: ui-design
description: >
  Corre el paso de UI/UX de la etapa 3. A partir del RF detallado, el brief de diseño y la
  tabla de roles decide qué flujos necesitan diseño y qué pantallas tiene cada uno; arma el
  design system; escribe tres direcciones en texto por pantalla, genera tres imágenes con
  OpenAI, las pone en un tablero en el navegador para que el PM elija con el equipo de
  diseño, y convierte solo la elegida en mockups HTML por flujo para presentarle al
  cliente. Usar cuando el usuario diga "diseña las pantallas", "arma los mockups",
  "inventario de pantallas", "flujos y pantallas", "design system", "muéstrame opciones de
  diseño", "cómo se va a ver", o al abrir la etapa 3 con el RF detallado cerrado. DECIDE
  CON MODELO FRONTERA (Fable; si no está, Opus) y genera HTML y CSS con Opus en subagentes.
  Las imágenes las hace OpenAI: necesita OPENAI_API_KEY en la máquina del PM. El paso a
  Figma usa el servidor MCP de html.to.design, autenticado una vez por PM.
---

# UI design: flujos, pantallas y mockups que el cliente puede ver

Este skill es el paso de UI/UX de la etapa 3 (`stages/3-design/STAGE.md`), en el orden
que describió Darío Calero: definir qué flujos necesitan diseño y qué vistas generar, armar
un design system, armar el HTML de los flujos clave, presentarlo al cliente y, con sus
cambios, diseñar cada flujo. El mecanismo de alternativas, tablero y elección está portado
de `/design-shotgun` de gstack (garrytan/gstack, MIT; originales en `sources/gstack/`).
Los acuerdos que lo definen son A27 a A35 de `AGREEMENTS.md`.

Produce, en `discovery/3-design/outputs/`: `screen-inventory.md` (sobre
`harness/templates/screen-inventory.md`), `design-system.md` (sobre
`harness/templates/design-system.md`) y la carpeta `mockups/` con el CSS, las imágenes, los
tableros y los HTML por flujo. Dónde va cada archivo y cómo se nombra:
`references/mockup-conventions.md`.

## Lo que está confirmado con el equipo de diseño y lo que no

Milko Rivera y Diego López confirmaron el 3 de septiembre de 2026 cómo trabajan: el HTML es
lo primero que presentan al cliente, sirve para mostrar cosas nuevas y validarlas, y una vez
validado lo pasan a Figma; los cambios que vienen después se hacen directamente en Figma.
Eso es lo que hacen los pasos 5 a 8 de este skill.

También confirmaron cómo arman el design system: uno por cliente, reutilizando bloques de
proyectos anteriores y cambiando los átomos, y el del cliente cuando ya lo tiene. Así está
escrito el paso 2.

Los criterios de `references/structural-filter.md` son propuesta nuestra, cruzada el 3 de
septiembre con el documento que entregó el equipo de diseño, "Antes del RF"
(`sources/antes-del-rf-equipo-diseno.md`, A37); falta que ellos los lean. El paso del HTML
validado a Figma es el paso 9: el servidor MCP de html.to.design importa cada HTML como capas
editables, sin plugin a mano. Falta que diseño lo vea funcionar sobre un proyecto real.

## Regla de modelo

Los pasos que deciden corren con Fable: el inventario (paso 1), el brief visual y las
direcciones visuales (2a y 2b), las direcciones por pantalla (3), la verificación de
trazabilidad (6) y decidir qué contradice qué cuando llega el feedback del cliente (7). Si
Fable no está disponible se corre con Opus, nunca con menos, y se avisa antes de empezar.
El HTML, el CSS, la revisión de imágenes y las ediciones los hacen subagentes con
`model: opus` (Agent tool). Las imágenes las genera OpenAI con `scripts/image.mjs`. Cada
artefacto anota en su cabecera con qué modelo se produjo: es lo que mira el checkpoint.

## Antes de empezar

1. El veredicto de `harness/skills/entry-check/` sobre las cinco entradas de la etapa 3
   (`stages/3-design/CONTRACT.md`). Sin veredicto, este skill no abre.
2. El RF detallado en markdown: `discovery/2-analysis/outputs/requirements-full.md`. Si el
   proyecto solo tiene el Word, se convierte y se lee la copia, que es material de entrada
   y no se edita:
   ```bash
   pandoc "discovery/2-analysis/outputs/ready-to-take/Requisitos_<cliente>.docx" -t gfm \
     -o discovery/3-design/inputs/requirements-full.md
   ```
3. Los demás insumos: `scope-decisions.md`, `roles-table.md`, `design-brief.md` (secciones
   2, 3, 4, 6 y 9), `inventory-fields.md`, `inventory-states.md`, `overrides.md` (marca y
   restricciones) y, si el proyecto hizo mockups de viabilidad, sus `feasibility-*.md`:
   son insumo de este paso, no lo reemplazan.
4. Node 18 o superior (`node --version`) y la clave de OpenAI, que se verifica antes del
   paso 2c: `OPENAI_API_KEY` en el entorno o `~/.config/OCTO/openai-key`. Si no está,
   el skill lo dice y se detiene en el paso 2b. No hay versión "sin imágenes" que se
   disimule como completa; la excepción está en modos de fallo.
5. El modelo de la sesión. Si no es Fable ni Opus, avisar y no producir el inventario.
6. Para el paso 9, el servidor MCP de html.to.design instalado y autenticado en la máquina
   del PM: `claude mcp add --scope user --transport http html-to-design https://mcp.to.design`
   y completar el OAuth desde `/mcp`. `claude mcp list` tiene que mostrarlo sin "Needs
   authentication". Se verifica al llegar al paso 9, no al abrir el skill; si falta, el paso
   9 lo dice y se detiene.
7. Solo si el proyecto va por el camino 1 con una librería de Figma del cliente: el MCP
   oficial de Figma en modo lectura, `claude mcp add --scope user --transport http figma
   https://mcp.figma.com/mcp`, con el archivo compartido a la cuenta del PM.

## Paso 0. Abrir

Leer todo lo anterior. Si hay mockups de viabilidad, anotar qué flujos ya cubren. Copiar
`harness/templates/screen-inventory.md` a `discovery/3-design/outputs/screen-inventory.md`
y `harness/templates/design-system.md` a `discovery/3-design/outputs/design-system.md`.

## Paso 1. Inventario de flujos y pantallas [Fable]

Cómo se arma, con lo que el arnés ya produce:

- Un flujo es la secuencia de requisitos que un rol ejecuta para lograr el beneficio de su
  historia: en "Como X quiero Y para Z", Z es el flujo. Se agrupa por módulo, rol y las
  dependencias entre requisitos. Solo entran los requisitos con estado dentro en
  `scope-decisions.md`; los diferidos van a la sección 7 del inventario.
- Cada paso del "Flujo de interacción" de un requisito es una pantalla o un estado de una
  pantalla. Cada criterio Dado/Cuando/Entonces de error o de vacío es un estado que se
  dibuja. Las transiciones del mapa de estados que dispara una persona son acciones de una
  pantalla; las terminales suelen ser confirmaciones.
- Cada pantalla cita los requisitos y los criterios que cubre, por ID. Una pantalla sin
  requisito no existe. Un requisito dentro del alcance sin pantalla es un hueco y queda en
  la sección 6 hasta que se resuelva.
- Rol y dispositivo salen de "Rol principal" e "Interfaz" del requisito. El perfil real del
  rol (brief, sección 3) dice cómo se le habla y qué densidad aguanta.
- Se marca la pantalla representativa para el design system: la más usada o la más cargada
  de datos.

Mostrar al PM la lista de flujos y pantallas (ID, nombre, requisitos) con AskUserQuestion
y ajustar. Máximo dos rondas. La cabecera del inventario lleva `**Producido con:**` y las
versiones de las fuentes.

## Paso 2. Design system

Cómo trabaja el equipo de diseño, confirmado el 3 de septiembre de 2026: el design system es
por cliente, porque cada cliente es distinto, y no se arma de cero. Se copian bloques de
variables, estilos y componentes de proyectos anteriores, se cambian los átomos (colores,
tipografía, radios) para el cliente y se crea lo nuevo. Si el cliente ya tiene el suyo, se
usa el suyo: ahorra trabajo y es lo correcto. Este paso hace lo mismo. Lo primero es saber
qué camino aplica: la sección 9 del brief y `overrides.md` lo dicen, y si no está claro se
le pregunta al PM.

El design system es una pieza que se enchufa, no algo que este skill inventa. La decisión es
una sola: **caso A, el cliente trae base** (una librería de Figma, su sitio, un manual de
marca en PDF, capturas de su producto) y se lee la suya, camino 1. **Caso B, no trae nada:**
camino 2 si el PM quiere una librería conocida, camino 3 si quiere identidad propia. Tres
caminos, y el que aplica se declara en la cabecera de `design-system.md`:

**Camino 1, el cliente tiene design system.** Se documenta el suyo en `design-system.md`
(tokens, componentes, y dónde está el original) y se escribe `mockups/design-system.css` con
esos valores. No hay tablero de dirección visual, porque la dirección ya existe. Cómo se lee
la base depende de lo que el cliente entregue:

- *Librería o archivo de Figma.* Con el MCP oficial de Figma en modo lectura ("Antes de
  empezar", punto 7): variables, estilos de texto, colores, componentes y sus variantes. El
  cliente tiene que compartir el archivo con la cuenta del PM. Si no comparte acceso o el
  MCP no está, se le pide exportar los estilos o mandar capturas, y se sigue por la
  entrada de capturas.
- *Sitio web.* `curl` de la página y de cada hoja de estilo que enlaza (`<link
  rel="stylesheet">`), más una captura de pantalla con el navegador. De ahí salen
  tipografía, paleta, radios, espaciado y los componentes que ya usan.
- *Manual de marca en PDF, capturas del producto.* Se leen directo con el modelo (Read).

La sección 2 de `design-system.md` se escribe como "Base del cliente": qué material se leyó
y de dónde, qué se respetó tal cual, y qué faltaba (por ejemplo, la marca tiene logo y
paleta pero ningún componente de formulario) y se completó con criterio propio, cada hueco
con dueño para confirmarlo con el cliente. Las imágenes del paso 4 llevan esos tokens y una
captura de su producto como referencia.

**Camino 2, se adopta una librería pública.** Ant Design, Bootstrap, shadcn/ui, Material o la
que el proyecto declare en `overrides.md`. `design-system.md` la nombra con versión y anota
solo los átomos que se cambian para el cliente (color primario, tipografía, radios).
`mockups/design-system.css` carga la librería desde una copia local en `mockups/vendor/`
(los mockups abren sin red) y encima define las variables de la sección 6 de
`references/mockup-conventions.md` con esos átomos. Tampoco hay tablero de dirección: las
tres direcciones del paso 3 varían estructura, no estilo. Es el camino por defecto cuando el
cliente no trae nada y el PM no pide una identidad propia.

**Camino 3, se arma uno para el cliente.** Cuando el producto necesita identidad propia. El
tablero decide los átomos con los pasos 2a a 2d, y el CSS se escribe desde la sección 6 de
`references/mockup-conventions.md`. Es lo que hace diseño en Figma al copiar bloques de un
proyecto a otro y cambiar los átomos: acá los bloques son las clases de esa sección y los
átomos son las variables. Las direcciones del paso 2b se escriben con el catálogo de
`references/ux-doctrine.md` (direcciones estéticas, decoración, color, tipografía por rol).

Cualquiera de los tres deja el mismo resultado: `design-system.md` con tokens y componentes,
y `mockups/design-system.css` que el HTML del paso 5 consume sin saber de dónde salió.

**2a. Brief visual [Fable].** De `design-brief.md` (secciones 1, 3 y 9) y `overrides.md`:
qué es el producto, quién lo usa y dónde, marca y restricciones (colores, tipografías,
accesibilidad, dispositivos). Una pregunta opcional al PM: "¿qué es lo único que el cliente
quiere que se recuerde de esto?" Si no lo sabe, queda como pendiente con dueño. Va a las
secciones 1 y 8 de `design-system.md`.

**2b. Tres direcciones visuales [Fable].** Sobre la pantalla representativa, tres
direcciones que difieran en tipografía, paleta y disposición. Aquí sí aplica la regla
completa de gstack: si se pudiera intercambiar el título entre dos y nadie lo notara, una
falló. Cada dirección lleva nombre, una línea, qué mantiene convencional (lo que el usuario
espera de su rubro) y qué la hace distinta. Si el cliente trae marca, las tres la respetan
y varían lo demás. Nada de la lista de `references/ux-doctrine.md`. AskUserQuestion:
generar las tres, cambiar alguna, o pedir otras más arriesgadas. Máximo dos rondas.

**2c. Imágenes y tablero.** Como dice "Cómo se generan las imágenes" y "El tablero", en
`mockups/design-system/`, ronda `r1/`, calidad alta si el PM lo pide (es la única pantalla
donde vale). El PM elige con el equipo de diseño; si diseño no está, elige el PM y queda
anotado en la bitácora.

**2d. Design system escrito [Opus].** Un subagente mira la imagen aprobada (Read) y
completa `design-system.md`: tokens exactos (hex, familias, escala, espaciado, radios), los
componentes que usan las pantallas del inventario, y la bitácora con la decisión y su
razón. Y escribe `mockups/design-system.css` con las variables y los componentes base
(`references/mockup-conventions.md`, sección 6).

## Paso 3. Direcciones por pantalla [Fable]

Para cada pantalla del inventario, en orden de flujo, tres direcciones en texto ya pasadas
por `references/structural-filter.md`: ninguna tiene más campos por vista de los que el
filtro permite, cada una dice cómo agrupa y por qué, y para quién y en qué dispositivo.
Aquí las direcciones difieren en estructura, disposición, agrupación y navegación, no en
tipografía ni color: eso ya lo fijó el design system.

Ejemplo, un requisito de dieciocho campos: A "Cuatro pasos", un paso por tipo de dato con
barra de progreso; B "Una página con secciones", plegables y con resumen a la derecha; C
"Pestañas", una por tipo de dato con guardado por pestaña.

Se presentan flujo por flujo, todas las pantallas del flujo en una sola AskUserQuestion, y
el PM confirma o cambia. Máximo dos rondas por flujo. Quedan en la sección 3 del inventario
con el criterio del filtro que las disparó. Nada se dibuja sin dirección confirmada.

Si el PM decide que una pantalla no necesita alternativas, se anota con su nombre y fecha y
se genera una sola. La regla general es tres (A30).

## Paso 4. Imágenes por pantalla y tablero por flujo

Por cada pantalla: un brief por dirección (`references/mockup-conventions.md`, sección 3)
en `mockups/<flujo>/<ID>/brief-<letra>.md`, con los tokens del design system y
`--reference` a la imagen aprobada del paso 2, para que las pantallas se parezcan entre sí.
Imágenes en `mockups/<flujo>/<ID>/r1/`. Un `sets.json` por flujo con todas sus pantallas,
un tablero por flujo. Elección, regeneración por pantalla y `approved.json` por pantalla,
como dice "El tablero". El inventario se actualiza: dirección elegida, razón (estrellas y
comentarios), estado `imagen aprobada`.

## Paso 5. HTML de la pantalla elegida [Opus, un subagente por pantalla]

Cada subagente recibe: la imagen aprobada, la ficha del requisito (flujo de interacción y
criterios), los campos reales de `inventory-fields.md`, el vocabulario del cliente (brief,
sección 2), `mockups/design-system.css` y la sección 5 de `references/mockup-conventions.md`.
Escribe `mockups/<flujo>/<ID>-<nombre>.html` y los estados que los criterios definen
(`--vacio`, `--error`, `--exito`). Sin JavaScript, sin frameworks, sin recursos externos.
Banner de trazabilidad al pie. Enlaces anterior y siguiente.

Plantilla del prompt del subagente:

```
Escribe el mockup HTML de una pantalla aprobada. Es una vista, sin lógica.
Imagen aprobada: <ruta absoluta>. Mírala con Read y respétala: es la fuente de verdad del
layout. El texto de la imagen no vale; las etiquetas reales están abajo.
Pantalla: <ID> <nombre>. Requisitos: <IDs con su flujo de interacción y criterios, pegados>.
Campos: <los de inventory-fields.md para esta pantalla, con validaciones>.
Vocabulario del cliente: <palabras que usa, pegadas del brief>.
CSS: <ruta absoluta de design-system.css>; usa sus variables y clases, y un <style> corto
solo para lo particular de esta pantalla.
Convenciones: <ruta absoluta de references/mockup-conventions.md>, sección 5.
Estados a escribir como archivos aparte: <lista o "ninguno">.
Enlaces: anterior <archivo>, siguiente <archivo>, índice del flujo index.html.
Banner de trazabilidad: "<ID> · <nombre> · cubre <RF y criterios> · dirección <letra>
"<nombre>" · ronda <rN> · generado con Opus el <fecha>".
Guarda en <ruta absoluta del HTML> y responde con la lista de archivos escritos.
```

Después, `mockups/<flujo>/index.html` y `mockups/index.html` (sección 7 de las
convenciones). Abrir con `open discovery/3-design/outputs/mockups/index.html`. Estado
`html listo`.

## Paso 6. Revisión interna

El PM recorre los flujos y pide cambios. Un subagente Opus edita solo las líneas que
cambian (Edit; nunca se regenera el archivo), máximo diez rondas por pantalla. Antes de
cerrar, con Fable, la verificación de trazabilidad en los dos sentidos: cada requisito
dentro del alcance tiene al menos una pantalla, ningún requisito fuera o diferido aparece,
ninguna pantalla queda sin requisito. Se llena la sección 6 del inventario, que debe quedar
vacía.

## Paso 7. Presentación al cliente

Confirmado por el equipo de diseño: el HTML es lo primero que se le presenta al cliente y con
lo que se validan las pantallas nuevas.

El PM presenta desde `mockups/index.html`, con la pantalla compartida, o envía la carpeta
`mockups/` completa: abre sin servidor. El feedback va a la sección 5 del inventario:
fecha, pantalla, qué dijo (cita), decisión (aplicado, pendiente con dueño, o descartado con
razón). Lo que contradice un requisito aprobado, la tabla de roles o el To-Be lleva la
marca `contradice: <ruta>` y se corre `harness/skills/reopen-artifact/`, que decide qué más
cambia; no se dibuja lo nuevo hasta que el requisito cambie. Un cambio visual vuelve al
paso 6 solo en las pantallas tocadas; un cambio de estructura vuelve al paso 3 para esa
pantalla. Como los mockups ya se mostraron, la versión anterior se congela en
`outputs/versions/` (regla 10 de `AGENTS.md`). Esto vale hasta que el cliente valida: con el
HTML validado el paso cierra, y los cambios que pida después se hacen en Figma, no en el
HTML. El HTML validado es la versión que diseño recibe.

## Paso 8. Cierre

Estado final por pantalla en el inventario: `aprobada por el cliente`, o `con cambios
pendientes` con dueño y fecha. El paquete para el equipo de diseño es el inventario, el
design system, `mockups/` con el HTML validado y el archivo de Figma que deja el paso 9.
Desde ahí los cambios se hacen en Figma (confirmado el 3 de septiembre de 2026).
`harness/skills/team-review/` y `harness/skills/estimation/` leen el inventario y los
mockups desde aquí. Checkpoint en sesión fresca (`harness/skills/checkpoint-review/`)
contra el criterio 1 de `stages/3-design/STAGE.md`; el checklist marca P3.1 a P3.3 cuando
los archivos existen.

## Paso 9. HTML validado a Figma

El HTML que el cliente validó pasa a Figma como capas editables, para que diseño siga
trabajando ahí sin redibujar. Lo hace el servidor MCP de html.to.design desde esta misma
sesión; el plugin de Figma del mismo nombre queda como camino manual si el MCP falla.

1. **Qué se lleva.** Las pantallas con estado `aprobada por el cliente` en el inventario. Si
   el PM decide llevar también las `con cambios pendientes` para que diseño trabaje sobre
   ellas, se anota en la sección 8 del inventario con su nombre y la fecha. Las imágenes
   de las rondas y los tableros no se importan: son historia de la decisión, no diseño.
2. **Copia autocontenida.** Los HTML de `mockups/` enlazan `../design-system.css` y el
   importador recibe un solo documento, así que se genera una copia con el CSS inlineado,
   fuera de `mockups/`:
   ```bash
   node harness/skills/ui-design/scripts/figma-export.mjs \
     --in discovery/3-design/outputs/mockups --out .build/figma
   ```
   El script recorre `<flujo>/P-*.html`, salta índices y tableros, y falla si el CSS tiene
   `@import` o `url()`, porque entonces no es autocontenido y el importador perdería algo.
3. **Importar.** Una llamada a la herramienta `import-html` del MCP por pantalla, con el
   HTML de `.build/figma/`. Nombre del frame: ID y nombre de la pantalla (`P-CON-02
   Respuesta con visualización`); los estados como frames hermanos con el sufijo del
   archivo (`P-CON-02 · restringido`). Ancho: 1440 en escritorio, 390 en móvil, según lo
   que el inventario diga de esa pantalla. Un archivo de Figma por proyecto; una página por
   flujo si la herramienta lo permite, y si no, el nombre del flujo como prefijo del frame.
   Los parámetros exactos de `import-html` se leen del esquema que expone el servidor al
   conectarlo, y la primera corrida de cada máquina los anota aquí si cambiaron. Si el
   servidor no acepta HTML en línea, `import-url` contra un servidor local que sirva
   `mockups/` (el de `scripts/board.mjs` sirve).
4. **Registro.** En la sección 8 del inventario: URL del archivo de Figma, fecha, cuántas
   pantallas de cuántas entraron, y la lista de lo que el importador no respetó (fuentes
   que Figma no tiene instaladas, grillas, un componente partido en capas). El estado de
   cada pantalla importada gana `en Figma desde <fecha>`. A partir de ahí los cambios se
   hacen en Figma, no en el HTML (A27); el HTML queda como registro de lo que el cliente
   validó.
5. **Verificación.** Abrir el archivo en Figma y comparar tres frames contra su HTML en el
   navegador: tipografía, paleta, orden de los bloques. Lo que no coincida va a la lista
   del punto 4, no se arregla en el HTML.

## Cómo se generan las imágenes

Antes de la primera: `[ -n "$OPENAI_API_KEY" ] || [ -s ~/.config/OCTO/openai-key ]`.
Si falla, parar y decir cómo ponerla (ver modos de fallo).

Un subagente por imagen, todos lanzados en un solo mensaje para que corran en paralelo,
con `model: opus`. Plantilla del prompt, con todas las rutas absolutas:

```
Genera una alternativa de diseño y revísala.
Script: node <repo>/harness/skills/ui-design/scripts/image.mjs
Brief: <carpeta de la pantalla>/brief-<letra>.md
Salida: <carpeta de la pantalla>/r<N>/variant-<letra>.jpg
Referencia: <imagen aprobada del design system, o "ninguna" si es el paso 2c>
Pasos:
1. node <script> generate --brief-file <brief> --out <salida> --quality medium
   [--reference <referencia>]. El script reintenta solo ante 429; si aun así falla, espera
   veinte segundos y vuelve a correrlo, hasta dos veces.
2. Revisa la imagen con Read contra el brief. Tres preguntas: ¿están los elementos que
   definen la dirección (encabezado, título, indicador, botón y la forma de agrupar los
   campos)? ¿parece una interfaz real que sigue el design system, y no arte ni un collage?
   ¿cae en algún patrón de <ruta>/references/ux-doctrine.md? El texto dentro de la imagen
   puede salir mal escrito, y un campo puede faltar o fusionarse con otro: eso no es fallo
   ni se corrige aquí, se corrige en el HTML. Si falla alguna de las tres, ajusta el brief
   en una línea y genera una vez más. El copy no lo revisas a ojo: el script ya corrió el
   OCR y te dijo en `COPY MAL` y `COPY FALTA` qué palabras no coinciden con el brief.
   Repórtalas tal cual en tu respuesta, sin regenerar por ellas.
3. Responde una sola línea: VARIANT_<letra>_DONE: <bytes> | VARIANT_<letra>_FAILED: <error>
   | VARIANT_<letra>_RATE_LIMITED.
```

Cuando terminan: mostrar cada imagen con Read para que el PM las vea en la terminal antes
del tablero, y decir cuántas salieron y cuántas fallaron, con el error. Si fallaron todas,
generar en serie, de a una, y avisar. Calidad media por defecto; alta solo en la pantalla
del design system si el PM lo pide.

## El tablero

```bash
node harness/skills/ui-design/scripts/board.mjs \
  --sets "discovery/3-design/outputs/mockups/<flujo>/sets.json" \
  --out "discovery/3-design/outputs/mockups/<flujo>/board.html" \
  --serve --port 8765 --timeout 540 --title "Flujo: <nombre>" \
  2> "discovery/3-design/outputs/mockups/<flujo>/board.log"
```

Se corre **en primer plano**, con el timeout de la herramienta Bash en diez minutos, y abre
el tablero en el navegador del PM. El proceso termina solo cuando el PM decide, así que el
agente no pregunta nada ni espera que el PM vuelva a la terminal a avisar:

- **Sale con 0:** el PM pulsó "Enviar mi elección". `feedback.json` está junto al HTML y la
  pestaña se cierra sola si el navegador lo permite (si no, dice que ya se puede cerrar). Se
  resume por pantalla lo elegido (estrellas, comentarios, dirección), se escribe
  `approved.json` en la carpeta de cada pantalla y se actualiza el inventario.
- **Sale con 3:** el PM pidió regenerar una pantalla. `feedback-pending.json` trae `screen` y
  `regenerateAction`; se mueve a la carpeta de la ronda que cierra (`<ID>/r<N>/`), como
  registro de por qué hubo otra. `different`: tres direcciones nuevas para esa pantalla,
  volviendo al paso 3 solo para ella. `match`: las mismas direcciones, más apegadas al design
  system. `more_like_<letra>`: tres variaciones de esa alternativa. Texto libre: se aplica tal
  cual. Se genera la ronda nueva en `r<N+1>/` (la anterior queda), se reescribe `sets.json`
  con esa ronda y se vuelve a correr el mismo comando, mismo puerto. La pestaña del PM quedó
  esperando y se recarga sola, conservando lo elegido en las otras pantallas.
- **Sale con 1:** pasaron `--timeout` segundos sin actividad. Se vuelve a correr el mismo
  comando: el tablero conserva lo marcado (queda en el navegador) y el PM sigue donde estaba.

Cada envío queda en `board.log` (`BOARD_URL:`, `BOARD_FEEDBACK:`). Si el PM no puede abrir
el navegador, le pides la elección por texto y queda anotado en el inventario (modo
degradado). En ningún otro caso se le pregunta al PM qué alternativa prefiere por texto: el
tablero es quien elige.

El tablero abre en cuadrícula, con las tres alternativas lado a lado, y su estilo es neutro
(blanco, negro, bordes finos): no compite con las imágenes que se están juzgando.

## Reglas

- Nada se dibuja sin su dirección en texto confirmada por el PM.
- Tres alternativas por pantalla (A30). Solo la aprobada pasa a HTML.
- Nada se borra: las rondas quedan en `r1/`, `r2/`, y el inventario dice qué se eligió y
  por qué.
- El HTML es una vista: sin JavaScript, sin lógica, sin recursos externos. Un HTML que
  "funciona" es una prueba de concepto y eso es `harness/skills/feasibility-demo/`.
- Las etiquetas del HTML son las de `inventory-fields.md` con el vocabulario del cliente.
  Las de las imágenes no valen.
- Todo artefacto anota su modelo. Lo que decide corre con Fable u Opus; lo que dibuja, con
  Opus.
- La clave de OpenAI nunca se escribe en el repo, en un brief ni en el inventario.
- Calidad media por defecto. Alta solo en la pantalla del design system, si el PM lo pide.
- Sin decisiones de diseño en los requisitos. Si al dibujar aparece un requisito nuevo o
  uno mal escrito, es `contradice:` y va por `reopen-artifact`; no se arregla en el mockup.

## Qué cambia respecto de gstack

Igual: direcciones en texto antes de gastar, subagentes en paralelo, el tablero elige,
feedback a disco, recarga en la misma pestaña, nada se borra, refinamiento por ediciones.
Adaptado: Node en lugar de Bun, un tablero por flujo, Claude revisa las imágenes y extrae
los tokens en lugar de GPT-4o, las direcciones por pantalla difieren en estructura y no en
tipografía porque el design system ya está fijado, HTML estático en español. Fuera por
ahora: memoria de gusto entre proyectos, galería, voces externas de Codex, Pretext y
capturas por viewport.

## Modos de fallo

- **No hay clave de OpenAI.** Parar en el paso 2b y decir cómo ponerla: `export
  OPENAI_API_KEY=...` en `~/.zshrc` y abrir una terminal nueva, o el archivo
  `~/.config/OCTO/openai-key` con permisos 600. No seguir "en texto" como si fuera lo
  mismo.
- **403, organización sin verificar.** El script lo dice. Se verifica en el panel de OpenAI
  y se espera hasta quince minutos.
- **429, límite de tasa.** El script reintenta. Si sigue, se genera en serie.
- **La imagen da vergüenza** (patrones de `ux-doctrine.md`). Se regenera antes de
  mostrarla. Una imagen mediocre es peor que ninguna.
- **La imagen pierde un campo, fusiona dos o corta el botón.** No se regenera por eso: el
  modelo no logra cinco campos en el alto de un móvil sin sacrificar algo. La imagen fija la
  dirección; los campos reales van en el HTML. Se anota en el inventario.
- **El PM quiere saltarse las imágenes e ir directo al HTML.** Se puede. Queda en el
  inventario ("sin alternativas, decisión de <PM>, <fecha>") y las direcciones en texto se
  confirman igual.
- **El cliente pide algo que contradice un requisito aprobado.** `contradice:` y
  `reopen-artifact`. No se dibuja lo nuevo hasta que el requisito cambie.
- **El brief de diseño es anterior a un cambio de roles o estados.** `entry-check` lo marca
  desactualizado y no se diseña encima.
- **El equipo de diseño no está para elegir.** Elige el PM, se anota, y se les muestra
  después. Si cambian algo, es una ronda más, no un rediseño.
- **La sesión no corre en Fable ni Opus.** Avisar y no producir el inventario.
- **El repo pesa demasiado.** Bajar a `--quality low` para las rondas siguientes y anotarlo.
  No se borran rondas.
- **El PM pide "elige tú".** El agente no elige. Da su recomendación con razón y el PM
  confirma en el tablero o por texto.
- **El MCP de html.to.design no está instalado o no está autenticado.** El paso 9 para, da
  el comando del punto 6 de "Antes de empezar" y no importa nada a mano.
- **html.to.design se queda sin importaciones del plan.** Parar, decir cuántas pantallas
  faltan y cuál es el cupo. No se deja un archivo de Figma a medias sin anotarlo en la
  sección 8 del inventario.
- **El cliente trae Figma pero no comparte el acceso.** Camino 1 por capturas y exportación
  de estilos; cada token que se infiera de una captura queda como hueco con dueño.
- **Cualquier fallo que no esté aquí** se anota con `harness/skills/friction-log/` antes de
  seguir.
