---
name: security-guardrails
description: Blindaje del entorno. Establece listas de denegación estrictas para evitar modificaciones destructivas en archivos sensibles o fuera del workspace.
---

# Skill: security-guardrails

> Este skill define las fronteras inquebrantables de seguridad para la ejecución de tareas automatizadas.

## Deny List Estricta

El agente tiene **PROHIBIDO TERMINANTEMENTE** leer, modificar o eliminar archivos que coincidan con cualquiera de los siguientes patrones:
- `.env*` (Cualquier archivo de variables de entorno)
- `~/.ssh/*` (Claves SSH u authorized_keys)
- `*.pem` (Certificados de seguridad)
- `credentials.json` (Credenciales de servicio o nube)
- `secrets.yml` (Configuraciones seguras)
- **Cualquier ruta que escape del workspace** activo del proyecto (ej. directorios padre `../`, archivos del sistema raíz `/`, o carpetas de configuración del usuario que no pertenezcan al contexto aprobado).

## Regla de Aborto Inmediato (Kill-Switch)

Si en cualquier punto de un análisis, triage, o propuesta de *fix*, se sugiere o se requiere la modificación de un archivo contenido en la Deny List, la ejecución **DEBE ABORTARSE DE INMEDIATO**.

El orquestador debe detenerse y presentar un mensaje claro de bloqueo requiriendo intervención humana explícita. No se asume permiso implícito bajo ninguna circunstancia.
