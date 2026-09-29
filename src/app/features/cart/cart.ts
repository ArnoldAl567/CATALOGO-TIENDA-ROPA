import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/cart.service';
import { CatalogService } from '../../core/catalog.service';
import { mainImageForColor, money } from '../../core/store.utils';
import { CartItem } from '../../models/store.models';
import { ProductPhoto } from '../../shared/product-photo';

@Component({ selector: 'app-cart-page', standalone: true, imports: [RouterLink, ProductPhoto], templateUrl: './cart.html', styleUrl: './cart.css' })
export class CartPage {
  readonly cart = inject(CartService); readonly catalog = inject(CatalogService); readonly money = money;
  productFor(item: CartItem) { return this.catalog.getById(item.productId); }
  imageFor(item: CartItem) { const product = this.productFor(item); return product ? mainImageForColor(product, item.colorId) : undefined; }
  colorFor(item: CartItem): string { return this.productFor(item)?.variants.find(variant => variant.colorId === item.colorId)?.colorName ?? item.colorId; }
  change(item: CartItem, delta: number): void { if (item.quantity + delta < 1) this.cart.remove(item); else this.cart.update(item, item.quantity + delta); }
}
