# Plantilla — Discovery Genérico

Plantilla base para cualquier discovery que no encaja claramente en negocio, finanzas,
técnico o infraestructura. Ejemplos: multi-empresa, modelo de acceso/permisos, módulos
verticales específicos (SOMA, HR, legal), discoveries especializados (UX research,
analytics, proveedores externos vs servicios básicos).

## Cuándo usar esta plantilla

- El frente del discovery es transversal (multi-empresa, modelo de roles).
- El frente es vertical pero no encaja en negocio puro (ej: módulo de cumplimiento).
- El frente es de descubrimiento estratégico (analítica, KPIs, reportería).

## Estructura del documento

### Título principal
`DISCOVERY #[N] - [NOMBRE DEL FRENTE EN MAYÚSCULAS]`

### Sección 1 — Datos del Proyecto

- **Cliente:** [cliente]
- **Project Manager:** [PM] | **Líder OCTO:** [quien lidere desde OCTO]
- **Participantes esperados:** [Dueños del frente del lado del cliente]
- **Duración estimada:** 45 minutos

### Sección 2 — Objetivo de la Sesión

Plantilla:

> Definir **[lo que se busca cerrar en la sesión]**, dejar claros **[2-3 entregables
> concretos]** y alinear con **[áreas/personas del cliente relevantes]**.

### Sección 3 — Insumos que necesitamos antes de la sesión

Lista de 3-5 insumos concretos, adaptados al frente.

### Sección 4 — Agenda de la sesión

**Duración total:** 45 minutos. Estructura recomendada:

#### Bloque 1 (5 min) — Contexto y objetivos de la sesión

- Recap de cómo encaja este frente en el proyecto.
- Aclarar qué se cierra en esta sesión y qué se queda para después.

#### Bloque 2 (10 min) — Estado actual

Preguntas que extraen cómo funciona hoy el frente.
- **Pregunta clave:** debe destrabar la comprensión del estado actual.

#### Bloque 3 (15 min) — Diseño del frente en el sistema

Preguntas que extraen las reglas, roles o estructura que el sistema debe soportar.
- **Pregunta clave:** debe destrabar una decisión de diseño.

#### Bloque 4 (5 min) — Riesgos, restricciones o excepciones

Solo si aplica.
- **Pregunta clave:** debe destrabar un riesgo.

#### Bloque 5 (10 min) — Cierre — compromisos de la sesión

Texto en cursiva: *OCTO se compromete a:*
- [3-4 compromisos concretos]

Texto en cursiva: *[Cliente] se compromete a:*
- [3-4 compromisos concretos]

### Sección 5 — Objetivo de esta sesión

Lista de 4-5 bullets de outcomes. Adaptar al frente específico.

---

## Ejemplo: Discovery de Multi-empresa

**Bloque 2 — Definición de empresas en V1:**
- ¿Cuántas empresas del grupo existen y cuáles entran en V1?
- ¿Las empresas comparten datos o cada una maneja los suyos por separado?
- ¿Qué tan diferentes son los procesos entre empresas?
- **Pregunta clave:** *¿Hay alguna empresa que NO debería entrar nunca al portal?*

**Bloque 3 — Modelo de acceso y roles:**
- Roles internos esperados: super-admin (todo el grupo), admin de empresa, etc.
- ¿Un usuario interno puede ver datos de varias empresas o solo de la suya?
- ¿Para usuarios externos: una sola cuenta o una por empresa?
- **Pregunta clave:** *¿Hay requerimiento de auditoría/compliance que obligue a separar datos entre empresas?*

---

## Reglas para adaptar la plantilla

1. **Esta plantilla es la más flexible:** ajustar bloques al frente específico.
2. **Mantener siempre los 5 elementos críticos:** datos, objetivo, insumos previos, agenda con compromisos de cierre, y sección 5 de outcomes.
3. **Si el frente es muy técnico**, usar la plantilla de discovery técnico en su lugar.
4. **Si el frente es muy operativo de negocio**, usar la plantilla de discovery de negocio.
5. **La duración por default es 45 min** — sube solo si el frente lo amerita.
