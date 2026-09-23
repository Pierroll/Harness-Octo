# OCTO Harness v4.1

OCTO es el arnés metodológico definitivo para gobernar tanto el ciclo de **Discovery** (etapas 1 a 3) como el de **Mantenimiento y Evolución** (etapa 4) de cualquier proyecto de software. 

Convierte el desarrollo caótico en un proceso agéntico repetible, seguro y auditado, imponiendo reglas estrictas de arquitectura, Gitflow y revisión por pares.

## Las 3 Reglas de Hierro (Guardián Arquitectónico)

Ningún humano ni agente puede bypassear estas reglas:
1. **Preflight Check Obligatorio:** Antes de tocar código, se valida que Engram (memoria persistente), Graphify y GH CLI estén activos. Trabajar a ciegas está prohibido.
2. **Gitflow y PR-Only Estricto:** Prohibido el `git push` directo a `main` o `develop`. Todo ticket debe nacer en una rama efímera y morir en un Pull Request formal revisado bajo el Framework 4R.
3. **Anclaje Absoluto:** El orquestador es la autoridad máxima. El agente se negará rotundamente a cumplir órdenes de "código rápido en main" citando este documento.

---

## El Flujo de Trabajo: Desde el Issue hasta el PR

El arnés ya no trabaja en el aire; opera sobre tickets validados y ramas rastreadas.

### 1. Ingesta del Issue
Todo comienza descargando los tickets del repositorio:
```bash
gh issue list
gh issue view <numero>
```
El ticket se somete al **Abstract Issue Model** (`templates/abstract-issue.md`). Si carece de Contexto de Negocio o Criterios de Aceptación (DoD) verificables, **el flujo se detiene**. El agente tiene prohibido codificar y pedirá contexto al PM/Soporte.

### 2. Gitflow y Entorno Local
Una vez validado el ticket, se crea la rama efímera de trabajo desde la base correcta (por defecto `develop`):
```bash
git checkout -b feature/ISSUE-<numero>-<nombre> develop
```
El agente mantendrá visibilidad constante de su rama local vs remota.

### 3. Ejecución del Ciclo (Discovery o Mantenimiento)
Dependiendo de la naturaleza del ticket, se corre el pipeline correspondiente (ver sección de Etapas).

### 4. Cierre y Verificación (4R)
Al finalizar el código, el agente no hace merge. Empuja la rama y levanta un Pull Request hacia `develop`:
```bash
gh pr create -B develop -t "feat: resuelve issue #<numero>"
```
El PR debe superar la **Verificación 4R** (Riesgo, Legibilidad, Confiabilidad, Resiliencia) para ser consolidado.

---

## El Pipeline de Etapas (Stages)

### Greenfield (Desarrollo desde Cero)
El ciclo clásico para nuevos proyectos o módulos masivos:
1. **1-planning:** Reconstrucción del problema, Kickoff, riesgos, y cronograma base.
2. **1.5-research (NUEVO):** Validación técnica obligatoria. El agente investiga librerías, lee documentación y compara patrones en internet antes de decidir la pila. Produce `research-findings.md`.
3. **2-analysis:** Levantamiento de As-Is/To-Be y despiece granular de reglas de negocio en base a la investigación previa.
4. **3-design:** Arquitectura, modelo de datos y diseño UX/UI.

### Mantenimiento (Fixes y Features)
Para el trabajo del día a día sobre código existente, se usa `stages/4-maintenance/`:
1. **Intake & Triage:** Lectura del Issue validado y enrutamiento.
2. **Investigation:** Análisis del *blast radius* usando Graphify sin tocar código (`root-cause.md`).
3. **Fix:** Implementación en la rama efímera, bloqueada por los *Security Guardrails* (Deny List de archivos sensibles).
4. **Verification:** Juez adversarial bajo el modelo 4R.
5. **Closure:** Creación del PR y resumen de la memoria a Engram.

---

## Supervivencia Cognitiva

OCTO utiliza el **Protocolo de Handoff** y la integración nativa con **Engram**. Antes de cerrar cualquier sesión o etapa, el agente resume su contexto actual (descubrimientos clave y directiva futura) y lo guarda permanentemente. De esta forma, el arnés sobrevive a los límites de memoria de los LLMs sin sufrir amnesia.

Además, OCTO corre bajo la **Persona Arquitectónica** (`persona.md`): actúa como un Tech Lead Senior que exige buenas prácticas, explica trade-offs técnicos y mentorea al equipo usando la confianza y el dialecto orgánico del equipo de desarrollo.
