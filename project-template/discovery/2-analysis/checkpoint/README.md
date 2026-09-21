# Checkpoint de la etapa 2 — Análisis

Registros de validación. Un README no es un registro.

| Archivo esperado | Lo produce | Cuándo |
|---|---|---|
| `stage-checklist.md` | humano, copia de `harness/templates/stage-checklist.md` | Al **abrir** la etapa. |
| `entry-check.md` | `entry-check` | Al abrir. **Obligatorio** si no se corrió la etapa 1: este documento reemplaza al checkpoint que no existió. |
| `stage-closure.md` | sesión fresca | Al **cerrar**. |
| `<fecha>-2-analysis.md` | `checkpoint-review` | Al cerrar. Para requisitos usa además `harness/skills/checkpoint-review/references/requirements-checklist.md`. |

Veredictos de cierre: PASA / PASA CON RIESGO ACEPTADO / RECHAZADO. Un rechazo no cierra
la etapa y no autoriza a abrir la 3.
