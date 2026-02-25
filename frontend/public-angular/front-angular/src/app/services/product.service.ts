import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    private apiUrl = 'http://localhost:8080/api/products';
    private baseUrl = 'http://localhost:8080/storage/';
    products = signal<Product[]>([]);
    
    private http = inject(HttpClient);
    
    loadProducts(){
        return this.http
            .get<{data:Product[]}>(this.apiUrl)
            .pipe(
                map((resp) => {
                    return resp.data.map(prod => ({
                        ...prod,
                        image: `${this.baseUrl}${prod.image}`
                    }))
                }),// extrae el array del objeto { data: [...] }
                tap(arr => this.products.set(arr)),
                catchError(err => {
                    console.error('Error al cargar productos', err);
                    return throwError(()=> err);
                })
            );
    }


    // loadProducts(){
    //     this.http.get<Product[]>(this.apiUrl)
    //     .subscribe({
    //         next: (data) => this.products.set(data),
    //         error: (err) => console.error('Error al cargar productos')
    //     });
    // }
}