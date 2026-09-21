# Mapa de procesos As-Is — <cliente> — <proceso>

Cómo trabaja hoy el cliente, etapa por etapa, con los tiempos que tarda cada una. Nace
tentativo en la etapa 1 con `skills/gap-analysis/`, sobre lo que trae la propuesta, y se
profundiza y valida con el cliente en la etapa 2.

Es la línea base contra la que se mide el To-Be. Sin As-Is no hay To-Be que prometer
nada, porque no hay contra qué comparar.

Estilo: ver `harness/skills/discovery-report/references/writing-style.md`.

**Fuente de verdad de este documento:** <qué material lo sostiene y quién lo validó. Los
diagramas que el cliente revisó, las sesiones donde se levantó, los formatos que se
recogieron. Un As-Is sin fuente declarada es un dibujo que alguien hizo de memoria.>

**Versión:** <N> · <YYYY-MM-DD> · reemplaza a `versions/as-is-v<N-1>.md`, o "primera" · qué cambió: <una línea> · qué cerró la anterior: <checkpoint o presentación al cliente, con fecha>
**Estado:** vigente / desactualizado desde <fecha y por qué> / reemplazado por <cuál>

## 1. Objetivo y alcance

<Qué proceso cubre este documento y hasta dónde llega. Si el cliente tiene varios procesos
y solo se relevó uno, se dice. Lo que queda fuera se nombra, para que nadie asuma que se
miró.>

## 2. Visión general del proceso

Las etapas del proceso, una línea cada una, en el orden en que ocurren. El lector tiene que
poder entender el ciclo completo sin bajar al detalle.

- **Etapa 1 — <nombre en el vocabulario del cliente>:** <qué pasa, en media línea>
- **Etapa N — <nombre>:** <qué pasa>

<Un párrafo que diga si son etapas encadenadas de un mismo proceso o flujos independientes,
y si hay un ciclo que se repite.>

## 3. Detalle por etapa

Una subsección por etapa. Cada etapa es un tramo de diagrama de flujo: los pasos numerados
son las cajas, cada decisión es un rombo con su rama Sí y su rama No, y la nota va aparte
para que no se confunda con un paso. La decisión no lleva número: va como bloque propio
entre el paso que la provoca y el que sigue, y la numeración continúa después. Cada rama es
un camino que el sistema va a tener que soportar.

### Etapa <N> — <nombre>

**Objetivo de la etapa:** <para qué existe, en una línea>

**Quién la ejecuta hoy:** <el rol, no la persona>

**Cuánto tarda:** <el SLA de la etapa: cuánto pasa desde que entra hasta que sale, y de eso
cuánto es trabajo y cuánto es espera. Si el cliente no lo sabe, se registra como pendiente
con dueño, no se estima.>

1. <paso>
2. <paso>

**Decisión — ¿<la pregunta que se decide>?**
- **Sí:** <qué pasa si sí, y a qué paso o etapa va>
- **No:** <qué pasa si no>

3. <paso>

**Nota As-Is:** <lo que ocurre de verdad y no está documentado como paso. Suele ser lo
más valioso del As-Is. Ejemplo del tipo de hallazgo: un paso que depende del criterio de
quien lo ejecuta y por eso cambia entre personas.>

## 4. Agrupaciones del proceso

Sección opcional. Va cuando varios pasos que están separados en el flujo responden en
realidad a un mismo acto de decisión del usuario, y por eso conviene tratarlos juntos en el
sistema.

| Agrupación | Etapa y momento | Qué la compone | Qué habilita |
|---|---|---|---|
| <nombre> | <cuándo ocurre> | <los pasos o documentos que se resuelven en un solo acto> | <qué desbloquea que ocurra> |

Es el tipo de estructura que aparece en procesos con mucho papel, donde el usuario firma
seis documentos en una sola sentada porque está tomando una sola decisión. Modelarla como
seis pasos separados multiplica la fricción sin ninguna razón.

## 5. Conexiones y ciclos entre etapas

La tabla más importante del documento y la que más se olvida. El flujo principal se ve en
la sección 2; en esta sección van los saltos, los retornos y las salidas.

| Origen | Destino | Condición de activación |
|---|---|---|
| <etapa> | <etapa, o "fin"> | <qué tiene que pasar para que el proceso tome este camino> |

Cada retorno es retrabajo, y el retrabajo es donde está el retorno del proyecto. Un flujo
que vuelve dos etapas atrás por una observación puntual y obliga a rehacer todo el trabajo
intermedio es el hallazgo que justifica presupuesto.

## 6. Puntos de contacto digitales

Dónde interviene un sistema en un proceso que por lo demás es manual. Es el inventario que
después decide qué integraciones hay que construir.

| Sistema | Etapa | Uso en el proceso actual |
|---|---|---|
| <nombre del sistema> | <en qué etapa entra> | <qué hace exactamente, y si el dato se vuelve a teclear en otro lado> |

## 7. Catálogo de formatos e instrumentos

Los documentos, formularios y planillas sobre los que se apoya el proceso, con qué datos
captura cada uno. En un proceso que trabaja en papel, este catálogo es el modelo de datos.

| Formato | Etapa | Datos principales que captura |
|---|---|---|
| <nombre tal como lo llama el cliente> | <dónde se usa> | <los campos, agrupados> |

Cuando el mismo dato aparece en varios formatos, se anota. La redundancia de captura es un
hallazgo por sí sola: mide cuánto esfuerzo se ahorra con captura única y cuántos errores de
transcripción explica.

## 8. Hallazgos y observaciones

<Lo que el relevamiento encontró y que el diagrama no muestra. Cada hallazgo con la sesión
o el documento del que sale.

Tipos que suelen aparecer: pasos que existen en la práctica y no en el proceso escrito,
decisiones que dependen del criterio de una persona, datos que se transcriben varias
veces, esperas que nadie mide, y erratas del material que el cliente entregó. Las erratas
se registran en esta sección y se avisan: un diagrama con una caja duplicada se arrastra a
todos los documentos que se construyan encima.>
