# Discovery — <cliente>

Este repo contiene el discovery de <cliente>, ejecutado con nuestro arnés.

**Lee primero `harness/AGENTS.md`**: ahí están las reglas base, el mapa de skills y el
flujo. Este archivo solo agrega lo específico del proyecto. Las diferencias con la
base están declaradas en `overrides.md`; lo que no esté ahí, se hace como dice la base.

## El proyecto

- **Cliente:** <nombre, qué hace, país>
- **PM (Líder):** <nombre>
- **Propuesta:** `discovery/1-planning/inputs/<archivo>`
- **Duración del discovery:** <4 semanas / 3 días / según propuesta>
- **Etapa actual:** 1-planning <actualizar al avanzar: 2-analysis, 3-design>
- **Si no arranca en la etapa 1:** declara modalidad y etapa de entrada en
  `overrides.md`, abre `discovery/<etapa>/inputs/start-here.md` y deja el paquete en
  `inputs/inherited/`. Corre `harness/skills/entry-check/` antes de producir nada.

## Dónde está cada carpeta

Una carpeta por etapa, con el mismo nombre que en `harness/stages/`, y dentro de cada una
`inputs/`, `outputs/` y `checkpoint/`. Qué va exactamente en cada carpeta lo declara el
`CONTRACT.md` de esa etapa.

- `discovery/1-planning/`: propuesta y contexto comercial, y lo que produce la
  planificación: problema reconstruido, kickoff, agendas, plan y accesos.
- `discovery/2-analysis/`: transcripts de las sesiones, y lo que produce el análisis:
  notas, actas, entendimientos, inventarios, requisitos y entendimiento para diseño.
- `discovery/3-design/`: lo que produce el diseño: pantallas, arquitectura, modelo de
  datos, estimación, cronograma e informe final.
- `discovery/<etapa>/outputs/ready-to-take/`: dentro del `outputs/` de cada etapa,
  los entregables de esa etapa en el formato en que se los lleva el cliente (`.docx`,
  `.xlsx`). El mapa está en `harness/skills/ready-to-take/`.
- `discovery/inbox/`: donde se deja la información que llega fuera de una sesión y
  contradice algo ya aprobado (un correo, una corrección del cliente), sin tener que saber
  a qué etapa pertenece. Se procesa con `harness/skills/reopen-artifact/` y se mueve a
  `processed/`.
- `discovery/<etapa>/outputs/versions/`: la copia congelada de un documento antes de
  cambiarlo, solo si ya había pasado checkpoint o se había entregado.
- `discovery/progress/`: la memoria entre sesiones de trabajo: `current.md` dice dónde
  quedó todo y qué sigue, `history/` guarda una nota por sesión. Los lleva
  `harness/skills/session-log/`.
- `backlog.md`: el backlog vivo, en la raíz porque sobrevive al discovery. Se actualiza
  cuando cambia el estado real, no después de los hechos.
- `friction-log.md`: lo que el arnés hizo mal en este proyecto. Lo llena el agente, no el
  PM, y cada fila llega como issue a `harness-product`. Ver `harness/skills/friction-log/`.

## El arnés es solo lectura

`harness/` es un submódulo y no se edita desde aquí: ni un skill, ni un template, ni una
etapa. Si algo de la base está mal, es una fricción (`harness/skills/friction-log/`) y llega
como issue; el arreglo se hace en `harness-product` y vuelve por `git submodule update`.
Un commit dentro de `harness/` desde un proyecto es un error.

## Estado y pendientes

El estado en vivo del proyecto vive en `discovery/progress/current.md`, no en este
archivo: qué sesión sigue, qué pendiente bloquea, qué checkpoint falta. Se abre al empezar
cada sesión de trabajo y se reescribe al cerrarla, con `harness/skills/session-log/`.

En este archivo solo va lo que no cambia sesión a sesión: <particularidades del proyecto
que alguien nuevo tiene que saber sí o sí antes de tocar nada>.
