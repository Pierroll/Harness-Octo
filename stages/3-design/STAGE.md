# Etapa 3 — Diseño

## Propósito

Tomar los requisitos validados y producir las decisiones técnicas y económicas que cierran
el discovery: pantallas, arquitectura, modelo de datos, integraciones, estimación
refinada e informe final. Es la etapa más sensible del arnés:
un error de arquitectura o de estimación se paga durante todo el proyecto.

**Regla de modelo:** los skills de esta etapa marcados [frontera] se corren con el modelo
más capaz disponible: Fable y, si no está, Opus, nunca menos. En esta etapa se queman
tokens a propósito, y cada artefacto anota con qué modelo se produjo.

## Goals

1. Mostrarle al cliente cómo se va a ver su sistema, antes que cualquier otro artefacto de
   esta etapa.
2. Cubrir cada requisito con un módulo de la arquitectura y cerrar la decisión de cada
   integración.
3. Hacer que el equipo que va a construir opine sobre las pantallas y la arquitectura en la
   misma sesión en que se refina la estimación, y mover las tallas con lo que diga.
4. Declarar el supuesto que sostiene cada talla y sincerar el cronograma contra la
   estimación.
5. Dejar la etapa 4 en condiciones de arrancar sobre lo que el discovery ya respondió.

## El orden de la etapa

```
UI/UX y pantallas → arquitectura y modelo de datos → estimación refinada con el equipo →
entrega → checkpoint
```

**El UI/UX abre.** Por dos razones. La comercial: al cliente se le muestra valor desde el
primer día con prototipos de diseño, y el área de negocio se convence con eso mucho antes
que con un diagrama de entidades. La técnica: la arquitectura y el modelo de datos
evolucionan mientras el producto se define y no quedan cerrados el día uno, así que no hay
un modelo terminado del que dependan las pantallas y la estimación.

El UI/UX y la arquitectura **avanzan en paralelo** y en algún punto convergen. El orden de
esta lista dice cuál abre, no cuál espera a cuál.

**La estimación refinada y la revisión con el equipo son un solo paso.** La revisión es la
acción y la estimación refinada es su resultado; separarlas producía dos pasos que nadie
sabía distinguir. Se corre después de las pantallas y la arquitectura, cuando ya hay algo
concreto que mirar: pantallas, módulos y entidades. Con eso sobre la mesa el equipo aporta
lo único que sabe mejor que nadie, qué ya existe y qué es más caro de lo que parece, y eso
es exactamente lo que mueve las fechas de entrega.

El paso forma ciclo con la arquitectura. Si la revisión tumba una decisión técnica, se
corrige la arquitectura y se vuelve a pasar por la revisión con el equipo. Es más barato
que descubrirlo construyendo.

**La entrega va al cierre.** Qué se entrega depende de hasta dónde llegó el contrato: ver
más abajo.

## Entradas obligatorias

Están en `CONTRACT.md`, cada una con qué la satisface y qué la invalida. Se declaran por
artefacto y no por etapa anterior: un proyecto puede satisfacerlas con material propio,
con un discovery previo o con lo que traiga la propuesta, y de dónde vienen no importa
mientras existan y sigan vigentes. Ver `stages/modalities.md` y `skills/entry-check/`.

## Artefactos mínimos

Están en `CONTRACT.md`, cada uno con el skill que lo produce, quién lo corre y la ruta en
la que vive, incluidos los que solo aplican según la modalidad declarada en el
`overrides.md` del proyecto.

## El paso de UI/UX

Abre la etapa y produce el inventario de flujos y pantallas (`screen-inventory.md`), el
design system (`design-system.md`) y los mockups (`mockups/`), con cada pantalla conectada
a los requisitos que cubre.

Lo que recibe diseño para empezar es el documento de entendimiento que produce
`skills/design-brief/` al cerrar la etapa 2: el proceso real del negocio, quién es cada
usuario, el mapa de estados y cómo ver el sistema actual. Antes se les entregaba todo el
material del discovery, y con cuatro o cinco proyectos encima eso significa escuchar
grabaciones para averiguar un dato.

Lo corre `skills/ui-design/`, en el orden que describió Darío Calero. Primero el inventario
de flujos y pantallas, sacado del RF detallado, el brief y la tabla de roles, con cada
pantalla citando los requisitos y criterios que cubre. Después el design system, que se
enchufa: el del cliente, una librería pública declarada, o uno propio elegido entre tres
direcciones visuales sobre una pantalla representativa (A36). Después, por cada
pantalla, tres direcciones en texto ya pasadas por el filtro estructural (un requisito de
veinte campos no se dibuja como veinte campos) y tres imágenes, que el PM elige con el
equipo de diseño en un tablero en el navegador. Solo la alternativa elegida pasa a HTML,
armado por flujo, y eso es lo que se le presenta al cliente. Su feedback se registra por
pantalla, y lo que contradice un requisito aprobado corre `skills/reopen-artifact/`.

El paso termina en el HTML validado por el cliente. Milko Rivera y Diego López confirmaron el
3 de septiembre de 2026 que así trabajan: el HTML es lo primero que presentan, sirve para
validar lo nuevo con el cliente, y una vez validado lo pasan a Figma, donde se hacen los
cambios posteriores. Ese paso a Figma es el 9 de `skills/ui-design/`, con el servidor MCP de
html.to.design. El design system se arma por cliente, reutilizando bloques de proyectos
anteriores, o se usa el del cliente si ya lo tiene; también confirmado (`AGREEMENTS.md`,
A27).

Los pasos que deciden (inventario, direcciones, filtro, trazabilidad) corren con el modelo
frontera; el HTML y el CSS, con Opus en subagentes; las imágenes las genera OpenAI con la
clave de OCTO, que va en la máquina del PM y nunca en el repo.

Si el proyecto entrega mockups como demostración de viabilidad en una etapa anterior
(`skills/feasibility-demo/`), esos mockups son insumo de este paso, no lo reemplazan.

## Los equipos que se activan en esta etapa

Esta etapa la corren varios equipos a la vez. Se activan por dependencia el equipo de diseño,
el de desarrollo, el de seguridad y, cuando el proyecto lo pide, el de
infraestructura. Cada uno produce documentación propia.

Vale la pena tenerlo escrito porque explica por qué la etapa se siente más larga de lo que
el cronograma dice: son cuatro o cinco frentes que hay que sincronizar.

## Por qué la revisión con el equipo va dentro de esta etapa

Toda etapa se revisa, pero con revisiones distintas: cambia quién revisa y qué busca.

Las etapas 1 y 2 producen documentos que **valida el cliente**, y esa validación ya está
adentro de ellas: el kickoff contrasta el problema reconstruido, las sesiones validan el
As-Is, y la negociación del RF light es el cliente decidiendo requisito por requisito. El
revisor natural de esas etapas es él, porque lo que se está afirmando es cómo funciona su
negocio y qué quiere que se construya. La etapa 3 produce otra clase de documento: un
compromiso hacia adentro, fechas y esfuerzo por módulo, y de eso el cliente no sabe nada.
Su revisor natural es el equipo que va a tener que cumplirlo.

El checkpoint en sesión fresca tampoco lo cubre, porque revisa consistencia y no
factibilidad. Una sesión fresca puede verificar que cada requisito tenga un módulo que lo
cubra y que los números cuadren entre artefactos. Lo que no puede saber es que el módulo
de reportes ya existe a medias en otro proyecto, o que integrarse con cierto proveedor
tomó tres semanas la última vez y no las dos que dice la talla. Eso lo sabe solamente
quien tiene las manos en el código, y son los dos factores que más mueven un número: qué
ya existe y qué es más caro de lo que parece.

Y está el costo del error. Un error en la etapa 1 o en la 2 se corrige en la sesión
siguiente con el cliente, que es la semana que viene. Un error de estimación se paga durante
todos los meses que dure el proyecto, y no aparece hasta que ya se está construyendo. Lo que
sale de esta etapa es lo que se firma: fases, meses, un equipo con nombres y dedicación, y
una fecha de piloto. Por eso la revisión va adentro y antes de cerrar el número, no después.

## Qué se entrega y hasta dónde llega el discovery

Depende de lo que compró el cliente (`stages/modalities.md`):

- **El discovery cierra en la etapa 2.** El cliente pagó por el análisis y se lleva el
  catálogo de requisitos detallados. Con eso construye con nosotros o con quien quiera.
  Esta etapa 3 no corre.
- **El discovery se extiende hasta la etapa 3.** El cliente pidió también el diseño. Lo que
  se entrega es la entrega de diseño: arquitectura, modelo de datos, pantallas aprobadas y
  cronograma de implementación.

En el segundo caso aparece un artefacto opcional que algunos clientes piden por contrato:
el **RF detallado extendido**, que es el catálogo de requisitos con el modelo de datos y
los diseños aprobados incrustados en cada historia. Una historia de backend lleva la
estructura de datos que espera; una de frontend lleva su pantalla.

Sirve para que un proveedor externo construya una parte sin bajar
el estándar de calidad: se le entrega la historia con sus criterios de aceptación, su
modelo y su diseño, y lo que no cumple eso no se acepta. Sin ese documento, la única forma
de sostener la calidad es hacerlo uno mismo.

## Roles en esta etapa

- **Líder (PM):** convoca la sesión de estimación con el equipo, decide entre alternativas de
  arquitectura cuando el diseño presenta opciones, valida la estimación contra el tablero
  de esfuerzos, presenta al cliente.
- **Equipo de implementación:** participa en la revisión inicial. Aporta lo único que
  nadie más tiene: qué ya existe en el código y qué es más caro de lo que parece.
- **Equipo de diseño:** elige con el PM entre las alternativas de cada pantalla, recibe el
  archivo de Figma importado desde el HTML validado por el cliente y sigue ahí los cambios
  posteriores.
- **Implementador:** produce los artefactos con los skills, en modelo frontera donde está
  marcado.
- **Validador/Auditor (sesión fresca):** checkpoint de salida. Para arquitectura y
  estimación, la sesión fresca también corre en modelo frontera.

## Checkpoint de salida

Sesión fresca con `skills/checkpoint-review/` confirma:

1. `screen-inventory.md` existe, cada pantalla cita los requisitos y criterios que cubre, y
   la trazabilidad cierra en los dos sentidos: ningún requisito dentro del alcance sin
   pantalla, ninguna pantalla sin requisito. `design-system.md` existe con su bitácora,
   cada pantalla tiene su alternativa elegida con razón y su HTML en `mockups/`, los
   mockups se presentaron al cliente y su feedback está registrado por pantalla con
   decisión.
2. Cada RF del catálogo está cubierto por la arquitectura (ningún módulo huérfano) y cada
   integración tiene decisión tomada: API, automatización o pendiente con plan.
3. La revisión con el equipo ocurrió sobre las pantallas y la arquitectura ya escritas, y
   su registro dice qué tallas se movieron. Cada objeción tiene resolución escrita.
4. La estimación cubre todos los módulos, usa las tallas estándar (XS 0.2d, S 0.5d, M
   1.5d, L 3d, XL 7d) y el supuesto que sostiene cada talla está escrito.
5. El cronograma quedó actualizado contra la estimación refinada. Si la fecha se movió, se
   le dijo al cliente en el momento, no al final. Cada tarea cita el requisito que
   implementa, y el cruce cierra en los dos sentidos: ningún requisito sin tarea, ninguna
   tarea sin requisito salvo las de habilitación, que se cuentan.
6. Los riesgos altos tienen mitigación, no solo mención, y el registro es el mismo que se
   abrió en la etapa 1, no uno nuevo.
7. El informe final pasa la revisión de estilo human-written
   (`skills/discovery-report/references/writing-style.md`).
8. La tabla de cierre está llena, el checklist de la etapa está cerrado o con sus
   pendientes justificados, y el relevamiento escrito.

## Definición de terminado

Pantallas y arquitectura cerradas, estimación refinada y cronograma de implementación, informe
presentado al cliente, relevamiento escrito, tabla de cierre llena, checkpoint pasado con
registro. El discovery está entregado y la etapa 4 arranca sobre lo que el discovery ya
respondió.
