# Cronograma de implementación — <proyecto>

Qué se construye, en qué orden, con quién y para cuándo. Lo produce `skills/estimation/`
sobre la estimación refinada, en la etapa 3. La versión tentativa sale en la etapa 2, sobre
el RF detallado.

**Este documento no lleva dinero.** Ni tarifa, ni precio, ni hitos de pago. Lleva esfuerzo,
fechas y dedicación. El monto vive en la propuesta comercial y no circula por las etapas 1
a 3.

Estilo: ver `harness/skills/discovery-report/references/writing-style.md`.

**Versión:** <N> · <YYYY-MM-DD> · reemplaza a `versions/<nombre>-v<N-1>.md`, o "primera" · qué cambió: <una línea> · qué cerró la anterior: <checkpoint o presentación al cliente, con fecha>
**Estado:** vigente / desactualizado desde <fecha y por qué>
**Construido sobre:** <la versión de la estimación y del catálogo de requisitos>

## 1. Hitos

Los puntos donde el proyecto cambia de estado y alguien de los dos lados tiene que dar una
conformidad. Un cronograma sin hitos es una lista de tareas.

| Hito | Fecha | Entregable | Responsable |
|---|---|---|---|
| H0 | <fecha> | <qué queda entregado> | <quién responde, de los dos lados cuando es conjunto> |

El responsable se escribe conjunto cuando lo es. Un hito que depende de que el cliente
habilite un acceso y de que nosotros entreguemos algo tiene dos nombres, y ponerle uno solo
es lo que hace que la fecha se pase sin que nadie lo haya visto venir.

## 2. El equipo asignado

| Rol | Dedicación | Frente principal |
|---|---|---|
| <rol> | full time / fractional | <de qué responde en el proyecto> |

Sin equipo asignado no hay capacidad, y sin capacidad el cronograma es un dibujo. La
dedicación importa tanto como el rol: dos personas fractional no son una full time, y el
cronograma que las trata igual se pasa.

## 3. Las contrapartes del cliente

| Persona | Rol | Responsabilidad en el proyecto |
|---|---|---|
| <nombre> | <cargo> | <de qué responde: valida, habilita accesos, convoca a las áreas, prueba> |

Cada frente del cronograma que depende del cliente tiene un nombre en esta tabla. Un
frente sin contraparte nombrada se bloquea y nadie sabe a quién llamar.

## 4. El detalle por etapa

Una sección por etapa del desarrollo, con sus tareas. **Cada tarea lleva el identificador
del requisito que implementa.**

### Etapa <N> — <nombre> (<duración>)

| Tarea | Requisito | Responsable | <columnas de tiempo> |
|---|---|---|---|
| <qué se construye> | <RF-XXX-000, o los que cubre> | <rol> | |

Esa columna de requisito es lo que vuelve auditable la estimación. Con ella se puede
verificar dos condiciones en un minuto: que ningún requisito del catálogo quedó sin tarea
que lo construya, y que ninguna tarea está construyendo algo que nadie pidió. Sin ella, el
cronograma y el catálogo son dos documentos que nadie vuelve a cruzar.

Las tareas que no implementan un requisito (levantar ambientes, configurar el pipeline,
capacitar al equipo del cliente) llevan el guion en esa columna. Son pocas y deben poder
contarse.

## 5. La reserva para requerimientos emergentes

Un tramo transversal, declarado desde el inicio, para lo que no se previó. **Se activa con
aprobación escrita**, no por acumulación.

Existe porque en todo proyecto aparecen requerimientos que el discovery no vio, y la
alternativa a tenerla declarada es que entren por la puerta de atrás comiéndose el
cronograma de lo que sí estaba comprometido.

## 6. El cierre

Las dos últimas etapas se escriben aunque parezcan obvias, porque son las que se olvidan al
estimar y las que definen cuándo termina de verdad el compromiso:

**El piloto**, con su criterio de éxito medible. No "que funcione": qué tiene que haber
pasado en producción para darlo por bueno, con número y plazo.

**El hypercare**, con su fecha de cierre y la transferencia al equipo que va a operar la
solución. La transferencia es una tarea del cronograma con responsable y entregable, no una
intención.

## 7. Supuestos que sostienen estas fechas

<Lo que tiene que ser cierto para que el cronograma se cumpla. Accesos habilitados,
disponibilidad de las contrapartes, decisiones del cliente pendientes, dependencias de
terceros. Cada uno con quién lo destraba.

Un cronograma cuyos supuestos no están escritos se incumple y nadie sabe por qué.>
