# Contrato de la etapa 1 — Planificación

Este archivo es la interfaz de la etapa: qué entra (obligatorio u opcional), qué sale y
dónde vive cada artefacto. Si solo vas a abrir un archivo para saber qué necesita esta
etapa, es este. El porqué de cada uno, el orden interno y los criterios de cierre están
en `STAGE.md`.

**Firma.** Entra una propuesta firmada y el contexto comercial que la rodea: transcripts de
venta, notas y correos. Sale el problema estructurado con sus hipótesis, las sesiones
agendadas con dueño y fecha, el plan del discovery y el backlog inicial.

El problema reconstruido es la primera salida de la etapa, no una entrada. Se produce a
partir de la propuesta y de las conversaciones comerciales, y quien lo escribe tiene que
ser alguien que va a estar en el kickoff: el documento existe para contrastarlo ahí.

Una etapa se abre por sus entradas, no por la etapa anterior. Si las entradas existen y
siguen vigentes, la etapa se puede abrir, venga de donde venga el material. Eso es lo que
verifica `skills/entry-check/`.

## Entradas

Una entrada **obligatoria** que falta bloquea la etapa: sin ella el flujo no tiene
sentido. Una **opcional** que falta se registra y se sigue: la etapa sale menos afinada,
no inválida.

| Entrada | ¿Obligatoria? | Qué la satisface | Qué la invalida |
|---|---|---|---|
| Alcance comercial cerrado | **Sí.** Sin negocio cerrado no hay nada que planificar | Propuesta o contrato firmado en `discovery/1-planning/inputs/` | Un alcance en negociación: no se planifica sobre algo que puede cambiar |
| Point of contact tentativo | No. El cliente puede no haberlo asignado todavía; se confirma en el kickoff | Nombre y cargo de quién decide y valida del lado del cliente, tomado de la propuesta | Darlo por confirmado sin haberlo contrastado en el kickoff |
| Contexto comercial | No. Si no hay, se registra y el análisis de gaps sale menos afinado | Transcripts de las **llamadas comerciales** (venta: la corta y la de una hora), notas y correos relevantes. No son los transcripts de las sesiones d1, d2, d3: esos van en la etapa 2 | Nada lo invalida |

## Salidas obligatorias

| Artefacto | Se produce con | Quién lo corre | Vive en |
|---|---|---|---|
| Problema reconstruido, con sus hipótesis. Se escribe antes del kickoff y se actualiza después, marcando las hipótesis que se cayeron | `skills/gap-analysis/` sobre `templates/understanding-doc.md` | Agente con revisión humana | `discovery/1-planning/outputs/` |
| As-Is y To-Be tentativos | `skills/gap-analysis/` sobre `templates/as-is.md` y `templates/to-be.md` | Agente con revisión humana | `discovery/1-planning/outputs/as-is-draft.md` y `to-be-draft.md` |
| Temas por entender, registro de supuestos y riesgos, y temas por negociar, en borrador | `skills/gap-analysis/` | Agente con revisión humana | `discovery/1-planning/outputs/gaps-and-risks-draft.md` |
| Documento de kickoff | `skills/kickoff-discovery/`, momento 1 | Agente con revisión humana | `discovery/1-planning/outputs/ready-to-take/Kickoff_<cliente>.docx` |
| Líder de operación del cliente, entornos y accesos, con dueño y fecha | sesión de trabajo después del kickoff | Humano | `discovery/1-planning/outputs/` |
| Agendas de las sesiones, con dueño y fecha | `skills/kickoff-discovery/`, momento 2 | Agente con revisión humana | `discovery/1-planning/outputs/ready-to-take/Discoveries_<cliente>.docx` |
| Plan y cronograma de delivery del discovery | `skills/discovery-plan/` | Agente con revisión humana | `discovery/1-planning/outputs/discovery-plan.md`, y su `.xlsx` en `outputs/ready-to-take/` vía `skills/ready-to-take/` |
| Backlog inicial, con los módulos de la propuesta y todavía sin features | `templates/backlog.md` | Agente con revisión humana | raíz del repo del discovery |
| Checklist de tareas de la etapa, abierto al empezar | `templates/stage-checklist.md` | Humano | `discovery/1-planning/checkpoint/` |
| Tabla de cierre de etapa | `templates/stage-closure.md` | Agente en sesión fresca | `discovery/1-planning/checkpoint/` |
| Relevamiento para quien tome la etapa 2 | `templates/handoff.md` | Agente con revisión humana | `discovery/1-planning/outputs/` |

Qué otros documentos se construyen sobre cada salida de esta tabla, para saber qué revisar
cuando una cambia: `stages/dependencies.md`.

## Salidas según la modalidad

Aplican solo a los proyectos que las declaran en su `overrides.md`, según
`stages/modalities.md`.

| Artefacto | Cuándo aplica | Se produce con |
|---|---|---|
| Registro de demostración de viabilidad | Discovery + PoC | `skills/feasibility-demo/` |
| Chequeo de entrada | Desarrollo con alcance definido, o análisis heredado de un discovery anterior | `skills/entry-check/` |

## Cómo se abre la etapa

Corre `skills/entry-check/` contra la tabla de entradas de arriba. Por cada una responde
dos preguntas separadas: si existe, con su ruta, y si sigue vigente. El resultado es uno
de tres veredictos: entra, entra con huecos, o no entra.

Un proyecto que arranca desde cero con propuesta firmada entra por definición, y el
chequeo se resuelve en minutos. Vale la pena correrlo igual: es lo que deja escrito con
qué material se abrió la etapa.

## Cómo se cierra la etapa

Los trece criterios de la sección "Checkpoint de salida" de `STAGE.md`, verificados por
`skills/checkpoint-review/` en sesión fresca. La tabla de cierre llena es condición previa:
sin ella no hay veredicto.
