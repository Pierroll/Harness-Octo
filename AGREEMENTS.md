# Acuerdos del 4 y 5 de agosto

Documento temporal. Recoge lo que se acordó en tres conversaciones: la reunión con el
delivery manager y el CEO, la reunión con Paulo, y la revisión punto por punto que
hicimos después. Cada acuerdo vive en este documento hasta que esté incorporado en su
`STAGE.md` o en su skill. Cuando el último esté aplicado, este archivo se borra.

Sirve para que la conversación no se pierda mientras los cambios se aplican uno por uno.

---

## Sobre los riesgos

### A1. Un solo registro de riesgos, abierto en la etapa 1 y refinado en la etapa 3

Hoy el registro de riesgos es artefacto de la etapa 3 y sale de `technical-design`,
organizado por módulo. Aparece cuando ya no se puede hacer nada con él.

La razón de moverlo a la semana 1 es que el equipo de discovery no es solo gente de
negocio. Es gente de tech con conocimiento de negocio y producto, capaz de detectar desde
la primera semana tanto un gap de términos y condiciones como uno técnico.

La razón de que sea un registro y no dos es que un riesgo de negocio de la semana 1 y su
forma técnica de la semana 4 son el mismo riesgo en dos niveles de detalle. En la semana 1
se ve así: no está definido si los estudiantes son menores de edad. En diseño técnico se
ve así: el proveedor de streaming tiene infraestructura en Europa y sus términos no
permiten menores. Es lo mismo después de que alguien leyó los términos. Con dos registros
esa continuidad se pierde, y cuando el riesgo se cierra hay que cerrarlo en dos lados y
uno queda abierto para siempre.

Cada riesgo lleva columna de origen (negocio, técnico, comercial) y columna de estado.

---

## Sobre el arranque del proyecto

### A2. Al kickoff vas con propuesta y gaps, y sales con el calendario

Lo que no puedes es llegar con el calendario de sesiones cerrado, porque el kickoff es
para escuchar. Lo que sí llevas es la lista de temas que ya mapeaste de las conversaciones
comerciales. Vas con cinco gaps y sales con diez, y está bien.

La distinción que lo resuelve: temas no es lo mismo que sesiones. Los gaps son temas. El
calendario son sesiones.

Ejemplo del banco. Vas al kickoff diciendo: módulo de préstamos, temas por entender,
filtrado y clasificación de perfiles para que la data llegue limpia, generación de
reportes a partir del ticket de solicitud, integración con el proveedor que devuelve
antecedentes. El cliente reacciona, te agrega dos, te quita uno. Con eso sales y recién
ahí armas las sesiones con dueño y fecha.

### A3. Un solo cronograma de sesiones, armado después del kickoff

Se descartó la idea de tener un cronograma tentativo y otro definitivo. No hace falta: lo
que existe antes del kickoff es la lista de gaps, no un cronograma.

### A4. `gaps-and-risks.md` es un documento vivo

Nace antes del kickoff con lo que sale de las conversaciones comerciales y crece en el
kickoff con lo que el cliente agrega. Lo produce un skill nuevo, `gap-analysis`, a partir
de la propuesta, los transcripts comerciales y los correos.

Tiene dos tablas.

Temas por entender:

| Tema | Qué sabemos | Qué falta | Sesión asignada |
|---|---|---|---|

Riesgos:

| Riesgo | Probabilidad | Qué pasa si ocurre | Mitigación | Dueño |
|---|---|---|---|---|

Y dos reglas que lo hacen exigible en el checkpoint de la etapa 1. Son lo que hace que el
proceso se transmita en vez de depender de que alguien se acuerde.

La primera: ningún tema queda sin sesión asignada. Si no tiene sesión, se declara por
escrito fuera del alcance del discovery.

La segunda: ningún riesgo alto queda sin mitigación.

Un tema lo bastante importante, como compliance, va a las dos partes. Punto de agenda del
kickoff y sesión propia del cronograma. No se elige uno.

### A5. El cronograma del discovery ocupa dos inputs, la propuesta y la lista de gaps

Hoy `discovery-plan` toma solo la lista de sesiones del kickoff.

### A6. `kickoff-discovery` no puede generar las agendas de sesión antes de la primera reunión

Hoy produce un solo `.docx` con la agenda del kickoff más las agendas de todos los
discoveries, generado desde la propuesta. Se parte en dos momentos. Antes del kickoff, la
agenda del kickoff más la lista de temas. Después del kickoff, las agendas de sesión con
dueño y fecha.

---

## Sobre el vocabulario

### A7. Relevamiento es el documento de traspaso interno

Es lo que escribe quien hizo el discovery para que el PM que toma el proyecto en la etapa
4 sepa qué pasó. Es la palabra que se usa en OCTO y se respeta.

Lleva lo que ningún artefacto guarda hoy: quién decide de verdad del lado del cliente y
quién solo firma, qué se prometió de palabra fuera del contrato, dónde el cliente es
sensible, qué se sacó del alcance y por qué, y qué pendientes hereda quien entra.

### A8. El relevamiento se escribe siempre, cambie o no la persona

Por si pasa algo, y porque un documento que solo se escribe de vez en cuando se escribe
mal.

### A9. El relevamiento vive junto al resto de los entregables

Se escribe desde `templates/handoff.md` y se guarda en `discovery/<etapa>/outputs/`, como
cualquier otro artefacto de la etapa. No hace falta un skill nuevo.

### A10. Desarrollo con alcance definido es la modalidad donde el cliente trae el análisis

*Reemplaza al acuerdo original, que lo llamaba discovery de desarrollo y lo dejaba dentro
de las tres etapas.* El entregable es el software, no el análisis: el cliente llega con
TDR cerrado, stack definido y scope aterrizado. La primera semana no levanta requisitos,
los valida, los traduce y los formaliza, y configura entornos.

Produce As-Is, inventario de integraciones y riesgos. No produce catálogo completo de
requisitos porque el alcance ya viene dado.

### A11. Tres modalidades de entrada

*Reemplaza al acuerdo original, que declaraba cuatro.* Discovery, discovery + PoC, y
desarrollo con alcance definido. La cuarta, que era la reentrada de un cliente, se elimina
porque no es del mismo tipo que las otras: un cliente que vuelve entra por una de las tres
según cuánta claridad traiga. Lo que decide el punto de entrada es el estado de los
artefactos, no la relación comercial.

El relevamiento no es una modalidad. Es un artefacto que aparece en las tres.

---

## Sobre los entregables

### A12. PoC y mockups son un solo entregable con dos formas

Es una demostración de viabilidad para el cliente. Cuando hay que probar que técnicamente
se puede, la forma es una prueba de concepto. Cuando hay que probar cómo se vería, son
mockups. Las dos son opcionales y las dos las paga el cliente completas.

Que se paguen completas tiene tres consecuencias. Va estimada y presupuestada como
cualquier otro entregable, no como trabajo interno regalado. Tiene alcance cerrado por
escrito, porque una demostración sin límite se convierte en construir el producto de a
poquitos sin haberlo cotizado. Y tiene una decisión atada a qué se hace si el resultado es
que no se puede.

Casos reales: Santa Catalina con la conexión al servicio bancario, e Interbank donde la
prueba de concepto fue lo que permitió concursar sobre el TDR.

### A13. La etapa 3 se reordena y suma dos pasos

*El orden de este acuerdo quedó corregido por A22.* Lo que se mantiene: la revisión con el
equipo es juntar a quienes van a construir y pedirles opinión antes de estimar. El arnés
tenía revisión de agente en sesión fresca y aprobación del cliente, pero nadie que fuera a
construir miraba el discovery antes de que se cerrara el número.

UI/UX entra solo como lugar en el flujo, con sus artefactos mínimos y sin skill. No
sabemos con qué trabajan ni quién lo hace, y escribirlo sería inventar el proceso de otra
gente.

*Corregido el 2 de septiembre por A27: el paso sí tiene skill, con las partes del proceso
de diseño que no están confirmadas marcadas como tales.*

La estimación va después de arquitectura y de pantallas, porque las pantallas son de lo
que más mueve un número.

El informe final no se borra. Deja de ser un paso suelto en medio del diseño y pasa a ser
el documento que cierra la etapa.

### A14. Cada etapa declara goals y llena una tabla de cierre

Hoy hay propósito, artefactos mínimos y definición de terminado. Falta el marcador que
pidieron en la reunión: esperabas diez cosas, saliste con ocho, las dos que faltan es por
esto y lo destraba este.

### A15. La aprobación del RF light no es sí o no, es una negociación

El cliente recibe cien requisitos y se queda con ochenta. Falta estado por requisito
(dentro, fuera, diferido) y registro de lo que se recortó con su razón. Ese registro de
recortes es la lista de lo que se le vende después.

### A16. Los hallazgos que exigen decisión salen con opciones y recomendación

Decir que hay que integrar A con B es transcripción. Decir que hay tres formas y que la A
es la mejor por costo y latencia es consultoría.

El matiz que hay que defender: las notas de sesión no llevan opciones, porque su trabajo
es extraer sin inventar. Si se mezcla extracción con recomendación, en dos semanas nadie
sabe qué dijo el cliente y qué propusimos nosotros. La sesión marca qué hallazgos exigen
decisión, y el análisis de opciones es un entregable aparte.

---

## Términos que cambiaron de significado en estas conversaciones

| Término | Qué se acordó |
|---|---|
| Relevamiento | El traspaso interno a un PM, no el discovery corto |
| Desarrollo con alcance definido | El proyecto donde el cliente trae el análisis y el entregable es el software |
| Supuesto | Hipótesis de la etapa 1, con la sesión que la valida. Sin mitigación todavía |
| Riesgo | Supuesto ya confirmado, con mitigación y dueño, desde la etapa 2 |
| Paquete de implementación | Lo que antes se llamaba spec, en español |
| PoC y mockups | Dos formas del mismo entregable de viabilidad |
| Gap | Un tema completo por explorar, distinto de un pendiente, que es un dato puntual |
| Discovery | Sirve para el proceso completo y para una sesión individual |

---

## Los acuerdos del 7 de agosto, en las dos llamadas con Paulo

Los que llevan *reemplaza* corrigen un acuerdo anterior de este mismo documento.

### A17. En planificación todo es hipótesis

*Reemplaza la parte de A1 que pedía mitigación y dueño en la etapa 1.* En la etapa 1
todavía no se habló con nadie, así que lo que hay son supuestos, no riesgos validados. Lo
que se exige en la etapa 1 es la sesión que va a validar cada uno. La mitigación y el
dueño se piden en el checkpoint de la etapa 2, cuando las sesiones ya ocurrieron.

El registro sigue siendo uno solo, como decía A1. Lo que cambia es cuándo se le exige qué,
y para eso la columna de estado deja de ser decorativa.

Por la misma razón el primer paso deja de llamarse "entender el problema" y pasa a ser
"reconstruir el problema y escribir las hipótesis". Antes de hablar con el cliente no se
entiende nada, y nombrarlo así vuelve el paso auditable.

### A18. Planificación produce el líder de operación del cliente y los entornos

Le faltaba a la etapa todo lo que no es específico del discovery, y por eso solo servía
para proyectos que entran por discovery. Ahora produce el líder de operación del cliente,
los entornos y accesos con dueño y fecha, y el equipo asignado.

Sin equipo asignado el cronograma es ficción. Los accesos son el bloqueador más frecuente.

*Corregido: el margen salió de la etapa. La propuesta comercial ya lo lleva y la maneja la
dirección comercial; al equipo le llega sin el monto, así que quien corre el arnés nunca ve
precio ni margen.*

### A19. El As-Is y el To-Be nacen en la etapa 1

La propuesta comercial ya trae el flujo actual y el flujo propuesto, porque el cliente
cuenta su dolor desde el primer contacto con ventas. Eso es un As-Is y un To-Be tentativos
y se escriben como tales en la etapa 1.

Un As-Is completo son las etapas más los SLA entre etapas. El To-Be lleva la hipótesis de
cuánto baja cada tiempo, y escrito así deja de ser un diagrama y pasa a ser un compromiso
medible.

### A20. La etapa 2 dibuja la solución antes de presentar alcance

Presentarle alcance al cliente ya es entregarle un To-Be, aunque no se lo llame así.
Entonces se nombra: To-Be, diagrama de arquitectura de alto nivel, y tabla de roles y
niveles de acceso. Los requisitos salen de ahí en vez de salir de la nada.

La tabla de roles es el qué, no el cómo, y el cliente la valida. Suele destapar la
conversación difícil: once cargos distintos pueden ser cuatro roles, y el cargo en el
organigrama no es el rol en el sistema.

Cada sesión deja además un acta corta, distinta de las notas internas.

*Precisado el 14 de agosto: el acta se produce siempre, pero enviarla al cliente es decisión
del PM. Hoy no es una práctica estandarizada y el arnés no la convierte en obligación. Se
mantiene porque sirve para dos fines: que exista cuando el cliente la pide, y saber qué
pasó en una sesión sin leer el transcript.*

### A21. El RF light no lleva números

*Reemplaza la idea de meterle una estimación gruesa.* El cliente suma todas las
estimaciones que ve y le sale un total que no existe, porque hay tareas que corren en
paralelo, y desde ahí la conversación se va del alcance al número.

El RF light se lee para reconocer lo que falta y lo que sobra, y para eso alcanza el
título. Lo que sale después del RF detallado es el cronograma tentativo, que es lo que el
cliente de verdad necesita saber.

Que el cliente no responda es un caso normal: se fija un plazo y se avanza. Sacar tres
historias o agregar cuatro dos semanas después cuesta menos que esperar.

### A22. En la etapa 3, el UI/UX va antes que la arquitectura

*Reemplaza el orden de A13.* Por una razón comercial y una técnica. La comercial: al
cliente se le muestra valor desde el primer día, y nadie ve valor en un modelo de datos.
La técnica: en OCTO se trabaja como startup, el esquema crece por migraciones a medida
que el producto se define, y no hay modelo cerrado el día uno.

Los dos caminos no se bloquean y pueden ir en paralelo. La revisión con el equipo se mueve
después de los dos, porque recién ahí hay algo concreto que mirar, pero sigue yendo antes
de la estimación sin excepción.

### A23. Los hitos de pago están resueltos para discovery, pendientes para desarrollo

*Corregido: antes decía que salían del arnés por completo.* Discovery y discovery + PoC
tienen regla fija: mitad al inicio y mitad a la entrega. No hay nada que negociar, porque
un discovery es un precio único y dura alrededor de un mes.

En desarrollo con alcance definido se abren varios caminos: por porcentaje de avance
mensual, por monto fijo mensual, o por etapa contra el cronograma. Cada uno cruza contra un
artefacto distinto y cambia el riesgo de cobranza. Esa definición se conversa con el área
comercial.

Los hitos nacen en la propuesta comercial firmada, antes de la etapa 1, así que entran al
arnés como insumo y no salen de él.

### A24. La etapa 3 suma el RF full extendido

*Corregido: el plan de pruebas salió de la etapa. El equipo de QA es nuevo y su
procedimiento no está relevado, así que declararlo como paso comprometía algo que nadie
puede ejecutar todavía. Vuelve cuando exista el relevamiento con QA.*

El RF full extendido es el catálogo con el modelo de datos y los diseños aprobados
incrustados en cada historia. Es opcional y lo pide el cliente por contrato. Sirve para que
un proveedor externo construya una parte sin bajar el estándar de calidad.

### A25. El relevamiento se escribe en cada transición de etapa

*Extiende A8 y A9.* Las tres etapas las puede hacer la misma persona o tres personas
distintas, y eso se sabe después, no antes. El relevamiento se escribe al cerrar cada
etapa, no solo al entregar a implementación. Es mejor tenerlo y no usarlo que necesitarlo y
no tenerlo.

### A26. Dónde termina el discovery lo define el contrato

Un discovery puede cerrar en el catálogo de requisitos detallados, y el cliente se lleva el
análisis para construir con quien quiera. O puede extenderse hasta la entrega de diseño,
cuando el cliente lo pidió así. No es siempre el mismo punto y el proyecto lo declara.

---

## Los acuerdos del 2 de septiembre, sobre el skill de diseño UI/UX

Salen de la sesión en la que se decidió escribir el skill. Los que llevan *reemplaza* corrigen
un acuerdo anterior de este documento. Viven aquí hasta que estén incorporados en
`stages/3-design/`, en `skills/ui-design/` y en `AGENTS.md`.

### A27. El paso de UI/UX tiene skill: `skills/ui-design/`

*Reemplaza la parte de A13 que lo dejaba sin skill y la decisión de no escribir
`skills/ux-design/`.* Lo que cambió es que Darío Calero describió el proceso el 1 de
septiembre: definir qué flujos necesitan diseño y qué vistas generar, armar un design system,
armar un HTML que refleje los flujos clave, presentarlo al cliente, y con sus cambios diseñar
cada flujo. El skill se escribe sobre ese orden.

Sigue por confirmar con Milko Rivera y Diego López, y el skill lo dice donde corresponde: si
el HTML de flujos es lo que ellos hacen o una idea, si el design system es por proyecto o hay
uno reutilizable, dónde entra Figma y dónde Pencil, y los criterios del filtro estructural de
A29. Nada de eso se escribe como si fuera su proceso.

*Confirmado el 3 de septiembre por Milko Rivera y Diego López: el HTML es lo primero que
presentan al cliente y con lo que validan lo nuevo; validado, lo pasan a Figma y los cambios
siguientes se hacen ahí. Y sobre el design system: uno por cliente, sin partir de cero,
copiando bloques de variables, estilos y componentes de Figma de un proyecto a otro y
cambiando los átomos; si el cliente tiene el suyo, se usa el suyo. Queda por confirmar solo
los criterios del filtro, cuyo documento ya entregaron.*

### A28. El orden del paso, de punta a punta

Primero el inventario de flujos y pantallas, sacado del RF detallado, el brief de diseño y la
tabla de roles, con cada pantalla citando los requisitos y criterios que cubre. Después el
design system, elegido con el tablero de alternativas sobre una pantalla representativa.
Después, por cada pantalla, tres direcciones en texto y tres imágenes. Después el HTML, solo de
la alternativa elegida, armado por flujo. Después la presentación al cliente y el registro de
su feedback. Figma es el paso siguiente del equipo de diseño, sobre el HTML aprobado, y queda
fuera de este skill; su skill va en otra sesión.

### A29. El filtro estructural va antes de dibujar, y en texto

Un requisito de veinte campos no se dibuja como veinte campos. Antes de generar nada, las tres
direcciones de cada pantalla ya vienen filtradas: partir en dos con su razón, agrupar por tipo
de dato en pasos, o agrupar de a cinco, según quién usa la pantalla y en qué dispositivo. Cada
dirección dice por qué. El PM confirma o cambia antes de gastar en imágenes. Los criterios del
filtro son propuesta nuestra hasta que diseño los confirme.

### A30. Tres alternativas en todas las pantallas, y solo la aprobada pasa a HTML

Tres en todas por consistencia: aun en una pantalla simple hay matices entre un diseño y
otro. Las descartadas no se borran. Quedan en el repo, y el inventario dice cuál se eligió y
por qué.

### A31. Se porta el mecanismo de `/design-shotgun` de gstack; gstack no se instala

Lo que se copia de `garrytan/gstack` (licencia MIT): las direcciones en texto antes de generar,
la regla de que dos alternativas no se parezcan, las imágenes en paralelo, el tablero en el
navegador con elección, estrellas, comentarios y regenerar, el agente que lee el archivo de
feedback que escribe el tablero, y la alternativa aprobada convertida en HTML y refinada con
pedidos de cambio. Por dentro se reemplaza su binario por dos scripts Node propios, uno que
llama a la API de imágenes de OpenAI y otro que levanta el tablero, porque el arnés ya exige
Node para los `.docx` y no se quiere sumar Bun ni una instalación aparte. Claude hace lo que
en gstack hace GPT-4o con visión: revisar cada imagen contra el brief, sacar los tokens del
design system de la imagen aprobada, y escribir el HTML. La memoria de gusto entre proyectos y
la galería quedan fuera por ahora.

### A32. Las imágenes se generan con OpenAI

Claude no genera imágenes. La clave es de OCTO, va en la variable de entorno
`OPENAI_API_KEY` de la máquina de cada PM y nunca en el repo; la cuenta necesita verificación
de organización y un límite de gasto. Las imágenes se guardan en el repo en JPEG comprimido
y calidad media, unos cientos de KB cada una y pocos megas por proyecto. Tres límites conocidos, y son la razón de que la
aprobada pase a HTML: el texto dentro de la imagen no es real, cada imagen se genera sola y no
sale consistente con las demás, y una imagen no se corrige con precisión.

### A33. Elige el PM con el equipo de diseño, antes del cliente

El cliente ve los flujos en HTML ya armados con la alternativa elegida. Su feedback se anota
por pantalla, con fecha y decisión. Lo que contradice un requisito aprobado se marca y corre
`reopen-artifact`.

### A34. Qué modelo corre cada paso

*Extiende la regla 9 de `AGENTS.md`.* Los pasos de entendimiento y decisión corren con Fable
y, si no está disponible, con Opus, nunca con menos: el inventario de flujos y pantallas, el
brief visual, las direcciones visuales y las direcciones por pantalla, la verificación de que
cada requisito dentro del alcance tiene pantalla, y decidir qué contradice qué cuando llega
el feedback del cliente. El HTML, el CSS, la revisión de imágenes y las ediciones corren con
Opus en subagentes. Cada artefacto anota en su primera línea con qué modelo se produjo, para
que el checkpoint lo vea.

### A35. El RF detallado tiene registro en markdown

`requirements-full` escribe `2-analysis/outputs/requirements-full.md` y genera el `.docx`
desde él, como manda la regla 1. Aplicado el 2 de septiembre en los contratos, las
dependencias, el checklist y los skills que lo nombraban.

*Extendido el 3 de septiembre al RF light: `requirements-lite` escribe
`requirements-lite.md` y genera el `.docx` desde él. Regla general desde ahora: todo
documento que se entrega tiene su markdown de registro y su copia en `ready-to-take/`.*

### A36. El design system se enchufa, no se inventa

Decidido el 3 de septiembre de 2026. Tres caminos en el paso 2 de `ui-design`: el design
system del cliente si lo tiene, una librería pública declarada en `overrides.md` (Ant
Design, Bootstrap, shadcn/ui, Material) con los átomos cambiados, o uno propio elegido en el
tablero. Los tres dejan el mismo `design-system.md` y `mockups/design-system.css`, y el HTML
no sabe de dónde salió. Reemplaza la idea de una base CSS del arnés
(`assets/design-system-base.css`): el equivalente a los bloques que diseño copia entre
proyectos de Figma es la librería declarada, no un archivo nuestro. Lo general que sí se
porta de gstack es el catálogo para escribir direcciones (estéticas, decoración, color,
tipografía por rol), en `references/ux-doctrine.md`.

### A37. "Antes del RF" se responde en el brief, no en un skill nuevo

El equipo de diseño entregó el 3 de septiembre de 2026 "Antes del RF"
(`sources/antes-del-rf-equipo-diseno.md`): trece puntos que necesitan respondidos antes de
diseñar sobre un requisito. Nueve ya estaban en `templates/design-brief.md`; los cuatro que
faltaban (por qué ahora, indicadores del negocio, volumen y ritmo, quién decide) se agregaron
dentro de las secciones existentes, sin cambiar la numeración. Las preguntas se hacen una
vez, en `gap-analysis` y el kickoff, y el brief las consolida desde los insumos; lo que no
está se declara pendiente. El filtro estructural de `ui-design` suma dos criterios con eso
(frecuencia y volumen; tarea, no módulo). Las leyes de UX generales se escribieron en
`heuristicas-y-leyes.md` sin esperar la lista de diseño; cuando llegue, se cruza.

### A38. La revisión con el equipo no bloquea la estimación

Decidido el 3 de septiembre de 2026. El arnés no controla cuándo se junta el equipo que
construye ni quién va, igual que no controla el kickoff ni las sesiones: controla lo que
entra y el registro que sale. Se mantiene dentro de la estimación refinada, y si no ocurre,
la estimación se corre igual y declara "estimación sin revisión del equipo que construye"
como riesgo alto. Las tallas se ajustan cuando la revisión ocurra.

---

## Lo que se decidió no hacer

El loop automático se difiere por decisión explícita, no por olvido. Primero se afina el
proceso con aprobación humana entre etapas; automatizar algo que todavía cambia cada
semana congela los errores.

El informe final no se borra, aunque en la reunión no hubo consenso. Se reposiciona al
cierre de la etapa 3 y se decide sobre esa versión.

El backlog no sale del flujo. Que se viera como un paso suelto fue un error del gráfico,
no del proceso: el backlog es un artefacto, no un paso.

No se escribe `skills/ux-design/` hasta saber con qué herramientas trabajan y quién lo
hace.

*Corregido el 2 de septiembre: se escribe `skills/ui-design/` con el proceso que describió
Darío Calero, y lo que falta confirmar con el equipo de diseño queda marcado (A27).*

El paquete de implementación sale del arnés. La idea venía de leer el repo qm de Y
Combinator (`sources/harness-5-reglas-de-qm-ycombinator.md`), no de la operación: la única
vez que el nombre apareció en una reunión, lo que la gente estaba describiendo era la
revisión con el equipo, que es otro paso. Además contradice cómo trabajamos, porque el
equipo que construye no recibe el discovery. Queda anotada en este documento por si vuelve
a aparecer desde la operación real, que es de donde tiene que venir.

No se parte la etapa de diseño en diseño de solución y diseño de iteración. La idea salió
de una lectura mía del ciclo secuencial contra el trabajo por sprints, no de nadie del
equipo, y al presentarla no se reconoció. Queda anotada en este documento por si vuelve a
aparecer desde la operación real, que es de donde tiene que venir.
