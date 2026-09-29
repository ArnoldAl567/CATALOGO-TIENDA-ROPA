import { Component, computed, input, linkedSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../models/store.models';
import { imagesForColor, money } from '../core/store.utils';
import { ProductPhoto } from './product-photo';

@Component({
  selector: 'app-product-card', standalone: true, imports: [RouterLink, ProductPhoto],
  template: `
    <article class="group fade-in">
      <a [routerLink]="['/producto', product().id]" [queryParams]="{color: selectedColor()}" class="block overflow-hidden relative bg-[#e9e5dc] aspect-[3/4]" [attr.aria-label]="'Ver ' + product().name + ' en ' + selectedColorName()">
        @if (images()[0]; as photo) { <app-product-photo [image]="photo" class="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]" /> }
        @if (images()[1]; as detail) { <app-product-photo [image]="detail" class="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" /> }
        @if (product().badge) { <span class="absolute left-3 top-3 bg-[#f7f5f0] px-3 py-2 text-[10px] uppercase tracking-[.15em]">{{ product().badge }}</span> }
        <span class="quick-view absolute bottom-4 left-4 right-4 bg-[#f7f5f0]/95 text-center py-3 text-[10px] uppercase tracking-[.15em] translate-y-20 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">Ver detalles ↗</span>
      </a>
      <div class="pt-4"><span class="text-[10px] uppercase tracking-[.15em] text-[#818278]">{{ product().categoryId }} · {{ product().audience }}</span><a [routerLink]="['/producto', product().id]" [queryParams]="{color: selectedColor()}" class="mt-1 block font-editorial text-[1.07rem] hover:underline">{{ product().name }}</a><div class="mt-2 flex items-center gap-2 text-[13px]"><strong class="font-medium">{{ money(product().price) }}</strong>@if (product().previousPrice) { <s class="text-[#8a8a82]">{{ money(product().previousPrice!) }}</s> }</div><div class="mt-3 flex gap-1.5" role="group" [attr.aria-label]="'Elegir color de ' + product().name">@for (color of colors(); track color.colorId) { <button type="button" class="size-5 rounded-full border p-[2px]" [style.border-color]="selectedColor()===color.colorId ? '#252822' : 'transparent'" [attr.aria-label]="'Mostrar ' + product().name + ' en ' + color.colorName" [attr.aria-pressed]="selectedColor()===color.colorId" [title]="color.colorName" (click)="manualColor.set(color.colorId)"><span class="block h-full w-full rounded-full border border-[#aaa79e]" [style.background]="color.hex"></span></button> }</div></div>
    </article>
  `,
})
export class ProductCard {
  readonly product = input.required<Product>();
  readonly preferredColor = input('');
  readonly manualColor = linkedSignal(() => this.preferredColor());
  readonly money = money;
  readonly colors = computed(() => this.product().variants.filter((variant, index, variants) => variants.findIndex(item => item.colorId === variant.colorId) === index));
  readonly selectedColor = computed(() => {
    const candidate = this.manualColor() || this.preferredColor();
    return this.colors().some(color => color.colorId === candidate) ? candidate : (this.colors()[0]?.colorId ?? '');
  });
  readonly selectedColorName = computed(() => this.colors().find(color => color.colorId === this.selectedColor())?.colorName ?? '');
  readonly images = computed(() => imagesForColor(this.product(), this.selectedColor()));
}
