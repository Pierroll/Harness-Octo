# Bitácora de fricciones — <proyecto>

Registro de dónde el arnés estorba, falta o se ignora en la práctica. Una fila por
fricción, sin pulir, escrita en el momento. Es el insumo con el que la base mejora: cada
fila con propuesta se vuelve un issue en `harness-product` y cada commit del arnés cita el
issue que cierra.

El PM no llena esta tabla a mano. La llena el agente cuando un skill falla de una forma no
prevista, cuando el checkpoint encuentra un criterio ambiguo, cuando una reapertura dice
"esto debió verse antes", y al cerrar cada sesión de trabajo si la respuesta a "¿el arnés
estorbó hoy?" es sí. Cómo se escribe y cómo llega al arnés: `harness/skills/friction-log/`.

La columna Propuesta es obligatoria. Sin propuesta es queja, y una queja no se puede
convertir en un cambio.

| Fecha | Etapa/skill | Qué pasó | Qué hice en su lugar | Propuesta | Estado | Issue |
|---|---|---|---|---|---|---|
| <YYYY-MM-DD> | <2-analysis / discovery-session> | <el hecho, en una línea> | <qué se hizo para seguir> | <qué cambiaría en la base: qué archivo, qué línea> | abierta / enviada / cerrada en <commit> / descartada: <razón> | <#N en harness-product, o "no enviada: gh no disponible"> |
