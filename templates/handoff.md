# Relevamiento — <proyecto> — cierre de la etapa <N>

El documento de traspaso. Lo escribe quien cierra una etapa para quien toma la siguiente.
Se escribe en cada transición: de la 1 a la 2, de la 2 a la 3, y de la 3 a la
implementación.

Se escribe siempre, cambie o no la persona. Las tres etapas las puede hacer la misma
persona o tres personas distintas, y eso se sabe después, no antes. Es mejor tenerlo y no
usarlo que necesitarlo y no tenerlo. Además, un documento que solo se redacta de vez en
cuando se redacta mal.

Los otros artefactos de la etapa cuentan qué hay que construir. Este cuenta lo que no está
en ningún otro lado: cómo es trabajar con este cliente.

Máximo 3 páginas, igual que el documento de entendimiento: lo tiene que poder leer entero
alguien que recién entra, de una sentada y antes de su primera reunión. Cada afirmación
lleva de dónde sale, sea una sesión, un correo o una conversación. Estilo: ver
`harness/skills/discovery-report/references/writing-style.md`.

- **Quién cerró la etapa <N>:** <nombre>
- **Quién toma la etapa siguiente:** <nombre, o "sin definir">
- **Fecha del traspaso:** <YYYY-MM-DD>

## Quién es quién del lado del cliente

| Persona | Rol formal | Qué decide de verdad |
|---|---|---|
| <nombre> | <cargo> | <si decide, si bloquea, si solo firma, si es quien sabe cómo funciona el negocio> |

El cargo y el poder de decisión no siempre coinciden. Esta tabla existe para eso: la
persona que firma no siempre es la que puede destrabar un pendiente, y averiguarlo de
nuevo cuesta semanas.

## Qué se prometió de palabra

<Lo que se dijo en una reunión y no quedó en el contrato ni en el catálogo de requisitos.
El cliente lo recuerda aunque no esté escrito, y quien entra sin saberlo queda mal en la
primera conversación.>

## Dónde el cliente es sensible

<Temas que hay que tocar con cuidado, gente con la que hubo fricción, decisiones que
costaron y que no conviene reabrir sin buena razón.>

## Qué se sacó del alcance y por qué

<Viene de `scope-decisions.md`. En esta sección va la versión con contexto: qué quería el
cliente, por qué no entró, y si quedó como algo a vender después o como algo cerrado.>

## Pendientes que hereda quien entra

| Pendiente | Quién lo destraba | Historia |
|---|---|---|
| <qué falta> | <nombre, de qué lado> | <cuántas veces se pidió, por qué no se ha resuelto> |

La columna de historia es la importante. Un pendiente que se pidió tres veces y sigue
abierto no se destraba insistiendo una cuarta.

## Cómo fue esta etapa

<Qué salió bien, qué costó, qué sesión hubo que repetir y por qué. Sirve para calibrar
expectativas de ritmo con este cliente.>

## Qué NO va en este documento

La tabla de goals y artefactos con su estado va en `templates/stage-closure.md`, que se
llena junto con este documento. Ese es el marcador de la etapa; este es el contexto humano
que el marcador no captura.
