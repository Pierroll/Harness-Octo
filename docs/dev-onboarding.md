# Onboarding de Desarrolladores — OCTO Harness

Bienvenido/a al equipo. Antes de que puedas ejecutar el skill de `dev-onboarding` y empezar a resolver casos de mantenimiento, necesitas asegurarte de tener listos estos permisos y herramientas en tu máquina.

Estos pasos son **estrictamente manuales**; el arnés no puede automatizarlos por seguridad y arquitectura de la plataforma.

## 1. Acceso de Colaborador Git
Necesitas permisos de clonado y push al repositorio de código fuente.
- Si no los tienes, solicítalos al administrador del repositorio o a tu líder técnico. Ellos deben agregarte como Colaborador (Collaborator) en GitHub.
- Asegúrate de tener tus llaves SSH o credenciales configuradas localmente para poder hacer `git fetch` y `git push`.
- *Importante:* Este permiso de red/Git es distinto al del Token de API (PAT). Necesitas ambos.

## 2. Token de Acceso Personal (PAT) para Issues
Para que el arnés interactúe con la API de GitHub (leyendo, asignando y creando issues), necesitas proveer un token.
- Genera un Personal Access Token (Classic o Fine-grained) en GitHub asegurándote de que tenga permisos de lectura y escritura sobre **Issues**.
- Crea un archivo `.env` en la raíz de este proyecto (nuestro `.gitignore` ya lo excluye por defecto) y guarda tu token allí:
  `GH_TOKEN=tu_token_aqui`
- *Nota Arquitectónica:* El arnés aísla este token por proyecto mediante subshells. El agente de IA nunca leerá la cadena de texto de tu credencial global, protegiendo así tus permisos de cruces de información.

## 3. Instalación de Herramientas Obligatorias
Antes de operar, tu máquina debe contar con:
- **GitHub CLI (`gh`):** Instálalo mediante el gestor de tu sistema operativo (ej. `brew install gh` en macOS).
- **Graphify:** Herramienta obligatoria para explorar la arquitectura del código mediante AST sin saturar el contexto de la IA. Instálalo a nivel global (`uv tool install graphifyy`), regístralo (`graphify install`), y regenera el grafo con `/graphify .`. (Lee `docs/graphify-setup.md` para el paso a paso exacto).

## 4. Flujo de Trabajo (Namespacing)
Una vez superados los 3 pasos de arriba, abre tu agente de IA y pídele ejecutar el procedimiento `skills/dev-onboarding/`.
- El agente pasará un checklist técnico y listará tus issues asignadas.
- Al elegir resolver una, el agente creará una carpeta de trabajo única bajo `stages/4-maintenance/cases/<numero-de-issue>/`.
- **Regla inquebrantable:** Todo el trabajo de análisis de causa raíz y reparación de esa issue en particular ocurrirá bajo esa subcarpeta. Esta es la convención oficial de OCTO para evitar colisiones si otro colega clona el mismo repositorio para trabajar en paralelo en un issue distinto.
