# TODO VUELVE — campaña de crowdfunding para NÚCLEO

La etapa pública de TODO VUELVE impulsa el desarrollo de **NÚCLEO**, una herramienta web para ayudar a pequeños comercios y emprendimientos a organizar proveedores, facturas, vencimientos, pagos y conciliaciones.

## Enlaces

- Campaña pública: https://caye2404.github.io/todo-vuelve/
- CayeLab — servicios de páginas web, soporte IT y automatizaciones: https://caye2404.github.io/cayelab-web/
- Antiguo panel del sorteo: retirado; los accesos administrativos ahora se realizan en https://nucleo.benitez-lencina.workers.dev/

## Sitio público

- `index.html`: presentación de NÚCLEO, crowdfunding, aportes con Banco Galicia y PayPal, avances y oferta de servicios.
- `campana.json`: importe de **recaudación confirmada**, sin meta fija. **`recaudado_confirmado: null` significa "sin cifra verificable publicada", no cero pesos recibidos**. No cargar ingresos no conciliados. La barra es un recurso visual de crecimiento con escala abierta; **no representa un porcentaje ni un objetivo en pesos**.
- `numeros.html`: redirige a la campaña. La numeración ya no se muestra públicamente.

La campaña **no ofrece números, premios, rifas ni sorteos**. Las contribuciones son voluntarias al desarrollo de un proyecto privado y no otorgan derechos societarios. Los enlaces de pago no se vinculan a participaciones.

## Historial privado anterior

Los registros de las participaciones de la etapa anterior **no se borraron**. Se conservan en el esquema privado de Supabase y permanecen accesibles únicamente en el panel `admin.html` / `admin.js`, protegido con Supabase Auth.

No alterar ni eliminar pagos, comprobantes, participantes o historial de etapas anteriores para crear esta nueva campaña. Las obligaciones con participantes anteriores se revisan individualmente y se resuelven por separado.

## Tecnología y publicación

- GitHub Pages publica esta web desde la rama `main`.
- Supabase conserva la información privada histórica, fuera de la campaña pública actual.
- Las contribuciones por Galicia y PayPal **no se sincronizan automáticamente**: reconciliarlas fuera del sitio antes de reflejar un monto en `campana.json`.
- El panel privado no fue sustituido ni expuesto.
- Comprobar el resultado de GitHub Actions y la web pública luego de cada cambio.
- Nunca añadir credenciales, comprobantes o datos personales a este repositorio público.
