# Dependencias: si cambia esto, revisa aquello

La tabla que usa `skills/reopen-artifact/` para saber qué documentos revisar cuando llega
información nueva. Una fila por artefacto, en dirección hacia adelante: qué se construyó
sobre él. Para leerla hacia atrás (de qué salió un documento) se busca el nombre en la
columna derecha.

Las filas salen de las columnas "Se produce con" y "Vive en" de los tres `CONTRACT.md`.
Cuando un contrato cambia, esta tabla cambia en el mismo commit.

Las rutas son relativas a `discovery/` del repo del proyecto, salvo `backlog.md` y
`overrides.md`, que viven en la raíz. Los `.docx` y `.xlsx` están en `outputs/ready-to-take/`
de su etapa.

## Etapa 1

| Si cambia | Revisa |
|---|---|
| La propuesta firmada (`1-planning/inputs/`) | `understanding-doc.md`, `as-is-draft.md`, `to-be-draft.md`, `gaps-and-risks-draft.md`, `backlog.md` (módulos) |
| `1-planning/outputs/understanding-doc.md` | `gaps-and-risks-draft.md`, `Kickoff_<cliente>.docx`, `3-design/outputs/discovery-report.md` (sección "el problema como lo entendimos") |
| `1-planning/outputs/as-is-draft.md` | `2-analysis/outputs/as-is.md` |
| `1-planning/outputs/to-be-draft.md` | `2-analysis/outputs/to-be.md` |
| `1-planning/outputs/gaps-and-risks-draft.md` | `Kickoff_<cliente>.docx` (temas), `Discoveries_<cliente>.docx` (sesión por tema), `discovery-plan.md`, `2-analysis/outputs/gaps-and-risks.md` |
| Líder de operación, entornos y accesos (`1-planning/outputs/`) | `Discoveries_<cliente>.docx`, `discovery-plan.md`, `handoff.md` |
| `Discoveries_<cliente>.docx` | `discovery-plan.md`, agendas regeneradas antes de cada sesión |
| `1-planning/outputs/discovery-plan.md` | `Gantt_Discovery_<cliente>.xlsx` |
| `backlog.md` | cronograma tentativo, `3-design/outputs/estimation.md`, cronograma de implementación |

## Etapa 2

| Si cambia | Revisa |
|---|---|
| `2-analysis/inputs/d<N>-transcript.md` | `d<N>-notes.md`, `d<N>-acta.md`, `d<N>-entendimiento.md`, los cinco `inventory-*.md` |
| `2-analysis/outputs/d<N>-notes.md` | `d<N>-acta.md`, `d<N>-entendimiento.md`, `inventory-*.md`, `gaps-and-risks.md`, `requirements-lite.md` (candidatos a requisito) |
| `2-analysis/outputs/d<N>-entendimiento.md` | agenda de la sesión siguiente, `design-brief.md` |
| `2-analysis/outputs/inventory-fields.md` | `requirements-lite.md`, `requirements-full.md`, `design-brief.md`, `3-design/outputs/data-model.md`, `3-design/outputs/mockups/` (etiquetas de los HTML) |
| `2-analysis/outputs/inventory-rules.md` | `requirements-full.md`, `design-brief.md`, `3-design/outputs/architecture.md` |
| `2-analysis/outputs/inventory-sources.md` | `diagram-l0.md`, `requirements-full.md` (campo "Sistema actual"), `design-brief.md`, `3-design/outputs/integrations.md`, `estimation.md` |
| `2-analysis/outputs/inventory-states.md` | `design-brief.md`, `requirements-full.md`, `3-design/outputs/data-model.md`, `3-design/outputs/screen-inventory.md` (estados a dibujar) |
| `2-analysis/outputs/inventory-users.md` | `roles-table.md`, `design-brief.md` |
| `2-analysis/outputs/as-is.md` | `to-be.md`, `diagram-l0.md`, `design-brief.md`, `3-design/outputs/discovery-report.md` |
| `2-analysis/outputs/to-be.md` | `diagram-l0.md`, `roles-table.md`, `requirements-lite.md`, `3-design/outputs/discovery-report.md` |
| `2-analysis/outputs/diagram-l0.md` | `requirements-lite.md`, `3-design/outputs/architecture.md`, `discovery-report.md` (anexo) |
| `2-analysis/outputs/roles-table.md` | `requirements-lite.md`, `requirements-full.md`, `3-design/outputs/roles-matrix.md`, `3-design/outputs/screen-inventory.md` |
| `2-analysis/outputs/gaps-and-risks.md` | `requirements-lite.md` (RNF), `design-brief.md`, `3-design/outputs/gaps-and-risks.md` |
| `2-analysis/outputs/requirements-lite.md` (RF light) | `Requerimientos_<cliente>.docx`, `scope-decisions.md` |
| `2-analysis/outputs/scope-decisions.md` | `requirements-full.md`, `diagram-l0.md` (caja de alcance), `backlog.md`, `handoff.md`, `discovery-report.md` (alcance y fuera de alcance) |
| `2-analysis/outputs/requirements-full.md` (RF detallado) | `Requisitos_<cliente>.docx`, cronograma tentativo, `design-brief.md`, `3-design/outputs/screen-inventory.md`, `architecture.md`, `data-model.md`, `roles-matrix.md`, `estimation.md`, `backlog.md` (requisitos por feature) |
| Cronograma tentativo (`2-analysis/outputs/`) | `Cronograma_Tentativo_<cliente>.xlsx`, cronograma de implementación |
| `2-analysis/outputs/design-brief.md` | `3-design/outputs/screen-inventory.md`, `3-design/outputs/design-system.md` |
| `overrides.md` (restricciones del cliente) | `architecture.md`, `integrations.md`, `estimation.md`, `3-design/outputs/design-system.md` |

## Etapa 3

| Si cambia | Revisa |
|---|---|
| `3-design/outputs/screen-inventory.md` | `design-system.md` (pantalla representativa), `mockups/`, `roles-matrix.md`, `estimation.md`, registro de `team-review`, `discovery-report.md` |
| `3-design/outputs/design-system.md` | `mockups/design-system.css`, los HTML de `mockups/`, las imágenes por pantalla que lo usan de referencia |
| `3-design/outputs/mockups/` | `screen-inventory.md` (estado y feedback por pantalla), `estimation.md`, RF detallado extendido si aplica, `discovery-report.md` (pantallas aprobadas) |
| `3-design/outputs/architecture.md` | `data-model.md`, `integrations.md`, registro de `team-review`, `estimation.md`, `discovery-report.md` (anexo) |
| `3-design/outputs/data-model.md` | `estimation.md`, RF detallado extendido si aplica |
| `3-design/outputs/integrations.md` | `estimation.md`, `gaps-and-risks.md` de la etapa 3, `discovery-report.md` (anexo) |
| `3-design/outputs/roles-matrix.md` | `estimation.md` |
| `3-design/outputs/gaps-and-risks.md` | `estimation.md`, `discovery-report.md` |
| `3-design/outputs/team-review-<fecha>.md` | `estimation.md` |
| `3-design/outputs/estimation.md` | cronograma de implementación, `discovery-report.md` |
| Cronograma de implementación (`3-design/outputs/`) | `Cronograma_Implementacion_<cliente>.xlsx`, `discovery-report.md` |
| `3-design/outputs/discovery-report.md` | `Informe_Discovery_<cliente>.docx` |

## Las cadenas que más se reabren

Cuando el hallazgo toca uno de estos, casi siempre arrastra toda la cadena:

- **Roles.** `inventory-users.md` → `roles-table.md` → `Requerimientos` → `Requisitos` → `roles-matrix.md` → `estimation.md`. Un rol nuevo es pantallas nuevas y permisos nuevos.
- **Proceso.** `as-is.md` → `to-be.md` → `diagram-l0.md` → `Requerimientos` → `design-brief.md`. Una etapa del proceso que cambia mueve el To-Be y el brief de diseño.
- **Alcance.** `scope-decisions.md` → `Requisitos` → cronograma tentativo → `architecture.md` → `estimation.md` → cronograma de implementación. Recortar alcance en la etapa 3 devuelve a la negociación de la etapa 2.
- **Riesgos.** Los tres `gaps-and-risks` son el mismo registro; un riesgo que cambia se mueve en la fila que ya existe, en el archivo de la etapa en curso.
- **Pantallas.** `requirements-full.md` → `screen-inventory.md` → `mockups/` → `estimation.md`. Un requisito que cambia con pantalla ya aprobada reabre esa pantalla, no todo el paso de UI/UX.
