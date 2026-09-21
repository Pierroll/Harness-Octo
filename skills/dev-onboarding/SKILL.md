---
name: dev-onboarding
description: Skill de orquestación para iniciar el trabajo de un desarrollador en un repositorio. Verifica accesos, lista asignaciones y prepara la estructura de directorios.
---

# Dev Onboarding

Este skill debe ejecutarse cuando un desarrollador comienza a trabajar en el repositorio para preparar su entorno local, validar permisos y traer su trabajo pendiente.

## Procedimiento

Ejecuta estas validaciones **estrictamente en orden**. Si alguna falla, detente y pide al humano que lo resuelva antes de continuar.

### 1. Verificación de Acceso Git
- Verifica si el desarrollador tiene acceso de red al repositorio vía Git (ej. ejecutando `git ls-remote` o `git fetch --dry-run`).
- *Aclaración explícita:* Este acceso (clonado/push de código) es a nivel de Git y depende de llaves SSH o HTTPS. Es **distinto** e independiente del Personal Access Token (PAT) que usa el CLI de GitHub. Un dev puede tener un PAT válido pero no ser colaborador del repo en Git.

### 2. Verificación de GitHub Integration (API de Issues)
- Reutiliza y ejecuta el paso **"2. Entry Check Obligatorio"** del archivo `skills/github-integration/SKILL.md` (verificando `git check-ignore .env` y ejecutando `gh auth status` mediante subshells).
- Si falla la lectura del token, redirige al humano a configurar su `.env`.

### 3. Verificación de Herramientas de Análisis (Graphify Check)
- Delega en `skills/graphify-check/SKILL.md` (ejecuta su checklist secuencial) para asegurar que la máquina tiene Graphify instalado y el mapa AST actualizado.

### 4. Fetch de Issues Asignadas
- Si las tres verificaciones anteriores pasaron impecables, ofrécele al humano traer las tareas pendientes que tiene asignadas.
- Ejecuta usando la subshell segura de `github-integration`:
  `bash -c 'set -a; [ -f .env ] && source .env; set +a; gh issue list --assignee @me'`

### 5. Inicialización y Namespacing del Caso
Cuando el humano elija iniciar el análisis de un issue en particular, prepara su espacio de trabajo aislado.
- **Convención OFICIAL de Mantenimiento:** Para evitar colisiones entre desarrolladores que trabajan en casos distintos en paralelo, el trabajo de un caso siempre se encapsula en una subcarpeta propia:
  `stages/4-maintenance/cases/<issue-number>/`
- Crea la carpeta (ej. `mkdir -p stages/4-maintenance/cases/123/`) y establece ese directorio como el contexto donde se crearán los archivos de investigación y fix.
