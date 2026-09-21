#!/usr/bin/env node
// md-to-docx.cjs: convierte un entregable markdown del arnés al .docx corporativo
// (mismo formato que ejemplo-generador.js de requirements-lite: Inter, banda negra por
// sección, banda celeste por etapa, logo en el header).
//
// Uso:
//   NODE_PATH=.build/node_modules node md-to-docx.cjs --in <md> --out <docx> \
//     [--subtitle "<cliente> · Fase de Discovery"] [--status "<línea de versión>"] \
//     [--image <png>]   # se incrusta donde el markdown tiene un bloque ```mermaid
//   node md-to-docx.cjs --self-test
//
// Requiere la librería docx (npm i --prefix .build docx). CommonJS a propósito: require
// respeta NODE_PATH, import no.
//
// Lo que entiende: # título, ## sección, ### etapa (fusiona "Objetivo de la etapa"),
// #### subtítulo, párrafos con **negrita**, *cursiva* y `código`, listas numeradas y con
// guion, bloques "**Decisión — ¿…?**" con ramas Sí/No, notas "**Nota As-Is:**", tablas y
// fences. Omite las líneas de registro interno (Vigencia, Versión, Estado, Fuente de
// verdad, Procedencia, Producido con, "Lo produce `harness/...`").
// ponytail: parser por líneas del subconjunto que usan los templates; si aparece markdown
// fuera de eso, se agrega el caso, no una librería.

const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, ShadingType, BorderStyle, TableLayoutType, HeightRule,
  AlignmentType, Header, ImageRun,
  HorizontalPositionRelativeFrom, VerticalPositionRelativeFrom, TextWrappingType,
} = require("docx");

const TABLE_WIDTH = 10777;
const FONT = "Inter";
const azul = { style: BorderStyle.SINGLE, size: 8, color: "3A83F7" };
const nil = { style: BorderStyle.NIL, size: 0, color: "000000" };
const negro = { style: BorderStyle.SINGLE, size: 8, color: "000000" };
const gris = { style: BorderStyle.SINGLE, size: 4, color: "BFBFBF" };
const SP = { before: 120, after: 0, line: 276, lineRule: "auto" };

// ---------------- inline ----------------

function inline(text, base = {}) {
  text = text.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/<br\s*\/?>/g, " ");
  const runs = [];
  const re = /(\*\*[^*]+?\*\*|\*[^*]+?\*|`[^`]+`)/g;
  let last = 0, m;
  while ((m = re.exec(text))) {
    if (m.index > last) runs.push(new TextRun({ text: text.slice(last, m.index), font: FONT, size: 20, ...base }));
    const t = m[0];
    if (t.startsWith("**")) runs.push(new TextRun({ text: t.slice(2, -2), font: FONT, size: 20, ...base, bold: true }));
    else if (t.startsWith("`")) runs.push(new TextRun({ text: t.slice(1, -1), font: "Courier New", size: 18, ...base }));
    else runs.push(new TextRun({ text: t.slice(1, -1), font: FONT, size: 20, ...base, italics: true }));
    last = m.index + t.length;
  }
  if (last < text.length) runs.push(new TextRun({ text: text.slice(last), font: FONT, size: 20, ...base }));
  return runs;
}

const plain = (s) => s.replace(/\*\*|`/g, "").replace(/(^|\s)\*([^*]+)\*(?=\s|$|[.,;:])/g, "$1$2");

// ---------------- bloques docx (helpers de ejemplo-generador.js) ----------------

const titulo = (t) => new Paragraph({ spacing: { before: 0, after: 0, line: 276 }, children: [new TextRun({ text: t, font: FONT, size: 40, bold: true })] });
const subtitulo = (t) => new Paragraph({ spacing: { before: 200, after: 0, line: 276 }, children: [new TextRun({ text: t, font: FONT, size: 28, bold: true })] });
const meta = (t) => new Paragraph({ spacing: { before: 200, after: 0, line: 276 }, children: [new TextRun({ text: t, font: FONT, size: 20 })] });
const vacio = () => new Paragraph({ children: [new TextRun({ text: "", font: FONT, size: 20 })] });

function banda(text, fill, borders, color) {
  return new Table({
    width: { size: TABLE_WIDTH, type: WidthType.DXA }, columnWidths: [TABLE_WIDTH], layout: TableLayoutType.FIXED,
    borders: { top: nil, bottom: nil, left: nil, right: nil, insideH: nil, insideV: nil },
    rows: [new TableRow({ height: { value: 400, rule: HeightRule.AT_LEAST }, children: [new TableCell({
      width: { size: TABLE_WIDTH, type: WidthType.DXA }, borders, shading: { fill, type: ShadingType.CLEAR },
      margins: { top: 100, bottom: 100, left: 150, right: 100 }, verticalAlign: "top",
      children: [new Paragraph({ spacing: { line: 240 }, children: inline(text, { bold: true, color }) })],
    })] })],
  });
}
const moduloHeader = (t) => banda(plain(t).toUpperCase(), "000000", { top: negro, bottom: negro, left: negro, right: negro }, "FFFFFF");
const subseccionHeader = (t) => banda(t, "F5F9FF", { top: azul, bottom: azul, left: nil, right: nil }, "000000");

const parrafo = (text, extra = {}) => new Paragraph({ spacing: SP, alignment: AlignmentType.BOTH, ...extra, children: inline(text, extra.base || {}) });

// "**Etiqueta:** texto" -> etiqueta en negrita, texto normal
function etiqueta(label, text, extra = {}) {
  return new Paragraph({ spacing: SP, alignment: AlignmentType.BOTH, ...extra, children: [
    new TextRun({ text: `${label}:`, font: FONT, size: 20, bold: true, ...(extra.base || {}) }),
    ...inline(` ${text}`, extra.base || {}),
  ] });
}

const IND = { left: 500, hanging: 360 };
const IND2 = { left: 1000, hanging: 280 };

function itemNumerado(n, text) {
  return new Paragraph({ spacing: SP, alignment: AlignmentType.BOTH, indent: IND, children: [new TextRun({ text: `${n}.  `, font: FONT, size: 20 }), ...inline(text)] });
}
function vineta(text, indent = IND) {
  return new Paragraph({ spacing: SP, alignment: AlignmentType.BOTH, indent, children: [new TextRun({ text: "•  ", font: FONT, size: 20 }), ...inline(text)] });
}
// Decisión: la pregunta en negrita cursiva, sangrada; es el rombo del diagrama
function decision(text) {
  return new Paragraph({ spacing: { ...SP, before: 200 }, indent: { left: 500 }, children: inline(text.replace(/^\*\*|\*\*$/g, ""), { bold: true, italics: true }) });
}
// Rama SÍ / NO de una decisión
function rama(text) {
  const m = text.match(/^\*{0,2}(S[ií]|No|NO)\*{0,2}:\*{0,2}\s*(.*)$/s);
  const label = m ? m[1].toUpperCase().replace("SI", "SÍ") : null;
  const body = m ? m[2] : text;
  return new Paragraph({ spacing: SP, alignment: AlignmentType.BOTH, indent: IND2, children: [
    new TextRun({ text: "•  ", font: FONT, size: 20 }),
    ...(label ? [new TextRun({ text: `${label}: `, font: FONT, size: 20, bold: true })] : []),
    ...inline(body),
  ] });
}
// Nota de etapa: bloque sangrado en cursiva con etiqueta en negrita
function notaEtapa(label, text) {
  return new Paragraph({ spacing: { ...SP, before: 200 }, alignment: AlignmentType.BOTH, indent: { left: 500 }, children: [
    new TextRun({ text: `${label}: `, font: FONT, size: 20, bold: true }),
    ...inline(text, { italics: true }),
  ] });
}
const codigo = (line) => new Paragraph({ spacing: { before: 0, after: 0 }, indent: { left: 500 }, children: [new TextRun({ text: line || " ", font: "Courier New", size: 16 })] });

function tabla(rows) {
  const cols = Math.max(...rows.map((r) => r.length));
  const w = Math.floor(TABLE_WIDTH / cols);
  const size = cols > 5 ? 16 : 18;
  return new Table({
    width: { size: TABLE_WIDTH, type: WidthType.DXA }, columnWidths: Array(cols).fill(w), layout: TableLayoutType.FIXED,
    borders: { top: gris, bottom: gris, left: gris, right: gris, insideH: gris, insideV: gris },
    rows: rows.map((cells, i) => new TableRow({ tableHeader: i === 0, children: Array.from({ length: cols }, (_, c) => new TableCell({
      width: { size: w, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 80, right: 80 },
      shading: i === 0 ? { fill: "F5F9FF", type: ShadingType.CLEAR } : undefined,
      children: [new Paragraph({ spacing: { line: 240 }, children: inline(cells[c] || "", { size, bold: i === 0 }) })],
    })) })),
  });
}

function imagen(file) {
  const data = fs.readFileSync(file);
  const pw = data.readUInt32BE(16), ph = data.readUInt32BE(20); // cabecera PNG
  const maxW = 700, maxH = 880;
  const k = Math.min(maxW / pw, maxH / ph, 1);
  return new Paragraph({ spacing: { before: 200, after: 200 }, alignment: AlignmentType.CENTER, children: [
    new ImageRun({ data, type: "png", transformation: { width: Math.round(pw * k), height: Math.round(ph * k) } }),
  ] });
}

// ---------------- parser ----------------

function parse(md) {
  const lines = md.replace(/\r/g, "").split("\n");
  const blocks = [];
  let i = 0;
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim() || /^---+$/.test(l.trim())) { i++; continue; }
    let m;
    if ((m = l.match(/^```(\w*)/))) {
      const body = []; i++;
      while (i < lines.length && !lines[i].startsWith("```")) body.push(lines[i++]);
      i++; blocks.push({ t: "fence", lang: m[1], body }); continue;
    }
    if ((m = l.match(/^(#{1,4})\s+(.*)$/))) { blocks.push({ t: "h" + m[1].length, text: m[2].trim() }); i++; continue; }
    if (l.startsWith("|")) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        const cells = lines[i].trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
        if (!cells.every((c) => /^:?-+:?$/.test(c))) rows.push(cells);
        i++;
      }
      blocks.push({ t: "table", rows }); continue;
    }
    if ((m = l.match(/^(\d+)\.\s+(.*)$/)) || (m = l.match(/^[-*]\s+(.*)$/))) {
      const ordered = /^\d/.test(l);
      const items = [];
      while (i < lines.length && (m = ordered ? lines[i].match(/^(\d+)\.\s+(.*)$/) : lines[i].match(/^[-*]\s+(.*)$/))) {
        const item = { n: ordered ? +m[1] : null, text: ordered ? m[2] : m[1], subs: [] };
        i++;
        while (i < lines.length && /^\s+\S/.test(lines[i])) {
          const s = lines[i].match(/^\s+[-*]\s+(.*)$/);
          if (s) item.subs.push(s[1]);
          else if (item.subs.length) item.subs[item.subs.length - 1] += " " + lines[i].trim();
          else item.text += " " + lines[i].trim();
          i++;
        }
        items.push(item);
      }
      blocks.push({ t: "list", ordered, items }); continue;
    }
    const para = [];
    while (i < lines.length && lines[i].trim() && !/^(#{1,4}\s|```|\||\d+\.\s|[-*]\s|---+$)/.test(lines[i])) para.push(lines[i++].trim());
    blocks.push({ t: "p", text: para.join(" ") });
  }
  return blocks;
}

const SKIP = /^(\*\*)?(Vigencia:|Versión:|Estado:|Fuente de verdad|Procedencia global|Producido con:)|^Estilo: ver|^Lo produce `harness\//;
const DECISION = /^\*\*Decisión\s*[—-]/;
const NOTA = /^\*\*(Nota [^:*]+):\*\*\s*(.*)$/s;
const NOTA_VIEJA = /^\*(Nota de la etapa)\.?\*\s*(.*)$/s;
const ETIQUETA = /^\*\*([^*]+?):\*\*\s+(.*)$/s;

function render(md, opts = {}) {
  const blocks = parse(md);
  const out = [];
  const stats = { decisiones: 0, notas: 0, etapas: 0, secciones: 0, tablas: 0, imagenes: 0 };
  for (let b = 0; b < blocks.length; b++) {
    const k = blocks[b];
    if (k.t === "h1") {
      out.push(titulo(plain(k.text)));
      if (opts.subtitle) out.push(subtitulo(opts.subtitle));
      out.push(meta(opts.status || `Documento provisional, sin checkpoint · ${new Date().toISOString().slice(0, 10)}`));
      out.push(vacio());
    } else if (k.t === "h2") {
      stats.secciones++; out.push(vacio(), moduloHeader(k.text), vacio());
    } else if (k.t === "h3") {
      let text = k.text;
      const next = blocks[b + 1];
      const obj = next && next.t === "p" && next.text.match(/^\*\*Objetivo de la etapa:\*\*\s*(.*)$/s);
      if (obj) { text = `${text} | Objetivo: ${obj[1]}`; b++; }
      if (/^Etapa\s/i.test(text)) stats.etapas++;
      out.push(vacio(), subseccionHeader(text));
    } else if (k.t === "h4") {
      out.push(new Paragraph({ spacing: { ...SP, before: 200 }, children: inline(k.text, { bold: true }) }));
    } else if (k.t === "p") {
      let m;
      if (SKIP.test(k.text)) continue;
      if (DECISION.test(k.text)) { stats.decisiones++; out.push(decision(k.text)); }
      else if ((m = k.text.match(NOTA)) || (m = k.text.match(NOTA_VIEJA))) { stats.notas++; out.push(notaEtapa(m[1].replace("Nota de la etapa", "Nota As-Is"), m[2])); }
      else if ((m = k.text.match(ETIQUETA)) && !m[1].includes("**")) out.push(etiqueta(m[1], m[2]));
      else out.push(parrafo(k.text));
    } else if (k.t === "list") {
      const esRama = (s) => /^\*{0,2}(S[ií]|No|NO)\*{0,2}:/.test(s);
      for (const it of k.items) {
        if (DECISION.test(it.text)) { stats.decisiones++; out.push(decision(it.text)); it.subs.forEach((s) => out.push(rama(s))); continue; }
        if (!k.ordered && esRama(it.text)) { out.push(rama(it.text)); continue; }
        out.push(k.ordered ? itemNumerado(it.n, it.text) : vineta(it.text));
        it.subs.forEach((s) => out.push(esRama(s) ? rama(s) : vineta(s, IND2)));
      }
    } else if (k.t === "table") {
      stats.tablas++; out.push(vacio(), tabla(k.rows), vacio());
    } else if (k.t === "fence") {
      if (k.lang === "mermaid") { if (opts.image) { stats.imagenes++; out.push(imagen(opts.image)); } }
      else k.body.forEach((l) => out.push(codigo(l)));
    }
  }
  const logoPath = path.join(__dirname, "..", "..", "requirements-lite", "assets", "codeable-logo.png");
  const headers = fs.existsSync(logoPath) ? { default: new Header({ children: [new Paragraph({ children: [new ImageRun({
    data: fs.readFileSync(logoPath), type: "png", transformation: { width: 193, height: 16 },
    floating: { horizontalPosition: { relative: HorizontalPositionRelativeFrom.COLUMN, offset: 1 }, verticalPosition: { relative: VerticalPositionRelativeFrom.PARAGRAPH, offset: -200021 }, behindDocument: true, allowOverlap: true, wrap: { type: TextWrappingType.NONE } },
  })] })] }) } : undefined;
  const doc = new Document({ sections: [{
    properties: { page: { size: { width: 11909, height: 16834 }, margin: { top: 850, bottom: 567, left: 567, right: 567, header: 720, footer: 720 } } },
    headers, children: out,
  }] });
  return { doc, stats, count: out.length };
}

// ---------------- CLI ----------------

function args() {
  const a = process.argv.slice(2), o = {};
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--self-test") o.selfTest = true;
    else if (a[i].startsWith("--")) o[a[i].slice(2)] = a[++i];
  }
  return o;
}

async function selfTest() {
  const assert = require("assert");
  const md = `# Mapa de procesos As-Is — Cliente — Proceso

**Fuente de verdad de este documento:** se omite.

## 1. Objetivo y alcance

Un párrafo con **negrita** y *cursiva*.

## 3. Detalle por etapa

### Etapa 1 — Promoción

**Objetivo de la etapa:** captar prospectos.

**Quién la ejecuta hoy:** el analista.

1. Primer paso.
2. Segundo paso
   con continuación.

**Decisión — ¿pasa el filtro?**
- **Sí:** sigue.
- **No:** se descarta.

3. Tercer paso.

**Nota As-Is:** lo que ocurre de verdad.

| Origen | Destino | Condición |
|---|---|---|
| Etapa 1 | Etapa 2 | califica |
`;
  const { doc, stats, count } = render(md, { subtitle: "Cliente · Fase de Discovery" });
  assert.strictEqual(stats.secciones, 2);
  assert.strictEqual(stats.etapas, 1);
  assert.strictEqual(stats.decisiones, 1);
  assert.strictEqual(stats.notas, 1);
  assert.strictEqual(stats.tablas, 1);
  const buf = await Packer.toBuffer(doc);
  assert.ok(buf.length > 4000, "docx demasiado chico");
  const xml = buf.toString("latin1");
  assert.ok(!xml.includes("Fuente de verdad"), "no se omitió el metadato");
  console.log("SELF-TEST OK", count, "bloques", buf.length, "bytes", JSON.stringify(stats));
}

async function main() {
  const o = args();
  if (o.selfTest) return selfTest();
  if (!o.in || !o.out) { console.error("uso: --in <md> --out <docx> [--subtitle ..] [--status ..] [--image <png>] | --self-test"); process.exit(2); }
  const { doc, stats } = render(fs.readFileSync(o.in, "utf8"), o);
  const buf = await Packer.toBuffer(doc);
  fs.mkdirSync(path.dirname(o.out), { recursive: true });
  fs.writeFileSync(o.out, buf);
  console.log("OK", o.out, buf.length, "bytes", JSON.stringify(stats));
}

main().catch((e) => { console.error(e); process.exit(1); });
