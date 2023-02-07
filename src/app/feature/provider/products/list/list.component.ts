import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  /**
   * Método `getProducts` que obtiene la lista de productos a través del servicio `cinemasService`.
   */
  getProducts(): void {
    this.productsService.getProducts().subscribe((res: any) => {
      if (res.status === 'success') {
        this.products = res.data.products as Product[];
      }
    });
  }

  /**
   * Método `getProductsByName` que obtiene una lista de productos por su nombre a través del servicio `productsService`.
   * @param name Nombre del producto a buscar.
   */
  getProductsByName(name: string): void {
    if (name === '') {
      this.getProducts();
      return;
    }
    this.productsService.getProductsByName(name).subscribe((res: any) => {
      console.log(res);
      if (res.status === 'success') {
        this.products = res.data.products as Product[];
      }
    });
  }
}
