# Checklist de requisitos (checkpoint de la etapa 2)

Criterios verificables para el checkpoint de salida del Análisis. Destilado del
checklist de QA de nuestro skill `srs-generation` (basado en IEEE 830 e ISO/IEC/IEEE
29148), quedándose con lo que aplica a un discovery: sin PRD upstream, sin secciones
obligatorias de SRS formal.

Cada ítem se verifica contra evidencia en el repo, no contra la palabra del documento.
Un ítem que falla es hallazgo, no observación.

## Completitud

- [ ] Cada módulo de la propuesta tiene al menos un RF; ningún módulo quedó sin cubrir
      sin justificación escrita.
- [ ] Hay RF y RNF. Un catálogo sin ningún RNF significa que no se preguntó por
      rendimiento, seguridad ni disponibilidad, no que el proyecto no los tenga.
- [ ] Cada entidad de datos relevante tiene definidas sus operaciones de creación,
      consulta, modificación y baja. Si alguna no aplica, está dicho por qué (ejemplo:
      baja lógica por política del negocio). Es el hueco clásico del análisis.
- [ ] Cada requisito que reemplaza o refactoriza algo existente dice cómo ver ese algo:
      link, credencial de prueba, captura o export. Sin eso se rediseña a ciegas y los
      campos que faltaban aparecen después.
- [ ] Los campos de cada pantalla o formulario que se reemplaza fueron contrastados contra
      el artefacto real, no solo contra lo que se dijo en la sesión.
- [ ] Los términos del dominio que el cliente usa están definidos en algún lado; un
      requisito con vocabulario que solo entiende quien estuvo en la sesión no sirve.

## Calidad

- [ ] Ningún requisito usa "rápido", "amigable", "eficiente" o "robusto" sin una cifra
      que lo respalde.
- [ ] Cada RF detallado tiene criterios de aceptación verificables en formato
      Dado/Cuando/Entonces.
- [ ] Los criterios cubren el camino de error, no solo el feliz: entradas inválidas,
      permisos insuficientes, estados vacíos, límites. Un requisito con un solo
      criterio casi siempre está incompleto.
- [ ] Los requisitos dicen QUÉ hace el sistema, no CÓMO se implementa. Las decisiones
      de tecnología van a la etapa 3, salvo que sean restricción real del cliente.
- [ ] Las condiciones de límite están dichas donde hay rangos, montos, fechas o
      tamaños.
- [ ] Cada RNF trae métrica, valor objetivo y cómo se mide.

## Consistencia

- [ ] Los IDs siguen la convención `RF-<MÓDULO>-<NNN>` y `RNF-<CATEGORÍA>-<NNN>`, y
      ningún ID está repetido ni reasignado.
- [ ] No hay dos requisitos que se contradigan.
- [ ] El vocabulario es el mismo en todo el catálogo y coincide con el de las sesiones.
- [ ] Los IDs que se citan como dependencia existen de verdad.
- [ ] Las prioridades están asignadas con un criterio consistente, no una por una.

## Trazabilidad (lo que más se cae en un discovery)

- [ ] Elige 3 a 5 requisitos al azar y persíguelos hasta su insumo: sesión, documento
      del cliente o decisión registrada. Si no llegas a la fuente, es hallazgo.
- [ ] Las inferencias están marcadas como inferencias, no disfrazadas de hallazgo.
- [ ] Los supuestos sin confirmar están en "pendiente de validación" con dueño y no
      escondidos dentro de la redacción del requisito.
