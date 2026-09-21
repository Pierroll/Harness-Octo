# Temas por entender, supuestos y riesgos, y temas por negociar — <cliente>

Documento vivo. Nace antes del kickoff con lo que sale de la propuesta y de las
conversaciones comerciales, y crece en cada sesión. No se congela: cuando aparece
información nueva se actualiza en este documento y se versiona en git.

**Versión:** <N> · <YYYY-MM-DD> · origen: <kickoff / d3 / llamada corta> · reemplaza a `versions/gaps-and-risks-v<N-1>.md`, o "primera" · qué cambió: <una línea> · qué cerró la anterior: <checkpoint o presentación al cliente, con fecha>

Mientras el documento no haya pasado checkpoint, se edita en el lugar y no se abre versión
nueva. Ver `harness/skills/reopen-artifact/`.

## Temas por entender

Un tema es un frente completo a explorar, no un dato puntual. Un dato puntual que falta
es un pendiente y va en las notas de la sesión que lo destapó.

| Tema | Qué sabemos | Qué falta | Sesión asignada |
|---|---|---|---|
| <tema> | <lo que ya sacamos de la propuesta o de las conversaciones> | <la pregunta que hay que responder> | <d2 / por asignar / fuera de alcance> |

**Regla del checkpoint de la etapa 1:** ningún tema queda sin sesión asignada. Si un tema
no entra en el discovery, se declara en esta tabla como fuera de alcance con una línea que
diga por qué, y eso se le comunica al cliente. Un tema sin sesión y sin declaración es un
hueco que va a aparecer en la etapa 4.

## Supuestos y riesgos

Un solo registro para todo el proyecto. Se abre en la etapa 1, se valida en la 2 y se
refina con el detalle técnico en la 3. No se crea un registro nuevo en cada etapa: se
refina este.

La columna de estado es la que hace que el registro sirva. En la etapa 1 todo nace como
`hipótesis`, porque todavía no se habló con nadie. Después de la sesión que lo valida, pasa
a `confirmado` o `descartado`, y recién ahí tiene sentido pedirle mitigación y dueño.

| ID | Capa | Supuesto o riesgo | Origen | Estado | Sesión que lo valida | Probabilidad | Qué pasa si ocurre | Mitigación | Dueño |
|---|---|---|---|---|---|---|---|---|---|
| R-01 | <ver la lista de abajo> | <qué puede salir mal, o qué estamos dando por cierto> | negocio / técnico / comercial | hipótesis / confirmado / descartado / mitigado / ocurrió | <d3 / kickoff> | alta / media / baja | <el costo si se materializa> | <vacío hasta que se confirme> | <vacío hasta que se confirme> |

**La capa dice dónde se materializa el riesgo**, y es lo que hace legible una tabla de
veinticinco filas. El origen dice de qué conversación salió; la capa dice qué parte de la
solución se rompe. Un proyecto usa las que le apliquen:

proceso operativo · experiencia de usuario · reglas y evaluación · integraciones externas ·
capa de integración con el sistema del cliente · sistema core del cliente · datos ·
infraestructura y seguridad · cumplimiento normativo

Son las mismas bandas con las que se dibuja la arquitectura en `skills/technical-design/`.
Que se llamen igual permite mirar el diagrama y la tabla al mismo tiempo y ver qué banda
concentra el riesgo.

**Regla del checkpoint de la etapa 1:** ningún supuesto queda sin la sesión que lo va a
validar. Un supuesto sin confirmar no lleva mitigación: un plan de mitigación sobre algo
que nadie confirmó es teatro.

**Regla del checkpoint de la etapa 2:** ningún riesgo confirmado de probabilidad alta queda
sin mitigación concreta y sin dueño. Las dos se exigen recién en este punto, porque las
sesiones ya ocurrieron.

### Cómo evoluciona un riesgo entre etapas

Un mismo riesgo se ve distinto según cuánto se sabe. En la semana 1 se registra al nivel
que se puede ver; en diseño técnico se le agrega la forma concreta. Es la misma fila, no
una nueva.

Ejemplo real:

- Semana 1: no está definido si los estudiantes son menores de edad. Si lo son, cambia qué
  datos podemos guardar y dónde.
- Diseño técnico: el proveedor de streaming tiene su infraestructura en Europa y sus
  términos no permiten menores. Si el público incluye menores, hay que cambiar de proveedor
  o alojar en otra región.

## Temas por negociar

Lo que va a haber que acordar con el cliente porque toca alcance, plazo, costo o
responsabilidad de su lado. No se resuelve con información sino con una decisión, y por eso
no lleva sesión asignada sino dueño de cada lado y momento en que se pone sobre la mesa.

Ejemplos de la operación real: quién paga el acceso a un proveedor de datos, hasta dónde
llega el soporte del proveedor de una herramienta que el cliente ya tiene, qué pasa si un
área no libera a su gente para las sesiones, quién asume el costo si una integración
resulta más cara de lo que se estimó.

| Tema | Qué hay que acordar | Quién decide de su lado | Quién decide del nuestro | Cuándo se pone sobre la mesa |
|---|---|---|---|---|
| <tema> | <la decisión concreta que hace falta> | <nombre y cargo> | <PM / dirección comercial> | <kickoff / d3 / negociación de alcance> |

**Regla del checkpoint de la etapa 1:** ningún tema por negociar queda sin dueño de los dos
lados. Un tema por negociar que llega a la negociación de alcance sin preparación convierte
la reunión más cara del discovery en una improvisación.

## Supuestos que sostienen este documento

<Lo que estamos dando por cierto sin haberlo confirmado. Cada uno con quién lo confirma.
Un supuesto que se cae convierte varios temas en riesgos.>
