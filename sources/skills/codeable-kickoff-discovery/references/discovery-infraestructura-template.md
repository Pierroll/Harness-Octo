# Plantilla — Discovery de Infraestructura

Para discoveries que definen hosting, redes, VPN, ambientes y configuración cloud.

## Cuándo usar esta plantilla

- Definir arquitectura de hosting (Azure, AWS, GCP, on-premise, híbrido).
- Coordinar implementación de VPN o conexiones privadas entre cloud y on-premise.
- Dimensionar recursos cloud y estimar costos mensuales para el cliente.
- Planificar creación de ambientes (dev, staging, producción).

## Estructura del documento

### Título principal
`DISCOVERY #[N] - INFRAESTRUCTURA [CLOUD]`

### Sección 1 — Datos del Proyecto

- **Cliente:** [cliente]
- **Project Manager:** [PM] | **Líder Codeable:** Paulo Tijero + DevOps
- **Participantes esperados:** [Jefe de Tecnología/Infraestructura] + equipo de TI del cliente
- **Duración estimada:** 45 minutos

### Sección 2 — Objetivo de la Sesión

Plantilla:

> Definir la arquitectura de hosting en **[cloud elegido]**, dimensionar los recursos
> necesarios, dejar planificada la creación de ambientes (dev/prod) y coordinar
> **[conexiones críticas: VPN, peering, túneles]** entre [cloud] y los sistemas
> on-premise del cliente.

### Sección 3 — Insumos que necesitamos antes de la sesión

- *Estado actual de la suscripción de [cloud] (qué servicios tienen activos, cuáles falta habilitar).*
- *Diagrama de red actual: dónde están los sistemas críticos, qué firewall existe, qué puertos están abiertos.*
- *Política interna de seguridad sobre [VPN/exposición de servicios/accesos externos].*
- *Si existe, la lista de servicios que ya planean migrar a [cloud].*
- *Quién es el responsable de aprobar habilitación de puertos y configuración de red.*

### Sección 4 — Agenda de la sesión

**Duración total:** 45 minutos.

Encabezado del día:
> **[Día] [DD] de [Mes]** | Objetivo: Cerrar arquitectura de infraestructura y plan de habilitación.

#### Bloque 1 (5 min) — Contexto y objetivos de la sesión

- Recap: solución alojada en [cloud], conectada vía VPN al [sistema on-premise]. Decisión confirmada en sesión técnica previa.
- El costo mensual de infraestructura va por cuenta de [cliente] (estimado entre US$100-200/mes).

#### Bloque 2 (15 min) — Suscripción [cloud] y servicios necesarios

- Estado de la suscripción de [cloud] de [cliente].
- Servicios que vamos a usar: App Service / Compute, Base de Datos, Storage, Key Vault / Secret Manager, monitoring, servicio de IA (OpenAI o equivalente).
- Estimación preliminar de costo mensual a mano alzada.
- ¿Tienen preferencia por alguna región? (recomendación: la más cercana geográficamente).
- **Pregunta clave:** *¿Hay algún servicio que [cliente] ya tenga contratado y que podamos reutilizar?*

#### Bloque 3 (15 min) — VPN y conexión a sistemas on-premise

- Modelo de VPN: site-to-site entre [cloud] y el servidor on-premise.
- Puertos a habilitar para [sistema externo, ej: Service Layer de SAP B1 → puerto 50000].
- Política de firewall y reglas de acceso.
- ¿Quién aprueba la habilitación de puertos y la configuración de VPN dentro de [cliente]?
- **Pregunta clave:** *¿El equipo de TI tiene experiencia configurando VPN site-to-site o necesitan acompañamiento de Codeable?*

#### Bloque 4 (10 min) — Cierre — compromisos de la sesión

Texto en cursiva: *Codeable Labs se compromete a:*

- Enviar diagrama de infraestructura propuesto y estimación de costos mensuales en 48h.
- Compartir checklist técnico para creación de ambientes dev/prod.
- Acompañar al equipo de TI de [cliente] en la configuración inicial de VPN si lo requieren.

Texto en cursiva: *[Cliente] se compromete a:*

- Confirmar estado de la suscripción [cloud] y habilitar el acceso para el equipo de Codeable.
- Iniciar gestión de aprobación interna para habilitación de puertos y VPN.
- Compartir diagrama de red actual antes del próximo viernes.

### Sección 5 — Objetivo de esta sesión

- Confirmar la arquitectura de hosting en [cloud] y el modelo de conectividad con los sistemas on-premise.
- Dimensionar los recursos iniciales y producir una estimación de costo mensual realista para que [cliente] pueda presupuestar.
- Establecer responsables y plazos para la habilitación de la VPN, los ambientes y los accesos críticos.
- Identificar dependencias técnicas que puedan bloquear el inicio del desarrollo.
- El equipo de Codeable debe poder iniciar la configuración de ambientes en [cloud] sin esperar nuevas decisiones de infraestructura.

---

## Reglas para adaptar la plantilla

1. **Sustituir [cloud] por el real:** Azure, AWS, GCP, OCI.
2. **Si NO hay componente on-premise**, eliminar el bloque 3 (VPN) y redistribuir tiempo.
3. **Si el cliente ya tiene experiencia cloud**, ajustar la pregunta clave del bloque 3.
4. **El cliente asume costos de infra**: mencionarlo siempre en el bloque 1 para evitar sorpresas.
