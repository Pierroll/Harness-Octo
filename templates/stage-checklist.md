# Checklist de la etapa <N> — <proyecto>

Se copia al **abrir** la etapa, no al cerrarla. Las tareas están numeradas desde el
principio para que en cualquier momento se pueda mirar hacia atrás y ver qué se prometió y
qué se cumplió, sin depender de que alguien se acuerde.

Es distinto de la tabla de cierre (`templates/stage-closure.md`), que se llena al final y
resume el resultado. Este documento se marca todos los días.

Estados: `pendiente`, `en curso`, `hecho`, `no aplica`.

Reglas:

- Una tarea pasa a `hecho` cuando su artefacto existe en la ruta que dice la columna, no
  cuando alguien la considera terminada.
- `no aplica` necesita razón y modalidad declarada (`stages/modalities.md`). Esa
  justificación se repite en la tabla de cierre.
- Las tareas que este proyecto suma por su `overrides.md` se agregan al final de su etapa,
  con la numeración que sigue.

---

## Etapa 1 — Planificación

| ID | Tarea | Artefacto | Estado | Nota |
|---|---|---|---|---|
| P1.1 | Reconstruir el problema y escribir las hipótesis | `1-planning/outputs/`, sobre `understanding-doc.md` | pendiente | |
| P1.2 | As-Is y To-Be tentativos | `1-planning/outputs/as-is-draft.md` y `to-be-draft.md` | pendiente | |
| P1.3 | Temas por entender, supuestos y riesgos, y temas por negociar, en borrador | `1-planning/outputs/gaps-and-risks-draft.md` | pendiente | |
| P1.4 | Documento de kickoff, antes de la reunión | `1-planning/outputs/ready-to-take/Kickoff_<cliente>.docx` | pendiente | |
| P1.5 | Kickoff ejecutado | notas de la reunión | pendiente | |
| P1.6 | Líder de operación del cliente, entornos y accesos, con dueño y fecha | `1-planning/outputs/` | pendiente | |
| P1.7 | Equipo nuestro asignado, confirmado disponible en las fechas del cronograma | `1-planning/outputs/` | pendiente | |
| P1.8 | Agendas de sesión con dueño y fecha, después del kickoff | `1-planning/outputs/ready-to-take/Discoveries_<cliente>.docx` | pendiente | |
| P1.9 | Plan y cronograma de delivery del discovery | `1-planning/outputs/discovery-plan.md`, `.xlsx` en `outputs/ready-to-take/` | pendiente | |
| P1.10 | Backlog inicial: un renglón por módulo de la propuesta | `backlog.md` | pendiente | |
| P1.11 | Tabla de cierre de etapa | `1-planning/checkpoint/` | pendiente | |
| P1.12 | Checkpoint en sesión fresca, con registro | `1-planning/checkpoint/` | pendiente | |
| P1.13 | Relevamiento para quien tome la etapa 2 | `1-planning/outputs/` | pendiente | |

## Etapa 2 — Análisis

| ID | Tarea | Artefacto | Estado | Nota |
|---|---|---|---|---|
| P2.1 | Transcript de cada sesión ejecutada | `2-analysis/inputs/dN-transcript.md` | pendiente | |
| P2.2 | Notas estructuradas por sesión | `2-analysis/outputs/dN-notes.md` | pendiente | |
| P2.3 | Acta por sesión | `2-analysis/outputs/dN-acta.md` | pendiente | |
| P2.4 | Documento de entendimiento por sesión, que alimenta la agenda de la siguiente | `2-analysis/outputs/`, sobre `session-understanding.md` | pendiente | |
| P2.5 | Inventarios acumulativos: campos, reglas, fuentes, estados, usuarios | `2-analysis/outputs/inventory-*.md` | pendiente | |
| P2.6 | Mapa de procesos As-Is con SLA, validado con el cliente | `2-analysis/outputs/as-is.md` | pendiente | |
| P2.7 | Proceso real del negocio, contado sin sistemas | `2-analysis/outputs/` | pendiente | |
| P2.8 | Mapa de estados por entidad | `2-analysis/outputs/inventory-states.md` | pendiente | |
| P2.9 | Mapa de procesos To-Be, con owner por etapa | `2-analysis/outputs/to-be.md` | pendiente | |
| P2.10 | Diagrama de arquitectura de alto nivel | `2-analysis/outputs/` | pendiente | |
| P2.11 | Tabla de roles y niveles de acceso, con el perfil de cada usuario | `2-analysis/outputs/` | pendiente | |
| P2.12 | Tabla de riesgos, cada uno con mitigación y dueño | `2-analysis/outputs/gaps-and-risks.md` | pendiente | |
| P2.13 | RF light, sin números | `2-analysis/outputs/requirements-lite.md`, `.docx` en `outputs/ready-to-take/` | pendiente | |
| P2.14 | Negociación del alcance, con decisión por requisito | `2-analysis/outputs/scope-decisions.md` | pendiente | |
| P2.15 | RF detallado y RNF, solo sobre lo que quedó dentro | `2-analysis/outputs/requirements-full.md`, `.docx` en `outputs/ready-to-take/` | pendiente | |
| P2.16 | Casos de prueba QA sobre los RF detallados | mismo documento | pendiente | |
| P2.17 | Cronograma tentativo del proyecto | `2-analysis/outputs/`, `.xlsx` en `outputs/ready-to-take/` | pendiente | |
| P2.18 | Documento de entendimiento para diseño | `2-analysis/outputs/design-brief.md` | pendiente | |
| P2.19 | Lista de entregables del discovery | `2-analysis/outputs/` | pendiente | |
| P2.20 | Tabla de cierre de etapa | `2-analysis/checkpoint/` | pendiente | |
| P2.21 | Checkpoint en sesión fresca, con registro | `2-analysis/checkpoint/` | pendiente | |
| P2.22 | Relevamiento para quien tome la etapa 3 | `2-analysis/outputs/` | pendiente | |

## Etapa 3 — Diseño

| ID | Tarea | Artefacto | Estado | Nota |
|---|---|---|---|---|
| P3.1 | Inventario de flujos y pantallas, cada una con sus requisitos y criterios | `3-design/outputs/screen-inventory.md` | pendiente | |
| P3.2 | Design system elegido en el tablero, con bitácora y CSS | `3-design/outputs/design-system.md`, `outputs/mockups/design-system.css` | pendiente | |
| P3.3 | Mockups: alternativa elegida por pantalla, HTML por flujo, presentados al cliente con su feedback registrado | `3-design/outputs/mockups/`, sección 5 del inventario | pendiente | |
| P3.4 | Arquitectura técnica de alto nivel | `3-design/outputs/` | pendiente | |
| P3.5 | Modelo de datos de alto nivel | `3-design/outputs/` | pendiente | |
| P3.6 | Mapa de integraciones, con decisión por fuente | `3-design/outputs/` | pendiente | |
| P3.7 | Matriz de roles y permisos por módulo y acción | `3-design/outputs/` | pendiente | |
| P3.8 | Registro de riesgos refinado con el detalle técnico | `3-design/outputs/gaps-and-risks.md` | pendiente | |
| P3.9 | Sesión con el equipo y estimación refinada por módulo | `3-design/outputs/` | pendiente | |
| P3.10 | Cronograma de implementación, con sus hitos | `3-design/outputs/`, `.xlsx` en `outputs/ready-to-take/` | pendiente | |
| P3.11 | Informe final de discovery | `3-design/outputs/discovery-report.md`, `.docx` en `outputs/ready-to-take/` | pendiente | |
| P3.12 | Tabla de cierre de etapa | `3-design/checkpoint/` | pendiente | |
| P3.13 | Checkpoint en sesión fresca, con registro | `3-design/checkpoint/` | pendiente | |
| P3.14 | Relevamiento para quien tome la implementación | `3-design/outputs/` | pendiente | |

---

## Resumen de la etapa en curso

- Tareas de la etapa: <N>
- Hechas: <N>
- En curso: <N>
- Pendientes: <N>
- No aplican, con razón declarada: <N>
