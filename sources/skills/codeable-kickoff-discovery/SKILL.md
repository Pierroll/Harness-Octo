---
name: codeable-kickoff-discovery
description: >
  Genera el documento de arranque de un proyecto de Codeable Labs: un .docx único con la
  agenda del Kickoff seguida de las agendas de todos los Discoveries necesarios. Activa
  SIEMPRE que el usuario mencione "kickoff", "discovery", "agenda de reunión", "primera
  reunión con el cliente", "sesiones de levantamiento", "reunión de arranque", "discovery
  sessions", "agendar las sesiones del proyecto", "arma las reuniones del proyecto",
  "documento de arranque", o cualquier variante que implique armar la estructura de las
  primeras reuniones de un proyecto. También aplica cuando el usuario quiera transformar
  contexto comercial (propuesta, transcripción, notas) en agendas listas para presentar al
  cliente. Produce un único .docx con la plantilla Codeable y tono de PM senior:
  estratégico, no operativo, con preguntas que desbloquean cada frente y compromisos
  bilaterales al cierre. Úsalo incluso si el usuario solo dice "arma las reuniones con el
  cliente" sin mencionar "kickoff" o "discovery" explícitamente.
---

# Kickoff & Discovery — Codeable Labs

Este skill genera **un único documento `.docx`** que contiene la agenda del Kickoff y
las agendas de todos los Discoveries del proyecto, siguiendo el formato corporativo de
Codeable Labs. El cliente luego separa las secciones en pestañas de Google Docs.

## Cuándo usar este skill

- El usuario pide armar el kickoff de un proyecto.
- El usuario pide armar las sesiones de discovery.
- El usuario tiene una propuesta firmada y necesita estructurar las primeras reuniones.
- El usuario comparte una transcripción comercial y pide "arma las reuniones siguientes".
- El usuario menciona stakeholders, frentes de trabajo y necesita asignarles sesiones.
- El usuario quiere convertir notas o contexto en agendas listas para presentar.

---

## Output esperado

**Un único documento `.docx`** en `/mnt/user-data/outputs/` con nombre
`Kickoff_y_Discoveries_[Cliente].docx`, estructurado así:

1. Página 1+: **Kickoff** completo (datos, objetivo, agenda).
2. Páginas siguientes: **un Discovery por sesión**, cada uno con su propia estructura
   completa (datos, objetivo, insumos previos, agenda, objetivos de la sesión).

Los discoveries van en el orden en que aparecen en la tabla del Kickoff (d1, d2, d3, …).

Cada bloque mayor (kickoff y cada discovery) empieza con su propio título visual y
secciones numeradas para que el cliente pueda separarlos en pestañas de Google Docs
después.

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
- Qué se compromete Codeable Labs a entregar.
- Qué se compromete el cliente a entregar.

### 3. Los discoveries listan insumos previos al inicio
Cada discovery tiene una sección "INSUMOS QUE NECESITAMOS ANTES DE LA SESIÓN" como
sección numerada (no como bloque dentro de la agenda). Esto le permite al cliente
preparar materiales antes de llegar.

### 4. Preguntas clave que desbloquean
Cada bloque temático de la agenda incluye al menos una "Pregunta clave" en **negrita**
que es la palanca para avanzar.

### 5. Mapeo explícito de stakeholders por frente
Cada discovery tiene un dueño claro del lado del cliente. El skill mapea frentes
(negocio, finanzas, técnico, infraestructura, multi-empresa, etc.) a personas
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
- Si falta algo crítico (PM, fechas, lista de discoveries), usa `ask_user_input_v0` con opciones cortas.
- Nunca preguntes algo que ya está claramente en el contexto.

### Paso 2 — Decidir la lista de discoveries

Los frentes típicos en un proyecto de Codeable Labs son:

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

### Paso 4 — Generar el .docx unificado

Lee `/mnt/skills/user/codeable-plantilla-docs/SKILL.md` para los detalles de formato
visual exacto (fuentes, colores, tablas, bullets, header con logos).

**Estructura del documento unificado:**

```
[KICKOFF]
├── Título: KICKOFF – [NOMBRE DEL PROYECTO EN MAYÚSCULAS]
├── Subtítulo: nombre completo del proyecto
├── Sección "1. DATOS DEL PROYECTO" (tabla de datos)
├── Sección "2. OBJETIVO DEL KICK OFF" (párrafo)
├── Sección "3. AGENDA DE LA SESIÓN"
│   ├── diaHeader con fecha y objetivo del día
│   └── Bullets de bloques de tiempo, cada uno con sub-bullets de contenido + Pregunta clave
│   └── Dentro de un bloque: dataTable con las sesiones de discovery
└── [salto de página]

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

**Detalles visuales críticos** (heredados de codeable-plantilla-docs):

- Página A4, fuente Inter, márgenes corporativos.
- Header con logos Codeable Labs (izquierda) y cliente (derecha) — el logo del cliente cambia por proyecto.
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
- El último bullet siempre dice qué debe poder hacer el equipo de Codeable después de la sesión.

### Sobre los stakeholders en la tabla del kickoff
- Formato de fila: `d[N] ⇒ [Frente] - [tema] ([fecha si está confirmada])` | `[nombres separados por -]`
- Si no hay nombres confirmados del lado del cliente, usar `[Por confirmar]`.
- Para discoveries técnicos siempre incluir al proveedor externo (SAP, ERP) como participante crítico.

---

## Anti-patrones (qué NO hacer)

- ❌ Generar múltiples archivos `.docx` separados — debe ser **uno solo**.
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
las fechas del discovery #3", "agrega un discovery sobre SOMA"), regenera el documento
completo con el ajuste — no entregues parches sueltos.

Si el usuario explícitamente pide la agenda en chat (no en .docx), entrégala en texto
siguiendo la misma estructura. Este es un caso de excepción, no el default.
