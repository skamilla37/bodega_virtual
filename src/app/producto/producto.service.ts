import { Injectable } from '@angular/core';
import { MLproducto } from './model/MLproducto';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

const apiUrl = "http://localhost:3000/productos";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  agregarProducto(producto: MLproducto): Observable<MLproducto> {
    return this.http.post<MLproducto>(apiUrl, producto, httpOptions).pipe(
      tap((producto: MLproducto) => console.log(`added producto w/ id=${producto.id}`)),
      catchError(this.handleError<MLproducto>('agregarProducto'))
    );
  }

  obtenerProductos(): Observable<MLproducto[]> {
    return this.http.get<MLproducto[]>(apiUrl)
      .pipe(
        tap(producto => console.log('fetched productos')),
        catchError(this.handleError('obtenerProductos', []))
      );
  }


  obtenerProducto(id: number): Observable<MLproducto> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<MLproducto>(url).pipe(
      tap(_ => console.log(`fetched producto id=${id}`)),
      catchError(this.handleError<MLproducto>(`obtenerProducto id=${id}`))
    );
  }

  eliminarProducto(id: number): Observable<MLproducto> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<MLproducto>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted producto id=${id}`)),
      catchError(this.handleError<MLproducto>('eliminarProducto'))
    );
  }
  actualizarProducto(id: number, producto: MLproducto): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, producto, httpOptions).pipe(
      tap(_ => console.log(`updated producto id=${id}`)),
      catchError(this.handleError<any>('actualizarProducto'))
    );
  }
}
