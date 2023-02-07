import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private API_URL = environment.API_URL + '/products';

  /**
   * Obtiene todos los productos.
   *
   * @Route GET /products
   */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL, this.httpOptions);
  }

  /**
   * Obtiene un producto específico por su ID.
   *
   * @Route GET /products/:id
   * @param id ID del producto a obtener.
   */
  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.API_URL}/${id}`, this.httpOptions);
  }

  /**
   * Obtiene una producto específico por su nombre.
   *
   * @Route GET /products/search/:title
   * @param name Nombre del producto a obtener.
   *
   */
  getProductsByName(name: string): Observable<Product> {
    return this.http.get<Product>(
      `${this.API_URL}/search/${name}`,
      this.httpOptions
    );
  }

  /**
   * Crea un nuevo producto.
   *
   * @Route POST /products/create
   * @param product Producto a crear.
   */
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(
      `${this.API_URL}/create`,
      product,
      this.httpOptions
    );
  }

  /**
   * Actualiza un producto existente.
   *
   * @Route PUT /productos/update/:id
   * @param id ID del producto a actualizar.
   * @param product Datos actualizados del producto.
   */
  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(
      `${this.API_URL}/update/${id}`,
      product,
      this.httpOptions
    );
  }

  /**
   * Elimina un producto existente.
   *
   * @Route DELETE /product/delete/:id
   * @param id ID del producto a eliminar.
   */
  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(
      `${this.API_URL}/delete/${id}`,
      this.httpOptions
    );
  }
}
