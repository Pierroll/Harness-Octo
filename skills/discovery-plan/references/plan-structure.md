# Estructura de referencia del plan de discovery (4 semanas)

Genérico, derivado de nuestros discoveries reales. Ajustar sesiones y frentes al
proyecto; mantener la forma: tabla con #, Actividad, Tipo, Fechas, agrupada por semana,
con leyenda al final.

| # | Actividad | Tipo | Fechas |
|---|---|---|---|
| **SEMANA 1: LEVANTAMIENTO PRESENCIAL** | | | |
| 1 | Viaje del equipo (si aplica) | Interna | día 1 |
| 2 | Kickoff del discovery | Conjunta | día 1 |
| 3 | Confirmación de accesos, insumos y logística | Conjunta | día 1 |
| 4 | Sesiones d1..d4 (una o dos por día, por frente) | Conjunta | días 1-4 |
| 5 | Observación en sitio del proceso real (por frente) | Conjunta | días 2-4 |
| 6 | Consolidación y transcripción diaria de sesiones | Interna | toda la semana |
| 7 | Inventario de campos de captura y validaciones | Interna | días 2-3 |
| 8 | Inventario de fuentes, reglas y tarifas | Interna | días 3-5 |
| 9 | Mapa de procesos As-Is v0.1 | Interna | días 4-5 |
| 10 | Avance de hallazgos de la semana | Interna | día 5 |
| 11 | Cierre de semana presencial con el cliente | Conjunta | día 5 |
| **SEMANA 2: LEVANTAMIENTO REMOTO Y ANÁLISIS TÉCNICO** | | | |
| 12 | Sesiones d5..d8 (frentes restantes) | Conjunta | días 6-10 |
| 13 | Reproducción de casos reales para validar lógica | Interna | días 6-9 |
| 14 | Clasificación de reglas: duras vs criterio | Interna | días 6-8 |
| 15 | Análisis de data histórica / suficiencia | Interna | días 8-10 |
| 16 | Prueba técnica de la integración más riesgosa | Interna | días 9-10 |
| 17 | Mapa de integraciones v0.1 · estimación preliminar | Interna | día 10 |
| 18 | Reunión semanal de seguimiento | Conjunta | día 10 |
| **SEMANA 3: ARQUITECTURA, DOCUMENTACIÓN Y VALIDACIÓN** | | | |
| 19 | RF light al cliente y negociación del alcance, requisito por requisito | Conjunta | días 11-12 |
| 20 | Decisión de integración por fuente: API o automatización | Interna | días 11-12 |
| 20b | Inventario de pantallas y flujos principales (UI/UX, en Figma) | Interna | días 11-13 |
| 20c | Arquitectura técnica de alto nivel | Interna | días 11-13 |
| 21 | Modelo de datos de alto nivel | Interna | días 12-13 |
| 22 | Matriz de roles y permisos | Interna | días 12-13 |
| 23 | Validación del flujo As-Is con el cliente | Conjunta | día 13 |
| 24 | Bolsa de llamadas cortas para dudas puntuales | Conjunta | toda la semana |
| 25 | RF detallado sobre el alcance que quedó dentro, y entendimiento para diseño | Interna | días 11-14 |
| 26 | Registro de riesgos por módulo con mitigación | Interna | días 14-15 |
| 26b | Revisión con el equipo que va a construir (`skills/team-review/`) | Interna | día 14 |
| 27 | Estimación de esfuerzo refinada por módulo, con lo que dijo el equipo | Interna | días 14-15 |
| 28 | Reunión semanal de seguimiento | Conjunta | día 15 |
| **SEMANA 4: INFORME FINAL Y PRESENTACIÓN** | | | |
| 29 | Redacción del informe de discovery | Interna | días 16-18 |
| 30 | Cronograma del proyecto completo con dependencias | Interna | días 16-17 |
| 31 | Propuesta económica por módulo | Interna | días 17-18 |
| 31b | Relevamiento de cierre y tabla de cierre de etapa | Interna | día 18 |
| 32 | Revisión interna de calidad (checkpoint sesión fresca) | Interna | día 18 |
| 33 | Envío del informe al cliente para lectura previa | Interna | día 18 |
| 34 | Presentación de resultados y entrega formal | Conjunta | día 20 |

## Leyenda

- **Conjunta** — actividad con el cliente.
- **Interna** — trabajo interno de Codeable Labs.
- **No laborable** — feriado; se inserta como fila propia cuando cae dentro del rango.

## Notas

- Los feriados del país del cliente se revisan cada vez que cambia la fecha de inicio.
- La fila 32 es obligatoria en cualquier variante: el informe no se envía sin pasar el
  checkpoint interno.
- El orden interno de las semanas 3 y 4 sigue el de `stages/3-design/STAGE.md`: el paso de
  UI/UX abre, la arquitectura y el modelo de datos avanzan en paralelo, y la revisión con
  el equipo (`skills/team-review/`) va después de las dos, dentro del paso de estimación
  refinada y siempre antes de cerrar el número.

## Variante de 6 semanas: discovery con demostración de viabilidad

Aplica cuando el proyecto se apoya en un supuesto caro que nadie midió, o cuando el
cliente necesita ver algo antes de decidir. La demostración la produce
`skills/feasibility-demo/` y la paga el cliente completa.

Sobre la estructura de 4 semanas se insertan dos, después de la semana 1:

| # | Actividad | Tipo | Cuándo |
|---|---|---|---|
| **SEMANA 2: ACOTAR Y ARRANCAR LA DEMOSTRACIÓN** | | | |
| A1 | Definir la afirmación a probar, su alcance cerrado y la decisión atada al resultado | Interna | día 6 |
| A2 | Validar el alcance de la demostración con el cliente | Conjunta | día 6 |
| A3 | Construcción de la prueba de concepto, o producción de los mockups | Interna | días 7-10 |
| **SEMANA 3: RESULTADO Y DECISIÓN** | | | |
| A4 | Medición y registro del resultado | Interna | días 11-12 |
| A5 | Presentación del resultado al cliente, sea cual sea | Conjunta | día 13 |
| A6 | Ajuste del alcance y del backlog según lo que se decidió | Interna | días 14-15 |

Después siguen las semanas 2, 3 y 4 de la estructura estándar, corridas dos semanas.

Dos reglas de esta variante:

- **La demostración va temprano, no al final.** Existe para matar o confirmar un supuesto
  antes de que el resto del plan se apoye en él. Si va al final, el plan ya se comprometió
  sobre algo sin verificar.
- **El hito se factura aunque la hipótesis no se sostenga.** Ese resultado vale lo que
  costó: evita construir meses sobre un supuesto falso. Eso se le dice al cliente al
  acordar el alcance, no cuando llega el resultado.
