# Revisión con el equipo: <proyecto> — <YYYY-MM-DD>

- **Quiénes participaron:** <nombres y rol: tech lead, devs que van a construir, QA>
- **Qué se les entregó antes:** <artefactos, con ruta, y con cuánta anticipación>
- **Etapa:** 3, sobre las pantallas y la arquitectura ya escritas, antes de estimar

Esta revisión no reemplaza el checkpoint en sesión fresca. Son revisiones distintas: el
checkpoint busca romper el artefacto contra sus criterios, esta reunión busca lo que solo
sabe quien va a escribir el código.

## Qué ya existe y se puede reusar

<Componentes, servicios o módulos que el equipo ya tiene y que el diseño estaba por
construir de nuevo. Cada uno con dónde vive. Esto es lo que más plata ahorra de toda la
reunión.>

## Qué es más caro de lo que parece

<Features que el discovery estimó livianas y que el equipo sabe que no lo son, con la
razón. Va directo a la estimación.>

## Qué falta

<Huecos que el equipo detecta y que el discovery no vio.>

## Objeciones y qué se hizo con cada una

| Objeción | Quién la levantó | Resolución |
|---|---|---|
| <la objeción> | <nombre> | cambio aplicado en <artefacto> / pendiente P-XX con dueño / se descarta porque <razón> / `contradice: <ruta de un documento ya aprobado>` |

Ninguna objeción queda sin resolución escrita. "Lo conversamos" no es una resolución. Las
marcadas `contradice:` se procesan después de la reunión con `harness/skills/reopen-artifact/`.

## Impacto en la estimación

<Qué tallas se mueven y por qué. Si nada se mueve, decirlo explícitamente: una revisión
con el equipo que no cambia ningún número suele ser una revisión que no ocurrió de verdad.>
