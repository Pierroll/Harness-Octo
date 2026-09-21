#!/usr/bin/env bash
# Se dispara solo al cerrar la sesion (hook SessionEnd de Claude Code).
# Deja el registro factual de la sesion en discovery/progress/history/.
# El resumen narrado lo escribe skills/session-log/ cuando la sesion se cierra a proposito;
# esto es la red de seguridad para cuando alguien cierra la terminal y se va.
set -uo pipefail

root="${CLAUDE_PROJECT_DIR:-$(pwd)}"
dir="$root/discovery/progress/history"
[ -d "$dir" ] || exit 0

payload=$(cat)
reason=$(printf '%s' "$payload" | python3 -c 'import json,sys; print(json.load(sys.stdin).get("reason","otro"))' 2>/dev/null || echo otro)
transcript=$(printf '%s' "$payload" | python3 -c 'import json,sys; print(json.load(sys.stdin).get("transcript_path",""))' 2>/dev/null || echo "")

today=$(date +%Y-%m-%d)
n=$(( $(ls "$dir"/${today}-*.md 2>/dev/null | wc -l | tr -d ' ') + 1 ))
out="$dir/${today}-${n}-auto.md"

changed=$(cd "$root" && git status --porcelain 2>/dev/null | sed 's/^/  /')
[ -z "$changed" ] && changed="  (sin cambios sin commitear)"
commits=$(cd "$root" && git log --since="6 hours ago" --oneline 2>/dev/null | sed 's/^/  /')
[ -z "$commits" ] && commits="  (ninguno)"

cat > "$out" <<TXT
# Sesion ${n} — ${today} (registro automatico)

Cierre: ${reason} · Hora: $(date +%H:%M)
Transcript: ${transcript:-no disponible}

## Archivos tocados
${changed}

## Commits de las ultimas horas
${commits}

## Resumen
Pendiente. La sesion se cerro sin pasar por \`harness/skills/session-log/\`, asi que no hay
resumen escrito. Para reconstruirlo, abre el transcript de arriba y corre el skill.
TXT

cur="$root/discovery/progress/current.md"
if [ -f "$cur" ] && ! grep -q "$(basename "$out")" "$cur"; then
  printf '\n> Sesion posterior sin resumir: history/%s\n' "$(basename "$out")" >> "$cur"
fi

exit 0
