# Documento de entendimiento — <proyecto> — <sesión>

Lo escribe quien procesó la sesión, sobre el transcript y la agenda con las respuestas
capturadas en vivo. Lo produce `skills/discovery-session/` como Output 3.

Para qué sirve: que alguien que no estuvo en la sesión pueda conducir la siguiente sin
preguntar nada. No es una minuta ni un documento de requisitos. Es la fotografía del
entendimiento compartido al cierre de la sesión: qué quedó confirmado, qué quedó abierto y
qué debe salir de la sesión que viene.

Estilo: ver `harness/skills/discovery-report/references/writing-style.md`.

Las secciones 1 a 4 y 6 a 13 son fijas y van siempre, aunque una quede corta. La sección 5
es variable y es donde vive el contenido de esta sesión en particular.

**Si esta es la sesión de kickoff**, el documento abre la serie y lleva además tres
secciones fijas que las demás no necesitan, porque son las que fijan las reglas del juego
para todo lo que viene: los insumos y accesos requeridos con qué sesión bloquea cada uno,
la metodología y el ritmo de trabajo acordado, y el plan de discovery con el guion de cada
sesión y las preguntas que deben quedar respondidas al cierre. Van después de la sección 5.

## 1. Control del documento

| Campo | Detalle |
|---|---|
| Proyecto | <nombre> |
| Sesión | <número y frente. Ejemplo: d3, visibilidad y reportes> |
| Fecha y hora | <YYYY-MM-DD, hora y zona> |
| Duración | <real, y entre paréntesis la prevista en la agenda si no coinciden> |
| Versión | <N> |
| Reemplaza a | <`versions/d<N>-entendimiento-v<N-1>.md`, o "primera" · qué cambió · qué cerró la anterior> |
| Elaborado por | <nombre y rol> |
| Fuentes primarias | <transcript, agenda con respuestas en vivo, grabación, correos. Si hay dos grabaciones de la misma sesión, se dice> |
| Estado | vigente / borrador / reemplazado por <cuál> |
| Audiencia | <quién del equipo lo necesita: quien conduce la sesión siguiente, diseño, arquitectura> |

La duración real contra la prevista no es un dato decorativo. Una sesión de 45 minutos que
tomó 58 y otra que tomó 20 no dicen lo mismo sobre lo que se alcanzó a cubrir.

## 2. Propósito y convención de lectura

<Un párrafo que diga qué cubrió esta sesión y qué no. Si algo relevante quedó fuera del
guion previsto, se advierte en este párrafo y se dice en qué sección se registró.>

Cada afirmación de este documento lleva una de estas cuatro procedencias. La distinción
importa porque en dos semanas nadie recuerda quién dijo qué:

- **Confirmado en sesión.** El cliente lo enunció o lo validó de forma explícita. Se puede
  tratar como acuerdo.
- **Propuesta nuestra aceptada.** La idea la trajimos nosotros y el cliente asintió. No es
  lo mismo que una necesidad que el cliente haya traído, y a los dos meses se lee igual si
  no se separa ahora.
- **Interpretación nuestra por validar.** Lectura nuestra a partir de lo conversado.
  Todavía no está confirmada y hay que preguntarla.
- **Pendiente.** No se resolvió y tiene responsable asignado.

## 3. Objetivo de la sesión y grado de cumplimiento

<El objetivo declarado de la sesión, en un párrafo. Sale de la sección de objetivos de la
agenda, así que no hay que redactarlo de nuevo.>

| Objetivo previsto | Resultado real |
|---|---|
| <cada línea de la sección de objetivos de la agenda> | Cumplido / Parcial / No cumplido / Reasignado, con una frase que diga qué pasó |

Reasignado es cuando el objetivo deja de resolverse preguntándole al cliente y pasa a ser
trabajo nuestro. Cumplido admite matiz: un objetivo puede cumplirse con una respuesta
distinta a la que se esperaba, y eso se dice en la misma celda.

**Lectura para el equipo.** <Un párrafo que diga qué rindió la sesión de verdad, que casi
nunca es lo que la agenda buscaba. Una sesión puede fallar en definir y aun así ser la más
valiosa del discovery por lo que diagnosticó. Eso se dice en esta sección y no se deja
implícito.>

## 4. Participantes y contexto de la sesión

| Persona | Rol | Aporte en la sesión |
|---|---|---|
| <nombre> | <cargo y de qué lado> | <qué aportó en concreto, no qué se esperaba de esa persona> |

<Después de la tabla, lo que condiciona la lectura de todo el documento: quién faltó y qué
quedó sin resolver por esa ausencia, si alguien era nuevo en el cargo, si dos personas
compartieron micrófono y por eso las atribuciones son ambiguas, si la sesión se cortó.>

## 5. Las secciones de contenido de esta sesión

Entre cuatro y nueve secciones. Esta parte no tiene forma fija porque cada sesión levanta
material distinto.

Dos reglas para titularlas:

Primero, el título nombra el hallazgo y no la categoría. "El régimen ISO, la restricción
más importante de la sesión" le dice al lector qué va a encontrar; "Restricciones" no.
Otros títulos que salieron de sesiones reales: "Evaluación, hallazgo emergente fuera de la
agenda", "El dashboard como modelo obsoleto", "La capa semántica no existe".

Segundo, cada sección cierra con la implicancia concreta cuando la hay. El hallazgo solo es
transcripción; el hallazgo más qué obliga a hacer es entendimiento.

## 6. Lo que la sesión no cubrió

Se registra aparte porque no todo lo que faltó, faltó por lo mismo. Un tema que no se cubrió
por falta de tiempo se reagenda con la misma persona. Uno que no se cubrió porque el
interlocutor no era quien podía responderlo se reagenda con otra, y confundirlos quema una
reunión entera.

| Tema no cubierto | Por qué | Con quién resolverlo |
|---|---|---|
| <tema> | <falta de tiempo / interlocutor sin el contexto / decisión de otro nivel / la pregunta se interrumpió> | <nombre y de qué lado> |

## 7. Implicancias para el diseño

<Los hallazgos traducidos a criterios accionables para quien va a construir. Una línea por
implicancia, empezando por el verbo. No repite el hallazgo: dice qué hay que hacer por
causa de él.

Ejemplo de la diferencia. Hallazgo: "el PEP se organiza por grado y el PAI por disciplina".
Implicancia: "la jerarquía de navegación no puede ser única; el sistema soporta los dos
árboles sin forzar uno sobre el otro".>

## 8. Estado de respuesta de las preguntas de la agenda

Una fila por pregunta de la agenda, en el orden en que estaban. Es lo que evita que la
sesión siguiente repita lo que ya se contestó y lo que hace visible lo que quedó abierto.

| Pregunta | Estado | Nota |
|---|---|---|
| <la pregunta tal como estaba en la agenda> | Respondida / Parcial / Abierta / Reasignada / Anulada | <dónde está la respuesta, o qué falta> |

Los cinco estados:

- **Respondida.** Quedó cerrada. La nota dice en qué sección está.
- **Parcial.** Se sabe una parte. La nota dice qué parte falta.
- **Abierta.** No se respondió y sigue siendo nuestra pregunta.
- **Reasignada.** Deja de ser pregunta al cliente y pasa a ser trabajo nuestro.
- **Anulada.** El cliente corrigió la premisa y la pregunta dejó de aplicar. Se deja escrita
  igual, porque saber que una pregunta se cayó vale tanto como saber su respuesta.

## 9. Compromisos acordados en la sesión

| Responsable | Compromiso | Criticidad |
|---|---|---|
| <nombre, o el nombre de la empresa cuando es del equipo> | <qué se comprometió a hacer> | Bloqueante / Alta / Normal / Cumplido |

La criticidad es la columna que hace que la tabla sirva. Bloqueante significa que sin eso
la sesión siguiente o el frente completo no avanzan, y es lo que el PM persigue esta misma
semana. Cumplido se usa cuando el compromiso ya se resolvió entre la sesión y la redacción
del documento.

## 10. Preguntas abiertas y decisiones pendientes

Es una tabla distinta de la de compromisos y las dos hacen falta. Un compromiso es algo que
alguien se comprometió a hacer. Un pendiente es una pregunta que sigue sin respuesta, y lo
que importa de ella no es quién la responde sino **dónde se responde**: si nadie declara el
lugar, el pendiente viaja de sesión en sesión sin que sea culpa de nadie.

| Pendiente | Responsable | Dónde se resuelve |
|---|---|---|
| <la pregunta o la decisión que falta> | <nombre, o "ambos" cuando la decisión es conjunta> | <la sesión, el documento, la llamada corta o el frente donde se cierra> |

Los pendientes se arrastran entre documentos de la serie hasta que se cierran. Uno que
lleva tres sesiones abierto no se destraba insistiendo una cuarta vez: se escala.

## 11. Riesgos y puntos de atención

| Riesgo | Impacto | Origen y mitigación |
|---|---|---|
| <qué puede salir mal> | Alto / Medio / Bajo | <de dónde sale, en qué parte de la sesión apareció, y qué se hace al respecto> |

Estas filas se llevan a `gaps-and-risks.md`, que es el registro único del proyecto. En
esta sección viven en su versión narrada, con el contexto de la sesión que las destapó.

**Supuestos vigentes.** <Un párrafo con lo que estamos dando por cierto sin haberlo
confirmado al cierre de esta sesión. Un supuesto que se cae convierte varios hallazgos en
preguntas abiertas.>

## 12. Glosario incremental de esta sesión

Solo los términos nuevos. Los de sesiones anteriores no se repiten: quien los necesite los
busca en el documento donde aparecieron por primera vez.

| Término | Significado según el cliente |
|---|---|
| <la palabra tal como la usa el cliente> | <qué quiere decir para ellos, no la definición de diccionario> |

La columna dice "según el cliente" a propósito. La misma palabra no significa lo mismo
en dos empresas del mismo rubro, y adoptar su vocabulario es lo que hace que el entregable
se lea como escrito por alguien que entendió el negocio.

## 13. Notas sobre las fuentes

La sección que protege de construir sobre un insumo malo. Siete puntos, y se escriben los
que aplican:

**Correcciones a la transcripción automática.** Fechas, cifras y nombres que el sistema de
notas registró mal, con la corrección y en qué se apoya.

**Calidad del audio.** Si la transcripción está degradada, qué se reconstruyó por contexto
y con qué criterio. Cuando la atribución de una frase no es inequívoca, se registra el
contenido sin asignarlo a una persona.

**Normalización de nombres.** Personas, sistemas y siglas que aparecen escritos de varias
formas, y cuál se adoptó como canónica.

**Contradicciones no resueltas.** Dos cifras distintas para el mismo dato dentro de la
misma sesión, sin elegir una. Se declara cuál recogió el documento que ya salió, si salió
alguno, y queda como pendiente.

**Elementos posteriores a la sesión.** Lo que entró a una propuesta o a un diagrama después
de la reunión y no se conversó ahí. Si el cliente lo aceptó ya es alcance, pero su origen
es nuestro y hay que poder decirlo.

**Contenido excluido a propósito.** Lo que la sesión tocó y este documento no recoge, con
la razón: pertenece a otro proyecto, es información reservada, no era el tema.

**Serie.** Qué número de documento es y qué no repite del anterior. La regla es que los
hallazgos previos solo se vuelven a escribir cuando esta sesión los confirma, los amplía o
los corrige.
