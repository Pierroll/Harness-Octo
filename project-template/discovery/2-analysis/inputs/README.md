# Inputs de la etapa 2 — Análisis

Lee primero `start-here.md` en esta misma carpeta. Ese archivo dice dónde dejar cada
cosa según si corriste o no la etapa 1.

Material que entra de afuera. Se lee, no se edita. La firma está en
`harness/stages/2-analysis/CONTRACT.md`.

## En esta carpeta (de afuera, siempre)

| Archivo esperado | Qué es | Obligatorio |
|---|---|---|
| `d<N>-transcript.md` | Transcript de **cada sesión de discovery ya ejecutada** (d1, d2, d3…). Lo trae `import-transcript` o un pegado a mano. | Sí, por cada sesión que se quiera procesar. Sin transcript no hay sesión procesable. |

Estos son los transcripts de levantamiento, no los de venta. Los comerciales van en
`discovery/1-planning/inputs/`.

## En `inherited/` (solo si no corriste la etapa 1)

El paquete que la etapa 1 habría producido. Nombres fijos, lista en
`inherited/README.md`. `entry-check` lo copia a su sitio de trabajo. Si la etapa 1
sí se corrió en este repo, deja `inherited/` vacío.

## Sitio de trabajo (flujo normal, etapa 1 ya corrida)

| Entrada | Dónde está |
|---|---|
| Temas por entender con sesión asignada | `discovery/1-planning/outputs/gaps-and-risks-draft.md` |
| As-Is y To-Be tentativos | `discovery/1-planning/outputs/as-is-draft.md` y `to-be-draft.md` |
| Calendario de sesiones con dueños | `discovery/1-planning/outputs/ready-to-take/Discoveries_<cliente>.docx` |
| Backlog inicializado | `backlog.md` en la raíz |
