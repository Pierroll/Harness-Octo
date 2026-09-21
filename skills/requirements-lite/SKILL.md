---
name: requirements-lite
description: >
  Genera el documento de Requerimientos Funcionales y No Funcionales de uno de nuestros
  proyectos, en formato .docx con la plantilla corporativa (solo logo Codeable Labs,
  sin logo de cliente). Activa SIEMPRE que el usuario pida "requisitos funcionales",
  "requisitos no funcionales", "requerimientos funcionales", "RF y RNF", "catálogo de
  requisitos", "levantar los requisitos", "armar los requisitos del discovery",
  "documento de requisitos", o cualquier variante que implique convertir insumos de
  discovery, transcripciones, actas o notas de levantamiento en una lista formal de
  requisitos. También aplica cuando el usuario comparta transcripciones de sesiones de
  Discovery, un PRD, o contexto de negocio y pida "sacar los requisitos" o "definir qué
  debe hacer el sistema". Úsalo incluso si el usuario solo dice "arma los requisitos de
  X" sin mencionar "funcional" o "no funcional" explícitamente — en ese caso genera
  ambos bloques.
---

# Requisitos Lite — Requerimientos Funcionales y No Funcionales

Este skill convierte insumos de discovery (transcripciones, actas, notas, PRDs,
propuestas) en un documento formal de **Requerimientos Funcionales (RF) y Requerimientos
No Funcionales (RNF)**, redactados según ISO/IEC/IEEE 29148:2018 y entregados en un
único `.docx` con nuestra plantilla visual corporativa.

Se llama "lite" porque es la versión ligera del levantamiento de requisitos: produce el
documento de RF/RNF listo para que el cliente lo lea y apruebe, sin la maquinaria de
fichas completas. Es el paso previo a `requirements-full`: el cliente aprueba el alcance
sobre este documento corto, y recién entonces se invierte el esfuerzo del detallado.
Si el usuario pide historias de usuario, criterios de aceptación o fichas por requisito,
usa `requirements-full` en su lugar.

---

## Archivos de referencia (léelos siempre antes de redactar)

- `references/guia-requisitos-funcionales.md` — Guía de estilo para RF. Lo más
  importante es la **sección 2** (estructura Sujeto-Acción-Restricción), la
  **sección 3** (términos recomendados como sujeto), la **sección 4** (verbos por
  categoría) y la **sección 8** (atributos del catálogo — úsala como checklist mental de
  qué debe quedar claro en cada requisito; en este skill los atributos se integran en la
  redacción, no se representan como columnas).
- `references/guia-requisitos-no-funcionales.md` — Guía de estilo para RNF. Léela
  completa; es la guía principal para todo lo relacionado a RNF: principios (sección 1),
  estructura sujeto+restricción+métrica (sección 2), clasificación por categoría
  (sección 3), concepto SMART (sección 8) y errores comunes a evitar (sección 9).
- `references/ejemplo-generador.js` — **Script Node completo y probado que genera el
  formato correcto.** Parte de él: copia el script, reemplaza el contenido del array
  `children` y ejecuta. Contiene los helpers `titulo`, `subtitulo`, `meta`,
  `moduloHeader`, `subseccionHeader`, `req` y `nota` ya calibrados.
- Paleta y tipografía corporativa: Inter, `#000000`, `#F5F9FF`, `#3A83F7`, página A4 —
  ya calibradas en `references/ejemplo-generador.js`. **No uses tablas de datos
  (`dataTable`) ni bullets** en este skill.
- Librería `docx` de Node: instálala con `npm i docx` si el proyecto no la tiene. El
  script de referencia ya la usa correctamente.

---

## Flujo del skill

### Paso 1 — Reunir los insumos del discovery

Antes de redactar un solo requisito, recopila todo el contexto disponible:

- Archivos subidos por el usuario (transcripciones, actas, PRDs, propuestas).
- Documentos de Google Drive que el usuario mencione (usa el conector MCP de Google Drive
  si está configurado; ver `skills/import-transcript/`).
- Contexto ya presente en el repo del discovery: notas de sesiones en
  `discovery/2-analysis/outputs/`, propuesta y documento de entendimiento en `discovery/1-planning/inputs/`.
- Si el usuario dice "usa lo que ya conversamos" o "el discovery de la semana pasada",
  busca primero en `discovery/2-analysis/outputs/` y `discovery/2-analysis/outputs/` antes de
  preguntar.

Si después de esto falta contexto crítico (p. ej. no queda claro el alcance de un
módulo, o no hay ninguna mención a temas de seguridad/rendimiento/disponibilidad),
pregunta puntualmente — no inventes requisitos de la nada. Prioriza extraer, no crear.

### Paso 2 — Definir la estructura de módulos y categorías

**El documento NO usa tablas de datos ni columnas de atributos.** Cada requisito es un
párrafo corrido (ver "Formato del documento" más abajo). Por lo tanto, lo que hay que
definir en este paso no son columnas, sino la **organización del contenido**:

1. **Módulos funcionales** — cómo se agrupan los RF. Se infieren del contexto del
   discovery (p. ej. Autenticación, Gestión de Tareas, Listas, Notificaciones). Cada
   módulo es una banda negra.
2. **Subsecciones dentro de cada módulo** — agrupaciones temáticas dentro del módulo
   (p. ej. dentro de Tareas: "Registro y Edición", "Consulta y Organización",
   "Exposición de Servicios"). Cada subsección es una banda azul clara. Un módulo con
   pocos requisitos puede tener una sola subsección.
3. **Categorías de RNF** — las bandas azules de la sección de no funcionales. Usa las
   categorías de la sección 3 de la guía RNF, agrupadas con nombres legibles:
   Eficiencia de Desempeño, Confiabilidad y Continuidad, Seguridad, Usabilidad y
   Accesibilidad, Mantenibilidad y Compatibilidad, Restricciones Tecnológicas.
4. **Convención de IDs** — `RF-<MÓDULO>-<NNN>` y `RNF-<CATEGORÍA>-<NNN>` por default.
   Usa correlativo simple (`RF-001`) solo si el alcance es muy chico o el usuario lo
   pide.

Propón esta estructura al usuario junto con el borrador del Paso 4. No hace falta
preguntarla por separado salvo que el contexto sea ambiguo sobre cómo dividir módulos.

Los atributos secundarios de la sección 8 de la guía funcional (Fuente, Racional,
Dependencias, Estado, Método de Verificación, Versión, Observaciones) **no se
representan como columnas**. Si el usuario necesita rastrear alguno, incorpóralo en la
redacción del requisito cuando aporte valor, o sugiere llevarlo en una herramienta de
gestión (Jira, Notion) en lugar de en el documento.

### Paso 3 — Redactar los requisitos

**Requisitos Funcionales** — sigue la estructura de la sección 2 de la guía funcional:

> **[Sujeto técnico] [Acción en "deberá + infinitivo"] [Restricción de la acción]**

- El sujeto es un artefacto técnico definido (ver tabla de la sección 3 de la guía:
  "Sistema web", "Aplicación móvil", "Servicio web REST", "Módulo de autenticación",
  "Componente RPA") — **nunca "el usuario"** como sujeto del requisito.
- Usa los verbos sugeridos por categoría de la sección 4 (entrada de datos,
  procesamiento, visualización, seguridad, integración, automatización).
- Un requisito = una sola acción. Si el insumo describe dos acciones, sepáralas en dos
  RF (ver "Errores comunes" sección 6 de la guía funcional).
- La restricción de la acción es funcional (orden, condición, agrupamiento), nunca de
  diseño visual (colores, ubicación de botones, pestañas).

**Requisitos No Funcionales** — sigue la estructura de la sección 2 de la guía RNF:

> **[Sujeto o artefacto técnico definido] deberá cumplir con [restricción de calidad o
> condición técnica] [condición adicional o métrica opcional]**

- Cumple SMART (sección 8 de la guía RNF): específico, medible, alcanzable, relevante,
  con tiempo/ventana definida.
- Nunca términos subjetivos ("rápido", "fácil", "robusto") sin una métrica que los
  respalde (ver sección 9, "Errores comunes a evitar" de la guía RNF).
- Clasifica cada RNF en una de las categorías de la sección 3: Rendimiento,
  Fiabilidad, Seguridad, Usabilidad, Mantenibilidad, Portabilidad, Restricciones
  tecnológicas.

Ambos tipos usan el verbo modal **"deberá"**.

### Paso 4 — Mostrar el borrador para validación

Antes de generar el `.docx`, presenta en el chat una tabla resumida (ID, Título,
Descripción corta) de los RF y RNF propuestos, agrupados por módulo y categoría. Pide
confirmación o ajustes. No generes el documento final sin este visto bueno —
salvo que el usuario explícitamente pida "no me preguntes, genera directo".

### Paso 5 — Escribir el registro en markdown

Antes del `.docx`, guarda el catálogo en `discovery/2-analysis/outputs/requirements-lite.md`.
Es la versión de registro (regla 1 de `AGENTS.md`): lo que versiona git y lo que
`reopen-artifact` congela cuando el catálogo cambia. Abre con la línea `**Versión:** <N> ·
<fecha> · reemplaza a versions/requirements-lite-v<N-1>.md, o "primera" · qué cambió · qué
cerró la anterior`, y sigue con una sección por módulo y, por requisito, ID, título y el
párrafo, con los mismos textos que van al `.docx`. Los RNF van en su propia sección.

### Paso 6 — Generar el `.docx`

**Usa `references/ejemplo-generador.js` como base.** Toma los textos del markdown del paso
5, sin reescribirlos. Es un script Node completo y
probado que produce exactamente el formato correcto: cópialo, reemplaza el contenido
del array `children` con los requisitos del proyecto y ejecútalo. No reinventes los
helpers.

Ver la sección "Formato del documento" más abajo para la especificación visual exacta.

### Paso 7 — Entregar

Guarda el archivo en `discovery/2-analysis/outputs/ready-to-take/Requerimientos_[Cliente_o_Proyecto].docx`
y preséntalo indicando las dos rutas al usuario, la del markdown y la del `.docx`. Si hay que
corregir un requisito, se corrige el markdown y se regenera el `.docx`, nunca al revés. Al entregar, resume cuántos RF y RNF se generaron y
qué atributos opcionales se incluyeron.

### Paso 8 — Registrar la negociación, cuando el cliente responde

**Este documento no lleva números.** Ni estimaciones, ni días, ni horas, ni precio. El
cliente los suma todos y le sale un total que no existe, porque hay tareas que corren en
paralelo, y a partir de ahí la conversación deja de ser sobre alcance y pasa a ser sobre
un número inventado.

El RF light existe para que el cliente lea y reconozca: "ya están cubriendo todo lo que yo
tenía en la cabeza", o "falta que el asesor pueda ver los datos de todo su equipo", o
"esta historia dice que el cliente final necesita una app y yo no quiero pagar por una
app". Para eso alcanza el título de cada requisito. El cronograma sale después, a partir
del RF detallado, cuando ya hay algo firme que ordenar en el tiempo.

El cliente no aprueba el catálogo en bloque. Recibe cien requisitos, se queda con ochenta
y descarta el resto. Esa conversación se registra en
`discovery/2-analysis/outputs/scope-decisions.md`, a partir de `templates/scope-decisions.md`.

Una fila por requisito, con tres estados y sin variantes intermedias:

- **Dentro.** Pasa a `requirements-full`.
- **Fuera.** No se construye y no se vuelve a proponer sin conversación nueva.
- **Diferido.** Lo que el cliente quiere pero no ahora. Es la lista más valiosa del
  documento, porque es la base de la siguiente propuesta comercial. Conviene escribirla
  mientras la conversación está fresca y no reconstruirla seis meses después.

Los requisitos sobre los que el cliente no se pronunció no se asumen dentro ni fuera. Se
marcan como sin respuesta. Si el PM decide avanzar igual, esa decisión queda registrada
con su nombre y su fecha.

**Que el cliente no responda es un caso normal, no una excepción.** A veces recibe el
documento y no le da prioridad. El PM fija un plazo, y si vence sin respuesta se avanza al
RF detallado sobre lo presentado. El riesgo es bajo: si dos semanas después el cliente
pide sacar tres historias, son tres historias que se sacan, y si pide agregar cuatro, son
cuatro que se agregan. Esperar indefinidamente cuesta más que ajustar después.

**El `.docx` no se toca en este paso.** El documento es narrativo y sin tablas de datos a
propósito; meterle una columna de estado rompería el formato. El registro vive aparte, en
markdown, y es el que `requirements-full` lee después.

---

## Formato del documento

El documento es **narrativo, no tabular**. Las únicas tablas que existen son bandas de
una sola fila que funcionan como encabezados. Los requisitos son párrafos corridos.

**Estructura:**

```
├── Header: SOLO logo Codeable Labs (flotante, izquierda)
├── Párrafo: REQUERIMIENTOS FUNCIONALES Y NO FUNCIONALES     (sz=40, bold)
├── Párrafo: NOMBRE DEL PROYECTO EN MAYÚSCULAS               (sz=28, bold)
├── Párrafo: Versión X.Y — Mes Año | nota de alcance         (sz=20)
├── Párrafo vacío
├── BANDA NEGRA: "ALCANCE DEL CATÁLOGO"
├── Párrafo vacío
├── Párrafos de nota: "Etiqueta:" en bold + texto normal, justificado
├── Párrafo vacío
├── BANDA NEGRA: "MÓDULO 0: AUTENTICACIÓN"
├── Párrafo vacío
├── BANDA AZUL: "Acceso y Sesión"
├── Párrafo requisito: "RF-AUTH-001 Título:" bold + descripción normal, justificado
├── ...más requisitos...
├── Párrafo vacío
├── BANDA AZUL: "Otra subsección"
├── ...requisitos...
├── BANDA NEGRA: "MÓDULO 1: ..."
├── ...
└── BANDA NEGRA: "REQUERIMIENTOS NO FUNCIONALES"
    ├── BANDA AZUL: "Eficiencia de Desempeño"  → RNF-REND-...
    ├── BANDA AZUL: "Confiabilidad y Continuidad" → RNF-FIAB-...
    ├── BANDA AZUL: "Seguridad" → RNF-SEG-...
    ├── BANDA AZUL: "Usabilidad y Accesibilidad" → RNF-USB-...
    ├── BANDA AZUL: "Mantenibilidad y Compatibilidad" → RNF-MNT-/RNF-PRT-...
    └── BANDA AZUL: "Restricciones Tecnológicas" → RNF-TEC-...
```

**Especificación visual:**

| Elemento | Especificación |
|---|---|
| Página | A4 (11909 × 16834 DXA), márgenes top=850, bottom/left/right=567, header/footer=720 |
| Fuente | Inter en todo el documento |
| Título principal | sz=40 (20pt), bold |
| Subtítulo (proyecto) | sz=28 (14pt), bold, MAYÚSCULAS |
| Línea de versión | sz=20 (10pt), normal |
| Banda negra (módulo) | Tabla 1 fila, ancho 10777, fondo `#000000`, bordes negros, texto blanco sz=20 bold, márgenes celda top/bottom=100 left=150 right=100 |
| Banda azul (subsección) | Tabla 1 fila, ancho 10777, fondo `#F5F9FF`, bordes top/bottom `#3A83F7` y laterales NIL, texto sz=20 bold color default, altura mínima 400, márgenes celda top/bottom=80 left=150 right=100 |
| Requisito | Párrafo con dos runs: `"ID Título:"` bold sz=20 + `" descripción"` normal sz=20. Justificado (`AlignmentType.BOTH`), spacing before=200 after=0 line=276 |
| Separador entre bloques | Párrafo vacío con TextRun sz=20 |

**Reglas de formato:**

- **Sin tablas de datos.** Nada de columnas de atributos, nada de `dataTable`.
- **Sin bullets.** Todo es prosa en párrafos justificados.
- **Sin saltos de página manuales.** El contenido fluye; las bandas negras marcan los
  cortes visuales. No fuerces `PageBreak`.
- El título del requisito va dentro del run en bold junto con el ID, terminando en
  dos puntos. La descripción arranca con un espacio en el segundo run.

## Header — solo logo Codeable Labs

Este skill usa el mismo header flotante que `codeable-plantilla-docs`, pero **sin el
logo del cliente/Vanguard**. Usa únicamente `assets/codeable-logo.png` (Codeable
Labs), anclado a la izquierda:

```javascript
new Header({ children: [new Paragraph({ children: [
  new ImageRun({
    data: logoCodeable, // assets/codeable-logo.png
    type: "png",
    transformation: { width: 193, height: 16 },
    floating: {
      horizontalPosition: { relative: HorizontalPositionRelativeFrom.COLUMN,  offset: 1 },
      verticalPosition:   { relative: VerticalPositionRelativeFrom.PARAGRAPH, offset: -200022 },
      behindDocument: true, allowOverlap: true, wrap: { type: TextWrappingType.NONE },
    }
  }),
]})]})
```

No agregues ningún `ImageRun` adicional en el header (no hay logo de cliente en este
skill). El resto del documento (título, subtítulo, secciones, tablas, bullets) usa
exactamente los mismos helpers que `codeable-plantilla-docs`.

Asset: `assets/codeable-logo.png`.

---

## Convención de IDs

- **RF**: `RF-XXX` (correlativo) o `RF-<MÓDULO>-XXX` (agrupado), según lo acordado en
  el Paso 2. Ejemplos: `RF-001`, `RF-AUTH-003`.
- **RNF**: `RNF-XXX` o `RNF-<CATEGORÍA>-XXX` usando las abreviaturas de categoría
  (REND, SEG, FIAB, USB, MNT, PRT, TEC). Ejemplos: `RNF-004`, `RNF-SEG-002`.
- Los IDs son estables entre `requirements-lite` y `requirements-full`: cuando el
  proyecto pase al detallado, los IDs se reutilizan sin renumerar. La trazabilidad
  discovery → código → prueba se hace por estos IDs.

---

## Reglas críticas

- **No inventes requisitos que no estén respaldados por el contexto del discovery.**
  Si haces una inferencia razonable, márcala explícitamente (p. ej. en la columna
  "Observaciones" o al presentar el borrador: "infiero este RNF de seguridad porque
  el proyecto maneja datos de pago, confírmalo").
- **Un requisito, una acción.** Si el insumo mezcla dos comportamientos, sepáralos.
- **Sujeto técnico, nunca "el usuario"** como sujeto de un RF.
- **Sin términos subjetivos sin métrica** en los RNF.
- **Sin decisiones de diseño visual** dentro de la restricción de un RF (colores,
  ubicación de botones, pestañas, menús).
- **Verbo modal "deberá"** en todos los requisitos, RF y RNF.
- **Nunca uses tablas de datos con columnas de atributos.** El formato es narrativo:
  bandas de encabezado + párrafos de requisito. Este fue un error corregido en la
  primera versión del skill; no lo repitas.
- **Si un atributo secundario no está respaldado por los insumos, no lo inventes.**
  Nunca rellenes "Fuente", "Racional" o similares con valores plausibles pero
  imaginarios. Si es una inferencia tuya, dilo al presentar el borrador.
- Parte de `references/ejemplo-generador.js` en lugar de escribir el script desde cero.
- Página A4, fuente Inter, `TableLayoutType.FIXED`, `ShadingType.CLEAR`.
- Verifica siempre el resultado renderizando a PDF e inspeccionando las páginas antes
  de entregar.
