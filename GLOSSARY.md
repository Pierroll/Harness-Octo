# Glosario del arnés

El vocabulario que usamos, ordenado por etapa. Si una palabra tiene dos sentidos según
quién la diga, está marcado.

## Lo transversal

**Arnés (harness).** El repo `harness-product`. Contiene las reglas, las etapas y los
procedimientos. No contiene ningún proyecto. Cada proyecto lo instala como dependencia.

**Ciclo de vida de desarrollo (SDLC, software development life cycle).** Las seis etapas
con las que trabajamos de punta a punta: planificación, análisis, diseño, implementación,
integración y pruebas, y mantenibilidad. El arnés cubre hoy las tres primeras.

**Etapa (stage).** Uno de los tres bloques del ciclo que cubrimos: planificación, análisis
y diseño. Una etapa define qué entra, qué sale y cuándo está terminada. Vive en `stages/`.

**Skill.** Un procedimiento ejecutable, escrito para que un agente lo corra. Vive en
`skills/`. Si un PM va a hacer algo más de una vez, es un skill.

**Artefacto o entregable.** Un archivo que produce el proceso. Algunos los lee el cliente,
como el informe o los requisitos. Otros son internos, como las notas de sesión o el
registro de checkpoint.

**Checkpoint en sesión fresca.** La validación de un artefacto hecha por una sesión que no
lo produjo, con la instrucción de romperlo. Autorevisión no cuenta. Deja registro escrito,
incluidos los rechazos.

**Veredicto de entrada.** Lo que `skills/entry-check/` escribe al abrir una etapa. Tres
valores, y no se avanza a producir salidas hasta tener uno:

- *Entra.* Todas las entradas existen y están vigentes.
- *Entra con huecos.* Faltan algunas. Se produce solo eso (un recorte de la etapa
  anterior), no la etapa entera, y después se sigue.
- *No entra.* Falta demasiado. Corresponde correr la etapa anterior completa. El
  documento sirve para justificárselo al cliente.

**Veredicto de checkpoint.** Lo que `skills/checkpoint-review/` escribe al cerrar una
etapa o validar un artefacto. Tres valores, distintos de los de entrada:

- *PASA.* Todos los criterios se cumplen. La etapa cierra.
- *PASA CON RIESGO ACEPTADO.* Falta algo que no invalida lo producido, y el PM decide
  avanzar con nombre, fecha, qué falta y qué puede salir mal. No aplica a trazabilidad
  rota, a un requisito sin insumo, ni a números que no cuadran: eso es rechazado.
- *RECHAZADO.* La etapa no cierra. Se corrigen los hallazgos y se vuelve a correr el
  checkpoint en **otra** sesión fresca. El arnés no abre la etapa siguiente. Si alguien
  igual le pide al agente que continúe, eso es saltarse el proceso, no un avance
  válido: `session-log` tiene que dejar el rechazo en `progress/current.md`.

**Vigencia de un artefacto.** Tres marcas que usa `entry-check` por cada entrada:
*vigente*, *desactualizado* o *no aplica*. Existir no basta. Un artefacto
desactualizado es peor que uno que falta, porque nadie sospecha de él.

**Versión congelada.** La copia de un artefacto guardada en
`discovery/<etapa>/outputs/versions/<nombre>-v<N>.md` justo antes de cambiar el original.
Se guarda solo si el artefacto ya pasó checkpoint o ya se le mostró al cliente; antes de
eso, el borrador se edita en el lugar y lo versiona git. El archivo con nombre fijo
(`as-is.md`) es siempre la versión vigente, y su línea `**Versión:**` dice qué cambió y qué
evento cerró la anterior. La produce `skills/reopen-artifact/`.

**Reapertura.** Actualizar los documentos que quedaron viejos cuando llega información que
contradice un artefacto ya aprobado o entregado, en cualquier etapa: cuáles son los dice
`stages/dependencies.md`, sus versiones anteriores se congelan y los checkpoints que dejan
de valer se declaran. La etapa anterior sigue cerrada; lo que se reabre es el documento. La corre
`skills/reopen-artifact/` en dos fases, proponer y aplicar, y deja su registro en
`discovery/<etapa>/checkpoint/<fecha>-reopen-<tema>.md`.

**Inbox.** La carpeta `discovery/inbox/` donde el PM deja lo que llegó sin tener que saber a
qué etapa pertenece. Lo procesa `reopen-artifact` y lo mueve a `processed/`. Debería estar
vacía casi siempre.

**Fricción.** Algo que el arnés hizo mal en un proyecto: estorbó, faltó o se ignoró. Se
anota en el momento en el `friction-log.md` del proyecto, con propuesta, y llega como issue
a `harness-product` sin que el PM haga nada. Es distinto de un override, que es algo que el
proyecto necesita distinto de la base sin que la base esté mal. La escribe y la envía
`skills/friction-log/`.

**Versión del arnés.** El commit del submódulo `harness/` con el que se abrió una etapa o se
corrió un checkpoint. Queda anotado en `entry-check.md` y en cada checkpoint-record.
Actualizar el submódulo a mitad de una etapa es una decisión que se registra en
`session-log`, no un pull silencioso.

**Inherited.** La bandeja `discovery/<etapa>/inputs/inherited/`. Ahí se deja el paquete
de la etapa anterior **solo si esa etapa no se corrió en este repo**. Nombres fijos,
listados en el README de esa carpeta. `start-here.md` en `inputs/` dice qué va ahí y
qué va un nivel arriba (transcripts, material crudo). `entry-check` copia lo que sirve
al sitio de trabajo (los outputs que nombra el README de `inherited/`). `inherited/` no se edita después: es la
constancia de con qué se abrió. En un discovery que va etapa por etapa, esa carpeta
queda vacía.

**Modalidad.** Con qué forma entra el proyecto. Hay tres: discovery, discovery + PoC, y
desarrollo con alcance definido. Se nombran por qué compró el cliente, el análisis o el
software, y por de dónde viene el análisis.

**Quién lo corre.** Cada artefacto declara quién lo produce, con tres valores.
*Humano:* lo hace una persona y el arnés no lo produce. *Agente con revisión humana:* lo
produce un skill y el PM lo revisa antes de que salga; es el caso por defecto. *Agente en
sesión fresca:* lo corre el rol Validador sin intervención. Sin esta columna no se puede
medir la reducción de horas.

**Override.** Una diferencia que un proyecto declara respecto de la base. Vive en el
`overrides.md` del proyecto. Un override extiende la base, nunca la apaga.

**Pendiente.** Algo que no se sabe, registrado con dueño y fecha. Es lo contrario de
rellenar con un valor plausible.

**Inferencia.** Una deducción razonable que el cliente no dijo. Va marcada como tal. No es
lo mismo que un pendiente: la inferencia tiene un valor propuesto, el pendiente está
vacío.

**Backlog (`backlog.md`).** La lista de lo que se le va a construir al cliente. En la
etapa 1 son los módulos de la propuesta; en la etapa 2 se parten en features con sus
requisitos. Es el único artefacto que sigue vivo después del discovery, porque su columna
de estado avanza durante toda la implementación.

**Talla.** El tamaño de esfuerzo de una feature: XS 0.2 días, S 0.5, M 1.5, L 3, XL 7. Un
día son 8 horas.

**Relevamiento.** El documento de traspaso interno. Lo escribe quien cierra una etapa para
quien toma la siguiente. Se escribe en las tres transiciones y siempre, cambie o no la
persona: quién sigue se sabe después, no antes. Usa `templates/handoff.md`.

## Etapa 1: Planificación

**Propuesta.** El documento comercial firmado. Es la entrada de todo. El alcance que
declara está cerrado y no se reabre en el kickoff.

**Documento de entendimiento.** Lo que el PM entendió del problema del cliente, escrito
antes del kickoff. Sirve para decirle al cliente esto es lo que entendimos, qué nos falta.

**Gap o tema por entender.** Algo que sabemos que no sabemos. Sale de leer la propuesta y
las conversaciones comerciales. Es distinto de un pendiente: el gap es un tema completo a
explorar, el pendiente es un dato puntual que falta.

**Tema por negociar.** Algo que va a haber que acordar con el cliente porque toca alcance,
plazo, costo o responsabilidad de su lado: quién paga el acceso a un proveedor de datos,
hasta dónde llega el soporte de una herramienta suya, qué pasa si un área no libera a su
gente. Se distingue del tema por entender por lo que lo resuelve: el tema por entender se
resuelve con información y lleva sesión asignada, el tema por negociar se resuelve con una
decisión y lleva quién decide de cada lado.

**Supuesto.** Algo que estamos dando por cierto sin haberlo confirmado. En la etapa 1 todo
nace así, porque todavía no se habló con nadie. Lleva la sesión que lo va a validar, no un
plan de mitigación.

**Riesgo.** Un supuesto que ya se confirmó y puede salir mal, con su probabilidad y su
costo si ocurre. Recién ahí lleva mitigación y dueño, y eso se exige en el checkpoint de la
etapa 2. Un solo registro para todo el proyecto: se abre en la etapa 1 y se refina hasta
la 3.

**Kickoff.** La primera reunión con el cliente. Nos presentamos, decimos qué vamos a
resolver y cuál es el scope, y principalmente escuchamos. Se entra con la propuesta y una
propuesta de sesiones, que es la lista de temas presentada como los frentes que
proponemos. Se sale con el cronograma real, los responsables y el As-Is pulido.

**Discovery.** Cuidado, la usamos en dos sentidos. *El discovery* es el proceso completo,
las tres etapas, cuatro semanas o lo que dure. *Un discovery* es una sesión de
levantamiento individual, d1, d2, d3. El skill `kickoff-discovery` usa la palabra en este
segundo sentido.

**TDR (términos de referencia).** El documento con el que un cliente especifica qué quiere
construir y bajo qué condiciones. Cuando llega un TDR cerrado, el análisis ya viene hecho
del lado del cliente y nuestro trabajo es validarlo, traducirlo y formalizarlo, no
levantarlo de cero.

**Desarrollo con alcance definido.** La modalidad donde el entregable es el software y el
análisis viene del cliente: TDR cerrado, stack definido, scope aterrizado. La primera
semana no levanta requisitos, los valida, los traduce y los formaliza, y configura
entornos. Produce As-Is, inventario de integraciones y riesgos, pero no catálogo completo
de requisitos.

**Los tres cronogramas.** Se llaman distinto a propósito, porque cada uno cubre un período
distinto. El *cronograma de delivery* es el del discovery mismo y sale de la etapa 1. El
*cronograma tentativo* es el primero del proyecto y sale de la etapa 2, sobre el RF
detallado. El
*cronograma de implementación* es el que se entrega al cliente y sale de la etapa 3, ya
refinado con el equipo.

**Cronograma de delivery (Gantt del discovery).** La tabla de actividades por semana con fechas y
tipo. Distingue actividad conjunta con el cliente, interna nuestra, y no laborable por
feriados del país del cliente. Se arma después del kickoff.

**Demostración de viabilidad.** Un entregable opcional que le prueba algo al cliente y que
el cliente paga completo. Tiene dos formas: prueba de concepto cuando hay que demostrar
que técnicamente se puede, y mockups cuando hay que demostrar cómo se vería.

**Point of contact.** Quien del lado del cliente decide, valida y firma. Se conoce desde la
propuesta comercial, antes del kickoff. Nunca se abrevia PoC: en nuestro vocabulario PoC ya
es prueba de concepto.

**Líder de operación del cliente.** Quien del lado del cliente hace que las sesiones
ocurran y coordina la disponibilidad de las áreas involucradas. Suele ser un PM, analista o
jefe de área. No decide, y se sabe después del kickoff. Es una persona distinta del point of
contact, y las dos existen siempre.

## Etapa 2: Análisis

**Transcript.** La transcripción cruda de una sesión. Sin transcript no hay sesión
procesable.

**Notas de sesión.** El transcript procesado en tres listas: hallazgos, decisiones y
pendientes. Es el artefacto de más valor de la etapa 2.

**Hallazgo.** Algo que el cliente dijo, citado con su fuente. No es una conclusión
nuestra.

**Decisión.** Algo que quedó cerrado en la sesión, con quién lo decidió. Una hipótesis no
es una decisión.

**Acta de sesión.** La versión corta y legible de lo que pasó en un discovery: qué se
conversó, qué quedó decidido y qué se comprometió cada lado. Se produce siempre y no bloquea
nada. Enviarla al cliente es decisión del PM: hoy no es una práctica estandarizada. Sirve
para que exista cuando el cliente la pide y para saber qué pasó en una sesión sin leer el
transcript. Distinta de las notas, que son internas y crudas.

**Inventario.** Listas acumulativas que crecen sesión a sesión: campos y validaciones,
reglas de negocio, fuentes externas.

**As-Is.** El mapa de cómo el cliente trabaja hoy, antes de nuestro sistema. Nace tentativo
en la etapa 1, porque la propuesta ya trae el flujo actual, y se valida con el cliente en
las sesiones. Completo son dos partes: las etapas del proceso y los SLA, o sea cuánto se
demora entre etapa y etapa. Sin SLA no se puede prometer nada en el To-Be.

**To-Be.** Cómo debería quedar el proceso después de nuestro trabajo, con la hipótesis de
cuánto baja cada tiempo del As-Is. Escrito así deja de ser un diagrama y pasa a ser un
compromiso medible. Presentarle alcance al cliente ya es entregarle un To-Be, aunque no se
lo llame así.

**Diagrama de arquitectura de alto nivel.** El sistema y sus vecinos: con qué se conecta,
qué entra y qué sale. Sin proveedores ni stack. Va en la etapa 2, porque los requisitos
salen de ahí.

**Tabla de roles y niveles de acceso.** Cuántos roles va a tener el sistema y qué alcance
tiene cada uno. El cliente la valida. El cargo en el organigrama no es el rol en el
sistema: once cargos pueden ser cuatro roles. En la etapa 3 se convierte en la matriz de
roles y permisos, con módulos y acciones.

**RF (requisito funcional).** Qué debe hacer el sistema. Sujeto técnico más deberá más
acción más restricción. Nunca el usuario como sujeto.

**RNF (requisito no funcional).** Una restricción de calidad con métrica. Sin número no es
un requisito, es un deseo.

**RF light.** El catálogo donde cada requisito es un título y un párrafo corto, para que el
cliente lo lea sin fatiga y decida sobre el alcance. Ni títulos sueltos, que son demasiado
vagos para decidir, ni el detalle del full. Se entrega en `.docx`.

**RF full.** Los mismos requisitos con criterios de aceptación, incluyendo caminos de
error. Se escribe solo después de que el cliente aprobó el light, y solo sobre lo que
aprobó. El light lo lee quien decide; el full lo lee el responsable asignado del cliente.
Su registro es `requirements-full.md`; el `.docx` que se entrega se genera desde él.

**RF full extendido.** El catálogo detallado con el modelo de datos y los diseños aprobados
incrustados en cada historia. Opcional, según lo que compró el cliente. Es lo que permite
que un proveedor externo construya una parte sin bajar el estándar de calidad.

**Criterio de aceptación.** La condición verificable de que un requisito está cumplido.
Dado el estado inicial, cuando ocurre la acción, entonces este es el resultado esperado.

**Negociación de alcance.** Lo que ocurre entre el RF light y el RF full. El cliente
recibe cien requisitos y se queda con ochenta. Lo que se recorta queda registrado con su
razón.

## Etapa 3: Diseño

**Flujo.** La secuencia de pantallas que un rol recorre para lograr el beneficio de una
historia de usuario. Se arma con los requisitos, sus dependencias y su flujo de interacción.
Es la unidad que se le presenta al cliente. Identificador `F-<XXX>`.

**Pantalla.** Una vista del sistema con sus estados: vacío, error, éxito. Cada pantalla cita
los requisitos y criterios que cubre; una pantalla sin requisito no existe. Identificador
`P-<flujo>-<NN>`.

**Inventario de pantallas (`screen-inventory.md`).** Los flujos, sus pantallas, la dirección
elegida para cada una y el feedback del cliente. Lo produce `ui-design` y lo leen
`team-review`, `estimation` y el informe. Su trazabilidad cierra en los dos sentidos.

**Design system (`design-system.md`).** Tipografía, color, espaciado, componentes y la
bitácora de por qué. Se elige entre tres direcciones visuales sobre una pantalla
representativa, y su CSS es el que usan todos los mockups. Se arma por cliente sin partir
de cero, o se usa el del cliente si ya lo tiene.

**Dirección.** Una alternativa de diseño descrita en texto antes de dibujarla: nombre, una
línea y por qué. Tres por pantalla. Las de una pantalla difieren en estructura; las del
design system, en tipografía, paleta y disposición.

**Tablero de comparación.** La página que `ui-design` abre en el navegador con las
alternativas de cada pantalla de un flujo, para elegir, calificar, comentar y pedir otra
ronda. El tablero es quien elige; el agente espera y lee el archivo que el tablero escribe.

**Mockup HTML.** La pantalla aprobada convertida en una vista HTML sin lógica, con las
etiquetas reales del inventario de campos y el CSS del design system, armada por flujo. Es
lo que ve el cliente. Distinto del mockup de viabilidad de `feasibility-demo`.

**Revisión con el equipo.** Juntar a quienes van a construir y mostrarles las pantallas y
la arquitectura antes de estimar. Ellos saben qué ya existe en el código y qué es más caro
de lo que parece, que son los dos factores que mueven un número. Va después del diseño
porque necesita algo concreto que mirar, y antes de la estimación sin excepción.

**Arquitectura de alto nivel.** Los módulos del sistema y cómo se hablan. No es diseño de
código.

**Modelo de datos de alto nivel.** Las entidades y sus relaciones, en palabras. No es el
esquema de la base.

**Integración.** Una conexión con un sistema ajeno. Cada una lleva una decisión explícita:
por API, por automatización, o pendiente con plan.

**Estimación de esfuerzo.** Talla por feature convertida a días, con el supuesto que
sostiene cada talla. No incluye precio; el precio lo pone el PM aplicando la tarifa. Ocurre
en dos momentos: gruesa en la etapa 2, que produce el cronograma tentativo, y refinada en
la etapa 3, después de la arquitectura y las pantallas, que son lo que más mueve el número.

**Cronograma sincerado.** El cronograma actualizado contra la estimación refinada. Si al
levantar las pantallas apareció algo que mueve la fecha, se le dice al cliente en ese
momento y no al final.

**Hito de pago.** Un bloque de features con una fecha y un monto. No sale del arnés: nace
en la propuesta comercial firmada. En discovery y discovery + PoC la regla es fija, mitad al
inicio y mitad a la entrega. En desarrollo con alcance definido el esquema se negocia por
proyecto con el área comercial, y mientras no esté cerrado la columna de hito del backlog
queda vacía a propósito.

**Informe de discovery.** El documento que el cliente lee al cierre. Escrito como lo
escribiría una persona: párrafos, lenguaje llano, sin bullets en cascada.

**Modelo frontera.** Fable y, si no está, Opus. Obligatorio para arquitectura, estimación y
la decisión de flujos y pantallas, porque un error ahí cuesta más que todos los tokens del
proyecto.

## Los pares que más se confunden

| Esto | No es esto |
|---|---|
| Discovery, el proceso de varias semanas | Discovery, la sesión individual d1 |
| As-Is: cómo trabajan hoy | To-Be: cómo deberían trabajar |
| Supuesto: hipótesis con sesión que la valida | Riesgo: supuesto confirmado con mitigación |
| Desarrollo con alcance definido: el análisis lo trae el cliente | Discovery: el análisis es el entregable |
| Notas de sesión: internas y crudas | Acta: corta, legible y opcional de enviar |
| Gap: un tema completo por explorar | Pendiente: un dato puntual que falta |
| RF light: título y párrafo para decidir alcance | RF full: criterios de aceptación para construir |
| Tema por entender: se resuelve con información | Tema por negociar: se resuelve con una decisión |
| PoC: demuestra que se puede | Mockup: demuestra cómo se vería |
| Mockup de viabilidad: prueba de entendimiento que el cliente paga, en cualquier etapa | Mockups de la etapa 3: las pantallas del diseño, salen de `ui-design` |
| Checkpoint: sesión fresca rompe el artefacto | Revisión con el equipo: humanos opinan |
| Veredicto de entrada: entra / con huecos / no entra | Veredicto de checkpoint: pasa / con riesgo / rechazado |
| `inherited/`: bandeja de arranque si saltas una etapa | `outputs/ready-to-take/`: entregables generados en formato cliente (.docx, .xlsx) |
| Outputs de etapa: el registro en markdown, versionado | `outputs/ready-to-take/`: la copia que se lleva el cliente, se regenera y no se edita |
| `outputs/versions/`: copias congeladas por un evento (checkpoint, entrega) | Git: cada edición del borrador, sin evento |
| Fricción: el arnés hizo algo mal, va como issue a la base | Override: el proyecto necesita algo distinto, va en su `overrides.md` |
| Agenda del kickoff: guion del primer día | Agendas de sesión: guion de cada d1, d2, d3 |
| Agendas de sesión: solo las reuniones con el cliente | Gantt del discovery: esas reuniones más el trabajo interno y los feriados |
| Talla: esfuerzo en días | Precio: tarifa aplicada al esfuerzo |
