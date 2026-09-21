# Heurísticas y leyes: para saber qué falta preguntar

Este archivo no es un método de diseño y no se usa para evaluar requisitos. Se lee antes de
cerrar el brief, con una sola pregunta en la cabeza: de todo esto, ¿qué dato no tenemos y
diseño va a necesitar?

La distinción importa y la puso el equipo de diseño. Las heurísticas piensan en personas y
un requisito funcional piensa en el sistema. Aplicarle heurísticas a un RF no lo mejora:
que un buscador tenga una lupa y muestre resultados mientras se escribe no es un requisito,
es una decisión de diseño. Lo que sí depende de nosotros es que diseño sepa quién busca,
qué busca y con qué datos cuenta.

## Las diez heurísticas de Nielsen, leídas como preguntas de discovery

| Heurística | Qué preguntar en el discovery |
|---|---|
| Visibilidad del estado del sistema | ¿En qué estados puede estar cada entidad y qué se le avisa al usuario en cada cambio? Es la sección de mapa de estados del brief |
| Correspondencia con el mundo real | ¿Cómo le llaman ellos a cada elemento? Vocabulario del negocio tal cual se dice, no traducido a nuestros términos |
| Control y libertad del usuario | ¿Qué acciones se pueden deshacer, cuáles no, y cuáles necesitan aprobación de alguien más? |
| Consistencia y estándares | ¿Hay un sistema de diseño, una marca o un sistema previo con el que esto tiene que convivir? |
| Prevención de errores | ¿Cuáles son los errores caros del proceso real, los que hoy cuestan plata o retrabajo? |
| Reconocer antes que recordar | ¿Qué datos le estamos pidiendo al usuario que ya existen en alguna fuente y podrían traerse solos? |
| Flexibilidad y eficiencia de uso | ¿Quién usa esto todos los días y quién una vez al año? Son dos diseños distintos |
| Diseño estético y minimalista | ¿Qué campos son obligatorios de verdad y cuáles se piden por costumbre? |
| Recuperación de errores | ¿Qué pasa hoy cuando algo sale mal, quién lo arregla y cómo se entera? |
| Ayuda y documentación | ¿Los usuarios reciben capacitación, tienen manual, o entran solos? |

## Leyes de UX

Diseño quedó en pasar su lista; el 3 de septiembre de 2026 se decidió no esperarla y poner
las leyes generales, con la misma lectura. Cuando llegue la de ellos, se cruza acá. La
primera columna sirve para el discovery; la tercera dice qué hace con cada ley el paso de
UI/UX (`skills/ui-design/references/structural-filter.md`), que es donde se aplican al
dibujar.

| Ley | Qué preguntar en el discovery | Qué decide al diseñar |
|---|---|---|
| Hick: más opciones, más tiempo para decidir | ¿Cuántas acciones distintas hace este rol en esta pantalla? ¿Cuáles todos los días? | Menos opciones visibles; lo raro va detrás de un menú |
| Fitts: lo grande y cercano se alcanza más rápido | ¿Desde qué dispositivo, y con qué (mouse, dedo, guantes)? | Área táctil de 44 px, la acción principal a mano |
| Miller: se retienen pocos elementos a la vez | ¿Cuántos datos tiene que comparar la persona para decidir? | Grupos de cinco a siete; lo que se compara va junto |
| Jakob: la gente espera que funcione como lo que ya usa | ¿Qué otros sistemas usan a diario? | Convenciones de su rubro antes que originalidad |
| Proximidad y agrupación (Gestalt) | ¿Qué datos van siempre juntos en el papel o el Excel de hoy? | Lo relacionado se agrupa; el espacio dice qué pertenece a qué |
| Tesler: la complejidad no desaparece, alguien la carga | ¿Qué parte del proceso es compleja por naturaleza y quién la absorbe hoy? | La carga va al sistema, no al usuario: prellenar, calcular, sugerir |
| Doherty: menos de 400 ms para mantener la atención | ¿Qué operación de hoy hace esperar a la persona? | Respuesta inmediata o indicador de progreso; nunca silencio |
| Postel: tolerante con lo que entra, estricto con lo que sale | ¿Cómo escriben hoy los datos: con puntos, guiones, mayúsculas? | Aceptar variantes al ingresar; normalizar al guardar |
| Pico y final: se recuerda el momento más intenso y el último | ¿Cuál es el paso más tenso del proceso y cómo termina hoy? | Confirmaciones claras al cierre; el paso difícil, con más apoyo |
| Zeigarnik: lo incompleto queda en la cabeza | ¿Qué tareas se dejan a medias y se retoman? | Progreso visible, guardado parcial, retomar donde quedó |
| Von Restorff: lo distinto se recuerda | ¿Cuál es la única acción que no puede pasarse por alto? | Un solo elemento destacado por pantalla |

## Lo que este archivo no habilita

No habilita un skill que revise requisitos buscando antipatrones de UX. Se evaluó y se
descartó con el equipo de diseño: el nivel de un RF no es el nivel de una heurística.

Lo que sí quedó en pie es más chico y vive en los skills de requisitos: pedirle datos al
usuario que ya están en una fuente conocida, refactorizar una pantalla sin adjuntar cómo
ver la actual, y describir un formulario sin decir quién lo llena.
