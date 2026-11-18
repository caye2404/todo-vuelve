# NOS MUEVE — Versión 2 / relato cronológico

Sitio estático (HTML, CSS, JavaScript) preparado para la cuenta de GitHub `caye2404/todo-vuelve` y el Worker `nosmueve.benitez-lencina.workers.dev`. No es NÚCLEO ni CayeLab.

## Recorrido
1. Ramos Mejía · antes
2. El quiebre · el remate
3. Laferrere · pertenencias en el pasto
4. Villa del Parque · vida precaria
5. La valija · decisión de viajar
6. Villa La Angostura · nueva etapa
7. Hoy · proyectos y reconstrucción

## Interacción
Navegación y progreso al desplazarse, capítulos desplegables, bloque final «¿Qué te mueve hoy?» y opción de compartir/colaborar voluntariamente. No hay memotest ni otros minijuegos. Las respuestas no se guardan ni envían a servidores.

## Archivos reales y precisión
Las 18 imágenes WebP fueron verificadas en la copia de trabajo: no poseen campos EXIF. No usar rutas `/fotos/...` que no existen en este repositorio; se mantienen las rutas reales `assets/img/` para evitar imágenes rotas. Los posters están en `assets/posters/`. Las imágenes de archivo junto a Ramos Mejía o Villa La Angostura son recuerdos de otras etapas, sin atribuirles fecha ni lugar concreto de captura no confirmados. En el caso de querer usar fotografías concretas de Ramos Mejía, sustituirlas solamente después de identificar su procedencia.

## Video y protección de metadatos
Los videos de la versión anterior contenían metadatos de fecha/dispositivo. Para cumplir la consigna de privacidad se generaron copias **sin metadatos incrustados** mediante remux FFmpeg. Verificar las copias que se suban a GitHub antes de publicar. Ojo: si una versión anterior estuvo disponible públicamente en GitHub, sus archivos pueden permanecer en el historial del repositorio o en cachés, aunque las copias actuales estén limpias.

## Publicación
Conservar ambos enlaces de medios de pago opcionales, fuera de todo mecanismo de participación. Las estadísticas de recaudación no se inventan. El despliegue a Cloudflare debe revisarse: la rama `main` todavía dispara comprobaciones del Worker `apoyarnucleo`; no modificar ese proyecto sin comprobar la configuración de Cloudflare. Una rama de revisión permite evaluar V2 sin reemplazar automáticamente el sitio público.