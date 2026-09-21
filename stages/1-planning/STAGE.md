# Etapa 1 — Planificación

## Propósito

Convertir una propuesta firmada en un discovery ejecutable: problema reconstruido con sus
hipótesis, temas por entender mapeados, supuestos y riesgos abiertos, temas por negociar
identificados, líder de operación
del cliente identificado, sesiones agendadas con dueños, plan con fechas, alcance encuadrado y
backlog inicial. Al cerrar esta etapa el cliente sabe qué va a pasar y cuándo, y sabemos
qué necesitamos de él y a quién pedírselo.

## Goals

1. Identificar qué falta entender y asignarle a cada tema la sesión que lo va a resolver.
2. Escribir los supuestos y riesgos como hipótesis, para contrastarlos en las sesiones y no
   descubrirlos en la semana 4.
3. Dejar escritos los temas por negociar antes de sentarse a negociarlos.
4. Contrastar con el cliente el problema que reconstruimos y corregirlo con lo que él diga.
5. Identificar quién del lado del cliente facilita el discovery, y ponerle dueño y fecha a
   cada entorno y acceso.
6. Armar el calendario de sesiones con dueño y fecha confirmados del lado del cliente.
7. Inicializar el backlog con los módulos de la propuesta.

## Entradas obligatorias

Están en `CONTRACT.md`, cada una con qué la satisface y qué la invalida. Se declaran por
artefacto y no por etapa anterior: un proyecto puede satisfacerlas con material propio,
con un discovery previo o con lo que traiga la propuesta, y de dónde vienen no importa
mientras existan y sigan vigentes. Ver `stages/modalities.md` y `skills/entry-check/`.

## El orden interno de la etapa

Importa, porque cada paso alimenta al siguiente:

```
reconstruir el problema →
temas por entender, supuestos y riesgos, temas por negociar →
kickoff (escuchar) → equipo, entornos y accesos → cronograma de delivery → backlog
```

Antes de hablar con el cliente el problema no se entiende, se **reconstruye** desde la
propuesta y las conversaciones comerciales. Lo que se escribe son hipótesis, y nombrarlas
así es lo que las vuelve auditables: en el kickoff se contrastan una por una.

Los supuestos y riesgos se producen **antes** del kickoff y son parte de lo que se lleva a
la reunión. Al kickoff se va con una propuesta de agenda y una lista de temas, no con
fechas cerradas. La reunión existe para escuchar, y es normal salir con más temas de los
que se entró.

El calendario de sesiones se produce **después**, porque recién ahí se sabe con quién y de
qué, y depende del equipo asignado: sin equipo, el cronograma es ficción.

## Las tres listas que nacen como hipótesis

Antes del kickoff no se entiende nada, así que todo lo que se escribe en esta etapa es una
hipótesis que hay que contrastar. Son tres listas distintas y conviene no mezclarlas,
porque cada una se resuelve en un lugar diferente:

- **Temas por entender.** Lo que sabemos que no sabemos. Se resuelve en una sesión de
  discovery, y por eso cada tema lleva la sesión que lo va a responder.
- **Supuestos y riesgos.** Lo que estamos dando por cierto sin haberlo confirmado. Se
  resuelve en la sesión que lo valida, y recién después de eso se le pide mitigación y
  dueño.
- **Temas por negociar.** Lo que va a haber que acordar con el cliente porque toca alcance,
  plazo, costo o responsabilidad de su lado: quién paga el acceso a un proveedor de datos,
  hasta dónde llega el soporte de una herramienta suya, qué pasa si un área no libera a su
  gente. No se resuelve con información sino con una decisión, y por eso lleva quién decide
  de cada lado y en qué momento se pone sobre la mesa.

La distinción importa porque un tema por negociar disfrazado de tema por entender llega a
la negociación de alcance sin preparación, que es la reunión más cara del discovery.

## Artefactos mínimos

Están en `CONTRACT.md`, cada uno con el skill que lo produce, quién lo corre y la ruta en
la que vive, incluidos los que solo aplican según la modalidad declarada en el
`overrides.md` del proyecto.

## El As-Is y el To-Be ya empiezan en la etapa 1

Nacen en esta etapa, con lo que ya trae la propuesta comercial: el flujo actual y el flujo
propuesto, porque el cliente cuenta su dolor desde el primer contacto con ventas. Eso es
un As-Is y un To-Be tentativos, y salen escritos en esta etapa.

Un As-Is completo son dos partes: las etapas del proceso, y los SLA, o sea cuánto se
demora el cliente entre etapa y etapa. El kickoff sirve para poner los tiempos, y el To-Be
lleva la hipótesis de cuánto baja cada uno ("este paso que hoy toma cuatro horas debería
tomar media"). Escrito así, el To-Be deja de ser un dibujo y pasa a ser un compromiso
medible.

Las sesiones de la etapa 2 profundizan y validan lo que la etapa 1 dejó tentativo, y por
eso la etapa 2 abre con un As-Is y un To-Be ya escritos en vez de construirlos desde cero.

Una distinción que conviene marcar desde la etapa 1, porque después cuesta recuperarla: el
As-Is describe el proceso tal como lo soporta el sistema actual, y eso no es lo mismo que
el proceso real del negocio. El proceso real existiría igual sin ningún sistema, y es lo
que permite proponer un flujo distinto en vez de copiar el sistema de hoy con mejor
interfaz. En la etapa 1 casi nunca se tiene, porque la propuesta comercial habla de
sistemas. Se captura en las sesiones de la etapa 2 y por eso las preguntas de las
plantillas de `kickoff-discovery` abren siempre por ahí.

## El líder de operación del cliente, los entornos y los accesos

Este paso es humano y va **después** del kickoff, porque recién ahí se sabe a quién hay
que hablarle. Su resultado vuelve a entrar al arnés como insumo: con los responsables y lo
que se supo en la reunión, `skills/kickoff-discovery/` regenera las agendas de sesión.

Tres definiciones quedan escritas:

- **El líder de operación del cliente.** Del lado del cliente siempre hay dos personas y
  se confunden porque las dos son del cliente. El **point of contact** decide y valida.
  La propuesta trae un nombre tentativo, y quien firma la propuesta puede ser otra persona:
  el kickoff es donde se confirma quién es. El **líder de operación** es el PM, analista o
  jefe de área que hace que las sesiones ocurran y coordina la disponibilidad de las áreas
  involucradas. No decide, y se sabe recién después del kickoff. Sin ese segundo nombre el
  calendario depende de quién conteste el correo.

  Nunca se abrevia point of contact como PoC: en nuestro vocabulario PoC ya es prueba de
  concepto y las dos palabras conviven en el mismo documento.
- **Los entornos y los accesos**, cada uno con dueño del lado del cliente y fecha. Es el
  bloqueador más frecuente y no se registra como supuesto.
- **El equipo nuestro asignado.** Sin equipo no hay capacidad, y sin capacidad el
  cronograma es un dibujo. La propuesta comercial ya lo trae, rol por rol y con su
  dedicación, full time o fractional (ver `stages/modalities.md`). Lo que falta en esta
  etapa no es armarlo sino confirmar que esas personas están disponibles en las fechas que el
  cronograma va a usar.

## Roles en esta etapa

- **Líder (PM):** decide la lista de sesiones, encuadra el alcance ("la propuesta está
  cerrada, no se reabre"), conduce el kickoff. En el kickoff habla poco y escucha mucho.
- **Implementador (sesión de trabajo con el agente):** produce gaps, kickoff, plan y
  backlog.
- **Validador/Auditor (sesión fresca):** corre `skills/checkpoint-review/` sobre los
  artefactos antes de dar la etapa por cerrada.

## Checkpoint de salida

La etapa cierra cuando una sesión fresca confirma:

1. Ningún tema por entender quedó sin sesión asignada. Los que no entran están declarados
   por escrito como fuera de alcance, con su razón.
2. Cada supuesto y cada riesgo está escrito como hipótesis, con qué sesión lo va a
   validar. En este checkpoint no se exige mitigación ni dueño: eso se pide en el checkpoint
   de la etapa 2, cuando las sesiones ya ocurrieron. Un plan de mitigación sobre algo que nadie
   confirmó es teatro.
3. Cada tema por negociar tiene quién decide de nuestro lado y del lado del cliente, y en
   qué momento del discovery se pone sobre la mesa.
4. El líder de operación del cliente tiene nombre y cargo, y es una persona distinta del
   point of contact.
5. Cada entorno y cada acceso tiene dueño del lado del cliente y fecha, no un supuesto.
6. Cada sesión de la agenda tiene dueño del lado del cliente, fecha y hora, o está marcada
   "por confirmar" con quién la destraba.
7. El plan respeta el calendario real (feriados del país del cliente revisados).
8. Cada sesión lista sus insumos previos, su entregable y el compromiso de cada lado.
9. El backlog inicial existe y refleja los módulos de la propuesta, con talla preliminar.
10. El problema reconstruido fue contrastado con el cliente en el kickoff (el "esto es lo
    que entendimos, ¿qué nos falta?"), y las hipótesis que se cayeron están marcadas.
11. El As-Is y el To-Be tentativos existen. Que todavía les falten los SLA entre etapas
    no los invalida: eso se completa en la etapa 2.
12. La tabla de cierre está llena, el checklist de la etapa está cerrado o con sus
    pendientes justificados, y el relevamiento escrito.
13. Todo lo anterior está en git.

Registro del checkpoint: `templates/checkpoint-record.md` →
`discovery/1-planning/checkpoint/`.

## Definición de terminado

Kickoff ejecutado con el cliente, temas por entender y supuestos registrados con la sesión
que los va a validar, temas por negociar con su dueño de cada lado, líder de operación del
cliente identificado, entornos y accesos con dueño y fecha,
agenda confirmada, plan publicado, backlog inicializado, tabla de cierre llena,
relevamiento escrito y checkpoint pasado con registro. Si el cliente pidió cambios en el
kickoff, están incorporados o registrados como pendientes con dueño.
