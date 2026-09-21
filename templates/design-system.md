# Design system: <proyecto>

Vigencia: <YYYY-MM-DD> · Etapa: 3-design · PM: <nombre>
**Versión:** <N> · reemplaza a `versions/design-system-v<N-1>.md`, o "primera" · qué cambió: <una línea> · qué cerró la anterior: <checkpoint o presentación al cliente, con fecha>
**Producido con:** <Fable para las direcciones, Opus para los tokens> · imagen aprobada: `mockups/design-system/r<N>/variant-<X>.jpg`

Lo produce `harness/skills/ui-design/` en su paso 2. Camino: <1, el design system del
cliente, en <dónde está el original> (caso A: el cliente trae base) / 2, librería pública
<nombre y versión> con los átomos cambiados / 3, propio, elegido en el tablero entre tres
direcciones sobre la pantalla <ID>, con el equipo de diseño (2 y 3 son el caso B: el cliente
no trae nada)>. El CSS que lo aplica es `mockups/design-system.css`: si este documento
cambia, el CSS se regenera.

Cómo trabaja el equipo de diseño: un design system por cliente, sin partir de cero, con
bloques reutilizados de proyectos anteriores y los átomos cambiados para este cliente. Si el
cliente ya tiene el suyo, este documento describe el suyo y dice de dónde sale.

---

## 1. Contexto del producto

- **Qué es:** <una o dos líneas, en lenguaje del cliente>
- **Quién lo usa y dónde:** <roles del brief, sección 3: dispositivo, conectividad, nivel técnico>
- **Rubro y referentes:** <qué esperan ver los usuarios de este rubro>
- **Lo único que el cliente quiere que se recuerde:** <respuesta del PM o pendiente con dueño>

## 2. Dirección elegida (camino 3) o base del cliente (camino 1)

<Camino 3, elegida en el tablero:>

- **Nombre:** <el de la dirección ganadora>
- **En una línea:** <qué la define>
- **Lo que se mantiene convencional:** <dos o tres decisiones que el usuario espera de su rubro, y por qué no se tocan>
- **Lo que hace distinto al producto:** <dos o tres decisiones deliberadas, qué se gana y qué cuesta cada una>
- **Direcciones descartadas:** <A y C: nombre y por qué no>

<Camino 1, base del cliente:>

- **Material leído:** <librería de Figma, sitio, manual de marca, capturas: cuál, de dónde, con qué herramienta, en qué fecha>
- **Lo que se respeta tal cual:** <tokens y componentes que vienen del cliente y no se tocan>
- **Lo que faltaba y se completó:** <qué no tenía la base (por ejemplo, componentes de formulario) y con qué criterio se completó, cada hueco con dueño para confirmarlo con el cliente>

<Camino 2, librería pública: se nombra la librería y versión en la cabecera y esta sección
lista solo los átomos cambiados.>

## 3. Tipografía

| Rol | Familia | Pesos | Tamaño | Notas |
|---|---|---|---|---|
| Títulos | | | | |
| Cuerpo | | | | no menos de 16 px |
| Etiquetas y controles | | | | |
| Datos y tablas | | | | números tabulares |

Carga: <fuentes del sistema, o familia y alternativa local; sin recursos externos en los mockups>.

## 4. Color

| Uso | Valor | Dónde va |
|---|---|---|
| Primario | #… | acciones principales |
| Secundario | #… | |
| Fondo y superficies | #… / #… | |
| Texto | #… / #… | contraste mínimo 4.5:1 en cuerpo |
| Éxito / advertencia / error / información | #… / #… / #… / #… | |

Enfoque: <contenido, con un acento raro y significativo / balanceado / expresivo>. Modo
oscuro: <no aplica / cómo>.

## 5. Espaciado

- **Unidad base:** <4 u 8 px>
- **Densidad:** <compacta / cómoda / amplia, y por qué según quién lo usa>
- **Escala:** <2, 4, 8, 16, 24, 32, 48, 64>

## 6. Layout

- **Grilla:** <columnas por punto de quiebre>
- **Ancho máximo de contenido:** <px>
- **Radios:** <sm, md, lg, y qué elemento usa cuál>
- **Navegación:** <dónde está, qué muestra por rol, cómo dice dónde estoy>

## 7. Componentes

Solo los que usan las pantallas del inventario. Cada uno con su estado normal, foco,
deshabilitado y error cuando aplica. Se marca cuáles vienen de la librería o del design
system del cliente tal cual, cuáles se ajustaron y cuáles son nuevos para este cliente.

| Componente | Reglas | Pantallas que lo usan |
|---|---|---|
| Botón primario y secundario | | |
| Campo con etiqueta visible | la etiqueta nunca es solo el placeholder | |
| Selector, fecha, archivo | | |
| Tabla con filtros | | |
| Paso a paso (wizard) | | |
| Aviso: éxito, error, vacío | | |
| Tarjeta | solo cuando la tarjeta es la interacción | |

## 8. Restricciones del cliente

<Marca, manual de identidad si existe, accesibilidad exigida, dispositivos y navegadores,
idioma. Sale del brief (sección 9) y de `overrides.md`.>

## 9. Bitácora de decisiones

| Fecha | Decisión | Razón | Quién |
|---|---|---|---|
| <YYYY-MM-DD> | Dirección <X> elegida entre tres (camino 3) | <estrellas y comentarios del tablero> | <PM y diseño> |
| <YYYY-MM-DD> | Base leída de <fuente del cliente> (camino 1) | <qué se respetó y qué se completó> | <PM> |
