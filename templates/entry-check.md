# Chequeo de entrada: etapa <N> — <proyecto> — <YYYY-MM-DD>

Este documento reemplaza al checkpoint de la etapa que no se corrió. No se entra a una
etapa gratis: se entra con un papel que dice por qué se tiene derecho a entrar ahí.

- **Modalidad declarada:** <ver `overrides.md` del proyecto y `stages/modalities.md`>
- **A qué etapa se quiere entrar:** <1 / 2 / 3>
- **Por qué no se corrió la etapa anterior:** <discovery previo del mismo cliente /
  alcance ya cerrado en la propuesta / relevamiento sobre sistema existente>
- **Bandeja `inherited/`:** <vacía (flujo normal) / con paquete / no aplica (etapa 1)>
- **Versión del arnés con la que se abre:** <commit corto del submódulo `harness/`,
  `git -C harness rev-parse --short HEAD`>

## Entradas requeridas

Cada entrada se evalúa por dos preguntas distintas: si existe, y si sigue siendo cierta.
Un artefacto que existe pero describe un sistema que ya cambió es peor que uno que falta,
porque nadie sospecha de él.

| Entrada requerida | ¿Existe? | ¿Dónde está? | Origen | ¿Sigue vigente? | Qué falta |
|---|---|---|---|---|---|
| <artefacto que la etapa necesita> | sí / no | <ruta de trabajo> | canónico / inherited / copiado a canónico el <fecha> | vigente / desactualizado / no aplica | <nada, o qué hay que producir> |

## Copias desde inherited/

<Si no hubo paquete heredado: "no aplica". Si sí: qué archivo se copió, de dónde, a
dónde, en qué fecha. inherited/ no se edita después de esta copia.>

## Evaluación de vigencia

<Para cada entrada marcada como desactualizada: qué cambió desde que se escribió y qué
parte sigue sirviendo. Un discovery de hace ocho meses sobre un sistema que ya se shippeó
describe un mundo que cambió; decir cuánto es el trabajo de esta sección.>

## Veredicto

Uno de tres:

- **Entra.** Todas las entradas existen y están vigentes.
- **Entra con huecos.** Existen las principales; falta lo que está en la lista de abajo y
  hay que producirlo antes de avanzar. Esto es lo más común.
- **No entra.** Falta demasiado. Corresponde correr la etapa anterior completa.

**Veredicto: <uno de los tres>**

## Huecos a llenar antes de avanzar

| Hueco | Qué lo llena | Quién | Para cuándo |
|---|---|---|---|
| <lo que falta> | <sesión, documento, llamada corta> | <nombre> | <fecha> |

## Punto de anclaje

<Para un cliente que vuelve: el `backlog.md` del proyecto anterior. Los features nuevos
entran al mismo archivo, no a uno nuevo. Decir en esta sección dónde está ese archivo y
qué features quedaron en `done`, porque eso es lo que separa lo viejo de lo nuevo.>
