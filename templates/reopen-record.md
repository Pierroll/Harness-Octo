# Reapertura: <tema> — <YYYY-MM-DD>

Registro de una información nueva que contradice algo ya aprobado, y de lo que se cambió por
ella. Lo produce `skills/reopen-artifact/`. Vive en `discovery/<etapa en curso>/checkpoint/`,
con el nombre `<YYYY-MM-DD>-reopen-<tema>.md`.

Se escribe en dos momentos. Primero como propuesta, sin tocar ningún documento. Después,
cuando el PM dice "aplica", se completa con lo que de verdad se hizo.

- **Etapa en curso cuando llegó:** <1 / 2 / 3>
- **Marcas `contradice:` que resuelve:** <ruta del documento donde quedó cada marca (notas
  de sesión, registro de team-review), o "ninguna: llegó por inbox o por el PM">
- **Quién decidió aplicar:** <nombre>, <YYYY-MM-DD>

## Qué llegó y de dónde

<La información nueva en dos o tres líneas, tal como llegó. Y su fuente: sesión, correo,
llamada corta, revisión con el equipo, el propio cliente. Si vino como archivo, la ruta en
`discovery/inbox/processed/`.>

## Propuesta: qué cambia (fase 1, antes de tocar nada)

Una fila por documento que la información toca. La lista sale de `harness/stages/dependencies.md`
siguiendo la cadena desde el primer documento afectado. Los que se revisaron y no cambian
también van, para que quede constancia de que se miraron.

| Etapa | Documento | ¿Pasó checkpoint o se entregó? | Antes | Después |
|---|---|---|---|---|
| <1 / 2 / 3> | <ruta> | sí / no | <lo que dice hoy, en una línea> | <lo que va a decir, o "revisado, no cambia"> |

**Checkpoints que dejan de valer:** <ruta de cada checkpoint-record PASA cuyo artefacto
cambia. No se editan; se listan aquí.>

## Aplicado (fase 2)

| Documento | Versión congelada | Versión nueva | Qué se cambió |
|---|---|---|---|
| <ruta> | `versions/<nombre>-v<N>.md`, o "no aplica, no había pasado checkpoint" | <N+1> | <una línea> |

**Riesgos y supuestos:** <si la información abre, confirma o cae un riesgo, qué fila de
`gaps-and-risks.md` se movió. Nunca un registro aparte.>

**Ready to take regenerados:** <qué `.docx` o `.xlsx` se volvió a generar, o "ninguno".>

**Checkpoint acotado en sesión fresca:** <ruta del checkpoint-record, o "pendiente".
Sin PASA sobre lo reabierto, la etapa en curso no cierra.>

## ¿Debió detectarse antes?

<Sí o no. Si sí: en qué etapa, con qué skill o con qué pregunta de agenda se habría
destapado. Esa respuesta es una fila de `friction-log.md` y se escribe en el momento.>
