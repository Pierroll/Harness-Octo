# Cierre de etapa <N> — <proyecto> — <YYYY-MM-DD>

Se llena al cerrar la etapa, junto con el registro del checkpoint. Responde la pregunta
que un delivery manager hace siempre: esperabas diez cosas, saliste con ocho, qué pasó con
las otras dos.

## Goals de la etapa

<Copiados del `STAGE.md` correspondiente, numerados, con su estado. No se reescriben en
esta tabla: si un goal ya no aplica, eso es un override y va declarado como tal.>

| # | Goal | Estado |
|---|---|---|
| 1 | <goal> | cumplido / parcial / no cumplido |

## Artefactos

| Artefacto | Estado | Si está incompleto, por qué | Quién lo destraba | Para cuándo |
|---|---|---|---|---|
| <nombre y ruta> | completo / incompleto / no aplica | <la razón real, no "falta tiempo"> | <nombre> | <fecha> |

"No aplica" necesita justificación igual que "incompleto": qué modalidad o qué override
hace que ese artefacto no corresponda en este proyecto.

## Resumen

- Artefactos esperados: <N>
- Completos: <N>
- Incompletos con dueño y fecha: <N>
- No aplican por modalidad declarada: <N>

## Documentos de etapas anteriores reabiertos durante esta etapa

| Documento | Por qué se reabrió | Reopen-record | Checkpoint acotado |
|---|---|---|---|
| <ruta> | <la información nueva, en una línea> | `checkpoint/<fecha>-reopen-<tema>.md` | PASA / pendiente |

Si no se reabrió nada, se escribe "ninguno" y se mira dos veces: en un discovery de cuatro
semanas es raro que la etapa 3 no le corrija nada a la 2.

## Lo que la etapa siguiente hereda

<Los incompletos que no bloquean el avance, y por qué no bloquean. Si algo incompleto sí
bloquea, la etapa no cierra: se corrige o se declara el avance bajo riesgo con la decisión
del PM registrada.>

## Decisión

**La etapa cierra / no cierra.** <Si cierra con incompletos, quién tomó esa decisión.>
