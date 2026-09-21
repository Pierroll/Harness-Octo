---
name: octo-init
description: Inicializa la sesión de mantenimiento OCTO, verificando el entorno y herramientas.
---

# Octo Init

## PASO A (Contexto base)
- Carga el caso actual.

## PASO B (Escaneo de configuración del Harness)
- **Verificación Graphify:** Ejecuta el equivalente silencioso de `graphify-check` (verificar `command -v graphify` y la frescura de `graphify-out/graph.json`). Registra su estado (No instalado / Desactualizado / OK) para usarlo en el PASO D.

## PASO C (Evaluación)
- Evalúa el estado.

## PASO D (Opciones válidas)
- Si Graphify no está instalado o no está registrado: "Graphify no está instalado — instálalo con `uv tool install graphifyy` y regístralo con `graphify install` antes de iniciar cualquier caso de mantenimiento." (Alta prioridad)
- Si el grafo está desactualizado: "El grafo de Graphify está desactualizado — ejecuta `/graphify .` para actualizar el mapa AST del repositorio."
