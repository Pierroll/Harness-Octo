# OCTO Harness

Nuestro arnés de discovery: cubre las etapas 1 a 3 del ciclo de desarrollo
(Planificación, Análisis, Diseño). Cada proyecto lo instala como dependencia y declara
solo sus diferencias en su propio `overrides.md`.

Mapa del repo: `stages/` define cada etapa en dos archivos: `CONTRACT.md` es la firma, qué
entra y qué sale con su ruta, y `STAGE.md` es el porqué, el orden interno y los criterios
de cierre. Las tres modalidades de entrada están en `stages/modalities.md`, y
`stages/dependencies.md` dice qué documentos revisar cuando uno cambia. `skills/`
contiene los procedimientos ejecutables. `templates/` tiene los esqueletos de artefactos.
`project-template/` es lo que se copia para arrancar el discovery de un cliente.
`sources/` es material fuente crudo: se lee, no se edita.

`AGREEMENTS.md` recoge los acuerdos que todavía se están incorporando a las etapas y los
skills; es temporal y se borra cuando el último esté aplicado. `GLOSSARY.md` tiene el
vocabulario por etapa.

## Reglas base (no negociables por proyecto)

1. **Todo artefacto vive en git.** No en la cabeza de alguien, no solo en Drive. Si un
   documento se trabajó en Drive, su versión de registro se guarda en el repo del
   discovery en markdown. Y lo que se lleva un cliente o un PM de negocio no se entrega
   en markdown: se entrega desde `discovery/<etapa>/outputs/ready-to-take/`, la
   subcarpeta que cada etapa tiene junto a sus markdown, en `.docx` (documentos) o
   `.xlsx` (cronogramas y gantts), según el mapa de `skills/ready-to-take/`. El markdown
   es el registro; el archivo de esa subcarpeta es la copia generada para entregar.

2. **Ninguna etapa cierra sin checkpoint en sesión fresca.** La sesión que produjo un
   artefacto ya cree que es correcto; esa creencia es el sesgo que la revisión existe
   para derrotar. La validación la hace una sesión NUEVA que solo recibe el artefacto y
   los criterios del checkpoint, con la instrucción de romperlo. Ver
   `skills/checkpoint-review/`. Auto-revisión en la misma sesión no cuenta, sin importar
   qué tan chico sea el cambio.

3. **No inventes: extrae y declara pendientes.** Todo requisito, dato o decisión sale de
   los insumos (transcripts, propuesta, sesiones), y cada afirmación lleva una de cuatro
   procedencias: **confirmado en sesión**, **propuesta nuestra aceptada**, **interpretación
   nuestra por validar** o **pendiente** con dueño. La segunda es la que más se pierde: una
   idea que trajimos nosotros y el cliente aceptó no es una necesidad que él haya traído, y
   a los dos meses se leen igual si no se separan ahora. Lo que no se sabe se registra como
   pendiente, nunca se rellena con un valor plausible.

4. **Base común, overrides por proyecto.** Lo que se repite entre proyectos vive en el
   arnés. Un proyecto solo declara sus diferencias en su `overrides.md`, dentro de los
   límites
   de `stages/overrides.md`. Un arreglo hecho en la base le llega a todos.

5. **Todo procedimiento recurrente es un skill.** Si un PM va a hacer algo más de una
   vez, se escribe como skill en `skills/` y se referencia, no se copia.

6. **"Listo" = checkpoint pasado con registro.** Un documento escrito no es un entregable
   terminado. Terminado es: checkpoint ejecutado, registro guardado (incluidos los
   rechazos), pendientes asignados.

7. **Idioma.** En inglés van solo los nombres: archivos, carpetas, skills, ramas,
   mensajes de commit y, si aparece código, variables y funciones. Palabras simples.
   En español va todo el contenido, sin excepción: lo que está dentro de un skill, de
   una etapa, de un template y de cualquier entregable. Un skill se llama
   `discovery-session` y por dentro está escrito en español. Nosotros y nuestros
   clientes somos equipos de LATAM, y ese texto se escribe para que lo leamos.

8. **Estilo de entregables para humanos.** Los documentos que lee un cliente se escriben
   como los escribiría una persona: párrafos corridos, lenguaje llano, sin guiones
   largos (—), sin listas de bullets en cascada, sin vocabulario inflado. La guía
   completa está en `skills/discovery-report/references/writing-style.md` y aplica a
   todo entregable, no solo al informe final.

9. **Modelo frontera para lo sensible.** Diseño técnico (arquitectura, modelo de datos,
   integraciones), estimación (tallas, precio) y la decisión de flujos y pantallas del paso
   de UI/UX se corren con el modelo más capaz disponible: Fable y, si no está, Opus. En
   esas decisiones vale la pena gastar tokens; un error ahí cuesta más que todos los tokens
   del proyecto.

10. **Los artefactos tienen vigencia.** Un documento aprobado no queda congelado. Cada
    artefacto está vigente, desactualizado o reemplazado. Cuando llega información que
    contradice uno ya aprobado, se corre `skills/reopen-artifact/`: propone qué documentos
    de cualquier etapa cambian (según `stages/dependencies.md`), guarda la versión anterior
    en `outputs/versions/`, edita el canónico y declara qué checkpoints ya pasados dejan de
    valer, que se vuelven a correr solo sobre lo que cambió. La información nueva se deja
    en `discovery/inbox/` sin tener que saber a qué etapa pertenece. Un artefacto
    desactualizado es peor que uno que falta, porque nadie sospecha de él y se diseña
    encima. Esto mismo es lo que `skills/entry-check/` verifica cuando un proyecto entra
    por una etapa que no es la primera.

11. **Una etapa se abre por sus entradas, no por la etapa anterior.** La etapa 2 no
    necesita "la etapa 1 cerrada": necesita los artefactos que la etapa 1 produce. Si ya
    existen porque los produjo un discovery previo o porque vinieron en la propuesta, la
    condición está satisfecha. Lo que no se puede es darlos por buenos sin verificar que
    existen y siguen vigentes. Ver `stages/modalities.md`.

12. **El arnés mejora por fricción escrita.** No aprende solo: mejora porque lo que
    estorba, falta o se ignora queda anotado en el momento en el `friction-log.md` del
    proyecto, con propuesta, y llega como issue a `harness-product` sin que el PM haga
    nada. El PM está para sacar su documentación; el agente escribe y envía la fricción.
    Quien mantiene el arnés convierte issues en PRs, y el cambio le llega a todos por el
    submódulo. Ver `skills/friction-log/`.

13. **Preflight Check (Gatekeeper Cero Alucinaciones).** Antes de iniciar trabajo de código o análisis estructural, el orquestador DEBE detenerse y ejecutar un *Preflight Check*: verificar y reportar si las dependencias base de OCTO (Engram, Graphify, GitHub CLI) están instanciadas en el entorno local del proyecto. Si falta alguna, es OBLIGATORIO detenerse, informarlo y pedir permiso explícito al usuario para configurar o instanciar el componente faltante (ej. crear el repo vía gh, instanciar el grafo). Trabajar a ciegas sin este seteo está prohibido.

## Dónde vive cada skill

| Necesitas | Skill |
|---|---|
| Reconstruir el problema, y saber qué falta entender, qué riesgos hay y qué habrá que negociar, antes del kickoff | `skills/gap-analysis/` |
| Armar kickoff y agendas de discovery | `skills/kickoff-discovery/` |
| Plan/Gantt del discovery | `skills/discovery-plan/` |
| Abrir una etapa: verificar que sus entradas existen y siguen vigentes | `skills/entry-check/` |
| Traer un transcript de Meet a markdown | `skills/import-transcript/` |
| Procesar una sesión (notas, hallazgos, pendientes) | `skills/discovery-session/` |
| Retomar el proyecto donde quedó la última sesión de trabajo | `skills/session-log/` |
| Probarle algo al cliente: prueba de concepto o mockups | `skills/feasibility-demo/` |
| RF light (título y párrafo por requisito, para negociar el alcance) | `skills/requirements-lite/` |
| RF detallado con criterios Dado/Cuando/Entonces | `skills/requirements-full/` |
| Que el equipo que va a construir opine mientras se estima | `skills/team-review/` |
| Arquitectura, modelo de datos, integraciones, riesgos | `skills/technical-design/` |
| Esfuerzo por módulo y cronograma | `skills/estimation/` |
| Lo que diseño necesita para empezar, en un solo documento | `skills/design-brief/` |
| Flujos y pantallas, design system y mockups con alternativas para elegir y HTML para el cliente | `skills/ui-design/` |
| Informe final de discovery | `skills/discovery-report/` |
| Entregar un documento en el formato del cliente (.docx, .xlsx) | `skills/ready-to-take/` |
| Validar un artefacto o cerrar una etapa | `skills/checkpoint-review/` |
| Llegó información que contradice algo ya aprobado: qué cambia, en qué etapa, y aplicarlo con versión | `skills/reopen-artifact/` |
| Anotar algo que el arnés hizo mal y que llegue a la base como issue | `skills/friction-log/` |

## El flujo en una línea

Propuesta → [E1] reconstruir el problema → temas por entender, supuestos y riesgos, y temas
por negociar → kickoff (escuchar) → equipo, entornos y accesos →
cronograma de delivery + backlog → *relevamiento* → [E1.5 Research] investigación técnica, viabilidad y evaluación de herramientas externas (research-findings.md) → *relevamiento* → [E2]
sesiones (entendimiento por sesión, inventarios y riesgos) → To-Be y diagrama de
arquitectura → tabla de riesgos → RF light → negociación del alcance con el cliente → RF
full → cronograma tentativo → entendimiento para diseño → *relevamiento* → [E3] UI/UX →
arquitectura y modelo de datos → estimación refinada con el equipo → informe →
*relevamiento*. Cada transición de etapa pasa por `checkpoint-review` en sesión fresca
antes del relevamiento.

Cada etapa abre su checklist de tareas (`templates/stage-checklist.md`) y cada sesión de
trabajo deja su registro (`skills/session-log/`). Lo primero es para saber qué falta dentro
de la etapa; lo segundo, para que la sesión siguiente no empiece reconstruyendo de memoria
dónde quedó todo.

Un proyecto que no arranca desde cero declara su modalidad
(`stages/modalities.md`) y entra por donde corresponda, con `skills/entry-check/` como
prueba de que sus entradas existen y siguen vigentes. El paquete de la etapa que no se
corrió se deja en `discovery/<etapa>/inputs/inherited/`; `start-here.md` en esa misma
carpeta `inputs/` dice qué va ahí y qué va un nivel arriba.


## Mantenimiento (OCTO)

Si el proyecto está en modo mantenimiento, usa `stages/4-maintenance/` y consulta siempre `knowledge/` antes de proponer o ejecutar cualquier cambio.
