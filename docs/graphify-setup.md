# Setup de Graphify para OCTO Mantenimiento

Graphify es nuestra herramienta obligatoria para exploración de código asistida por IA. Parsea el código usando AST (Tree-sitter) de forma determinística en tu máquina, permitiendo al agente navegar la arquitectura sin consumir millones de tokens leyendo archivos irrelevantes. 

Para configurar tu entorno local y operar la rama de Mantenimiento de OCTO, sigue estos pasos:

1. **Por qué es obligatorio:** Graphify permite distinguir entre conexiones reales en el código (`EXTRACTED`) y suposiciones de IA (`INFERRED`). Evita que el agente lea el repo completo y reduce drásticamente el costo y el sesgo cognitivo en etapas como Análisis de Causa Raíz.
2. **Instalación:** Instálalo a nivel de máquina (no como dependencia del repo). Ejecuta en tu terminal:
   `uv tool install graphifyy` (o `pipx install graphifyy`)
3. **Registro:** Conecta la herramienta con tu asistente de IA ejecutando:
   `graphify install`
4. **Generación / Actualización:** Dentro de tu asistente, ejecuta el comando `/graphify .`. Debes regenerar el grafo siempre que inicies un caso de mantenimiento nuevo o después de que el repositorio reciba cambios grandes de código en la rama principal.
5. **No commitear:** El directorio `graphify-out/` y el archivo `graph.json` ya están configurados en el `.gitignore` del template. Son artefactos regenerables que nunca deben subirse al repo.
