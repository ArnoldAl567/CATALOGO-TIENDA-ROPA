# MAISON MODE

Catálogo de moda con Angular y panel editorial en Sanity Studio. Permite administrar productos, fotos por color, tallas, existencias, categorías, precios, ofertas y los datos de contacto de la tienda. Los pedidos se preparan para WhatsApp; no se cobran ni reservan existencias automáticamente.

## Desarrollo local

Requisitos: Node.js 22.12 o superior, npm 10 y, solo para cargar la colección de muestra, `ffmpeg`.

```bash
npm install
npm --prefix studio install
npm start
```

La tienda abre en `http://localhost:4200`. El panel ya está publicado en [maison-mode-catalogo.sanity.studio](https://maison-mode-catalogo.sanity.studio/). También puedes abrirlo localmente con `npm run studio` en otra terminal (`http://127.0.0.1:3333`).

## Sanity configurado

El proyecto `9krd69tb` y el dataset público `production` están configurados en [`sanity.project.json`](sanity.project.json). El panel contiene 8 categorías, 24 productos con 48 fotografías recortadas por color y los datos básicos de la tienda. La tienda consulta únicamente documentos publicados y nunca lleva un token de edición al navegador. Los orígenes `http://localhost:4200` y `http://127.0.0.1:4200` están autorizados sin credenciales.

1. Abre el [panel](https://maison-mode-catalogo.sanity.studio/) con la cuenta de Sanity dueña del proyecto.
2. En **Datos de la tienda**, revisa el WhatsApp, completa un correo real y la cuenta de Instagram, añade una fotografía de portada y publica los cambios.
3. En **Productos**, edita precios, tallas, existencias y fotos. Cada color tiene su propia galería: sube fotografías donde la prenda coincida con el color indicado.
4. Cuando publiques la tienda en un dominio real, autoriza ese origen sin credenciales en CORS de Sanity. No uses comodines.

`npm --prefix studio run seed` vuelve a crear solamente documentos que falten; usa IDs estables y no reemplaza cambios posteriores del editor. Requiere `ffmpeg`. Para revisar cuántos elementos prepararía, ejecuta `node --experimental-strip-types scripts/seed-catalog.ts --dry-run` desde `studio/`.

Si la consulta a Sanity falla, la tienda muestra un mensaje de error y un botón para reintentar. Si se quita temporalmente el Project ID, vuelve al catálogo local de demostración.

## Operación editorial

- **Producto:** nombre, enlace, colección, categoría, precio, descripción, materiales, etiqueta y publicación.
- **Color:** código, nombre, muestra hexadecimal, fotos del color y existencias por talla. Cambiar el color en la tienda cambia también la galería de la prenda.
- **Categoría:** nombre, enlace y orden.
- **Datos de la tienda:** WhatsApp, correo, Instagram, ubicación y textos de portada. WhatsApp debe tener código de país, sin `+` ni espacios.

Guarda y **publica** los documentos para que aparezcan en el catálogo. Los borradores permanecen fuera de la consulta pública. La CDN de Sanity puede tardar un momento en reflejar una publicación; recarga la tienda para ver cambios recientes.

## Comprobación

```bash
npm run build
npm test -- --watch=false
npm --prefix studio run typecheck
npm run studio:build
```

El catálogo se genera en `dist/maison-mode/browser`; el panel se genera en `studio/dist`. Después de cambiar el esquema o la interfaz del panel, actualízalo con `npm --prefix studio run deploy`. En un alojamiento estático, configura la redirección de rutas de Angular hacia `index.html`.

## Pedidos

El carrito se guarda en el navegador. Al finalizar, se valida la disponibilidad visible y se abre WhatsApp con el resumen. La tienda debe confirmar disponibilidad, entrega y costo final con el cliente. Sanity es un gestor de contenido, por lo que esta versión no descuenta stock ni registra pedidos en un servidor.
