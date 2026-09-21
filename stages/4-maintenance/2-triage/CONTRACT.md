# Contrato de la etapa 2 — Triage

**Firma.** Entra un ticket estructurado. Sale el ticket con prioridad, severidad y asignación.

## Entradas

| Entrada | ¿Obligatoria? | Qué la satisface | Qué la invalida |
|---|---|---|---|
| Ticket estructurado | **Sí.** | Ticket en `maintenance/tickets/` | Falta de contexto mínimo |

## Salidas obligatorias

| Artefacto | Se produce con | Quién lo corre | Vive en |
|---|---|---|---|
| Metadata de triage | `skills/triage/` | Agente/Humano | `maintenance/tickets/` |
| Tabla de cierre | `templates/stage-closure.md` | Agente en sesión fresca | `maintenance/2-triage/checkpoint/` |

## Condiciones de Retorno (Ciclos)

| Condición de Fallo Downstream | Etapa a Reabrir | Acción requerida |
|---|---|---|
| Rechazo en 3-investigation por incomprensión | Retorno a 1-intake | Pedir más datos al cliente. |
