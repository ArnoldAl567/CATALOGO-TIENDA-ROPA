import { PRODUCTS } from '../data/catalog.data';
import { buildOrderMessage, filterProducts, getVariant, imagesForColor, mainImageForColor, validateCustomer, validateQuantity, whatsappUrl } from './store.utils';

describe('catálogo y variantes', () => {
  it('combina búsqueda, categoría, talla y ordenamiento', () => {
    const found = filterProducts(PRODUCTS, { query: 'camisa', category: 'camisas', size: 'M', sort: 'price-asc' });
    expect(found.length).toBeGreaterThan(1);
    expect(found.every(product => product.categoryId === 'camisas')).toBe(true);
    expect(found.map(product => product.price)).toEqual([...found.map(product => product.price)].sort((a, b) => a - b));
  });
  it('rechaza tallas sin stock y cantidades superiores al inventario', () => {
    const product = PRODUCTS[0]; const color = product.variants[0].colorId;
    expect(getVariant(product, color, 'M')).toBeDefined();
    expect(validateQuantity(product, color, 'M', 1)).toBe(true);
    expect(validateQuantity(product, color, 'M', 999)).toBe(false);
    expect(validateQuantity(product, color, 'M', 0)).toBe(false);
    expect(validateQuantity(product, 'inexistente', 'M', 1)).toBe(false);
  });
  it('todas las variantes de color tienen fotos propias y correctas en los 24 productos', () => {
    expect(PRODUCTS).toHaveLength(24);
    for (const product of PRODUCTS) {
      const colorIds = [...new Set(product.variants.map(variant => variant.colorId))];
      expect(colorIds).toHaveLength(2);
      expect(product.images).toHaveLength(colorIds.length * 2);
      const quadrants = colorIds.map(colorId => {
        const photos = imagesForColor(product, colorId);
        const main = mainImageForColor(product, colorId);
        const colorName = product.variants.find(variant => variant.colorId === colorId)!.colorName;
        expect(photos.map(photo => photo.view)).toEqual(['full', 'detail']);
        expect(photos.every(photo => photo.colorId === colorId && photo.url.startsWith('/product-atlases/'))).toBe(true);
        expect(main?.alt).toContain(colorName);
        return main?.quadrant;
      });
      expect(new Set(quadrants).size).toBe(colorIds.length);
    }
  });
});

describe('pedido por WhatsApp', () => {
  const customer = { fullName: 'Ana Pérez', phone: '999888777', fulfillment: 'delivery' as const, address: 'Av. Central 123, Lima', reference: 'Puerta azul', notes: 'Entregar por la tarde' };
  it('valida nombre y dirección solo cuando corresponden', () => {
    expect(validateCustomer({ ...customer, fullName: '', address: '' })).toHaveProperty('fullName');
    expect(validateCustomer({ ...customer, fulfillment: 'pickup', address: '' })).toEqual({});
  });
  it('incluye variantes, subtotales, total y datos del cliente', () => {
    const product = PRODUCTS[0];
    const order = { items: [{ productId: product.id, colorId: product.variants[0].colorId, size: 'M', quantity: 2 }], customer, total: product.price * 2 };
    const message = buildOrderMessage(order, PRODUCTS);
    expect(message).toContain(product.name);
    expect(message).toContain('Talla: M');
    expect(message).toContain('Cantidad: 2');
    expect(message).toContain('TOTAL: S/ 778.00');
    expect(message).toContain('Dirección: Av. Central 123, Lima');
    expect(message).toContain('costo de envío');
    expect(whatsappUrl(message)).toContain(encodeURIComponent(message));
  });
});
