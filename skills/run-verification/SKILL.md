---
name: run-verification
description: Revisión adversarial. Intenta romper el fix recién codificado.
---

# Skill: run-verification

> **IMPORTANTE:** Este skill se ejecuta como sub-agente aislado.
> Detente y dile al usuario que abra una sesión manual nueva limpia e invoque este skill.
> **Contexto permitido:** Archivos de logs, stacktraces, código fuente específico.
> **Contexto prohibido:** Historial de la conversación del humano, decisiones previas de orquestación.

## Procedimiento

### Paso de Congelamiento Atómico (Receipt)
Antes de que el sub-agente adversarial ejecute cualquier prueba, el orquestador DEBE congelar el código:
1. Crea una rama efímera aislada: `git checkout -b octo/verify-case-<numero>`
2. Aplica el código o el parche generado en la Etapa 4.
3. Haz un commit encapsulando el cambio para generar un Hash SHA inmutable (El Receipt).

El sub-agente adversarial correrá las pruebas **estrictamente sobre esa rama efímera**.

### Auditoría 4R (Risk, Readability, Reliability, Resilience)
Tras confirmar que el código compila y las pruebas automatizadas pasan, el sub-agente DEBE auditar el parche modificado bajo estas 4 dimensiones:
1. **Risk (Riesgo):** ¿Introduce vulnerabilidades de seguridad, inyecciones, fugas de memoria o cuellos de botella de rendimiento?
2. **Readability (Legibilidad):** ¿El código es limpio, sigue convenciones modernas del framework, evita la deuda técnica (variables mágicas, lógica ofuscada) y tiene nombres claros?
3. **Reliability (Confiabilidad):** ¿Realmente soluciona el problema raíz de forma robusta y no rompe tests adyacentes?
4. **Resilience (Resiliencia):** ¿Maneja adecuadamente edge cases, nulos, desbordamientos numéricos y excepciones imprevistas?

### Veredicto y Criterio de Rechazo Estricto
- **Si el parche falla los tests automatizados:** RECHAZO INMEDIATO.
- **Si el parche aprueba los tests pero falla gravemente en Riesgo, Legibilidad o Resiliencia (ej. es un "hack" sucio o hardcodeado):** RECHAZO INMEDIATO.
- En caso de rechazo, registra el fallo en `iteration-record.md` estructurando el motivo usando las categorías 4R afectadas (ej. *"Rechazado por Readability: uso de variables mágicas y falta de control de excepciones"*). Luego, vuelve a la rama principal (`git checkout main`), elimina la rama efímera (`git branch -D octo/verify-case-<numero>`) y retorna el flujo a la Etapa 4 para reescribir la solución.
- Si pasa todas las pruebas y la auditoría 4R, aprueba el fix.
1. Lee los insumos definidos en el contrato.
2. Ejecuta tu tarea específica de mantenimiento.
3. Genera la salida esperada.
