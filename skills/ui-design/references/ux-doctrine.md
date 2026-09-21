# Doctrina de uso: cómo se comporta la gente y qué delata un diseño generado

Adaptado de gstack (garrytan/gstack, MIT; copias en `sources/gstack/`), que a su vez toma
los principios de Steve Krug en *Don't Make Me Think* y la guía de OpenAI sobre interfaces.
Se lee antes de escribir direcciones (paso 3 de `ui-design`), antes de revisar una imagen
(pasos 2c y 4) y antes de escribir HTML (paso 5). No reemplaza a
`skills/design-brief/references/heuristicas-y-leyes.md`: aquello sirve para saber qué
preguntar en el discovery, esto sirve para dibujar.

## Cómo se comporta la gente

Tres leyes. No me hagas pensar: si la persona se detiene a preguntarse qué toca o qué
significa algo, el diseño falló. Los clics no importan, pensar sí: tres clics obvios valen
más que uno que exige pensar. Omite, y vuelve a omitir: la mitad de las palabras de cada
pantalla sobra, y después sobra la mitad de lo que quedó.

La gente escanea, no lee. Toma la primera opción razonable, no la mejor. Se las arregla sin
entender cómo funciona, y cuando algo le sale se queda con eso aunque sea la peor forma. No
lee instrucciones.

Qué hacer con eso. Usar las convenciones: logo arriba a la izquierda, navegación arriba o a
la izquierda, una lupa para buscar. Jerarquía visual: lo relacionado va junto, lo
importante es más grande, y si todo grita nada se oye. Lo clicable se ve clicable sin
pasar el mouse. Se quita ruido en vez de agregar cosas. Claridad antes que consistencia.
La navegación responde siempre dónde estoy, qué hay aquí y cómo vuelvo.

En móvil rigen las mismas reglas, más caras: no hay hover, el área táctil mide 44 px como
mínimo, y lo urgente está a mano.

## Para interfaces de trabajo, que es lo que casi siempre diseñamos

Superficies calmas, tipografía firme, pocos colores. Denso pero legible. Un área de trabajo
principal, la navegación, el contexto secundario y un solo acento. Sin mosaicos de
tarjetas, sin bordes gruesos, sin gradientes decorativos. Lenguaje de utilidad:
orientación, estado, acción. Los títulos dicen qué es el área o qué puede hacer la persona.
Tarjetas solo cuando la tarjeta es la interacción.

Reglas que valen para todo: variables CSS para el color; ninguna tipografía por defecto sin
decidirla; una tarea por sección; cuerpo de 16 px o más y contraste 4.5 a 1; la etiqueta de
un campo nunca es solo el placeholder; los títulos van pegados a lo que introducen.

## Lo que delata un diseño generado

Once patrones. Si una imagen o un HTML cae en uno, se regenera antes de mostrarlo.

1. Fondos con gradiente violeta, o de azul a violeta.
2. La grilla de tres columnas con icono en círculo de color, título en negrita y dos líneas.
3. Iconos en círculos de color como decoración.
4. Todo centrado.
5. El mismo radio grande en todos los elementos.
6. Manchas, círculos flotantes, divisores ondulados.
7. Emojis como elementos de diseño.
8. Borde izquierdo de color en las tarjetas.
9. Textos genéricos de bienvenida: "Bienvenido a", "Tu solución integral".
10. El mismo ritmo de secciones de siempre, todas de la misma altura.
11. La tipografía del sistema como única decisión tipográfica.

Rechazos duros, uno alcanza: una grilla de tarjetas como primera impresión, un titular
fuerte sin acción clara, imágenes cargadas detrás del texto, secciones que repiten la misma
idea, una aplicación hecha de tarjetas apiladas en lugar de un layout.

## Preguntas de control

Antes de dar por buena una imagen o un HTML: ¿se entiende de qué producto es en la primera
pantalla? ¿Hay un ancla visual clara? ¿Se entiende leyendo solo los títulos? ¿Cada sección
tiene un trabajo? ¿Las tarjetas son necesarias? ¿Se vería bien sin sombras decorativas? Y
la de gstack: ¿le daría vergüenza a una diseñadora firmar esto? Si la respuesta es sí, se
regenera. Una imagen mediocre es peor que ninguna.

## Catálogo para escribir direcciones visuales (camino 3 del paso 2)

Tomado de la consulta de diseño de gstack. No es una lista para mostrar al PM como tabla:
es el vocabulario con el que se escriben tres direcciones que de verdad difieran. Una
dirección se arma eligiendo una fila de cada grupo; si dos direcciones comparten tres
elecciones, son hermanas y una falló.

**Direcciones estéticas.** Mínima (solo tipografía y espacio en blanco, sin decoración).
Editorial (jerarquía tipográfica fuerte, grillas asimétricas). Refinada (serifas, alto
contraste, mucho aire). Lúdica (redondeada, colores primarios, cercana). Industrial (función
primero, densa en datos, acentos monoespaciados, paleta apagada). Orgánica (tonos tierra,
formas redondeadas, textura). Cruda (estructura expuesta, grilla visible, sin pulido).
Retro tecnológica y maximalista existen, pero casi nunca aplican a un sistema de trabajo.

**Decoración.** Mínima (la tipografía hace todo el trabajo), intencional (una textura o
fondo sutil), expresiva (capas, patrones, profundidad).

**Layout.** Disciplinado (columnas estrictas, alineación predecible), editorial (asimetría,
superposición), híbrido (grilla para la aplicación, libertad para lo comercial).

**Color.** Contenido (un acento y neutros; el color es raro y significa algo), balanceado
(primario, secundario y colores semánticos), expresivo (el color como herramienta
principal).

**Tipografía por rol.** Títulos: Satoshi, General Sans, Instrument Serif, Fraunces, Cabinet
Grotesk. Cuerpo: Instrument Sans, DM Sans, Source Sans 3, Geist, Plus Jakarta Sans, Outfit.
Datos y tablas: Geist o DM Sans con números tabulares, JetBrains Mono, IBM Plex Mono.

**Coherencia.** Cuando el PM cambia una elección, se revisa que el resto siga cerrando, y se
avisa sin bloquear: una estética cruda con decoración expresiva es rara; un color expresivo
con decoración mínima carga todo el peso en la paleta; un layout editorial pelea con un
producto denso en datos. La elección final siempre es del PM y de diseño.

**Contra la convergencia.** Entre proyectos no se repite la misma combinación sin decirlo.
Si el anterior fue Geist, oscuro y editorial, este propone otra cosa o declara por qué
repite. La convergencia entre generaciones es la firma de un diseño generado.

## Tipografías

Se evitan como decisión por defecto: Inter, Roboto, Arial, Helvetica, Open Sans, Lato,
Montserrat, Poppins y Space Grotesk, que es la "alternativa segura a Inter" a la que
converge toda herramienta generativa. Se usan solo si el cliente las trae en su marca.
Nunca: Papyrus, Comic Sans, Lobster, Impact, ni Courier New para cuerpo. Los mockups HTML
abren sin red, así que la familia elegida lleva una alternativa local en la pila de fuentes.
