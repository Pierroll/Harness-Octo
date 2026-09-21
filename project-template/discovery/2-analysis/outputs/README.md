# Outputs de la etapa 2 — Análisis

Lo que esta etapa produce. La firma está en `harness/stages/2-analysis/CONTRACT.md`.
No se pre-crean vacíos.

Por cada sesión procesada (`discovery-session`):

| Archivo esperado | Qué es |
|---|---|
| `d<N>-notes.md` | Notas internas: hallazgos, decisiones, pendientes, candidatos a RF. |
| `d<N>-acta.md` | Acta corta y legible. Se produce siempre; enviarla al cliente es decisión del PM. |
| `d<N>-entendimiento.md` | Entendimiento de la sesión, alimenta la agenda de la siguiente. |

Inventarios acumulativos (el mismo archivo crece sesión a sesión):

| Archivo esperado | Qué es |
|---|---|
| `inventory-fields.md` | Campos y validaciones. |
| `inventory-rules.md` | Reglas de negocio, duras o de criterio. |
| `inventory-sources.md` | Fuentes externas e integraciones. Entrada de la etapa 3. |
| `inventory-states.md` | Mapa de estados por entidad. |
| `inventory-users.md` | Quién es la persona detrás de cada rol. |

Solución dibujada y alcance:

| Archivo esperado | Lo produce | Qué es |
|---|---|---|
| `as-is.md` | validación con el cliente, sobre `1-planning/outputs/as-is-draft.md` | Mapa de procesos As-Is con SLA, ya validado. El borrador se queda en la etapa 1. |
| `to-be.md` | sobre `1-planning/outputs/to-be-draft.md` | Mapa de procesos To-Be, con owner por etapa. |
| `gaps-and-risks.md` | sobre `1-planning/outputs/gaps-and-risks-draft.md` | Tabla de riesgos validada: cada supuesto confirmado o caído, con mitigación y dueño. |
| `diagram-l0.md` | `technical-design` modo corto | Arquitectura de alto nivel, sin stack. |
| `roles-table.md` | `technical-design` modo corto | Roles y niveles de acceso. |
| `scope-decisions.md` | humano | Dentro / fuera / diferido, requisito por requisito. |
| `requirements-lite.md` | `requirements-lite` | RF light: título y párrafo por requisito, sin números, para negociar el alcance. Es el registro; su `.docx` va en `ready-to-take/`. |
| `requirements-full.md` | `requirements-full` | RF detallado y RNF con Dado/Cuando/Entonces, solo sobre lo que quedó dentro. Es el registro; su `.docx` va en `ready-to-take/`. Entrada de la etapa 3. |
| cronograma tentativo | `estimation` modo grueso | Sobre `templates/implementation-schedule.md`. Su `.xlsx` va en `ready-to-take/`. |
| `design-brief.md` | `design-brief` | Lo que diseño necesita para empezar. Entrada de la etapa 3. |
| `handoff.md` | plantilla `handoff.md` | Relevamiento para quien tome la etapa 3. |

La subcarpeta `ready-to-take/` de esta misma carpeta guarda los entregables de la etapa
en formato cliente: `Requerimientos_<cliente>.docx` (RF light, generado desde `requirements-lite.md`),
`Requisitos_<cliente>.docx` (RF full, generado desde `requirements-full.md`),
el `.xlsx` del cronograma tentativo y las actas que el PM decida enviar. Ver
`harness/skills/ready-to-take/`.

La subcarpeta `versions/` de esta misma carpeta guarda la copia congelada de un documento
justo antes de cambiarlo, solo si ya pasó checkpoint o ya se le mostró al cliente
(`<nombre>-v<N>.md`). Se crea la primera vez que hace falta. Ver `harness/skills/reopen-artifact/`.
