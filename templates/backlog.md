# Backlog — <proyecto>

Actualizado: <YYYY-MM-DD>

La lista de lo que se le va a construir al cliente. Es el único artefacto que sigue vivo
después del discovery: su columna de estado avanza durante toda la implementación.

**Cómo se llena, etapa por etapa.** En la etapa 1 no hay features todavía, hay módulos: un
renglón por cada módulo que nombra la propuesta, con talla preliminar y estado `backlog`.
En la etapa 2 esos renglones se parten en features reales, cada una con los requisitos que
la cubren. En la etapa 3 la talla se refina contra la arquitectura y las pantallas.

Tallas: XS 0.2 días · S 0.5 · M 1.5 · L 3 · XL 7. Un día son 8 horas.

Estados: `backlog` · `in-discovery` · `specified` · `approved` · `in-development` · `done`.

## Hitos

| ID | Hito | ¿Es hito de pago? | Fecha |
|---|---|---|---|
| M1 | <nombre> | <sí / no> | <YYYY-MM-DD o vacío> |

Los hitos de pago quedan vacíos a propósito mientras siga abierta la negociación con
comercial. Ver `skills/estimation/`.

## Features

| ID | Qué hace | Módulo | Talla | Estado | Hito | Requisitos | Nota |
|---|---|---|---|---|---|---|---|
| F-001 | <qué hace, en una línea> | <módulo> | M | backlog | M1 | RF-XXX-001 | |

## Resumen

- Features: <N>
- Esfuerzo sumado: <N días>
- Por estado: backlog <N> · specified <N> · approved <N>

El esfuerzo sumado no es la duración del proyecto: hay tareas que corren en paralelo. La
duración sale del cronograma, no de esta suma.
