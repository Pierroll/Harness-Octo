---
name: ready-to-take
description: >
  Genera la versión lista para llevar de cada entregable en la subcarpeta
  `ready-to-take/` de los outputs de su etapa: .docx para documentos, .xlsx para
  cronogramas y gantts. Usar cuando el usuario diga "pásame el informe en Word", "el
  gantt en Excel", "prepara los entregables para el cliente", "exporta", "ready to
  take", o al terminar cualquier artefacto que un cliente o un PM de negocio se va a
  llevar. El markdown sigue siendo el registro en git; esto produce la copia en el
  formato que esa gente de verdad abre.
---

# Ready to take — el entregable en el formato en que se lo llevan

Los entregables del arnés viven en markdown porque markdown se versiona y se revisa. Pero
quien se los lleva es un PM de negocio o un gerente del cliente, y esa gente no lee
markdown: abre Word y Excel. Este skill produce esa copia.

Cada etapa tiene su propia bandeja: `discovery/<etapa>/outputs/ready-to-take/`, al lado
de los markdown de esa etapa. Así el documento nunca pierde de qué etapa salió, y
llevarse los entregables de una etapa es entrar a una sola subcarpeta y arrastrar. La
carpeta se crea la primera vez que se genera algo; no se pre-crea vacía.

## El mapa: qué documento sale en qué formato

Casi todo es `.docx`. Lo único que sale en `.xlsx` son los cronogramas, porque un gantt
en Word no le sirve a nadie.

| Entregable | Archivo en `outputs/ready-to-take/` de su etapa | Fuente |
|---|---|---|
| Documento de kickoff | `1-planning/…/Kickoff_<cliente>.docx` | lo genera `kickoff-discovery` directo aquí |
| Agendas de sesión | `1-planning/…/Discoveries_<cliente>.docx` | lo genera `kickoff-discovery` directo aquí |
| Gantt del discovery | `1-planning/…/Gantt_Discovery_<cliente>.xlsx` | `1-planning/outputs/discovery-plan.md` |
| Acta de sesión (solo si el PM decide enviarla) | `2-analysis/…/Acta_d<N>_<cliente>.docx` | `2-analysis/outputs/d<N>-acta.md` |
| Mapa de procesos As-Is | `2-analysis/…/As-Is_<cliente>.docx` | `2-analysis/outputs/as-is.md`, con `scripts/md-to-docx.cjs` |
| Mapa de procesos To-Be | `2-analysis/…/To-Be_<cliente>.docx` | `2-analysis/outputs/to-be.md`, con `scripts/md-to-docx.cjs` |
| RF light | `2-analysis/…/Requerimientos_<cliente>.docx` | `2-analysis/outputs/requirements-lite.md`, lo genera `requirements-lite` |
| RF detallado y RNF | `2-analysis/…/Requisitos_<cliente>.docx` | `2-analysis/outputs/requirements-full.md`, lo genera `requirements-full` |
| Cronograma tentativo del proyecto | `2-analysis/…/Cronograma_Tentativo_<cliente>.xlsx` | cronograma de `estimation` modo grueso |
| Diagrama de arquitectura | `3-design/…/Arquitectura_<cliente>.png` | el bloque mermaid de `3-design/outputs/architecture.md`, con mermaid-cli |
| Arquitectura técnica | `3-design/…/Arquitectura_<cliente>.docx` | `3-design/outputs/architecture.md`, con `scripts/md-to-docx.cjs --image` (incrusta el PNG) |
| Diagrama del modelo de datos | `3-design/…/Modelo_Datos_<cliente>.png` | el `erDiagram` de `3-design/outputs/data-model.md`, con mermaid-cli |
| Modelo de datos | `3-design/…/Modelo_Datos_<cliente>.docx` | `3-design/outputs/data-model.md`, con `scripts/md-to-docx.cjs --image` |
| Mapa de integraciones | `3-design/…/Integraciones_<cliente>.docx` | `3-design/outputs/integrations.md` |
| Matriz de roles y permisos | `3-design/…/Matriz_Roles_<cliente>.docx` | `3-design/outputs/roles-matrix.md` |
| Inventario de flujos y pantallas | `3-design/…/Inventario_Pantallas_<cliente>.docx` | `3-design/outputs/screen-inventory.md` |
| Cronograma de implementación | `3-design/…/Cronograma_Implementacion_<cliente>.xlsx` | cronograma de `estimation` |
| Informe final de discovery | `3-design/…/Informe_Discovery_<cliente>.docx` | `3-design/outputs/discovery-report.md` |

El As-Is y el To-Be salen porque el PM arma con ellos el diagrama de flujo del proceso del
cliente: cada etapa es un tramo, cada paso una caja, cada decisión un rombo con su Sí y su
No. Por eso los templates los escriben así y el docx los muestra así. Los diagramas de la
etapa 3 salen en imagen porque nadie lee una arquitectura en texto: el PNG va solo a la
bandeja y además incrustado en su docx.

Lo que no está en esta tabla no se exporta: `gaps-and-risks`, inventarios de la etapa 2,
notas de sesión, entendimientos, handoffs, backlog y registros de checkpoint son
documentos de trabajo y se quedan en markdown. Si un cliente pide uno de esos en Word,
se exporta igual con la misma mecánica y se agrega la fila a la tabla del `overrides.md`
del proyecto.

## Cómo se genera

**`.docx` desde un markdown:** `scripts/md-to-docx.cjs`, que aplica la plantilla
corporativa (la misma de `skills/requirements-lite/`: Inter, banda negra por sección,
banda celeste por etapa, logo en el header) y omite las líneas de registro interno
(vigencia, versión, estado, fuente de verdad, procedencia, producido con). La librería
`docx` se instala en `.build/` del proyecto, que está en su `.gitignore`:

```bash
npm i --prefix .build docx
NODE_PATH=.build/node_modules node harness/skills/ready-to-take/scripts/md-to-docx.cjs \
  --in discovery/2-analysis/outputs/as-is.md \
  --out discovery/2-analysis/outputs/ready-to-take/As-Is_<cliente>.docx \
  --subtitle "<cliente> · Fase de Discovery" \
  --status "Documento provisional, sin validar con el cliente · <fecha>" \
  [--image discovery/3-design/outputs/ready-to-take/Arquitectura_<cliente>.png]
```

`--status` es la línea bajo el subtítulo: si el documento no pasó checkpoint, lo dice ahí.
`--image` incrusta el PNG donde el markdown tiene su bloque `mermaid`. El script tiene
`--self-test`. Los documentos que nacen directo en docx (kickoff, RF light, RF detallado)
siguen con la mecánica de `skills/requirements-lite/` (paso «Generar el .docx»).

**Imágenes de diagramas:** los bloques `mermaid` de `architecture.md` y `data-model.md` se
renderizan en local con mermaid-cli, sin mandar nada del cliente a un servicio en línea:

```bash
awk '/^```mermaid/{f=1;next} /^```/{f=0} f' discovery/3-design/outputs/architecture.md > .build/arquitectura.mmd
npx -y -p @mermaid-js/mermaid-cli mmdc -i .build/arquitectura.mmd \
  -o discovery/3-design/outputs/ready-to-take/Arquitectura_<cliente>.png -b white -s 2 -w 1800
```

Si el diagrama en bandas se desordena al renderizar, se fija el orden con enlaces
invisibles al final del bloque mermaid (`usuarios ~~~ canales ~~~ backend ~~~ datos`).

**`.xlsx`:** librería `exceljs` de Node (`npm i exceljs`). Para un gantt o cronograma:
una fila por actividad, columnas de responsable, inicio y fin, y a la derecha una columna
por día o por semana (según la escala del plan) donde las celdas del rango activo van con
relleno de color. Feriados e hitos con relleno distinto. Encabezados en negrita, primera
columna congelada. Es lo que una persona armaría a mano en Excel, generado.

Si el entorno no permite generar el archivo, entrega el contenido en markdown con la
misma estructura y dile al usuario que falta la conversión: no la des por hecha.

## Reglas

- **El markdown es el registro; el archivo de `ready-to-take/` es una salida generada.**
  No se edita a mano: si hay que corregir algo, se corrige la fuente y se regenera. Un
  `.docx` editado a mano se separa en silencio de su versión de registro, y a los dos
  meses nadie sabe cuál vale. (Los que nacen directo en `.docx`, como el kickoff y el
  RF light, se regeneran con su propio skill.)
- **Se regenera cuando la fuente cambia.** Un export viejo junto a un markdown nuevo es
  un artefacto desactualizado con cara de vigente, exactamente lo que la regla de
  vigencia existe para evitar.
- **Los nombres llevan el cliente**, como ya lo hacen `Kickoff_<cliente>.docx` y
  `Requisitos_<cliente>.docx`. El PM que entra a la carpeta con apuro tiene que poder
  elegir el archivo por el nombre.

## Modos de fallo

- **El markdown fuente todavía tiene `<placeholders>` o pendientes sin dueño:** no se
  exporta. Exportar convierte un borrador en algo que parece entregable.
- **Piden "todos los entregables" a mitad del discovery:** exporta solo lo que ya pasó
  su checkpoint. Lo demás se lista como pendiente con su etapa.
