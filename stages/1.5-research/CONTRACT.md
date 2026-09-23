# Contrato de la Etapa 1.5: Research (Investigación)

Esta etapa fuerza una pausa analítica entre la planificación inicial y el análisis profundo. Evita que el equipo asuma soluciones tecnológicas sin evidencia externa.

## Entradas (Inputs)
| Documento | Origen |
|---|---|
| `discovery-plan.md` | `1-planning` |
| Requerimientos iniciales (Propuesta/TDR) | Cliente/Ventas |

## Acción Principal
El orquestador DEBE lanzar un sub-agente (con capacidad de web search, lectura de documentación, y exploración de librerías) para investigar la viabilidad técnica del problema. Este sub-agente comparará patrones arquitectónicos y evaluará librerías candidatas para resolver los desafíos centrales identificados en la planificación.

## Salidas (Outputs)
| Documento | Descripción | Invalida/Reemplaza |
|---|---|---|
| `research-findings.md` | Resumen de evidencia externa, librerías evaluadas, y justificación de los caminos tecnológicos elegidos o descartados. | (Primera iteración) |
