# MAISON MODE

Catálogo digital de moda creado con Angular standalone, Signals y Tailwind CSS. Permite explorar 24 productos de demostración, filtrar por colección, categoría, talla, color y precio; seleccionar variantes; guardar el carrito en el navegador; y preparar un pedido para WhatsApp.

## Inicio rápido

Requisitos: Node.js 22.12 o superior y npm 10 o superior.

```bash
npm install
npm start
```

Abre `http://localhost:4200`. Para comprobar el proyecto:

```bash
npm run build
npm test -- --watch=false
```

## Personalización

1. Edita [`src/app/core/store.config.ts`](src/app/core/store.config.ts): nombre, número de WhatsApp, correo y redes. **Para activar los pedidos, introduce el número real con código de país, sin `+` ni espacios**. Ejemplo de formato peruano: `51987654321`. El valor inicial está vacío para evitar dirigir pedidos a un número ajeno.
2. Edita [`src/app/data/catalog.data.ts`](src/app/data/catalog.data.ts) para cambiar los productos, precios, tallas, colores y existencias de demostración. Cada combinación de talla y color tiene su propio `stock` y una foto específica.
3. Ajusta los colores y las tipografías en [`src/styles.css`](src/styles.css). El logotipo tipográfico está en [`src/app/app.html`](src/app/app.html) y el ícono de la pestaña en [`public/favicon.svg`](public/favicon.svg).
4. Sustituye las imágenes generadas de demostración por fotografías reales de tus prendas antes de usar el catálogo comercialmente. Las 24 prendas cuentan con dos colores visibles en 12 archivos WebP locales en [`public/product-atlases`](public/product-atlases). Cada archivo tiene una cuadrícula de dos productos por dos colores. Al reemplazar un producto, conserva una foto por color y ajusta su asignación en `PRODUCT_ATLASES`, `ATLAS_SHAPES` y `seed.colorIds`. Las imágenes del inicio siguen siendo editoriales de Unsplash y requieren Internet.

El correo `.example` es de demostración y debe sustituirse. Los enlaces de redes también deben apuntar a las cuentas de la tienda.

## Estructura

- `core/`: configuración, servicios y reglas de negocio.
- `models/`: interfaces TypeScript para productos, variantes, carrito, clientes y pedidos.
- `data/`: catálogo de demostración.
- `shared/`: tarjeta reutilizable de producto.
- `features/`: inicio, catálogo, producto, carrito, checkout y contacto. Cada página se carga de forma diferida.

## Flujo de pedido

El carrito se guarda en `localStorage` y suma cantidades solo cuando coinciden producto, color y talla. En el checkout se validan los datos obligatorios, las variantes y el stock de demostración. El mensaje se construye y codifica con `encodeURIComponent`, y se abre en `https://wa.me/NUMERO?text=...`. **Abrir WhatsApp no vacía el carrito**, porque no confirma que el mensaje se haya enviado.

El costo de envío no se suma al total. La disponibilidad final y el precio del envío se confirman con la tienda. No hay backend ni sincronización de inventario: los valores de stock son solo de demostración.

## Publicación

`npm run build` genera la aplicación en `dist/maison-mode/browser`. Para publicar en un alojamiento estático, sirve esa carpeta y configura una redirección de las rutas no encontradas hacia `index.html`, necesaria para Angular Router.
