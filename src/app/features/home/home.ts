import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from '../../core/catalog.service';
import { ProductCard } from '../../shared/product-card';

@Component({ selector: 'app-home', standalone: true, imports: [RouterLink, ProductCard], templateUrl: './home.html', styleUrl: './home.css' })
export class Home {
  readonly catalog = inject(CatalogService);
  readonly settings = this.catalog.settings;
  readonly featured = computed(() => this.catalog.products().filter(product => product.featured).slice(0, 4));
  readonly newArrivals = computed(() => this.catalog.products().filter(product => product.badge === 'Nuevo').slice(0, 4));
  imageError(event: Event): void { const image = event.target as HTMLImageElement; if (!image.src.endsWith('image-fallback.svg')) image.src = '/image-fallback.svg'; }
}
