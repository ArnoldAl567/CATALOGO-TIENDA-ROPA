import { Injectable, signal } from '@angular/core';
import { CATEGORIES, PRODUCTS } from '../data/catalog.data';
import project from '../../../sanity.project.json';
import { Category, Product, StoreSettings } from '../models/store.models';
import { STORE_CONFIG } from './store.config';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly productState = signal<Product[]>(project.projectId ? [] : PRODUCTS);
  private readonly categoryState = signal<Category[]>(project.projectId ? [] : CATEGORIES);
  private readonly settingsState = signal<StoreSettings>(STORE_CONFIG);
  readonly products = this.productState.asReadonly();
  readonly categories = this.categoryState.asReadonly();
  readonly settings = this.settingsState.asReadonly();
  readonly status = signal<'demo' | 'loading' | 'ready' | 'error'>(project.projectId ? 'loading' : 'demo');

  constructor() { if (project.projectId) void this.refresh(); }

  async refresh(): Promise<void> {
    if (!project.projectId) return;
    this.status.set('loading');
    try {
      const {fetchSanityCatalog} = await import('./sanity.repository');
      const data = await fetchSanityCatalog();
      this.productState.set(data.products);
      this.categoryState.set(data.categories);
      this.settingsState.set({...STORE_CONFIG, ...data.settings});
      this.status.set('ready');
    } catch (error) {
      console.error('No se pudo cargar el catálogo de Sanity.', error);
      this.status.set('error');
    }
  }

  getById(id: string): Product | undefined { return this.products().find(product => product.id === id); }
  related(product: Product, limit = 4): Product[] {
    return this.products().filter(item => item.id !== product.id && (item.categoryId === product.categoryId || item.audience === product.audience)).slice(0, limit);
  }
}
