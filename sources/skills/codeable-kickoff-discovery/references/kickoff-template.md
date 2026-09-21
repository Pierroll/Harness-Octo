# Plantilla — Kickoff

Esta plantilla genera la primera sección del documento unificado: la agenda del kickoff.

## Estructura del documento

### Título principal
`KICKOFF – [NOMBRE DEL PROYECTO EN MAYÚSCULAS]`

### Subtítulo
Nombre formal del proyecto. Ejemplo: *"PORTAL DE PROVEEDORES CON AUTOMATIZACIÓN DE FACTURAS (IA + SAP)"*

### Sección 1 — Datos del Proyecto

Formato de tabla:
- **Cliente:** [nombre del cliente]
- **Project Manager:** [PM asignado] | **Head of Delivery:** Paulo Tijero
- **Duración total:** [duración del proyecto, ej: ~5 meses]

### Sección 2 — Objetivo del Kick Off

Texto de 2-3 líneas. Plantilla:

> Dar inicio formal al proyecto de **[cliente]**. Esta sesión no es técnica: queremos
> alinear expectativas, confirmar que entendemos el problema, presentar cómo vamos a
> trabajar juntos y dejar agendadas las sesiones de Discovery con sus responsables.
> El detalle técnico se resuelve en esas sesiones (discoveries).

### Sección 3 — Agenda de la sesión

**Duración total:** 90 minutos.

Encabezado del día con `diaHeader`:
> **[Día] [DD] de [Mes]** | Objetivo: Alinear expectativas y Situación Actual.

#### Bloque 1 (15 min) — Bienvenida y presentación del equipo

- Ronda de presentaciones: nombre y rol de cada participante.
- Confirmar quién es el punto de contacto del día a día en [cliente] para el proyecto.
- Confirmar canal de comunicación oficial (WhatsApp, correo, Teams).

#### Bloque 2 (15 min) — Demostramos que entendemos el problema

- 3-5 bullets que sinteticen el problema del cliente (extraído de la propuesta).
- Cada bullet aporta una pieza concreta del dolor: dato, escala, riesgo, errores frecuentes.
- Incluir un bullet de "esta plataforma será la base para X" si hay extensibilidad futura.
- **Pregunta clave:** *¿Hay algo que no hayamos capturado bien o que haya cambiado desde que se escribió la propuesta?*

#### Bloque 3 (15 min) — La solución - visión general

- Lista de 5-7 funcionalidades/componentes principales (en **negrita** el nombre del componente).
- Cada bullet en lenguaje de cliente, no técnico.
- Incluir decisiones técnicas relevantes que se hayan tomado en conversaciones previas (ej. "hosting en [cloud]").
- **Pregunta clave:** *¿Alguna parte de esta visión genera dudas antes de arrancar?*

#### Bloque 4 (10 min) — Cómo vamos a trabajar

- Metodología ágil con sprints semanales - no esperan [X] meses para ver algo.
- **Demos cada viernes** con avance funcional visible. Están invitados [stakeholders clave].
- Dailies de 15 min de martes a jueves; planning viernes; refinamiento lunes. [Cliente] puede sumarse a las que considere necesarias.
- Reunión semanal de 30 min de seguimiento de proyecto. **¿Qué día les funciona?**
- Si hay una decisión bloqueante, se escala de inmediato - no se espera a la reunión semanal.
- Cambios de alcance ligeros entran sin costo; cambios que muevan el cronograma >1 sprint se formalizan mediante orden de cambio.
- Soporte post-lanzamiento de 2 semanas con equipo dedicado + garantía permanente sobre fallas no causadas por modificación del código.

#### Bloque 5 (20 min) — Sesiones de Discovery que necesitamos agendar esta semana

Tabla `dataTable` con dos columnas: `Sesión` y `¿Con quién?`.

Formato de cada fila:
- **Columna "Sesión":** `d[N] ⇒ [Frente] - [tema específico] ([fecha si está confirmada, en azul])`
- **Columna "¿Con quién?":** nombres del lado del cliente separados por ` - `

Ejemplo de filas (adaptar al proyecto):
- `d1 ⇒ Negocio - homologación de proveedores, criterios y documentos requeridos (6 de mayo)` | `Joisy - Jose Cardenas`
- `d2 ⇒ Finanzas - flujo de actas, registro de facturas, condiciones de pago, estados granulares y constancias (7 de mayo)` | `Jorge Peralta - Jose Cardenas - Pia Cabrera - Leonardo`
- `d3 ⇒ Multi-empresa - definición de empresas del grupo en V1 y modelo de acceso` | `Leonardo`
- `d4 ⇒ Técnica SAP - endpoints Service Layer, mapeo a HANA y coordinación con proveedor SAP` | `Jhonnatan + Jhonny + Jimmy + Cinthia`
- `d5 ⇒ Infraestructura [cloud] - ambientes, VPN, dimensionamiento de recursos` | `Jhonnatan + Jhonny + Keneth`
- `d6 ⇒ Negocio - módulo de licitaciones (bases, criterios, flujo de adjudicación)` | `Joisy - Jose Cardenas - Walter Salinas`
- `d7 ⇒ [Frente específico del proyecto]` | `[Stakeholders]`

**Pregunta clave:** *¿Pueden confirmar hoy quién es la persona correcta para cada sesión? ¿Hay alguien del [proveedor externo crítico] que debamos sumar a la sesión técnica?*

#### Bloque 6 (10 min) — Accesos que necesitamos para no bloquearnos

- 4-6 accesos críticos para arrancar (sistemas, credenciales, ambientes, datos).
- En **negrita** el nombre del acceso, descripción detrás.
- **Pregunta clave:** *¿Hay un proceso interno de aprobación de accesos que debamos anticipar? ¿Quién aprueba la habilitación de puertos y VPN?*

#### Bloque 7 (5 min) — Decisiones urgentes que no dependen de nosotros

- 2-3 decisiones que el cliente debe tomar internamente para no bloquear el arranque.
- En **negrita** el nombre de la decisión, descripción detrás.
- **Pregunta clave:** *¿Hay alguna de estas decisiones que ya esté resuelta internamente?*

#### Bloque 8 (5 min) — Cierre - compromisos de ambos lados

Texto introductorio en cursiva: *Codeable Labs se compromete a:*

- Enviar resumen de esta reunión antes del cierre del día de hoy.
- Proponer horarios para las [N] sesiones de Discovery en las próximas 24 horas.
- Compartir plan detallado de la Etapa 1 (Levantamiento de Requerimientos) antes del viernes.
- Habilitar acceso al tablero de seguimiento del proyecto.

Texto en cursiva: *[Cliente] se compromete a:*

- Confirmar punto de contacto por sesión de Discovery.
- Iniciar la gestión de accesos a [sistemas principales] esta semana.
- [Compromiso específico al proyecto].
- [Compromiso específico al proyecto].

---

## Reglas para adaptar la plantilla

1. **Reemplazar genéricos:** todo entre `[corchetes]` se sustituye por valores reales.
2. **Personalizar bloques 2 y 3:** estos son los que más demuestran que entendiste el negocio del cliente.
3. **Tabla de discoveries:** ajustar al número real de sesiones (típico: 5-7 sesiones).
4. **Cloud:** sustituir por el real (Azure, GCP, AWS, OCI). Verificar en transcripciones previas.
5. **Si no hay decisiones urgentes ni accesos críticos**, eliminar esos bloques y redistribuir tiempo.
