---
name: Feature Request / Nueva Funcionalidad
about: Sugiere una idea o característica. Debe contener reglas de negocio claras para el agente (OCTO).
title: 'feat: [Breve título de la feature]'
labels: enhancement, feature
assignees: ''
---

## 1. El Problema de Negocio (Por qué)
*Explica la fricción actual que justifica construir esto.*
- **Problema:** ...

## 2. La Solución Propuesta (El Qué)
*Describe cómo debería funcionar la nueva característica desde la perspectiva del usuario.*
- **Solución:** ...

## 3. Criterios de Aceptación Técnicos (DoD) 🧠
*¡OBLIGATORIO! El agente de IA programará en base a esto. Debe ser una lista exhaustiva de condiciones lógicas.*
- [ ] La regla de negocio X se cumple cuando Y.
- [ ] El endpoint devuelve Z en caso de éxito.
- [ ] Si ocurre el error A, el sistema debe responder B.

## 4. Dependencias, Pantallas y Endpoints Afectados
*¿Dónde vivirá esta feature? Dale contexto de ubicación al agente.*
- **Pantalla/Módulo:** [Ej: Dashboard de Reportes]
- **API/Rutas:** [Ej: POST /api/reports]
- **Depende de:** [Ej: Issue #123 o un servicio externo]

---
*Nota interna:* OCTO utilizará el Punto 3 (DoD) para diseñar la arquitectura y generar los tests. Si el DoD es ambiguo, el agente suspenderá la ejecución.
*PM:* Por favor, asegúrate de asignar este issue al **Milestone (Sprint)** correspondiente y revisar las **Labels** en la barra lateral derecha antes de enviarlo.
