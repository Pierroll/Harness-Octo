---
name: knowledge-write
description: Anota aprendizajes atómicos extraídos del incidente cerrado.
---

# Skill: knowledge-write

> Este skill se ejecuta como un paso normal dentro de la sesión principal.

## Procedimiento
1. Lee los insumos definidos en el contrato.
2. Ejecuta tu tarea específica de mantenimiento.
3. Genera la salida esperada escribiendo el archivo en `knowledge/resolved-cases/`.

### Escritura Cognitiva Persistente
Ya no basta con escribir el archivo estático. El agente DEBE ejecutar la herramienta `mem_save` inyectando la síntesis del problema y la solución arquitectónica (el "por qué" funcionó el Fix validado).
- El registro en Engram debe formatearse como una **regla de ingeniería accionable** (ej. "Cuando se validen montos en TaxTableService, siempre devolver HTTP 400 mediante BadRequestException, nunca dejar propagar HTTP 500").
