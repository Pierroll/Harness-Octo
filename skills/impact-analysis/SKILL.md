---
name: impact-analysis
description: Rastrea dependencias y evalúa el blast radius de modificar un componente.
---

# Skill: impact-analysis

> **IMPORTANTE:** Este skill se ejecuta como sub-agente aislado.
> Detente y dile al usuario que abra una sesión manual nueva limpia e invoque este skill.
> **Contexto permitido:** Archivos de logs, stacktraces, código fuente específico.
> **Contexto prohibido:** Historial de la conversación del humano, decisiones previas de orquestación.

## Procedimiento
1. Lee los insumos definidos en el contrato.
2. Ejecuta tu tarea específica de mantenimiento.
3. Genera la salida esperada.

> **PRECONDICIÓN GRAPHIFY:** Antes de explorar el código manualmente o usar herramientas de búsqueda tipo grep/find, consulta `graphify-out/graph.json` para localizar los nodos relevantes. Si el grafo no existe o está desactualizado, ejecuta primero `skills/graphify-check/` y espera a que el humano lo resuelva. No procedas a leer archivos ad-hoc como primera opción. Presta especial atención a las conexiones etiquetadas como `EXTRACTED` vs `INFERRED` para distinguir evidencia dura de hipótesis.
