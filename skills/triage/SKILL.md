---
name: triage
description: Aplica metadata y prioridad a un ticket de entrada.
---

# Skill: triage

> Este skill se ejecuta como un paso normal dentro de la sesión principal.

## Procedimiento

> **PRECONDICIÓN ENGRAM:** Antes de estructurar el ticket, DEBES ejecutar la herramienta `mem_context` pasando como query el error crudo del usuario. El objetivo es descubrir si Engram recuerda un caso histórico idéntico o reglas arquitectónicas relacionadas con el bug.

1. Lee los insumos definidos en el contrato.
2. Ejecuta tu tarea específica de mantenimiento.
3. Genera la salida esperada.

### Bifurcación Dinámica (ODD vs SDD)
Basado en la memoria recuperada y la severidad del error crudo, debes decidir la ruta del caso:
- **Ruta Fast-Track (ODD):** Si es un bug trivial (ej. typos, null checks simples) o ya existe un precedente exacto en Engram. El ticket se debe marcar explícitamente con `[FLOW: FAST-TRACK]`.
- **Ruta Estándar (SDD):** Si es un bug sistémico o estructural. El ticket se debe marcar explícitamente con `[FLOW: STANDARD]`.
