# Etapa 2 — Análisis

## Propósito

Convertir las sesiones de discovery en una solución dibujada y en requisitos validados:
cómo trabaja hoy el cliente, cómo debería quedar, con qué se conecta, quién usa qué, y qué
entra en el alcance. Es la etapa donde más información cruda entra (transcripts,
observación, documentos del cliente) y donde el arnés más protege: extraer sin inventar, y
no avanzar a requisitos detallados sin que el cliente haya decidido sobre el alcance.

## Goals

1. Procesar cada sesión ejecutada y dejar por escrito todos sus hallazgos.
2. Entender cómo trabaja hoy el cliente y cuánto se demora en cada paso, validado con él.
3. Dibujar cómo debería quedar: To-Be, diagrama de arquitectura de alto nivel y tabla de
   roles.
4. Entender cómo funciona el negocio sin sistemas de por medio, quién es la persona
   detrás de cada rol, y en qué estados vive cada entidad, y entregárselo a diseño
   resumido en un solo documento.
5. Confirmar o descartar cada supuesto de la etapa 1, y ponerle mitigación y dueño a los
   riesgos que queden vivos.
6. Comparar las opciones y dejar una recomendación para cada hallazgo que exija una
   decisión técnica.
7. Negociar el alcance con el cliente hasta tener una decisión por cada requisito
   presentado.
8. Escribir criterios de aceptación verificables para todo lo que quedó dentro del alcance.

## Entradas obligatorias

Están en `CONTRACT.md`, cada una con qué la satisface y qué la invalida. Se declaran por
artefacto y no por etapa anterior: un proyecto puede satisfacerlas con material propio,
con un discovery previo o con lo que traiga la propuesta, y de dónde vienen no importa
mientras existan y sigan vigentes. Ver `stages/modalities.md` y `skills/entry-check/`.

## Artefactos mínimos

Están en `CONTRACT.md`, cada uno con el skill que lo produce, quién lo corre y la ruta en
la que vive, incluidos los que solo aplican según la modalidad declarada en el
`overrides.md` del proyecto.

**El acta se produce siempre, y es el único artefacto de la etapa que puede faltar sin
frenar el cierre.** Sale de las notas que ya se escribieron y sirve para dos fines
concretos: que exista cuando el cliente la pide, y que alguien de adentro sepa qué pasó en
la sesión 3 sin leer un transcript de una hora. Enviarla al cliente queda como decisión
del PM proyecto por proyecto: hoy no es una práctica estandarizada en Codeable y el arnés
la deja abierta.

## Qué tiene que tener el To-Be

El To-Be sirve cuando dice **quién hace qué distinto**, y para eso cada etapa del proceso
lleva dos elementos.

Un **owner nombrado**, o sea qué rol queda a cargo de esa etapa cuando el sistema exista.
Puede ser un rol del cliente, puede ser el sistema, y puede ser compartido.

Y un **cierre de tres líneas** que declara el cambio de responsabilidad: qué deja de hacer
quien lo hacía hasta hoy, qué asume el negocio, y qué automatiza el sistema. Escrito así, el
To-Be deja de ser un diagrama y se vuelve una conversación que el cliente puede tener sin
hablar de software, porque lo que está mirando es su propia operación.

Si el owner de una etapa todavía no se sabe, **no se frena**. El agente lo señala, pregunta
si se define ahora o queda pendiente, y lo registra como pendiente con dueño. El To-Be es el
escenario que le proponemos al cliente y sus owners pueden cambiar durante las tres etapas.
Lo que sí no puede quedar en blanco es el problema del cliente y los riesgos: eso es el
núcleo y sin eso no hay análisis.

## El checkpoint intermedio: la negociación del RF light

El RF light existe para que el cliente pueda leerlo sin fatiga y decidir sobre el alcance.
Es un checkpoint del **Líder con el cliente**, no de sesión fresca.

**Qué tan detallado es.** Cada requisito es un título y un párrafo corto que dice qué hace
el sistema. No es una lista de títulos sueltos, porque "integrarse con el proveedor de
antecedentes" es demasiado vago para decidir sobre él. Tampoco entra en el cómo ni en el
por qué, que es lo que agrega el RF detallado.

**Sin números.** El documento no lleva estimaciones. El cliente suma todo lo que ve y le
sale un total que no existe, porque hay tareas que corren en paralelo, y desde ahí la
conversación se va del alcance al número. Para reconocer lo que falta y lo que sobra alcanza
con el párrafo. El cronograma sale después, del RF detallado.

El cliente recibe el catálogo y responde requisito por requisito: esto sí, esto no, esto
más adelante. Esa conversación se registra en
`scope-decisions.md` con tres estados: dentro, fuera, diferido.

El RF detallado se escribe **solo** sobre lo que quedó dentro. Detallar algo que el cliente
ya descartó es trabajo que se tira.

Los diferidos son la lista más valiosa del documento: son la base de la siguiente
propuesta comercial, y conviene escribirlos mientras la conversación está fresca y no
reconstruirlos seis meses después.

Si el cliente no responde, el PM lo registra y decide si avanza bajo riesgo declarado; esa
decisión queda con su nombre y su fecha en `scope-decisions.md`. Que no responda es un caso
normal: el PM fija un plazo y, si vence, se avanza al RF detallado sobre lo presentado.
Sacar tres historias o agregar cuatro dos semanas después cuesta menos que esperar.

**Quién lee cada documento.** El RF light lo lee quien decide del lado del cliente, y por
eso es corto. El RF detallado ya no: lo lee el responsable asignado, el que va a revisar
los flujos de prueba y a pedir los caminos de error. Son dos personas distintas y dos
documentos distintos, y confundirlos es lo que hace que un catálogo detallado llegue a
alguien que no lo va a leer.

## Roles en esta etapa

- **Líder (PM):** conduce las sesiones, negocia el alcance sobre el RF light, resuelve con
  el cliente los pendientes que las sesiones no cerraron (bolsa de llamadas cortas).
- **Implementador:** procesa transcripts, mantiene inventarios, redacta RF/RNF.
- **Validador/Auditor (sesión fresca):** checkpoint de salida; además QA revisa los RF
  detallados y agrega casos de prueba.

## Checkpoint de salida

Sesión fresca con `skills/checkpoint-review/` confirma lo siguiente, más el checklist
detallado de requisitos en
`skills/checkpoint-review/references/requirements-checklist.md`:

1. Toda sesión ejecutada tiene transcript y notas procesadas; ningún hallazgo quedó solo
   en la memoria de alguien.
2. Cada RF sale de un insumo rastreable (sesión, documento o decisión registrada); las
   inferencias están marcadas como inferencias.
3. `scope-decisions.md` tiene una decisión por requisito presentado. Los que no tienen
   respuesta del cliente están marcados como tales, no asumidos dentro.
4. Todo hallazgo marcado como decisión técnica tiene sus opciones comparadas y una
   recomendación, no solo la mención del problema.
5. Cada RF detallado tiene al menos un criterio de aceptación verificable, incluyendo
   caminos de error, y los supuestos sin confirmar están en "pendiente de validación" con
   dueño.
6. El backlog refleja los módulos y features reales que salieron del análisis, no los de
   la propuesta original si cambiaron.
7. El As-Is tiene los SLA entre etapas, no solo las etapas. Un As-Is sin tiempos no permite
   prometer nada en el To-Be.
8. El To-Be, el diagrama de arquitectura de alto nivel y la tabla de roles existen. No se
   le presentó alcance al cliente sin haber dibujado la solución. La tabla de roles dice
   quién es la persona detrás de cada cargo, no solo el nombre del cargo.
9. El mapa de estados existe para las entidades principales, y cada transición dice qué la
   dispara y qué tiene que pasar cuando ocurre. El documento de entendimiento para diseño
   está escrito, y sus secciones incompletas están marcadas con dueño, no maquilladas.
10. Cada supuesto de la etapa 1 quedó confirmado o descartado por una sesión concreta.
    **Ningún riesgo confirmado de probabilidad alta quedó sin mitigación y sin dueño**: en el cierre
    de la etapa 2 sí se exige, porque las sesiones ya ocurrieron.
11. La tabla de cierre está llena, el checklist de la etapa está cerrado o con sus
    pendientes justificados, y el relevamiento escrito.

## Definición de terminado

As-Is y To-Be validados con el cliente, proceso real y mapa de estados escritos, diagrama
de arquitectura de alto nivel y tabla de roles con perfil de usuario escritos, documento de
entendimiento para diseño entregado, RF detallado completo y auditado sobre el alcance
negociado, casos de prueba QA agregados, cronograma tentativo publicado, pendientes con
dueño, backlog actualizado, tabla de cierre llena, relevamiento escrito, checkpoint pasado con registro.
