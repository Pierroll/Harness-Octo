---
name: estimation
description: >
  Produce la estimación del proyecto y el cronograma: talla y esfuerzo por módulo, y su
  traducción a fechas. Usar cuando el usuario diga "estima el proyecto", "tallas por
  módulo", "cuánto pesa cada módulo", "propuesta económica", "arma el cronograma", o al
  final de la etapa 3 con la arquitectura y las pantallas cerradas. CORRE CON MODELO
  FRONTERA (Opus/Fable): la estimación fija el precio del contrato; si la sesión no
  está en uno, dilo antes de empezar.
---

# Estimation — esfuerzo, precio y cronograma

**Regla de modelo:** modelo más capaz disponible, igual que `technical-design`. Una
estimación 30% corta se come el margen del proyecto entero.

## Los dos momentos

**Modo grueso, en la etapa 2.** Corre sobre el RF detallado, apenas queda cerrado. No
produce cifras para el cliente: produce el **cronograma tentativo** del proyecto, con fecha
de inicio y qué se entrega en cada tramo. El cliente necesita saber cuándo, no cuántos días
tiene cada tarea.

**Modo refinado, en la etapa 3.** Corre después de la arquitectura y de las pantallas, que
son lo que más mueve el número. Produce la estimación por módulo y **actualiza el
cronograma** contra ella.

Ese segundo cronograma se sincera. Si al levantar las pantallas aparecieron trabajos que
mueven la fecha, se dice en el momento: "la entrega de seis meses se corre tres semanas,
se lo adelantamos ahora y vamos a intentar recuperarlas". Un cronograma que se corrige al
final es un cronograma que nadie creyó nunca.

Entradas: `architecture.md` (módulos), RF detallado (alcance por módulo),
`integrations.md` y `gaps-and-risks.md` (los multiplicadores de riesgo), el inventario de
pantallas (`3-design/outputs/screen-inventory.md`) y los mockups aprobados de
`skills/ui-design/`, el registro de `skills/team-review/` (lo que el equipo dijo
que ya existe y lo que es más caro de lo que parece), y el backlog (`backlog.md`).

**Orden:** la estimación va después de la arquitectura y después de las pantallas. Las dos
mueven el número, y estimar antes de tenerlas es estimar un producto que todavía no
existe. Si alguno de los dos falta, dilo antes de producir cifras. Si lo que falta es el
registro de la revisión con el equipo, la estimación se corre igual y anota en
`gaps-and-risks.md` el riesgo "estimación sin revisión del equipo que construye", con
impacto alto; las tallas se ajustan cuando la revisión ocurra.

## Nuestras tallas (estándar, no se cambian por proyecto)

| Talla | Días de esfuerzo |
|---|---|
| XS | 0.2 |
| S | 0.5 |
| M | 1.5 |
| L | 3 |
| XL | 7 |

1 día = 8 horas. Capacidad por integrante: 4.5 días por semana.

## Output — `discovery/3-design/outputs/estimation.md`

1. **Por módulo:** features del backlog con talla cada una, subtotal en días y el
   supuesto que sostiene la talla ("asume que la fuente X tiene API; si no, sube a L").
2. **Riesgo aplicado:** los módulos con riesgo alto en `gaps-and-risks.md` llevan el ajuste
   explícito, no un colchón general escondido.
3. **Totales:** días → semanas-persona → equipo propuesto y duración.
4. **Cronograma:** qué se entrega en cada tramo, con fechas, y la holgura declarada. Si es
   el modo refinado, contra el tentativo de la etapa 2, con las diferencias explicadas. Va
   sobre `templates/implementation-schedule.md`, y **cada tarea cita el requisito que
   implementa**. Es lo que permite verificar en un minuto que ningún requisito quedó sin
   tarea y que ninguna tarea construye algo que nadie pidió.
5. **Precio por módulo:** si el PM da la tarifa, calcula; si no, deja el esfuerzo listo
   para que el PM aplique tarifa. Nunca inventes tarifas.

El cronograma que se lleva el cliente (tentativo en la etapa 2, de implementación en la 3)
sale además en `.xlsx` en el `outputs/ready-to-take/` de su etapa, con
`skills/ready-to-take/`.

**Los hitos de pago no salen de este skill.** Nacen en la propuesta comercial firmada, antes
de la etapa 1. En discovery y discovery + PoC la regla es fija: mitad al inicio y mitad a
la entrega. En desarrollo con alcance definido el esquema se negocia por proyecto con el
área comercial, y mientras no esté cerrado la columna de hito de `backlog.md` queda vacía
a propósito. Este skill produce esfuerzo y cronograma, y lo dice.

## Reglas

- Cada talla se justifica contra el RF, no contra la intuición. Una feature sin RF
  detrás no se estima: vuelve al backlog como pendiente de análisis.
- La desviación entre estimado y real se mide por tarea: estima en las tallas estándar
  para que la comparación sea posible.
- Los supuestos de estimación van escritos. Una estimación sin supuestos no pasa el
  checkpoint de la etapa 3.

## Modos de fallo

- **Presión por llegar a un número que cierre la venta:** tu trabajo es el esfuerzo
  real. Si el PM necesita bajar el precio, que recorte alcance (módulos fuera), no que
  la talla mienta. Dilo así de claro.
- **Módulo sin información suficiente:** talla con rango (M-L) + qué pendiente lo
  cierra. Un rango honesto es mejor que un número inventado.
- **La suma no encaja con la expectativa del cliente registrada en el kickoff:**
  señálalo de inmediato al PM; esa conversación es del Líder, no del documento.
