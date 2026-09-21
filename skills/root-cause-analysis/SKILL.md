---
name: root-cause-analysis
description: Navega el código para validar hipótesis de fallo sin ensuciar el hilo principal.
---

# Skill: root-cause-analysis

> **IMPORTANTE:** Este skill se ejecuta como sub-agente aislado.
> Detente y dile al usuario que abra una sesión manual nueva limpia e invoque este skill.
> **Contexto permitido:** Archivos de logs, stacktraces, código fuente específico.
> **Contexto prohibido:** Historial de la conversación del humano, decisiones previas de orquestación.

## Procedimiento
1. Lee los insumos definidos en el contrato.
2. Ejecuta tu tarea específica de mantenimiento.
3. Genera la salida esperada.

> **PRECONDICIÓN GRAPHIFY:** Antes de explorar el código manualmente o usar herramientas de búsqueda tipo grep/find, consulta `graphify-out/graph.json` para localizar los nodos relevantes. Si el grafo no existe o está desactualizado, ejecuta primero `skills/graphify-check/` y espera a que el humano lo resuelva. No procedas a leer archivos ad-hoc como primera opción. Presta especial atención a las conexiones etiquetadas como `EXTRACTED` vs `INFERRED` para distinguir evidencia dura de hipótesis.

### 4. Consolidación de Hallazgos Paralelos (Sub-agentes)
Cuando la investigación requiera lanzar sub-agentes manuales en paralelo (por regla de contexto acotado o complejidad), debes imponerles un contrato de salida estandarizado:
- **Salida del Sub-agente:** Cada sub-agente tiene prohibido responder únicamente por texto al usuario. Debe obligatoriamente volcar su diagnóstico final en un archivo llamado `finding-<componente-evaluado>.md` dentro del directorio del caso actual (ej. `finding-authservice.md`).
- **Fase de Fusión (Merge):** Una vez que el usuario te confirme que todos los sub-agentes paralelos han terminado su ejecución, tu obligación como orquestador de esta etapa es leer todos los archivos `finding-*.md` existentes en el directorio del caso.
- **Artefacto Final:** Sintetiza y cruza la información de todos los hallazgos aislados para redactar el artefacto definitivo `root-cause.md`. Una vez creado, puedes eliminar los archivos `finding-*.md` temporales para mantener limpio el namespace.
