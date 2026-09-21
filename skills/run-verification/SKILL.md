---
name: run-verification
description: Revisión adversarial. Intenta romper el fix recién codificado.
---

# Skill: run-verification

> **IMPORTANTE:** Este skill se ejecuta como sub-agente aislado.
> Detente y dile al usuario que abra una sesión manual nueva limpia e invoque este skill.
> **Contexto permitido:** Archivos de logs, stacktraces, código fuente específico.
> **Contexto prohibido:** Historial de la conversación del humano, decisiones previas de orquestación.

## Procedimiento

### Paso de Congelamiento Atómico (Receipt)
Antes de que el sub-agente adversarial ejecute cualquier prueba, el orquestador DEBE congelar el código:
1. Crea una rama efímera aislada: `git checkout -b octo/verify-case-<numero>`
2. Aplica el código o el parche generado en la Etapa 4.
3. Haz un commit encapsulando el cambio para generar un Hash SHA inmutable (El Receipt).

El sub-agente adversarial correrá las pruebas **estrictamente sobre esa rama efímera**. 
- **Si el fix falla:** Registra el fallo en `iteration-record.md`, vuelve a la rama principal (`git checkout main`), elimina la rama efímera (`git branch -D octo/verify-case-<numero>`) y retorna el flujo a la Etapa 4.

1. Lee los insumos definidos en el contrato.
2. Ejecuta tu tarea específica de mantenimiento.
3. Genera la salida esperada.
