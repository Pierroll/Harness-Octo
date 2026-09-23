---
name: issue-handler
description: Orquesta el flujo de trabajo de Issues, desde la lectura en GitHub hasta el PR apuntando a develop, asegurando el cumplimiento del Abstract Issue Model.
---

# Manejador de Issues y Gitflow

Este skill impone la metodología estándar para trabajar cualquier ticket en OCTO.

## 1. Selección y Validación del Issue
Antes de escribir código, debes procesar el issue:
- Lee el issue asignado o búscalo con `gh issue view <nro>`.
- **Validación Estricta:** Comprueba el issue contra `templates/abstract-issue.md`. Si falta el contexto de negocio o los Criterios de Aceptación, **detente** e informa al usuario o PM que el issue está incompleto. No asumas ni inventes requerimientos.

## 2. Configuración de Entorno (Gitflow)
- Identifica la rama remota base. Por defecto, todo el desarrollo y fix va contra `develop`, no contra `main`.
- Crea una rama local nombrada según la convención:
  - `feature/ISSUE-<nro>-<nombre-corto>`
  - `bugfix/ISSUE-<nro>-<nombre-corto>`
- Comando: `git checkout -b feature/ISSUE-<nro>-... develop`

## 3. Implementación y Commits
- Trabaja en la rama local recién creada. Asegúrate de tener visibilidad siempre de en qué rama te encuentras (`git branch --show-current`).
- Todos los commits deben hacer referencia al issue (Ej: `feat: agrega modal login (ref #<nro>)`).

## 4. Cierre y Pull Request
- **No hagas merge local a develop ni a main.**
- Sube tu rama al repositorio remoto (`git push -u origin <rama>`).
- Crea un Pull Request contra `develop` usando GitHub CLI (`gh pr create -B develop -t "..."`).
- Asigna revisores si corresponde y da el ticket por terminado a nivel de código.
