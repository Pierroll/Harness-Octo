---
name: technical-design
description: >
  Produce los artefactos técnicos de la etapa 3: arquitectura de alto nivel, modelo de
  datos, mapa de integraciones con decisión por fuente, matriz de roles y permisos, y
  registro de riesgos por módulo. Usar cuando el usuario diga "arma la arquitectura",
  "diseña el modelo de datos", "mapa de integraciones", "matriz de permisos", "riesgos
  del proyecto", o al entrar a la etapa de diseño con el RF detallado cerrado. CORRE
  CON MODELO FRONTERA (Opus/Fable): si la sesión no está en uno, dilo antes de empezar.
---

# Technical design — decisiones técnicas del discovery

**Regla de modelo:** este skill se corre con el modelo más capaz disponible. Un error
de arquitectura se paga durante todo el proyecto; los tokens son el costo barato.
Si detectas que la sesión corre en un modelo menor, adviértelo al usuario antes de
producir nada.

Entradas: RF detallado + RNF (`requirements-full`), inventarios de la etapa 2
(`inventory-sources.md`, `inventory-rules.md`, `inventory-fields.md`), restricciones
del proyecto (`overrides.md`).

## Artefactos (todos en `discovery/3-design/outputs/`)

Cada artefacto de este skill, en los dos modos, abre con la misma línea que traen los
templates: `**Versión:** <N> · <fecha> · reemplaza a versions/<nombre>-v<N-1>.md, o
"primera" · qué cambió · qué cerró la anterior`. Es lo que `skills/reopen-artifact/`
necesita para congelar y reemplazar sin adivinar.

### 1. `architecture.md` — arquitectura de alto nivel
- Módulos del sistema y responsabilidad de cada uno, mapeados contra los módulos del
  RF (ningún RF sin módulo que lo cubra, ningún módulo sin RF que lo justifique).
- Estilo: nuestro default es **monorepo/monolito modular**; microservicios solo si el
  cliente lo exige y quedó en overrides. Si propones apartarte del default,
  presenta las dos opciones con su costo y deja la decisión al PM (Líder).
- Diagrama en mermaid dentro del markdown, **organizado en bandas**: ver abajo.
- El diagrama se exporta a PNG y el documento a `.docx` en `outputs/ready-to-take/` vía
  `skills/ready-to-take/`; es lo que el PM se lleva.

### 2. `data-model.md` — modelo de datos de alto nivel
- Entidades principales, relaciones y cardinalidad (mermaid `erDiagram`).
- El `erDiagram` se exporta a PNG y el documento a `.docx` en `outputs/ready-to-take/`
  vía `skills/ready-to-take/`.
- Campos solo donde el inventario los respalda; los que no, se marcan como detalle de
  implementación.
- Vigencias y versionado donde el negocio lo pide (tarifarios, reglas con fecha).

### 3. `integrations.md` — mapa de integraciones
- Una fila por fuente externa del inventario: qué es, si tiene API, volumen, y la
  **decisión: API / automatización (RPA-scraping) / pendiente con plan de prueba**.
- Las fuentes sin API conocida requieren prueba técnica antes de comprometerlas en la
  estimación; si no se hizo, va como riesgo.

### 4. `roles-matrix.md` — matriz de roles y permisos
- Se **detalla** en la etapa 3; la tabla de roles y niveles de acceso se abrió en la etapa
  2 (ver el modo corto, más abajo). En la etapa 3 se le agregan los módulos y las acciones
  concretas.
- Roles del negocio × módulos/acciones. Marca los que el cliente confirmó y los inferidos.

### 5. Riesgos: se refina `gaps-and-risks.md`, no se crea uno nuevo
- El registro de riesgos del proyecto se abrió en la etapa 1 con `skills/gap-analysis/`
  (`1-planning/outputs/gaps-and-risks-draft.md`). El modo corto lo valida sobre las
  mismas filas en `2-analysis/outputs/gaps-and-risks.md`; el modo completo parte de ese
  y deja el refinado, con el detalle técnico y la mitigación concreta, en
  `3-design/outputs/gaps-and-risks.md`.
- **No escribas un `risks.md` aparte.** Un riesgo de negocio de la semana 1 y su forma
  técnica de la semana 4 son el mismo riesgo en dos niveles de detalle. Con dos registros
  la continuidad se pierde: nadie sabe que el riesgo técnico es consecuencia del de
  negocio, y al cerrarlo hay que cerrarlo en dos lados y uno queda abierto para siempre.
- Ejemplo. Semana 1: "no está definido si los estudiantes son menores de edad". Diseño
  técnico, misma fila: "el proveedor de streaming tiene infraestructura en Europa y sus
  términos no permiten menores; si el público incluye menores, hay que cambiar de
  proveedor o alojar en otra región".
- Los riesgos nuevos que aparezcan en la etapa 3 se agregan al mismo archivo, con origen
  `técnico`. Un riesgo alto sin mitigación es un pendiente, no un registro.

## Modo corto: durante la etapa 2

Este skill también corre **antes** de la etapa 3, en modo corto. Produce tres artefactos,
y los tres son el "qué"; el "cómo" se queda para la etapa 3.

**Cadencia: después de cada sesión que aporte información técnica**, no una vez al final.
En un discovery de veinte sesiones la información técnica llega repartida entre sesiones:
la sesión 2 aporta backend y base de datos, la 4 aporta infraestructura. Los artefactos
tienen que ir mutando con eso.

**Regenera el archivo entero** desde los inventarios acumulados. No parchees el diagrama
anterior: reescribirlo completo es más barato y menos propenso a error que editarlo.

La primera línea de cada artefacto dice con qué sesiones se construyó: `Actualizado con:
d1, d2, d4`. Así se ve de un vistazo si está viejo y qué sesión lo movió.

Nacen en la primera sesión que aporte algo. No se crean vacíos el día uno: un archivo que
dice "todavía no hay información" es ruido, y lo que falta ya vive como tema por entender
en `gaps-and-risks.md`.

### `diagram-l0.md` — diagrama de arquitectura de alto nivel

El sistema y sus vecinos: con qué se conecta, qué entra y qué sale. Nada de proveedores ni
de stack. Es lo que permite presentarle alcance al cliente habiendo dibujado la solución, y
sin él los requisitos salen de la nada.

### Cómo se organiza el diagrama

Aplica a los dos: al `diagram-l0` de la etapa 2 y a la arquitectura de la etapa 3.

El diagrama se apila en bandas, y cada banda responde una pregunta distinta. De arriba
hacia abajo: **usuarios**, quién lo usa. **Canales**, por dónde entra cada uno. **Backend**,
los servicios que resuelven. **Datos**, dónde vive lo que se guarda. **Integraciones
externas**, con qué se habla afuera. Lo que corre en la infraestructura del cliente va en
un recuadro aparte, porque cambia quién lo opera y quién responde cuando falla.

Son las mismas capas con las que se clasifican los riesgos en `templates/gaps-and-risks.md`.
Que se llamen igual permite poner el diagrama y la tabla lado a lado y ver qué banda
concentra el riesgo, que es la conversación que hay que tener con el cliente.

Dos elementos que el diagrama lleva siempre y que no son decoración:

**La leyenda**, cuando hay más de un tipo de componente. Distinguir con color lo que ya
existe de lo que vamos a construir, o lo que es del cliente de lo que es nuestro, evita la
discusión de la reunión siguiente.

**La caja de alcance**, con qué entra en esta fase y qué queda fuera. Sin ella, todo lo
dibujado se lee como comprometido. Sale de `scope-decisions.md`, no se redacta de nuevo.

Esta forma sale de un solo proyecto y no de un patrón contrastado. Sirve como default; un
proyecto que necesite otra organización la usa y lo declara.

### `roles-table.md` — tabla de roles y niveles de acceso

Cuántos roles va a tener el sistema y qué alcance tiene cada uno. Es un artefacto que el
cliente mira y valida, y suele ser el que destapa conversaciones difíciles: una empresa con
once cargos distintos puede necesitar cuatro roles, y hay que decir cuál cargo cae en cuál.

El cargo en el organigrama no es el rol en el sistema, y conviene separarlos por escrito
antes de que alguien lea "administrador" al lado de su nombre y lo tome como una
degradación.

En la etapa 3 esta tabla se convierte en `roles-matrix.md`, con módulos y acciones.

### La tabla de riesgos, con sus opciones y su recomendación

Sobre los hallazgos que `skills/discovery-session/` marcó como decisiones pendientes.

Lo que aparece en las sesiones casi nunca es un bloqueo técnico. Integrarse con un servicio
externo se puede: la pregunta es cuánto cuesta, quién lo paga y qué pasa si el cliente
decide que no. Por eso no es un artefacto de opciones sueltas, es una fila de la tabla de
riesgos, y las opciones comparadas son su plan de mitigación.

Cada fila de `gaps-and-risks.md` que salga del modo corto lleva:

- El riesgo en una línea, con su origen (negocio, técnico, comercial).
- Dos o tres opciones reales, en tabla comparativa, con los criterios que de verdad
  deciden: costo, latencia, esfuerzo, qué se gana y qué se pierde.
- Una recomendación con su porqué, marcada como **provisional** si depende de un número
  que todavía no se midió.
- El dueño de la decisión. Cuando la decisión es de gasto, el dueño es el cliente y se
  escribe así.

Decir "hay que integrar A con B" es transcripción. Decir "cuesta esto, hay tres caminos, y
recomendamos el segundo" es consultoría, y es lo que el cliente espera en la sesión, no
cuatro semanas después.

Este modo no reemplaza a la etapa 3. Produce la conversación que hay que tener con el
cliente mientras el discovery corre; la arquitectura sigue siendo de la etapa 3 y con
modelo frontera.

## Reglas

- Toda decisión cita su fuente: qué RF, qué sesión, qué restricción la motiva. Diseño
  sin trazabilidad es opinión.
- No diseñes lo que el RF no pide (YAGNI aplica también a arquitectura).
- Los supuestos técnicos sin confirmar van en el registro de riesgos o como pendiente
  con dueño, nunca implícitos.

## Modos de fallo

- **El RF detallado no está cerrado, en el modo largo de la etapa 3:** no arranques.
  Diseñar sobre RF light produce arquitectura que se rehace. Excepción: el PM lo pide
  explícitamente como borrador; márcalo `DRAFT sobre RF light` en la primera línea. Esto
  no aplica al modo corto de la etapa 2, que existe justamente para correr antes de que el
  RF esté cerrado.
- **Dos fuentes del inventario se contradicen** (ej. "tiene API" vs "se descarga a
  mano"): decisión = pendiente, con la llamada corta que lo resuelve.
- **El cliente impone stack que no encaja con un RNF** (ej. hosting que no cumple el
  RNF de disponibilidad): documenta el conflicto en riesgos y escálalo al PM; no lo
  resuelvas en silencio.
