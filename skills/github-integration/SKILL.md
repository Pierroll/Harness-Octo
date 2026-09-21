---
name: github-integration
description: Reglas seguras para gestionar issues por proyecto usando GH_TOKEN y .env locales.
---

# GitHub Integration Skill

Este skill define la interacción con GitHub usando tokens aislados por proyecto.

### 1. Reglas Críticas de Seguridad
- **PROHIBIDO LEER EL .env:** NUNCA uses la herramienta `view_file`, `cat` o `grep` sobre el archivo `.env`. Como agente, no necesitas ni debes conocer el contenido de la cadena del token.
- **PROHIBIDO HARDCODEAR:** Nunca le pidas al usuario el token por el chat.
- **PROHIBIDO LOGUEAR ERRORES CRUDOS:** Si un comando `gh` falla, NUNCA guardes el `stderr` crudo en `session-log.md` ni en ningún artifact (podría fugar headers HTTP con el token). Documenta solo la lógica (ej. *"Error: Issue no encontrado"*).

### 2. Entry Check Obligatorio
Antes de llamar a un repo, verifica el estado en dos pasos irrompibles:
1. Asegura que no se va a commitear por accidente: `git check-ignore .env`
2. Verifica la sesión: `bash -c 'set -a; [ -f .env ] && source .env; set +a; gh auth status'`
Si cualquiera de los dos falla, detén la ejecución e instruye al humano para que configure su entorno.

### 3. Comandos Permitidos
Todos los comandos a la API de GitHub deben envolverse en la subshell que carga el token en memoria sin filtrarlo al chat:

- **Leer listado:**
  `bash -c 'set -a; [ -f .env ] && source .env; set +a; gh issue list --repo <org/repo> --state open --json number,title,assignees -q ...'`
- **Leer detalle:**
  `bash -c 'set -a; [ -f .env ] && source .env; set +a; gh issue view <numero> --repo <org/repo> --json title,body,comments'`
- **Crear issue:**
  Para evitar inyección en bash por problemas de comillas en textos largos, SIEMPRE escribe en un archivo intermedio para el cuerpo del issue:
  `bash -c 'set -a; [ -f .env ] && source .env; set +a; gh issue create --repo <org/repo> --title "..." --body-file scratch/issue-body.md'`
