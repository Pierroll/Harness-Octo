---
name: reproduce-issue
description: Ejecuta comandos de terminal para intentar detonar el error. Retorna solo logs clave.
---

# Skill: reproduce-issue

> **IMPORTANTE:** Este skill se ejecuta como sub-agente aislado.
> Detente y dile al usuario que abra una sesión manual nueva limpia e invoque este skill.
> **Contexto permitido:** Archivos de logs, stacktraces, código fuente específico.
> **Contexto prohibido:** Historial de la conversación del humano, decisiones previas de orquestación.

## Procedimiento
1. Lee los insumos definidos en el contrato.
2. Ejecuta tu tarea específica de mantenimiento.
3. Genera la salida esperada.
