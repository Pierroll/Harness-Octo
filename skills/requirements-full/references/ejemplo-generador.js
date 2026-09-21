// Generador de referencia — formato FULL (requisitos-full)
// Copia este script, reemplaza el contenido de `children` y ejecuta con: node gen.js
//
// Provee DOS plantillas de requisito:
//   reqHistoria(...)  → ficha completa estilo historia de usuario (RF)
//   reqTabla(...)     → tabla de 8 filas estilo SRS (RF)
//   rnfTabla(...)     → tabla de 4 filas para requisitos no funcionales
// Elige UNA de las dos para los RF y mantenla en todo el documento.

const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, ShadingType, BorderStyle, TableLayoutType, HeightRule,
  AlignmentType, Header, ImageRun,
  HorizontalPositionRelativeFrom, VerticalPositionRelativeFrom, TextWrappingType,
} = require("docx");

const W = 10777;          // ancho total de tabla
const LABEL_W = 2500;     // columna de etiqueta en tablas de requisito
const VALUE_W = 8277;     // columna de valor (LABEL_W + VALUE_W = W)
const FONT = "Inter";

const azul  = { style: BorderStyle.SINGLE, size: 8, color: "3A83F7" };
const nil   = { style: BorderStyle.NIL,    size: 0, color: "000000" };
const negro = { style: BorderStyle.SINGLE, size: 8, color: "000000" };
const gris  = { style: BorderStyle.SINGLE, size: 4, color: "D9D9D9" };

const logo = fs.readFileSync("codeable-logo.png");

/* ---------- Bloques de texto ---------- */

const titulo    = (t) => new Paragraph({ spacing: { before: 0, after: 0, line: 276, lineRule: "auto" },
  children: [new TextRun({ text: t, font: FONT, size: 34, bold: true })] });

const subtitulo = (t) => new Paragraph({ spacing: { before: 200, after: 0, line: 276, lineRule: "auto" },
  children: [new TextRun({ text: t, font: FONT, size: 24, bold: true })] });

const meta      = (t) => new Paragraph({ spacing: { before: 200, after: 0, line: 276, lineRule: "auto" },
  children: [new TextRun({ text: t, font: FONT, size: 20 })] });

const vacio     = ()  => new Paragraph({ children: [new TextRun({ text: "", font: FONT, size: 20 })] });

const parrafo   = (t) => new Paragraph({ spacing: { before: 200, after: 0, line: 276, lineRule: "auto" },
  alignment: AlignmentType.BOTH,
  children: [new TextRun({ text: t, font: FONT, size: 20 })] });

// Párrafo con etiqueta en negrita: "Etiqueta: texto"
const nota = (label, texto) => new Paragraph({
  spacing: { before: 200, after: 0, line: 276, lineRule: "auto" },
  alignment: AlignmentType.BOTH,
  children: [
    new TextRun({ text: `${label}:`, font: FONT, size: 20, bold: true }),
    new TextRun({ text: ` ${texto}`, font: FONT, size: 20 }),
  ],
});

/* ---------- Bandas de encabezado ---------- */

// Banda negra: sección mayor ("3. REQUISITOS FUNCIONALES DETALLADOS")
function seccionHeader(text) {
  return new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: [W],
    layout: TableLayoutType.FIXED,
    borders: { top: negro, bottom: negro, left: negro, right: negro, insideH: negro, insideV: negro },
    rows: [new TableRow({ children: [new TableCell({
      width: { size: W, type: WidthType.DXA },
      shading: { fill: "000000", type: ShadingType.CLEAR },
      margins: { top: 100, bottom: 100, left: 150, right: 100 },
      verticalAlign: "top",
      children: [new Paragraph({ spacing: { line: 240, lineRule: "auto" },
        children: [new TextRun({ text, font: FONT, size: 20, bold: true, color: "FFFFFF" })] })],
    })] })],
  });
}

// Banda azul clara: subsección o módulo ("MÓDULO 1 — HOMOLOGACIÓN")
function subseccionHeader(text) {
  return new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: [W],
    layout: TableLayoutType.FIXED,
    borders: { top: nil, bottom: nil, left: nil, right: nil, insideH: nil, insideV: nil },
    rows: [new TableRow({
      height: { value: 400, rule: HeightRule.AT_LEAST },
      children: [new TableCell({
        width: { size: W, type: WidthType.DXA },
        borders: { top: azul, bottom: azul, left: nil, right: nil },
        shading: { fill: "F5F9FF", type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 150, right: 100 },
        verticalAlign: "top",
        children: [new Paragraph({ children: [new TextRun({ text, font: FONT, size: 20, bold: true })] })],
      })],
    })],
  });
}

/* ---------- Celdas auxiliares ---------- */

const cellTxt = (t, o = {}) => new Paragraph({
  spacing: { before: 0, after: 0, line: 276, lineRule: "auto" },
  alignment: o.justify ? AlignmentType.BOTH : AlignmentType.LEFT,
  children: [new TextRun({ text: t, font: FONT, size: o.size || 18, bold: !!o.bold })],
});

// Fila etiqueta | valor. `valor` puede ser string o array de strings (multi-párrafo).
function filaLV(label, valor, opts = {}) {
  const vals = Array.isArray(valor) ? valor : [valor];
  return new TableRow({
    children: [
      new TableCell({
        width: { size: LABEL_W, type: WidthType.DXA },
        shading: { fill: "F5F9FF", type: ShadingType.CLEAR },
        borders: { top: gris, bottom: gris, left: nil, right: gris },
        margins: { top: 80, bottom: 80, left: 150, right: 100 },
        verticalAlign: "top",
        children: [cellTxt(label, { bold: true })],
      }),
      new TableCell({
        width: { size: VALUE_W, type: WidthType.DXA },
        borders: { top: gris, bottom: gris, left: gris, right: nil },
        margins: { top: 80, bottom: 80, left: 150, right: 100 },
        verticalAlign: "top",
        children: vals.map((v) => cellTxt(v, { justify: opts.justify })),
      }),
    ],
  });
}

// Fila de título del requisito: banda negra que abarca las dos columnas
function filaTitulo(id, tit) {
  return new TableRow({
    height: { value: 420, rule: HeightRule.AT_LEAST },
    children: [new TableCell({
      columnSpan: 2,
      width: { size: W, type: WidthType.DXA },
      shading: { fill: "000000", type: ShadingType.CLEAR },
      borders: { top: negro, bottom: negro, left: negro, right: negro },
      margins: { top: 90, bottom: 90, left: 150, right: 100 },
      verticalAlign: "top",
      children: [new Paragraph({ spacing: { line: 240, lineRule: "auto" }, children: [
        new TextRun({ text: `${id}  `, font: FONT, size: 20, bold: true, color: "FFFFFF" }),
        new TextRun({ text: tit,       font: FONT, size: 20, bold: true, color: "FFFFFF" }),
      ] })],
    })],
  });
}

const wrapTabla = (rows) => new Table({
  width: { size: W, type: WidthType.DXA },
  columnWidths: [LABEL_W, VALUE_W],
  layout: TableLayoutType.FIXED,
  borders: { top: nil, bottom: nil, left: nil, right: nil, insideH: nil, insideV: nil },
  rows,
});

/* ---------- PLANTILLA A: ficha estilo historia de usuario ---------- */
/*
  reqHistoria({
    id, titulo, historia, rol, dependencias, interfaz,
    contextoTecnico,           // opcional
    flujo: [ "1. ...", "2. ..." ],   // opcional
    criterios: [ {dado, cuando, entonces}, ... ],
    pendiente,                 // opcional
    nota,                      // opcional
  })
*/
function reqHistoria(r) {
  const rows = [filaTitulo(r.id, r.titulo)];
  rows.push(filaLV("Historia", r.historia, { justify: true }));
  if (r.rol)          rows.push(filaLV("Rol principal", r.rol));
  if (r.dependencias) rows.push(filaLV("Dependencias", r.dependencias, { justify: true }));
  if (r.interfaz)     rows.push(filaLV("Interfaz", r.interfaz));
  if (r.contextoTecnico) rows.push(filaLV("Contexto técnico", r.contextoTecnico, { justify: true }));
  if (r.flujo && r.flujo.length) rows.push(filaLV("Flujo de interacción", r.flujo, { justify: true }));

  // Criterios en formato Dado/Cuando/Entonces, cada uno con las palabras clave en negrita
  const critParas = [];
  (r.criterios || []).forEach((c, idx) => {
    if (idx > 0) critParas.push(new Paragraph({ children: [new TextRun({ text: "", font: FONT, size: 10 })] }));
    critParas.push(new Paragraph({
      spacing: { before: 0, after: 0, line: 276, lineRule: "auto" },
      alignment: AlignmentType.BOTH,
      children: [
        new TextRun({ text: "Dado que ", font: FONT, size: 18, bold: true }),
        new TextRun({ text: c.dado + ",", font: FONT, size: 18 }),
      ],
    }));
    critParas.push(new Paragraph({
      spacing: { before: 0, after: 0, line: 276, lineRule: "auto" },
      alignment: AlignmentType.BOTH,
      children: [
        new TextRun({ text: "cuando ", font: FONT, size: 18, bold: true }),
        new TextRun({ text: c.cuando + ",", font: FONT, size: 18 }),
      ],
    }));
    critParas.push(new Paragraph({
      spacing: { before: 0, after: 0, line: 276, lineRule: "auto" },
      alignment: AlignmentType.BOTH,
      children: [
        new TextRun({ text: "entonces ", font: FONT, size: 18, bold: true }),
        new TextRun({ text: c.entonces, font: FONT, size: 18 }),
      ],
    }));
  });
  if (critParas.length) {
    rows.push(new TableRow({ children: [
      new TableCell({
        width: { size: LABEL_W, type: WidthType.DXA },
        shading: { fill: "F5F9FF", type: ShadingType.CLEAR },
        borders: { top: gris, bottom: gris, left: nil, right: gris },
        margins: { top: 80, bottom: 80, left: 150, right: 100 },
        verticalAlign: "top",
        children: [cellTxt("Criterios de aceptación", { bold: true })],
      }),
      new TableCell({
        width: { size: VALUE_W, type: WidthType.DXA },
        borders: { top: gris, bottom: gris, left: gris, right: nil },
        margins: { top: 80, bottom: 80, left: 150, right: 100 },
        verticalAlign: "top",
        children: critParas,
      }),
    ] }));
  }
  if (r.pendiente) rows.push(filaLV("Pendiente de validación", r.pendiente, { justify: true }));
  if (r.nota)      rows.push(filaLV("Nota técnica", r.nota, { justify: true }));
  return wrapTabla(rows);
}

/* ---------- PLANTILLA B: tabla estilo SRS (8 filas) ---------- */
/*
  reqTabla({ id, titulo, modulo, descripcion, actor, precondicion,
             flujo, resultado, prioridad })
*/
function reqTabla(r) {
  const rows = [filaTitulo(r.id, r.titulo)];
  if (r.modulo)       rows.push(filaLV("Módulo", r.modulo));
  rows.push(filaLV("Descripción", r.descripcion, { justify: true }));
  if (r.actor)        rows.push(filaLV("Actor principal", r.actor));
  if (r.precondicion) rows.push(filaLV("Precondición", r.precondicion, { justify: true }));
  if (r.flujo)        rows.push(filaLV("Flujo principal", r.flujo, { justify: true }));
  if (r.resultado)    rows.push(filaLV("Resultado esperado", r.resultado, { justify: true }));
  if (r.prioridad)    rows.push(filaLV("Prioridad", r.prioridad));
  return wrapTabla(rows);
}

/* ---------- Requisito no funcional (4 filas) ---------- */
/*
  rnfTabla({ id, titulo, descripcion, criterio, prioridad })
  El título incluye la categoría: "Seguridad — Cifrado en tránsito"
*/
function rnfTabla(r) {
  const rows = [filaTitulo(r.id, r.titulo)];
  rows.push(filaLV("Descripción", r.descripcion, { justify: true }));
  rows.push(filaLV("Criterio de aceptación", r.criterio, { justify: true }));
  if (r.prioridad) rows.push(filaLV("Prioridad", r.prioridad));
  return wrapTabla(rows);
}

/* ---------- Tabla genérica (matriz de trazabilidad, anexos) ---------- */
/*
  tablaDatos([{text:"ID", width:1200}, ...], [["RF-001","..."], ...])
*/
function tablaDatos(headers, filas) {
  const headerRow = new TableRow({
    height: { value: 420, rule: HeightRule.AT_LEAST },
    children: headers.map((h) => new TableCell({
      width: { size: h.width, type: WidthType.DXA },
      shading: { fill: "F5F9FF", type: ShadingType.CLEAR },
      borders: { top: azul, bottom: azul, left: nil, right: nil },
      margins: { top: 90, bottom: 90, left: 120, right: 100 },
      verticalAlign: "top",
      children: [cellTxt(h.text, { bold: true, size: 18 })],
    })),
  });
  const dataRows = filas.map((f, idx) => {
    const last = idx === filas.length - 1;
    return new TableRow({
      children: f.map((c, i) => new TableCell({
        width: { size: headers[i].width, type: WidthType.DXA },
        borders: { top: nil, bottom: last ? azul : nil, left: nil, right: nil },
        margins: { top: 80, bottom: 80, left: 120, right: 100 },
        verticalAlign: "top",
        children: [cellTxt(c, { size: 16 })],
      })),
    });
  });
  return new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: headers.map((h) => h.width),
    layout: TableLayoutType.FIXED,
    borders: { top: nil, bottom: nil, left: nil, right: nil, insideH: nil, insideV: nil },
    rows: [headerRow, ...dataRows],
  });
}

/* ---------- EJEMPLO DE USO ---------- */

const children = [
  titulo("REQUISITOS FUNCIONALES Y NO FUNCIONALES"),
  subtitulo("NOMBRE DEL PROYECTO EN MAYÚSCULAS"),
  meta("Versión 1.0 — Mes Año | Nota de alcance"),
  vacio(),

  seccionHeader("1. INTRODUCCIÓN"),
  vacio(),
  subseccionHeader("1.1  Propósito del documento"),
  parrafo("Texto del propósito…"),
  vacio(),

  seccionHeader("2. REQUISITOS FUNCIONALES"),
  vacio(),
  subseccionHeader("MÓDULO 1 — NOMBRE DEL MÓDULO"),
  parrafo("Párrafo de contexto del módulo…"),
  vacio(),

  reqHistoria({
    id: "RF-MOD-001",
    titulo: "Título del requisito",
    historia: "Como [rol], quiero [capacidad], para [beneficio].",
    rol: "Rol principal",
    dependencias: "RF-MOD-000 (descripción breve).",
    interfaz: "Web · Mobile",
    flujo: [
      "1. Primer paso del flujo.",
      "2. Segundo paso del flujo.",
    ],
    criterios: [
      { dado: "el contexto inicial", cuando: "ocurre el disparador", entonces: "el sistema hace X y muestra Y." },
    ],
  }),
  vacio(),

  seccionHeader("3. REQUISITOS NO FUNCIONALES"),
  vacio(),
  rnfTabla({
    id: "RNF-001",
    titulo: "Seguridad — Cifrado en tránsito",
    descripcion: "El sistema web deberá cifrar todas las comunicaciones mediante TLS 1.3.",
    criterio: "Toda conexión se establece con TLS 1.3; se rechazan protocolos anteriores.",
    prioridad: "Alta",
  }),
];

const header = new Header({ children: [new Paragraph({ children: [
  new ImageRun({
    data: logo, type: "png",
    transformation: { width: 193, height: 16 },
    floating: {
      horizontalPosition: { relative: HorizontalPositionRelativeFrom.COLUMN,  offset: 1 },
      verticalPosition:   { relative: VerticalPositionRelativeFrom.PARAGRAPH, offset: -200021 },
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

Packer.toBuffer(doc).then((b) => {
  fs.writeFileSync("Requisitos_Full.docx", b);
  console.log("OK", b.length, "bytes");
});

module.exports = {
  titulo, subtitulo, meta, vacio, parrafo, nota,
  seccionHeader, subseccionHeader,
  reqHistoria, reqTabla, rnfTabla, tablaDatos,
};
