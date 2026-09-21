# Overrides: qué puede cambiar un proyecto y qué no

La base de este arnés es idéntica en todos los proyectos. Cada proyecto declara únicamente
sus diferencias en el `overrides.md` de su repo de discovery. Un override extiende la
base; nunca la reemplaza ni la desactiva.

## Lo que cada proyecto declara

- **Modalidad de entrada:** cuál de las tres formas de `stages/modalities.md` aplica.
  Va en la primera línea del `overrides.md`. Si no se declara, el arnés asume discovery.
- **Contexto de negocio:** industria, vocabulario del dominio, qué hace el cliente.
- **Duración y forma del discovery:** 4 semanas presencial y remoto, 6 semanas con PoC,
  1 o 2 semanas en desarrollo con alcance definido, 3 días, o lo que la propuesta diga. La
  variante corta puede fusionar sesiones.
- **Hasta dónde llega el discovery:** puede cerrar en el catálogo de requisitos detallados
  o extenderse hasta la entrega de diseño. Lo define lo que compró el cliente.
- **Lista de sesiones:** qué frentes aplican (negocio, finanzas, técnico, infraestructura,
  multi-empresa) y cuáles no.
- **Entregables adicionales:** un proyecto puede sumar artefactos que la base no exige,
  como una demostración de viabilidad o entregables que el cliente pida por contrato. Sumar
  sí; restar los mínimos no.
- **Restricciones del cliente:** stack impuesto, hosting, compliance, idioma de los
  entregables si no es español.
- **Ceremonias propias:** reuniones de seguimiento extra, formatos de reporte que el
  cliente exige.
- **Herramientas del proyecto:** dónde está el tablero, qué canal de Slack, qué carpeta de
  Drive.

## La base, igual en todos los proyectos

- **Que ninguna etapa se dé por cumplida sin sus artefactos.** Esto reemplaza a la vieja
  regla de "las tres etapas y su orden". Un proyecto puede entrar por la etapa 2 si las
  entradas de la 1 ya están satisfechas por un discovery anterior o por la propuesta, y eso
  se demuestra con `skills/entry-check/`. Lo que no se puede es dar una etapa por cumplida
  sin verificar que sus entradas existen y siguen vigentes.
- Los artefactos mínimos de cada etapa (`stages/*/CONTRACT.md`), salvo los que una modalidad
  declare no aplicables, con su justificación en la tabla de cierre.
- Los checkpoints en sesión fresca y su registro, incluidos los rechazos.
- La regla de no inventar: extraer de insumos, declarar pendientes.
- Un solo registro de riesgos por proyecto, abierto en la etapa 1.
- El backlog en `backlog.md` con las tallas estándar. Si el cliente vuelve por una
  fase nueva, el mismo archivo del proyecto anterior.
- El estilo human-written de los entregables.

## Sobre entrar por una etapa que no es la primera

Entrar por la etapa 2 o la 3 es reconocer trabajo que ya se hizo.

Una etapa no necesita que la anterior se haya corrido. Necesita los artefactos que la
anterior produce. Si ya existen porque los produjo un discovery previo, la condición está
satisfecha, y de dónde vinieron no importa. Lo que sí importa es que existan **y** que
sigan siendo ciertos: un artefacto desactualizado es peor que uno que falta, porque nadie
sospecha de él.

Por eso el chequeo de entrada evalúa vigencia y no solo existencia, y por eso su documento
reemplaza al checkpoint de la etapa que no se corrió.

El paquete se deja en `discovery/<etapa>/inputs/inherited/`, con los nombres fijos del
README de esa carpeta. `start-here.md` en `inputs/` dice qué va ahí y qué va un nivel
arriba (transcripts, material crudo). `entry-check` copia lo heredado al sitio de
trabajo (los outputs que nombra el README de `inherited/`) para que el resto de los
skills no cambie de ruta.

## Cómo se declara

En el `overrides.md` del proyecto, una sección por diferencia, cada una con el porqué. La
modalidad va en la primera línea, antes de las demás secciones.

La prueba para distinguir un override de una fricción es una pregunta: ¿le pasaría lo mismo
al siguiente proyecto? Si la base está bien y este cliente es distinto, es un override y va
aquí. Si la base está mal y el siguiente proyecto va a tropezar igual, es una fricción: se
anota en el `friction-log.md` del proyecto con `skills/friction-log/`, que la lleva como
issue a `harness-product`, y si procede el cambio se hace en la base para que le llegue a
todos.
