import { Category, Product, ProductVariant } from '../models/store.models';

const photo = (id: string, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;

export const CATEGORIES: Category[] = [
  { id: 'abrigos', name: 'Abrigos', description: 'Capas de carácter atemporal', image: photo('photo-1716004361175-45cc991f2bf5', 900) },
  { id: 'camisas', name: 'Camisas', description: 'Esenciales para cada día', image: photo('photo-1598032895397-b9472444bf93', 900) },
  { id: 'tops', name: 'Tops y camisetas', description: 'La base de cualquier look', image: photo('photo-1770294758906-c8762abb2c8b', 900) },
  { id: 'pantalones', name: 'Pantalones', description: 'Siluetas en movimiento', image: photo('photo-1515886657613-9f3515b0c78f', 900) },
  { id: 'vestidos', name: 'Vestidos', description: 'Movimiento con personalidad', image: photo('photo-1595777457583-95e059d581b8', 900) },
  { id: 'faldas', name: 'Faldas', description: 'Líneas que fluyen', image: photo('photo-1610012524938-137710a1a928', 900) },
  { id: 'tejidos', name: 'Tejidos', description: 'Texturas para cada día', image: photo('photo-1599148118350-6fae980c289c', 900) },
  { id: 'accesorios', name: 'Accesorios', description: 'El detalle que completa', image: photo('photo-1691480250099-a63081ecfcb8', 900) },
];

type Color = readonly [id: string, name: string, hex: string];
const colors: Record<string, Color> = {
  marfil: ['marfil', 'Marfil', '#e9e5d9'], arena: ['arena', 'Arena', '#c7baa7'],
  negro: ['negro', 'Negro', '#292927'], oliva: ['oliva', 'Oliva', '#777c60'],
  chocolate: ['chocolate', 'Chocolate', '#665447'], azul: ['azul', 'Azul', '#5f7080'],
  blanco: ['blanco', 'Blanco', '#f6f5f0'], terracota: ['terracota', 'Terracota', '#b47f6b'],
};
const apparelSizes = ['XS', 'S', 'M', 'L', 'XL'];
const trouserSizes = ['28', '30', '32', '34', '36'];

interface ProductSeed {
  id: string; name: string; categoryId: string; audience: Product['audience']; price: number;
  colorIds: string[]; sizes?: string[]; badge?: Product['badge'];
  previousPrice?: number; material: string; description: string; featured?: boolean;
}

// Each atlas contains two products (rows) and their two photographed colors (columns).
const PRODUCT_ATLASES = [
  '01-outerwear-women.webp', '02-tops-women.webp', '03-pants-dress-women.webp',
  '04-trench-skirt-women.webp', '05-cardigan-jeans-women.webp', '06-jacket-shirt-men.webp',
  '07-knit-pants-men.webp', '08-overshirt-tee-men.webp', '09-coat-jeans-men.webp',
  '10-linen-sweat-men.webp', '11-bag-belt.webp', '12-glasses-scarf.webp',
] as const;
const ATLAS_SHAPES = [
  'tall', 'portrait', 'tall', 'tall', 'portrait', 'portrait',
  'tall', 'tall', 'tall', 'tall', 'wide', 'wide',
] as const;

const seeds: ProductSeed[] = [
  { id: 'abrigo-atelier', name: 'Trench Atelier', categoryId: 'abrigos', audience: 'mujer', price: 389, colorIds: ['arena', 'negro'], badge: 'Más vendido', material: 'Gabardina de algodón', description: 'Una silueta amplia y elegante para acompañarte durante muchas temporadas.', featured: true },
  { id: 'blazer-siena', name: 'Blazer Siena estructurado', categoryId: 'abrigos', audience: 'mujer', price: 279, colorIds: ['arena', 'oliva'], badge: 'Nuevo', material: 'Lino y algodón', description: 'Sastrería relajada con líneas limpias y caída impecable.', featured: true },
  { id: 'camisa-lino', name: 'Camisa de lino esencial', categoryId: 'camisas', audience: 'mujer', price: 149, colorIds: ['blanco', 'azul'], badge: 'Nuevo', material: '100% lino natural', description: 'Ligera, fresca y fácil de combinar en cualquier estación.', featured: true },
  { id: 'top-nora', name: 'Top Nora sin mangas', categoryId: 'tops', audience: 'mujer', price: 89, colorIds: ['marfil', 'negro'], material: '100% algodón pima', description: 'Una pieza de tacto suave que eleva lo cotidiano.', featured: true },
  { id: 'pantalon-wide', name: 'Pantalón Wide Leg', categoryId: 'pantalones', audience: 'mujer', price: 189, colorIds: ['arena', 'negro'], sizes: trouserSizes, badge: 'Más vendido', material: 'Sarga de algodón', description: 'Cintura alta y pierna amplia en una silueta naturalmente sofisticada.', featured: true },
  { id: 'vestido-amelie', name: 'Vestido Amélie fluido', categoryId: 'vestidos', audience: 'mujer', price: 229, colorIds: ['terracota', 'negro'], badge: 'Nuevo', material: 'Viscosa responsable', description: 'Movimiento suave y un corte favorecedor para días memorables.' },
  { id: 'trench-noa', name: 'Trench Noa clásico', categoryId: 'abrigos', audience: 'mujer', price: 349, colorIds: ['arena', 'oliva'], material: 'Gabardina de algodón', description: 'El abrigo de entretiempo que siempre vuelve a tu armario.' },
  { id: 'falda-midi', name: 'Falda midi Alba', categoryId: 'faldas', audience: 'mujer', price: 159, previousPrice: 199, badge: 'Oferta', colorIds: ['negro', 'marfil'], material: 'Satén de viscosa', description: 'Una caída sutil y luminosa para crear looks sin esfuerzo.' },
  { id: 'cardigan-arles', name: 'Cárdigan Arles tejido', categoryId: 'tejidos', audience: 'mujer', price: 199, colorIds: ['marfil', 'chocolate'], material: 'Algodón orgánico', description: 'Textura envolvente y diseño delicado para llevar todo el año.' },
  { id: 'jean-recto-m', name: 'Jean recto Épure', categoryId: 'pantalones', audience: 'mujer', price: 179, colorIds: ['azul', 'negro'], sizes: trouserSizes, material: 'Denim de algodón', description: 'El denim esencial con un fit cómodo y refinado.' },
  { id: 'chaqueta-roma', name: 'Chaqueta Roma', categoryId: 'abrigos', audience: 'hombre', price: 319, colorIds: ['negro', 'oliva'], badge: 'Nuevo', material: 'Algodón de doble faz', description: 'Una capa contemporánea con estructura ligera y detalles precisos.', featured: true },
  { id: 'camisa-oxford', name: 'Camisa Oxford', categoryId: 'camisas', audience: 'hombre', price: 169, colorIds: ['blanco', 'azul'], badge: 'Más vendido', material: '100% algodón', description: 'La camisa impecable que acompaña del trabajo al fin de semana.', featured: true },
  { id: 'polo-alto', name: 'Polo Alto de punto', categoryId: 'tejidos', audience: 'hombre', price: 189, colorIds: ['negro', 'arena'], material: 'Algodón premium', description: 'Punto suave y corte limpio para un estilo sereno.', featured: true },
  { id: 'pantalon-sastre', name: 'Pantalón de sastre', categoryId: 'pantalones', audience: 'hombre', price: 209, colorIds: ['chocolate', 'negro'], sizes: trouserSizes, material: 'Lana ligera y viscosa', description: 'Confección precisa para una elegancia cómoda.' },
  { id: 'sobrecamisa-olivo', name: 'Sobrecamisa Olivo', categoryId: 'camisas', audience: 'hombre', price: 219, colorIds: ['oliva', 'arena'], badge: 'Nuevo', material: 'Algodón lavado', description: 'Versátil y ligera, ideal para llevar en capas.' },
  { id: 'camiseta-premium', name: 'Camiseta Premium', categoryId: 'tops', audience: 'hombre', price: 99, colorIds: ['negro', 'blanco'], material: 'Algodón pima peruano', description: 'La base perfecta con un tacto excepcional.' },
  { id: 'abrigo-milano', name: 'Abrigo Milano', categoryId: 'abrigos', audience: 'hombre', price: 419, previousPrice: 489, badge: 'Oferta', colorIds: ['chocolate', 'negro'], material: 'Lana italiana', description: 'Diseñado para durar, con una presencia impecable.' },
  { id: 'jean-relaxed', name: 'Jean Relaxed', categoryId: 'pantalones', audience: 'hombre', price: 189, colorIds: ['azul', 'negro'], sizes: trouserSizes, material: 'Denim de algodón', description: 'Confort auténtico en una silueta relajada.' },
  { id: 'camisa-lino-h', name: 'Camisa Riviera de lino', categoryId: 'camisas', audience: 'hombre', price: 179, colorIds: ['blanco', 'arena'], material: '100% lino natural', description: 'Frescura y textura natural para días de sol.' },
  { id: 'sudadera-minimal', name: 'Sudadera Minimal', categoryId: 'tejidos', audience: 'unisex', price: 159, colorIds: ['marfil', 'negro'], material: 'Felpa de algodón', description: 'Comodidad elevada con un diseño sin excesos.' },
  { id: 'bolso-ligne', name: 'Bolso Ligne', categoryId: 'accesorios', audience: 'mujer', price: 249, colorIds: ['chocolate', 'negro'], sizes: ['Única'], material: 'Cuero vegano', description: 'Líneas puras y espacio justo para todo lo esencial.' },
  { id: 'cinturon-siena', name: 'Cinturón Siena', categoryId: 'accesorios', audience: 'unisex', price: 89, colorIds: ['chocolate', 'negro'], sizes: ['S', 'M', 'L'], material: 'Cuero genuino', description: 'Un acento discreto que define la silueta.' },
  { id: 'lentes-solaire', name: 'Lentes Solaire', categoryId: 'accesorios', audience: 'unisex', price: 139, colorIds: ['negro', 'chocolate'], sizes: ['Única'], material: 'Acetato y lentes UV400', description: 'Un gesto de estilo para cada día luminoso.' },
  { id: 'bufanda-hiver', name: 'Bufanda Hiver', categoryId: 'accesorios', audience: 'unisex', price: 119, colorIds: ['marfil', 'oliva'], sizes: ['Única'], material: 'Lana suave', description: 'Textura cálida con el acabado elegante de la temporada.' },
];

function makeVariants(seed: ProductSeed): ProductVariant[] {
  return seed.colorIds.flatMap((colorId, colorIndex) => (seed.sizes ?? apparelSizes).map((size, sizeIndex) => ({
    colorId, colorName: colors[colorId][1], hex: colors[colorId][2], size,
    stock: sizeIndex === 4 && colorIndex === 1 ? 0 : Math.max(2, 11 - sizeIndex * 2 - colorIndex),
  })));
}

export const PRODUCTS: Product[] = seeds.map((seed, index) => ({
  id: seed.id, name: seed.name, categoryId: seed.categoryId, audience: seed.audience,
  price: seed.price, previousPrice: seed.previousPrice, badge: seed.badge,
  description: seed.description, material: seed.material,
  details: ['Diseño atemporal', 'Acabados cuidadosamente seleccionados', 'Cuidado: seguir las instrucciones de la etiqueta'],
  images: seed.colorIds.flatMap((colorId, colorIndex) => {
    const row = index % 2 === 0 ? 'top' : 'bottom';
    const column = colorIndex === 0 ? 'left' : 'right';
    const quadrant = `${row}-${column}` as const;
    const atlasIndex = Math.floor(index / 2);
    const url = `/product-atlases/${PRODUCT_ATLASES[atlasIndex]}`;
    const atlasShape = ATLAS_SHAPES[atlasIndex];
    const colorName = colors[colorId][1];
    return [
      { url, alt: `${seed.name} en color ${colorName}`, colorId, quadrant, atlasShape, view: 'full' as const },
      { url, alt: `Detalle de ${seed.name} en color ${colorName}`, colorId, quadrant, atlasShape, view: 'detail' as const },
    ];
  }),
  variants: makeVariants(seed), featured: seed.featured, createdAt: seeds.length - index,
}));
