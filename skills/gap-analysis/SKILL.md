---
name: gap-analysis
description: >
  Convierte la propuesta y las conversaciones comerciales en el problema reconstruido, el
  As-Is y To-Be tentativos, la lista de temas por entender, el registro de supuestos y
  riesgos y los temas por negociar, antes del kickoff. Usar cuando el usuario diga
  "qué nos falta entender", "saca los gaps", "riesgos del proyecto", "prepárame el
  kickoff", "qué le pregunto al cliente", o al arrancar la etapa 1 con la propuesta
  firmada en la mano. Es el paso previo al kickoff: sin esta lista, la primera reunión
  se llena de preguntas básicas y el cronograma se arma a ciegas.
---

# Gap analysis — lo que sabemos que no sabemos, antes de la primera reunión

Produce el problema reconstruido (`discovery/1-planning/outputs/understanding-doc.md`),
los borradores `as-is-draft.md`, `to-be-draft.md` y `gaps-and-risks-draft.md` en esa
misma carpeta, a partir de `templates/understanding-doc.md`,
`templates/as-is.md`, `templates/to-be.md` y `templates/gaps-and-risks.md`.

Entradas: propuesta o contrato (`discovery/1-planning/inputs/`), transcripts de las
conversaciones comerciales y correos relevantes.

Este skill corre **antes** del kickoff. Su salida alimenta dos piezas: los puntos de
agenda de la primera reunión y el cronograma de sesiones que se arma después de esa
reunión.

## Por qué existe

A la primera reunión con el cliente no se llega con el calendario cerrado, porque esa
reunión es para escuchar. Pero tampoco se llega con las manos vacías. Se llega con una
lista de temas que ya mapeaste, y ponerla sobre la mesa es lo que da autoridad en la sala.

Vas con cinco temas y sales con diez. Eso es exactamente lo que tiene que pasar.

## Los cinco productos

### 0. El problema reconstruido

Es el primero porque los demás salen de él. Antes de hablar con el cliente el problema no
se entiende, se **reconstruye**: se toman las piezas que la propuesta trae sueltas y se
devuelven en una sola estructura que el cliente pueda corregir en el kickoff.

Se escribe sobre `templates/understanding-doc.md` y va en
`discovery/1-planning/outputs/understanding-doc.md`. Lo que dice tiene que ser contrastable
frase por frase en la reunión, así que cada afirmación va marcada como lo que es: lo que la
propuesta afirma, o la hipótesis nuestra que hay que validar.

Dos reglas que el checkpoint de la etapa 1 verifica. La primera: lo revisa y lo firma
alguien que va a estar en el kickoff, porque el documento existe para contrastarlo ahí y
quien no está en la sala no puede defenderlo. La segunda: después del kickoff se actualiza
marcando las hipótesis que se cayeron, y esa marca es lo que deja ver qué entendimos mal
antes de empezar.

### 1. As-Is y To-Be tentativos

La propuesta comercial ya trae las dos, aunque no las llame así. Trae el flujo actual
("hoy hacen esto, se demoran acá") porque el cliente cuenta su dolor desde el primer
contacto con ventas, y trae el flujo propuesto porque eso es lo que se le vendió.

Sácalos y escríbelos como tales, en `discovery/1-planning/outputs/as-is-draft.md` y
`to-be-draft.md` (la etapa 2 los valida en sus propios outputs; el borrador queda aquí
como constancia):

- **As-Is tentativo:** las etapas del proceso actual. Si la propuesta menciona tiempos de
  demora entre etapas, van también; si no, cada etapa queda con el SLA en blanco y eso se
  llena en el kickoff. Un As-Is con SLA es completo, uno sin SLA es un dibujo.
- **To-Be tentativo:** cómo debería quedar, con la hipótesis de cuánto baja cada tiempo
  ("este paso que hoy toma cuatro horas debería tomar media"). Escrito así, el To-Be pasa
  de ser un diagrama a ser un compromiso medible.

Los dos son tentativos y van marcados como tales. Las sesiones de la etapa 2 los
profundizan y los validan. Lo que no se puede es llegar a la etapa 2 con nada y pretender
levantar el As-Is desde cero.

### 2. Temas por entender

Un tema es un frente completo a explorar. No es un dato puntual: eso es un pendiente y
vive en las notas de la sesión que lo destapó.

Ejemplo, de un proyecto de banca. El cliente pide trabajar en el módulo de préstamos. Los
temas no son "el módulo de préstamos", son:

- Filtrado y clasificación de perfiles, para que la data de quien solicita llegue limpia.
- Generación de reportes a partir del ticket de solicitud.
- Integración con el proveedor que devuelve antecedentes de una persona.

Cada tema lleva qué sabemos ya, qué falta responder, y a qué sesión queda asignado.

Antes de cerrar la lista, se recorren los trece puntos de "Antes del RF"
(`sources/antes-del-rf-equipo-diseno.md`), lo que el equipo de diseño necesita saber antes
de tocar un requisito: negocio y por qué ahora, problema raíz, usuarios reales y sus tareas,
proceso sin software, documentos reales, volumetría, quién decide. Los que la propuesta no
responde son temas por entender y se asignan a una sesión. Es más barato preguntarlos en el
kickoff que descubrir en la etapa 3 que faltan.

### 3. Supuestos y riesgos

Va en `discovery/1-planning/outputs/gaps-and-risks-draft.md`. Se llama borrador por lo
que le falta (mitigación, dueño), no porque después se rehaga: la etapa 2 parte de este
mismo archivo para producir su `gaps-and-risks.md` validado, sobre las mismas filas, y
la 3 le agrega el detalle técnico en el suyo.

Con una precisión que importa: en esta etapa todavía no hablaste con nadie. Lo que
escribes son **hipótesis**, no riesgos validados. Por eso en la etapa 1 no se exige plan
de mitigación ni dueño: un plan de mitigación sobre algo que nadie confirmó es teatro. Lo
que sí se exige es que cada supuesto diga **qué sesión lo va a validar**.

La mitigación y el dueño se piden en el checkpoint de la etapa 2, cuando las sesiones ya
ocurrieron y el supuesto se confirmó o se cayó.

Cada entrada lleva origen (negocio, técnico o comercial), estado (hipótesis, confirmado,
descartado), probabilidad, qué pasa si ocurre, y la sesión que lo valida.

### 4. Temas por negociar

Lo que va a haber que acordar con el cliente porque toca alcance, plazo, costo o
responsabilidad de su lado. La diferencia con un tema por entender es qué lo resuelve: un
tema por entender se resuelve con información y por eso lleva sesión asignada, un tema por
negociar se resuelve con una decisión y por eso lleva quién decide de cada lado.

Del mismo proyecto de banca: quién paga el acceso al proveedor que devuelve antecedentes, y
qué pasa si el área de riesgos no libera a su analista para las sesiones. Ninguna de las
dos se resuelve preguntando mejor.

Cada entrada lleva qué hay que acordar, quién decide de su lado, quién decide del nuestro y
en qué momento se pone sobre la mesa.

Salen de los mismos insumos, con una señal distinta: donde el tema por entender aparece
como algo que el cliente dio por obvio, el tema por negociar aparece como algo que la
propuesta promete sin decir quién lo provee o quién lo paga.

## Cómo se corre

1. Lee la propuesta completa. Lo que promete acota lo que hay que entender: un tema que no
   toca nada de lo prometido probablemente está fuera de alcance.
2. Lee los transcripts comerciales buscando dos señales distintas: lo que el cliente dio por
   obvio sin explicar (eso es un tema), y lo que dijo con dudas o condicionales (eso suele
   ser un riesgo).
3. Escribe primero el problema reconstruido. Los otros cuatro productos salen de él, y
   escribirlos antes lleva a listar temas que no se conectan con ningún problema.
4. Escribe los temas al nivel de frente, no de pregunta suelta. Si tienes veinte, agrupa:
   una lista de veinte temas no se puede repartir en sesiones.
5. Escribe los riesgos al nivel que se puede ver hoy. No hace falta saber el nombre del
   proveedor para registrar que el público objetivo no está definido.
6. Marca qué temas van como punto de agenda del kickoff. Un tema lo bastante importante,
   como compliance, va a las dos partes: se toca en el kickoff **y** tiene sesión propia.
   No se elige uno.

## Las tres reglas que el checkpoint de la etapa 1 verifica

- **Ningún tema queda sin sesión asignada.** Si un tema no entra en el discovery, se
  declara por escrito como fuera de alcance con su razón, y eso se le comunica al cliente.
  Un tema sin sesión y sin declaración reaparece en la etapa 4, cuando ya cuesta caro.
- **Ningún supuesto queda sin la sesión que lo valida.** Un supuesto que nadie va a
  contrastar se vuelve un hecho por omisión, que es la peor forma de equivocarse.
- **Ningún tema por negociar queda sin dueño de los dos lados.** Sin eso llega a la
  negociación de alcance sin preparación, que es la reunión más cara del discovery.

Estas tres reglas son lo que hace que el proceso se transmita en vez de depender de que
alguien se acuerde.

## Reglas

- **Extrae, no inventes.** Un tema sale de algo que el cliente dijo o de algo que la
  propuesta promete. Si es deducción tuya, márcalo `(inferido: ...)`.
- Un supuesto sin la sesión que lo valida no es un supuesto, es una creencia.
- El documento es vivo: se actualiza en el kickoff y en cada sesión, y se versiona en git.
  No se congela después de la primera versión.

## Modos de fallo

- **No hay transcripts comerciales, solo la propuesta:** se puede correr igual, pero
  márcalo. Los temas van a salir menos afinados y el kickoff va a rendir menos.
- **La propuesta es vaga** ("modernizar la plataforma"): eso no es un problema del skill,
  es el hallazgo principal. El primer tema es acotar qué significa, y el primer riesgo es
  que el alcance no tenga fondo.
- **Salen más de quince temas:** agrupa antes de entregar. Si de verdad son quince frentes
  distintos, el discovery de cuatro semanas no alcanza y eso hay que decirlo antes de
  comprometerlo.
