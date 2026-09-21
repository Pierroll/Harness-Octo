#!/usr/bin/env node
/**
 * board.mjs: tablero de comparación de alternativas de diseño, servido en el navegador.
 *
 * Portado de garrytan/gstack (MIT, https://github.com/garrytan/gstack):
 * design/src/compare.ts y design/src/serve.ts. Copias en sources/gstack/.
 * Diferencias declaradas: varias pantallas por tablero (un tablero por flujo), imágenes
 * por ruta relativa y no en base64 para que el archivo pese poco y se pueda versionar,
 * estado guardado en localStorage para que regenerar una pantalla no borre lo elegido en
 * las otras, servidor http de Node en lugar de Bun, textos en español.
 *
 * Uso:
 *   node board.mjs --sets sets.json --out board.html              solo arma el HTML
 *   node board.mjs --sets sets.json --out board.html --serve      arma, sirve y abre el navegador
 *        [--timeout 1800] [--port 0] [--no-open] [--title "Flujo: inscripción"]
 *   node board.mjs --self-test
 *   node board.mjs --help
 *
 * sets.json:
 *   { "title": "Flujo: inscripción",
 *     "sets": [ { "id": "P-INS-03", "title": "Formulario de inscripción", "round": 1,
 *       "variants": [ { "label": "A", "name": "Cuatro pasos",
 *                       "direction": "Un paso por tipo de dato, barra de progreso arriba",
 *                       "image": "P-INS-03/r1/variant-A.png" } ] } ] }
 *   Las rutas de imagen son relativas a la carpeta de board.html.
 *
 * Protocolo. El agente corre el script en PRIMER PLANO (Bash con timeout) y el proceso termina
 * solo cuando el PM decide, así el agente sigue sin que nadie vuelva a la terminal a avisar:
 *   POST /api/feedback  con regenerated:false -> feedback.json junto al HTML; sale con 0
 *   POST /api/feedback  con regenerated:true  -> feedback-pending.json (con screen y regenerateAction); sale con 3
 *   sin actividad durante --timeout segundos  -> sale con 1 (el agente lo vuelve a correr)
 *   GET  /api/progress                          -> {"status":"serving"|"regenerating"|"done"}
 *   POST /api/reload                            -> vuelve a serving (compatibilidad)
 * Tras pedir regenerar, la pestaña queda esperando y se recarga sola cuando el agente vuelve
 * a servir el tablero en el mismo puerto con la ronda nueva. Tras enviar, la pestaña se cierra
 * si el navegador lo permite; si no, dice que ya se puede cerrar.
 * Sin --serve el HTML también abre como archivo, pero el envío hay que copiarlo al chat.
 */
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";

const HELP = `Uso:
  node board.mjs --sets sets.json --out board.html [--serve] [--timeout 1800] [--port 0] [--no-open] [--title "Flujo"]
  node board.mjs --self-test

sets.json: { "title": "...", "sets": [ { "id": "P-INS-03", "title": "...", "round": 1,
  "variants": [ { "label": "A", "name": "...", "direction": "...", "image": "P-INS-03/r1/variant-A.png" } ] } ] }
Rutas de imagen relativas a la carpeta de board.html.

Con --serve imprime BOARD_URL: en stderr, abre el navegador y escribe junto al HTML:
  feedback.json          cuando el PM pulsa "Enviar mi elección" (el servidor termina con 0)
  feedback-pending.json  cuando pide regenerar una pantalla (el servidor termina con 3; el agente
                         lo mueve a la carpeta de la ronda, genera la nueva y vuelve a servir)
Rutas: POST /api/feedback, GET /api/progress, POST /api/reload.`;

function fail(msg, code = 1) {
  console.error(`BOARD_ERROR: ${msg}`);
  process.exit(code);
}

function parseArgs(argv) {
  const args = { port: 0, timeout: 1800, open: true };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = () => {
      if (i + 1 >= argv.length) fail(`Falta el valor de ${a}`);
      return argv[++i];
    };
    if (a === "--sets") args.sets = next();
    else if (a === "--out") args.out = next();
    else if (a === "--title") args.title = next();
    else if (a === "--serve") args.serve = true;
    else if (a === "--port") args.port = Number(next());
    else if (a === "--timeout") args.timeout = Number(next());
    else if (a === "--no-open") args.open = false;
    else if (a === "--self-test") args.selfTest = true;
    else if (a === "--help" || a === "-h") args.help = true;
    else fail(`Argumento desconocido: ${a}\n\n${HELP}`);
  }
  return args;
}

const esc = (s) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const CSS = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: "Geist", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; background: #fff; color: #171717; -webkit-font-smoothing: antialiased; }
  .top { padding: 14px 32px; border-bottom: 1px solid #eaeaea; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; background: rgba(255,255,255,0.9); backdrop-filter: blur(8px); z-index: 2; }
  .top h1 { font-size: 15px; font-weight: 600; letter-spacing: -0.01em; }
  .meta { font-size: 13px; color: #666; display: flex; align-items: center; gap: 16px; }
  .view-toggle { display: flex; gap: 0; border: 1px solid #eaeaea; border-radius: 6px; padding: 2px; }
  .view-toggle button { padding: 4px 10px; border: none; background: none; border-radius: 4px; font-size: 12px; cursor: pointer; color: #666; font-weight: 500; font-family: inherit; }
  .view-toggle button.active { background: #171717; color: #fff; }
  .set { max-width: 1440px; margin: 0 auto; padding: 32px; border-bottom: 1px solid #eaeaea; }
  .set-header { display: flex; align-items: baseline; gap: 12px; margin-bottom: 16px; }
  .set-header h2 { font-size: 20px; font-weight: 600; letter-spacing: -0.02em; }
  .round { font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 0.04em; border: 1px solid #eaeaea; border-radius: 999px; padding: 2px 8px; }
  .variant { border-bottom: 1px solid #eaeaea; padding: 24px 0; }
  .variant:last-child { border-bottom: none; }
  .grid-view .variants { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .grid-view .variant { border: 1px solid #eaeaea; border-radius: 8px; padding: 20px; transition: border-color .15s; }
  .grid-view .variant:hover { border-color: #999; }
  .grid-view .variant-controls { flex-direction: column; align-items: stretch; }
  .variant-header { display: flex; align-items: baseline; gap: 8px; }
  .variant-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: #666; }
  .variant-name { font-size: 15px; font-weight: 600; color: #171717; letter-spacing: -0.01em; }
  .variant-direction { font-size: 13px; color: #666; margin: 6px 0 14px; line-height: 1.5; }
  .variant img { width: 100%; height: auto; display: block; border-radius: 6px; border: 1px solid #eaeaea; background: #fafafa; }
  .variant-controls { display: flex; align-items: center; gap: 12px; padding-top: 14px; flex-wrap: wrap; }
  .pick-label { display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 14px; font-weight: 500; }
  .pick-label input { accent-color: #171717; width: 16px; height: 16px; }
  .pick-confirm { color: #0070f3; font-size: 13px; }
  .stars { display: flex; gap: 2px; }
  .star { font-size: 18px; color: #eaeaea; cursor: pointer; user-select: none; }
  .star.filled { color: #171717; }
  .star:hover { color: #666; }
  .feedback-input { flex: 1; min-width: 200px; padding: 8px 12px; border: 1px solid #eaeaea; border-radius: 6px; font-size: 13px; font-family: inherit; color: #171717; background: #fff; }
  .feedback-input:focus, .direction:focus, .regen-custom:focus { outline: none; border-color: #171717; }
  .more-like-this, .regen-chiclet, .regen-btn { padding: 7px 12px; background: #fff; border: 1px solid #eaeaea; border-radius: 6px; font-size: 13px; cursor: pointer; color: #171717; font-family: inherit; transition: border-color .15s, background .15s; }
  .more-like-this:hover, .regen-chiclet:hover, .regen-btn:hover { border-color: #171717; }
  .regen-chiclet { border-radius: 999px; color: #666; }
  .regen-chiclet.active { border-color: #171717; background: #171717; color: #fff; }
  .set-bottom { display: grid; grid-template-columns: 1fr 380px; gap: 24px; margin-top: 20px; }
  .set-bottom h3 { font-size: 11px; font-weight: 600; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.06em; color: #666; }
  .direction { width: 100%; min-height: 72px; padding: 10px 12px; border: 1px solid #eaeaea; border-radius: 6px; font: inherit; font-size: 13px; resize: vertical; }
  .regen-col { background: #fafafa; border: 1px solid #eaeaea; border-radius: 8px; padding: 16px; }
  .regen-controls { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 10px; }
  .regen-custom { width: 100%; padding: 8px 12px; border: 1px solid #eaeaea; border-radius: 6px; font-size: 13px; font-family: inherit; margin-bottom: 10px; background: #fff; }
  .regen-btn { width: 100%; font-weight: 500; }
  .bottom { max-width: 1440px; margin: 0 auto; padding: 32px; display: flex; flex-direction: column; align-items: flex-start; gap: 12px; }
  .submit-status { font-size: 13px; color: #666; min-height: 20px; }
  .submit-btn { padding: 10px 20px; background: #171717; color: #fff; border: 1px solid #171717; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer; font-family: inherit; transition: background .15s, color .15s; }
  .submit-btn:hover { background: #fff; color: #171717; }
`;

const JS = `
(function () {
  var hasServer = location.protocol === 'http:' || location.protocol === 'https:';
  // Latido: el servidor se apaga tras --timeout segundos sin peticiones, y una pestaña abierta donde el PM
  // lee no hace ninguna. Cada 30 s se toca /api/progress para que "abierta" cuente como actividad.
  if (hasServer) setInterval(function () { fetch('./api/progress').catch(function () {}); }, 30000);
  function storeKey(setEl) { return 'codeable-board:' + location.pathname + ':' + setEl.dataset.set + ':r' + setEl.dataset.round; }
  function readSet(setEl) {
    var preferred = setEl.querySelector('input[type=radio]:checked');
    var ratings = {}, comments = {};
    setEl.querySelectorAll('.variant').forEach(function (v) {
      var l = v.dataset.variant;
      var filled = v.querySelectorAll('.star.filled').length;
      if (filled) ratings[l] = filled;
      var c = v.querySelector('.feedback-input').value.trim();
      if (c) comments[l] = c;
    });
    return { preferred: preferred ? preferred.value : null, ratings: ratings, comments: comments, direction: setEl.querySelector('.direction').value.trim() || null };
  }
  function saveSet(setEl) { try { localStorage.setItem(storeKey(setEl), JSON.stringify(readSet(setEl))); } catch (e) {} }
  function restoreSet(setEl) {
    var s; try { s = JSON.parse(localStorage.getItem(storeKey(setEl)) || 'null'); } catch (e) { return; }
    if (!s) return;
    if (s.preferred) { var r = setEl.querySelector('input[type=radio][value="' + s.preferred + '"]'); if (r) { r.checked = true; showPick(setEl, r); } }
    setEl.querySelectorAll('.variant').forEach(function (v) {
      var l = v.dataset.variant;
      var n = (s.ratings && s.ratings[l]) || 0;
      v.querySelectorAll('.star').forEach(function (st) { st.classList.toggle('filled', parseInt(st.dataset.value, 10) <= n); });
      if (s.comments && s.comments[l]) v.querySelector('.feedback-input').value = s.comments[l];
    });
    if (s.direction) setEl.querySelector('.direction').value = s.direction;
  }
  function showPick(setEl, radio) {
    setEl.querySelectorAll('.pick-confirm').forEach(function (e) { e.hidden = true; });
    setEl.querySelectorAll('.pick-text').forEach(function (e) { e.hidden = false; });
    var lab = radio.closest('.pick-label');
    lab.querySelector('.pick-text').hidden = true;
    lab.querySelector('.pick-confirm').hidden = false;
  }
  function collectAll() {
    var screens = {};
    document.querySelectorAll('.set').forEach(function (s) { screens[s.dataset.set] = readSet(s); });
    return { screens: screens };
  }
  function updateStatus() {
    var sets = document.querySelectorAll('.set'); var picked = 0;
    sets.forEach(function (s) { if (s.querySelector('input[type=radio]:checked')) picked++; });
    document.getElementById('submit-status').textContent = picked + ' de ' + sets.length + ' pantallas con elección';
  }
  function post(payload) {
    if (!hasServer) return Promise.resolve(null);
    return fetch('./api/feedback', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      .then(function (r) { return r.json(); }).catch(function () { return null; });
  }
  function showCopyFallback(payload) {
    var el = document.getElementById('success-msg');
    el.style.display = 'block';
    el.innerHTML = '<div class="warn">No hay conexión con el agente. Copia esto y pégalo en el chat:</div><pre>' + JSON.stringify(payload, null, 2).replace(/</g, '&lt;') + '</pre>';
  }
  var polling = false;
  function poll() {
    if (polling || !hasServer) return; polling = true;
    var n = 0;
    var t = setInterval(function () {
      n++;
      if (n > 900) { clearInterval(t); notice('Pasaron treinta minutos sin la ronda nueva. Mira la terminal.'); return; }
      fetch('./api/progress').then(function (r) { return r.json(); }).then(function (d) { if (d.status === 'serving') { clearInterval(t); location.reload(); } })
        .catch(function () { /* el agente está generando la ronda nueva y volverá a servir en este puerto; seguimos esperando */ });
    }, 2000);
  }
  function notice(text) { var el = document.getElementById('success-msg'); el.style.display = 'block'; el.textContent = text; }
  function regenerate(setEl, action) {
    var payload = collectAll(); payload.regenerated = true; payload.screen = setEl.dataset.set; payload.regenerateAction = action;
    post(payload).then(function (res) {
      // Un fallo se reintenta una vez: el agente puede estar relevantando el servidor en este mismo puerto.
      if (res && res.received) return res;
      return new Promise(function (ok) { setTimeout(function () { post(payload).then(ok); }, 2000); });
    }).then(function (res) {
      if (res && res.received) {
        setEl.querySelector('.variants').innerHTML = '<div class="regenerating"><div class="spinner"></div>Generando la ronda nueva de esta pantalla. Esta página se recarga sola cuando esté lista; no hace falta volver a la terminal.</div>';
        setEl.querySelector('.set-bottom').hidden = true;
        poll();
      } else { showCopyFallback(payload); }
    });
  }
  document.querySelectorAll('.set').forEach(function (setEl) {
    restoreSet(setEl);
    setEl.querySelectorAll('input[type=radio]').forEach(function (r) { r.addEventListener('change', function () { showPick(setEl, r); saveSet(setEl); updateStatus(); }); });
    setEl.querySelectorAll('.stars').forEach(function (starsEl) {
      var stars = starsEl.querySelectorAll('.star');
      stars.forEach(function (st) { st.addEventListener('click', function () {
        var val = parseInt(st.dataset.value, 10);
        stars.forEach(function (s) { s.classList.toggle('filled', parseInt(s.dataset.value, 10) <= val); });
        saveSet(setEl);
      }); });
    });
    setEl.querySelectorAll('.feedback-input, .direction').forEach(function (inp) { inp.addEventListener('input', function () { saveSet(setEl); }); });
    setEl.querySelectorAll('.regen-chiclet').forEach(function (ch) { ch.addEventListener('click', function () {
      setEl.querySelectorAll('.regen-chiclet').forEach(function (c) { c.classList.remove('active'); }); ch.classList.add('active');
    }); });
    setEl.querySelectorAll('.more-like-this').forEach(function (btn) { btn.addEventListener('click', function () { regenerate(setEl, 'more_like_' + btn.dataset.variant); }); });
    setEl.querySelector('.regen-btn').addEventListener('click', function () {
      var active = setEl.querySelector('.regen-chiclet.active');
      var custom = setEl.querySelector('.regen-custom').value.trim();
      regenerate(setEl, custom || (active ? active.dataset.action : 'different'));
    });
  });
  document.getElementById('submit-btn').addEventListener('click', function () {
    var payload = collectAll(); payload.regenerated = false;
    var missing = Object.keys(payload.screens).filter(function (k) { return !payload.screens[k].preferred; });
    if (missing.length && !confirm('Hay pantallas sin elección: ' + missing.join(', ') + '. ¿Enviar igual?')) return;
    post(payload).then(function (res) {
      if (res && res.received) {
        document.querySelectorAll('input, button, textarea').forEach(function (el) { el.disabled = true; });
        document.getElementById('submit-btn').hidden = true;
        notice('Elección enviada. Ya puedes cerrar esta pestaña: el agente sigue solo en la terminal.');
        setTimeout(function () { try { window.close(); } catch (e) {} }, 1200);
        try { document.querySelectorAll('.set').forEach(function (s) { localStorage.removeItem(storeKey(s)); }); } catch (e) {}
      } else { showCopyFallback(payload); }
    });
  });
  document.querySelectorAll('.view-toggle button').forEach(function (b) { b.addEventListener('click', function () {
    document.querySelectorAll('.view-toggle button').forEach(function (x) { x.classList.remove('active'); }); b.classList.add('active');
    document.body.classList.toggle('grid-view', b.dataset.view === 'grid');
  }); });
  updateStatus();
})();
`;

export function buildHtml(spec) {
  const title = spec.title || "Alternativas de diseño";
  const sets = spec.sets || [];
  const total = sets.reduce((n, s) => n + (s.variants || []).length, 0);
  const setsHtml = sets
    .map((s) => {
      const variants = (s.variants || [])
        .map(
          (v) => `
      <div class="variant" data-variant="${esc(v.label)}">
        <div class="variant-header"><span class="variant-label">Alternativa ${esc(v.label)}</span><span class="variant-name">${esc(v.name)}</span></div>
        <p class="variant-direction">${esc(v.direction)}</p>
        <a href="${esc(v.image)}" target="_blank" title="Abrir a tamaño completo"><img src="${esc(v.image)}" alt="Alternativa ${esc(v.label)}" loading="lazy" /></a>
        <div class="variant-controls">
          <label class="pick-label"><input type="radio" name="preferred-${esc(s.id)}" value="${esc(v.label)}" /><span class="pick-text">Elegir</span><span class="pick-confirm" hidden>Elegida</span></label>
          <div class="stars" data-variant="${esc(v.label)}">${[1, 2, 3, 4, 5].map((n) => `<span class="star" data-value="${n}">★</span>`).join("")}</div>
          <input type="text" class="feedback-input" data-variant="${esc(v.label)}" placeholder="Qué te gusta o no de esta" />
          <button type="button" class="more-like-this" data-variant="${esc(v.label)}">Más como esta</button>
        </div>
      </div>`,
        )
        .join("");
      return `
  <section class="set" data-set="${esc(s.id)}" data-round="${esc(s.round ?? 1)}">
    <div class="set-header"><h2>${esc(s.id)} · ${esc(String(s.title || "").replace(new RegExp("^" + s.id + "\\s*[·:-]?\\s*"), ""))}</h2><span class="round">ronda ${esc(s.round ?? 1)}</span></div>
    <div class="variants">${variants}
    </div>
    <div class="set-bottom">
      <div class="direction-col">
        <h3>Dirección para esta pantalla</h3>
        <textarea class="direction" placeholder="Combina o pide cambios: 'los pasos de A con el resumen de B', 'más aire entre campos'"></textarea>
      </div>
      <div class="regen-col">
        <h3>¿Otra ronda para esta pantalla?</h3>
        <div class="regen-controls">
          <button type="button" class="regen-chiclet" data-action="different">Totalmente distintas</button>
          <button type="button" class="regen-chiclet" data-action="match">Más apegadas al design system</button>
        </div>
        <input type="text" class="regen-custom" placeholder="Otra cosa: dime qué cambiar" />
        <button type="button" class="regen-btn">Regenerar esta pantalla</button>
      </div>
    </div>
  </section>`;
    })
    .join("\n");

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(title)}</title>
<style>${CSS}</style>
</head>
<body class="grid-view">
<header class="top">
  <h1>${esc(title)}</h1>
  <div class="meta">${sets.length} pantalla${sets.length === 1 ? "" : "s"} · ${total} alternativas
    <span class="view-toggle"><button data-view="list">Grande</button><button class="active" data-view="grid">Cuadrícula</button></span>
  </div>
</header>
${setsHtml}
<div class="bottom">
  <div id="submit-status" class="submit-status"></div>
  <button id="submit-btn" class="submit-btn">Enviar mi elección</button>
  <p class="hint">Se envía todo el tablero de una vez. Puedes regenerar una pantalla antes de enviar; lo elegido en las otras se conserva.</p>
</div>
<div id="success-msg" class="success-msg"></div>
<script>${JS}</script>
</body>
</html>
`;
}

function openBrowser(url, log) {
  const cmd = process.platform === "darwin" ? "open" : process.platform === "linux" ? "xdg-open" : null;
  if (!cmd) return log(`BOARD_BROWSER_MANUAL: abre ${url} en tu navegador`);
  try {
    const child = spawn(cmd, [url], { stdio: "ignore", detached: true });
    child.on("error", () => log(`BOARD_BROWSER_MANUAL: abre ${url} en tu navegador`));
    child.unref();
  } catch {
    log(`BOARD_BROWSER_MANUAL: abre ${url} en tu navegador`);
  }
}

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/plain; charset=utf-8",
};

export function startServer({ html, port = 0, timeout = 1800, open = true, onDone, quiet = false }) {
  const htmlPath = path.resolve(html);
  if (!fs.existsSync(htmlPath)) fail(`No existe ${htmlPath}`);
  const dir = fs.realpathSync(path.dirname(htmlPath));
  const name = path.basename(htmlPath);
  let state = "serving";
  let timer = null;
  const log = (m) => {
    if (!quiet) console.error(m);
  };
  const json = (res, code, obj) => {
    res.writeHead(code, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(obj));
  };
  const readBody = (req) =>
    new Promise((resolve, reject) => {
      let data = "";
      req.on("data", (c) => {
        data += c;
        if (data.length > 1_000_000) {
          reject(new Error("cuerpo demasiado grande"));
          req.destroy();
        }
      });
      req.on("end", () => resolve(data));
      req.on("error", reject);
    });

  const server = http.createServer(async (req, res) => {
    armTimeout();
    const url = new URL(req.url, "http://127.0.0.1");
    if (req.method === "GET" && url.pathname === "/api/progress") return json(res, 200, { status: state });

    if (req.method === "POST" && url.pathname === "/api/feedback") {
      let body;
      try {
        body = JSON.parse(await readBody(req));
      } catch {
        return json(res, 400, { error: "JSON inválido" });
      }
      if (!body || typeof body !== "object") return json(res, 400, { error: "Se esperaba un objeto" });
      const isSubmit = body.regenerated === false;
      const file = path.join(dir, isSubmit ? "feedback.json" : "feedback-pending.json");
      fs.writeFileSync(file, JSON.stringify(body, null, 2));
      log(`BOARD_FEEDBACK: ${isSubmit ? "enviado" : `regenerar ${body.screen || "?"} (${body.regenerateAction || "?"})`} -> ${file}`);
      if (isSubmit) {
        state = "done";
        json(res, 200, { received: true, action: "submitted" });
        setTimeout(() => {
          if (timer) clearTimeout(timer);
          server.close();
          onDone && onDone("submitted");
        }, 200);
        return;
      }
      state = "regenerating";
      json(res, 200, { received: true, action: "regenerate" });
      setTimeout(() => {
        if (timer) clearTimeout(timer);
        server.close();
        onDone && onDone("regenerate");
      }, 200);
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/reload") {
      await readBody(req).catch(() => "");
      state = "serving";
      log("BOARD_RELOADED");
      return json(res, 200, { reloaded: true });
    }

    if (req.method === "GET") {
      let rel = decodeURIComponent(url.pathname);
      if (rel === "/" || rel === "") rel = `/${name}`;
      let real;
      try {
        real = fs.realpathSync(path.resolve(dir, `.${rel}`));
      } catch {
        res.writeHead(404);
        return res.end("No encontrado");
      }
      if (!real.startsWith(dir + path.sep) || !fs.statSync(real).isFile()) {
        res.writeHead(403);
        return res.end("Fuera del tablero");
      }
      res.writeHead(200, { "Content-Type": TYPES[path.extname(real).toLowerCase()] || "application/octet-stream", "Cache-Control": "no-store" });
      return fs.createReadStream(real).pipe(res);
    }

    res.writeHead(404);
    res.end("No encontrado");
  });

  function armTimeout() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      log(`BOARD_TIMEOUT: ${timeout}s sin actividad`);
      server.close();
      onDone && onDone("timeout");
    }, timeout * 1000);
  }

  return new Promise((resolve) => {
    server.listen(port, "127.0.0.1", () => {
      const actualPort = server.address().port;
      const urlStr = `http://127.0.0.1:${actualPort}/${name}`;
      log(`BOARD_URL: ${urlStr}`);
      armTimeout();
      if (open) openBrowser(urlStr, log);
      resolve({
        server,
        port: actualPort,
        url: urlStr,
        close: () => {
          if (timer) clearTimeout(timer);
          server.close();
        },
      });
    });
  });
}

async function selfTest() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "codeable-board-"));
  const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==", "base64");
  const ids = ["P-A", "P-B"];
  for (const id of ids) {
    fs.mkdirSync(path.join(tmp, id, "r1"), { recursive: true });
    for (const l of ["A", "B", "C"]) fs.writeFileSync(path.join(tmp, id, "r1", `variant-${l}.png`), png);
  }
  const spec = {
    title: "Prueba",
    sets: ids.map((id) => ({
      id,
      title: `Pantalla ${id}`,
      round: 1,
      variants: ["A", "B", "C"].map((l) => ({ label: l, name: `Opción ${l}`, direction: `Dirección ${l}`, image: `${id}/r1/variant-${l}.png` })),
    })),
  };
  const out = path.join(tmp, "board.html");
  fs.writeFileSync(out, buildHtml(spec));
  let done;
  const finished = new Promise((r) => (done = r));
  const srv = await startServer({ html: out, port: 0, timeout: 30, open: false, quiet: true, onDone: done });
  const base = `http://127.0.0.1:${srv.port}`;
  const check = (cond, msg) => {
    if (!cond) {
      srv.close();
      fail(`SELF_TEST_FAILED: ${msg}`);
    }
  };
  const postJson = (p, body) => fetch(`${base}${p}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });

  let r = await fetch(`${base}/board.html`);
  check(r.status === 200 && (await r.text()).includes("P-B"), "el HTML no se sirve");
  r = await fetch(`${base}/P-A/r1/variant-A.png`);
  check(r.status === 200 && r.headers.get("content-type") === "image/png", "la imagen no se sirve");
  r = await fetch(`${base}/no-existe.png`);
  check(r.status === 404, "un archivo inexistente no da 404");
  r = await fetch(`${base}/api/progress`);
  check((await r.json()).status === "serving", "el estado inicial no es serving");
  r = await postJson("/api/feedback", { regenerated: true, screen: "P-A", regenerateAction: "more_like_B", screens: {} });
  check((await r.json()).received === true, "no acepta regenerar");
  const pending = JSON.parse(fs.readFileSync(path.join(tmp, "feedback-pending.json"), "utf8"));
  check(pending.screen === "P-A" && pending.regenerateAction === "more_like_B", "feedback-pending.json mal escrito");
  check((await finished) === "regenerate", "el servidor no cerró tras pedir regenerar");
  let done2;
  const finished2 = new Promise((r) => (done2 = r));
  const srv2 = await startServer({ html: out, port: 0, timeout: 30, open: false, quiet: true, onDone: done2 });
  const base2 = `http://127.0.0.1:${srv2.port}`;
  const postJson2 = (p, body) => fetch(`${base2}${p}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  r = await postJson2("/api/reload", {});
  check((await r.json()).reloaded === true, "no recarga");
  r = await fetch(`${base2}/api/progress`);
  check((await r.json()).status === "serving", "el segundo servidor no sirve");
  r = await postJson2("/api/feedback", {
    regenerated: false,
    screens: {
      "P-A": { preferred: "B", ratings: { A: 2, B: 5, C: 1 }, comments: { B: "los pasos se entienden solos" }, direction: null },
      "P-B": { preferred: "A", ratings: {}, comments: {}, direction: "más aire" },
    },
  });
  check((await r.json()).action === "submitted", "no acepta el envío");
  const fb = JSON.parse(fs.readFileSync(path.join(tmp, "feedback.json"), "utf8"));
  check(fb.screens["P-A"].preferred === "B" && fb.screens["P-B"].direction === "más aire", "feedback.json mal escrito");
  check((await finished2) === "submitted", "el servidor no cerró tras el envío");
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log("SELF_TEST_OK");
}

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  console.log(HELP);
  process.exit(0);
}
if (args.selfTest) {
  await selfTest();
  process.exit(0);
}
if (!args.sets || !args.out) fail(`Faltan --sets y --out.\n\n${HELP}`);

let spec;
try {
  spec = JSON.parse(fs.readFileSync(args.sets, "utf8"));
} catch (e) {
  fail(`No se pudo leer ${args.sets}: ${e.message}`);
}
if (args.title) spec.title = args.title;
if (!Array.isArray(spec.sets) || spec.sets.length === 0) fail("sets.json no tiene pantallas en 'sets'");
const outDir = path.dirname(path.resolve(args.out));
let total = 0;
for (const s of spec.sets) {
  if (!s.id || !Array.isArray(s.variants) || s.variants.length === 0) fail(`La pantalla ${s.id || "?"} no tiene alternativas`);
  for (const v of s.variants) {
    if (!v.label || !v.image) fail(`Una alternativa de ${s.id} no tiene label o image`);
    if (!fs.existsSync(path.resolve(outDir, v.image))) console.error(`BOARD_WARNING: no existe la imagen ${v.image} (relativa a ${outDir})`);
    total++;
  }
}
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(args.out, buildHtml(spec));
console.log(JSON.stringify({ out: args.out, sets: spec.sets.length, variants: total }));

if (args.serve) {
  await startServer({
    html: args.out,
    port: args.port,
    timeout: args.timeout,
    open: args.open,
    onDone: (why) => process.exit(why === "submitted" ? 0 : why === "regenerate" ? 3 : 1),
  });
  await new Promise(() => {});
}
