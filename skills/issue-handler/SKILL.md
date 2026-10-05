---
name: issue-handler
description: Orquesta el flujo completo de trabajo de un Issue, desde el setup del entorno hasta la creación del PR. Bloquea el avance en cada paso si las precondiciones no se cumplen. El agente debe explicar qué está haciendo y por qué en cada fase.
---

# Manejador de Issues y Gitflow (Flujo Bloqueante y Comunicativo)

Este skill impone la metodología estándar para trabajar cualquier ticket en OCTO. Cada fase es un **bloqueo**: no se puede avanzar a la siguiente sin completar y reportar la anterior. El agente explica cada acción al desarrollador en lenguaje claro.

---

## FASE 0 — Preflight Check (NUNCA SALTARSE)

> ⛔ Si este paso no se completa con todos los ✅, el flujo se detiene aquí.

Ejecuta los siguientes comandos y explica al dev qué estás verificando y por qué:

```bash
git rev-parse --show-toplevel   # Para confirmar en qué repo estamos trabajando
git remote -v                   # Para confirmar el repo remoto donde irá el PR
git branch --show-current       # Para confirmar que no estamos en main ni develop
gh auth status                  # Para poder leer issues y crear PRs
```

Luego publica este bloque en el chat antes de continuar:
```
📍 PREFLIGHT OCTO
  Proyecto : <nombre del repo>
  Remoto   : <URL de origin>
  Rama     : <rama actual>
  GH CLI   : ✅ autenticado / ⚠️ requiere `gh auth login`
  Engram   : ✅ contexto previo cargado / 🆕 sesión nueva inicializada
  Mapa     : ✅ grafo de código disponible / ⚠️ requiere build
```

**Memoria del proyecto:** Al finalizar el Preflight, guarda en Engram el nombre del repo, stack detectado y contexto base. Explica al dev: *"Guardo el contexto de este proyecto en memoria persistente para que en la próxima sesión no tengamos que redescubrir la arquitectura desde cero."*

**Mapa estructural:** Verifica si el grafo de relaciones del código está disponible. Si no lo está, explica al dev: *"Necesito construir el mapa de relaciones entre archivos y módulos del proyecto. Con ese mapa puedo rastrear exactamente qué impacta cada cambio sin tener que leer el proyecto entero de memoria."* Si el dev aprueba, construir el grafo antes de continuar.

---

## FASE 1 — Leer y Validar el Issue

```bash
gh issue view <nro>   # Lee el ticket del repositorio remoto
```

Comprueba el issue contra `templates/abstract-issue.md`. El issue DEBE tener:
- [ ] Impacto de negocio claro (no solo un título abstracto).
- [ ] Criterios de Aceptación (DoD) verificables.
- [ ] Trazas o datos técnicos (URL, endpoints, mensaje de error, IDs de ejemplo).

Si falta cualquiera de los tres, **detente**. Explica al dev exactamente qué información falta y por qué es necesaria antes de codificar: *"Sin Criterios de Aceptación claros no sé cuándo termina mi trabajo y puedo resolver el síntoma en lugar de la causa."*

---

## FASE 2 — Investigación Estructural (Antes de Tocar Código)

> Esta fase es obligatoria. El agente investiga primero, propone soluciones después.

Antes de abrir un solo archivo para editarlo, el agente debe:

1. **Navegar las relaciones del codebase** usando el mapa estructural disponible para identificar:
   - Los archivos y módulos directamente relacionados con el issue.
   - El blast radius: qué otros módulos se verían afectados por el cambio.
   - Código existente que podría reutilizarse o que podría romperse.

2. **Reportar los hallazgos al dev** antes de proponer soluciones:
   ```
   🔍 INVESTIGACIÓN
     Punto de entrada  : <archivo/función donde se origina el issue>
     Módulos afectados : <lista de archivos con relación directa>
     Blast radius      : <qué otros módulos impacta el cambio>
     Reutilizable      : <código existente que aplica>
     Causa raíz        : <descripción técnica de la causa real>
   ```

3. **Proponer el enfoque** con su trade-off antes de implementar: *"Mi propuesta es X porque resuelve la causa raíz. La alternativa Y sería más rápida pero solo resolvería el síntoma y el bug volvería."*

---

## FASE 3 — Configurar Gitflow (VERIFICAR RAMA LOCAL VS REMOTA)

```bash
git branch -a    # Ver TODAS las ramas (locales y remotas)
```

Explicación al dev: *"Verifico las ramas existentes para crear la tuya desde develop y no desde main, y para asegurar que el nombre sea único y siga la convención."*

1. **Confirma que `develop` existe en remoto** (`remotes/origin/develop`). Si no existe:
   ```bash
   git checkout -b develop main && git push -u origin develop
   ```

2. **Crea tu rama de trabajo desde `develop`**, nunca desde `main`:
   ```bash
   git checkout -b bugfix/ISSUE-<nro>-<nombre-corto> develop   # Para un fix
   git checkout -b feature/ISSUE-<nro>-<nombre-corto> develop  # Para una feature
   ```

3. **Verifica y reporta la rama activa** antes de tocar código:
   ```bash
   git branch --show-current
   ```
   Reporta: `🌿 Trabajando en rama: feature/ISSUE-X-... (base: develop)`

---

## FASE 4 — Implementación

- Trabaja únicamente en tu rama efímera.
- Haz commits atómicos referenciando el issue:
  ```bash
  git commit -m "feat: descripción del cambio (ref #<nro>)"
  ```
- Explica cada cambio significativo al dev: *"Moví esta lógica al Application Layer porque en el Controller viola la separación de responsabilidades (SRP)."*

---

## FASE 5 — Cierre: Pull Request (ÚNICA SALIDA VÁLIDA)

> ⛔ El ticket NO está terminado hasta que el PR tenga URL. Un commit sin PR = tarea abierta.

```bash
git push -u origin <rama-efimera>

gh pr create \
  -B develop \
  --title "<tipo>(#<nro>): <descripción corta>" \
  --body "## Resuelve\nCloses #<nro>\n\n## Causa Raíz\n<descripción técnica>\n\n## Verificación 4R\n- [ ] Risk: sin vulnerabilidades ni cuellos de botella\n- [ ] Readability: código limpio y con convenciones\n- [ ] Reliability: resuelve la causa raíz y pasan los tests\n- [ ] Resilience: maneja errores y casos borde"
```

Reporta al dev:
```
✅ TICKET CERRADO
  PR URL    : <URL del PR en GitHub>
  Closes    : Issue #<nro>
  Rama      : <rama-efimera> → develop
  Revisores : <si aplica>
```

**Cierre en Engram:** Guarda `mem_save` con el título del fix, URL del PR y número de issue. Explica: *"Guardo esta solución en la memoria del proyecto para que si el bug vuelve a aparecer o alguien tiene que entender este código, tenga el contexto completo de por qué se resolvió así."*
