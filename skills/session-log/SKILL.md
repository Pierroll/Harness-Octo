---
name: session-log
description: >
  Deja el registro de la sesión de trabajo al terminarla y lo recupera al empezar la
  siguiente. Usar SIEMPRE al cerrar una sesión de trabajo sobre un discovery, y al
  abrirla cuando el usuario diga "en qué quedamos", "retoma donde quedamos", "qué se
  hizo la última vez", "continúa el proyecto", o cuando la sesión arranca sin contexto
  de lo que ya pasó. Produce discovery/progress/current.md y el histórico por sesión.
---

# Session log — la memoria del proyecto entre sesiones de trabajo

Cada sesión de trabajo con el agente empieza en cero. Sin registro, el PM tiene que
reconstruir de memoria dónde quedó, y lo que se reconstruye de memoria se reconstruye mal:
se repite trabajo hecho, se pierde un pendiente, o se avanza sobre un artefacto que alguien
ya había corregido.

Este skill corre dos veces por sesión, al principio y al final, y son dos trabajos
distintos.

## Al abrir la sesión

Lee `discovery/progress/current.md` y resume en tres o cuatro líneas dónde quedó el
proyecto antes de hacer cualquier otra cosa: en qué etapa está, qué se hizo la última vez,
qué quedó abierto. Si el archivo no existe, dilo y arranca la primera sesión creándolo.

Si lo que el usuario pide no se parece a lo que quedó pendiente, no lo bloquees: avísale
la diferencia en una línea y sigue con lo que pidió.

## Al cerrar la sesión

Antes de escribir, una pregunta fija: **¿el arnés estorbó, faltó o se ignoró en esta
sesión?** Si la respuesta es sí, una fila por cosa en `friction-log.md` con
`skills/friction-log/`, que además la envía como issue. Si no, nada. Y si en
`friction-log.md` hay filas con estado `abierta` e issue `no enviada`, se avisa: "hay N
fricciones sin enviar".

Después, dos escrituras. Primero el histórico, que se agrega y no se toca más. Después
`current.md`, que se reescribe entero cada vez.

### El histórico

`discovery/progress/history/<YYYY-MM-DD>-<n>-<tema>.md`, donde `<n>` es el número de sesión
de ese día. Un archivo por sesión, y no se edita después de escrito.

```markdown
# Sesión <n> — <tema> — <YYYY-MM-DD>

## Qué se hizo
<Tres a cinco líneas. Qué artefactos se produjeron o se movieron, con su ruta.>

## Qué cambió respecto a lo que había
<Solo si algo que ya estaba escrito quedó corregido o invalidado. Si un artefacto
aprobado se reabrió, va en esta sección con la ruta de su reopen-record
(`discovery/<etapa>/checkpoint/<fecha>-reopen-<tema>.md`). Si quedó alguna marca
`contradice:` sin procesar, se lista aquí y va también a Bloqueado en `current.md`.>

## Qué quedó abierto
<Pendientes con dueño. Los del cliente van a la bolsa de llamadas cortas del PM, no en esta sección.>

## Decisiones tomadas en la sesión
<Lo que se decidió y por qué. Si no se decidió nada, se omite la sección.>
```

### El estado actual

`discovery/progress/current.md`, reescrito completo:

```markdown
# Estado del discovery — <proyecto>
Actualizado: <YYYY-MM-DD> · Última sesión: <archivo del histórico>

**Etapa actual:** <1-planning / 2-analysis / 3-design>
**Último checkpoint de esta etapa:** <no corrido / PASA / PASA CON RIESGO ACEPTADO / RECHAZADO, con ruta del registro>

## Dónde estamos
<Dos o tres líneas. Qué se está produciendo ahora y qué falta para cerrar la etapa.>

## Lo último que se hizo
<Lo mismo que el histórico, en tres líneas.>

## Qué sigue
<Lo primero que hay que hacer la próxima vez, concreto y accionable.>

## Bloqueado
<Lo que no puede avanzar y quién lo destraba. Incluye toda marca `contradice:` sin
reopen-record y todo archivo que siga en `discovery/inbox/` sin procesar. Si no hay nada,
se escribe "nada".>
```

## Reglas

- **El registro sale de lo que pasó en la sesión, no de lo que se planeaba hacer.** Si algo
  quedó a medias, se escribe a medias. Un registro optimista es peor que no tenerlo, porque
  la próxima sesión avanza creyendo que algo está cerrado.
- **Corto.** `current.md` no pasa de una pantalla. Lo largo vive en los artefactos, no en `current.md`.
- **Cita rutas, no resúmenes.** "Se escribió `discovery/2-analysis/outputs/as-is.md`"
  sirve; "se avanzó el As-Is" no.
- **El histórico no se reescribe.** Si algo que se registró resultó estar mal, se corrige en
  la sesión nueva, no borrando la vieja.
- **Un checkpoint RECHAZADO no se esconde.** Si el último registro de la etapa actual
  quedó rechazado, `current.md` lo dice en Dónde estamos y en Qué sigue: se corrigen
  los hallazgos y se vuelve a correr el checkpoint en sesión fresca. No se escribe
  "sigue la etapa siguiente". El arnés no avanza solo después de un rechazo; si el
  usuario lo pide igual, se avisa una vez y se deja su decisión en el histórico.
- **Actualizar el arnés es una decisión, no un pull.** Si en la sesión se corrió
  `git submodule update --remote harness`, el histórico lo dice con el commit anterior y el
  nuevo. Los checkpoints que se corran después citan la versión nueva; los artefactos
  aprobados con la anterior no quedan inválidos, pero se sabe con qué criterios se
  revisaron.
- Este registro no reemplaza al relevamiento (`templates/handoff.md`). El relevamiento es
  el traspaso entre etapas y lo lee otra persona. Esto es la continuidad entre sesiones de
  trabajo y lo lee la sesión siguiente.

## La red de seguridad automática

El registro bueno lo escribe este skill cuando la sesión se cierra a propósito. Pero nadie
cierra a propósito siempre: se cierra la terminal y se va.

Para eso el repo del discovery trae un hook `SessionEnd`
(`.claude/hooks/session-end.sh`) que se dispara solo al terminar la sesión y deja en
`history/` un registro factual: fecha y hora, motivo del cierre, archivos tocados, commits
recientes y la ruta del transcript. Ese registro dice explícitamente que el resumen quedó
pendiente, y agrega una línea de aviso al final de `current.md`.

No reemplaza al skill. Un hook no puede narrar qué se decidió ni por qué. Lo que hace es
que ninguna sesión desaparezca sin dejar rastro, y que el resumen se pueda reconstruir
después desde el transcript.

## Modos de fallo

- **Sesión que no produjo nada:** también se registra, con la razón. Una sesión que se fue
  en entender un documento del cliente es información útil para la próxima.
- **Varias sesiones el mismo día:** el `<n>` las separa. `current.md` refleja siempre la
  última.
- **El histórico creció mucho:** no se poda. Es el insumo de la bitácora de fricciones y de
  la revisión del arnés.
