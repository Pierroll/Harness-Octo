# Lo que sigue (fases 5 y 6, fuera del build inicial)

## Piloto: back test sobre proyectos ya entregados

No hace falta esperar un proyecto nuevo. Tenemos los insumos de discoveries que ya
entregamos, y correr el arnés sobre ellos permite contrastar lo que produce contra lo que
de verdad se entregó. Eso es el back test y es lo que se hace primero.

**Candidatos:** Luminous y Darío Reportería. Entre dos y tres corridas.
**Fecha:** viernes 28 de agosto de 2026, con revisión de Deyvi y Paulo.
**Pendiente:** confirmar con Paulo si la documentación de Darío Reportería está completa;
faltaban piezas cuando se pidió.

Pasos por cada corrida:

1. Instanciar el repo de discovery desde `project-template/` (instrucciones en README).
2. Cargar los insumos reales del proyecto en `discovery/1-planning/inputs/`.
3. Correr el flujo etapa por etapa haciendo de PM, sin completar a mano lo que el arnés no
   saque solo.
4. Dejar que `skills/friction-log/` llene el `friction-log.md` del proyecto y abra los
   issues en `harness-product`.
5. Ajustar base y skills con lo encontrado antes de mostrarlo a los PMs.

### Qué cuenta como pasar el back test

Se define antes de correrlo, no después de ver el resultado. Lo mide el PM que hizo ese
discovery de verdad, no quien corrió el arnés, y son tres preguntas:

1. **¿Se parece a lo que él hubiera producido?** No idéntico: reconocible como el mismo
   trabajo. Si el documento se lee como salida de IA y no como algo con criterio detrás,
   no pasa.
2. **¿En cuánto tiempo lo hubiera hecho él?** Ese número contra el tiempo de la corrida es
   la única medida de ahorro que tenemos hoy.
3. **¿Qué salió mal o de más?** Lo que el arnés inventó, lo que se saltó y lo que ordenó al
   revés. Cada uno entra a la bitácora de fricciones con el cambio que dispara.

Lo que salga del back test se aplica a la base antes del entrenamiento con los PMs.

## Publicación

- Subir el repo a nuestro GitHub.
- Doc de adopción: que un PM arranque un discovery sin acompañamiento.
- Entrenamiento con los PMs y selección de los dos discoveries del piloto formal.

## Verificación de adopción real

Un proyecto cuenta como adoptado solo si: los artefactos de memoria existen y se usan,
el backlog refleja el estado real, los checkpoints dejan registro (incluidos rechazos),
y el esfuerzo real se registra por tarea.

## El loop, diferido a propósito

En la revisión del arnés salió la idea de un lazo agéntico que no pare hasta tener lo
necesario, sin aprobación humana entre etapas. Se difiere por decisión, no por olvido.

Primero se afina el proceso con aprobación humana entre etapas y se genera confianza en
los artefactos que produce. Automatizar un proceso que todavía cambia cada semana congela
los errores en vez de resolverlos. El loop entra cuando el proceso deje de cambiar.

## Más adelante

- `/design-sync` de Claude Code a Claude Design, como paso opcional después del 9 de
  `skills/ui-design/`: sube el design system del cliente para que diseño lo continúe ahí.
  Solo si un cliente o el equipo de diseño lo pide; Claude Design no exporta a Figma.
- Etapas 4 a 6 del ciclo (Implementación, Pruebas, Mantenimiento) sobre esta misma base.
- Subagentes para Validador/Auditor, solo si el piloto muestra que el paso manual de
  abrir la sesión fresca se está saltando.
- Plugin de Claude Code como mecanismo de instalación, cuando el arnés se estabilice.
- Automatización total del viaje del transcript (watcher de Drive), si el paso
  semiautomático de `import-transcript` queda corto.
