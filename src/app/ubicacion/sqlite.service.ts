import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx'; // Importación para SQLite
import { HttpClient } from '@angular/common/http'; // Para llamadas a la API REST
import { Observable, from } from 'rxjs'; // Para manejar observables
import { map, switchMap } from 'rxjs/operators'; // Operadores para trabajar con flujos de datos

@Injectable({
  providedIn: 'root'
})
export class SqliteService {

  private db!: SQLiteObject;

  constructor()
   {}

  
  
}



