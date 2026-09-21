# Inventario de flujos y pantallas: <proyecto>

Vigencia: <YYYY-MM-DD> · Etapa: 3-design · PM: <nombre>
**Versión:** <N> · reemplaza a `versions/screen-inventory-v<N-1>.md`, o "primera" · qué cambió: <una línea> · qué cerró la anterior: <checkpoint o presentación al cliente, con fecha>
**Producido con:** <Fable / Opus> · fuentes: `requirements-full.md` (versión <N>), `design-brief.md` (<fecha de vigencia>), `roles-table.md`, `scope-decisions.md`

Lo produce `harness/skills/ui-design/`. Cada pantalla cita los requisitos y criterios que
cubre; una pantalla sin requisito no existe y un requisito dentro del alcance sin pantalla
es un hueco que se ve en la sección 6. Lo leen `team-review`, `estimation` y el informe.

Estados de una pantalla: `inventariada`, `direcciones confirmadas`, `imagen aprobada`,
`html listo`, `presentada`, `aprobada por el cliente`, `con cambios pendientes`.

---

## 1. Flujos

Un flujo es lo que un rol recorre para lograr el beneficio de su historia. Sale de los
requisitos, sus dependencias y su flujo de interacción. Solo requisitos con estado dentro en
`scope-decisions.md`; los diferidos van en la sección 7.

| ID | Flujo | Rol | Objetivo (el "para" de la historia) | Requisitos que cubre | Pantallas |
|---|---|---|---|---|---|
| F-<XXX> | <nombre en lenguaje del cliente> | <rol de `roles-table.md`> | <una línea> | RF-… | P-<XXX>-01 a P-<XXX>-<NN> |

**Pantalla representativa para el design system:** <ID>, porque <la más usada o la más
cargada de datos>.

## 2. Pantallas

Una tabla por flujo. Dispositivo sale de "Interfaz" del requisito; el perfil real del rol
(brief, sección 3) dice qué densidad y qué lenguaje aguanta.

### F-<XXX> · <flujo>

| ID | Pantalla | Qué hace | Requisitos y criterios | Rol | Dispositivo | Estados a dibujar | Dirección elegida | Estado | HTML |
|---|---|---|---|---|---|---|---|---|---|
| P-<XXX>-01 | <nombre> | <una línea> | RF-… (criterios 1, 3) | <rol> | Web / Mobile / PDA | <vacío, error de validación, éxito> | <A/B/C: nombre> | inventariada | `mockups/<flujo>/P-<XXX>-01-<nombre>.html` |

## 3. Direcciones por pantalla

Las tres direcciones de cada pantalla, en texto, ya pasadas por el filtro de
`harness/skills/ui-design/references/structural-filter.md`. Difieren en estructura,
agrupación y navegación; la tipografía y el color los fija el design system.

### P-<XXX>-01 · <pantalla>

Filtro aplicado: <qué disparó y por qué, por ejemplo "18 campos: se agrupan por tipo de
dato en pasos">.

| Dirección | Nombre | Qué propone | Ronda | Elegida |
|---|---|---|---|---|
| A | <nombre> | <una línea> | r1 | |
| B | <nombre> | <una línea> | r1 | sí |
| C | <nombre> | <una línea> | r1 | |

Por qué se eligió: <estrellas y comentarios del tablero, quién eligió, fecha>. Imágenes en
`mockups/<flujo>/P-<XXX>-01/r1/`. Si hubo más rondas, cada una en su carpeta; nada se borra.

## 4. Design system

Ver `design-system.md`. Dirección elegida: <nombre>, imagen aprobada en
`mockups/design-system/r<N>/variant-<X>.jpg`.

## 5. Feedback del cliente

Se llena en la presentación y en cada ronda después. Lo que contradice un requisito
aprobado, la tabla de roles o el To-Be lleva la marca y corre `harness/skills/reopen-artifact/`.

| Fecha | Pantalla | Qué dijo (cita) | Decisión | Contradice |
|---|---|---|---|---|
| <YYYY-MM-DD> | P-<XXX>-01 | <cita> | aplicado / pendiente con <dueño> / descartado porque <razón> | `contradice: <ruta>` o vacío |

## 6. Trazabilidad

Las tres listas deben quedar vacías antes del checkpoint. Si algo queda, es un hueco con
dueño, no una nota.

- **Requisitos dentro del alcance sin pantalla:** <ninguno / RF-… con dueño y fecha>
- **Pantallas sin requisito:** <ninguna>
- **Requisitos fuera del alcance o diferidos que aparecen en alguna pantalla:** <ninguno>

## 7. Fuera de este diseño

Requisitos diferidos en `scope-decisions.md` y lo que el cliente pidió en la presentación y
quedó fuera. Con su razón.

## 8. Qué pasa después con esto

El HTML validado por el cliente pasa a Figma con el paso 9 de `skills/ui-design/`, y desde
ahí lo sigue el equipo de diseño; los cambios que vengan después se hacen en Figma, no aquí
(confirmado por Milko Rivera y Diego López el 3 de septiembre de 2026). Ver `AGREEMENTS.md`,
A27.

- **Archivo de Figma:** <URL> · importado el <YYYY-MM-DD> · pantallas importadas: <N de M>
  · <si entraron pantallas sin validar por el cliente, quién lo decidió y por qué>
- **Lo que el importador no respetó:** <fuentes que Figma no tiene, grillas, componentes
  partidos en capas; una línea cada uno, para que diseño sepa qué corregir primero>
