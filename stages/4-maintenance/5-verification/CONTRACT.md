# Contrato de la etapa 5 — Verificación

**Firma.** Entra el código arreglado. Sale el veredicto de calidad (PASA/RECHAZADO).

## Entradas

| Entrada | ¿Obligatoria? | Qué la satisface | Qué la invalida |
|---|---|---|---|
| Fix implementado | **Sí.** | Hash SHA inmutable (Receipt) en rama efímera | Fix que no compila |

## Salidas obligatorias

| Artefacto | Se produce con | Quién lo corre | Vive en |
|---|---|---|---|
| Veredicto de Verificación | `skills/run-verification/` | Sub-agente adversarial | `maintenance/5-verification/outputs/` |
| Tabla de cierre | `templates/stage-closure.md` | Agente en sesión fresca | `maintenance/5-verification/checkpoint/` |

## Condiciones de Retorno (Ciclos)

Esta etapa emite los fallos que provocan los retornos a etapas 3 y 4. No retorna a sí misma.
