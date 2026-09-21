# Las 5 reglas — base del harness de Codeable

Destiladas del repo [`yc-software/qm`](https://github.com/yc-software/qm) (MIT, agosto 2026),
el harness de agentes que Y Combinator abrió al público. De ahí no tomamos código: su producto
resuelve un problema distinto al nuestro. Tomamos su forma de trabajar, que está escrita en su
`AGENTS.md` y en su `CONTRIBUTING.md`.

El dato que le da peso: ~75.000 líneas de código y ~90.000 de tests, escritas casi enteramente
por agentes bajo un solo archivo de reglas. Y no aceptan PRs de código — solo texto escrito por
humanos describiendo el cambio; ellos lo implementan.

Nada de esto es una herramienta que se instala. Es disciplina puesta por escrito y hecha
obligatoria. El riesgo no es que no funcione: es que lo escribamos y no lo hagamos cumplir.

---

## 1. Un manual de operación que el agente lee solo, en cada proyecto

**La regla.** Cada proyecto tiene un `AGENTS.md` en la raíz, con un symlink `CLAUDE.md ->
AGENTS.md`. El agente lo carga automáticamente en cada sesión, sin que nadie se lo pida.

**Por qué.** Hoy cada persona le explica al agente las reglas de la casa desde cero, y el
resultado depende de quién esté sentado. Un `docs/` no resuelve esto: alguien tiene que
*decidir* leerlo. `AGENTS.md` se carga siempre. Por eso funciona como puerta y no como
documento.

**Por qué el symlink.** `AGENTS.md` es el nombre que leen Codex y Cursor; `CLAUDE.md` es el que
lee Claude Code. Un solo contenido, dos nombres, todas las herramientas leen lo mismo. Si algún
día una herramienta necesita algo distinto, se reemplaza el symlink por un archivo real **en el
mismo commit** que introduce la desviación.

**Cómo lo aplicamos.**

```
codeable-harness/          repo core
  AGENTS.base.md           reglas comunes de Codeable
  skills/                  procedimientos compartidos (regla 5)

proyecto-cliente-x/
  AGENTS.md                reglas comunes + lo específico del proyecto
  CLAUDE.md -> AGENTS.md
  docs/                    documentación de fondo, decisiones, discovery
```

El `AGENTS.md` de cada proyecto es corto. Lo específico que lleva:

- El stack y cómo se corre el proyecto
- Cómo se corren los tests, y cuáles son "los afectados"
- **Helper homes**: la lista explícita de dónde vive cada utilidad. Sin esta sección, cada
  agente reinventa el mismo `formatError` cinco veces en el mismo repo. Es la sección con más
  retorno de todo el archivo.
- Convenciones del cliente y lo que no se toca

Reglas duras que van en el `AGENTS.base.md`, tomadas de qm:

- **Arregla todas las instancias del patrón, no solo la reportada.** Un call site corregido con
  cinco hermanos intactos es una regresión esperando a ser redescubierta.
- **El fix tiene que encoger el sistema, no agrandarlo.** Si aumenta la superficie, busca la
  versión que la reduce.
- **Resuelve en la capa por la que pasan todos los caminos.** Antes de parchar un call site,
  pregunta si el fix va en el helper compartido. Y al revés: no fabriques una abstracción para
  un patrón con un solo caller.

---

## 2. El que hace el trabajo no se aprueba a sí mismo

**La regla.** Nada se mergea sin una revisión hecha por una **sesión nueva** que no vio escribir
el código, con la instrucción de romperlo, no de bendecirlo.

**Por qué.** No se trata de otro proveedor ni de otro modelo. Se trata de otro **contexto**. El
agente que escribió el código tiene en su ventana todas las justificaciones de por qué cada
decisión estuvo bien; si le pides que revise, no revisa: confirma su propio razonamiento. Un
contexto fresco solo ve el diff, sin la historia que lo hace parecer razonable.

La frase de su `AGENTS.md`:

> *"El contexto que produjo un diff ya cree que es correcto, y esa creencia es el sesgo que la
> revisión existe para derrotar."*

Es el mismo control de siempre: quien ejecuta no autoriza.

**Cómo lo aplicamos.**

1. El agente termina el cambio.
2. Se abre una sesión nueva con el diff + el `AGENTS.md` del proyecto. Nada más.
3. La instrucción es cazar el bug, el caso borde, la suposición no dicha, lo que regresiona.
4. Se resuelve lo que encuentre antes de mergear.

**La profundidad se mide por callers, no por archivos.** Una línea cambiada en un helper con
cincuenta importadores no es un cambio pequeño. Escalan a revisión profunda y varios revisores:
control de flujo del core, auth y credenciales, migraciones o pérdida de datos, concurrencia y
reintentos, gasto, contratos de API pública, y los helpers compartidos por donde pasa todo.

**Dos cosas que NO cuentan como revisión:** un CI en verde, y auto-revisión en el contexto que
escribió el código, por chico que sea el diff.

**El revisor tiene la última palabra sobre la profundidad.** Si una revisión modesta detecta
riesgo para el que no fue asignada, escala por iniciativa propia en vez de quedarse en su carril.

---

## 3. Probar antes de decir "listo"

**La regla.** Que compile o que el pipeline esté verde no es done. Se prueba de punta a punta con
el flujo real del cliente antes de reportarlo.

**Por qué.** La distancia entre "el proceso arrancó" y "el sistema funciona" es donde se pierden
las tardes. El ejemplo de qm: su bot de Slack arrancaba, imprimía `LIVE`, y estaba sordo —otra
máquina tenía tomada la conexión. Todo parecía bien. Nada funcionaba.

**Prueba de alcanzabilidad.** Lo que hace su comando de levantar el stack antes de imprimir
éxito:

1. Verifica que la conexión sea la única (si no, alguien más la tiene: reporta quién y rota).
2. Postea un mensaje canario.
3. **Espera a que ese mensaje vuelva de regreso por el mismo canal.**
4. Si no vuelve, marca esa credencial como muerta por 30 minutos y prueba con la siguiente.

Recién ahí dice OK.

**Cómo lo aplicamos.**

- Cada proyecto tiene un comando que levanta el stack con forma de producción, y ese comando
  **no reporta éxito hasta probar una petición real de punta a punta**. Si es una API, un
  request que escriba y lea. Si es una web, cargar una página y confirmar que renderizó.
- Contrato del comando: `up`, `status`, `down`, `doctor`, `logs [servicio] [-f]`,
  `restart [servicio]`. Todos con `--json`, para que un agente los pueda leer.
- Re-ejecutar `up` sobre algo ya vivo es un **reload** (relee config, compara, reinicia en
  rolling solo lo que cambió), no un no-op.
- **Todo cambio que alguien vea renderizado va con screenshot en el PR.** Before/after si ya
  existía.
- Los cambios de comportamiento no triviales se verifican en la instancia viva **antes** de abrir
  el PR, sin pedir permiso primero.

---

## 4. Base común, y lo de cada cliente en su propio repo

**La regla.** El core es idéntico entre todos los proyectos. Todo lo específico de un cliente
vive en una sola carpeta identificable, en git.

**Por qué.** El problema de una software factory con N clientes: N repos que arrancaron iguales y
a los seis meses son N cosas distintas. Nadie sabe qué tiene cada uno, y un arreglo en uno no
llega a los demás.

**Cómo lo aplicamos.**

- **Core = todo lo que se repite**: patrones, procedimientos, skills, el `AGENTS.base.md`. Vive
  en `codeable-harness`. Incluye lo de discovery —etapas 1 a 3 y el juicio humano— que es
  donde está nuestra ventaja.
- **Casuísticas del cliente**: viven en el repo del cliente, en una sola carpeta, no dispersas.
- **"En git"** significa que puedes ver el diff de qué cambió en la config del cliente entre
  marzo y hoy. No en la cabeza de alguien ni en variables de entorno del servidor.
- **Beneficio directo**: un arreglo hecho una vez le llega a todos los clientes. Y alguien nuevo
  entiende un proyecto en horas, no en semanas.

**La escalera de despliegue de qm, que vale la pena copiar:**

| Paso | Qué hace |
|---|---|
| `check` | Valida la config **sin red**. Rápido, corre siempre. |
| `doctor` | Revisa lo externo (credenciales, cuotas, DNS) **sin modificar nada** |
| `plan` | Muestra qué va a cambiar |
| `up --yes` | Ejecuta. Requiere confirmación explícita. |
| `conformance` | **Compara lo declarado contra lo que está corriendo**, por hash |

El último paso es el que casi nadie implementa y el que evita el "¿por qué en el server hay otra
cosa?".

**Sincronización entre core y cliente.** qm usa dos procedimientos: uno que **mergea** desde
arriba (nunca rebasea, para no reescribir historia compartida) y otro que manda un fix hacia
arriba **escaneando el diff, los mensajes de commit y los screenshots** buscando identificadores
del cliente antes de empujar.

---

## 5. Nuestros procedimientos escritos una vez, usados en todos lados

**La regla.** Cada procedimiento recurrente es un **skill**: un directorio versionado en git que
los proyectos importan por referencia, no copiando.

**Por qué.** El discovery, cómo revisamos, cómo entregamos: hoy vive en documentos sueltos y en
la cabeza de la gente. El know-how de Codeable no puede depender de quién esté en el proyecto.

**La forma.**

```
skills/code-review/
  SKILL.md          el contenido
  references/       material de apoyo, se carga solo si hace falta
  scripts/          scripts que el skill puede ejecutar
```

Y el `SKILL.md` arranca con frontmatter:

```markdown
---
name: code-review
description: Revisión en contexto fresco de un diff. Usar cuando...
---
```

**Dos cosas que aprendimos leyendo los suyos:**

1. **La `description` es lo más importante del archivo.** Es lo único que el agente ve antes de
   decidir si lo carga. Se escribe con los disparadores explícitos: "usar cuando te pidan X,
   cuando veas Y, o cuando el usuario diga Z".
2. **El cuerpo documenta los modos de fallo, no solo el camino feliz.** Su skill de memoria
   dedica una sección entera a *"si ves 401, tu token expiró a mitad de turno; se resuelve solo
   en el próximo turno, no reintentes"*. Eso separa un skill útil de un prompt bonito.

**Skills para empezar, en orden de prioridad:**

1. `discovery-a-spec` — el output de nuestro framework de discovery, en el formato exacto que el
   agente consume. **Este es el que nadie más tiene y es nuestra ventaja.**
2. `code-review` — la revisión en contexto fresco de la regla 2
3. `dev-instance` — cómo levantar y verificar este proyecto (regla 3)
4. `abrir-pr` — incluyendo la regla del screenshot obligatorio
5. `convenciones-stack` — uno por stack que usemos

---

## Regla de fondo: el humano pone la intención, el agente pone el código

De su `CONTRIBUTING.md`:

> *"Dado que los agentes de código escriben la mayoría del código subyacente ahora, preferimos
> PRs en forma de texto escrito por humanos... si estamos alineados, con gusto quemamos nuestros
> tokens en la implementación. Por favor no hagas que una IA expanda artificialmente lo que
> quieres hacer en una propuesta formal."*

Se contribuye agregando un `.txt` o `.md` **informal** en una carpeta `adrs/`. Ellos implementan.

Para nosotros ese reparto ya existe: nuestro discovery produce la intención. Lo que falta es el
formato en que se la entregamos al agente. Eso es el skill `discovery-a-spec`.

---

## Cómo medimos si funcionó

En 2 sprints:

- % de PRs con revisión en contexto fresco
- % de PRs con cambio visual que llevan screenshot
- Tiempo de "cambio listo" a "verificado en instancia viva"

El criterio de éxito **no es velocidad de escritura de código**. Es reducción de retrabajo
post-entrega, que es donde se nos va el margen.
