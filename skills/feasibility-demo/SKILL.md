---
name: feasibility-demo
description: >
  Acota y registra una demostración de viabilidad para el cliente, en cualquiera de sus
  dos formas: prueba de concepto cuando hay que demostrar que técnicamente se puede, o
  mockups cuando hay que demostrar cómo se vería. Usar cuando el usuario diga "hagamos
  una PoC", "prueba de concepto", "unos mockups para el cliente", "hay que demostrar
  que esto se puede", "spike técnico", o cuando el discovery se apoya en un supuesto
  caro que nadie midió. Se estima y se factura como cualquier entregable.
---

# Feasibility demo — probarle algo al cliente sin construirle el producto

Produce `discovery/<etapa>/outputs/feasibility-<nombre>.md` a partir de
`templates/feasibility-record.md`.

## Las dos formas

Es un solo entregable con dos formas, según qué haya que demostrar.

**Prueba de concepto**, cuando lo que hay que probar es que técnicamente se puede. Se
construye lo mínimo que responde la pregunta y se corta ahí.

**Mockups**, cuando lo que hay que probar es cómo se vería, o cuando hay que confirmar que
entendimos el flujo. La afirmación que se pone a prueba no es técnica sino de
entendimiento: que el flujo que dibujamos es el que el usuario reconoce como suyo.

Las dos son opcionales. Las pide el proyecto, no el arnés.

## Lo que hay que entender antes de correr esto

La demostración la paga el cliente completa. Sirve a los dos lados, a nosotros para
probarnos que hay una solución viable y al cliente para ver algo, pero como se inició a
pedido suyo, la factura es suya.

Eso tiene tres consecuencias, y son la razón por la que este skill existe en vez de
dejarlo a criterio de cada quien.

**Va estimada y presupuestada como cualquier otro entregable.** No es trabajo interno
regalado ni un favor comercial.

**Tiene alcance cerrado por escrito, antes de empezar.** Sin esto una demostración se
convierte en construir el producto de a poquitos sin haberlo cotizado, que es la forma más
cara de perder un proyecto.

**Tiene una decisión atada al resultado, escrita antes de conocerlo.** Qué se construye si
la hipótesis se sostiene y cuál es el plan B si no. Escribir la decisión después es
acomodar la conclusión a lo que pasó.

## Cómo se corre

1. **Escribe la afirmación que se pone a prueba.** Una sola, y tiene que poder resultar
   falsa. "Se puede mantener una conversación por voz con menos de un segundo de latencia
   con el proveedor X" es una hipótesis. "Probar la integración" no lo es.
2. **Escribe qué resultado hay que traer.** El número medido o la evidencia concreta. Sin
   esto la demostración no termina nunca, porque siempre se puede seguir mejorando el resultado.
3. **Escribe qué NO incluye.** Lo excluido importa más que lo incluido.
4. **Fija el tiempo.** Días, no "lo que tome". Si el tiempo se acaba sin respuesta, eso
   también es un resultado: significa que la pregunta era más grande de lo que parecía y
   que el riesgo es mayor de lo que se creía.
5. **Escribe la decisión para los dos resultados posibles**, antes de empezar.
6. Al terminar, registra el resultado y qué features del backlog cambian, incluidas las
   que desaparecen.

## Que salga mal también vale lo que costó

Si la hipótesis no se sostiene, la demostración cumplió su función: evitó construir meses
sobre un supuesto falso. Eso se le dice al cliente con esas palabras, y el hito se factura
igual.

Un resultado negativo temprano es más barato que cualquier otra cosa que se pueda comprar
con ese dinero.

## Reglas

- Una demostración prueba una afirmación. Si hay tres afirmaciones que probar, son tres
  demostraciones con tres registros, no una grande.
- Lo que se construye en una demostración no es el producto. No se reusa el código sin
  revisarlo: una prueba de concepto se escribe para responder rápido, no para durar.
- Va en el plan del discovery con sus días y en el backlog con su talla, como cualquier
  otro entregable.

## Modos de fallo

- **El cliente pide "algo funcionando" sin acotar:** eso no es una demostración de
  viabilidad, es un piloto sin cotizar. Se acota antes de empezar o no se empieza.
- **La demostración funciona y el cliente quiere seguir construyendo encima:** es una
  conversación comercial, no técnica. El código de la prueba no es la base del producto y
  eso se dice antes, no después.
- **No hay nada medible que traer:** revisa la afirmación. Si no se puede medir ni mostrar,
  probablemente lo que falta es una sesión de discovery, no una demostración.
