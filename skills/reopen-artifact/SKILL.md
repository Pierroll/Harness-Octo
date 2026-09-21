---
name: reopen-artifact
description: >
  Procesa información nueva que contradice un documento ya aprobado o ya entregado, venga
  de una sesión, un correo, la revisión con el equipo o el propio cliente. Propone qué
  documentos de cualquier etapa cambian y qué checkpoints dejan de valer, y aplica solo
  cuando el PM lo confirma. Usar cuando el usuario diga "llegó esto, ¿qué cambia?", "el
  cliente corrigió esto", "esto contradice el As-Is", "recortamos el alcance", "hay algo
  en el inbox", o cuando un skill marcó `contradice:` en su salida. Es el procedimiento de
  la regla 10 de AGENTS.md.
---

# Reopen artifact — la información nueva corrige lo que haga falta, en cualquier etapa

## La idea

El arnés es unidireccional solo en el orden en que se producen las cosas: primero la etapa
1, después la 2, después la 3. Los documentos son archivos y se pueden editar siempre.
"Volver hacia atrás" son tres cosas: actualizar el documento que quedó viejo, guardar su
versión anterior, y declarar qué aprobaciones ya no valen. La etapa anterior queda cerrada;
lo que se reabre es el documento.

Sin esto, el PM apurado corrige solo el documento de la etapa en curso y deja el As-Is y
los requisitos diciendo lo viejo. Nadie sospecha, porque pasaron checkpoint. Es exactamente
lo que la regla 10 prohíbe y lo que este skill vuelve procedimiento.

## De dónde llega la información

Por tres caminos, y los tres terminan aquí:

- **El inbox.** `discovery/inbox/` es la carpeta suelta donde el PM deja lo que llegó sin
  tener que saber a qué etapa pertenece: un correo, una nota, una captura. Su README dice
  cómo. También vale pegarlo en el chat.
- **Una marca `contradice:`.** Los skills que procesan información nueva
  (`discovery-session`, `team-review` y `ui-design`, este último con el feedback del cliente
  sobre los mockups) marcan `contradice: <ruta del documento aprobado>`
  cuando algo de lo que salió choca con lo ya aprobado. `session-log` lleva esa marca a `current.md` como bloqueado hasta que se
  procese.
- **El PM lo dice.** "El cliente ahora dice que son cinco roles, no tres."

## Cómo se corre: dos fases

**Fase 1, proponer. No se toca ningún documento.**

1. Leer lo que llegó y escribirlo en dos o tres líneas, con su fuente, en
   `harness/templates/reopen-record.md` → `discovery/<etapa en curso>/checkpoint/<fecha>-reopen-<tema>.md`.
   Si vino con marcas `contradice:`, se listan en el campo del registro que las nombra.
2. Ubicar el documento **más temprano de la cadena** que la información contradice, no el
   primero que viene a la cabeza. En la sección "Las cadenas que más se reabren" de
   `harness/stages/dependencies.md` está el arranque de cada una: un rol nuevo empieza en
   `inventory-users.md`, no en `roles-table.md`; un cambio de proceso empieza en `as-is.md`;
   un recorte de alcance en `scope-decisions.md`. El draft de la etapa 1 no se toca nunca:
   es constancia de lo que se sabía antes del kickoff. Se corrige el canónico de la etapa 2.
3. Buscar ese documento en la columna "Si cambia" de `harness/stages/dependencies.md` y
   seguir la cadena hasta el final. Todo lo que aparezca entra en la tabla de propuesta.
4. Por cada documento de la lista, abrirlo y escribir la fila: etapa, ruta, si pasó
   checkpoint o se entregó, qué dice hoy, qué diría después. Si se revisó y no cambia,
   también va, con "revisado, no cambia".
5. Listar los checkpoint-records PASA cuyo documento cambia. No se editan: se nombran.
6. Mostrarle al PM la tabla y parar. Ejemplo de cómo se ve:

```
Etapa 1 · understanding-doc.md · "3 tipos de usuario" → "5 tipos de usuario"
Etapa 2 · inventory-users.md   · se agregan "supervisor regional" y "auditor externo"
Etapa 2 · roles-table.md       · dos roles nuevos; "asesor" pierde acceso a reportes
Etapa 2 · to-be.md             · etapa "captación": antes la hacía el asesor, ahora el supervisor
Etapa 2 · Requerimientos.docx  · revisado, no cambia hasta que se confirme la tabla de roles
Checkpoint que deja de valer: 2-analysis/checkpoint/2026-08-20-2-analysis.md
```

**Fase 2, aplicar. Solo cuando el PM dice "aplica".**

7. Por cada documento que cambia y ya pasó checkpoint o se entregó: copiarlo tal cual a
   `outputs/versions/<nombre>-v<N>.md` de su etapa, y recién después editar el canónico.
   Subir su línea `**Versión:**` con qué cambió y qué evento cerró la anterior. Si el
   documento salió de un skill sin template (`roles-table.md`, `diagram-l0.md`, los
   `inventory-*.md`, `architecture.md`, `estimation.md`) y no tiene esa línea, se le agrega
   debajo del título con el mismo formato. Si el documento no había pasado checkpoint, se
   edita directo, sin versión congelada.
8. Si la información abre, confirma o cae un riesgo o un supuesto: mover la fila que ya
   existe en el `gaps-and-risks.md` de la etapa en curso. Nunca un registro aparte.
9. Los entregables en `ready-to-take/` se tratan según cómo nacieron. Los que tienen
   markdown de registro (gantt, cronogramas, informe, actas, y el RF detallado desde
   `requirements-full.md`) se regeneran desde el markdown, con `harness/skills/ready-to-take/`
   o con el skill que los produjo. Los que nacen directo en `.docx`
   (`Kickoff_<cliente>.docx`, `Discoveries_<cliente>.docx`, `Requerimientos_<cliente>.docx`)
   se congelan igual que un markdown, en `outputs/versions/<nombre>-v<N>.docx`, y los
   regenera el skill que los produjo (`kickoff-discovery`, `requirements-lite`), que sube la
   línea "Versión X.Y" de la portada del documento.
10. Mover el archivo del inbox, si lo hubo, a `discovery/inbox/processed/`.
11. Completar la sección "Aplicado" del registro y actualizar `backlog.md` si cambió el
    alcance o una feature.
12. Correr `harness/skills/checkpoint-review/` **en sesión fresca**, en modo acotado: solo los
    documentos del registro, con los criterios de la etapa que los produjo. Sin PASA
    sobre lo reabierto, la etapa en curso no cierra. El modo de fallo "revísalo rápido
    acá mismo" de ese skill aplica igual aquí.
13. Responder la última pregunta del registro: ¿esto debió detectarse antes, en qué
    etapa y con qué skill o pregunta de agenda? Si la respuesta es sí, es una fila de
    `friction-log.md` y se escribe en el momento (`harness/skills/friction-log/`).

## Reglas

- **Proponer antes de tocar.** La fase 1 no edita nada. Un cambio en cascada aplicado sin
  que el PM lo vea entero es peor que el documento viejo.
- **Se toca el canónico, no el draft.** El draft de la etapa 1 queda como constancia de lo
  que se sabía antes del kickoff. Excepción: si el proyecto todavía está en la etapa 1 y el
  canónico de la etapa 2 no existe, se corrige el draft.
- **Los checkpoints viejos no se editan.** Se nombran en el registro como "dejan de valer"
  y el nuevo checkpoint acotado deja su propio record.
- **Lo que se le entregó al cliente se le vuelve a entregar.** Si un `.docx` cambia después
  de enviado, el PM se lo dice al cliente con qué cambió. La versión nueva lo lleva
  escrito.
- **Un registro por información nueva**, no uno por documento. Si llegan tres cosas
  distintas el mismo día, son tres registros.

## Modos de fallo

- **La información llega a mitad de una sesión de producción** (se está escribiendo el RF
  full y el cliente manda un correo): se anota `contradice:` en lo que se está
  produciendo y se corre este skill al terminar. No se frena la sesión, pero tampoco se
  sigue como si nada.
- **El PM quiere corregir solo el documento de la etapa en curso:** la tabla de propuesta
  lista los de atrás igual. Si decide no tocarlos, quedan en `current.md` como bloqueado
  con su nombre y fecha, no desaparecen.
- **La cadena de `dependencies.md` da veinte documentos:** se revisan los veinte. Lo normal
  es que la mayoría quede en "revisado, no cambia", y eso también hay que dejarlo escrito.
- **El documento afectado ya se le presentó al cliente y el cambio lo contradice delante
  de él:** eso es una conversación del Líder, no del documento. El skill lo señala y deja
  la decisión de cuándo y cómo decirlo con nombre y fecha en el registro.
- **La información nueva es en realidad un tema nuevo, no una corrección:** entonces no es
  reapertura. Va como tema por entender o pendiente en `gaps-and-risks.md`, y se procesa por
  el flujo normal de la etapa.
