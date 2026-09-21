# Inbox: lo que llega y todavía no sabes dónde va

Cuando el cliente corrige algo, llega un correo con un dato nuevo, o alguien del equipo
descubre que un documento aprobado quedó viejo, la información se deja aquí. No hay que
saber a qué etapa pertenece: eso lo decide `harness/skills/reopen-artifact/`.

**Qué se deja.** Un archivo por cosa que llegó, en markdown o tal como vino (`.eml`, `.pdf`,
captura). Nombre sugerido: `<YYYY-MM-DD>-<tema>.md`. Adentro, lo que llegó tal cual y una
línea de quién lo dijo y cuándo. También se puede pegar directo en el chat del agente y
saltarse el archivo.

**Qué se le dice al agente.** "Llegó esto, ¿qué cambia?" El agente lee, propone qué
documentos se tocan y qué checkpoints dejan de valer, y espera el "aplica".

**Después.** El archivo se mueve a `processed/` (se crea la primera vez que hace falta) y el registro de lo que se cambió queda en
`discovery/<etapa>/checkpoint/<fecha>-reopen-<tema>.md`. Esta carpeta debería estar vacía
casi siempre. Un archivo que lleva días aquí es información nueva que nadie procesó.

Los transcripts de sesión no van aquí: van en `discovery/2-analysis/inputs/`. Aquí va lo que
llega fuera de una sesión, o lo que sale de una sesión y contradice algo ya aprobado.
