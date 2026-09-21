# Contrato de la etapa 3 — Investigación

**Firma.** Entra un ticket priorizado. Sale un análisis de causa raíz y un informe de impacto.

## Entradas

| Entrada | ¿Obligatoria? | Qué la satisface | Qué la invalida |
|---|---|---|---|
| Ticket triado | **Sí.** | Ticket en `maintenance/tickets/` | Severidad no definida |

## Salidas obligatorias

| Artefacto | Se produce con | Quién lo corre | Vive en |
|---|---|---|---|
| Reproducción de Issue | `skills/reproduce-issue/` | Sub-agente | `maintenance/3-investigation/outputs/` |
| Análisis de causa raíz | `skills/root-cause-analysis/` | Sub-agente múltiple | `maintenance/3-investigation/outputs/` |
| Análisis de impacto | `skills/impact-analysis/` | Sub-agente | `maintenance/3-investigation/outputs/` |
| Tabla de cierre | `templates/stage-closure.md` | Agente en sesión fresca | `maintenance/3-investigation/checkpoint/` |

## Condiciones de Retorno (Ciclos)

| Condición de Fallo Downstream | Etapa a Reabrir | Acción requerida |
|---|---|---|
| Rechazo en 5-verification (causa raíz equivocada) | Retorno a 3-investigation | Se invalida el `root-cause.md` y se explora otra hipótesis. |
