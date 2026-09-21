---
name: reopen-technical-iteration
description: >
  Invalida un artefacto técnico (ej. análisis de causa raíz o fix implementado)
  cuando falla en una etapa posterior (como Verificación), forzando un reintento.
  A diferencia de reopen-artifact, esto no es un cambio de alcance del cliente,
  sino un fallo técnico en el ciclo de mantenimiento.
---

# Reopen Technical Iteration — bucle de fallo en mantenimiento

## Cuándo usarlo
Este skill se ejecuta cuando una etapa cíclica de mantenimiento (ej. Verificación) rechaza el trabajo de una etapa anterior (ej. Fix o Investigación), obligando a volver físicamente hacia atrás en el flujo. No se usa para cambios de requerimientos del cliente (para eso existe `reopen-artifact`).

## Procedimiento

1. **Identifica el origen del fallo:** Lee el checkpoint rechazado de la etapa downstream (ej. `5-verification/checkpoint/`).
### 2. Invalidación Aislada (Namespacing)
Todo fallo técnico debe encapsularse en el directorio del caso actual (`pwd`, que debe ser `stages/4-maintenance/cases/<issue-number>/`).
- **NUNCA** escribas en las carpetas globales `4-fix/` o `5-verification/`.
- Crea un directorio local llamado `versions/` dentro de la carpeta del caso si no existe.
- Mueve el artefacto técnico erróneo (ej. `patch.diff` o código modificado) a `versions/<nombre-artefacto>-v<numero>-failed.<ext>`.
- Limpia el espacio de trabajo del caso para que el agente de Fix pueda empezar de cero, manteniendo intactos los artefactos validados (como `ticket.md` o `root-cause.md`).

### 4. Registro de Iteración Local
Para evitar colisiones entre tickets paralelos, el registro del fallo debe vivir junto al contexto del caso.
- Crea (o concatena si ya existe) un archivo llamado `iteration-record.md` **exactamente en la raíz de la carpeta del caso actual**.
- El documento debe contener:
  1. **Timestamp:** Fecha y hora del rechazo.
  2. **Veredicto del Test:** La salida cruda o el motivo exacto del rechazo en la etapa de Verificación.
  3. **Hipótesis Refutada:** Qué intentó hacer el parche y por qué no funcionó.

Este procedimiento permite que el arnés orqueste iteraciones de fallo puro sin ensuciar la semántica de "cambios de negocio" propios de Discovery.
