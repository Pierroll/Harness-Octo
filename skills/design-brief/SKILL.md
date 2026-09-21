---
name: design-brief
description: >
  Arma el documento de entendimiento para el equipo de diseño a partir de todo lo que
  produjo el discovery: proceso real del negocio sin sistemas, quién es cada usuario de
  verdad, mapa de estados, accesos al sistema actual, campos, reglas y restricciones.
  Usar cuando el usuario diga "el brief para diseño", "qué le paso a diseño", "documento
  de entendimiento para diseño", "arma el resumen para UX", o al cerrar la etapa 2 antes
  de que diseño empiece las pantallas. Produce discovery/2-analysis/outputs/design-brief.md.
---

# Design brief — lo que diseño necesita, sin hacerlo leer todo

Produce `discovery/2-analysis/outputs/design-brief.md` a partir de `templates/design-brief.md`.

Entradas: notas y actas de sesión (`discovery/2-analysis/outputs/`), los inventarios
(`inventory-fields.md`, `inventory-rules.md`, `inventory-sources.md`,
`inventory-states.md`, `inventory-users.md`), el As-Is y el To-Be, la tabla de roles, el
RF detallado, `scope-decisions.md` y el `overrides.md` del proyecto.

Se entrega al cerrar la etapa 2, antes de que diseño abra la herramienta, y es la entrada
de `skills/ui-design/` en la etapa 3. Si el proyecto mete a diseño antes, se entrega la
versión que haya y se marca qué secciones están incompletas.

## Por qué existe

Hoy a diseño se le entrega todo: diez sesiones de exploración, cien documentos dispersos y
los requisitos. Con cuatro o cinco proyectos encima, nadie lee eso. Terminan escuchando un
video de una hora para averiguar si el cliente dijo algo sobre un estado, o preguntando en
una reunión lo que ya estaba escrito en algún lado.

El resultado es peor que la pérdida de tiempo: diseñan con lo que tienen, y cuando aparece
el dato que faltaba hay que rehacer. El caso que lo explica es un formulario que se
rediseñó completo y después apareció el link al formulario legacy, con campos que nunca
llegaron al requisito.

Este documento no les agrega trabajo ni les dice cómo diseñar. Les cambia el punto de
partida.

## Las tres secciones que justifican el documento

Las otras secciones son referencia. Estas tres no están en ningún otro artefacto del
discovery y son las que más mueven un diseño.

### El proceso real, sin sistemas

Cómo funciona el negocio en la vida, sin hablar de software. No es el As-Is: el As-Is
describe el proceso tal como lo soporta el sistema actual, con sus tiempos. Esto es lo de
más atrás, el proceso que existiría igual si no hubiera ningún sistema.

Sirve para un fin concreto: si solo se conoce el sistema actual, lo que sale es una copia
con mejor interfaz. Conociendo el proceso real se puede proponer un flujo distinto.

Sale de las sesiones. Si en las sesiones nadie lo preguntó, la sección se escribe con lo
que haya y se marca como pendiente, no se rellena con lo que parezca lógico.

### Quién usa esto de verdad

El cargo no alcanza. "Jefe de logística" no dice si es una persona o cinco, si trabaja en
un escritorio o en el campo, ni qué lenguaje entiende.

Por cada rol: quién es en realidad, cuántos son, nivel técnico y educativo, idioma y
registro que maneja, y dónde y con qué dispositivo trabaja. Y una línea de qué obliga eso.
Un postulante de campo y uno de packing son dos poblaciones distintas, y lo que sirve para
uno le queda mal al otro.

### El mapa de estados

Por cada entidad importante: sus estados, qué la mueve de uno a otro, quién lo dispara y
qué tiene que pasar cuando ocurre. Un caballo pasa de gestación a nacido, y de compitiendo
a fallecido, y cada transición es una notificación, una pantalla, un permiso que cambia o
un registro que se cierra.

Es de lo que más se olvida preguntar y de lo que más pantallas genera.

## Reglas

- **Corto.** El documento completo no pasa de cuatro o cinco páginas. Lo que no entra se
  linkea en la sección 10. Si crece más que eso, dejó de servir para lo que se hizo.
- **Extrae, no inventes.** Vale la regla base: lo que no salió de una sesión o de un
  documento no está. Una inferencia razonable va marcada `(inferido: ...)`, y lo que falta
  va en la sección 8 con dueño.
- **Lenguaje del cliente, no el nuestro.** Diseño va a hablarle a los usuarios finales con
  las palabras que este documento use.
- **Vigencia.** Lleva fecha. Si después de entregado cambia un requisito, un estado o un
  rol, se actualiza y se avisa. Un brief desactualizado es peor que no tenerlo, porque se
  diseña encima sin sospechar.
- **No lleva soluciones de diseño.** Ni pantallas propuestas ni recomendaciones de
  interfaz. Eso es trabajo de ellos y ponerlo en el brief lo único que hace es empezar una
  discusión antes de tiempo.

## Antes de entregarlo

Tres preguntas. Si alguna se responde que no, la sección va marcada como incompleta con
dueño y fecha, no se maquilla.

1. ¿Un diseñador que no estuvo en ninguna sesión puede empezar a trabajar solo con esto?
2. ¿Cada pantalla o formulario que vamos a reemplazar tiene en el brief cómo verlo?
3. ¿Cada rol dice quién es la persona, y no solo el cargo?

`references/heuristicas-y-leyes.md` sirve para eso mismo: leerlo antes de cerrar el
documento ayuda a ver qué falta preguntar. No es un método de diseño y no se usa para
evaluar requisitos.

Y la cuarta pregunta es la del equipo de diseño. El 3 de septiembre de 2026 entregaron
"Antes del RF" (`sources/antes-del-rf-equipo-diseno.md`): trece puntos que necesitan tener
respondidos antes de diseñar sobre un requisito. Este documento es donde se responden, y
antes de entregarlo se recorren los trece contra las secciones. Se responden con lo que ya
hay en transcripts, sesiones e inventarios; lo que no está va a la sección 8 con dueño. No
se le vuelve a preguntar al cliente lo que ya dijo.

| Punto de "Antes del RF" | Sección del brief |
|---|---|
| 01 Negocio del cliente · 02 Por qué resolverlo ahora · 03 Qué necesita obtener el negocio | 1 |
| 04 Problema real · 05 A quiénes afecta | 1 y 3 |
| 06 Usuarios reales · 07 Qué necesita hacer · 12 Volumetría y contexto | 3 |
| 08 Proceso de punta a punta, sin software | 2 |
| 09 Software actual y alcance · 10 Documento real por RF | 4 y 5 |
| 11 Restricciones y supuestos | 9 y 8 |
| 13 Quién decide | 7 |

## Modos de fallo

- **No hay mapa de estados porque nadie lo preguntó:** la sección se escribe con las
  entidades y sus estados conocidos, el resto queda como pendiente con dueño, y se agenda
  la pregunta para la próxima sesión con el cliente.
- **El proyecto entra por una etapa posterior y no hay sesiones propias:** se arma con lo
  que traiga el discovery previo y se corre `skills/entry-check/` sobre lo que se está
  reusando.
- **Diseño pide algo que no está en el template:** se agrega al template de la base, no
  solo al documento del proyecto. Es la clase de mejora que le sirve a todos.
