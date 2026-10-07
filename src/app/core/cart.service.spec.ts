import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { PRODUCTS } from '../data/catalog.data';
import { CartService } from './cart.service';
import { CatalogService } from './catalog.service';

describe('carrito', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({providers: [{provide: CatalogService, useValue: {
      status: signal('ready'), getById: (id: string) => PRODUCTS.find(product => product.id === id),
    }}]});
  });
  afterEach(() => TestBed.resetTestingModule());
  it('agrupa la misma variante y calcula el total', () => {
    const cart = TestBed.inject(CartService); const product = PRODUCTS[0]; const variant = product.variants[0];
    expect(cart.add(product, variant.colorId, 'M', 1)).toBe(true);
    cart.drawerOpen.set(false);
    expect(cart.add(product, variant.colorId, 'M', 2)).toBe(true);
    expect(cart.items()).toHaveLength(1);
    expect(cart.count()).toBe(3);
    expect(cart.total()).toBe(product.price * 3);
  });
  it('trata otra talla como una línea distinta y valida el stock', () => {
    const cart = TestBed.inject(CartService); const product = PRODUCTS[0]; const color = product.variants[0].colorId;
    expect(cart.add(product, color, 'S', 1)).toBe(true);
    expect(cart.add(product, color, 'M', 1)).toBe(true);
    expect(cart.items()).toHaveLength(2);
    expect(cart.add(product, color, 'M', 999)).toBe(false);
    expect(cart.count()).toBe(2);
  });
  it('recupera el carrito desde LocalStorage al crear el servicio', () => {
    const product = PRODUCTS[0]; const variant = product.variants[0];
    localStorage.setItem('maison-mode-cart-v1', JSON.stringify([{ productId: product.id, colorId: variant.colorId, size: 'M', quantity: 2 }]));
    const cart = TestBed.inject(CartService);
    expect(cart.items()).toHaveLength(1);
    expect(cart.total()).toBe(product.price * 2);
  });
});
