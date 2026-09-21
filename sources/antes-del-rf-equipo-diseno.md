# Antes del RF

*Método de descubrimiento UX · complemento del RF*

Trece puntos para pedirle al área de negocio junto con los requerimientos funcionales — para que lleguen pensados en la experiencia de las personas que van a usar el sistema, no solo en lo que hay que programar.

#### Cómo usarlo

- Envía este documento al analista de negocio antes de la reunión de levantamiento, como guía de lo que necesitas.

- Úsalo como checklist durante la reunión: cada punto sin respuesta es una pregunta que haces ahí mismo.

- Adjunta las respuestas como anexo al documento de RF — pasa a ser parte del requerimiento, no un extra.

## **BLOQUE A ·** Negocio y objetivo

> El contexto que le da sentido a todo lo demás. Sin esto, cada decisión de diseño se defiende con opinión en vez de con criterio.

### **01** El negocio del cliente

*Sin entender cómo genera valor la empresa, no puedes priorizar ni defender una decisión de diseño frente a negocio.*

- ¿A qué se dedica el área o la empresa, en una frase?

- ¿Cómo gana dinero o genera valor este proceso puntual?

- ¿Qué otras áreas, colaboradores o personas dependen de que esto funcione bien?

**método →** conversación de 20 min con el dueño del negocio  
**entrega →** un párrafo o mapa simple del modelo

### **02** ¿Por qué debemos resolverlo?

*Separa lo urgente de lo “estaría bien tenerlo”, y te da el argumento para justificar decisiones ante el negocio.*

- ¿Qué pasa concretamente si no se resuelve en 6 meses?

- ¿Qué lo disparó — una queja, una pérdida, una auditoría, una expansión?

- ¿Es una mejora incremental o una urgencia con fecha límite?

**método →** “¿y si no lo hacemos?”  
**entrega →** 2–3 líneas de justificación de negocio

### **03** Qué necesita obtener el negocio del sistema

*Define las métricas de éxito reales del proyecto — las que el negocio va a medir, no las que tú supones que es “buen UX”.*

- ¿Qué número quieren ver moverse — tiempo, error, costo, volumen, adopción?

- ¿Quién revisa ese resultado, y con qué frecuencia?

- ¿Cómo se mide hoy ese número, si es que se mide?

**método →** “¿cómo sabremos en 3 meses que esto funcionó?”  
**entrega →** 1–3 KPIs de negocio explícitos

## **BLOQUE B ·** El problema real

> Un RF casi siempre documenta una solución ya decidida por negocio, no el problema. Si diseñas sobre la solución, heredas sus supuestos sin cuestionarlos.

### **04** Su problema real, no el que creen tener

*Hay que llegar a la raíz — lo que reportan suele ser el síntoma más visible, no la causa.*

- ¿Qué observaron o midieron para decir que esto es un problema?

- Pregunta “¿por qué?” cinco veces sobre el síntoma reportado.

- ¿Qué soluciones ya intentaron antes, y por qué no funcionaron?

**método →** 5 porqués / diagrama causa-efecto  
**entrega →** el problema raíz en una frase, no una solución

### **05** A quiénes afecta realmente

*El problema casi siempre afecta a más gente que a quien lo reportó — el jefe lo reporta, el operativo lo sufre.*

- ¿Quién hace la tarea hoy, en el día a día?

- ¿Quién recibe o depende del resultado de esa tarea?

- ¿A quién le complica la vida si el sistema falla?

**método →** mapa de actores / stakeholders  
**entrega →** lista de roles afectados, directos e indirectos

## **BLOQUE C ·** Usuarios reales

> Quien pide el sistema —gerencia, un CEO— casi nunca es quien lo va a usar a diario. Diseñar para el patrocinador en vez de para el operador es el error más frecuente.

### **06** Quiénes son los usuarios reales

*No el cargo que firma el proyecto, sino la persona que va a tener el sistema abierto ocho horas al día.*

- Función exacta: ¿qué hace ese rol hoy, paso a paso?

- Perfil: edad promedio, formación o profesión, antigüedad en el puesto.

- ¿Qué resultado entrega su trabajo hoy, sin el sistema nuevo?

- ¿Qué resultado esperamos que entregue con el sistema?

**método →** ficha de usuario real / observación breve  
**entrega →** una ficha por cada rol clave

### **07** Qué necesita hacer exactamente en el sistema

*Distingue tareas reales de “funcionalidades” que el negocio imagina que se necesitan.*

- ¿Qué hace justo antes y justo después de usar el sistema?

- ¿Qué decide con la información que obtiene ahí?

- ¿Con qué frecuencia repite esa tarea?

**método →** entrevista contextual / sombra al usuario  
**entrega →** tareas como verbo + objeto (“registrar pago”, no “módulo de pagos”)

## **BLOQUE D ·** Proceso end-to-end

> Entender el flujo completo evita optimizar una pantalla que termina rompiendo el paso siguiente en otra área.

### **08** El proceso, en una vista general y sin software

*Antes de hablar de pantallas, entender el proceso como sucede en la realidad — con papeles, personas y decisiones.*

- ¿Por qué áreas o personas pasa el proceso completo?

- ¿Pueden armar un mapa de procesos actual sin pensar que se está usando un software?

**método →** mapeo en pizarra con negocio, sin mencionar pantallas  
**entrega →** diagrama simple de cajas y flechas

### **09** Si ya existe un software: su proceso y qué tocaremos

*Evita rediseñar desde cero lo que ya funciona, y aclara el alcance real del proyecto.*

- ¿Qué usan hoy — aunque sea Excel o un sistema legado?

- ¿Qué estados tiene un caso o registro, de inicio a cierre?

- ¿Qué parte de ese flujo cambia con este proyecto y cuál queda igual?

**método →** walkthrough guiado por un usuario del sistema actual  
**entrega →** mapa de estados + alcance marcado (cambia / no cambia)

## **BLOQUE E ·** Evidencia documental

### **10** Cada RF, asociado a un documento real en uso

*Un formulario o reporte real revela reglas de negocio, campos y excepciones que nadie menciona en una reunión — porque para ellos son obvias.*

- Si el RF describe un registro manual: pide la foto o escaneo del formulario en uso.

- Si describe un reporte: pide el reporte real, con datos reales (o anonimizados).

- Si describe una pantalla existente: pide capturas del flujo actual, no solo la descripción.

**método →** pedir la evidencia como parte del RF, no después  
**entrega →** un documento, foto o captura real por cada RF relevante

### **11** Restricciones y supuestos

*Delimitan el espacio real de soluciones antes de diseñar — evita proponer algo que ya está descartado por ley, presupuesto o plazo.*

- ¿Hay una norma, regulación o política interna que aplique?

- ¿Qué presupuesto y plazo tiene el proyecto?

- ¿Qué está fuera de alcance, aunque parezca relacionado?

**método →** pregunta directa al inicio  
**entrega →** lista corta de restricciones y supuestos

### **12** Volumetría y contexto real de uso

*Un formulario usado dos veces al año se diseña distinto a uno usado doscientas veces al día bajo presión.*

- ¿Cuántos usuarios y cuántos casos por día/mes?

- ¿En qué dispositivo y ambiente físico se usa (oficina, campo, mostrador, con guantes, sin internet)?

- ¿Hay picos de uso — cierre de mes, campaña, temporada?

**método →** datos operativos del área + observación de campo  
**entrega →** cifras de volumen y una descripción del entorno físico

### **13** Quién decide de verdad

*Sin un sponsor claro, los cambios de opinión tardíos de distintas personas destruyen el trabajo de diseño ya validado.*

- ¿Quién aprueba el diseño en última instancia?

- ¿Quién más necesita firmar conforme antes de construir?

- ¿Ya validaron esto con los usuarios reales, o solo con gerencia?

**método →** definirlo por escrito antes del kickoff  
**entrega →** un nombre, no un cargo

## **BLOQUE ✓ ·** Checklist para la reunión de levantamiento

| **Nº** | **Punto**                         | **¿Lo tengo?** |
|--------|-----------------------------------|----------------|
| **01** | Negocio del cliente               | ☐              |
| **02** | Problema real (raíz)              | ☐              |
| **03** | A quiénes afecta                  | ☐              |
| **04** | Por qué resolverlo ahora          | ☐              |
| **05** | Proceso end-to-end (sin software) | ☐              |
| **06** | Usuarios reales                   | ☐              |
| **07** | Qué necesita hacer el usuario     | ☐              |
| **08** | Qué necesita obtener el negocio   | ☐              |
| **09** | Documento real por RF             | ☐              |
| **10** | Software actual y alcance         | ☐              |
| **11** | Restricciones y supuestos         | ☐              |
| **12** | Volumetría y contexto de uso      | ☐              |
| **13** | Quién decide                      | ☐              |

*Pensado para usarse junto al documento de RF, no en reemplazo de él — este es el brief de descubrimiento UX que precede y acompaña al requerimiento funcional.*
