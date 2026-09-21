# Plantilla — Discovery Técnico (integraciones, APIs, ERPs)

Para discoveries que validan integraciones con sistemas externos del cliente:
SAP, Oracle, Microsoft Dynamics, sistemas propietarios, ERPs en general.

## Cuándo usar esta plantilla

- Validar endpoints, APIs y modelo de datos de un sistema externo.
- Definir cómo se autenticará el portal con el sistema del cliente.
- Coordinar con un proveedor técnico tercero del cliente (consultora de SAP, equipo de ERP).
- Cualquier discovery donde el principal riesgo del proyecto es "si esta integración no funciona, el proyecto se cae".

## Estructura del documento

### Título principal
`DISCOVERY #[N] - [NOMBRE DEL FRENTE TÉCNICO EN MAYÚSCULAS]`

### Sección 1 — Datos del Proyecto

- **Cliente:** [cliente]
- **Project Manager:** [PM] | **Líder Codeable:** Paulo Tijero (Head of Delivery) + Tech Lead
- **Participantes esperados:** [Jefes de TI del cliente] + **proveedor [sistema] de [cliente]** (crítico)
- **Duración estimada:** 60 minutos

⚠️ La duración técnica sube a 60 min porque suele haber más detalle a validar.
⚠️ Siempre marcar al proveedor técnico tercero como **crítico** en participantes.

### Sección 2 — Objetivo de la Sesión

Plantilla:

> Validar técnicamente la integración con **[sistema externo]** vía **[mecanismo:
> Service Layer / OData / REST]**, mapear los endpoints disponibles, dejar definido
> cómo se hará **[transición/migración futura si aplica]** y coordinar la ejecución
> conjunta con **[proveedor técnico tercero]**.

### Sección 3 — Insumos que necesitamos antes de la sesión

Insumos típicos:
- *Versión exacta de [sistema externo] que tienen instalado.*
- *Documentación técnica del [API/mecanismo de integración] accesible (URL base, credenciales, ambiente de pruebas).*
- *Confirmación del proveedor [sistema] de su disponibilidad para trabajar con nosotros y en qué ventanas.*
- *Si ya existe, el cronograma oficial de [migración/cambio futuro].*
- *Diagrama de arquitectura actual del cliente.*
- *Política interna sobre exposición de servicios y restricciones de red.*

### Sección 4 — Agenda de la sesión

**Duración total:** 60 minutos.

Encabezado del día:
> **[Día] [DD] de [Mes]** | Objetivo: Validar integración [sistema] y cerrar plan de coordinación con proveedor.

#### Bloque 1 (5 min) — Contexto y objetivos de la sesión

- Recap: la integración va por [mecanismo] en [sistema actual], con migración a [sistema futuro] después. La capa de abstracción se diseña ahora para que el cambio sea solo de endpoint y autenticación.
- **Esta sesión es crítica:** [stakeholder técnico del cliente] ya manifestó que la integración con [sistema] es lo que más le preocupa porque puede tumbar el proyecto si falla.

#### Bloque 2 (15 min) — Validación del entorno actual

- Versión exacta de [sistema externo].
- ¿[Mecanismo de integración] está habilitado y operativo?
- ¿Tienen ambiente de pruebas o solo producción?
- ¿Hay personalizaciones sobre [sistema] que afecten endpoints estándar?
- **Pregunta clave:** *¿El proveedor [sistema] puede darnos un ambiente de testing donde podamos probar sin tocar producción?*

#### Bloque 3 (15 min) — Mapeo de endpoints y validación de operaciones

- Repaso del mapeo de operaciones necesarias (CRUD por entidad).
- Confirmar que todas las operaciones de lectura y escritura que necesitamos están disponibles.
- Manejo de la sesión multi-empresa (si aplica: CompanyDB en login distinto por cada empresa en SAP Business One).
- ¿El proveedor [sistema] debe habilitar algún endpoint adicional o todo viene out-of-the-box?
- **Pregunta clave:** *¿Hay algún endpoint que el proveedor haya restringido por política interna?*

#### Bloque 4 (10 min) — Plan de migración/transición futura

Aplica cuando el cliente está migrando o planeando upgrade:
- ¿Cuál es la fecha confirmada de migración a [sistema futuro]?
- ¿Qué parte de la migración es responsabilidad del proveedor [sistema] y qué parte queda para Codeable?
- Estrategia: el portal debe seguir operando durante la transición sin downtime.
- Costo de la asistencia de migración (si ya está incluido en propuesta, mencionarlo).
- **Pregunta clave:** *¿Quién es el contacto técnico del proveedor [sistema] que será nuestra contraparte durante la migración?*

#### Bloque 5 (15 min) — Cierre — compromisos de la sesión

Texto en cursiva: *Codeable Labs se compromete a:*

- Enviar plan técnico de integración + diagrama de arquitectura propuesto en 48h.
- Diseñar la capa de abstracción [sistema] a prueba de [migración futura].
- Producir documentación técnica de cada endpoint mapeado para revisión conjunta.

Texto en cursiva: *[Cliente] se compromete a:*

- Habilitar credenciales de [API/mecanismo] para ambiente de pruebas antes del próximo viernes.
- Confirmar fecha oficial de [migración/upgrade].
- Coordinar punto de contacto fijo del proveedor [sistema] para todo el proyecto.
- Compartir diagrama de arquitectura actual.

### Sección 5 — Objetivo de esta sesión

- Validar que la arquitectura de integración con [sistema] es viable y no representa un bloqueo técnico para el proyecto.
- Mapear cada endpoint que el portal necesita consumir o exponer, confirmando disponibilidad y restricciones.
- Definir el contrato de comunicación con el proveedor [sistema] y los tiempos de respuesta esperados.
- Establecer la estrategia de transición a [sistema futuro] sin interrumpir la operación del portal.
- El equipo de Codeable debe poder empezar a construir la capa de integración con confianza técnica y sin dependencias bloqueantes.

---

## Reglas para adaptar la plantilla

1. **Sustituir [sistema externo] por el nombre real:** SAP Business One, S/4HANA, NetSuite, Dynamics, etc.
2. **Si NO hay proveedor técnico tercero**, eliminar referencias y ajustar compromisos. Pero usualmente sí hay uno.
3. **Si NO hay migración futura**, eliminar el bloque 4 y redistribuir tiempo.
4. **El bloque 2 es no-negociable:** confirmar versión, ambientes y personalizaciones.
5. **Siempre incluir la pregunta de "ambiente de testing"**: no tenerlo es el primer indicador de proyecto con problemas.
