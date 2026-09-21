# Modalidades: con qué forma entra un proyecto

Cada proyecto entra con una forma distinta. La más común es un discovery completo desde la
etapa 1, y en la práctica también llega el cliente con el alcance ya cerrado, o el que
vuelve meses después con features nuevos sobre algo que ya entregamos.

Cada proyecto declara su modalidad en la primera línea de su `overrides.md`. Esa
declaración es lo que `skills/entry-check/` lee para saber qué exigir.

Lo que la modalidad cambia es **qué artefactos hacen falta y de dónde vienen**. Lo que no
cambia nunca es que ninguna etapa se dé por cumplida sin sus artefactos.

Las modalidades se nombran por dos preguntas: qué compró el cliente, el análisis o el
software, y de dónde viene el análisis.

## Bosquejo del proceso comercial previo

El arnés arranca con una propuesta firmada, pero esa propuesta no aparece sola. Antes hay
una cadena comercial que el arnés todavía no corre y que conviene tener escrita, porque
explica qué llega ya resuelto.

**Esto es un bosquejo, no el proceso relevado.** Sale de una conversación con Paulo y tiene
huecos conocidos: por dónde entra cada lead, quién toma la primera llamada según de dónde
venga el contacto, y qué más pasa entre esa llamada y la propuesta. Sirve para ubicarse y
para saber qué preguntar cuando se releve en serio. Hasta entonces, no se presenta como el
proceso de Codeable ni se le muestra al cliente.

El lead llega casi siempre por LinkedIn, y también por referido o por alguien de un cliente
que ya tenemos. Después viene una llamada corta, de unos quince minutos: nos presentamos,
contamos qué hacemos y preguntamos qué problema tiene. La toma ventas o alguien de dirección
según el caso, y un referido o un cliente conocido suele subir de nivel a quien atiende. En
quince minutos sale un primer acercamiento y poco más. Si hay interés, viene una llamada de
una hora con el cliente y su área técnica, y esa sí es para entender: se pregunta todo lo que
se pueda y se escucha.

Con esa hora se escribe la **propuesta comercial**, un documento de diez páginas o más que
redacta delivery, no ventas. Su función es doble: dejar por escrito el problema del cliente
para que sienta que lo escuchamos, y proponer el camino. De ese documento salen después los
slides que presenta ventas, porque nadie lee diez páginas en una llamada.

En esa llamada de una hora se decide además la modalidad. Si en una hora queda todo claro,
es casi un TDR inicial y el proyecto puede entrar como desarrollo. Si quedan huecos sobre
cómo funciona hoy el cliente, quién administra qué o quién va a recibir el sistema, eso
mismo es lo que justifica vender un discovery. La modalidad no la declara quien corre el
arnés: llega decidida.

### Qué trae ya resuelto la propuesta

Más de lo que parece, y por eso la etapa 1 no arranca de cero:

- El flujo actual del cliente y sus limitaciones, o sea un **As-Is en prosa**.
- La solución propuesta con su impacto esperado, o sea un **To-Be tentativo**.
- El alcance, la arquitectura propuesta y el stack.
- El **equipo asignado con su dedicación**, full time o fractional, rol por rol.
- Las **etapas con sus plazos**, que son el primer corte del cronograma.
- Los **supuestos y dependencias**, con quién responde por cada uno.
- Los **sponsors del lado del cliente**, con nombre y cargo.
- Los **hitos de pago** y el plazo de pago.
- Los **módulos futuros**, que son la primera lista de diferidos.

### Qué agrega la etapa 1

La propuesta trae los supuestos escritos como declaraciones y los accesos como supuesto con
dueño pero sin fecha. La etapa 1 convierte los supuestos en hipótesis con la sesión que las
valida, le pone fecha a cada acceso, y agrega los temas por entender, los temas por negociar
y el calendario de sesiones.

Esa es la diferencia entre el problema **contado** y el problema **estructurado**, y es
exactamente lo que produce el primer paso de la etapa 1. Por eso ese paso se llama
reconstruir el problema y no entenderlo: lo que hace es tomar las piezas que la propuesta
trae sueltas y devolverlas en una sola estructura que el cliente pueda corregir en el
kickoff.

## Las tres

### 1. Discovery

El entregable es el análisis, no el software. El cliente no tiene claridad sobre qué
construir y la proyección es grande, así que paga por definir el camino antes de
comprometer desarrollo.

- **Entrada:** propuesta firmada, sin material previo del cliente.
- **Duración típica:** cuatro semanas.
- **Artefactos:** todos los mínimos de las tres etapas.
- **`entry-check`:** no hace falta.

### 2. Discovery + PoC

Lo mismo, más una demostración técnica de viabilidad. Se mantiene separado porque cambia
el arnés: obliga a montar entorno y a construir un prototipo funcional dentro de una etapa
que normalmente no produce código.

La demostración atraviesa implementación y pruebas en una rebanada vertical delgada, en
modo prototipo. Cierra demostrando que la parte difícil funciona, no que está lista para
producción, y por eso el código que sale de la demostración no lleva revisión de código,
ni cobertura de pruebas, ni definición de terminado. Lo que se construya de verdad se
construye de nuevo.

- **Duración típica:** seis semanas.
- **Artefactos:** los del discovery, más el registro de `skills/feasibility-demo/`.
- **Cuándo se decide:** al armar el plan, no a mitad de camino. Si aparece después, es un
  cambio de alcance y se conversa como tal.

### 3. Desarrollo con alcance definido

El entregable es el software y el análisis viene del cliente: TDR cerrado, stack definido,
scope aterrizado. La primera semana no levanta requisitos, los valida, los traduce y los
formaliza, y configura entornos.

- **Entrada:** propuesta firmada más el material del cliente (TDR, especificaciones,
  documentación del sistema que ya existe).
- **Duración típica:** una a dos semanas para la parte que cubre este arnés.
- **Artefactos:** As-Is de lo que existe, inventario de integraciones, temas por entender y
  riesgos.
- **Qué requisitos produce:** solo los del cambio que se va a construir. El catálogo
  completo ya viene cerrado en el TDR.
- **`entry-check`:** obligatorio, contra las entradas de la etapa 2. El TDR y el
  análisis que ya existe se dejan en `discovery/2-analysis/inputs/inherited/` si la
  etapa 1 no se corrió en este repo.

## El cliente que vuelve

Un cliente que ya tiene algo entregado y pide una fase nueva no es una modalidad aparte.
Entra por una de las tres según cuánta claridad traiga:

- Si sabe exactamente qué quiere y el alcance está cerrado, es **desarrollo con alcance
  definido**, solo que el análisis lo produjimos nosotros en la fase anterior.
- Si quiere saber si algo es viable antes de comprometerse, es **discovery + PoC**.
- Si el pedido es grande y difuso, es **discovery** otra vez, aunque sea el mismo cliente.

Lo que decide no es la relación comercial, es el estado de los artefactos. Si un discovery
anterior ya produjo lo que la etapa exige, la condición está satisfecha, siempre que sigan
siendo ciertos. Si el alcance cambió o los artefactos ya no reflejan la realidad, hay que
volver a producirlos.

- **Punto de anclaje:** el `backlog.md` del proyecto anterior. Los features nuevos
  entran **al mismo archivo**. Eso es lo que separa continuar de empezar a ciegas.
- **`entry-check`:** obligatorio, con foco en vigencia. Un discovery de hace ocho meses
  sobre un sistema que ya se shippeó describe un mundo que cambió. El paquete se deja
  en `inputs/inherited/` de la etapa a la que se entra.

## Dónde termina el discovery

El punto de cierre lo define lo que compró el cliente, y puede ser uno de dos:

- Puede cerrar al terminar el catálogo de requisitos detallados, sin llegar al diseño. El
  cliente se lleva el análisis completo y decide con quién construye.
- Puede extenderse hasta la entrega de diseño, con modelo de datos y pantallas aprobadas,
  cuando el cliente lo pidió así en la propuesta.

El proyecto declara en su `overrides.md` hasta dónde llega. Lo que no cambia es que cada
etapa que se recorra tiene que producir sus artefactos.

## El relevamiento, que atraviesa las tres modalidades

El relevamiento es el documento de traspaso interno. Lo escribe quien cierra una etapa
para quien toma la siguiente, sea la misma persona o no.

Es un artefacto que aparece en las tres modalidades y en cada transición de etapa, así que
va aparte de esta lista. Se escribe siempre, porque un documento que
solo se redacta de vez en cuando se redacta mal, y porque es mejor tenerlo y no usarlo que
necesitarlo y no tenerlo. Usa `templates/handoff.md`.

## Cómo se declara

Primera línea del `overrides.md` del proyecto:

```markdown
**Modalidad:** desarrollo con alcance definido · TDR en `discovery/2-analysis/inputs/inherited/` ·
chequeo de entrada en `discovery/2-analysis/checkpoint/entry-check.md`
```

Si la modalidad no está declarada, el arnés asume discovery y va a exigir todos los
artefactos mínimos de las tres etapas.
