# NOS MUEVE — Despliegue público en Cloudflare Pages

El sitio está en este repositorio, en la rama `main`. **No requiere descargar ni subir archivos HTML manualmente.**

## Configuración para Cloudflare Pages
- Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git.
- Proveedor: GitHub.
- Repositorio: `caye2404/todo-vuelve`.
- Rama de producción: `main`.
- Nombre de proyecto sugerido: `nos-mueve-caye` (si está disponible; modifica solamente el subdominio Pages).
- Framework preset: **None**.
- Build command: dejar vacío (sitio estático, sin proceso de build).
- Root directory: raíz del repositorio (valor predeterminado).
- Build output directory: `.` (raíz, donde está `index.html`).
- Activar automatic deployments en `main`.

## Comprobación después del despliegue
1. En Cloudflare, confirmar estado **Success** en el último deployment.
2. Abrir la URL exacta `*.pages.dev` que emite Cloudflare (no inventarla).
3. Revisar fotos en `assets/img`, los dos videos en `assets/video`, navegación móvil, juegos y botones de aportes.
4. Confirmar que el repositorio GitHub esté **Public** si el propietario así lo quiere. Cloudflare Pages acepta repositorios públicos y privados.
5. Dejar `nucleo-app` y `cayelab-web` sin modificar.

## Nota importante
El material visual y personal que contiene el sitio quedará visible públicamente tras desplegarlo. Los aportes voluntarios no compran números, premios ni oportunidades de ganar; jugar es gratis.

Documentación de referencia: https://developers.cloudflare.com/pages/get-started/git-integration/
