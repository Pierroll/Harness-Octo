# gstack: material fuente del skill `ui-design`

Copia de los archivos de `https://github.com/garrytan/gstack` (licencia MIT, Garry Tan) de
los que se portó el mecanismo de alternativas y tablero de `skills/ui-design/`. Commit de
origen: `0d1bd561`, versión 1.79.0.0, tomado el 2 de septiembre de 2026. Se lee, no se
edita.

| Archivo | Qué es | Qué se tomó |
|---|---|---|
| `design-shotgun-SKILL.md.tmpl` | El skill que genera N alternativas, abre el tablero y recoge feedback | Direcciones en texto antes de generar, regla de que dos alternativas no se parezcan, subagentes en paralelo, el tablero como quien elige, `feedback.json` y `feedback-pending.json`, `approved.json` |
| `design-html-SKILL.md.tmpl` | Convierte el mockup aprobado en HTML y lo refina | Un HTML por pantalla desde la imagen aprobada, refinamiento con ediciones puntuales, máximo diez rondas, contenido real y nunca lorem ipsum |
| `design-consultation-proposal-and-preview.md.tmpl` | Propone un design system y lo previsualiza | La separación entre lo convencional y lo que hace distinto al producto, la pregunta de qué es lo único que se debe recordar, la estructura de `DESIGN.md`, la bitácora de decisiones, la lista de tipografías quemadas |
| `compare.ts` | Genera el HTML del tablero de comparación | La estructura del tablero: elegir, estrellas, comentario, dirección general, regenerar, "más como esta" |
| `serve.ts` | Sirve el tablero y escribe el feedback a disco | El protocolo: `/api/feedback`, `/api/progress`, `/api/reload`, y la máquina de estados serving, regenerating, done |

Lo que el porte cambia y por qué está declarado en la cabecera de
`skills/ui-design/scripts/image.mjs` y `skills/ui-design/scripts/board.mjs`, y en la
sección "Qué cambia respecto de gstack" de `skills/ui-design/SKILL.md`. Las imágenes las
genera OpenAI en los dos lados; gstack pasa por el Responses API con gpt-4o como
intermediario y el porte llama directo a la API de imágenes.
