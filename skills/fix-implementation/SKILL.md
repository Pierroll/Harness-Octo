---
name: fix-implementation
description: Escribe el código para solucionar el error, apoyándose en la causa raíz documentada.
---

# Skill: fix-implementation

> Este skill se ejecuta como un paso normal dentro de la sesión principal.

## Procedimiento

> **PRECONDICIÓN ENGRAM:** Antes de escribir la primera línea de código, DEBES consultar la herramienta `mem_context` preguntando por "decisiones arquitectónicas, convenciones o restricciones" relacionadas con los archivos afectados. Esto previene que el parche viole la arquitectura general.

> **PREVENCIÓN DE ALUCINACIÓN (Context7):** Si el contexto del issue o el grafo de Graphify indican que la solución involucra el uso de frameworks, librerías externas o APIs de terceros, TIENES PROHIBIDO programar de memoria. 
> DEBES realizar un paso previo llamado "Fetch Live Context": usa herramientas de terminal (`curl`, `gh`, el navegador si está disponible, o explora `node_modules`/dependencias locales) para traer la documentación oficial de la versión exacta que usa el proyecto, y anéxala a tu espacio de trabajo antes de escribir el parche.

1. Lee los insumos definidos en el contrato.
2. Ejecuta tu tarea específica de mantenimiento.
3. Genera la salida esperada.
