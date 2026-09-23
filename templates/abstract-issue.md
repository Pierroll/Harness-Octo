# Abstract Issue Model

Todo Issue (Ticket) gestionado por el arnés OCTO debe cumplir con un estándar mínimo de calidad para ser ejecutable. Si un desarrollador o agente lee un issue que no cumple con estos puntos, **tiene prohibido empezar a codificar** y debe escalar el ticket para pedir más contexto.

## 1. Contexto de Negocio
¿Por qué estamos construyendo o arreglando esto? Debe existir un caso de uso claro o el reporte del impacto en el usuario final.

## 2. Criterios de Aceptación (DoD)
Una lista verificable de condiciones. "El issue se considera cerrado cuando..." (Ej. *Cuando el botón hace POST a /api/v1/user y el Toast muestra Éxito*).

## 3. Relación Arquitectónica
¿Qué capa del sistema afecta? (Ej. *Backend/Base de Datos, Frontend/Componente UI, Integración con terceros*).

---
> **Regla de Parada:** Si descargas un issue y parece un simple título abstracto (ej: "Arreglar login"), debes detenerte. Usa el comando pertinente para pedir clarificación al PM/Soporte. No inventes los criterios de aceptación.
