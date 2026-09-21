
# Guía de Estilo para la Redacción de Requisitos No Funcionales

**Basado en:** ISO/IEC/IEEE 29148:2018 sección 5.2.4
**Autor:** Eder Ramiro Quispe Vilchez - eder.quispe@pucp.edu.pe  
**Aplicación recomendada para:** documentos de especificación de requisitos no funcionales (SyRS/SRS), catálogos técnicos, criterios de aceptación.

---

## Índice

1. [Principios generales para requisitos no funcionales](#1-principios-generales-para-requisitos-no-funcionales)
2. [Estructura recomendada del requisito no funcional](#2-estructura-recomendada-del-requisito-no-funcional)
3. [Clasificación de requisitos no funcionales](#3-clasificación-de-requisitos-no-funcionales)
4. [Buenas prácticas en redacción](#4-buenas-prácticas-en-redacción)
5. [Ejemplos de requisitos no funcionales bien redactados](#5-ejemplos-de-requisitos-no-funcionales-bien-redactados)
6. [Atributos recomendados para el catálogo](#6-atributos-recomendados-para-el-catálogo)
7. [Plantilla sugerida para el catálogo de requisitos no funcionales](#7-plantilla-sugerida-para-el-catálogo-de-requisitos-no-funcionales)
8. [Concepto SMART](#8-concepto-smart)
9. [Errores comunes a evitar](#9-errores-comunes-a-evitar)
10. [Leyenda de símbolos y glosario técnico](#10-leyenda-de-símbolos-y-glosario-técnico)

---

## 1. Principios generales para requisitos no funcionales

Los requisitos no funcionales son fundamentales para definir las condiciones y restricciones técnicas bajo las cuales debe operar el producto de software. A diferencia de los requisitos funcionales, no describen qué hace el  de información, sino cómo debe comportarse. Esta sección establece los principios esenciales que deben guiar la redacción de este tipo de requisitos, promoviendo claridad, verificabilidad y alineamiento con estándares de calidad.


- Describen atributos de calidad, restricciones técnicas o condiciones operativas del producto de software.
- Deben redactarse de forma clara, objetiva, medible y verificable.
- Utilizar el verbo modal **"deberá"** para expresar obligatoriedad.
- Incluir siempre un **sujeto o artefacto técnico definido**.
- No deben imponer decisiones de diseño visual o de implementación.
- Deben cumplir con criterios **SMART**: Específico, Medible, Alcanzable, Relevante, con Tiempo definido.

---

## 2. Estructura recomendada del requisito no funcional

Para asegurar consistencia y claridad en la documentación, se propone una estructura estándar que facilita la redacción y validación de los requisitos no funcionales. Esta sección presenta una fórmula sintáctica clara que permite expresar de manera efectiva cada requisito, asegurando que incluya un sujeto técnico bien definido, una restricción de calidad y, cuando corresponda, una métrica cuantificable.

**Formato propuesto :**

**[Sujeto o artefacto técnico definido] deberá cumplir con [restricción de calidad o condición técnica] [condición adicional o métrica opcional]**

### Ejemplos:
- El servicio de autenticación de usuarios del producto de software deberá estar disponible el 99.5% del tiempo durante el horario de atención (lunes a viernes de 8:00 a 18:00 horas).
- La interfaz web para consulta de cuentas de ahorro deberá cumplir con los criterios WCAG 2.1 nivel AA para asegurar la accesibilidad de usuarios con daltonismo.
- La interfaz web para consulta de cuentas de ahorro deberá ser compatible con lectores de pantalla certificados como JAWS y NVDA.

---

## 3. Clasificación de requisitos no funcionales

Los requisitos no funcionales pueden clasificarse en diversas categorías, lo cual permite organizarlos y priorizarlos en función de sus objetivos técnicos. Esta sección proporciona una taxonomía basada en la norma ISO/IEC/IEEE 29148:2018, agrupando los requisitos según atributos como rendimiento, seguridad, mantenibilidad y otros aspectos críticos para la arquitectura del producto de software.


| Categoría                 | Descripción                                                 | Ejemplo |
|--------------------------|-------------------------------------------------------------|---------|
| Rendimiento              | Tiempos de respuesta, concurrencia, uso de recursos         | El componente de login deberá procesar credenciales en menos de 2 segundos. |
| Fiabilidad               | Disponibilidad, tolerancia a fallos, capacidad de recuperación | El servicio de pagos deberá estar disponible el 99.9% del tiempo en horario hábil. |
| Seguridad                | Control de acceso, confidencialidad, trazabilidad           | El portal web del ciudadano deberá cifrar todas las comunicaciones con TLS 1.3. |
| Usabilidad               | Accesibilidad, facilidad de uso, personalización            | La interfaz web deberá seguir criterios WCAG 2.1 nivel AA. |
| Mantenibilidad           | Modularidad, facilidad de prueba y corrección               | El backend deberá seguir reglas de calidad definidas en SonarQube. |
| Portabilidad             | Compatibilidad entre plataformas, navegadores, dispositivos | El cliente web deberá funcionar correctamente en las tres versiones más recientes de Chrome, Firefox y Edge. |
| Restricciones tecnológicas | Plataformas, lenguajes, frameworks, motores de base de datos | El backend deberá desarrollarse en Java 17 y utilizar MySQL 8.4. |

---

## 4. Buenas prácticas en redacción

Una redacción adecuada es esencial para que los requisitos no funcionales sean comprendidos, implementados y validados correctamente. Esta sección presenta recomendaciones prácticas que ayudan a evitar ambigüedades, subjetividades o errores frecuentes, promoviendo el uso de lenguaje técnico preciso y estandarizado que facilite su interpretación y seguimiento.


- Usar métricas y condiciones observables.
- No utilizar términos subjetivos como "rápido" o "fácil".
- Especificar el sujeto o artefacto técnico afectado.
- Evitar ambigüedad y asegurar trazabilidad.

---

## 5. Ejemplos de requisitos no funcionales bien redactados

Para facilitar la comprensión de los principios y estructuras presentados, esta sección incluye ejemplos representativos de requisitos no funcionales correctamente redactados. Cada ejemplo está alineado con una categoría específica y destaca el uso apropiado de métricas, sujetos técnicos y condiciones verificables.


| Tipo de Requisito | Ejemplo |
|-------------------|---------|
| Rendimiento | El servicio web de consulta de clientes deberá responder en menos de 3 segundos con hasta 1000 usuarios concurrentes. |
| Seguridad | El componente de autenticación deberá bloquear cuentas con más de 5 intentos fallidos en un intervalo de 10 minutos. |
| Accesibilidad | La interfaz web de consulta de cuentas de ahorro deberá cumplir con los criterios WCAG 2.1 nivel AA para garantizar su uso por personas con daltonismo. |
| Mantenibilidad | El código fuente del portal web del ciudadano deberá ser evaluado semanalmente con SonarQube y no presentar errores críticos. |
| Disponibilidad | El módulo de generación de reportes de cuentas por pagar deberá estar disponible el 99.5% del tiempo durante el horario de oficina (lunes a viernes de 8:00 a 18:00). |

---

## 6. Atributos recomendados para el catálogo

Documentar los requisitos no funcionales en un catálogo estructurado permite gestionar mejor su trazabilidad, análisis de impacto y cumplimiento. Esta sección describe los atributos clave que debe contener cada entrada del catálogo, facilitando su gestión durante todo el ciclo de vida del producto de software.


| Atributo | Descripción | Ejemplo |
|----------|-------------|---------|
| ID | Código único del requisito | RNF-004 |
| Título | Nombre resumido del requisito | Tiempo de respuesta del login |
| Descripción | Redacción completa y precisa del requisito | El módulo de autenticación deberá validar cada intento en menos de 2 segundos. |
| Categoría | Tipo de requisito no funcional | Rendimiento |
| Prioridad | Nivel de importancia | Alta |
| Criterio de aceptación | Cómo verificar que se cumple | ≤ 2s bajo 100 usuarios concurrentes |
| Fuente | Stakeholder u origen | Área de TI |
| Rastreabilidad | Relación con otro requisito funcional | RF-010 |

---

## 7. Plantilla sugerida para el catálogo de requisitos no funcionales

Con base en los atributos definidos previamente, se presenta una plantilla que puede utilizarse como base para documentar de manera uniforme los requisitos no funcionales. Esta estructura sirve como referencia para equipos de ingeniería de software, arquitectura, aseguramiento de calidad y validación.


| ID | Título | Descripción | Categoría | Prioridad | Criterio de aceptación | Fuente | Rastreabilidad |
|----|--------|-------------|-----------|-----------|-------------------------|--------|----------------|
| RNF-001 | Tiempo de carga del login | El módulo de autenticación deberá validar credenciales en menos de 2 segundos. | Rendimiento | Alta | Validado si ≤ 2s bajo 100 usuarios | TI Seguridad | RF-002 |

---

## 8. Concepto SMART

El enfoque **SMART** es una técnica ampliamente utilizada en gestión de proyectos y análisis de requisitos para asegurar que cada especificación sea **clara, comprobable y relevante**. Aplicado a la redacción de requisitos no funcionales, este enfoque garantiza que cada requerimiento sea comprensible, evaluable y útil en la etapa de validación.

La palabra SMART es un acrónimo que representa cinco atributos esenciales:

| Letra | Significado | Aplicación práctica |
|-------|-------------|---------------------|
| S (Specific) | Específico | El requisito debe detallar el artefacto técnico, función y contexto. |
| M (Measurable) | Medible | Debe ser cuantificable (tiempo, porcentaje, número de eventos). |
| A (Achievable) | Alcanzable | Técnicamente factible dentro de las capacidades del equipo y entorno. |
| R (Relevant) | Relevante | Alineado con objetivos críticos del producto o usuario. |
| T (Time-bound) | Definido en el tiempo | Debe establecerse una frecuencia, duración o ventana de evaluación. |

---

## 9. Errores comunes a evitar

Identificar y evitar errores recurrentes en la redacción de requisitos no funcionales es clave para garantizar su eficacia. Esta sección detalla ejemplos típicos de malas prácticas, junto con sus respectivas correcciones, ayudando a mejorar la calidad de los documentos técnicos y a reducir los riesgos asociados a la ambigüedad o la falta de verificabilidad.


| Error | Ejemplo incorrecto | Corrección |
|-------|----------------------|------------|
| Vagueza | "El sistema será rápido" | "La API deberá responder en <2s con 100 usuarios" |
| Ambigüedad | "Fácil de usar" | "Completar flujo en ≤ 3 pasos sin error" |
| Omisión del sujeto | "Deberá cargar rápido" | "La pantalla de login deberá cargar en <3s" |
| Imprecisión técnica | "Será compatible" | "Compatible con Chrome, Firefox, Safari (2025)" |

---

## 10. Leyenda de símbolos y glosario técnico

La correcta interpretación de términos técnicos y simbología utilizada en los requisitos es esencial para todos los involucrados en el desarrollo. Esta sección proporciona definiciones clave y aclaraciones terminológicas que sirven como referencia común, reduciendo malentendidos y facilitando una comunicación precisa entre los actores del proyecto.


| Término / símbolo | Significado |
|-------------------|-------------|
| "deberá" | Obligatoriedad y verificabilidad |
| Artefacto técnico | Componente, módulo o interfaz con función específica |
| WCAG | Web Content Accessibility Guidelines |
| SMART | Específico, Medible, Alcanzable, Relevante, Tiempo definido |

---

Esta guía tiene como propósito asegurar la calidad, consistencia y claridad en la redacción de requisitos no funcionales para soluciones tecnológicas profesionales.
