const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, ShadingType, BorderStyle, TableLayoutType, HeightRule,
  AlignmentType, Header, ImageRun,
  HorizontalPositionRelativeFrom, VerticalPositionRelativeFrom, TextWrappingType,
} = require("docx");

const TABLE_WIDTH = 10777;
const FONT = "Inter";

const azul = { style: BorderStyle.SINGLE, size: 8, color: "3A83F7" };
const nil  = { style: BorderStyle.NIL, size: 0, color: "000000" };
const negro = { style: BorderStyle.SINGLE, size: 8, color: "000000" };

const logo = fs.readFileSync("codeable-logo.png");

// Título principal 20pt bold
function titulo(text) {
  return new Paragraph({
    spacing: { before: 0, after: 0, line: 276, lineRule: "auto" },
    children: [new TextRun({ text, font: FONT, size: 40, bold: true })],
  });
}

// Subtítulo 14pt bold
function subtitulo(text) {
  return new Paragraph({
    spacing: { before: 200, after: 0, line: 276, lineRule: "auto" },
    children: [new TextRun({ text, font: FONT, size: 28, bold: true })],
  });
}

// Línea de versión 10pt
function meta(text) {
  return new Paragraph({
    spacing: { before: 200, after: 0, line: 276, lineRule: "auto" },
    children: [new TextRun({ text, font: FONT, size: 20 })],
  });
}

function vacio() {
  return new Paragraph({ children: [new TextRun({ text: "", font: FONT, size: 20 })] });
}

// Banda negra de módulo / sección mayor
function moduloHeader(text) {
  return new Table({
    width: { size: TABLE_WIDTH, type: WidthType.DXA },
    columnWidths: [TABLE_WIDTH],
    layout: TableLayoutType.FIXED,
    borders: { top: negro, bottom: negro, left: negro, right: negro, insideH: negro, insideV: negro },
    rows: [new TableRow({ children: [new TableCell({
      width: { size: TABLE_WIDTH, type: WidthType.DXA },
      shading: { fill: "000000", type: ShadingType.CLEAR },
      margins: { top: 100, bottom: 100, left: 150, right: 100 },
      verticalAlign: "top",
      children: [new Paragraph({
        spacing: { line: 240, lineRule: "auto" },
        children: [new TextRun({ text, font: FONT, size: 20, bold: true, color: "FFFFFF" })],
      })],
    })] })],
  });
}

// Banda azul clara de subsección
function subseccionHeader(text) {
  return new Table({
    width: { size: TABLE_WIDTH, type: WidthType.DXA },
    columnWidths: [TABLE_WIDTH],
    layout: TableLayoutType.FIXED,
    borders: { top: nil, bottom: nil, left: nil, right: nil, insideH: nil, insideV: nil },
    rows: [new TableRow({
      height: { value: 400, rule: HeightRule.AT_LEAST },
      children: [new TableCell({
        width: { size: TABLE_WIDTH, type: WidthType.DXA },
        borders: { top: azul, bottom: azul, left: nil, right: nil },
        shading: { fill: "F5F9FF", type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 150, right: 100 },
        verticalAlign: "top",
        children: [new Paragraph({
          children: [new TextRun({ text, font: FONT, size: 20, bold: true })],
        })],
      })],
    })],
  });
}

// Requisito: "ID Título:" en bold + descripción normal, justificado
function req(id, tit, desc) {
  return new Paragraph({
    spacing: { before: 200, after: 0, line: 276, lineRule: "auto" },
    alignment: AlignmentType.BOTH,
    children: [
      new TextRun({ text: `${id} ${tit}:`, font: FONT, size: 20, bold: true }),
      new TextRun({ text: ` ${desc}`, font: FONT, size: 20 }),
    ],
  });
}

// Párrafo de nota con etiqueta bold (para resumen de alcance)
function nota(label, texto) {
  return new Paragraph({
    spacing: { before: 200, after: 0, line: 276, lineRule: "auto" },
    alignment: AlignmentType.BOTH,
    children: [
      new TextRun({ text: `${label}:`, font: FONT, size: 20, bold: true }),
      new TextRun({ text: ` ${texto}`, font: FONT, size: 20 }),
    ],
  });
}

// ---------------- CONTENIDO ----------------

const children = [
  titulo("REQUERIMIENTOS FUNCIONALES Y NO FUNCIONALES"),
  subtitulo("TODO LIST — APLICACIÓN WEB DE GESTIÓN DE TAREAS PERSONALES"),
  meta("Versión 1.0 — Julio 2026 | Catálogo inicial derivado de las sesiones de discovery"),
  vacio(),

  moduloHeader("ALCANCE DEL CATÁLOGO"),
  vacio(),
  nota("Alcance funcional",
    "El producto contempla la gestión de tareas personales de un único usuario por cuenta: registro y autenticación, creación y seguimiento de tareas, organización mediante listas y recordatorios por correo electrónico. No se contempla colaboración entre usuarios ni asignación de tareas a terceros en esta versión."),
  nota("Convención de identificadores",
    "Los requisitos funcionales se agrupan por módulo con el formato RF-<MÓDULO>-<NNN> y los no funcionales por categoría de calidad con el formato RNF-<CATEGORÍA>-<NNN>, conforme a la norma ISO/IEC/IEEE 29148:2018."),
  nota("Redacción",
    "Todos los requisitos emplean el verbo modal \"deberá\" para expresar obligatoriedad, tienen un artefacto técnico definido como sujeto y están redactados de forma verificable. Los requisitos no funcionales incluyen métricas cuantificables conforme al criterio SMART."),
  vacio(),

  moduloHeader("MÓDULO 0: AUTENTICACIÓN"),
  vacio(),
  subseccionHeader("Acceso y Sesión"),
  req("RF-AUTH-001", "Registro de cuenta de usuario",
    "El módulo de autenticación deberá permitir registrar una nueva cuenta de usuario, validando que el correo electrónico no se encuentre previamente registrado y que la contraseña cumpla la política mínima de 8 caracteres con al menos una letra y un número. Al completar el registro, el sistema deberá enviar un correo de confirmación a la dirección declarada."),
  req("RF-AUTH-002", "Validación de credenciales",
    "El módulo de autenticación deberá validar las credenciales de acceso del usuario, permitiendo el ingreso únicamente cuando el correo electrónico y la contraseña coincidan con un registro activo. La sesión del usuario deberá expirar tras 30 minutos de inactividad."),
  req("RF-AUTH-003", "Restricción y registro de accesos fallidos",
    "El módulo de autenticación deberá restringir el acceso a usuarios con credenciales inválidas y registrar cada intento fallido incluyendo la dirección IP, la fecha y la hora del evento en el log del sistema."),
  req("RF-AUTH-004", "Recuperación y restablecimiento de contraseña",
    "El módulo de autenticación deberá permitir el restablecimiento de contraseña mediante el envío de un enlace de un solo uso al correo registrado, con vigencia de 30 minutos. El sistema no deberá revelar si un correo existe en la base de datos, devolviendo una respuesta genérica para evitar la enumeración de usuarios."),
  req("RF-AUTH-005", "Cierre de sesión explícito",
    "El módulo de autenticación deberá permitir al usuario cerrar sesión desde cualquier pantalla del sistema, invalidando el token de acceso vigente en el servidor e impidiendo su reutilización."),
  vacio(),

  moduloHeader("MÓDULO 1: GESTIÓN DE TAREAS"),
  vacio(),
  subseccionHeader("Registro y Edición"),
  req("RF-TAREA-001", "Registro de tarea",
    "El sistema web deberá permitir registrar una nueva tarea, validando que el campo título esté completo y no exceda los 140 caracteres. La tarea deberá admitir de forma opcional una descripción, una fecha de vencimiento, una prioridad y una lista asociada."),
  req("RF-TAREA-002", "Modificación de tarea",
    "El sistema web deberá permitir modificar los datos de una tarea existente, restringiendo la operación a las tareas pertenecientes al usuario autenticado."),
  req("RF-TAREA-003", "Marcado de tarea como completada",
    "El sistema web deberá permitir marcar una tarea como completada y revertir dicho estado, registrando en ambos casos la fecha y hora en que se realizó el cambio."),
  req("RF-TAREA-004", "Eliminación lógica de tarea",
    "El sistema web deberá eliminar de forma lógica la tarea seleccionada, conservando el registro durante 30 días antes de su depuración definitiva, de modo que la operación pueda revertirse dentro de ese plazo."),
  vacio(),
  subseccionHeader("Consulta y Organización"),
  req("RF-TAREA-005", "Listado de tareas pendientes",
    "El sistema web deberá mostrar las tareas pendientes del usuario autenticado, ordenadas de forma ascendente por fecha de vencimiento, incluyendo: título, lista asociada, fecha de vencimiento y prioridad."),
  req("RF-TAREA-006", "Filtrado de tareas",
    "El sistema web deberá permitir filtrar las tareas por estado, lista y rango de fechas de vencimiento, aplicando los filtros de forma acumulativa sobre el listado vigente."),
  req("RF-TAREA-007", "Búsqueda de tareas por texto",
    "El sistema web deberá permitir buscar tareas del usuario autenticado por coincidencia parcial en el título o la descripción, devolviendo los resultados ordenados por fecha de vencimiento ascendente."),
  vacio(),
  subseccionHeader("Exposición de Servicios"),
  req("RF-TAREA-008", "Exposición de tareas vía API",
    "El servicio web REST deberá devolver las tareas del usuario autenticado en formato JSON, paginadas en bloques de 50 registros e incluyendo los metadatos de paginación correspondientes."),
  vacio(),

  moduloHeader("MÓDULO 2: LISTAS Y ORGANIZACIÓN"),
  vacio(),
  subseccionHeader("Gestión de Listas"),
  req("RF-LISTA-001", "Registro de lista",
    "El sistema web deberá permitir registrar una nueva lista de tareas, validando que el nombre no se repita dentro de las listas del mismo usuario."),
  req("RF-LISTA-002", "Asignación de tarea a lista",
    "El sistema web deberá permitir asignar una tarea a una lista existente del usuario autenticado, así como retirarla de la lista sin eliminar la tarea."),
  req("RF-LISTA-003", "Conteo de tareas por lista",
    "El sistema web deberá mostrar el conteo de tareas pendientes y completadas por cada lista del usuario autenticado, actualizado en tiempo real ante cambios de estado."),
  req("RF-LISTA-004", "Restricción de eliminación de lista",
    "El sistema web deberá impedir la eliminación de una lista que contenga tareas pendientes asociadas, informando al usuario el número de tareas que impiden la operación."),
  vacio(),

  moduloHeader("MÓDULO 3: NOTIFICACIONES"),
  vacio(),
  subseccionHeader("Recordatorios"),
  req("RF-NOTIF-001", "Recordatorio diario por correo",
    "El componente de notificaciones deberá enviar diariamente un correo de recordatorio al usuario con las tareas cuyo vencimiento sea igual o menor a la fecha actual, agrupadas por lista."),
  req("RF-NOTIF-002", "Configuración de recordatorios",
    "El componente de notificaciones deberá permitir al usuario activar o desactivar el envío de recordatorios por correo y definir la hora de envío, desde su configuración de cuenta."),
  req("RF-NOTIF-003", "Registro de envíos",
    "El componente de notificaciones deberá registrar cada envío realizado incluyendo destinatario, fecha, hora y estado de entrega, para efectos de trazabilidad y diagnóstico."),
  vacio(),

  moduloHeader("REQUERIMIENTOS NO FUNCIONALES"),
  vacio(),
  subseccionHeader("Eficiencia de Desempeño"),
  req("RNF-REND-001", "Tiempo de respuesta de consulta de tareas",
    "El servicio web REST de consulta de tareas deberá responder en menos de 1.5 segundos en el percentil 95, con hasta 300 usuarios concurrentes."),
  req("RNF-REND-002", "Tiempo de validación de acceso",
    "El módulo de autenticación deberá validar cada intento de acceso en menos de 2 segundos en el percentil 95, bajo una carga de 100 usuarios concurrentes."),
  vacio(),
  subseccionHeader("Confiabilidad y Continuidad"),
  req("RNF-FIAB-001", "Disponibilidad del sistema",
    "El sistema web deberá estar disponible el 99.5% del tiempo durante el horario de atención definido (lunes a domingo de 6:00 a 23:00 horas), medido mensualmente y excluyendo ventanas de mantenimiento programado."),
  req("RNF-FIAB-002", "Respaldo de datos",
    "La base de datos deberá contar con respaldo automático diario, con un objetivo de punto de recuperación (RPO) no mayor a 24 horas, verificable mediante una prueba de restauración trimestral."),
  vacio(),
  subseccionHeader("Seguridad"),
  req("RNF-SEG-001", "Cifrado de datos en tránsito",
    "El sistema web deberá cifrar todas las comunicaciones entre el cliente y el servidor mediante TLS 1.3, rechazando el establecimiento de conexiones con protocolos anteriores."),
  req("RNF-SEG-002", "Almacenamiento de contraseñas",
    "El módulo de autenticación deberá almacenar las contraseñas cifradas con el algoritmo bcrypt con un factor de costo mínimo de 12, sin conservar en ningún caso la contraseña en texto plano."),
  req("RNF-SEG-003", "Bloqueo por intentos fallidos",
    "El módulo de autenticación deberá bloquear la cuenta durante 15 minutos tras 5 intentos fallidos consecutivos registrados dentro de un intervalo de 10 minutos."),
  req("RNF-SEG-004", "Aislamiento de datos por usuario",
    "El servicio web REST deberá garantizar que cada usuario acceda únicamente a sus propias tareas y listas, denegando toda solicitud sobre recursos pertenecientes a otra cuenta."),
  vacio(),
  subseccionHeader("Usabilidad y Accesibilidad"),
  req("RNF-USB-001", "Accesibilidad de la interfaz",
    "La interfaz web deberá cumplir con los criterios WCAG 2.1 nivel AA, garantizando entre otros aspectos su uso por personas con daltonismo y su compatibilidad con lectores de pantalla."),
  req("RNF-USB-002", "Eficiencia de registro de tarea",
    "La interfaz web deberá permitir completar el registro de una tarea en un máximo de 3 interacciones desde la pantalla principal, sin errores de validación en un flujo estándar."),
  req("RNF-USB-003", "Interfaz en español",
    "La interfaz web deberá estar completamente en idioma español, incluyendo mensajes de validación, notificaciones por correo y textos de ayuda."),
  vacio(),
  subseccionHeader("Mantenibilidad y Compatibilidad"),
  req("RNF-MNT-001", "Calidad del código fuente",
    "El código fuente del sistema web deberá ser evaluado semanalmente con SonarQube y no deberá presentar issues de severidad crítica abiertos."),
  req("RNF-MNT-002", "Cobertura de pruebas unitarias",
    "El código fuente del servicio web REST deberá mantener una cobertura de pruebas unitarias igual o superior al 70%, verificada en el pipeline de integración continua."),
  req("RNF-PRT-001", "Compatibilidad con navegadores",
    "El cliente web deberá funcionar correctamente en las tres versiones más recientes de Chrome, Firefox, Edge y Safari, sin defectos funcionales en las pruebas de regresión."),
  req("RNF-PRT-002", "Diseño responsivo",
    "La interfaz web deberá ser responsiva y operar correctamente en resoluciones desde 360px hasta 1920px de ancho, sin requerir desplazamiento horizontal para acceder a las funciones principales."),
  vacio(),
  subseccionHeader("Restricciones Tecnológicas"),
  req("RNF-TEC-001", "Stack tecnológico del backend",
    "El servicio web REST deberá desarrollarse en Node.js 22 LTS y utilizar PostgreSQL 16 como motor de base de datos."),
  req("RNF-TEC-002", "Retención de registros de auditoría",
    "El sistema web deberá conservar los registros de auditoría de accesos y cambios de estado de tareas durante un período mínimo de 12 meses."),
];

const header = new Header({ children: [new Paragraph({ children: [
  new ImageRun({
    data: logo, type: "png",
    transformation: { width: 193, height: 16 },
    floating: {
      horizontalPosition: { relative: HorizontalPositionRelativeFrom.COLUMN, offset: 1 },
      verticalPosition: { relative: VerticalPositionRelativeFrom.PARAGRAPH, offset: -200021 },
      behindDocument: true, allowOverlap: true, wrap: { type: TextWrappingType.NONE },
    },
  }),
] })] });

const doc = new Document({
  sections: [{
    properties: {
      page: {
        size: { width: 11909, height: 16834 },
        margin: { top: 850, bottom: 567, left: 567, right: 567, header: 720, footer: 720 },
      },
    },
    headers: { default: header },
    children,
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync("Requerimientos_TodoList.docx", buf);
  console.log("OK", buf.length, "bytes");
});
