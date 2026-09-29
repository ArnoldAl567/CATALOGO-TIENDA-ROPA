import { Injectable } from '@angular/core';
import { CATEGORIES, PRODUCTS } from '../data/catalog.data';
import { Product } from '../models/store.models';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  readonly products = PRODUCTS;
  readonly categories = CATEGORIES;
  getById(id: string): Product | undefined { return this.products.find(product => product.id === id); }
  related(product: Product, limit = 4): Product[] {
    return this.products.filter(item => item.id !== product.id && (item.categoryId === product.categoryId || item.audience === product.audience)).slice(0, limit);
  }
}
