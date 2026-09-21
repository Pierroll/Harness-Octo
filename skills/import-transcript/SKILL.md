---
name: import-transcript
description: >
  Trae la transcripción de una reunión de Google Meet (generada por Gemini) al repo del
  discovery como markdown en discovery/2-analysis/inputs/. Usar cuando el usuario diga "importa
  el transcript", "trae la transcripción de la sesión de ayer", "guarda la reunión d2",
  "pasa el transcript al repo", o pegue una transcripción cruda en el chat y pida
  guardarla. También al inicio de discovery-session si el transcript aún no está en el
  repo.
---

# Import transcript — de Meet/Gemini al repo

Usamos Google Workspace: las reuniones de Meet con transcripción activada generan un
Google Doc en el Drive del organizador (carpeta "Meet Recordings" / "Grabaciones de
Meet"). Este skill lleva ese contenido a
`discovery/2-analysis/inputs/d<N>-transcript.md`.

## Vía 1 — Conector de Google Drive (preferida)

Requiere el conector MCP de Google Drive configurado en Claude Code (se conecta una
sola vez por PM).

1. Identifica la sesión: número (d1, d2, …), fecha y nombre de la reunión. Si el
   usuario no lo dio, pregunta solo lo que falte.
2. Busca el doc en Drive por nombre de la reunión y fecha (los transcripts de Gemini
   se llaman como el evento de calendario + fecha).
3. Lee el contenido del doc y guárdalo como `discovery/2-analysis/inputs/d<N>-transcript.md`
   con este encabezado:

```markdown
# d<N> — <nombre de la sesión>
Fecha: <YYYY-MM-DD> · Participantes: <nombres> · Fuente: <nombre del doc en Drive>

<transcripción tal cual, sin resumir ni editar>
```

4. No edites ni resumas la transcripción: es insumo crudo. El procesamiento lo hace
   `discovery-session`.

## Vía 2 — Pegado manual (fallback)

Si no hay conector, pide al usuario que copie el contenido del doc y lo pegue en el
chat. Guárdalo con el mismo formato. Funciona igual; solo cuesta un copy-paste.

## Modos de fallo

- **El transcript no aparece en Drive:** Gemini tarda unos minutos en generar el doc
  después de terminar la reunión, y solo lo ve el organizador y quienes tengan
  permiso. Si la reunión terminó hace poco, espera y reintenta. Si no eres el
  organizador, pide al PM que comparta el doc.
- **Varios docs con nombre parecido:** muestra los candidatos (nombre + fecha) y deja
  que el usuario elija. No adivines.
- **La transcripción viene en trozos o cortada:** guárdala igual y anota al inicio del
  archivo `> Transcript incompleto: <qué falta>`. Nunca rellenes huecos con lo que
  "probablemente se dijo".
- **La reunión no se transcribió:** regístralo en la sesión como
  `sin transcript — notas manuales` y pide al PM sus notas. Una sesión sin ningún
  registro no puede alimentar el análisis.
