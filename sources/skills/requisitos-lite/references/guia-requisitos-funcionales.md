
# Guía de Estilo para la Redacción de Requisitos Funcionales  

- **Basado en:** ISO/IEC/IEEE 29148:2018 sección 5.2.4
- **Autor:** Eder Ramiro Quispe Vilchez - eder.quispe@pucp.edu.pe
- **Aplicación recomendada para:** documentos de especificación de requisitos funcionales (SyRS o SRS), historias de usuario técnicas, criterios de aceptación, validación y verificación.

---

## Índice

1. [Principios Generales](#1-principios-generales)  
2. [Estructura Recomendada del Requisito Funcional](#2-estructura-recomendada-del-requisito-funcional)  
3. [Términos Recomendados como Sujeto del Requisito](#3-términos-recomendados-como-sujeto-del-requisito)  
4. [Verbos Sugeridos por Categoría Funcional](#4-verbos-sugeridos-por-categoría-funcional)  
5. [Ejemplos de Requisitos Funcionales Bien Redactados](#5-ejemplos-de-requisitos-funcionales-bien-redactados)  
6. [Errores Comunes a Evitar](#6-errores-comunes-a-evitar)  
7. [Complemento Opcional: Formato Gherkin para Validación](#7-complemento-opcional-formato-gherkin-para-validación)  
8. [Atributos del Catálogo de Requisitos Funcionales](#8-atributos-del-catálogo-de-requisitos-funcionales)

---

## 1. Principios Generales

Todo requisito funcional debe describir una acción específica, observable y verificable que el producto de software o componente debe realizar.

- El sujeto del requisito debe ser un artefacto técnico claramente definido, **no el usuario final**.
- Los requisitos deben estar redactados en voz activa y utilizar el verbo modal **“deberá”** para expresar obligatoriedad.
- Evitar ambigüedades, descripciones vagas o verbos en forma pasiva.
- Usar siempre terminología consistente y definida previamente en un glosario técnico.
- Todo requisito funcional debe ser **claro, comprensible, verificable y trazable**, en concordancia con ISO/IEC/IEEE 29148:2018.

---


## 2. Estructura Recomendada del Requisito Funcional


Según la norma ISO/IEC/IEEE 29148:2018, la estructura básica recomendada para formular un requisito funcional es:

> **[Subject] [Action] [Constraint of Action]**

- **Subject (Sujeto):** Artefacto técnico que será responsable de ejecutar la acción.  
  Ejemplo: *El sistema de facturación*, *La aplicación móvil*, *El componente de verificación biométrica*.  
- **Action (Acción):** Verbo activo en infinitivo que describe lo que debe hacer el sujeto.  
  Ejemplo: *deberá mostrar*, *deberá registrar*, *deberá rechazar*.  
- **Constraint of Action (Restricción de la Acción):** Las restricciones de acción pueden incluir condiciones funcionales relacionadas con la organización lógica de la información (por ejemplo: estructura jerárquica, agrupamiento por tipo de dato, flujos secuenciales), pero no deben incluir decisiones de diseño visual o estructura de interfaz gráfica.
Evitar imponer elementos como colores, ubicación visual, distribución de botones, uso de pestañas, menús o componentes visuales específicos. Estas decisiones corresponden a la fase de diseño, no a la especificación de requisitos.  
  Ejemplo: *en orden ascendente por fecha*, *solo si el usuario está autenticado*, *según los parámetros del perfil*.

### 🧾 Ejemplos estructurados

Los siguientes ejemplos están redactados siguiendo la estructura definida por la norma ISO/IEC/IEEE 29148:2018 sección 5.2.4:

### 1. Sistema de Facturación

> [Sujeto] El Sistema de Facturación  
> [Acción] deberá mostrar las facturas pendientes de pago de los clientes  
> [Restricción de la Acción] ordenadas de forma ascendente por fecha de vencimiento, incluyendo: tipo y número de documento de identidad del cliente, número de factura, mes de facturación, fecha de vencimiento y monto total de la factura.

### 2. Sistema Web de Registro Académico

> [Sujeto] El sistema web de registro académico  
> [Acción] deberá generar un reporte consolidado de matrículas por ciclo académico  
> [Restricción de la Acción] agrupando a los estudiantes por facultad, modalidad de estudio y programa académico.

### 3. Aplicación Móvil de Reservas

> [Sujeto] La aplicación móvil  
> [Acción] deberá permitir registrar una nueva reserva seleccionando la fecha, hora y servicio deseado  
> [Restricción de la Acción] validando que no exista traslape con otras reservas activas del mismo usuario.

### 4. Servicio Web REST para Consultas de Clientes

> [Sujeto] El servicio web REST  
> [Acción] deberá devolver los datos personales y el historial de operaciones de un cliente  
> [Restricción de la Acción] cuando reciba una solicitud autenticada con el número de documento de identidad como parámetro de entrada.

### 5. Componente RPA de Facturación

> [Sujeto] El componente RPA de facturación  
> [Acción] deberá ejecutar diariamente la consulta de facturas emitidas pendientes de pago  
> [Restricción de la Acción] y registrar en el sistema contable aquellas cuyo vencimiento sea igual o menor a la fecha actual.


### 6. Módulo de Gestión Documental

> [Sujeto] El módulo de gestión documental  
> [Acción] deberá almacenar cada nuevo archivo con su metadato correspondiente  
> [Restricción de la Acción] incluyendo: nombre del documento, fecha de carga, autor, tipo de documento y área responsable.


### 7. Componente de Autenticación

> [Sujeto] El componente de autenticación  
> [Acción] deberá restringir el acceso a usuarios con credenciales inválidas  
> [Restricción de la Acción] y registrar en el log del sistema cada intento fallido incluyendo la dirección IP, fecha y hora del evento.




## 3. Términos Recomendados como Sujeto del Requisito

| Contexto del producto   | Término a utilizar                        |
|-------------------------|-------------------------------------------|
| Solución global         | Producto de software                      |
| Frontend web            | Sistema web                               |
| Frontend móvil          | Aplicación móvil                          |
| Subfunción de validación| Componente de verificación de imágenes    |
| Backend / API           | Servicio web REST                         |
| Seguridad               | Módulo de autenticación                   |
| Automatización          | Componente RPA                            |

**Consejo**: No usar únicamente “el sistema”. Prefiere la denominación específica del artefacto cuando sea relevante para la trazabilidad, asignación de responsabilidades o pruebas.

---

## 4. Verbos Sugeridos por Categoría Funcional

| Categoría        | Verbos activos sugeridos                       |
|------------------|------------------------------------------------|
| Entrada de datos | permitir registrar, validar, cargar            |
| Procesamiento    | calcular, generar, transformar                 |
| Visualización    | mostrar, presentar, notificar                  |
| Seguridad        | autenticar, autorizar, restringir              |
| Integración      | enviar, consumir, exponer                      |
| Automatización   | ejecutar, programar, replicar acciones         |

---

## 5. Ejemplos de Requisitos Funcionales Bien Redactados

| Tipo de artefacto            | Ejemplo de requisito                                                                 |
|------------------------------|----------------------------------------------------------------------------------------|
| Producto de software         | El Producto de software deberá permitir registrar solicitudes mediante el formulario denominado “Registro de Solicitudes”, validando que los campos obligatorios como tipo de solicitud, descripción y archivo adjunto estén correctamente completados antes de permitir su envío.   |
| Sistema web                  | El sistema web deberá exportar los reportes de solicitudes en formato PDF.           |
| Aplicación móvil             | La aplicación móvil deberá enviar notificaciones push al usuario al actualizar estado.|
| Componente de verificación   | El componente de verificación de imágenes deberá rechazar fotos con gafas oscuras.   |
| Servicio web REST            | El servicio web REST deberá devolver los datos del cliente en formato JSON.          |

---

## 6. Errores Comunes a Evitar

| Error                  | Ejemplo incorrecto                         | Corrección sugerida                                                                 |
|------------------------|--------------------------------------------|--------------------------------------------------------------------------------------|
| Sujeto mal definido    | El usuario deberá ingresar...              | El producto de software deberá permitir al usuario ingresar...                      |
| Verbo pasivo           | Será posible registrar...                  | El producto de software deberá permitir registrar...                                |
| Ambigüedad             | El sistema deberá ser fácil de usar.       | La interfaz del sistema web deberá permitir realizar la operación en máximo 3 clics.|
| Requisitos múltiples   | El sistema deberá registrar y generar...   | Separar en dos requisitos independientes.                                           |

---

## 7. Complemento Opcional: Formato Gherkin para Validación

Formato útil para representar escenarios funcionales en ambientes ágiles o validaciones colaborativas.

### Ejemplo:

```gherkin
Funcionalidad: Registro de solicitudes

  Escenario: Usuario registra una nueva solicitud
    Dado que el usuario ha iniciado sesión correctamente
    Cuando completa todos los campos del formulario
    Y presiona el botón "Registrar"
    Entonces el producto de software deberá registrar la solicitud
    Y deberá mostrar el mensaje "Solicitud registrada exitosamente"
```

---

## 8. Atributos del Catálogo de Requisitos Funcionales

Esta sección presenta los atributos recomendados para documentar y gestionar de forma estructurada los requisitos funcionales, conforme a la norma ISO/IEC/IEEE 29148:2018.

| **Atributo**         | **Descripción**                                                                 | **Ejemplo / Consideración**                                                                 |
|----------------------|----------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| **ID**               | Identificador único del requisito.                                              | `RF-012`                                                                                     |
| **Nombre o Título**  | Título breve que resuma la intención del requisito.                             | `Registro de Solicitudes`                                                                   |
| **Descripción**      | Redacción detallada del requisito, en formato estructurado.                     | `El producto de software deberá permitir registrar solicitudes mediante el formulario denominado “Registro de Solicitudes”, validando que los campos obligatorios —tipo de solicitud, descripción y archivo adjunto— estén correctamente completados antes de permitir su envío.`      |
| **Categoría**        | Clasificación según tipo funcional (registro, procesamiento, visualización).    | `Procesamiento de datos`                                                                    |
| **Prioridad**        | Nivel de importancia o urgencia para su implementación.                         | `Alta`, `Media`, `Baja`                                                                     |
| **Estado**           | Situación del requisito en el ciclo de vida.                                    | `Propuesto`, `Validado`, `Implementado`, `Rechazado`                                        |
| **Fuente**           | Persona, rol o documento de donde proviene el requisito.                        | `Product Owner`, `Acta de reunión`, `Reglamento legal`                                      |
| **Racional**         | Justificación del por qué se requiere la funcionalidad.                         | `Permite asegurar la trazabilidad del expediente en el flujo digital.`                      |
| **Dependencias**     | Requisitos u otros componentes necesarios para su cumplimiento.                 | `Depende del RF-008: Registro de usuario autenticado`                                       |
| **Restricciones**    | Condiciones técnicas o normativas aplicables al requisito.                      | `Solo accesible desde intranet institucional.`                                              |
| **Criterio de Aceptación** | Condición que debe cumplirse para considerar el requisito como satisfecho. | `La solicitud debe ser registrada y notificada correctamente al usuario final.`             |
| **Método de Verificación** | Mecanismo por el cual se comprueba su cumplimiento.                  | `Caso de prueba`, `Demostración funcional`, `Revisión por experto`                         |
| **Versión**          | Versión del requisito para control de cambios.                                  | `v1.0`, `v1.1`                                                                               |
| **Observaciones**    | Comentarios adicionales relevantes.                                              | `Pendiente validación por área legal.`                                                      |

---

