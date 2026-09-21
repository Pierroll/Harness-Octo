# Plantilla de repo de discovery

Esto se copia para arrancar el discovery de un cliente nuevo. Pasos (también en el
README del arnés):

```bash
cp -r harness-product/project-template/ discovery-<cliente>/
cd discovery-<cliente> && git init -b main
git submodule add <url-de-harness-product> harness
ln -sf AGENTS.md CLAUDE.md   # por si la copia no preservó el symlink
git add -A && git commit -m "Discovery de <cliente>: arranque con harness"
```

## Arranque desde la etapa 1

1. Declara la modalidad en la primera línea de `overrides.md` (las tres están en
   `harness/stages/modalities.md`).
2. Completa `AGENTS.md` y el resto de `overrides.md`.
3. Pon la propuesta comercial firmada, y si existen los transcripts de las **llamadas
   comerciales** (no las de d1, d2, d3), en `discovery/1-planning/inputs/`.
4. Copia `harness/templates/backlog.md` a la raíz y `harness/templates/stage-checklist.md`
   a `discovery/1-planning/checkpoint/`.
5. Corre `harness/skills/entry-check/` y arranca `harness/stages/1-planning/STAGE.md`.

## Arranque desde la etapa 2 o la 3

Se puede. Una etapa se abre por sus entradas, no por haber corrido la anterior.

1. En la primera línea de `overrides.md` declara la modalidad **y** a qué etapa
   entras. Ejemplo:

   ```markdown
   **Modalidad:** discovery · transcripts de d1–d6 en `discovery/2-analysis/inputs/` ·
   chequeo de entrada en `discovery/2-analysis/checkpoint/entry-check.md` ·
   cierra en requisitos detallados
   ```

2. Abre `discovery/<etapa>/inputs/start-here.md`. Transcripts (o material crudo) van
   en `inputs/`. Lo que habría producido la etapa que no corriste va en
   `inputs/inherited/`, con los nombres fijos de esa carpeta.
3. Al agente: *Abre la etapa 2. Corre `entry-check`. El paquete heredado está en
   `inputs/inherited/`. No corras la etapa anterior completa.*
4. El procedimiento está en `harness/skills/entry-check/`. Los tres veredictos son:
   entra, entra con huecos, no entra.

Si el proyecto no arranca desde cero, `entry-check` se corre **antes de producir nada**.

Cada sesión de trabajo abre y cierra con `harness/skills/session-log/`, que mantiene
`discovery/progress/`. La primera sesión lo crea. Si la sesión se cierra sin pasar por el skill, el hook
`.claude/hooks/session-end.sh` deja igual el registro factual en `progress/history/`.

`friction-log.md` en la raíz lo llena el agente cuando el arnés estorba, y cada fila se
vuelve un issue en `harness-product` (`harness/skills/friction-log/`). Hace falta `gh`
autenticado en la máquina del PM; si no está, las filas quedan marcadas "no enviada".

El mapa de carpetas vive en `discovery/README.md` y no se borra. Este README de arranque
sí se puede borrar una vez instanciado el proyecto.
