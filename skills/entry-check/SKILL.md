---
name: entry-check
description: >
  Abre una etapa: verifica contra su CONTRACT.md que las entradas que necesita existen y
  siguen vigentes, y deja escrito con qué material se abrió. Usar SIEMPRE al empezar una
  etapa, y con más razón cuando el usuario diga "el cliente volvió con features nuevos",
  "ya tenemos discovery de este cliente", "queremos probar directo la etapa 3", "qué
  necesito para empezar el diseño", "el alcance ya viene cerrado", "inherited",
  "empiezo en la etapa 2", o al instanciar un proyecto cuya modalidad no es discovery. Cuando la etapa anterior no se corrió, el
  documento que produce reemplaza a su checkpoint.
---

# Entry check — con qué material se abre esta etapa

Produce `discovery/<etapa>/checkpoint/entry-check.md` a partir de
`templates/entry-check.md`.

## La idea

Una etapa no necesita que la etapa anterior se haya corrido. Necesita **los artefactos**
que la etapa anterior produce. Si esos artefactos ya existen porque los produjo un
discovery anterior, o porque el alcance vino cerrado en la propuesta, la condición está
satisfecha. De dónde vinieron no importa.

Lo que sí importa son dos condiciones, y hay que verificar las dos por separado: que
existan y que sigan siendo ciertos.

## Se corre al abrir cualquier etapa

Esta es la forma normal de empezar, no un camino de excepción. Cada etapa declara sus
entradas en su `CONTRACT.md`, y este skill es lo que las verifica antes de producir nada.

En un discovery completo que va etapa por etapa, el chequeo se resuelve en minutos y el
veredicto es "entra". Vale la pena correrlo igual, por dos razones: deja escrito con qué
material se abrió la etapa, y obliga a mirar la vigencia de lo que la etapa anterior
produjo, que es justo lo que nadie mira cuando el material es propio y reciente.

Hay tres casos donde deja de ser trámite y se vuelve la pieza que sostiene el proyecto.

**El cliente vuelve.** El proyecto se entregó y meses después el cliente pide features
nuevos. Hay discovery previo, hay sistema andando, hay backlog. Correr un discovery
completo de nuevo no va a pasar y no debería.

**Desarrollo con alcance definido.** El alcance viene cerrado en la propuesta o el TDR. Lo
que falta no es descubrir qué construir sino entender cómo funciona lo que ya existe.

**Discovery heredado.** Otro equipo o el propio cliente hizo el levantamiento y nos
entregan el resultado.

En esos tres, el documento que sale de este skill reemplaza al checkpoint de la etapa que
no se corrió.

## Qué pedir cuando alguien quiere entrar directo por una etapa

No le pases la tabla del CONTRACT en abstracto. Pásale la bandeja de esa etapa:

- Etapa 2: `discovery/2-analysis/inputs/start-here.md` y `inputs/inherited/README.md`
- Etapa 3: `discovery/3-design/inputs/start-here.md` y `inputs/inherited/README.md`

Ahí están los nombres fijos. El `CONTRACT.md` sigue siendo la firma (qué satisface y qué
invalida). La columna de qué invalida va igual, porque es la que evita que llegue
material viejo con cara de vigente.

## Dónde buscar cada entrada

Por cada fila de la tabla de entradas, busca en este orden:

1. **Sitio de trabajo canónico** (el que nombra el CONTRACT: outputs de la etapa
   anterior, `backlog.md` en la raíz, `overrides.md`).
2. **`discovery/<etapa>/inputs/inherited/`**, con el nombre fijo del README de esa
   carpeta. Solo aplica si la etapa anterior no se corrió en este repo.

La primera copia que sea un artefacto de verdad gana. Un README, un archivo vacío o una
plantilla con los `<placeholders>` todavía puestos **no cuenta**.

Si el archivo está solo en `inherited/`, **cópialo al sitio de trabajo** que declara el
README de `inherited/`, y anota en el chequeo "copiado desde inherited/ el <fecha>".
`inherited/` no se edita después: es la constancia de con qué se abrió. El resto de los
skills lee el sitio de trabajo, no la bandeja.

`backlog.md` se copia a la raíz **solo** si el `backlog.md` de la raíz sigue siendo la
plantilla vacía. Si ya tiene features reales, no se pisa: se compara y se deja hallazgo.

Si está en los dos lados y el contenido no es el mismo, no elijas en silencio: es un
hallazgo. Se usa el canónico si está vigente, y se deja escrito que inherited/ difiere.

Excepciones que no se copian a outputs de una etapa que no se corrió:

- El calendario de sesiones heredado (`session-calendar.md` o `Discoveries.docx`) se
  queda en `2-analysis/inputs/inherited/`. No se finge como salida del kickoff.
- `overrides.md` se completa en la raíz. No va en `inherited/`.

## Cómo se corre

1. Lee la modalidad declarada en el `overrides.md` del proyecto y consulta
   `stages/modalities.md` para saber qué artefactos exige.
2. Lee `start-here.md` de la etapa y la tabla de entradas del `CONTRACT.md`.
3. Por cada entrada, busca según "Dónde buscar cada entrada" y contesta dos preguntas
   distintas:
   - **¿Existe?** Con ruta. Si está en el repo de un discovery anterior y no se copió
     aún, la ruta es ese repo o `inherited/` si ya lo dejaron ahí.
   - **¿Sigue vigente?** Esta es la que se salta todo el mundo y es la que importa.
4. Copia a sitio de trabajo lo que solo estaba en `inherited/`.
5. Escribe el veredicto y, si hay huecos, la lista de lo que los llena con dueño y fecha.

## La vigencia es el punto

Un discovery de hace ocho meses sobre un sistema que ya se shippeó describe un mundo que
cambió. Un artefacto que existe pero está desactualizado es peor que uno que falta, porque
nadie sospecha de él: se lee, se le cree, y se diseña encima.

Preguntas que hay que hacerse por cada artefacto viejo: ¿se escribió antes o después de
que el sistema entrara en producción? ¿Las personas que aparecen siguen en el cliente?
¿Alguna decisión posterior contradice lo que dice? ¿El As-Is describe cómo trabajan hoy o
cómo trabajaban antes de que les entregáramos?

Cada artefacto queda marcado como vigente, desactualizado o no aplica. Los desactualizados
llevan una línea que diga qué parte sigue sirviendo.

Dos señales que ya están en el repo y dicen que algo no está vigente aunque exista: una
marca `contradice: <ruta>` sin su reopen-record en `checkpoint/`, y un archivo en
`discovery/inbox/` sin procesar. Cualquiera de las dos sobre una entrada de la etapa es
"entra con huecos", y el hueco se llena corriendo `skills/reopen-artifact/`.

### 3. Evaluación de Vigencia (Extensión OCTO)
Además de las marcas `contradice:` y los archivos en `discovery/inbox/`, existe una tercera señal que invalida la vigencia de un artefacto e indica un reintento técnico obligatorio:
- **Registro de Iteración:** Si en el directorio actual (`pwd`) existe un archivo llamado `iteration-record.md`, significa que el artefacto previo fue rechazado en una etapa posterior (ej. Verificación). 
- **Acción Obligatoria:** En este escenario, el `entry-check` evaluará la entrada como "Entra con huecos" (requiere re-procesamiento) y **DEBE** anexar el contenido completo de `iteration-record.md` al payload de contexto que se le entregará a la etapa actual.

### 4. Protocolo de Supervivencia a la Compactación (Handoff)
- Al arrancar cualquier etapa nueva, el agente orquestador DEBE buscar activamente la existencia de un archivo llamado `handoff-state.md` en el directorio de la etapa o caso.
- **Si el archivo existe:** El orquestador DEBE leerlo e inyectar su contenido íntegro en el tope de su prompt/memoria activa de trabajo actual. Esto garantiza que el foco, los descubrimientos previos y la directiva se transfieran sin importar si la ventana de contexto del LLM fue compactada o purgada.
- Tras inyectar el contenido en su memoria, el orquestador DEBE eliminar (borrar) el archivo `handoff-state.md` para evitar ensuciar transiciones futuras de la misma etapa.

## Los tres veredictos

**Entra.** Todas las entradas existen y están vigentes.

**Entra con huecos.** Existen las principales y falta producir algunas. Es el caso más
común y no es una excepción: es un mini paso de la etapa anterior acotado a lo que falta,
no la etapa entera.

**No entra.** Falta demasiado. Corresponde correr la etapa anterior completa, y el
documento sirve para justificarle al cliente por qué.

## El punto de anclaje

Para un cliente que vuelve, el ancla es el `backlog.md` del proyecto anterior. Los
features nuevos entran **al mismo archivo**, no a uno nuevo.

Eso es lo que separa continuar de empezar a ciegas: en ese archivo se ve qué quedó en
`done`, contra qué requisitos y qué módulos se conecta lo viejo, y dónde encaja lo nuevo.

## Reglas

- El documento que produce este skill reemplaza al checkpoint de la etapa que no se
  corrió. No se entra gratis: se entra con un papel que dice por qué.
- Ninguna entrada se marca vigente sin haberla abierto. "Debe seguir sirviendo" no es una
  verificación.
- Si el chequeo se corre sobre artefactos que esta misma sesión produjo, no vale, por la
  misma razón que el checkpoint necesita sesión fresca.

## Modos de fallo

- **El discovery anterior está en otro repo y no se tiene acceso:** eso ya es el veredicto.
  Sin poder leer los artefactos no se puede afirmar que existen; conseguir el acceso es el
  primer hueco a llenar.
- **Todo aparece vigente a la primera:** sospecha. Vuelve a la sección de vigencia y
  persigue tres artefactos hasta su fecha y su fuente antes de firmar.
- **La modalidad no está declarada:** no corras el chequeo contra una lista inventada.
  Declarar la modalidad en `overrides.md` es el paso previo.
- **La carpeta tiene el README con la lista de archivos esperados y nada más:** eso no
  es que las entradas existan. El README es el mapa, no el artefacto. El veredicto sale
  de abrir los archivos de verdad.
- **`inherited/` tiene archivos y la etapa anterior sí se corrió en este repo:** no
  copies encima del sitio de trabajo canónico. El canónico gana. inherited/ sobra:
  déjalo escrito como hallazgo y no lo uses.
