# harness-octo

Nuestro arnés de discovery. Convierte las etapas 1 a 3 del ciclo de desarrollo
(Planificación, Análisis, Diseño) en un proceso agéntico repetible: mismas etapas,
mismos artefactos, mismos checkpoints en todos los proyectos, con las diferencias de
cada cliente declaradas aparte.

**Para qué existe este repo.** Es el estándar que se espera de OCTO de ahora en
adelante, no un registro de por dónde vamos. Para llegar a un arnés hay que documentar y
estandarizar antes el proceso, y eso es lo que está pasando ahora: parte de lo que está
escrito en este repo describe cómo ya trabajamos, y parte propone cómo deberíamos
trabajar.

## Cómo está organizado

| Carpeta | Qué es |
|---|---|
| `AGENTS.md` | Las reglas base del arnés. El agente lo carga solo en cada sesión (`CLAUDE.md` es un symlink a este archivo). |
| `stages/` | La definición de cada etapa. `CONTRACT.md` es la firma: qué entra, qué sale, con qué skill y en qué ruta. `STAGE.md` es el porqué, el orden interno y los criterios de cierre. |
| `skills/` | Los procedimientos ejecutables. Cada skill es una carpeta con un `SKILL.md`. |
| `templates/` | Esqueletos de artefactos (backlog, registro de checkpoint, bitácora de fricciones). |
| `project-template/` | Lo que se copia para arrancar el discovery de un cliente nuevo. |
| `sources/` | Material fuente crudo: ejemplos y los skills originales antes de adaptarlos. Se lee, no se edita. |
| `NEXT.md` | Lo que sigue después de este build: piloto y publicación. |

## Cómo se usa en un proyecto

El discovery de un cliente vive en un repo propio, que creamos y controlamos nosotros.
El repo del cliente no se toca. Para arrancar uno:

```bash
# 1. Crear el repo del discovery a partir de la plantilla
cp -r harness-octo/project-template/ discovery-nombre-cliente/
cd discovery-nombre-cliente && git init -b main

# 2. Instalar el arnés como dependencia (submodule apunta a una versión fija)
git submodule add <url-de-harness-octo> harness

# 3. Commit inicial
git add -A && git commit -m "Discovery de <cliente>: arranque con harness"
```

Quien clona después usa `git clone --recurse-submodules`. Para traer mejoras de la
base: `git submodule update --remote harness` y commit.

La máquina del PM necesita Node 18 o superior (los `.docx`, los `.xlsx` y los scripts de
`skills/ui-design/`), `pandoc` si algún RF solo existe en Word, y la variable
`OPENAI_API_KEY` para las imágenes del paso de UI/UX. La clave es de OCTO, va en el
perfil de la shell y nunca en el repo.

### Autenticación con GitHub (Zero-Knowledge)

Para que el agente pueda interactuar con el repositorio del cliente (leer o crear issues) sin fugar secretos:
1. Instala el CLI oficial de GitHub (`brew install gh`).
2. Crea un archivo `.env` en la raíz del proyecto del cliente (el `.gitignore` de la plantilla ya lo protege por defecto).
3. Añade tu Personal Access Token con permisos sobre el repo: `GH_TOKEN=tu_pat_aqui`.

El arnés emplea el skill `github-integration` que inyecta este token mediante subshells. De esta forma la autenticación se aísla por proyecto (tenant) y es imposible que la cadena de texto del token termine en el `session-log.md` o en la memoria del agente.

El `AGENTS.md` del proyecto (viene en la plantilla) apunta al arnés y declara los
overrides del cliente. Desde ahí, el PM abre Claude Code en el repo del discovery y los
skills del arnés quedan disponibles.

Cada carpeta de `discovery/` trae un README con **los nombres de archivo que se esperan**
ahí. Eso es el mapa de inputs y outputs. No se copian plantillas vacías como si ya
existiera el artefacto: un archivo sin contenido no cuenta para `entry-check` ni para
cerrar la etapa. Ver `project-template/discovery/`.

### Arranque desde la etapa 1

El camino por defecto. En el repo del discovery:

1. Declara la modalidad en la primera línea de `overrides.md` (`discovery`,
   `discovery + PoC`, o `desarrollo con alcance definido`). Las tres están en
   `stages/modalities.md`.
2. Completa `AGENTS.md` y el resto de `overrides.md`.
3. Pon la **propuesta comercial firmada** y, si existen, los transcripts de las
   **llamadas comerciales** (no las de d1, d2, d3) en `discovery/1-planning/inputs/`.
4. Copia `harness/templates/backlog.md` a la raíz y `harness/templates/stage-checklist.md`
   a `discovery/1-planning/checkpoint/`.
5. Corre `skills/entry-check/` contra `stages/1-planning/CONTRACT.md` y arranca
   `stages/1-planning/STAGE.md`.

### Arranque desde la etapa 2 o la 3

Se puede. Una etapa se abre por sus entradas, no por la etapa anterior. La modalidad y
la etapa de entrada son dos palancas distintas: la modalidad dice qué compró el cliente;
la etapa dice por dónde empiezas ahora.

En el repo del discovery:

1. Declara las dos cosas en la primera línea de `overrides.md`. Ejemplo:

   ```markdown
   **Modalidad:** discovery · transcripts de d1–d6 en `discovery/2-analysis/inputs/` ·
   chequeo de entrada en `discovery/2-analysis/checkpoint/entry-check.md` ·
   cierra en requisitos detallados
   ```

2. Abre `discovery/<etapa>/inputs/start-here.md` y deja cada cosa donde dice:
   transcripts (o material crudo) en `inputs/`; el paquete de la etapa que no corriste
   en `inputs/inherited/`, con los nombres fijos de esa carpeta.
3. Al agente, en castellano: *Abre la etapa 2. La modalidad está en `overrides.md`.
   Corre `entry-check`. El paquete heredado está en `inputs/inherited/`. No corras la
   etapa anterior completa.*
4. El veredicto es uno de tres: **entra**, **entra con huecos**, **no entra**.
   `entry-check` copia lo de `inherited/` al sitio de trabajo (los outputs que nombra
   el README de `inherited/`).
   "Entra con huecos" produce solo lo que falta (un recorte de la etapa anterior), no
   la etapa entera. El documento de `entry-check` reemplaza al checkpoint de la etapa
   que no se corrió.

El procedimiento completo está en `skills/entry-check/`.

## El flujo de un discovery

1. **Planificación** (`stages/1-planning/`): kickoff, agendas de sesiones, plan/Gantt,
   backlog inicial.
2. **Análisis** (`stages/2-analysis/`): sesiones con transcripts, proceso real y mapa de
   estados, RF light, negociación del alcance con el cliente, RF detallado con criterios
   de aceptación, y el entendimiento para diseño.
3. **Diseño** (`stages/3-design/`): pantallas, arquitectura, modelo de datos, estimación
   refinada con el equipo e informe final.

Cada etapa abre su checklist (`templates/stage-checklist.md`) y cierra con
`skills/checkpoint-review/` ejecutado en una sesión fresca. Cada sesión de trabajo deja su
registro con `skills/session-log/`, para que la siguiente no arranque a ciegas.

Hay dos familias de veredicto, y no se mezclan. Al **abrir** una etapa,
`entry-check` dice entra / entra con huecos / no entra. Al **cerrar** una etapa o
validar un artefacto, `checkpoint-review` dice PASA / PASA CON RIESGO ACEPTADO /
RECHAZADO. Un rechazo no avanza la etapa: se corrige y se vuelve a correr el
checkpoint en otra sesión fresca. El detalle está en `GLOSSARY.md`.
