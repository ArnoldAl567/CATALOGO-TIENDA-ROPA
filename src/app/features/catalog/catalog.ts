import { Component, computed, HostListener, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CatalogService } from '../../core/catalog.service';
import { filterProducts } from '../../core/store.utils';
import { ProductCard } from '../../shared/product-card';

@Component({ selector: 'app-catalog', standalone: true, imports: [FormsModule, ProductCard], templateUrl: './catalog.html', styleUrl: './catalog.css' })
export class Catalog {
  readonly catalog = inject(CatalogService);
  private readonly route = inject(ActivatedRoute);
  readonly query = signal(''); readonly audience = signal(''); readonly category = signal('');
  readonly size = signal(''); readonly color = signal(''); readonly minPrice = signal<number | undefined>(undefined);
  readonly maxPrice = signal<number | undefined>(undefined); readonly sort = signal('newest');
  readonly offersOnly = signal(false); readonly filtersOpen = signal(false);
  readonly sizes = ['XS', 'S', 'M', 'L', 'XL', '28', '30', '32', '34', '36', 'Única'];
  readonly colors = [
    { id: 'negro', name: 'Negro', hex: '#292927' }, { id: 'marfil', name: 'Marfil', hex: '#e9e5d9' },
    { id: 'arena', name: 'Arena', hex: '#c7baa7' }, { id: 'oliva', name: 'Oliva', hex: '#777c60' },
    { id: 'chocolate', name: 'Chocolate', hex: '#665447' }, { id: 'azul', name: 'Azul', hex: '#5f7080' },
    { id: 'blanco', name: 'Blanco', hex: '#f6f5f0' }, { id: 'terracota', name: 'Terracota', hex: '#b47f6b' },
  ];
  readonly categories = this.catalog.categories;
  readonly results = computed(() => {
    const base = this.offersOnly() ? this.catalog.products.filter(product => product.badge === 'Oferta') : this.catalog.products;
    return filterProducts(base, { query: this.query(), audience: this.audience(), category: this.category(), size: this.size(), color: this.color(), minPrice: this.minPrice(), maxPrice: this.maxPrice(), sort: this.sort() });
  });

  constructor() {
    this.route.queryParamMap.subscribe(params => {
      this.query.set(params.get('buscar') ?? ''); this.audience.set(params.get('genero') ?? '');
      this.category.set(params.get('categoria') ?? ''); this.offersOnly.set(params.get('ofertas') === 'si');
      if (params.get('orden') === 'novedades') this.sort.set('newest');
    });
  }
  @HostListener('window:keydown.escape') onEscape(): void { this.filtersOpen.set(false); }
  reset(): void { this.query.set(''); this.audience.set(''); this.category.set(''); this.size.set(''); this.color.set(''); this.minPrice.set(undefined); this.maxPrice.set(undefined); this.offersOnly.set(false); }
}
