---
name: discovery-session
description: >
  Procesa la transcripción de una sesión de discovery y produce las notas
  estructuradas, el acta de la sesión, el documento de entendimiento, los inventarios y la
  actualización del registro de riesgos. Usar cuando el usuario diga
  "procesa la sesión d3", "saca las notas de la reunión", "qué salió del discovery de
  ayer", "escribe el entendimiento de la sesión", "actualiza los inventarios con la
  sesión", o después de import-transcript. Es el paso entre el transcript crudo y los
  requisitos.
---

# Discovery session — del transcript a las notas de la etapa 2

Entrada: `discovery/2-analysis/inputs/d<N>-transcript.md`. Si no existe, corre primero
`import-transcript`.

## Output 1 — Notas de la sesión

`discovery/2-analysis/outputs/d<N>-notes.md`:

```markdown
# d<N> — <nombre> · Notas
Fecha: ... · Dueño del frente (cliente): ...

## Hallazgos
Lo que aprendimos del negocio o del sistema. Cada hallazgo cita de qué parte de la
conversación sale (basta el nombre de quien lo dijo). Hechos, no interpretaciones.

## Proceso tal como lo cuentan
Cómo funciona esto en la vida real, sin sistemas de por medio: nace el potro, hay que
inscribirlo, en la inscripción pasa esto. Va tal como lo narró el cliente, sin traducirlo
a pantallas ni a entidades. Es lo que después permite proponer un flujo distinto en vez de
copiar el sistema actual con mejor interfaz.

## Decisiones
Lo que quedó decidido en la sesión, con quién lo decidió.

## Pendientes
Lo que quedó abierto: qué falta, quién lo destraba, para cuándo. Estos alimentan la
bolsa de llamadas cortas del PM.

## Contradice lo ya aprobado
Cada hallazgo de esta sesión que choca con un documento que ya pasó checkpoint o ya se
le entregó al cliente, con la marca `contradice: <ruta>`. Ejemplo: `contradice:
2-analysis/outputs/roles-table.md`, el cliente dijo que son cinco roles y la tabla tiene
tres. Cada marca dispara `reopen-artifact` al cerrar la sesión. Si no hay ninguna, se
escribe "ninguna".

## Compromisos
Qué se comprometió cada lado (vienen del cierre de la agenda del kickoff-discovery).

## Candidatos a requisito
Frases del cliente que suenan a RF/RNF, tal cual se dijeron. Sin redactar todavía:
la redacción formal es de requirements-lite / requirements-full.

## Decisiones técnicas que hay que resolver
Los hallazgos que no se pueden dejar como están porque exigen elegir entre caminos.
Solo la decisión y por qué aparece, sin opciones ni recomendación: eso lo produce
`technical-design` en modo corto, sobre esta lista.
```

## Output 2 — El acta de la sesión

Las notas son internas y crudas. El acta es la versión corta y legible de lo que pasó: qué
se conversó, qué quedó decidido, qué se comprometió cada lado y para cuándo.

Se produce siempre y es barato, porque sale de las notas que ya se escribieron. Para qué
sirve: cuando el cliente pregunta "¿me pasas el acta de esa reunión?", existe. Y cuando
alguien de adentro pregunta qué se dijo en la sesión 3, se lee el acta en dos minutos en vez
de barrer un transcript de una hora.

**Enviarla al cliente es decisión del PM, proyecto por proyecto.** Hoy no es una práctica
estandarizada en Codeable y el arnés no la obliga: producir el acta no bloquea nada y no
enviarla tampoco. Es un documento que ayuda, no un trámite.

`discovery/2-analysis/outputs/d<N>-acta.md`:

```markdown
# Acta d<N> — <tema> — <fecha>

**Participantes:** <de su lado y del nuestro>

## Qué se conversó
<Tres o cuatro párrafos, en el lenguaje del cliente. Sin jerga nuestra.>

## Qué quedó decidido
<Solo lo que cerró, con quién lo decidió.>

## Compromisos
| Quién | Qué | Para cuándo |
|---|---|---|
```

Sale de las notas, no del transcript. Y no lleva nada que el cliente no haya dicho: si hace
falta una recomendación nuestra, va en un documento aparte. Un acta que mezcla lo que dijo
el cliente con lo que proponemos nosotros deja de servir como registro de lo acordado, que
es su única función.

## Output 3 — El documento de entendimiento de la sesión

`discovery/2-analysis/outputs/d<N>-entendimiento.md`, sobre `templates/session-understanding.md`.
Las notas extraen; este documento organiza y explica. Está escrito para que alguien que no
estuvo pueda conducir la sesión siguiente sin preguntar nada.

Es el artefacto más caro de la etapa 2 y el que más se lee después. La plantilla trae las
trece secciones y qué va en cada una; en este skill van solo las dos mecánicas que la
plantilla no puede resolver sola.

### Las cuatro procedencias

Cada afirmación lleva una, porque en dos semanas nadie recuerda quién dijo qué:

- **Confirmado en sesión.** El cliente lo enunció o lo validó.
- **Propuesta nuestra aceptada.** La idea la trajimos nosotros y el cliente asintió. Es
  distinto de una necesidad que el cliente haya traído, y si no se separa ahora, a los dos
  meses se lee igual y terminamos defendiendo como requisito del cliente algo que
  propusimos nosotros.
- **Interpretación nuestra por validar.**
- **Pendiente**, con responsable.

### La serie: el entendimiento anterior es el archivo de estado

No hay un registro aparte que lleve la cuenta de lo que ya se sabe. Lo llevan estos mismos
documentos, y por eso el orden de trabajo es este:

1. Antes de escribir el de la sesión N, lee los de 1 a N-1.
2. El glosario, los pendientes y los riesgos se arrastran. No se reabren ni se repiten.
3. Un hallazgo previo solo se vuelve a escribir si esta sesión lo confirma, lo amplía o lo
   corrige. Si no, se referencia.
4. La sección 13 declara qué documento de la serie es y qué no repite del anterior.

De ahí sale la agenda de la sesión N+1: `skills/kickoff-discovery/` la abre con el recap de
lo que ya sabemos y no vamos a volver a preguntar, construido sobre estos documentos y
sobre lo que quedó cerrado en `gaps-and-risks.md`. Sin esto, las últimas sesiones del
discovery repiten preguntas que ya se contestaron, que es la forma más cara de quemar la
paciencia del cliente.

## Output 4 — Inventarios acumulativos

Actualiza (crea si no existen) en `discovery/2-analysis/outputs/`:

- `inventory-fields.md` — campos de captura y validaciones mencionados.
- `inventory-rules.md` — reglas de negocio; marca cada una como **dura** (siempre se
  cumple) o **criterio** (depende del juicio de una persona).
- `inventory-sources.md` — fuentes externas, integraciones, sistemas actuales; anota si
  tienen API conocida o no y **cómo verlos**: link, credencial de prueba, captura o
  export. Un sistema actual que no se puede mirar obliga a rediseñar a ciegas.
- `inventory-states.md` — por cada entidad importante, en qué estados puede estar, qué la
  mueve de uno a otro, quién lo dispara y qué tiene que pasar cuando ocurre (notificación,
  pantalla, permiso, registro que se cierra). Es lo que más se olvida preguntar y lo que
  más pantallas genera.
- `inventory-users.md` — por cada rol, quién es la persona detrás del cargo: cuántos son,
  nivel técnico y educativo, idioma y registro que maneja, dónde y con qué dispositivo
  trabaja. El cargo solo no alcanza: dos roles con el mismo nombre pueden ser dos
  poblaciones distintas y necesitar dos diseños distintos.

Agrega, no reescribas: cada entrada nueva cita la sesión de la que salió (`d3`).

Los dos últimos, junto con el proceso tal como lo cuentan, son los insumos de
`skills/design-brief/`. Si una sesión no los tocó, no se inventan: quedan como pendiente
con dueño para la siguiente.

## Output 5 — El registro de riesgos

Cada sesión actualiza `discovery/2-analysis/outputs/gaps-and-risks.md`. Si es la primera
sesión, ese archivo se crea copiando `1-planning/outputs/gaps-and-risks-draft.md`; el
borrador se queda en la etapa 1 como constancia. El checkpoint de la etapa 2 exige que esté
completo, y un registro que nadie fue llenando se reconstruye de memoria en la semana 4.

- Los supuestos de la etapa 1 que esta sesión **confirmó o descartó**: se mueve la columna
  de estado en la fila que ya existe. No se abre un registro nuevo.
- Los riesgos nuevos que aparecieron, con su columna de origen (negocio, técnico,
  comercial) y la sesión de la que salieron.
- Si el registro ya pasó checkpoint (la etapa 2 cerró y la sesión es tardía), no se edita
  directo: la fila va como `contradice:` en las notas y la mueve `reopen-artifact`.

**La sesión no inventa mitigación.** Marca el riesgo como confirmado y se detiene ahí. La
mitigación y el dueño los produce `technical-design` en modo corto y los exige el
checkpoint de la etapa 2, cuando hay con qué. Es la misma razón por la que las notas no
llevan recomendaciones.

## Reglas

- **Extrae, no inventes.** Si el transcript no lo dice, no está. Una inferencia
  razonable va marcada: `(inferido: ...)`.
- **Las notas no llevan opciones ni recomendaciones.** Su trabajo es extraer. Marcar que
  un hallazgo exige una decisión sí; proponer cuál tomar no. Si se mezcla extracción con
  recomendación, en dos semanas nadie sabe qué dijo el cliente y qué propusimos nosotros.
  Las opciones salen después, con `technical-design` en modo corto.
- Nombres y cifras van tal cual se dijeron. Si dos personas se contradicen, registra
  ambas versiones como pendiente, no elijas una.
- El transcript de Gemini tiene errores de reconocimiento (nombres, montos). Si un
  dato crítico se ve sospechoso, márcalo como `(verificar: audio poco claro)`.
- **Audita el insumo y déjalo escrito.** Las correcciones al transcript, las siglas que
  aparecen de cinco formas distintas, las dos cifras que no coinciden y lo que se decidió
  dejar fuera van en la sección 13 del entendimiento. Un documento que no dice de qué
  calidad era su fuente se lee como si toda su fuente hubiera sido buena.

## Modos de fallo

- **Transcript muy largo o de varias reuniones juntas:** procesa por sesión; si el doc
  mezcla dos sesiones, sepáralo primero en dos archivos.
- **La sesión derivó a temas de otro frente:** los hallazgos se registran igual, pero
  anótalos bajo `## Fuera de agenda` con el frente al que pertenecen, para que el PM
  decida si amerita sesión extra.
- **Nada accionable en la sesión:** eso también es un resultado. Notas cortas + un
  pendiente que diga por qué la sesión no rindió y qué se necesita repetir.
