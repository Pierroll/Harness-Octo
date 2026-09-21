# Contrato de la etapa 4 — Fix

**Firma.** Entra análisis de causa raíz e impacto. Sale el código modificado y tests asociados.

## Entradas

| Entrada | ¿Obligatoria? | Qué la satisface | Qué la invalida |
|---|---|---|---|
| Análisis de causa raíz | **Sí.** | `root-cause.md` validado | Supuestos sin probar |

## Salidas obligatorias

| Artefacto | Se produce con | Quién lo corre | Vive en |
|---|---|---|---|
| Implementación de Fix | `skills/fix-implementation/` | Agente (Paso Normal) | Repo (código) |
| Tabla de cierre | `templates/stage-closure.md` | Agente en sesión fresca | `maintenance/4-fix/checkpoint/` |

## Condiciones de Retorno (Ciclos)

| Condición de Fallo Downstream | Etapa a Reabrir | Acción requerida |
|---|---|---|
| Rechazo en 5-verification (tests rotos o regresión) | Retorno a 4-fix | Se descarta el parche y se implementa uno nuevo. |
