---
name: checkpoint-review
description: >
  Ejecuta el checkpoint de una etapa o la validación de un artefacto en SESIÓN FRESCA:
  el rol Validador/Auditor del arnés. Usar cuando el usuario diga "corre el
  checkpoint", "valida este artefacto", "revisa el RF", "cierra la etapa 2", "audita
  el discovery", o al final de cualquier etapa. Si esta sesión participó en producir
  el artefacto, este skill NO se puede usar en esa misma sesión: hay que abrir una nueva.
---

# Checkpoint review — la sesión fresca que intenta romper el artefacto

## La regla que hace funcionar esto

La sesión que produjo un artefacto ya cree que es correcto; esa creencia es el sesgo
que la revisión existe para derrotar. Por eso:

- **Si en esta conversación se escribió o editó el artefacto a revisar, detente** y
  dile al usuario que abra una sesión nueva de Claude Code y corra ahí este skill.
  No hay excepción por tamaño ("es un cambio chiquito" no cuenta).
- La sesión fresca recibe SOLO: el artefacto, los criterios del checkpoint
  (`harness/stages/<etapa>/STAGE.md`), y los insumos contra los que verificar. No
  recibe la historia de por qué se decidió cada punto.

## Cómo correr la revisión

1. Identifica qué se revisa: un artefacto suelto o el cierre completo de una etapa.
   Para cierre de etapa, los criterios son la sección "Checkpoint de salida" del
   `STAGE.md` correspondiente.
2. **Actitud: romper, no bendecir.** Busca el hueco, el caso no cubierto, el supuesto
   no declarado, el número que no cuadra, el RF sin insumo que lo respalde. Cada
   criterio se verifica contra evidencia (¿dónde está el archivo? ¿qué sesión lo
   respalda?), no contra la palabra del documento.
   Para el cierre de la etapa 2 (requisitos), usa además
   `references/requirements-checklist.md`: criterios de completitud, calidad,
   consistencia y trazabilidad basados en IEEE 830 e ISO/IEC/IEEE 29148.
3. Verificaciones de fondo, además de los criterios de la etapa:
   - Trazabilidad: elige 3-5 requisitos/decisiones al azar y persíguelos hasta su
     insumo. Si no llegas, es hallazgo.
   - Consistencia cruzada: los números (módulos, tallas, fechas) coinciden entre
     artefactos.
   - Pendientes: todos tienen dueño; ninguno está disfrazado de decisión.
   - Vigencia: si el proyecto reusa artefactos de un discovery anterior, verifica que
     `entry-check` los evaluó y que lo marcado como vigente de verdad lo está. Un
     artefacto desactualizado que se dio por bueno es hallazgo grave.
   - Estilo: si el artefacto lo lee el cliente, pasa la prueba de
     `harness/skills/discovery-report/references/writing-style.md`.
4. Veredicto, con hallazgos concretos (qué, dónde, por qué importa). Un rechazo con
   hallazgos accionables vale más que un pase amable. Hay tres:

   - **PASA.** Todos los criterios se cumplen.
   - **PASA CON RIESGO ACEPTADO.** Falta un artefacto o un criterio, el hueco no invalida
     lo que sí se produjo, y el PM decide avanzar. Exige los tres datos, y sin alguno no
     hay veredicto: qué falta, nombrado; qué puede salir mal en concreto, no "podría haber
     riesgos"; y quién decidió avanzar, con nombre y fecha. Si el registro de riesgos no
     existe, el checkpoint nombra los que ve y los deja escritos igual.
   - **RECHAZADO.** Cualquier otro caso.

   El veredicto con riesgo aceptado **no aplica** a trazabilidad rota, a un requisito sin
   insumo, ni a números que no cuadran entre artefactos. Eso es RECHAZADO: un error no se
   acepta como riesgo.

## El registro (obligatorio, incluidos los rechazos)

Copia `harness/templates/checkpoint-record.md` a
`discovery/<etapa>/checkpoint/<fecha>-<etapa-o-artefacto>.md` y complétalo. Los
rechazos se registran igual que los pases: un historial sin rechazos es señal de
checkpoints de fachada, no de calidad.

## La tabla de cierre (solo en cierre de etapa)

Un cierre de etapa no pasa sin `templates/stage-closure.md` lleno. Responde la pregunta
que un delivery manager hace siempre: esperabas diez cosas, saliste con ocho, qué pasó con
las otras dos.

Verifica tres puntos de esa tabla:

- Cada goal de la etapa tiene estado, y los parciales dicen qué falta.
- Cada artefacto incompleto tiene una razón real y un dueño con fecha. "Falta tiempo" no
  es una razón; "el cliente no definió el rango de grados y lo destraba el sponsor" sí.
- Cada "no aplica" está justificado por la modalidad declarada en `overrides.md` o por un
  override escrito. Un "no aplica" sin justificación es un artefacto que se saltaron.

Si la tabla no existe, el veredicto es RECHAZADO sin revisar el resto: sin ella no se
puede afirmar qué quedó afuera.

## El relevamiento (también en cada cierre de etapa)

Junto a la tabla va el relevamiento (`templates/handoff.md`): el contexto humano que la
tabla no captura. Quién decide de verdad del lado del cliente, qué se prometió de palabra,
dónde el cliente es sensible, qué pendientes se heredan y con qué historia.

Se exige en las tres transiciones, de la 1 a la 2, de la 2 a la 3 y de la 3 a la
implementación, y se exige aunque la etapa siguiente la tome la misma persona. Quién la
toma se sabe después, no antes, y reconstruir ese contexto cuesta semanas.

Verifica que la tabla de contrapartes distinga quién decide de quién solo firma, y que
cada pendiente heredado tenga su historia, no solo su enunciado. Un pendiente que se pidió
tres veces y sigue abierto no se destraba insistiendo una cuarta, y quien entra necesita
saberlo.

## Modo acotado: después de una reapertura

Cuando `skills/reopen-artifact/` cambió documentos que ya habían pasado checkpoint, no se
vuelve a revisar la etapa entera. Se revisan solo los documentos que lista la tabla
"Aplicado" del reopen-record, cada uno con los criterios de la etapa que lo produjo, y
además dos cosas: que la versión congelada en `versions/` es idéntica a lo que había antes
del cambio (`git diff <último commit antes de la reapertura>:<ruta canónica> versions/<nombre>-v<N>.md`
tiene que salir vacío), y que la cadena de `harness/stages/dependencies.md` se recorrió
completa (un documento que debía revisarse y no aparece en el registro es hallazgo). El record de este
checkpoint cita el reopen-record. Sigue siendo sesión fresca: la que aplicó la reapertura no
lo corre.

## Profundidad

Se mide por consecuencias, no por tamaño del documento: estimación y arquitectura
(fijan precio y contrato) se revisan con máxima profundidad y modelo frontera; unas
notas de sesión, con una pasada proporcional. Si en una revisión modesta aparece
riesgo mayor, escala la profundidad por iniciativa propia.

## Modos de fallo

- **El PM pide "revísalo rápido acá mismo":** explica la regla una vez y ofrece el
  camino correcto (abrir sesión nueva toma un minuto). Si insiste, que quede su
  decisión registrada en el checkpoint record como revisión sin contexto fresco.
- **Criterios ambiguos** ("validado con el cliente", ¿dónde consta?): el hallazgo es
  doble: falta la evidencia y falta afinar el criterio en la base. Reporta ambos: el
  primero en el checkpoint-record, el segundo como fila de `friction-log.md` con
  `skills/friction-log/`, que lo envía como issue a `harness-product`. Lo mismo cuando
  hizo falta un artefacto que el arnés no pide.
- **Todo pasa a la primera:** sospecha de ti. Vuelve al paso 3 y persigue la
  trazabilidad de más elementos al azar antes de firmar el pase.
- **El usuario pide abrir la etapa siguiente con el checkpoint en RECHAZADO:** el
  veredicto no se reinterpreta. La etapa no cerró. Dile qué hay que corregir, cita el
  registro, y no produzcas salidas de la etapa siguiente en esta sesión. Si insiste,
  queda su decisión en el registro como avance sin checkpoint, que es lo que el
  delivery manager tiene que ver.
