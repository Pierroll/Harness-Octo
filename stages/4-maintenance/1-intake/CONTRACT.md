# Contrato de la etapa 1 — Intake

Este archivo es la interfaz de la etapa: qué entra, qué sale y dónde vive cada artefacto. El porqué y el orden están en `STAGE.md`.

**Firma.** Entra un reporte de error crudo. Sale un ticket estructurado listo para triage.

## Entradas

| Entrada | ¿Obligatoria? | Qué la satisface | Qué la invalida |
|---|---|---|---|
| Reporte | **Sí.** | Archivo, issue o alerta en `inbox/` | Reporte sin descripción |

## Salidas obligatorias

| Artefacto | Se produce con | Quién lo corre | Vive en |
|---|---|---|---|
| Ticket estructurado (`ticket-<numero>.md`) | Manual/Paso normal | Humano/Agente | `stages/4-maintenance/cases/<numero>/` |
| Tabla de cierre | `templates/stage-closure.md` | Agente en sesión fresca | `maintenance/1-intake/checkpoint/` |

## Condiciones de Retorno (Ciclos)

No aplica retorno desde etapas posteriores.
