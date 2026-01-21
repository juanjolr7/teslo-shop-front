import { SlicePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';
import { ProductsService } from '@products/services/products.service';
import { ProductCarousel } from "@products/components/product-card/product-carousel/product-carousel";

@Component({
  selector: 'app-product-page',
  imports: [ProductImagePipe, SlicePipe, ProductCarousel],
  templateUrl: './product-page.html',
})
export class ProductPage {
  idSlug = inject(ActivatedRoute).snapshot.params['idSlug'];
  productsService = inject(ProductsService);


  productResource = rxResource({
    params: () => ({ idSlug: this.idSlug }),
    stream: ({ params }) => this.productsService.getProductByIdSlug(params.idSlug),
  });
}
