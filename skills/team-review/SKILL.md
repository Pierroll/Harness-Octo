---
name: team-review
description: >
  Conduce la sesión con el equipo que va a construir, en la etapa 3, después de las
  pantallas y la arquitectura, dentro del paso de estimación refinada. Usar cuando el
  usuario diga "revisemos esto con el equipo", "que los devs opinen", "reunión con el
  equipo de implementación", "antes de estimar", o al llegar a ese punto de la etapa 3.
  No reemplaza el checkpoint en sesión fresca: son revisiones distintas.
---

# Team review — que opine quien va a escribir el código

Produce `discovery/3-design/outputs/team-review-<fecha>.md` a partir de
`templates/team-review-record.md`.

Va en la etapa 3, después de las pantallas y de la arquitectura, **dentro del paso de
estimación refinada**. No es un paso aparte: la revisión es la acción y la estimación
refinada es su resultado.

## Por qué existe

El arnés tiene dos formas de revisión y ninguna de las dos es esta. El checkpoint en
sesión fresca busca romper el artefacto contra sus criterios. La aprobación del RF light
es del cliente. Entre las dos falta la única gente que sabe qué existe en el código y qué
es más difícil de lo que parece: quienes van a construirlo.

## Por qué va después del diseño y no antes

Porque necesita algo concreto que mirar. Con las pantallas y la arquitectura sobre la
mesa, la conversación es "esto que dibujaron acá ya lo tenemos resuelto en el servicio X"
o "esta pantalla parece simple y son tres semanas por el buscador". Sin eso, la reunión es
abstracta y el equipo solo puede dar opiniones generales.

Lo que sí es innegociable es que vaya **antes de la estimación**. Los dos factores que el
equipo aporta, lo que se puede reusar y lo que es más caro de lo que parece, son
exactamente las dos que mueven un número. Después de estimar, la misma información obliga
a rehacer la cifra delante del cliente.

Si la revisión tumba una decisión de arquitectura, se corrige la arquitectura y se vuelve
a pasar por la revisión. Es más barato que descubrirlo construyendo.

## A quién se convoca

Quienes van a construir, no quienes los dirigen. Tech lead, los desarrolladores asignados
si ya están, y QA. Si el proyecto todavía no tiene equipo asignado, se convoca a quien
mantiene los sistemas con los que este va a convivir.

Cuatro o cinco personas. Una reunión de revisión con doce personas es una presentación.

## Qué se les entrega antes

Con dos días de anticipación, no en la reunión: el inventario de pantallas
(`3-design/outputs/screen-inventory.md`) con los flujos en HTML de `mockups/`, la
arquitectura y el modelo de datos, el RF detallado, los inventarios de integraciones y
reglas, y el registro de riesgos. Sin lectura previa la reunión se gasta
en contar el proyecto y no queda tiempo para lo que importa.

## Qué se les pregunta

Tres preguntas, en este orden.

**Qué de esto ya existe.** Componentes, servicios o módulos que el equipo ya tiene y que
el diseño está por construir de nuevo. Esta es la pregunta que más plata ahorra de toda la
reunión y por eso va primera, cuando la atención está entera.

**Qué de esto es más caro de lo que parece.** Features que el discovery leyó como
livianas y que el equipo sabe que no lo son, con la razón. Va directo a la estimación.

**Qué falta.** Huecos que el equipo ve y que el discovery no vio.

## Qué se hace con cada objeción

Cada una termina en uno de tres resultados, escrito en el registro: un cambio aplicado a
un artefacto con su ruta, un pendiente con dueño y fecha, o un descarte con su razón.

"Lo conversamos" no es una resolución. Una objeción sin resolución escrita reaparece en la
etapa 4 convertida en retrabajo.

Cuando la objeción tumba algo que ya pasó checkpoint o ya se le mostró al cliente (un
requisito, la tabla de roles, una etapa del To-Be), la resolución no es editar ese documento
en la reunión. Es la marca `contradice: <ruta>` en el registro, y después de la reunión se
corre `skills/reopen-artifact/`, que propone qué más se mueve y guarda la versión anterior.

## Reglas

- Esto no reemplaza el checkpoint en sesión fresca. La etapa 3 igual cierra con su
  checkpoint, y esta revisión es una entrada suya, no un sustituto.
- El registro dice explícitamente qué tallas se mueven. Una revisión con el equipo que no
  cambia ningún número suele ser una revisión que no ocurrió de verdad.
- Lo que el equipo diga que ya existe se verifica antes de darlo por bueno. "Creo que
  tenemos algo así" no es lo mismo que un servicio andando.

## Modos de fallo

- **La reunión no ocurre:** el arnés no controla cuándo se junta el equipo ni quién va.
  Si no se pudo hacer antes de estimar, la estimación no se bloquea: se corre igual y
  declara en su registro de riesgos "estimación sin revisión del equipo que construye",
  con impacto alto, y el registro de esta revisión se crea con esa sola línea. Se repite
  la revisión cuando el equipo exista y se ajustan las tallas.
- **No hay equipo asignado todavía:** se corre igual con quien mantiene los sistemas
  vecinos, y se marca en el registro que la revisión fue parcial. Se repite cuando el
  equipo exista.
- **El equipo cuestiona el alcance, no el diseño:** eso es una conversación con el cliente,
  no con el equipo. Se registra como hallazgo y se escala al PM; no se resuelve en la sala.
- **La reunión se convierte en diseño técnico en vivo:** córtala. El objetivo es recoger lo
  que el equipo sabe, no producir la arquitectura ahí. La arquitectura viene después, con
  modelo frontera y con esta información en la mano.
