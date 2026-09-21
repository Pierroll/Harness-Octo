---
name: graphify-check
description: >
  Verifica de forma estricta la disponibilidad y vigencia de Graphify antes de iniciar exploraciones de código.
  Debe ejecutarse antes de root-cause-analysis o impact-analysis.
---

# Graphify Check — precondición de investigación de código

Este skill asegura que el agente tenga las herramientas de navegación de código basadas en AST antes de consumir tokens ciegamente leyendo el repositorio completo.

## Procedimiento de Verificación

El agente debe ejecutar este chequeo secuencial. No asumas nada; si un paso falla, detente y sigue las instrucciones de fallo.

1. **¿Está instalado el CLI en la máquina?**
   - Ejecuta: `command -v graphify`
   - Si no devuelve ruta, **DETENTE**.
   - **Mensaje al humano:** "Falta Graphify en tu máquina. Instálalo con `uv tool install graphifyy` o `pipx install graphifyy`, y luego regístralo con `graphify install`."

2. **¿Está registrado en el asistente?**
   - Verifica si el slash command `/graphify` está disponible en la sesión (o pídele al humano que confirme que `graphify install` fue ejecutado en este entorno).
   - Si no está registrado, **DETENTE**.
   - **Mensaje al humano:** "El CLI existe pero no está registrado en el asistente. Ejecuta `graphify install`."

3. **¿Existe el grafo en este proyecto?**
   - Verifica: `test -f graphify-out/graph.json`
   - Si no existe, ve a *Resolución de grafo faltante*.

4. **¿Está desactualizado el grafo?**
   - *Nota de Diseño:* Dado que Graphify no documenta un comando nativo de 'drift detection' o validación de frescura, OCTO lo resuelve por fuera comparando fechas en Git.
   - Ejecuta un comando para ver el timestamp de `graphify-out/graph.json` y compáralo con el timestamp del último commit que modificó archivos de código (ej. excluyendo `.md`).
   - Si el json es más viejo que el último cambio en código, está **desactualizado**. Ve a *Resolución de grafo faltante*.

## Resolución de grafo faltante o desactualizado

Si Graphify está instalado pero el grafo no existe o es viejo, **NO** instales ni ejecutes comandos automáticamente.
- **Mensaje al humano:** "El grafo de código no existe o está desactualizado. Para ahorrar tokens masivamente y tener un mapa AST limpio de la arquitectura, por favor ejecuta `/graphify .` antes de que procedamos con la investigación."
- Detente y espera a que el humano genere el grafo.
