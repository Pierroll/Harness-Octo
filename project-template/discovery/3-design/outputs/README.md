# Outputs de la etapa 3 — Diseño

Lo que esta etapa produce. La firma está en `harness/stages/3-design/CONTRACT.md`.
No se pre-crean vacíos. Arquitectura, estimación y el inventario de pantallas corren con
modelo frontera (Fable, u Opus si no está).

| Archivo esperado | Lo produce | Qué es |
|---|---|---|
| `screen-inventory.md` | `ui-design` | Flujos y pantallas, cada una con los RF y criterios que cubre, la alternativa elegida y el feedback del cliente. |
| `design-system.md` | `ui-design` | Tipografía, color, espaciado, componentes y bitácora. Su CSS va en `mockups/design-system.css`. |
| `mockups/` | `ui-design` | Imágenes de cada alternativa por ronda, tableros con su `approved.json`, y los HTML por flujo que se le presentan al cliente. |
| `architecture.md` | `technical-design` | Arquitectura técnica de alto nivel. |
| `data-model.md` | `technical-design` | Modelo de datos de alto nivel. |
| `integrations.md` | `technical-design` | Mapa de integraciones, con decisión por fuente. |
| `roles-matrix.md` | `technical-design` | Matriz de roles y permisos, con módulos y acciones. |
| `gaps-and-risks.md` | `technical-design`, sobre el de la etapa 2 | Registro de riesgos refinado con el detalle técnico. |
| `team-review-<fecha>.md` | `team-review` | Registro de la sesión con quien va a construir. Antes de estimar. |
| `estimation.md` | `estimation` | Esfuerzo refinado por módulo. No inventa tarifas. |
| cronograma de implementación | `estimation` sobre `templates/implementation-schedule.md` | El que se le entrega al cliente. Su `.xlsx` va en `ready-to-take/`. |
| `discovery-report.md` | `discovery-report` | Informe final. Su `.docx` va en `ready-to-take/`. |
| `handoff.md` | plantilla `handoff.md` | Relevamiento para quien tome la implementación. |

La subcarpeta `ready-to-take/` de esta misma carpeta guarda el `.docx` del informe y el
`.xlsx` del cronograma de implementación. Ver `harness/skills/ready-to-take/`.

La subcarpeta `mockups/` guarda el CSS del design system, las imágenes de cada alternativa
por ronda (nada se borra), los tableros con su `approved.json` y los HTML por flujo. Los
HTML abren sin servidor y son lo que se le presenta al cliente. Qué va en cada archivo:
`harness/skills/ui-design/references/mockup-conventions.md`.

Según modalidad, puede aparecer el RF detallado extendido (historias con modelo de datos
y diseños incrustados). Lo pide el contrato del cliente, no el arnés.

La subcarpeta `versions/` de esta misma carpeta guarda la copia congelada de un documento
justo antes de cambiarlo, solo si ya pasó checkpoint o ya se le mostró al cliente
(`<nombre>-v<N>.md`). Se crea la primera vez que hace falta. Ver `harness/skills/reopen-artifact/`.
