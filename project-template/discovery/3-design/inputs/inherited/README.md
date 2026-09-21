# Paquete heredado — etapa 3

Usa esta carpeta **solo si este proyecto no corrió la etapa 2**. Es la bandeja de
entrada: dejas aquí el análisis que ya existe (otro discovery, un TDR, un proveedor).

`entry-check` mira aquí primero. Si el archivo sirve, lo **copia** a su sitio de
trabajo para que los skills de diseño no tengan que adivinar la ruta. Esta carpeta
no se edita después.

Un README o un archivo con `<placeholders>` no cuenta. Tener transcripts de reuniones
y nada de esto es **no entra**.

| Archivo (nombre fijo) | Qué es | Sitio de trabajo después del chequeo |
|---|---|---|
| `requirements-full.md`, o `Requisitos.docx` si solo existe el Word | Catálogo RF detallado y RNF, auditado | `discovery/2-analysis/outputs/` (mismo nombre) |
| `scope-decisions.md` | Qué quedó dentro, fuera o diferido | `discovery/2-analysis/outputs/scope-decisions.md` |
| `inventory-sources.md` | Fuentes externas e integraciones | `discovery/2-analysis/outputs/inventory-sources.md` |
| `gaps-and-risks.md` | Registro de riesgos vivo | `discovery/3-design/outputs/gaps-and-risks.md`, donde la etapa lo refina |
| `design-brief.md` | Entendimiento para diseño, con fecha de vigencia | `discovery/2-analysis/outputs/design-brief.md` |

`overrides.md` (restricciones del cliente) se completa en la **raíz** del repo, no aquí.

Si falta el brief o las decisiones de alcance, no los inventes. El chequeo marca hueco.
Un RF sobre alcance que el cliente no confirmó invalida el catálogo.
