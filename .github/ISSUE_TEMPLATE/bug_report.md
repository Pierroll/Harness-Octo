---
name: Reporte de Bug / Fix
about: Reporta un error en el sistema. Debe contener información técnica y trazas para el agente (OCTO).
title: 'fix: [Breve descripción del bug]'
labels: bug, maintenance
assignees: ''
---

## 1. Impacto de Negocio (El "Por qué")
*Explica cómo este bug afecta al usuario final o al negocio. Ej: "Los usuarios de iOS no pueden finalizar la compra, bloqueando ventas".*
- **Impacto:** ...

## 2. Comportamiento (As-Is vs To-Be)
*Describe qué está pasando y qué debería pasar. Sé específico.*
- **As-Is (Actual):** ...
- **To-Be (Esperado):** ...

## 3. Trazabilidad y Datos Críticos (Para el Agente IA) 🧠
*¡OBLIGATORIO! El agente necesita estos datos para buscar en el código y logs. Si no los tienes, búscalos antes de crear el ticket.*
- **URL o Pantalla exacta:** [ej. /api/checkout o Pantalla de Login App]
- **Mensaje de Error Crudo:** [Pega aquí el texto exacto del error, stacktrace o pantalla roja. Ej: NullPointerException at auth.ts]
- **IDs de Ejemplo:** [ej. UserID: 1234, TransactionID: TX-999]

## 4. Pasos para Reproducir
*Paso a paso exacto para llegar al error.*
1. Ir a...
2. Hacer clic en...
3. Ver el error...

## 5. Criterios de Aceptación Técnicos (DoD)
*Condiciones exactas para que el arnés cierre el ticket.*
- [ ] El error desaparece y la acción se completa exitosamente.
- [ ] ...

---
*Nota interna:* Si este ticket no tiene trazas (Punto 3) o DoD claro (Punto 5), el arnés OCTO lo rebotará automáticamente en la fase de Triage.
