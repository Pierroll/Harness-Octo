# Contrato de la etapa 2 — Análisis

Este archivo es la interfaz de la etapa: qué entra (obligatorio u opcional), qué sale y
dónde vive cada artefacto. Si solo vas a abrir un archivo para saber qué necesita esta
etapa, es este. El porqué de cada uno, la negociación del RF light y los criterios de
cierre están en `STAGE.md`.

**Firma.** Entran las sesiones ejecutadas con su transcript, más los temas y el As-Is y
To-Be tentativos que dejó la etapa 1. Sale la solución dibujada, el alcance decidido
requisito por requisito, el catálogo detallado con criterios de aceptación y el
entendimiento que diseño necesita para empezar.

Una etapa se abre por sus entradas, no por la etapa anterior. Casi todo lo de la tabla de
entradas es salida de la etapa 1, así que en un discovery completo llega solo. La tabla
existe igual porque un proyecto puede entrar directo por la etapa 2: un cliente que vuelve por una
fase nueva, o uno que llega con el análisis hecho. Ver `stages/modalities.md`.

## Entradas

Si la etapa 1 no se corrió en este repo, el paquete se deja en
`discovery/2-analysis/inputs/inherited/` (nombres fijos en el README de esa carpeta).
`entry-check` lo busca ahí y lo copia al sitio de trabajo. Ver
`discovery/2-analysis/inputs/start-here.md`.

Una entrada **obligatoria** que falta bloquea la etapa; una **opcional** que falta se
registra y se sigue.

| Entrada | ¿Obligatoria? | Qué la satisface | Qué la invalida |
|---|---|---|---|
| Transcript de cada sesión ejecutada | **Sí.** Sin transcript no hay sesión procesable | `discovery/2-analysis/inputs/d<N>-transcript.md`, vía `skills/import-transcript/` o pegado a mano. No va en `inherited/` | Un resumen de memoria en lugar del transcript |
| Temas por entender con sesión asignada | **Sí** | `discovery/1-planning/outputs/gaps-and-risks-draft.md`, o `gaps-and-risks.md` dejado en `2-analysis/inputs/inherited/` | Que se haya escrito antes de un cambio grande en el sistema del cliente |
| As-Is y To-Be tentativos | **Sí.** Lo que no vale es empezar a levantar el As-Is desde cero en las sesiones | `discovery/1-planning/outputs/as-is-draft.md` y `to-be-draft.md`, o `as-is.md` y `to-be.md` en `inherited/` | Nada lo invalida: la etapa 2 los profundiza |
| Calendario de sesiones con dueños | **Sí** | `discovery/1-planning/outputs/ready-to-take/Discoveries_<cliente>.docx`, o `2-analysis/inputs/inherited/session-calendar.md` (o `Discoveries.docx` ahí) | Fechas sin confirmar del lado del cliente |
| Backlog inicializado | No. Si falta, se inicializa desde la propuesta al abrir la etapa y se registra el hueco | `backlog.md` en la raíz del repo, o `inherited/backlog.md` si el de la raíz sigue siendo plantilla vacía | Si el cliente vuelve por una fase nueva: que sea un archivo nuevo en vez del del proyecto anterior |

## Salidas obligatorias

| Artefacto | Se produce con | Quién lo corre | Vive en |
|---|---|---|---|
| Notas estructuradas por sesión | `skills/discovery-session/` | Agente con revisión humana | `discovery/2-analysis/outputs/` |
| Acta por sesión, como registro corto y legible | `skills/discovery-session/` | Agente con revisión humana | `discovery/2-analysis/outputs/` |
| Documento de entendimiento por sesión, que alimenta la agenda de la siguiente | `skills/discovery-session/` sobre `templates/session-understanding.md` | Agente con revisión humana | `discovery/2-analysis/outputs/` |
| Inventarios: campos, reglas, fuentes externas, estados, usuarios | `skills/discovery-session/`, acumulativo | Agente con revisión humana | `discovery/2-analysis/outputs/` |
| Mapa de procesos As-Is, con los SLA entre etapas | `templates/as-is.md`, sobre `1-planning/outputs/as-is-draft.md`, validado con el cliente | Agente con revisión humana | `discovery/2-analysis/outputs/as-is.md`, y su `.docx` en `outputs/ready-to-take/` vía `skills/ready-to-take/` |
| Proceso real del negocio, contado sin sistemas | `skills/discovery-session/` | Agente con revisión humana | `discovery/2-analysis/outputs/` |
| Mapa de estados por entidad | `skills/discovery-session/`, en `inventory-states.md` | Agente con revisión humana | `discovery/2-analysis/outputs/` |
| Mapa de procesos To-Be, con owner por etapa | `templates/to-be.md`, sobre `1-planning/outputs/to-be-draft.md` | Agente con revisión humana | `discovery/2-analysis/outputs/to-be.md`, y su `.docx` en `outputs/ready-to-take/` vía `skills/ready-to-take/` |
| Diagrama de arquitectura de alto nivel | `skills/technical-design/` en modo corto, acumulativo | Agente con revisión humana | `discovery/2-analysis/outputs/` |
| Tabla de roles y niveles de acceso, con el perfil de cada usuario | `skills/technical-design/` en modo corto, sobre `inventory-users.md` | Agente con revisión humana | `discovery/2-analysis/outputs/` |
| Tabla de riesgos, cada uno con mitigación y dueño | `skills/technical-design/` en modo corto, sobre `1-planning/outputs/gaps-and-risks-draft.md` | Agente con revisión humana | `discovery/2-analysis/outputs/gaps-and-risks.md` |
| RF light, sin números | `skills/requirements-lite/` | Agente con revisión humana | `discovery/2-analysis/outputs/requirements-lite.md`, y su `.docx` en `outputs/ready-to-take/Requerimientos_<cliente>.docx` |
| Registro de decisiones de alcance | `templates/scope-decisions.md` | Humano | `discovery/2-analysis/outputs/` |
| RF detallado y RNF, con criterios Dado/Cuando/Entonces | `skills/requirements-full/` | Agente con revisión humana | `discovery/2-analysis/outputs/requirements-full.md`, y su `.docx` en `outputs/ready-to-take/Requisitos_<cliente>.docx` |
| Casos de prueba QA sobre los RF detallados | QA agrega sobre `requirements-full` | Humano | mismo documento |
| Cronograma tentativo del proyecto | `skills/estimation/` en modo grueso, sobre `templates/implementation-schedule.md` | Agente con revisión humana | `discovery/2-analysis/outputs/`, y su `.xlsx` en `outputs/ready-to-take/` vía `skills/ready-to-take/` |
| Documento de entendimiento para diseño | `skills/design-brief/` | Agente con revisión humana | `discovery/2-analysis/outputs/` |
| Lista de entregables del discovery | se arma con los artefactos de esta tabla | Agente con revisión humana | `discovery/2-analysis/outputs/` |
| Checklist de tareas de la etapa, abierto al empezar | `templates/stage-checklist.md` | Humano | `discovery/2-analysis/checkpoint/` |
| Tabla de cierre de etapa | `templates/stage-closure.md` | Agente en sesión fresca | `discovery/2-analysis/checkpoint/` |
| Relevamiento para quien tome la etapa 3 | `templates/handoff.md` | Agente con revisión humana | `discovery/2-analysis/outputs/` |

El acta es la única de esta tabla que puede faltar sin frenar el cierre de la etapa.
Enviarla al cliente queda como decisión del PM, proyecto por proyecto.

Qué otros documentos se construyen sobre cada salida de esta tabla, para saber qué revisar
cuando una cambia: `stages/dependencies.md`.

## Salidas según la modalidad

| Artefacto | Cuándo aplica | Se produce con |
|---|---|---|
| Registro de demostración de viabilidad | Discovery + PoC | `skills/feasibility-demo/` |
| Chequeo de entrada | Cuando no se corrió la etapa 1 | `skills/entry-check/` |

En **desarrollo con alcance definido** el catálogo completo de RF no aplica: el alcance ya
viene cerrado en la propuesta o en el TDR. Se producen As-Is, inventario de integraciones y
riesgos, y requisitos solo del cambio que se va a construir. Se declara en el `overrides.md`
del proyecto y se justifica en la tabla de cierre.

## Cómo se abre la etapa

Corre `skills/entry-check/` contra la tabla de entradas de arriba. Por cada una responde
dos preguntas separadas: si existe, con su ruta, y si sigue vigente. El resultado es uno
de tres veredictos: entra, entra con huecos, o no entra.

Entra con huecos es el caso más común cuando el material viene de un discovery anterior, y
no es una excepción: es un paso acotado de la etapa 1 sobre lo que falta, no la etapa
entera. La bandeja de ese material es `inputs/inherited/`.

## Cómo se cierra la etapa

Los once criterios de la sección "Checkpoint de salida" de `STAGE.md`, más
`skills/checkpoint-review/references/requirements-checklist.md`, verificados en sesión
fresca. La tabla de cierre llena es condición previa: sin ella no hay veredicto.
