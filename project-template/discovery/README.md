# Cómo se ordena esta carpeta

Una carpeta por etapa, con el mismo nombre que en `harness/stages/`. Dentro de cada una,
tres subcarpetas que cuentan la historia completa de la etapa: qué recibió, qué produjo y
quién lo validó.

- `inputs/` — lo que entra de afuera. En las etapas 2 y 3 incluye `start-here.md` (dónde
  dejar cada cosa) y `inherited/` (paquete de la etapa anterior **solo** si esa etapa no
  se corrió aquí). La etapa 1 no tiene `inherited/`: no hay etapa previa.
- `outputs/` — lo que la etapa produce.
- `checkpoint/` — los registros de validación: el chequeo de entrada con el que se abrió,
  el registro del checkpoint de salida, el checklist de tareas y la tabla de cierre.

El README de cada subcarpeta lista **los nombres de archivo que se esperan**. Eso es el
mapa de certeza: qué poner y qué va a aparecer. Esas listas no son el artefacto. Un
archivo vacío, un README o una plantilla con los `<placeholders>` todavía puestos no
cuenta como que la entrada existe ni como que la etapa produjo esa salida. El
`CONTRACT.md` de la etapa sigue siendo la firma: qué la satisface y qué la invalida.

## Ready to take: el formato en que se lo llevan

Dentro del `outputs/` de cada etapa hay una subcarpeta `ready-to-take/` con los mismos
entregables de esa etapa pero en el formato en que los abre un cliente o un PM de
negocio: `.docx` para documentos, `.xlsx` para cronogramas y gantts. El markdown de al
lado es el registro; lo de `ready-to-take/` es la copia generada para entregar, no se
edita a mano y se regenera cuando la fuente cambia. El mapa completo está en
`harness/skills/ready-to-take/`.

## Versions: la copia congelada antes de cambiar algo aprobado

El archivo con nombre fijo (`as-is.md`, `to-be.md`, `gaps-and-risks.md`) siempre es la
versión vigente, y los skills leen ese nombre. Cuando hay que cambiar un documento que **ya
pasó checkpoint o ya se le mostró al cliente**, primero se guarda una copia tal cual en
`outputs/versions/<nombre>-v<N>.md` de la misma etapa, y recién después se edita el
original. La línea `**Versión:**` del documento dice qué cambió y qué evento cerró la
anterior.

Mientras el documento se está redactando, se edita directo: git guarda cada paso.
`versions/` guarda solo versiones cerradas por un evento, y se crea la primera vez que hace
falta, como `ready-to-take/`. Quién dispara una versión nueva y cómo, en
`harness/skills/reopen-artifact/`.

## Nada cruza etapas como archivo único

Cada documento vive en la etapa que lo produjo, y la siguiente parte de él en su propia
carpeta:

- As-Is y To-Be: la etapa 1 escribe `1-planning/outputs/as-is-draft.md` y
  `to-be-draft.md` (tentativos, salen de la propuesta); la etapa 2 los valida con el
  cliente en `2-analysis/outputs/as-is.md` y `to-be.md`. El borrador se queda en la
  etapa 1 como constancia; el validado es el que consume la etapa 3.
- Huecos y riesgos: mismo recorrido en tres pasos. `1-planning/outputs/gaps-and-risks-draft.md`
  (hipótesis, sin mitigación ni dueño), `2-analysis/outputs/gaps-and-risks.md` (validado,
  con mitigación y dueño) y `3-design/outputs/gaps-and-risks.md` (refinado con el detalle
  técnico). Cada etapa parte del archivo de la anterior, sobre las mismas filas.

Fuera de las etapas quedan tres cosas: `progress/` (la memoria entre sesiones de trabajo,
la lleva `harness/skills/session-log/`), `inbox/` (donde se deja la información nueva que
contradice algo ya aprobado, sin saber todavía a qué etapa pertenece; la procesa
`harness/skills/reopen-artifact/`) y `backlog.md` en la raíz del repo, porque sobrevive al
discovery entero.

## Si este proyecto no arranca en la etapa 1

Declara la modalidad y la etapa de entrada en `overrides.md`. Abre
`discovery/<etapa>/inputs/start-here.md`: los transcripts (o el material crudo) van en
`inputs/`; el paquete de la etapa que no corriste va en `inputs/inherited/`. Corre
`harness/skills/entry-check/` antes de producir nada. `inherited/` vacío significa
flujo normal: las entradas ya están en los outputs de las etapas anteriores.
