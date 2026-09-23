---
name: octo-init
description: Inicializa la sesión de mantenimiento OCTO, verificando el entorno y herramientas.
---

# Octo Init

## PASO 0 (Hidratación de Persona)
- El orquestador DEBE leer silenciosamente el archivo `persona.md` ubicado en la raíz del repositorio del arnés.
- Inyecta el contenido de la voz, tono y reglas de interacción (Tech Lead Senior / Mentorship) directamente en tu prompt de sistema activo para que esta personalidad rija todas tus interacciones y explicaciones de trade-offs de aquí en adelante.
## PASO A (Contexto base)
- Carga el caso actual.

## PASO B (Escaneo de configuración del Harness)
- **Verificación Graphify:** Ejecuta el equivalente silencioso de `graphify-check` (verificar `command -v graphify` y la frescura de `graphify-out/graph.json`). Registra su estado (No instalado / Desactualizado / OK) para usarlo en el PASO D.
- **Verificación Engram:** Verifica si el sistema de memoria persistente Engram está activo (buscando la carpeta `~/.gemini/config/plugins/engram/` o comprobando si las tools `mem_save` y `mem_context` existen en el entorno). Registra su estado.

## PASO C (Evaluación)
- Evalúa el estado.

## PASO D (Opciones válidas)
- Si Engram no está instalado: "🚨 **Fallo de Persistencia Cognitiva:** No tienes instalado el motor de memoria persistente (Engram). Sin él, los agentes sufrirán amnesia entre sesiones y perderán el contexto de las decisiones arquitectónicas. Te sugiero determinantemente que lo instales ahora mismo para trabajar con OCTO de forma segura. ¿Quieres que lo instale por ti o prefieres correr `agy plugin install engram` manualmente?" (Prioridad Crítica).
- Si Graphify no está instalado o no está registrado: "Graphify no está instalado — instálalo con `uv tool install graphifyy` y regístralo con `graphify install` antes de iniciar cualquier caso de mantenimiento." (Alta prioridad)
- Si el grafo está desactualizado: "El grafo de Graphify está desactualizado — ejecuta `/graphify .` para actualizar el mapa AST del repositorio."
