# Plantilla — Discovery de Negocio

Para discoveries con líderes de negocio del cliente: dueños de proceso, líderes de
operaciones, compras, proveedores, comercial, marketing, etc.

## Cuándo usar esta plantilla

- Discovery de un módulo funcional (homologación, licitaciones, catálogo, CRM, etc.)
- El dueño del lado del cliente es alguien de negocio, no de TI ni de finanzas.
- El objetivo es definir flujo, criterios y reglas operativas, no integraciones técnicas.

## Estructura del documento

### Título principal
`DISCOVERY #[N] - [NOMBRE DEL FRENTE EN MAYÚSCULAS]`

### Subtítulo
Nombre formal del proyecto.

### Sección 1 — Datos del Proyecto

- **Cliente:** [cliente]
- **Project Manager:** [PM] | **Líder Codeable:** Paulo Tijero (o quien lidere desde Codeable)
- **Participantes esperados:** [Dueño de negocio] + [equipo relevante del cliente]
- **Duración estimada:** 45 minutos

### Sección 2 — Objetivo de la Sesión

Texto de 2-3 líneas. Plantilla:

> Entender el proceso actual de **[tema del discovery]** en [cliente] y dejar definidos
> los criterios, documentos y flujo de **[módulo o entregable]** del portal. Salimos
> con los insumos suficientes para empezar wireframes y backlog.

### Sección 3 — Insumos que necesitamos antes de la sesión

Lista de 3-5 insumos concretos. Pautas:
- Cada ítem debe ser un artefacto recuperable.

Ejemplos para distintos dominios:
- *Lista actual de documentos que se exigen a [los proveedores/clientes/usuarios] para [acción específica] (RUC, vigencia poder, ficha RUC, estados financieros, certificaciones, etc.).*
- *Si existe, el procedimiento interno de [proceso] documentado.*
- *Ejemplo de 2-3 fichas de [artefacto] (para entender el dato real).*
- *Nombre del o los responsables que hoy aprueban [decisión clave].*

### Sección 4 — Agenda de la sesión

**Duración total:** 45 minutos.

Encabezado del día con `diaHeader`:
> **[Día] [DD] de [Mes]** | Objetivo: Definir [el outcome específico] end-to-end.

#### Bloque 1 (5 min) — Contexto y objetivos de la sesión

- Recap de dónde encaja [el módulo] en el portal: [conexión clave].
- Aclarar que esta sesión define el **qué y el cómo del flujo**, no el detalle visual (eso viene en UX/UI).

#### Bloque 2 (5 min) — Cómo se hace hoy

- ¿Cuál es el proceso actual completo? ¿Por dónde entra [una transacción/solicitud/caso] nueva?
- ¿Cuántos [casos/transacciones/registros] llegan por mes en promedio?
- ¿Cuánto tarda hoy el ciclo completo desde [evento A] hasta [evento B]?
- ¿Qué áreas participan en la aprobación? *(listar áreas inferidas: Logística, Legal, Finanzas, etc.)*
- **Pregunta clave:** *¿Cuál es el dolor más grande hoy en este proceso?*

#### Bloque 3 (10 min) — Documentos y criterios

- Listado completo de documentos que se exigen.
- ¿Hay documentos diferentes según tipo de [caso]? (servicios vs. bienes, persona natural vs. jurídica, nacional vs. extranjero).
- ¿Algunos documentos tienen vencimiento? ¿Cómo se controla hoy la vigencia?
- ¿Hay criterios de evaluación más allá de los documentos? (ej. años de operación, referencias, score crediticio)
- **Pregunta clave:** *¿Qué documento o criterio es no-negociable y debería bloquear [el flujo] si falta?*

#### Bloque 4 (15 min) — Flujo del responsable y reglas del sistema

- ¿Quién será el [super-administrador/responsable] en [cliente]? ¿Una persona o un equipo?
- ¿[Decisión transversal: la homologación habilita al usuario para todas las empresas del grupo o se aprueba empresa por empresa]?
- ¿Qué pasa cuando un [usuario] ya validado actualiza un documento? ¿Re-aprobación o automático?
- ¿Existe el concepto de [usuario] "rechazado" o "suspendido"? ¿Cómo se maneja?
- **Pregunta clave:** *¿Qué notificaciones deben salir del sistema y a quién? (proveedor/cliente, super-admin, áreas internas)*

#### Bloque 5 (10 min) — Cierre — compromisos de la sesión

Texto en cursiva: *Codeable Labs se compromete a:*

- Enviar minuta y flujo dibujado de la sesión en 48h.
- Producir primer wireframe del módulo de [tema] para revisión en el siguiente sprint.
- Definir estructura de datos del [entidad principal] para alinear con [sistema externo] en el discovery técnico.

Texto en cursiva: *[Cliente] se compromete a:*

- Compartir el listado final de [documentos/criterios] exigidos antes del viernes próximo.
- Confirmar quién será el [super-administrador/responsable] del portal.
- Compartir el procedimiento interno de [proceso] si existe documentado.

### Sección 5 — Objetivo de esta sesión

Lista de 4-5 bullets de outcomes esperados. Empiezan con verbos accionables:

- Identificar cada paso del flujo de [tema], detectando los cuellos de botella y los "puntos de dolor" que el portal debe automatizar o eliminar.
- Definir el listado definitivo de documentos exigidos, sus reglas de validación (vigencias) y si existen variaciones según el tipo de [usuario] o categoría.
- Establecer quién aprueba, quién rechaza y cómo se gestiona la visibilidad de los [usuarios] entre las distintas empresas del grupo [cliente].
- Determinar qué elementos son críticos (no-negociables) para que un [usuario] sea dado de alta en [sistema externo] sin intervención manual innecesaria.
- El equipo de Codeable debe tener claridad en la información para que pueda diagramar el flujo técnico y los primeros prototipos funcionales del módulo de [tema].

---

## Reglas para adaptar la plantilla

1. **Personalizar las preguntas al dominio:** sustituir "proveedor", "factura", "homologación" por los términos del cliente.
2. **El bloque 2 siempre extrae el estado actual.**
3. **El bloque 3 es el más estratégico:** las reglas son lo que el sistema debe respetar sí o sí.
4. **El bloque 4 toma más peso si hay colaboración multi-usuario** sobre el mismo objeto.
5. **La sección 5 es obligatoria** y siempre cierra el documento del discovery.
