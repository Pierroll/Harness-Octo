---
name: kickoff-discovery
description: >
  Genera los documentos de arranque de uno de nuestros proyectos, en dos momentos: antes
  del kickoff, el .docx con la agenda de esa reunión y los temas por entender; después del
  kickoff, el .docx con las agendas de sesión ya con dueño y fecha. Activa
  SIEMPRE que el usuario mencione "kickoff", "discovery", "agenda de reunión", "primera
  reunión con el cliente", "sesiones de levantamiento", "reunión de arranque", "discovery
  sessions", "agendar las sesiones del proyecto", "arma las reuniones del proyecto",
  "documento de arranque", o cualquier variante que implique armar la estructura de las
  primeras reuniones de un proyecto. También aplica cuando el usuario quiera transformar
  contexto comercial (propuesta, transcripción, notas) en agendas listas para presentar al
  cliente. Produce .docx con la plantilla OCTO y tono de PM senior:
  estratégico, no operativo, con preguntas que desbloquean cada frente y compromisos
  bilaterales al cierre. Úsalo incluso si el usuario solo dice "arma las reuniones con el
  cliente" sin mencionar "kickoff" o "discovery" explícitamente.
---

# Kickoff & Discovery — OCTO

Este skill genera los documentos de arranque del proyecto en `.docx`, con nuestro formato
corporativo. Son **dos documentos en dos momentos distintos**, y cuál toca depende de si el
kickoff ya ocurrió: la sección siguiente lo explica y manda sobre el resto del skill. El
cliente luego separa las secciones en pestañas de Google Docs.

## Cuándo usar este skill

- El usuario pide armar el kickoff de un proyecto.
- El usuario pide armar las sesiones de discovery.
- El usuario tiene una propuesta firmada y necesita estructurar las primeras reuniones.
- El usuario comparte una transcripción comercial y pide "arma las reuniones siguientes".
- El usuario menciona stakeholders, frentes de trabajo y necesita asignarles sesiones.
- El usuario quiere convertir notas o contexto en agendas listas para presentar.

---

## El skill corre en tres momentos, no en uno

Esta es la regla que manda sobre el resto del skill. Al kickoff no se llega con el
cronograma de sesiones armado, porque esa reunión existe para escuchar: nos presentamos,
decimos qué vamos a resolver y cuál es el scope, y el resto del tiempo escucha el cliente.
Recién cuando está claro con quién hay que hablar y de qué, se arman las sesiones.

Lo que sí se lleva es una **propuesta de sesiones**: la lista de temas por entender de
`skills/gap-analysis/` presentada como los frentes que proponemos cubrir. Ponerla sobre la
mesa es lo que da autoridad en la sala, y le da al cliente algo concreto que corregir en
vez de una hoja en blanco.

Es normal que el cliente la mueva. Puede decir que en vez de cuatro sesiones remotas
prefiere que vayamos un día a planta, o que falta un área que no habíamos visto. Cuando
eso pasa, la propuesta cumplió su función.

**Temas no es lo mismo que sesiones.** Los temas son tuyos y son tentativos. Las sesiones
tienen dueño, fecha y hora, y salen de la reunión.

### Momento 1, antes del kickoff

`Kickoff_[Cliente].docx` en `discovery/1-planning/outputs/ready-to-take/`:

1. **Kickoff** completo: datos, objetivo, agenda.
2. **Temas por entender**: la lista de `gaps-and-risks.md`, presentada como los frentes que
   proponemos cubrir. Se presenta como propuesta, no como plan cerrado.

Los temas marcados como riesgo alto en `gaps-and-risks.md` van además como punto propio de
la agenda del kickoff. Un tema como compliance va a las dos partes: se toca en la primera
reunión **y** tiene sesión propia después. No se elige uno.

### Momento 2, después del kickoff

Sus insumos son tres: el documento del momento 1, lo que se entendió en la reunión, y la
lista de responsables del lado del cliente que salió de ella. Ese tercero es el que cambia
las preguntas: si el cliente decidió que vamos a planta, las agendas no son las mismas que
para sesiones remotas.

`Discoveries_[Cliente].docx` en `discovery/1-planning/outputs/ready-to-take/`:

Un Discovery por sesión, cada uno con su estructura completa (datos, objetivo, insumos
previos, agenda, objetivos de la sesión), ya con dueño del lado del cliente, fecha y hora.
Van en el orden d1, d2, d3.

Cada sesión declara además **su entregable**: qué documento o decisión sale de esa reunión.
Una sesión sin entregable es un bloque de tiempo, y un bloque de tiempo no se puede
dimensionar ni reclamar.

Cada bloque empieza con su propio título visual y secciones numeradas para que el cliente
pueda separarlos en pestañas de Google Docs después.

**No generes el momento 2 antes del kickoff.** Si el usuario lo pide, explica por qué no:
las agendas dependen de quién resultó ser el dueño de cada frente y de qué temas agregó el
cliente, y las dos salen de la reunión. Si insiste, genera un borrador marcado
`BORRADOR previo al kickoff, sin dueños ni fechas confirmados` en la primera línea.

### Momento 3, mientras el discovery corre

Las agendas del momento 2 se escriben todas juntas, cuando todavía no ocurrió ninguna
sesión. Para la sesión 3 eso ya quedó viejo: dos sesiones dejaron información que cambia
qué hay que preguntar y, sobre todo, qué ya no hay que volver a preguntar.

Antes de cada sesión, desde la segunda en adelante, se regenera su agenda sobre tres
insumos: los documentos de entendimiento de las sesiones anteriores
(`skills/discovery-session/`, Output 3), lo que quedó cerrado en `gaps-and-risks.md`, y los
compromisos que el cliente cumplió o no cumplió.

Eso cambia tres partes de la agenda:

**El bloque 1 declara lo que ya sabemos y no se vuelve a preguntar.** No es un recap de
cortesía: es la lista concreta de lo que quedó cerrado, para que el cliente no lo repita y
para que nosotros no gastemos la sesión en terreno ya cubierto.

**Las preguntas citan quién dijo qué.** "Diana mencionó dos reglas verificables: que los
subobjetivos se evalúen dos veces por ciclo y que todas las habilidades se aborden en la
planeación anual. ¿Son las únicas de ese tipo?" rinde mucho más que "¿qué reglas tienen?".
Le demuestra al cliente que lo escuchamos y arranca la respuesta un nivel más adentro.

**Las preguntas que quedaron abiertas o parciales vuelven a entrar.** Salen de la sección 8
del entendimiento anterior, que las tiene listadas con su estado.

---

## Filosofía del skill (no negociable)

Estas reglas definen el tono y forma de los documentos. Aplican a todos los outputs:

### 1. Tono estratégico, NO operativo
Las agendas se diseñan para un PM senior que proyecta credibilidad y confianza. Eso significa:
- **No pedir flujos detallados en la sala** — los flujos se trabajan después con cada dueño.
- **No bombardear con preguntas técnicas** al cliente — los temas técnicos se reservan para discoveries específicos.
- **No abrir negociación de alcance ni precio** — si la propuesta ya está cerrada, se refuerza, no se reabre.
- **Los bloques deben demostrar que el PM ya leyó todo** — preguntas que muestran comprensión del problema, no preguntas básicas.

### 2. Cada sesión cierra con compromisos bilaterales
Toda agenda termina con un bloque "Cierre — compromisos de ambos lados" que detalla:
- Qué nos comprometemos a entregar nosotros.
- Qué se compromete a entregar el cliente.

### 3. Los discoveries listan insumos previos al inicio
Cada discovery tiene una sección "INSUMOS QUE NECESITAMOS ANTES DE LA SESIÓN" como
sección numerada (no como bloque dentro de la agenda). Esto le permite al cliente
preparar materiales antes de llegar.

### 4. Preguntas clave que desbloquean
Cada bloque temático de la agenda incluye al menos una "Pregunta clave" en **negrita**
que es la palanca para avanzar.

### 5. Mapeo explícito de stakeholders por frente
Cada discovery tiene un dueño claro del lado del cliente. El skill mapea frentes
(negocio, finanzas, técnico, infraestructura, multi-empresa, y los que el proyecto
agregue) a personas
específicas mencionadas en el contexto.

### 6. Discoveries son cortos (45 min por default)
A diferencia del kickoff que dura 90 min, los discoveries duran **45 minutos** en su
formato estándar. Esto fuerza foco y evita sesiones que se desinflan. Solo subir a 60-90
si el frente es excepcionalmente complejo.

---

## Flujo del skill

### Paso 1 — Capturar contexto

Antes de generar, identificar:

| Campo | Cómo obtenerlo |
|---|---|
| Cliente | De la propuesta, transcripción o pregunta directa |
| Nombre del proyecto | De la propuesta o contexto |
| PM asignado | Preguntar si no está claro |
| Head of Delivery | Default: Paulo Tijero |
| Duración total del proyecto | De la propuesta |
| Stakeholders del cliente | De la propuesta, transcripción o preguntar |
| Lista de discoveries a generar | Inferir del proyecto + confirmar con usuario |
| Fechas tentativas (kickoff y discoveries) | Preguntar si no están dadas |
| Hosting cloud (Azure/GCP/AWS) | De conversaciones técnicas previas |

**Regla de interacción mixta:**
- Si tienes el contexto completo en la conversación, procede sin preguntar.
- Si falta algo crítico (PM, fechas, lista de discoveries), usa AskUserQuestion con opciones cortas.
- Nunca preguntes algo que ya está claramente en el contexto.

### Paso 2 — Decidir la lista de discoveries

**Solo en el momento 2, después del kickoff.** Antes de la reunión lo que existe es la
lista de temas de `gaps-and-risks.md`, no la lista de sesiones. Cada tema tiene que quedar
asignado a una sesión de esta lista, o declarado por escrito como fuera del alcance del
discovery.

Los frentes típicos en nuestros proyectos son:

- **d1 — Negocio (módulo principal)**: el módulo más crítico del proyecto desde la perspectiva de negocio.
- **d2 — Finanzas**: si el proyecto toca pagos, facturación, conciliación.
- **d3 — Multi-empresa / Multi-entidad**: si el cliente es un grupo con múltiples empresas.
- **d4 — Técnica (integración principal)**: validar API/ERP/sistema externo crítico.
- **d5 — Infraestructura**: hosting, redes, VPN, ambientes.
- **d6 — Negocio (módulo secundario)**: otro módulo funcional importante.
- **d7+ — Específicos del proyecto**: cualquier frente único (compliance, módulos verticales).

Adapta la lista al proyecto. No fuerces discoveries que no aportan.

### Paso 3 — Leer las plantillas de referencia

Lee la plantilla de cada tipo de sesión antes de generar:

- `references/kickoff-template.md`
- `references/discovery-negocio-template.md`
- `references/discovery-finanzas-template.md`
- `references/discovery-tecnico-template.md`
- `references/discovery-infraestructura-template.md`
- `references/discovery-generico-template.md` (cualquier otro frente)

### Paso 4 — Generar el .docx del momento que corresponde

La especificación visual exacta (fuentes, colores, tablas, bullets, header con logos)
está resumida en «Detalles visuales críticos» más abajo. Genera el `.docx` con la
librería `docx` de Node (`npm i docx` si el proyecto no la tiene). Si el entorno no
permite generar `.docx`, entrega el contenido en markdown con la misma estructura y
márcalo para maquetar después.

**Estructura de `Kickoff_[Cliente].docx`, el documento del momento 1:**

```
[KICKOFF]
├── Título: KICKOFF – [NOMBRE DEL PROYECTO EN MAYÚSCULAS]
├── Subtítulo: nombre completo del proyecto
├── Sección "1. DATOS DEL PROYECTO" (tabla de datos)
├── Sección "2. OBJETIVO DEL KICK OFF" (párrafo)
├── Sección "3. AGENDA DE LA SESIÓN"
│   ├── diaHeader con fecha y objetivo del día
│   └── Bullets de bloques de tiempo, cada uno con sub-bullets de contenido + Pregunta clave
│   └── Dentro de un bloque: dataTable con los temas por entender que proponemos cubrir
└── [fin del documento]
```

**Estructura de `Discoveries_[Cliente].docx`, el documento del momento 2:**

```
[DISCOVERY #1]
├── Título: DISCOVERY #[N] - [NOMBRE DEL FRENTE EN MAYÚSCULAS]
├── Subtítulo: nombre completo del proyecto
├── Sección "1. DATOS DEL PROYECTO" (tabla)
├── Sección "2. OBJETIVO DE LA SESIÓN" (párrafo)
├── Sección "3. INSUMOS QUE NECESITAMOS ANTES DE LA SESIÓN" (bullets)
├── Sección "4. AGENDA DE LA SESIÓN"
│   ├── diaHeader con fecha y objetivo del día
│   └── Bullets de bloques con Preguntas clave
├── Sección "5. OBJETIVO DE ESTA SESIÓN" (4-5 bullets de outcomes esperados)
└── [salto de página]

[DISCOVERY #2 ... N]
```

**Detalles visuales críticos** (heredados de OCTO-plantilla-docs):

- Página A4, fuente Inter, márgenes corporativos.
- Header con logos OCTO (izquierda) y cliente (derecha) — el logo del cliente cambia por proyecto.
- Secciones numeradas con `seccionHeader` (fondo negro, texto blanco 10pt bold).
- Sub-headers de día con `diaHeader` (fondo azul claro, bordes top/bottom azul).
- Tablas de datos con `dataTable` (header azul claro, filas sin borde excepto la última).
- Bullets nivel 1 (○) y nivel 2 (■).
- Saltos de página entre kickoff y cada discovery.

### Paso 5 — Presentar al usuario

Al entregar:
- Confirmar cuántos discoveries generaste y los frentes que cubriste.
- Mencionar las decisiones que tomaste si faltaba contexto (ej: "asumí PM = X").
- Sugerir si conviene agregar algún discovery adicional que detectes pero no esté en la lista.

---

## Reglas críticas de contenido

### Sobre las duraciones
- **Kickoff: 90 minutos** (bloques de 5-20 min)
- **Discoveries: 45 minutos por default** (bloques de 5-15 min)
  - Estructura típica: 5 min contexto + 30 min preguntas (en 2-3 bloques) + 10 min cierre
- Subir a 60-90 min solo si el frente es excepcionalmente complejo o el cliente lo pide.

### Sobre las preguntas clave
- Una pregunta clave por bloque, al final del bloque, en **negrita**.
- Preguntas abiertas que desbloquean información, no cerradas de sí/no.
- Buenas: *"¿Cuál es el dolor más grande hoy en este proceso?"*
- Malas: *"¿Tienen SAP?"*
- Los trece puntos de "Antes del RF" (`sources/antes-del-rf-equipo-diseno.md`) son la
  cantera: son las preguntas que diseño necesita respondidas y que, hechas acá, no hay que
  volver a hacer. Se toman las que `gap-analysis` dejó como temas por entender.

### Sobre los compromisos de cierre
- Mínimo 3 compromisos por lado.
- Cada compromiso es específico, con verbo de acción y entregable concreto.
- Bueno: *"Compartir el listado de empresas del grupo en V1 antes del viernes."*
- Malo: *"Validar internamente los temas pendientes."*

### Sobre los insumos previos (sección 3 de cada discovery)
- 3-5 ítems concretos.
- Cada ítem debe ser un artefacto recuperable: documento, lista, acceso, nombre.
- Bueno: *"Ejemplo de 2-3 actas de conformidad actuales (formato físico actual)."*
- Malo: *"Información sobre cómo trabajan."*

### Sobre la sección 5 "Objetivo de esta sesión" (solo en discoveries)
- 4-5 bullets de outcomes esperados al cerrar la sesión.
- Empiezan con verbos accionables: *"Identificar…"*, *"Definir…"*, *"Establecer…"*, *"Determinar…"*.
- El último bullet siempre dice qué vamos a poder hacer nosotros después de la sesión.

### Sobre los stakeholders en la tabla del kickoff
- Formato de fila: `d[N] ⇒ [Frente] - [tema] ([fecha si está confirmada])` | `[nombres separados por -]`
- Si no hay nombres confirmados del lado del cliente, usar `[Por confirmar]`.
- Para discoveries técnicos siempre incluir al proveedor externo (SAP, ERP) como participante crítico.

---

## Anti-patrones (qué NO hacer)

- ❌ Generar las agendas de sesión antes del kickoff, o mezclarlas con la agenda del kickoff
  en un solo archivo. Son dos documentos y dos momentos.
- ❌ Llevar al kickoff una tabla de sesiones con fechas cerradas en vez de la lista de temas.
- ❌ Pedir al cliente en la sala que "arme el flujo operativo".
- ❌ Hacer una pregunta cerrada de sí/no como "pregunta clave".
- ❌ Generar agendas sin compromisos bilaterales de cierre.
- ❌ Inventar nombres de stakeholders si no están en el contexto.
- ❌ Mezclar discovery técnico con discovery de negocio en la misma sesión.
- ❌ Olvidar la cláusula "el alcance está cerrado, no lo reabrimos" cuando hay propuesta firmada.
- ❌ Usar tono operativo ("¿podrían mostrarnos el archivo Excel donde llevan…?").
- ❌ Duraciones de discovery > 45 min sin justificación clara.
- ❌ Omitir la sección 5 "Objetivo de esta sesión" en los discoveries.

---

## Notas finales

Si el usuario en una iteración posterior pide ajustar **solo una sección** (ej: "cambia
las fechas del discovery #3", "agrega un discovery sobre SOMA"), regenera completo el
documento que contiene esa sección, no los dos, y no entregues parches sueltos.

Si el usuario explícitamente pide la agenda en chat (no en .docx), entrégala en texto
siguiendo la misma estructura. Este es un caso de excepción, no el default.
