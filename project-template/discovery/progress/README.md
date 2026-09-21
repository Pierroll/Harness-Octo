# Memoria entre sesiones de trabajo

La lleva `harness/skills/session-log/`. La primera sesión de trabajo crea `current.md`.

| Archivo esperado | Qué es |
|---|---|
| `current.md` | Dónde quedó el proyecto y qué sigue. Se reescribe entero al cerrar cada sesión. |
| `history/<YYYY-MM-DD>-<n>-<tema>.md` | Una nota por sesión. No se edita después. |

Si el último checkpoint de la etapa actual quedó **RECHAZADO**, `current.md` tiene que
decirlo: la etapa no cerró, y lo que sigue es corregir los hallazgos, no abrir la
siguiente.
