---
name: requisitos-full
description: >
  Genera el documento COMPLETO de Requisitos Funcionales y No Funcionales de un proyecto
  de Codeable Labs, con ficha detallada por requisito: historia de usuario, actor, rol,
  dependencias, interfaz, flujo de interacción y criterios de aceptación en formato
  Dado/Cuando/Entonces. Entrega un .docx con la plantilla corporativa (solo logo Codeable
  Labs, sin logo de cliente). Activa SIEMPRE que el usuario pida "requisitos full",
  "requisitos completos", "requisitos detallados", "historias de usuario", "criterios de
  aceptación", "Dado/Cuando/Entonces", "Gherkin", "user stories", "requisitos con flujo",
  "documento de requisitos detallado", o cualquier variante que implique un levantamiento
  exhaustivo y no un listado resumido. También aplica cuando el usuario comparta
  transcripciones de Discovery, un PRD o un backlog y pida "arma las historias",
  "detalla los requisitos" o "necesito los criterios de aceptación". Si el usuario pide
  requisitos breves o un listado simple, usa `requisitos-lite` en su lugar.
---

# Requisitos Full — Requerimientos detallados con historias y criterios

Este skill convierte insumos de discovery (transcripciones, actas, notas, PRDs,
propuestas, backlogs) en un documento formal y **exhaustivo** de Requisitos Funcionales
y No Funcionales, donde cada requisito es una ficha completa con su historia de usuario,
dependencias, flujo y criterios de aceptación verificables.

## Relación con los otros skills de requisitos

| Skill | Output | Cuándo usarlo |
|---|---|---|
| `requisitos-lite` | Párrafo por requisito, agrupado por módulo | Levantamiento rápido, anexo de propuesta, alcance chico o medio |
| **`requisitos-full`** (este) | Ficha completa por requisito con criterios D/C/E | Proyecto en ejecución, equipo de desarrollo y QA como audiencia, alcance complejo |
| `srs-generation` | SRS completo en Markdown (IEEE 830) | Se necesita el documento SRS formal con matriz CRUD y trazabilidad al PRD |

Si el usuario no especifica y el contexto es ambiguo, pregunta cuál necesita antes de
generar: el esfuerzo y el tamaño del resultado son muy distintos.

---

## Archivos de referencia (léelos siempre antes de redactar)

- `references/guia-requisitos-funcionales.md` — Guía de estilo para RF. Aplica la
  **sección 2** (estructura Sujeto-Acción-Restricción) en el campo Descripción, la
  **sección 3** (términos recomendados como sujeto), la **sección 4** (verbos por
  categoría) y la **sección 7** (formato Gherkin), que es la base de los criterios de
  aceptación de este skill.
- `references/guia-requisitos-no-funcionales.md` — Guía de estilo para RNF. Léela
  completa: principios (sección 1), estructura sujeto+restricción+métrica (sección 2),
  clasificación por categoría (sección 3), criterio SMART (sección 8) y errores comunes
  (sección 9).
- `references/ejemplo-generador.js` — **Script Node completo y probado.** Pártelo de
  aquí: copia el script, reemplaza el contenido del array `children` y ejecútalo.
  Exporta los helpers `titulo`, `subtitulo`, `meta`, `parrafo`, `nota`,
  `seccionHeader`, `subseccionHeader`, `reqHistoria`, `reqTabla`, `rnfTabla` y
  `tablaDatos`, ya calibrados con la paleta corporativa.
- `/mnt/skills/public/docx/SKILL.md` — Librería `docx` de Node. Léelo antes de escribir
  cualquier línea de código.

---

## Flujo del skill

### Paso 1 — Reunir los insumos del discovery

Recopila todo el contexto disponible antes de redactar:

- Archivos subidos por el usuario (transcripciones, actas, PRDs, backlogs, propuestas).
- Documentos de Google Drive que el usuario mencione (`google_drive_search` /
  `google_drive_fetch`).
- Contexto ya presente en la conversación (resúmenes de `meeting-summary`, notas de
  `propuesta-labs`, agendas de `codeable-kickoff-discovery`).
- Si el usuario alude a sesiones previas ("el discovery de la semana pasada"), busca en
  el historial con `conversation_search` / `recent_chats` antes de preguntar.

Este skill exige mucho más detalle que `requisitos-lite`: cada requisito necesita actor,
flujo y criterios. Si los insumos no alcanzan para eso, **dilo antes de generar** y
propón una de dos salidas: (a) generar solo los requisitos que sí tienen respaldo, o
(b) usar `requisitos-lite` y pasar a full cuando haya más discovery.

### Paso 2 — Elegir la plantilla de ficha

Hay dos plantillas para los RF. Elige una y mantenla en todo el documento:

**A. Ficha de historia de usuario** (`reqHistoria`) — la más completa. Campos:
Historia, Rol principal, Dependencias, Interfaz, Contexto técnico (opcional), Flujo de
interacción (opcional), Criterios de aceptación, Pendiente de validación (opcional),
Nota técnica (opcional). Úsala cuando el proyecto sea de producto, haya varios roles y
canales (Web, Mobile, PDA), o el equipo trabaje con historias de usuario.

**B. Ficha de especificación** (`reqTabla`) — más compacta, estilo SRS. Campos: Módulo,
Descripción, Actor principal, Precondición, Flujo principal, Resultado esperado,
Prioridad. Úsala cuando el documento sea un contrato técnico o vaya a alimentar un SRS.

Si el contexto no lo aclara, pregunta con `ask_user_input_v0`. Default sugerido: **A**
si el usuario mencionó "historias de usuario" o "criterios de aceptación", **B** si
mencionó "SRS", "especificación" o "contrato técnico".

### Paso 3 — Definir la estructura del documento

1. **Secciones mayores** (bandas negras): la numeración de primer nivel del documento —
   Introducción, Requisitos Funcionales, Requisitos No Funcionales, Matriz de
   Trazabilidad, Anexos.
2. **Módulos o grupos funcionales** (bandas azules): cómo se agrupan los RF. Pueden ser
   módulos (`MÓDULO 1 — HOMOLOGACIÓN`) o grupos funcionales
   (`GRUPO FUNCIONAL 4 — PEDATEO Y MANIFIESTO (6 historias)`). Cada grupo lleva un
   párrafo de contexto antes de sus fichas.
3. **Categorías de RNF**: van en el título de cada ficha, con el formato
   `Categoría — Título` (p. ej. `RNF-009  Seguridad — Cifrado en tránsito`). Usa las
   categorías de la sección 3 de la guía RNF: Eficiencia de desempeño, Confiabilidad,
   Recuperabilidad, Seguridad, Operabilidad, Usabilidad, Mantenibilidad, Gobernanza.

### Paso 4 — Redactar los requisitos

Cada campo tiene reglas propias. Ver "Redacción de cada campo" más abajo.

### Paso 5 — Mostrar el borrador para validación

Antes de generar el `.docx`, presenta en el chat la lista de requisitos propuestos
(ID + título, agrupados por módulo) y **una ficha completa de ejemplo** para que el
usuario valide el nivel de detalle. Pide confirmación o ajustes. No generes el documento
final sin este visto bueno, salvo que el usuario pida explícitamente ir directo.

Con más de ~20 requisitos, valida primero la estructura y una ficha; no listes las 20
fichas completas en el chat.

### Paso 6 — Generar el `.docx`

Parte de `references/ejemplo-generador.js`. Ver "Formato del documento" más abajo para
la especificación visual.

### Paso 7 — Verificar y entregar

Renderiza a PDF e inspecciona las páginas antes de entregar:

```bash
python /mnt/skills/public/docx/scripts/office/soffice.py --headless --convert-to pdf salida.docx
pdftotext -layout salida.pdf - | head -60
```

Guarda en `/mnt/user-data/outputs/Requisitos_[Cliente_o_Proyecto].docx` y preséntalo con
`present_files`. Al entregar, resume cuántos RF y RNF se generaron, qué plantilla se usó
y qué quedó marcado como pendiente de validación.

---

## Redacción de cada campo

### Historia (plantilla A)
Formato: **"Como [rol], quiero [capacidad], para [beneficio]."** El rol es una persona o
un sistema (`Como sistema GTH 360, quiero…` es válido para procesos automáticos). El
beneficio debe explicar el valor de negocio, no repetir la capacidad.

### Descripción (plantilla B)
Sigue la estructura Sujeto-Acción-Restricción de la guía funcional: sujeto técnico
definido (nunca "el usuario"), verbo modal **"deberá"**, y la restricción funcional de
la acción.

### Rol principal / Actor principal
Quién ejecuta o dispara el requisito. Si es automático: `Sistema (automático)`. Si
intervienen dos partes, se puede combinar: `Sistema (automático) / Conductor`.

### Dependencias
IDs de otros requisitos con una descripción breve entre paréntesis, separados por `·`:
`RF-TPS-005 (catálogo de placas actualizado) · RF-TPS-017.2 (manifiesto QR vinculado)`.
Si no hay, omite el campo — no escribas "Ninguna" salvo que sea informativo.

### Interfaz
Canales donde opera: `Web`, `Mobile`, `PDA`, `API`, separados por `·`.

### Flujo de interacción / Flujo principal
Pasos numerados, un paso por elemento del array. Cada paso describe una acción
observable del actor o del sistema. No mezcles criterios de aceptación aquí.

### Criterios de aceptación
Formato **Dado / Cuando / Entonces** (sección 7 de la guía funcional). Reglas:

- **Dado que** — el contexto o precondición.
- **cuando** — el disparador concreto.
- **entonces** — el resultado observable y verificable.
- Un criterio por escenario. Cubre el camino feliz **y** los caminos alternativos:
  validaciones que bloquean, errores, casos límite, estados vacíos.
- Los mensajes que ve el usuario van entre comillas literales:
  `muestra: 'Placa no registrada — notificando al Jefe de Transportes'`.
- Evita criterios que solo repiten la historia. Cada uno debe poder convertirse en un
  caso de prueba.

Un requisito con un solo criterio suele estar incompleto: revisa si falta el escenario
de error.

### Contexto técnico (opcional)
Entidades de datos, tipos de campo, catálogos precargados, restricciones de
infraestructura. Úsalo solo cuando el equipo de desarrollo lo necesite para implementar.

### Pendiente de validación (opcional)
Decisiones abiertas con un identificador propio (p. ej. `PA-TPS-GPS-01`), qué está
pendiente y con quién. **Este campo es obligatorio cuando hay un supuesto sin
confirmar** — es preferible declararlo que inventar el valor.

### Nota técnica (opcional)
Aclaraciones, correcciones de versiones anteriores, precisiones de terminología.

### RNF
Título con el formato `Categoría — Título`. La Descripción sigue la estructura
sujeto + restricción de calidad + métrica, y el Criterio de aceptación indica **cómo se
verifica**, con el umbral y las condiciones de medición. Cumple SMART: sin "rápido",
"fácil" ni "robusto" sin una métrica que los respalde.

---

## Formato del documento

**Estructura:**

```
├── Header: SOLO logo Codeable Labs (flotante, izquierda)
├── Título: REQUISITOS FUNCIONALES Y NO FUNCIONALES     (sz=34, bold)
├── Subtítulo: NOMBRE DEL PROYECTO EN MAYÚSCULAS        (sz=24, bold)
├── Línea de versión: Versión X.Y — Mes Año | nota      (sz=20)
├── BANDA NEGRA: "1. INTRODUCCIÓN"
│   ├── BANDA AZUL: "1.1  Propósito del documento" → párrafos
│   └── BANDA AZUL: "1.2  Alcance del sistema"     → párrafos
├── BANDA NEGRA: "2. REQUISITOS FUNCIONALES"
│   ├── BANDA AZUL: "MÓDULO 1 — NOMBRE"
│   ├── Párrafo de contexto del módulo
│   ├── FICHA de requisito (tabla etiqueta|valor)
│   ├── FICHA de requisito
│   └── ...
├── BANDA NEGRA: "3. REQUISITOS NO FUNCIONALES"
│   └── FICHAS de RNF (4 filas cada una)
├── BANDA NEGRA: "4. MATRIZ DE TRAZABILIDAD"   (opcional)
│   └── tablaDatos(...)
└── BANDA NEGRA: "5. ANEXOS"                    (opcional)
```

**Especificación visual:**

| Elemento | Especificación |
|---|---|
| Página | A4 (11909 × 16834 DXA), márgenes top=850, bottom/left/right=567, header/footer=720 |
| Fuente | Inter en todo el documento |
| Título principal | sz=34 (17pt), bold |
| Subtítulo (proyecto) | sz=24 (12pt), bold, MAYÚSCULAS |
| Banda negra (sección) | Tabla 1 fila, ancho 10777, fondo `#000000`, texto blanco sz=20 bold |
| Banda azul (módulo) | Tabla 1 fila, fondo `#F5F9FF`, bordes top/bottom `#3A83F7`, texto sz=20 bold |
| Título de ficha | Fila con `columnSpan: 2`, fondo `#000000`, texto blanco sz=20 bold: `ID  Título` |
| Etiqueta de campo | Columna izquierda 2500 DXA, fondo `#F5F9FF`, texto sz=18 bold |
| Valor de campo | Columna derecha 8277 DXA, sin fondo, texto sz=18, justificado |
| Bordes internos de ficha | Gris `#D9D9D9` size=4 |
| Criterios D/C/E | "Dado que" / "cuando" / "entonces" en bold sz=18, resto normal sz=18 |
| Párrafo de contexto | sz=20, justificado, spacing before=200 line=276 |

**Reglas de formato:**

- Cada requisito es **una tabla independiente** de dos columnas (etiqueta | valor). No
  metas varios requisitos en una misma tabla.
- La fila de título de cada ficha es negra y abarca las dos columnas.
- Omite las filas de campos vacíos: si no hay Dependencias, no dejes la fila en blanco.
- Un párrafo vacío (`vacio()`) entre fichas y entre bloques.
- **Sin bullets.** Los flujos son párrafos numerados a mano dentro de la celda.
- **Sin saltos de página manuales.** El contenido fluye; las bandas marcan los cortes.

## Header — solo logo Codeable Labs

Header flotante con **únicamente** `assets/codeable-logo.png`, anclado a la izquierda:

```javascript
new Header({ children: [new Paragraph({ children: [
  new ImageRun({
    data: logoCodeable, type: "png",
    transformation: { width: 193, height: 16 },
    floating: {
      horizontalPosition: { relative: HorizontalPositionRelativeFrom.COLUMN,  offset: 1 },
      verticalPosition:   { relative: VerticalPositionRelativeFrom.PARAGRAPH, offset: -200021 },
      behindDocument: true, allowOverlap: true, wrap: { type: TextWrappingType.NONE },
    }
  }),
]})]})
```

No agregues ningún `ImageRun` adicional: en este skill no hay logo de cliente.

---

## Convención de IDs

- **RF**: `RF-<MÓDULO>-<NNN>` (p. ej. `RF-TPS-014`, `RF-AUTH-001`) o `RF-<NNN>` si el
  proyecto es de un solo módulo. Se admiten sufijos de letra para requisitos derivados
  que se insertaron después (`RF-003B`, `RF-017.1`, `RF-017.2`) — útil para no
  renumerar todo cuando aparece un requisito nuevo entre dos existentes.
- **RNF**: `RNF-<NNN>` correlativo, con la categoría en el título de la ficha. También
  se admite `RNF-<CATEGORÍA>-<NNN>` si el usuario prefiere agrupar por prefijo.
- Los IDs son estables: una vez publicado el documento, un ID no se reasigna. Si un
  requisito se elimina, su ID queda retirado.

---

## Reglas críticas

- **Cada requisito necesita al menos un criterio de aceptación verificable.** Un
  requisito sin criterios no está listo para desarrollo; si los insumos no alcanzan,
  márcalo en "Pendiente de validación" en lugar de inventarlos.
- **No inventes campos que los insumos no respaldan.** Si no sabes el actor, la interfaz
  o la dependencia, omite el campo o decláralo pendiente. Nunca rellenes con valores
  plausibles pero imaginarios.
- **Los criterios cubren errores, no solo el camino feliz.** Validaciones que bloquean,
  mensajes de error, estados vacíos y casos límite.
- **Un requisito, una capacidad.** Si la historia mezcla dos comportamientos, sepárala
  en dos requisitos con IDs distintos.
- **Sujeto técnico, nunca "el usuario"** como sujeto en la Descripción (plantilla B).
  En la Historia (plantilla A) el rol sí es una persona, por diseño del formato.
- **Sin decisiones de diseño visual** en los requisitos: colores, ubicación de botones,
  pestañas o menús son de la fase de diseño.
- Los mensajes literales al usuario van entre comillas dentro del criterio.
- Parte de `references/ejemplo-generador.js` en lugar de escribir el script desde cero.
- Verifica siempre el resultado renderizando a PDF antes de entregar.

---

## Anti-patrones

- Fichas con Descripción pero sin criterios de aceptación.
- Criterios que parafrasean la historia sin agregar condición verificable.
- Criterios sin disparador claro ("El sistema debe ser confiable").
- Un solo criterio por requisito cuando hay caminos de error evidentes.
- Fusionar varios requisitos en una tabla para "ahorrar espacio".
- Rellenar Dependencias con "Ninguna" en todos los requisitos por completar la ficha.
- Usar este skill cuando el usuario pidió un listado rápido — ahí va `requisitos-lite`.
