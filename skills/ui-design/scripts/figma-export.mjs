#!/usr/bin/env node
// Copia autocontenida de cada HTML de pantalla para importarla a Figma (paso 9 de ui-design).
// Reemplaza el <link> a ../design-system.css por un <style> con el CSS inlineado. No toca mockups/.
//
//   node figma-export.mjs --in discovery/3-design/outputs/mockups --out .build/figma
//   node figma-export.mjs --self-test
import { readFileSync, writeFileSync, readdirSync, mkdirSync, statSync } from "node:fs";
import { join, basename } from "node:path";

const LINK = /<link rel="stylesheet" href="\.\.\/design-system\.css">/;
const NO_AUTOCONTENIDO = /@import|url\(/;

export function inlinear(html, css) {
  if (!LINK.test(html)) throw new Error("el HTML no tiene el <link> a ../design-system.css");
  if (NO_AUTOCONTENIDO.test(css.replace(/\/\*[\s\S]*?\*\//g, ""))) throw new Error("design-system.css tiene @import o url(): no es autocontenido");
  return html.replace(LINK, `<style>\n${css}\n</style>`);
}

function exportar(dirIn, dirOut) {
  const css = readFileSync(join(dirIn, "design-system.css"), "utf8");
  const salidas = [];
  for (const flujo of readdirSync(dirIn)) {
    const dirFlujo = join(dirIn, flujo);
    if (!statSync(dirFlujo).isDirectory()) continue;
    const pantallas = readdirSync(dirFlujo).filter((f) => /^P-.*\.html$/.test(f));
    if (!pantallas.length) continue; // design-system/, vendor/, rondas de imágenes
    mkdirSync(join(dirOut, flujo), { recursive: true });
    for (const f of pantallas) {
      const destino = join(dirOut, flujo, f);
      writeFileSync(destino, inlinear(readFileSync(join(dirFlujo, f), "utf8"), css));
      salidas.push(destino);
    }
  }
  return salidas;
}

function selfTest() {
  const html = `<html><head>\n<link rel="stylesheet" href="../design-system.css">\n<style>.x{}</style></head><body>hola</body></html>`;
  const out = inlinear(html, ":root{--c:#000}");
  if (/<link/.test(out) || !/--c:#000/.test(out)) throw new Error("no inlineó");
  let fallo = false;
  try { inlinear(html, "@import url(x.css);"); } catch { fallo = true; }
  if (!fallo) throw new Error("no detectó @import");
  console.log("self-test ok");
}

const args = process.argv.slice(2);
const arg = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : undefined; };
if (args.includes("--self-test")) selfTest();
else if (arg("--in") && arg("--out")) {
  const salidas = exportar(arg("--in"), arg("--out"));
  console.log(salidas.join("\n"));
  console.log(`${salidas.length} pantallas autocontenidas en ${arg("--out")}`);
} else {
  console.error("uso: figma-export.mjs --in <mockups/> --out <dir> | --self-test");
  process.exit(2);
}
