#!/usr/bin/env node
/**
 * image.mjs: genera una imagen de mockup con la API de imágenes de OpenAI.
 *
 * Portado de garrytan/gstack (MIT, https://github.com/garrytan/gstack):
 * design/src/generate.ts, variants.ts y evolve.ts. Copias en sources/gstack/.
 * Diferencia declarada: gstack pasa por el Responses API con gpt-4o como intermediario;
 * aquí la llamada va directa a la API de imágenes, porque el brief ya lo escribe Opus.
 * Con --reference se usa el endpoint de edición, que acepta imágenes de entrada: así las
 * pantallas de un mismo proyecto se parecen a la imagen aprobada del design system.
 * A todo brief se le agrega al final una regla fija de texto (español correcto, solo las
 * frases pedidas): el modelo deforma el texto largo o no citado, y esto lo reduce.
 *
 * Uso:
 *   node image.mjs generate --brief-file brief.md --out variant-A.jpg
 *        [--size 1536x1024] [--quality medium] [--model gpt-image-2]
 *        [--format jpeg] [--compression 85] [--reference ref.jpg] [--reference otra.jpg]
 *   node image.mjs generate --brief "texto del brief" --out x.png
 *   node image.mjs generate ... --dry-run     imprime la petición sin llamar a la API
 *   node image.mjs --help
 *
 * Clave: variable OPENAI_API_KEY, o el archivo ~/.config/codeable/openai-key (una línea,
 * permisos 600). Nunca en el repo. Sin dependencias; Node 18 o superior.
 * Salida: JSON en stdout con ruta, bytes y segundos. Avisos y errores en stderr.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const API = "https://api.openai.com/v1";
const DEFAULTS = { size: "1536x1024", quality: "medium", model: "gpt-image-2", format: "jpeg", compression: 85 };
const HELP = `Uso:
  node image.mjs generate --brief-file brief.md --out variant-A.jpg
       [--size ${DEFAULTS.size}] [--quality ${DEFAULTS.quality}] [--model ${DEFAULTS.model}]
       [--format ${DEFAULTS.format}] [--compression ${DEFAULTS.compression}] [--reference ref.jpg]... [--dry-run]
  node image.mjs generate --brief "texto" --out x.png

Tamaños habituales: 1536x1024 (escritorio), 1024x1536 (móvil), 1024x1024.
Calidad: low, medium, high. Media por defecto: alcanza para elegir.
Formato: jpeg (por defecto, unos cientos de KB), webp o png (pesa megas; solo si hace falta).
Clave: OPENAI_API_KEY en el entorno, o ~/.config/codeable/openai-key. Nunca en el repo.`;

// Verificacion de copy. Ninguna instruccion evita del todo que el modelo deforme una palabra, asi que
// despues de generar se lee la imagen con el OCR de Vision (nativo de macOS, sin dependencias ni
// creditos) y se comparan las palabras dibujadas contra las cadenas del brief.
// usesLanguageCorrection va en false a proposito: con la correccion activada Vision "arregla" Entror
// a Entrar y esconde justo el error que buscamos.
// ponytail: compara vocabulario, no posicion ni orden; una palabra correcta en el lugar equivocado
// no la caza. Si eso llega a importar, comparar linea por linea.
const OCR_SWIFT = `import Foundation
import Vision
import AppKit
let path = CommandLine.arguments.dropFirst().first ?? ""
guard let img = NSImage(contentsOfFile: path),
      let cg = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else { exit(2) }
let req = VNRecognizeTextRequest()
req.recognitionLevel = .accurate
req.recognitionLanguages = ["es-ES"]
req.usesLanguageCorrection = false
try VNImageRequestHandler(cgImage: cg, options: [:]).perform([req])
for obs in (req.results ?? []) { if let t = obs.topCandidates(1).first { print(t.string) } }`;

const wordsOf = (s) => s.toLocaleLowerCase("es").match(/[\p{L}\p{N}]+/gu) || [];

function briefStrings(brief) {
  const line = brief.split("\n").find((l) => /^Elementos obligatorios/i.test(l.trim()));
  if (!line) return [];
  return [...line.matchAll(/"([^"]+)"/g)].map((m) => m[1].trim()).filter(Boolean);
}

function checkText(file, brief) {
  const strings = briefStrings(brief);
  if (!strings.length) return null;
  const expected = new Set(wordsOf(strings.join(" ")));
  if (!expected.size) return null;
  let out;
  try {
    out = execFileSync("swift", ["-", file], { input: OCR_SWIFT, encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] });
  } catch (e) {
    return { skipped: `no se pudo correr el OCR: ${String(e.message || e).split("\n")[0]}` };
  }
  const seen = wordsOf(out);
  const seenSet = new Set(seen);
  return {
    deformed: [...new Set(seen.filter((w) => !expected.has(w)))],
    missing: [...expected].filter((w) => !seenSet.has(w)),
    ocr: out.trim().split("\n").filter(Boolean),
  };
}

function reportCheck(check) {
  if (!check) return;
  if (check.skipped) return void console.error(`  Aviso: ${check.skipped}`);
  if (check.deformed.length) console.error(`  COPY MAL, palabras que no estan en el brief: ${check.deformed.join(", ")}`);
  if (check.missing.length) console.error(`  COPY FALTA, palabras del brief que no se dibujaron: ${check.missing.join(", ")}`);
  if (!check.deformed.length && !check.missing.length) console.error("  Copy verificado: cada palabra coincide con el brief");
}

function fail(msg, code = 1) {
  console.error(`IMAGE_ERROR: ${msg}`);
  process.exit(code);
}

function parseArgs(argv) {
  const args = { ...DEFAULTS, references: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = () => {
      if (i + 1 >= argv.length) fail(`Falta el valor de ${a}`);
      return argv[++i];
    };
    if (a === "generate" || a === "check") args.cmd = a;
    else if (a === "--image") args.image = next();
    else if (a === "--brief-file") args.briefFile = next();
    else if (a === "--brief") args.brief = next();
    else if (a === "--out") args.out = next();
    else if (a === "--size") args.size = next();
    else if (a === "--quality") args.quality = next();
    else if (a === "--model") args.model = next();
    else if (a === "--format") args.format = next();
    else if (a === "--compression") args.compression = Number(next());
    else if (a === "--reference") args.references.push(next());
    else if (a === "--dry-run") args.dryRun = true;
    else if (a === "--help" || a === "-h") args.help = true;
    else fail(`Argumento desconocido: ${a}\n\n${HELP}`);
  }
  return args;
}

function readKey() {
  const env = (process.env.OPENAI_API_KEY || "").trim();
  if (env) return env;
  const file = path.join(os.homedir(), ".config", "codeable", "openai-key");
  try {
    const k = fs.readFileSync(file, "utf8").trim();
    if (k) return k;
  } catch {}
  fail(
    "Falta la clave de OpenAI. Ponla en la variable OPENAI_API_KEY (export OPENAI_API_KEY=... en ~/.zshrc, " +
      `y abre una terminal nueva) o en ${file} con permisos 600. Nunca en el repo.`,
  );
}

function mime(file) {
  const ext = path.extname(file).toLowerCase();
  return ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : ext === ".webp" ? "image/webp" : "image/png";
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function explain(status, text) {
  const t = text.slice(0, 400);
  if (status === 401) fail(`Clave inválida o revocada (401). Revisa OPENAI_API_KEY. Respuesta: ${t}`);
  if (status === 403 && /verif/i.test(text))
    fail(
      "La organización de OpenAI no está verificada para generar imágenes (403). Entra a " +
        "https://platform.openai.com/settings/organization/general, verifica, y espera hasta quince minutos.",
    );
  if (status === 403) fail(`OpenAI rechazó el acceso (403): ${t}`);
  if (status === 400)
    fail(`OpenAI rechazó la petición (400). Suele ser el nombre del modelo, el tamaño o la calidad: prueba --model, --size o --quality. Respuesta: ${t}`);
  fail(`Error de la API de OpenAI (${status}): ${t}`);
}

function formatFields(args) {
  const f = { output_format: args.format };
  if (args.format !== "png") f.output_compression = args.compression;
  return f;
}

function buildRequest(args, prompt) {
  const useEdits = args.references.length > 0;
  const url = `${API}/images/${useEdits ? "edits" : "generations"}`;
  if (!useEdits) {
    return {
      url,
      headers: { "Content-Type": "application/json" },
      body: () => JSON.stringify({ model: args.model, prompt, size: args.size, quality: args.quality, n: 1, ...formatFields(args) }),
    };
  }
  return {
    url,
    headers: {},
    body: () => {
      const form = new FormData();
      form.set("model", args.model);
      form.set("prompt", prompt);
      form.set("size", args.size);
      form.set("quality", args.quality);
      form.set("n", "1");
      for (const [k, v] of Object.entries(formatFields(args))) form.set(k, String(v));
      for (const ref of args.references) {
        form.append("image[]", new Blob([fs.readFileSync(ref)], { type: mime(ref) }), path.basename(ref));
      }
      return form;
    },
  };
}

async function callOpenAI(key, req) {
  const maxRetries = 3;
  const MAX_RETRY_AFTER_MS = 60_000;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    if (attempt > 0) {
      const wait = Math.pow(2, attempt) * 1000;
      console.error(`  Reintento ${attempt}/${maxRetries} en ${wait / 1000}s`);
      await sleep(wait);
    }
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 240_000);
    let res;
    try {
      res = await fetch(req.url, {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, ...req.headers },
        body: req.body(),
        signal: controller.signal,
      });
    } catch (e) {
      clearTimeout(timer);
      if (attempt < maxRetries) {
        console.error(`  Falló la conexión (${e.name === "AbortError" ? "tiempo agotado" : e.message})`);
        continue;
      }
      fail(`No se pudo conectar con OpenAI: ${e.message}`);
    }
    clearTimeout(timer);

    if (res.status === 429 || res.status >= 500) {
      // Un 429 puede ser limite de tasa (se espera y se reintenta) o saldo agotado (reintentar no
      // sirve, y el mensaje de "limite de tasa" manda al PM a esperar algo que no va a pasar).
      if (res.status === 429) {
        const body = await res.clone().text();
        if (/insufficient_quota|credit_balance_exhausted|no credits remaining/i.test(body)) {
          fail(
            "La cuenta de OpenAI no tiene credito, asi que no es limite de tasa y reintentar no sirve. " +
              "Carga credito en https://platform.openai.com/settings/organization/billing/ y vuelve a correrlo. " +
              "Mientras tanto, 'image.mjs check' si verifica imagenes ya generadas, porque el OCR es local y no cuesta.",
          );
        }
      }
      const retryAfter = res.headers.get("retry-after");
      const secs = retryAfter && /^\d+$/.test(retryAfter.trim()) ? Number(retryAfter.trim()) : null;
      console.error(`  OpenAI respondió ${res.status}${secs !== null ? `, pide esperar ${secs}s` : ""}`);
      if (secs !== null) await sleep(Math.min(secs * 1000, MAX_RETRY_AFTER_MS));
      continue;
    }
    if (!res.ok) explain(res.status, await res.text());

    const data = await res.json();
    const item = data?.data?.[0];
    if (item?.b64_json) return Buffer.from(item.b64_json, "base64");
    if (item?.url) {
      const img = await fetch(item.url);
      if (!img.ok) fail(`No se pudo descargar la imagen (${img.status})`);
      return Buffer.from(await img.arrayBuffer());
    }
    fail(`La respuesta no trae imagen: ${JSON.stringify(data).slice(0, 300)}`);
  }
  fail("Se agotaron los reintentos por límite de tasa de OpenAI. Espera un minuto y vuelve a correrlo, o genera de a una.");
}

const args = parseArgs(process.argv.slice(2));
if (args.help || !args.cmd) {
  console.log(HELP);
  process.exit(args.help ? 0 : 1);
}
if (args.cmd === "check") {
  if (!args.image) fail("Falta --image");
  if (!args.briefFile && !args.brief) fail("Falta --brief-file");
  const b = args.briefFile ? fs.readFileSync(args.briefFile, "utf8") : args.brief;
  if (!fs.existsSync(args.image)) fail(`No existe la imagen ${args.image}`);
  const check = checkText(args.image, b);
  if (!check) fail("El brief no tiene linea de Elementos obligatorios: no hay con que comparar");
  console.error(`Verificando ${path.basename(args.image)}`);
  reportCheck(check);
  console.log(JSON.stringify({ image: args.image, ...check }));
  process.exit(check.deformed?.length || check.missing?.length ? 3 : 0);
}
if (!args.out) fail("Falta --out");
if (!args.brief && !args.briefFile) fail("Falta --brief o --brief-file");
const briefText = args.briefFile ? fs.readFileSync(args.briefFile, "utf8").trim() : args.brief.trim();
if (!briefText) fail("El brief está vacío");
// Regla fija para todo brief: el modelo de imágenes inventa palabras cuando el texto es largo o
// no está citado. Se agrega aquí, una vez, para que ningún brief tenga que recordarla.
const TEXT_RULE = "Texto en pantalla: todo en español correcto, con acentos y sin errores de ortografía, " +
  "sin palabras inventadas ni caracteres extraños. Escribe únicamente las frases que este brief pide, " +
  "tal cual, y no agregues ningún otro texto. Si una frase no cabe, recórtala, no la deformes.";

// Se repite al final la lista literal de cadenas de la linea "Elementos obligatorios": la ultima
// instruccion del prompt es la que mas pesa, y una lista de glifos exactos falla mucho menos que
// un pedido generico de buena ortografia. Pedirlo en prosa dentro del brief ya se probo y no basta.
// ponytail: lee las comillas de esa unica linea; si un brief pone copy fuera de ella, no entra.
function stringChecklist(brief) {
  const line = brief.split("\n").find((l) => /^Elementos obligatorios/i.test(l.trim()));
  if (!line) return "";
  const quoted = [...line.matchAll(/"([^"]+)"/g)].map((m) => m[1].trim()).filter(Boolean);
  if (!quoted.length) return "";
  return (
    "\n\nREVISION FINAL DE ORTOGRAFIA, OBLIGATORIA. La pantalla contiene exactamente estas cadenas de " +
    "texto, y cada una se dibuja letra por letra como esta escrita aqui, con sus tildes y su puntuacion:\n" +
    quoted.map((s) => `- ${s}`).join("\n") +
    "\nAntes de terminar, lee cada palabra que dibujaste y comparala con esta lista. Si una palabra no " +
    "coincide letra por letra con la lista, esta mal y se corrige. No inventes palabras para llenar un " +
    "hueco, no repitas una cadena dos veces, y no dibujes ninguna palabra que no este en esta lista. " +
    "Prefiere tipografia mas grande y menos apretada antes que deformar una palabra. " +
    "En espanol el unico acento que existe es el agudo: a e i o u llevan tilde solo como á é í ó ú. " +
    "Nunca dibujes acento circunflejo (â ê î ô û), ni grave (à è ì ò ù), ni virgulilla sobre vocal " +
    "(ã õ ũ): esos signos no existen en espanol y delatan la imagen. La virgulilla va solo sobre la " +
    "ene, ñ, y la dieresis solo sobre la u de güe y güi. Si una palabra lleva dos signos seguidos, " +
    "como Núñez, dibuja u con tilde aguda y luego n con virgulilla, y revisala dos veces."
  );
}

// Con referencia el modelo copia tambien sus letras, y un error de la imagen aprobada se hereda en
// toda la familia (paso "Guardar vísta" en Vanguard). Se le dice que la referencia es solo estilo.
const REF_RULE = args.references.length
  ? " De la imagen de referencia toma solo el estilo (tipografía, colores, componentes), nunca su texto: el texto de esta pantalla es únicamente el de la lista de abajo."
  : "";
const prompt = `${briefText}\n\n${TEXT_RULE}${REF_RULE}${stringChecklist(briefText)}`;
for (const ref of args.references) if (!fs.existsSync(ref)) fail(`No existe la referencia ${ref}`);

const req = buildRequest(args, prompt);
if (args.dryRun) {
  console.log(
    JSON.stringify(
      {
        dryRun: true,
        url: req.url,
        model: args.model,
        size: args.size,
        quality: args.quality,
        format: args.format,
        compression: args.compression,
        references: args.references,
        promptChars: prompt.length,
        prompt,
        out: args.out,
      },
      null,
      2,
    ),
  );
  process.exit(0);
}

const key = readKey();
const started = Date.now();
console.error(`Generando ${path.basename(args.out)} (${args.model}, ${args.size}, ${args.quality}, ${args.format}${args.references.length ? `, ${args.references.length} referencia(s)` : ""})`);
const png = await callOpenAI(key, req);
fs.mkdirSync(path.dirname(path.resolve(args.out)), { recursive: true });
fs.writeFileSync(args.out, png);
const seconds = Number(((Date.now() - started) / 1000).toFixed(1));
console.error(`Listo en ${seconds}s, ${(png.length / 1024).toFixed(0)} KB`);
const check = checkText(args.out, briefText);
reportCheck(check);
console.log(
  JSON.stringify({ out: args.out, bytes: png.length, seconds, textCheck: check, model: args.model, size: args.size, quality: args.quality, format: args.format, references: args.references }),
);
