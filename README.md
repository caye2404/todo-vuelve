# TODO VUELVE

Sitio independiente y sistema de numeración de TODO VUELVE.

## Enlaces publicados

- Portada: https://caye2404.github.io/todo-vuelve/
- Consulta pública de números: https://caye2404.github.io/todo-vuelve/numeros.html
- Panel privado: https://caye2404.github.io/todo-vuelve/admin.html
- CayeLab: https://caye2404.github.io/cayelab-web/

## Tecnología

- **GitHub Pages** sirve la portada, la consulta y el panel.
- **Supabase** guarda los 300 números (001-300), participantes, estados, auditoría y copias internas.
- **Cloudflare no es parte de esta publicación**. No hace falta habilitar otra base de datos.
- El sitio público muestra únicamente número y estado; no muestra datos de participantes.
- El panel utiliza una cuenta previamente autorizada mediante Supabase Auth; las credenciales no se guardan en GitHub.

## Páginas

- `index.html`: portada, historia, aportes personales independientes y servicios.
- `numeros.html`: consulta de los 300 números, búsqueda, filtros y estados públicos.
- `admin.html` + `admin.js`: acceso administrativo protegido, edición manual y herramientas de respaldo.

## Respaldos

1. Los números están en la tabla privada `todo_vuelve.numeros` de Supabase.
2. `todo_vuelve.historial_completo` guarda las versiones anteriores y nuevas cuando cambia un registro.
3. `todo_vuelve.copias_seguridad` conserva fotografías completas, privadas, de la numeración. Se generó una copia inicial de 300 registros.
4. Desde el panel privado, `Crear copia interna` guarda una copia completa adicional dentro de Supabase.
5. Desde el panel privado, `Descargar respaldo` genera un JSON con los registros visibles. Guardar periódicamente una copia **fuera de Supabase**, en un lugar privado, es indispensable frente a una pérdida total de ese proveedor.

**Importante:** una copia interna en la misma base no reemplaza un respaldo externo independiente.

## Aportes y edición numerada

Los botones de Banco Galicia y PayPal son para aportes personales voluntarios independientes, sin asignar números ni generar derechos a premios. Los montos recibidos no se concilian automáticamente en esta aplicación y deben verificarse con los extractos del banco o de PayPal.

La consulta de números está publicada y operativa, pero **la venta de participaciones pagas permanece deshabilitada** hasta verificar los requisitos legales y las bases definitivas. No deben mezclarse los registros y obligaciones de ediciones anteriores con la numeración nueva.

## Publicación

Cada cambio a la rama `main` activa el despliegue de GitHub Pages. Comprobar el estado en la pestaña Actions del repositorio antes de anunciar una actualización.

No incorporar nombres, teléfonos, comprobantes o contraseñas en este repositorio público.
