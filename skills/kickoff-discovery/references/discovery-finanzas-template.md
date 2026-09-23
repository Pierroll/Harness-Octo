# Plantilla — Discovery de Finanzas

Para discoveries con líderes de finanzas, tesorería, contabilidad o control financiero
del cliente.

## Cuándo usar esta plantilla

- Discovery que involucra flujos de pago, conciliación, facturación, cobranza.
- Discovery sobre estados de transacciones (por ejemplo pendiente, programado, pagado).
- Discovery sobre retenciones, impuestos, condiciones de pago, constancias.
- El dueño del lado del cliente es Tesorería, CFO o Contralor.

## Estructura del documento

### Título principal
`DISCOVERY #[N] - [NOMBRE DEL FRENTE EN MAYÚSCULAS]`

### Sección 1 — Datos del Proyecto

- **Cliente:** [cliente]
- **Project Manager:** [PM] | **Líder OCTO:** Paulo Tijero + Tech Lead
- **Participantes esperados:** [Dueño financiero] + equipo contable/tesorería
- **Duración estimada:** 45 minutos

### Sección 2 — Objetivo de la Sesión

Plantilla:

> Definir el flujo completo desde **[evento inicial: ej. generación del acta de conformidad]**
> hasta **[evento final: ej. acreditación del pago al proveedor]**: estados granulares,
> documentos generados, plazos y reglas de validación que el portal debe respetar.

### Sección 3 — Insumos que necesitamos antes de la sesión

Insumos típicos (3-5):
- *Ejemplo de 2-3 [documentos financieros actuales] (actas, facturas, constancias).*
- *Listado de condiciones de pago vigentes con [proveedores/clientes] (30/60/90 días, contado, y las que el cliente use).*
- *Ejemplo de constancia de pago y constancia de retención que generan hoy.*
- *Volumen mensual aproximado de [transacciones financieras] procesadas.*
- *Identificación de los errores más frecuentes que reciben de [proveedores/clientes] hoy.*

### Sección 4 — Agenda de la sesión

**Duración total:** 45 minutos.

Encabezado del día:
> **[Día] [DD] de [Mes]** | Objetivo: Definir el ciclo completo [factura-pago / cobro-conciliación] dentro del portal.

#### Bloque 1 (5 min) — Contexto y objetivos de la sesión

- Recap del alcance: digitalizar [documento gatillo] con código único + QR, recibir [transacciones] con validaciones automáticas, mostrar estados granulares y entregar constancias descargables.
- Desde la segunda sesión, este bloque declara **lo que ya sabemos y no vamos a volver a preguntar**, construido sobre los documentos de entendimiento anteriores. Ver el momento 3 de `skills/kickoff-discovery/SKILL.md`.

#### Bloque 2 (10 min) — [Documento o evento inicial: ej. Acta de conformidad digital]

- ¿Quién genera hoy [el documento inicial] y en qué momento del proceso?
- ¿Qué información mínima debe contener? (OC, entrada de mercancía, monto, descripción del servicio/bien, firmantes)
- ¿Quién firma [el documento]? ¿Una o varias firmas?
- ¿Cuál es el plazo desde que se emite [el documento] hasta que el [proveedor/cliente] debe cargar su factura?
- **Pregunta clave:** *¿Qué pasa hoy si el [proveedor/cliente] factura sin [el documento] o con uno vencido?*

#### Bloque 3 (10 min) — Validaciones automáticas y reglas de la factura

- Reglas de moneda: ¿la factura debe ir siempre en la moneda de la OC o se permite conversión?
- ¿Qué documentos de respaldo deben adjuntarse junto a la factura? (guía de remisión, acta firmada, otros)
- ¿Qué valida hoy el equipo manualmente cuando recibe una factura?
- ¿Qué pasa si la factura tiene un error? ¿Se rechaza, se anula, se pide nota de crédito?
- **Pregunta clave:** *¿Cuál es el error más recurrente en facturas de [proveedores/clientes] hoy?*

#### Bloque 4 (10 min) — Estados granulares y constancias

- Estados que necesitamos: Recibida → Validada → Programada → Transferencia en proceso → Pagada. **¿Falta alguno?**
- ¿Cada cuánto se ejecuta el proceso de pagos? (semanal, quincenal, diario)
- ¿Qué información debe ver el [proveedor/cliente] por cada estado?
- Constancias descargables: ¿cuáles necesitan? (constancia de pago, constancia de retención, copia del acta firmada)
- ¿Hay políticas de retenciones (4ta categoría, IGV, renta) que deban modelarse?
- **Pregunta clave:** *¿Qué información sobre el pago el [proveedor/cliente] NO debe poder ver por confidencialidad?*

#### Bloque 5 (10 min) — Cierre — compromisos de la sesión

Texto en cursiva: *OCTO se compromete a:*

- Enviar flujo dibujado [origen→destino] en 48h.
- Definir contrato de datos entre el portal y [sistema financiero, ej: SAP].
- Producir wireframe del estado de cuenta del [usuario externo].

Texto en cursiva: *[Cliente] se compromete a:*

- Compartir formato actual de [documentos clave] antes del próximo viernes.
- Validar internamente las condiciones de pago vigentes y enviarlas consolidadas.
- Confirmar el plazo hábil definitivo desde [evento A] hasta [evento B].

### Sección 5 — Objetivo de esta sesión

- Mapear el ciclo financiero completo del [proveedor/cliente] desde [documento inicial] hasta acreditación del pago, con todos los estados intermedios definidos.
- Definir las reglas de validación automática que el portal debe ejecutar antes de aceptar una factura, evitando reprocesos por errores conocidos.
- Establecer las políticas de retención e impuestos que el sistema debe modelar para producir constancias precisas.
- Determinar qué información financiera es confidencial y NO debe ser visible al [usuario externo].
- El equipo de OCTO debe poder diseñar el contrato de integración con [sistema financiero] y los wireframes del estado de cuenta.

---

## Reglas para adaptar la plantilla

1. **Identificar el "documento gatillo"** del flujo financiero del cliente (acta, OC, factura, recibo). Todo el bloque 2 se construye alrededor de él.
2. **Estados granulares = diferenciador**: la mayoría de clientes solo tiene "pagado / no pagado".
3. **Retenciones e impuestos varían por país** — verificar qué impuesto aplica en el país del cliente: IGV en Perú, IVA en México y Colombia.
4. **Confidencialidad importa más en finanzas que en otros frentes** — siempre incluir la pregunta sobre qué NO debe ver el usuario externo.
