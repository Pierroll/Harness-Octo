# Contrato de la etapa 3 — Diseño

Este archivo es la interfaz de la etapa: qué entra (obligatorio u opcional), qué sale y
dónde vive cada artefacto. Si solo vas a abrir un archivo para saber qué necesita esta
etapa, es este. El porqué del orden, la razón de que la revisión con el equipo viva en
esta etapa y los criterios de cierre están en `STAGE.md`.

**Firma.** Entra el catálogo de requisitos auditado sobre el alcance que el cliente
decidió, más lo que diseño necesita para empezar. Salen las pantallas, la arquitectura, el
modelo de datos, la estimación refinada con el equipo y el informe que cierra el discovery.

Es la etapa más sensible del arnés. Los artefactos marcados [frontera] se corren con el
modelo más capaz disponible.

## Entradas

Son cinco. Un proyecto que quiere entrar directo por la etapa 3 tiene que traer estas cinco
entradas y ninguna otra, y cada una tiene que estar vigente además de existir.

Si la etapa 2 no se corrió en este repo, el paquete se deja en
`discovery/3-design/inputs/inherited/` (nombres fijos en el README de esa carpeta).
`entry-check` lo busca ahí y lo copia al sitio de trabajo. Ver
`discovery/3-design/inputs/start-here.md`. Tener transcripts y esa carpeta vacía no alcanza.

Las cinco son **obligatorias**: lo que sale de esta etapa se firma, y diseñar sobre una
entrada que falta es diseñar sobre un invento. La única que puede satisfacerse "en vacío"
es la de restricciones: un `overrides.md` que declara que no hay restricciones cuenta;
uno que no dice nada, no.

| Entrada | ¿Obligatoria? | Qué la satisface | Qué la invalida |
|---|---|---|---|
| Catálogo de requisitos auditado | **Sí** | RF detallado y RNF (`2-analysis/outputs/requirements-full.md`, con su `.docx` en `ready-to-take/`; o `3-design/inputs/inherited/requirements-full.md` o `Requisitos.docx`) más `scope-decisions.md` | Requisitos sobre alcance que el cliente no confirmó en `scope-decisions.md` |
| Inventario de fuentes externas e integraciones | **Sí** | `discovery/2-analysis/outputs/inventory-sources.md`, o el mismo nombre en `inherited/` | Que describa el sistema del cliente antes de un cambio que ya ocurrió |
| Registro de riesgos vivo | **Sí** | `discovery/2-analysis/outputs/gaps-and-risks.md`, o el mismo nombre en `inherited/` | Nada: la etapa 3 lo refina, no lo crea de nuevo |
| Restricciones del cliente | **Sí**, aunque sea para declarar que no hay | `overrides.md` del proyecto: stack impuesto, hosting, compliance. No va en `inherited/` | Restricciones conocidas y no declaradas |
| Documento de entendimiento para diseño | **Sí** | `discovery/2-analysis/outputs/design-brief.md`, o el mismo nombre en `inherited/`, con su fecha de vigencia | Que sea anterior a un cambio de requisitos, de roles o de estados que ya ocurrió |

## Salidas obligatorias

| Artefacto | Se produce con | Quién lo corre | Vive en |
|---|---|---|---|
| Inventario de flujos y pantallas, cada una con sus requisitos | `skills/ui-design/` [frontera] | Agente con revisión humana | `discovery/3-design/outputs/screen-inventory.md`, y su `.docx` en `outputs/ready-to-take/` vía `skills/ready-to-take/` |
| Design system, con bitácora de decisiones | `skills/ui-design/`: del cliente, de una librería pública o elegido en el tablero con el equipo de diseño, según el camino del paso 2 | Agente con revisión humana | `discovery/3-design/outputs/design-system.md`, y su CSS en `outputs/mockups/design-system.css` |
| Mockups: imágenes por pantalla, tableros y HTML por flujo, presentados al cliente | `skills/ui-design/` | Agente con revisión humana; elige el PM con diseño | `discovery/3-design/outputs/mockups/`; el HTML validado pasa a Figma en el paso 9 y el archivo queda referenciado en la sección 8 del inventario |
| Arquitectura técnica de alto nivel | `skills/technical-design/` [frontera] | Agente con revisión humana | `discovery/3-design/outputs/architecture.md`, y su diagrama en `.png` más el `.docx` en `outputs/ready-to-take/` vía `skills/ready-to-take/` |
| Modelo de datos de alto nivel | `skills/technical-design/` [frontera] | Agente con revisión humana | `discovery/3-design/outputs/data-model.md`, y su diagrama en `.png` más el `.docx` en `outputs/ready-to-take/` vía `skills/ready-to-take/` |
| Mapa de integraciones, con decisión por fuente | `skills/technical-design/` [frontera] | Agente con revisión humana | `discovery/3-design/outputs/integrations.md`, y su `.docx` en `outputs/ready-to-take/` vía `skills/ready-to-take/` |
| Matriz de roles y permisos, con módulos y acciones | `skills/technical-design/` sobre la tabla de roles de la etapa 2 | Agente con revisión humana | `discovery/3-design/outputs/roles-matrix.md`, y su `.docx` en `outputs/ready-to-take/` vía `skills/ready-to-take/` |
| Registro de la sesión con el equipo | `skills/team-review/`, dentro del paso de estimación | Humano | `discovery/3-design/outputs/` |
| Registro de riesgos refinado con el detalle técnico | `skills/technical-design/` sobre el de la etapa 2 | Agente con revisión humana | `discovery/3-design/outputs/gaps-and-risks.md` |
| Estimación de esfuerzo refinada por módulo | `skills/estimation/` [frontera] | Agente con revisión humana | `discovery/3-design/outputs/` |
| Cronograma de implementación, con sus hitos | `skills/estimation/` sobre `templates/implementation-schedule.md` | Agente con revisión humana | `discovery/3-design/outputs/`, y su `.xlsx` en `outputs/ready-to-take/` vía `skills/ready-to-take/` |
| Informe final de discovery | `skills/discovery-report/` | Agente con revisión humana | `discovery/3-design/outputs/discovery-report.md`, y su `.docx` en `outputs/ready-to-take/` vía `skills/ready-to-take/` |
| Checklist de tareas de la etapa, abierto al empezar | `templates/stage-checklist.md` | Humano | `discovery/3-design/checkpoint/` |
| Tabla de cierre de etapa | `templates/stage-closure.md` | Agente en sesión fresca | `discovery/3-design/checkpoint/` |
| Relevamiento para quien tome la implementación | `templates/handoff.md` | Agente con revisión humana | `discovery/3-design/outputs/` |

Qué otros documentos se construyen sobre cada salida de esta tabla, para saber qué revisar
cuando una cambia: `stages/dependencies.md`.

## Salidas según la modalidad

| Artefacto | Cuándo aplica | Se produce con |
|---|---|---|
| RF detallado extendido | Cuando el cliente lo pide por contrato, para que un proveedor externo construya una parte | `skills/requirements-full/`, con el modelo de datos y los diseños aprobados incrustados en cada historia |
| Chequeo de entrada | Cuando no se corrió la etapa 2 | `skills/entry-check/` |

Esta etapa puede no correr. Si el cliente compró solo el análisis, el discovery cierra al
terminar el catálogo de requisitos detallados y se lleva eso. El proyecto declara en su
`overrides.md` hasta dónde llega.

## Cómo se abre la etapa

Corre `skills/entry-check/` contra las cinco entradas de arriba. Por cada una responde dos
preguntas separadas: si existe, con su ruta, y si sigue vigente. El resultado es uno de tres
veredictos: entra, entra con huecos, o no entra. Si la etapa 2 no se corrió, el paquete
está en `inputs/inherited/` y el chequeo lo copia al sitio de trabajo.

En la etapa 3 la vigencia pesa más que en las otras dos, porque lo que sale de esta se firma.
Un `design-brief.md` anterior a un cambio de roles, o un inventario de fuentes anterior a
una migración del cliente, producen una arquitectura y una estimación que se pagan durante
todo el proyecto.

## Cómo se cierra la etapa

Los ocho criterios de la sección "Checkpoint de salida" de `STAGE.md`, verificados por
`skills/checkpoint-review/` en sesión fresca. Para arquitectura y estimación, la sesión
fresca también corre en modelo frontera. La tabla de cierre llena es condición previa: sin
ella no hay veredicto.
