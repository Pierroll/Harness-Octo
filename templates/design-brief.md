# Entendimiento para diseño — <proyecto>

Vigencia: <YYYY-MM-DD> · Etapa: <2-analysis cerrada / 3-design en curso> · PM: <nombre>
**Versión:** <N> · reemplaza a `versions/design-brief-v<N-1>.md`, o "primera" · qué cambió: <una línea> · qué cerró la anterior: <checkpoint o entrega a diseño, con fecha>

Esto es lo que diseño necesita saber para empezar, en un solo lugar. No reemplaza la
documentación del discovery: la resume y apunta a ella. Si algo de este documento
contradice a un artefacto del discovery, gana el artefacto y este documento se corrige.

**Cómo leerlo.** Las secciones 2, 3 y 4 son las que no están en ningún otro lado y son las
que más cambian un diseño. El resto es referencia rápida.

---

## 1. El negocio en tres párrafos

<Qué hace el cliente, cómo gana dinero, y qué duele hoy. En el lenguaje del cliente, sin
jerga nuestra. Tres párrafos, no más.>

**Por qué ahora:** <qué lo disparó (una queja, una pérdida, una auditoría, una expansión) y
qué pasa si no se resuelve en seis meses. Separa lo urgente de lo que estaría bien tener.>

**Qué número quieren mover:** <uno a tres indicadores que el negocio va a medir: tiempo,
errores, costo, volumen, adopción. Quién lo revisa y cómo se mide hoy, si se mide.>

## 2. El proceso real, sin sistemas

<Cómo funciona esto en la vida real, sin hablar de software. Nace el potro, hay que
inscribirlo, en la inscripción pasa esto y lo otro. Es lo que permite proponer un flujo
mejor en vez de copiar el sistema actual con mejor UI.>

<Un bloque por proceso principal. Cada paso dice quién lo hace, qué pasa si sale bien y qué
pasa si sale mal.>

| Paso | Quién lo hace | Qué pasa después | Qué pasa si falla |
|---|---|---|---|

**Lo que hoy se hace fuera del sistema:** <WhatsApp, Excel, papel, llamadas. Casi siempre
está y casi nunca está documentado.>

## 3. Quién usa esto de verdad

<El cargo no alcanza. "Administrador, jefe de logística, usuario regular" no dice nada
sobre cómo hablarle a esa persona.>

| Rol | Quién es en realidad | Cuántos son | Nivel técnico | Idioma y lenguaje | Dónde y con qué trabaja |
|---|---|---|---|---|---|
| <rol> | <perfil real: edad típica, formación, de dónde vienen> | <N> | <alto / medio / bajo, con evidencia> | <lenguaje que entiende y el que no> | <campo o escritorio, móvil o desktop, conectividad> |

**Qué hace cada rol, como tarea:** <verbo más objeto, "registrar pago", no "módulo de
pagos". Qué hace justo antes y justo después de usar el sistema, y qué decide con lo que
obtiene ahí.>

**Volumen y ritmo:** <cuántos usuarios, cuántos casos por día o por mes, con qué frecuencia
repite cada rol su tarea (todos los días, una vez al mes, dos veces al año), si hay picos
(cierre de mes, campaña) y en qué entorno físico se usa: oficina, campo, mostrador, con
guantes, sin internet.>

**Lo que esto cambia:** <una línea por rol donde el perfil obliga a algo concreto: lenguaje
simple, pocos campos, letra grande, funcionar sin señal.>

## 4. Mapa de estados

<Por cada entidad importante: en qué estados puede estar, qué la mueve de uno a otro, y qué
tiene que pasar cuando se mueve. Cada transición suele ser una notificación, una pantalla o
un permiso que cambia.>

### <Entidad>

| Estado | Pasa a | Qué dispara el cambio | Quién lo dispara | Qué debe pasar cuando ocurre |
|---|---|---|---|---|

**Estados terminales:** <de cuáles no se vuelve.>
**Transiciones manuales:** <cuáles las hace una persona a mano y cuáles el sistema solo.>

## 5. El sistema actual

<Qué usan hoy, con acceso para verlo. Un link, una captura o un export por cada pantalla o
formulario que vamos a reemplazar. Esta sección es la que evita rediseñar a ciegas.>

<Vale también para lo que no es software: la foto del formulario en papel, el reporte real
con datos (anonimizados si hace falta), el Excel que usan. Un documento real revela campos,
reglas y excepciones que en la reunión nadie menciona porque para ellos son obvias. Cada
requisito relevante debería tener el suyo; el que no lo tiene se anota en la sección 8.>

| Qué es | Cómo verlo | Qué lo reemplaza | Notas |
|---|---|---|---|

## 6. Campos, validaciones y reglas

<Resumen de lo que hay en `inventory-fields.md` y `inventory-rules.md`. En esta sección va
lo que cambia una pantalla, no el inventario completo.>

- **Campos que hoy se piden y podrían salir de una fuente existente:** <lista>
- **Reglas duras:** <las que siempre se cumplen>
- **Reglas de criterio:** <las que dependen del juicio de una persona; suelen necesitar
  pantalla de revisión, no automatización>

## 7. Lo que ya está decidido

<Decisiones tomadas con el cliente que no se reabren, cada una con quién la decidió. Sirve
para no proponer algo que ya se descartó.>

**Quién decide de verdad:** <nombre, no cargo, de quien aprueba el diseño en última
instancia, y quién más tiene que firmar antes de construir. Si lo validaron solo con
gerencia y no con los usuarios reales, se dice acá.>

## 8. Lo que todavía no se sabe

<Pendientes abiertos con dueño y fecha. Diseño necesita saber sobre qué está parado en
firme y sobre qué no.>

## 9. Restricciones

<Stack impuesto, sistema de diseño existente, marca, accesibilidad exigida por contrato,
idioma, dispositivos, navegadores. Lo que limita el diseño antes de empezar.>

## 10. Dónde está el resto del material

| Qué | Dónde |
|---|---|
| Requisitos detallados | <ruta> |
| Notas y actas de sesión | `discovery/2-analysis/outputs/` |
| Inventarios completos | `discovery/2-analysis/outputs/inventory-*.md` |
| As-Is y To-Be | <ruta> |
| Decisiones de alcance | `discovery/2-analysis/outputs/scope-decisions.md` |
