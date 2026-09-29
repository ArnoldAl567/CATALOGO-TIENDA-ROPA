import { Component, computed, input } from '@angular/core';
import { ProductImage } from '../models/store.models';

@Component({
  selector: 'app-product-photo',
  standalone: true,
  template: `<span class="photo" role="img" [attr.aria-label]="image().alt" [style.background-image]="'url(' + image().url + ')'" [style.background-size]="size()" [style.background-position]="position()"></span>`,
  styles: `:host{display:block;overflow:hidden;background:#e9e5dc}.photo{display:block;width:100%;height:100%;background-repeat:no-repeat;background-color:#e9e5dc}`,
})
export class ProductPhoto {
  readonly image = input.required<ProductImage>();
  readonly size = computed(() => {
    const image = this.image();
    if (image.atlasShape === 'tall') return image.view === 'detail' ? '260% auto' : '200% auto';
    return image.view === 'detail' ? 'auto 260%' : 'auto 200%';
  });
  readonly position = computed(() => {
    const { atlasShape, quadrant, view } = this.image();
    const right = quadrant.endsWith('right');
    const bottom = quadrant.startsWith('bottom');
    if (view === 'detail') {
      const x = atlasShape === 'wide' ? (right ? '85%' : '15%') : (right ? '90%' : '10%');
      const y = atlasShape === 'tall' ? (bottom ? '86%' : '14%') : (bottom ? '90%' : '10%');
      return `${x} ${y}`;
    }
    const x = atlasShape === 'wide' ? (right ? '89%' : '11%') : atlasShape === 'portrait' ? (right ? '96%' : '4%') : (right ? '100%' : '0%');
    const y = atlasShape === 'tall' ? (bottom ? '93%' : '7%') : (bottom ? '100%' : '0%');
    return `${x} ${y}`;
  });
}
