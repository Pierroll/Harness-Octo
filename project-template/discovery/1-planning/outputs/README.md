# Outputs de la etapa 1 — Planificación

Lo que esta etapa produce. La firma, con skill y quién lo corre, está en
`harness/stages/1-planning/CONTRACT.md`.

Estos archivos **los produce el arnés o el PM**. No se pre-crean vacíos: aparecen cuando
el skill corre. Hasta entonces, esta carpeta puede tener solo este README.

| Archivo esperado | Lo produce | Qué es |
|---|---|---|
| `understanding-doc.md` | `gap-analysis` | Problema reconstruido, con hipótesis, para contrastarlo en el kickoff. |
| `as-is-draft.md` | `gap-analysis` | Cómo trabaja hoy el cliente, tentativo: sale de la propuesta. La etapa 2 lo valida en `2-analysis/outputs/as-is.md`; este borrador se queda aquí como constancia. |
| `to-be-draft.md` | `gap-analysis` | Cómo debería quedar, tentativo. Mismo recorrido que el As-Is. |
| `gaps-and-risks-draft.md` | `gap-analysis` | Temas por entender, supuestos y riesgos, temas por negociar. Borrador porque aún no tiene mitigación ni dueño; la etapa 2 parte de él. |
| `discovery-plan.md` | `discovery-plan` | Gantt del discovery: las semanas enteras, reuniones **y** trabajo interno, feriados. Su versión para el cliente es el `.xlsx` de `ready-to-take/`, aquí mismo. |
| documento de líder de operación, entornos y accesos | humano, después del kickoff | El contrato no fija el nombre. Dueño y fecha por acceso. |
| `handoff.md` | plantilla `handoff.md` | Relevamiento para quien tome la etapa 2. |

La subcarpeta `ready-to-take/` de esta misma carpeta guarda los entregables de la etapa
en el formato en que se los lleva el cliente: `Kickoff_<cliente>.docx` (momento 1 de
`kickoff-discovery`), `Discoveries_<cliente>.docx` (momento 2, después del kickoff) y el
`.xlsx` del gantt. Ver `harness/skills/ready-to-take/`.

El `backlog.md` inicial (módulos de la propuesta, todavía sin features) vive en la
**raíz** del repo.

La subcarpeta `versions/` de esta misma carpeta guarda la copia congelada de un documento
justo antes de cambiarlo, solo si ya pasó checkpoint o ya se le mostró al cliente
(`<nombre>-v<N>.md`). Se crea la primera vez que hace falta. Ver `harness/skills/reopen-artifact/`.
