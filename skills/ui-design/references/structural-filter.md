# Filtro estructural: lo que se decide antes de dibujar

Propuesta nuestra, cruzada el 3 de septiembre de 2026 con el documento que entregó el equipo
de diseño, "Antes del RF" (`sources/antes-del-rf-equipo-diseno.md`). Ese documento lista lo
que diseño necesita saber antes de tocar un requisito; el brief lo trae (secciones 1, 3, 5
y 7), y este filtro lo convierte en decisiones de estructura. Las leyes de UX están en
`skills/design-brief/references/heuristicas-y-leyes.md`, cada una con lo que decide al
diseñar. Estos criterios son los que aplica el paso 3 de `ui-design` para escribir las tres
direcciones de cada pantalla, y cada dirección dice qué criterio la disparó.

La idea es una sola. Un requisito describe qué hace el sistema, no cómo se ve. Un requisito
con veinte campos no se dibuja como veinte campos. El filtro convierte lo que dicen el
requisito, el brief y los inventarios en decisiones de estructura, y las escribe antes de
gastar una imagen.

| # | Criterio | Qué lo dispara | Qué dirección produce |
|---|---|---|---|
| 1 | Campos por vista | Más de siete u ocho campos en una misma pantalla | Partir en pasos o secciones. Agrupar por tipo de dato (identidad, contacto, dirección, pago, documentos) o por momento del proceso. Nunca de a N arbitrario salvo que el PM lo pida; si lo pide, se anota |
| 2 | Lo que ya existe no se pide | Un campo que vive en una fuente conocida (`inventory-sources.md`, brief sección 6) | El campo aparece prellenado o se busca, no se escribe. Reconocer antes que recordar |
| 3 | Quién y dónde | Rol de campo, móvil, poca señal o bajo nivel técnico (brief sección 3) | Una cosa por pantalla, botones grandes, texto de 16 px o más, nada depende de pasar el mouse. Rol de escritorio y uso diario: denso, con atajos |
| 4 | Listas | Más de veinte registros, o el rol filtra para decidir | Búsqueda y filtros visibles arriba o al costado; columnas por lo que el rol decide, no todo el modelo; máximo dos acciones visibles por fila |
| 5 | Estados | Cada criterio Dado/Cuando/Entonces de error, vacío o límite | Un estado que se dibuja: vacío, error de validación con el mensaje literal del criterio, éxito. Los estados terminales del mapa de estados suelen ser confirmaciones |
| 6 | Acciones irreversibles | Una transición del mapa de estados que no se deshace, o que necesita aprobación de otro | Confirmación explícita que dice qué va a pasar; quién aprueba, visible |
| 7 | Reglas de criterio | Una regla de negocio que depende del juicio de una persona (brief sección 6) | Pantalla de revisión con la información para decidir, no un automatismo |
| 8 | Navegación por rol | La tabla de roles dice qué módulos ve cada rol | La navegación muestra solo lo del rol y dice dónde estoy. El mismo flujo puede necesitar dos pantallas distintas para dos roles |
| 9 | Lenguaje | El vocabulario del cliente (brief sección 2, notas de sesión) | Títulos y etiquetas con sus palabras; nada se traduce a las nuestras |
| 10 | Un trabajo por pantalla | Un requisito que mezcla dos capacidades | Dos pantallas, o una con dos estados. Nunca dos formularios en la misma vista |
| 11 | Frecuencia y volumen | El brief (sección 3) dice cuántas veces al día o al año usa esto el rol, cuántos casos entran y si hay picos | Uso diario y muchos casos: denso, atajos, sin pasos intermedios ni confirmaciones de más. Uso ocasional: guiado, un paso a la vez, con explicación en pantalla. Un formulario que se llena dos veces al año no se diseña como uno que se llena doscientas veces al día |
| 12 | Tarea, no módulo | El brief (sección 3) dice qué hace el rol como verbo más objeto ("registrar pago"), qué hace justo antes y justo después | La pantalla se nombra y se organiza por la tarea, y su primera acción es la que sigue a lo que la persona acaba de hacer. "Módulo de pagos" no es una pantalla |

## Cómo se usa

Por cada pantalla se recorre la tabla, se anota qué criterios disparan y se escriben tres
direcciones que los respetan de formas distintas. Ejemplo: un requisito de inscripción con
dieciocho campos (criterio 1) que un postulante llena desde el celular (criterio 3).

- A, "Cuatro pasos": un paso por tipo de dato, barra de progreso arriba, un solo botón por
  paso.
- B, "Una página con secciones": secciones plegables por tipo de dato, resumen de lo
  completado a la derecha, guardado por sección.
- C, "Pestañas": una pestaña por tipo de dato, indicador de completitud en cada una, envío
  al final.

Las tres cumplen el requisito y las tres pasan el filtro. Elegir entre ellas es lo que hace
el PM con el equipo de diseño en el tablero, con imágenes delante.

## Lo que el filtro no hace

No corrige el requisito. Si al aplicarlo aparece un campo que no está en el RF, un estado
que ningún criterio contempla o una regla que nadie anotó, es una marca `contradice:` para
`harness/skills/reopen-artifact/`, no una decisión del mockup.
