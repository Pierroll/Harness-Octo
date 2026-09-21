# Mapa de procesos To-Be — <cliente> — <proceso>

Cómo va a trabajar el cliente cuando el software esté en producción, y cuánto mejora cada
paso. Nace tentativo en la etapa 1 con `skills/gap-analysis/` y se trabaja en la etapa 2
sobre el As-Is validado.

Es el escenario que le proponemos al cliente. Se escribe sobre las mismas etapas del As-Is,
porque lo que cambia no es el ciclo de negocio sino quién hace qué y con qué herramienta.

Estilo: ver `harness/skills/discovery-report/references/writing-style.md`.

**Versión:** <N> · <YYYY-MM-DD> · reemplaza a `versions/to-be-v<N-1>.md`, o "primera" · qué cambió: <una línea> · qué cerró la anterior: <checkpoint o presentación al cliente, con fecha>
**Estado:** vigente / desactualizado desde <fecha y por qué> / reemplazado por <cuál>

## 1. El principio rector del rediseño

<Una frase que gobierna todas las decisiones del documento, y un párrafo que la sostenga.
Es lo que permite resolver una discusión de diseño sin volver a discutir el proyecto
entero.

Un principio rector responde qué cambia de fondo en la operación, no qué funcionalidad se
agrega. Se escribe diciendo quién pasa a hacer qué, y por qué eso es lo correcto para este
negocio. Si el rediseño formaliza una práctica que el cliente ya tiene, se dice: la
adopción de algo que ya existe cuesta mucho menos que la de algo nuevo, y ese argumento
vale en la conversación comercial.>

## 2. Decisiones de diseño transversales

<Las que atraviesan todas las etapas y conviene fijar antes de bajar al detalle. Una línea
cada una, con su razón.

Ejemplos del tipo de decisión: por qué canal interactúa cada tipo de usuario, qué se le
exige instalar a quién, qué se automatiza y qué se deja deliberadamente manual.>

## 3. El proceso etapa por etapa

Las mismas etapas del As-Is, con otra operación. Cada una lleva un owner nombrado y cierra
con las tres líneas del cambio de responsabilidad. Pasos, decisiones y notas se escriben
igual que en el As-Is: pasos numerados como cajas, cada decisión como bloque propio sin
número con su rama Sí y su rama No, y la nota aparte.

### Etapa <N> — <nombre> · Owner: <rol>

<Una frase que diga qué cambia en esta etapa.>

1. <cómo funciona el paso en la nueva operación>
2. <paso>

**Decisión — ¿<la pregunta que se decide, si la etapa tiene una>?**
- **Sí:** <qué pasa si sí>
- **No:** <qué pasa si no>

3. <paso>

**Nota To-Be:** <lo que cambia de fondo en esta etapa y conviene decir aparte de los pasos.
Opcional. Mismo formato que la nota del As-Is: bloque propio, no un paso más.>

**<El rol que hoy lo ejecuta> deja de:** <qué trabajo desaparece de sus manos>

**El negocio asume:** <qué pasa a hacer el cliente, o el usuario final, que hoy no hace>

**El sistema automatiza:** <qué resuelve el software solo>

Esas tres líneas son lo que convierte el To-Be en una conversación que el cliente puede
tener sin hablar de software, porque lo que está mirando es su propia operación. Un To-Be
sin ellas es un diagrama bonito.

**El owner puede ser un rol del cliente, puede ser el sistema, y puede ser compartido.** Si
todavía no se sabe, no se frena: se señala, se pregunta si se define ahora o queda
pendiente, y se registra como pendiente con dueño.

## 4. Resumen por etapa

La tabla que se lleva a la presentación. Se lee sola.

| Etapa | Owner | Situación actual | Situación propuesta |
|---|---|---|---|
| <nombre> | <rol> | <cómo se hace hoy, en media línea> | <cómo se hace con el sistema> |

## 5. Cuánto mejora cada paso

Contra los tiempos del As-Is. Es lo que vuelve el To-Be un compromiso medible en vez de una
promesa.

| Etapa | Hoy | Objetivo | Qué lo explica |
|---|---|---|---|
| <nombre> | <el SLA del As-Is> | <el tiempo esperado> | <qué paso concreto desaparece o se automatiza> |

Cada objetivo se sostiene en un paso que se elimina o se automatiza, no en un porcentaje
general. Si la mejora no se puede atribuir a un cambio concreto, es una hipótesis y se
escribe como hipótesis.

Cuando el As-Is no tiene el tiempo medido, la fila queda con el tiempo en blanco y un
pendiente con dueño. No se inventa la línea base para poder mostrar una mejora.

## 6. Conversaciones abiertas

<Lo que este documento propone y el cliente todavía no aceptó. Va separado a propósito: los
owners y los cambios de responsabilidad son propuesta nuestra hasta que alguien del lado
del cliente los confirma, y presentarlos como acuerdo es la forma más rápida de perder la
reunión de validación.

Cada una con quién decide y en qué momento se pone sobre la mesa.>
