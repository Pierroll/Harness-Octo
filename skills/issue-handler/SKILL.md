---
name: issue-handler
description: Orquesta el flujo completo de trabajo de un Issue, desde el setup del entorno hasta la creación del PR. Bloquea el avance en cada paso si las precondiciones no se cumplen.
---

# Manejador de Issues y Gitflow (Flujo Bloqueante)

Este skill impone la metodología estándar para trabajar cualquier ticket en OCTO. Cada fase es un **bloqueo**: no se puede avanzar a la siguiente sin completar y reportar la anterior.

---

## FASE 0 — Preflight Check (NUNCA SALTARSE)

> ⛔ Si este paso no se completa con todos los ✅, el flujo se detiene aquí.

Ejecuta los siguientes comandos y reporta los resultados en el chat:

```bash
git rev-parse --show-toplevel   # Confirma la ruta absoluta del repo
git remote -v                   # Confirma el remoto (origin/URL)
git branch --show-current       # Confirma la rama actual
gh auth status                  # Confirma que GH CLI está autenticado
```

Luego publica este bloque en el chat antes de continuar:
```
📍 PREFLIGHT OCTO
  Proyecto : <nombre del repo>
  Remoto   : <URL de origin>
  Rama     : <rama actual>
  GH CLI   : ✅ autenticado / ⚠️ NO autenticado
  Engram   : ✅ memoria previa cargada / 🆕 sesión nueva
  Graphify : ✅ grafo disponible / ⚠️ requiere `graphify build`
```

Si hay cualquier ⚠️, detente, repórtalo al usuario y pide acción explícita antes de continuar.

**Guardar contexto en Engram:** Al finalizar el Preflight con ✅, guarda un `mem_save` con:
- Nombre del proyecto, URL del remoto y stack detectado.
- Esto es la "materia prima" del agente para no alucinar en el análisis de código.

---

## FASE 1 — Leer y Validar el Issue

```bash
gh issue view <nro>   # Lee el ticket del repositorio remoto
```

Comprueba el issue contra `templates/abstract-issue.md`. El issue DEBE tener:
- [ ] Impacto de negocio claro (no solo un título abstracto).
- [ ] Criterios de Aceptación (DoD) verificables.
- [ ] Trazas o datos técnicos (URL, endpoints, mensaje de error, IDs de ejemplo).

Si falta cualquiera de los tres, **detente**. Escribe en el chat exactamente qué falta y pide al PM o Soporte que complete el ticket. No inventes ni asumas criterios.

---

## FASE 2 — Configurar Gitflow (VERIFICAR RAMA LOCAL VS REMOTA)

```bash
git branch -a    # Ver TODAS las ramas (locales y remotas)
```

1. **Confirma que `develop` existe en remoto** (`remotes/origin/develop`). Si no existe, crea la rama antes de continuar:
   ```bash
   git checkout -b develop main && git push -u origin develop
   ```

2. **Crea tu rama de trabajo desde `develop`**, nunca desde `main`:
   ```bash
   # Para un fix:
   git checkout -b bugfix/ISSUE-<nro>-<nombre-corto> develop

   # Para una feature:
   git checkout -b feature/ISSUE-<nro>-<nombre-corto> develop
   ```

3. **Verifica que estás en la rama correcta** antes de tocar código:
   ```bash
   git branch --show-current   # Debe mostrar feature/... o bugfix/...
   ```
   Reporta en el chat: `🌿 Trabajando en rama: feature/ISSUE-X-...`

---

## FASE 3 — Implementación

- Trabaja únicamente en tu rama efímera. Si en algún momento `git branch --show-current` devuelve `main` o `develop`, **detente y reporta el error inmediatamente**.
- Haz commits atómicos referenciando el issue:
  ```bash
  git commit -m "feat: descripción del cambio (ref #<nro>)"
  ```

---

## FASE 4 — Cierre: Pull Request (ÚNICA SALIDA VÁLIDA)

> ⛔ El ticket NO está terminado hasta que el PR tenga URL. Un commit sin PR no cierra un issue.

```bash
# 1. Empuja la rama efímera al remoto
git push -u origin <rama-efimera>

# 2. Crea el PR apuntando a develop
gh pr create \
  -B develop \
  --title "<tipo>(#<nro>): <descripción corta>" \
  --body "## Resuelve\nCloses #<nro>\n\n## Verificación 4R\n- [ ] Risk\n- [ ] Readability\n- [ ] Reliability\n- [ ] Resilience"
```

Al finalizar, reporta en el chat:
```
✅ PR creado: <URL del PR>
📌 Closes Issue #<nro>
🌿 Rama: <rama-efimera> → develop
```

**Guardar cierre en Engram:** Ejecuta `mem_save` con el título del fix, la URL del PR y el número de issue. La sesión no cierra sin este paso.
