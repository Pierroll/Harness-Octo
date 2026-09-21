---
name: discovery-report
description: >
  Redacta el informe final del discovery: el documento que el cliente lee, con
  hallazgos, solución propuesta, alcance por módulo, cronograma y propuesta económica.
  Usar cuando el usuario diga "arma el informe final", "informe de discovery",
  "documento de cierre del discovery", "prepara la entrega", o en la semana final del
  plan. El informe se escribe como lo escribiría una persona: leer SIEMPRE
  references/writing-style.md antes de redactar una sola línea.
---

# Discovery report — el informe final

Es el entregable que justifica el discovery ante el cliente. Lo leen gerentes, no
desarrolladores. Antes de escribir, lee `references/writing-style.md`; el informe que
"huele a IA" devalúa todo el trabajo anterior.

Entradas: las salidas de la etapa 2 y de la etapa 3 (`discovery/2-analysis/outputs/` y
`discovery/3-design/outputs/`), el registro de riesgos `discovery/3-design/outputs/gaps-and-risks.md`, y el
documento de entendimiento inicial, para contrastar qué se confirmó y qué cambió.

## Estructura — `discovery/3-design/outputs/discovery-report.md`

1. **Resumen ejecutivo** (1 página máximo): qué se encontró, qué se propone, cuánto
   cuesta, cuánto toma. Un gerente que solo lee esta página toma la decisión.
2. **El problema como lo entendimos:** el As-Is en prosa, con los dolores concretos
   que salieron de las sesiones. En esta sección el cliente tiene que reconocerse.
3. **La solución propuesta:** módulos y qué resuelve cada uno, en lenguaje de negocio.
   La arquitectura técnica va como anexo, no en el cuerpo.
4. **Alcance y fuera de alcance:** explícito por módulo. Lo que NO entra, escrito, es
   lo que evita la pelea de alcance en el mes 4.
5. **Cronograma del proyecto:** por módulo con dependencias, desde `estimation.md`.
6. **Inversión:** precio por módulo. Los hitos de pago no van todavía: cómo se reparten
   está pendiente de definir con el área comercial (ver `skills/estimation/`).
7. **Riesgos y cómo los mitigamos:** los altos de `gaps-and-risks.md`, en lenguaje de
   negocio. Es el mismo registro que se abrió en la etapa 1 y que el diseño técnico
   refinó, no uno nuevo.
8. **Anexos:** RF light, arquitectura, mapa de integraciones.

## Proceso

1. Redacta el borrador completo siguiendo la guía de estilo.
2. Pásale el filtro de estilo: relee buscando las señales prohibidas de
   `references/writing-style.md` y corrige.
3. El checkpoint de la etapa 3 (`checkpoint-review`, sesión fresca) incluye la
   revisión de estilo como criterio. No se envía sin pasarlo.
4. Genera el `.docx` con la plantilla corporativa en
   `discovery/3-design/outputs/ready-to-take/Informe_Discovery_[Cliente].docx` (ver `skills/ready-to-take/`);
   el markdown queda como versión de registro en git.

## Modos de fallo

- **Números que no cuadran entre secciones** (estimación dice 14 semanas, cronograma
  muestra 16): detente y reconcilia contra `estimation.md`; el informe nunca corrige
  números por su cuenta.
- **Hallazgo incómodo** (ej. la data del cliente no alcanza para lo que pidió): va en
  el informe con la alternativa propuesta. Omitirlo para no incomodar convierte el
  discovery en venta.
- **Presión de tiempo para saltarse el checkpoint:** en nuestro gantt la revisión
  interna es una actividad propia. Es un día del plan; no es opcional.
