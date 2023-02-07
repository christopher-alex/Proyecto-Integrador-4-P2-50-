import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class ProductsFormComponent implements OnInit {
  // Película actual
  currentProduct = {} as Product;

  // Título de la página
  title = 'Nuevo producto';

  // Subscripción a los parámetros de la ruta
  paramsSubscription: Subscription;

  // Grupo de validación de formularios
  formGroup: FormGroup;

  sets: number;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.initForm();
  }

  /**
   * Inicializa el formulario y sus validaciones
   */
  initForm() {
    this.formGroup = this.formBuilder.group({
      _id: [null],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      price: [null, [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
      createdAt: [null],
      updatedAt: [null],
    });
    this.formGroup.valueChanges.subscribe((data) => {
      this.currentProduct = data;
      console.log(this.currentProduct);
    });
  }

  /**
   * Método que se ejecuta al inicializarse el componente
   */
  ngOnInit(): void {
    this.paramsSubscription = this.activatedRoute.params.subscribe(
      (params: Params) => {
        if (params['id']) {
          this.getProduct(params['id']);
        }
      }
    );
  }

  /**
   * Método que se ejecuta al hacer submit en el formulario.
   * Verifica si el formulario es válido y, en caso de ser así,
   * ejecuta `updateProduct()` si existe un producto actual o
   * `createProduct()` si no existe.
   */
  onSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    if (this.currentProduct._id) {
      this.updateProduct();
    } else {
      console.log('create');
      this.createProduct();
    }
  }
  /**
   * Método para obtener la información de un producto específico a partir de su identificador.
   * Realiza una llamada al servicio `ProductsService` para obtener los datos de un producto.
   * @param id Identificador del producto a obtener.
   */
  getProduct(id: string) {
    this.productsService.getProduct(id).subscribe((res: any) => {
      if (res.status === 'success') {
        this.currentProduct = res.data.product;
        this.formGroup.setValue(this.currentProduct);
        this.title = 'Editar Cinema';
      }
    });
  }
  /**
   * Método para crear un nuevo producto.
   * Realiza una llamada al servicio `ProductsService` para crear un producto en el sistema.
   */
  createProduct() {
    this.productsService
      .createProduct(this.currentProduct)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.router.navigate(['/layout/products']);
        }
      });
  }
  /**
   * Método para actualizar un producto existente.
   * Realiza una llamada al servicio `ProductsService` para actualizar los datos de un producto en el sistema.
   */
  updateProduct() {
    this.productsService
      .updateProduct(this.currentProduct._id, this.currentProduct)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.router.navigate(['/layout/products']);
        }
      });
  }

  /**
   * Método para eliminar un producto existente.
   * Realiza una llamada al servicio `ProductsService` para eliminar un producto del sistema.
   */
  deleteProduct(): void {
    this.productsService
      .deleteProduct(this.currentProduct._id)
      .subscribe((res: any) => {
        if (res.status === 'success') {
          this.router.navigate(['/layout/products/list']);
        }
      });
  }
}
