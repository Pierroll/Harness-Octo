---
name: friction-log
description: >
  Escribe una fricción del arnés en el momento en que ocurre y la lleva como issue al repo
  `codeable-labs/harness-product`, sin que el PM tenga que hacer nada. Corre solo, disparado
  por otros skills: cuando un skill falla de una forma que no está en sus "Modos de fallo",
  cuando `checkpoint-review` encuentra un criterio ambiguo, cuando `reopen-artifact`
  responde "esto debió detectarse antes", y al cerrar cada sesión con `session-log`. También
  cuando el usuario diga "esto del arnés no me sirvió", "anota esta fricción", "el skill X
  no contempla Y". Es la forma en que el arnés mejora con el uso.
---

# Friction log — el arnés mejora porque lo que estorba queda escrito y llega a la base

## La idea, dicha sin adornos

El arnés mejora por un ciclo con personas adentro: alguien nota que algo estorbó, eso queda
escrito, llega al repo del arnés, se corrige la base, y todos los proyectos lo reciben al
actualizar el submódulo. Ese ciclo es todo el aprendizaje que hay. Este skill hace que el ciclo ocurra sin depender de que el PM se
acuerde ni de que le importe mejorar el arnés. El PM está para sacar su documentación. El
agente escribe la fricción y la envía.

Dónde aterrizan las mejoras, casi siempre: una fila nueva en la sección "Modos de fallo" de
un skill, un criterio afinado en el `STAGE.md` de una etapa, una pregunta nueva en una
plantilla de agenda, una columna en un template. Esas secciones son la memoria del arnés.
Este archivo es lo que las alimenta.

## Dos momentos

### Al escribir, en el repo del proyecto

Una fila en `friction-log.md`, en la raíz del repo del proyecto (viene en el
`project-template/`). Columnas: fecha, etapa o skill, qué pasó, qué se hizo en su lugar,
propuesta, estado, issue.

Cuatro disparadores. Ninguno le pide nada al PM:

1. **Un skill entra en un modo de fallo que no está en su sección "Modos de fallo".** El
   skill que lo vive escribe la fila él mismo, antes de seguir.
2. **`session-log` al cerrar la sesión.** Pregunta fija: "¿el arnés estorbó, faltó o se
   ignoró hoy?". Si la respuesta es sí, una fila por cosa. Si no, nada. Diez segundos.
3. **`checkpoint-review` encuentra un criterio ambiguo** o un artefacto que hizo falta y el
   arnés no pide. El hallazgo va al checkpoint-record como siempre, y además aquí.
4. **`reopen-artifact` responde "sí" a "¿debió detectarse antes?".** La fila dice en qué
   skill o pregunta de agenda se habría destapado.

La columna Propuesta es obligatoria. "El skill de requisitos es lento" no es una fricción
registrable; "`requirements-lite` no pregunta por el sistema actual antes de redactar, y el
campo Sistema actual salió vacío en 6 de 8 RF; agregar la pregunta al paso 1" sí.

### Al enviar, en el mismo momento

Apenas se escribe la fila, el agente abre el issue:

```bash
gh issue create -R codeable-labs/harness-product \
  --title "<skill o etapa>: <qué pasó, en una línea>" \
  --body "$(cat <<'EOF'
**Proyecto:** <nombre del discovery> · **Fecha:** <YYYY-MM-DD> · **Etapa/skill:** <...>

**Qué pasó**
<la fila>

**Qué se hizo en su lugar**
<...>

**Propuesta**
<qué archivo del arnés cambia y cómo>
EOF
)"
```

El número que devuelve va a la columna Issue y el estado pasa a `enviada`. Issue y no PR:
una fricción es un reporte, no un arreglo, y nadie hace commit directo a la base desde un
proyecto. Quien mantiene el arnés convierte issues en PRs.

Si `gh` no está instalado, no está autenticado, o el PM no tiene permiso en
`codeable-labs/harness-product` (el comando devuelve 403 o 404: el repo es privado y hace
falta ser colaborador), la fila queda con estado `abierta` e issue `no enviada: <razón>`.
`session-log` lo avisa al cerrar: "hay N fricciones sin enviar". No se inventa un número
de issue. Pedir el acceso al repo es un pendiente del PM con quien mantiene el arnés.

Antes de abrir un issue, buscar si ya existe uno igual: `gh issue list -R
codeable-labs/harness-product --search "<skill>"`. Si existe, se comenta ahí con el
proyecto y la fecha en vez de abrir uno nuevo. Dos proyectos con la misma fricción es la
señal más fuerte que el arnés puede recibir, y se pierde si quedan en dos issues.

### Al cosechar, en `harness-product`

Quien mantiene el arnés lee los issues. Un issue repetido en dos proyectos va primero. El
cambio a la base pasa por PR y por checkpoint en sesión fresca igual que cualquier
artefacto: la regla 2 aplica al arnés. El commit que lo cierra cita el issue (`Closes #N`).
Cuando el cambio se publica, los proyectos lo reciben con `git submodule update --remote
harness`, y esa actualización es una decisión que queda en `session-log`, no un pull
silencioso a mitad de una etapa.

## Cómo se sabe que funciona

Sin métricas inventadas. Tres evidencias que el repo ya deja:

- Los rechazos de checkpoint por la misma causa en proyectos distintos bajan. Si el
  proyecto 1 y el 4 rechazan "As-Is sin SLA", la base no aprendió.
- Un issue con la misma fricción en dos proyectos y todavía abierto es el ciclo roto.
- Un commit del arnés sin issue detrás, o un issue con propuesta y sin commit, también.

## Reglas

- **Se escribe en el momento.** Una fricción reconstruida al final de la etapa ya perdió el
  detalle que la hacía corregible.
- **Hechos, no opiniones.** Qué pasó y qué se hizo. La opinión va en la propuesta.
- **Con propuesta, siempre.** Si no se sabe qué cambiar, la propuesta es "abrir la
  conversación sobre X", y eso también vale.
- **Un issue por fricción.** Si en una sesión aparecen tres, son tres issues, salvo que
  sean la misma en tres lugares.
- **El PM puede vetar el envío** de una fricción puntual ("esto es del proyecto, no del
  arnés"). Queda la fila con estado `descartada` y su razón.

## Modos de fallo

- **El agente escribe fricciones por todo:** la prueba es una pregunta. ¿La base está mal
  y le pasaría lo mismo al siguiente proyecto? Fricción. ¿La base está bien y este cliente
  es distinto (otro idioma, otro stack, una ceremonia propia)? Override, y va en el
  `overrides.md` del proyecto (`stages/overrides.md`).
- **El PM dice "después lo anoto":** se anota igual ahora, en una línea, y se afina
  después si hace falta. Después no llega.
- **El issue ya existe pero cerrado:** se reabre con el comentario del proyecto nuevo. Que
  vuelva a aparecer significa que el arreglo no alcanzó.
- **La fricción es sobre este mismo skill:** se registra igual. No hay excepción.
