---
name: discovery-plan
description: >
  Genera el plan del discovery con fechas: el cronograma (Gantt en tabla markdown) de
  las semanas de discovery, distinguiendo actividades conjuntas con el cliente y
  trabajo interno. Usar cuando el usuario diga "arma el plan del discovery", "genera
  el gantt", "cronograma del discovery", "planifica las 4 semanas", o al cerrar el
  kickoff cuando ya hay agenda de sesiones. La estructura es nuestra plantilla propia,
  armada con nuestra experiencia; no sigue un framework externo.
---

# Discovery plan — el cronograma del discovery

Produce `discovery/1-planning/outputs/discovery-plan.md`: una tabla de actividades por
semana con tipo (Conjunta / Interna / No laborable) y fechas.

## Estructura estándar (discovery de 4 semanas)

La forma que ya usamos y que funciona. Ver `references/plan-structure.md` para el
detalle por semana:

1. **Semana 1 — Levantamiento presencial:** kickoff, sesiones d1-d4, observación en
   sitio, consolidación diaria interna, primeros inventarios, mapa As-Is v0.1.
2. **Semana 2 — Levantamiento remoto y análisis técnico:** sesiones d5-d8, validación
   técnica interna (reproducir casos reales, clasificar reglas, probar integraciones),
   estimación preliminar.
3. **Semana 3 — Arquitectura, documentación y validación:** decisiones de integración,
   arquitectura, modelo de datos, RF de alto nivel, riesgos, estimación, validación
   As-Is con el cliente, bolsa de llamadas cortas.
4. **Semana 4 — Informe final y presentación:** redacción del informe, cronograma del
   proyecto completo, propuesta económica, revisión interna de calidad, envío previo,
   presentación formal.

La variante corta (3 días u otra duración declarada en `overrides.md` del proyecto)
comprime las mismas fases; no elimina el cierre con informe ni los checkpoints.

La variante de 6 semanas suma una demostración de viabilidad (prueba de concepto o
mockups) y va detallada en `references/plan-structure.md`. En **desarrollo con alcance
definido** el discovery dura una o dos semanas y no produce catálogo completo de
requisitos; ver `stages/modalities.md`.

## Los tres inputs

El plan no sale solo de la lista de sesiones. Ocupa tres insumos:

1. **La propuesta.** Lo que promete acota lo que hay que cubrir en las semanas.
2. **La lista de temas por entender** (`gaps-and-risks.md`, de `skills/gap-analysis/`).
   Es lo que define cuántas sesiones hacen falta y de qué.
3. **El equipo asignado y su capacidad.** Sin equipo no hay capacidad, y un cronograma sin
   capacidad detrás es un dibujo. Si el equipo no está definido, dilo antes de poner
   fechas.

**Cada tema de esa lista tiene que quedar asignado a una actividad del plan, o declarado
por escrito como fuera del alcance del discovery.** Un tema que no aparece en el
cronograma y tampoco está declarado fuera es un hueco que va a reaparecer en la etapa 4.

## Cada sesión lleva entregable y compromiso

Una sesión del cronograma no es un bloque de tiempo: es un entregable con un compromiso de
cada lado. Qué sale de esa reunión (un inventario, un proceso mapeado, una decisión), qué
tiene que traer el cliente para que ocurra, y qué llevamos nosotros.

Escrito así, el cronograma deja de ser una lista de reuniones y pasa a ser algo que se
puede reclamar. Y es lo que permite estimar la duración real del discovery, porque un
entregable se puede dimensionar y una reunión no.

## El plan no lleva números de dinero

El margen vive en la propuesta comercial y lo maneja la dirección comercial. Al equipo la
propuesta le llega sin el monto, así que quien corre el arnés nunca ve precio ni margen.
Calcularlos es otro proceso y no pasa por el arnés.

## Cómo generarlo

El camino normal tiene dos pasadas, porque el calendario de sesiones no existe antes del
kickoff.

**Antes del kickoff.** Genera el plan con días relativos (día 1, día 2) y márcalo en la
primera línea como `borrador hasta confirmar agenda`. Sus inputs son la propuesta y la
lista de temas. Sirve para conversar sobre forma y duración, no para comprometer fechas.

**Después del kickoff**, con la lista de sesiones ya con dueños:

1. Toma la fecha de inicio y la lista de sesiones (`discovery/1-planning/outputs/`, generada por
   `kickoff-discovery` en su momento 2).
2. **Revisa los feriados del país del cliente** en el rango de fechas y márcalos como No
   laborable. Este es el error clásico: un plan que cae en feriado pierde credibilidad en
   la primera reunión.
3. Distribuye: cada sesión conjunta arrastra su trabajo interno (consolidación,
   inventarios) en los días siguientes. El trabajo interno de cierre de semana incluye
   siempre el avance de hallazgos.
4. Verifica la cobertura de temas: ninguno sin actividad asignada.
5. Cierra cada semana con la reunión de seguimiento conjunta.
6. Formato: tabla markdown como la de `references/plan-structure.md`, con leyenda.
7. La versión que se lleva el cliente es el `.xlsx` en
   `discovery/1-planning/outputs/ready-to-take/`, generado con `skills/ready-to-take/`.
   Un gantt en markdown no se entrega.

## Modos de fallo

- **No hay lista de temas:** corre primero `skills/gap-analysis/`. Un plan armado solo
  sobre la propuesta reparte días sin saber qué hay que averiguar.
- **El cliente cambió la fecha de inicio:** regenera el plan completo (los feriados
  cambian), no corras las fechas a mano.
- **Más frentes que días:** no comprimas metiendo dos sesiones conjuntas pesadas el mismo
  día; propone al PM extender la semana o priorizar frentes. Los temas que queden fuera se
  declaran como tales, no se dejan sin mencionar.
- **El proyecto necesita una demostración de viabilidad:** usa la variante de 6 semanas de
  `references/plan-structure.md`. La prueba de concepto va temprano, no al final: existe
  para matar o confirmar un supuesto antes de que el resto del plan se apoye en él.
