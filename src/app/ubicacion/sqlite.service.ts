import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SQLiteObject, SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { forkJoin, from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {

  private dbInstance!: SQLiteObject;
  private readonly dbName: string = 'ubicaciones.db';
  private readonly tableName: string = 'ubicaciones';
  private apiUrl = 'http://192.168.1.125:3000/ubicaciones'; // URL del json-server

  constructor(private http: HttpClient, private sqlite: SQLite, private platform: Platform) {
    this.platform.ready().then(() => {
      this.initializeDatabase();
    });
  }

  // Inicializar la base de datos SQLite
  async initializeDatabase() {
    this.dbInstance = await this.sqlite.create({
      name: this.dbName,
      location: 'default'
    });

    // Crear la tabla de ubicaciones si no existe
    await this.dbInstance.executeSql(
      `CREATE TABLE IF NOT EXISTS ${this.tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, rack TEXT, ubicacion TEXT, cantidad INTEGER)`,
      []
    );
  }

  // Verificar si la API REST está disponible
  verificarConexionApi(): Observable<boolean> {
    return this.http.get(this.apiUrl, { observe: 'response' }).pipe(
      map(response => response.status === 200),  // Si la respuesta es 200, está disponible
      catchError(() => of(false))  // Si ocurre un error, no está disponible
    );
  }

  // Obtener una ubicación (API o SQLite según disponibilidad)
  obtenerUbicacion(id: number): Observable<any> {
    return this.verificarConexionApi().pipe(
      switchMap((apiDisponible: boolean) => {
        if (apiDisponible) {
          return this.getUbicacionRemote(id); // Si la API está disponible, obtener desde la API
        } else {
          return this.getUbicacionLocal(id); // Si no hay conexión, obtener desde SQLite
        }
      }),
      catchError(() => this.getUbicacionLocal(id))  // En caso de error, obtener desde SQLite
    );
  }

  // Obtener una ubicación desde la API
  getUbicacionRemote(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Obtener una ubicación desde SQLite
  getUbicacionLocal(id: number): Observable<any> {
    const query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
    return from(this.dbInstance.executeSql(query, [id])).pipe(
      map((res) => {
        if (res.rows.length > 0) {
          return res.rows.item(0); // Retorna la ubicación si existe
        } else {
          throw new Error('Ubicación no encontrada en SQLite');
        }
      }),
      catchError((error) => {
        console.error('Error obteniendo ubicación desde SQLite: ', error);
        return of(null); // Retornar null si hay algún error
      })
    );
  }

  // Mostrar ubicaciones, dependiendo de si la API está disponible o no
  obtenerUbicaciones(): Observable<any[]> {
    return this.verificarConexionApi().pipe(
      switchMap((apiDisponible: boolean) => {
        if (apiDisponible) {
          return this.getUbicacionesRemote(); // Si la API está disponible, carga desde la API
        } else {
          return this.getUbicacionesLocal(); // Si no hay conexión, carga desde SQLite
        }
      }),
      catchError(() => this.getUbicacionesLocal())  // En caso de error, carga desde SQLite
    );
  }

  // Obtener ubicaciones desde la API
  getUbicacionesRemote(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener ubicaciones locales desde SQLite
  getUbicacionesLocal(): Observable<any[]> {
    return from(this.dbInstance.executeSql(`SELECT * FROM ${this.tableName}`, [])).pipe(
      map((res) => {
        const ubicaciones = [];
        for (let i = 0; i < res.rows.length; i++) {
          ubicaciones.push(res.rows.item(i));
        }
        return ubicaciones;
      })
    );
  }

  // Agregar una ubicación (API o SQLite según disponibilidad)
  agregarUbicacion(ubicacion: any): Observable<any> {
    return this.verificarConexionApi().pipe(
      switchMap((apiDisponible: boolean) => {
        if (apiDisponible) {
          return this.addUbicacionRemote(ubicacion); // Si la API está disponible, agrega a la API
        } else {
          return this.addUbicacionLocal(ubicacion); // Si no hay conexión, agrega en SQLite
        }
      }),
      catchError(() => this.addUbicacionLocal(ubicacion))  // Si hay error, agrega en SQLite
    );
  }

  // Agregar una ubicación en la API
  addUbicacionRemote(ubicacion: any): Observable<any> {
    return this.http.post(this.apiUrl, ubicacion);
  }

  // Agregar una ubicación en SQLite
  addUbicacionLocal(ubicacion: any): Observable<any> {
    const query = `INSERT INTO ${this.tableName} (nombre, rack, ubicacion, cantidad) VALUES (?, ?, ?, ?)`;
    const params = [ubicacion.nombre, ubicacion.rack, ubicacion.ubicacion, ubicacion.cantidad];
    return from(this.dbInstance.executeSql(query, params));
  }
  // Modificar una ubicación (API o SQLite según disponibilidad)
  modificarUbicacion(id: number, ubicacion: any): Observable<any> {
    return this.verificarConexionApi().pipe(
      switchMap((apiDisponible: boolean) => {
        if (apiDisponible) {
          return this.updateUbicacionRemote(id, ubicacion); // Modifica en la API si está disponible
        } else {
          return this.updateUbicacionLocal(id, ubicacion); // Modifica en SQLite si no hay conexión
        }
      }),
      catchError(() => this.updateUbicacionLocal(id, ubicacion))  // Si hay error, modifica en SQLite
    );
  }

  // Modificar una ubicación en la API
  updateUbicacionRemote(id: number, ubicacion: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, ubicacion);
  }

  // Modificar una ubicación en SQLite
  updateUbicacionLocal(id: number, ubicacion: any): Observable<any> {
    const query = `UPDATE ${this.tableName} SET nombre = ?, rack = ?, ubicacion = ?, cantidad = ? WHERE id = ?`;
    const params = [ubicacion.nombre, ubicacion.rack, ubicacion.ubicacion, ubicacion.cantidad, id];
    return from(this.dbInstance.executeSql(query, params));
  }
  // Eliminar una ubicación (API o SQLite según disponibilidad)
  eliminarUbicacion(id: number): Observable<any> {
    return this.verificarConexionApi().pipe(
      switchMap((apiDisponible: boolean) => {
        if (apiDisponible) {
          return this.deleteUbicacionRemote(id); // Elimina en la API si está disponible
        } else {
          return this.deleteUbicacionLocal(id); // Elimina en SQLite si no hay conexión
        }
      }),
      catchError(() => this.deleteUbicacionLocal(id))  // Si hay error, elimina en SQLite
    );
  }

  // Eliminar una ubicación en la API
  deleteUbicacionRemote(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Eliminar una ubicación en SQLite
  deleteUbicacionLocal(id: number): Observable<any> {
    const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
    return from(this.dbInstance.executeSql(query, [id]));
  }
  

  // Sincronizar ubicaciones locales con el servidor y eliminarlas de SQLite
  sincronizarUbicaciones(): Observable<any> {
    return this.getUbicacionesLocal().pipe(
      switchMap((ubicacionesLocales) => {
        const syncObservables = ubicacionesLocales.map((ubicacion) =>
          this.addUbicacionRemote(ubicacion).pipe(
            switchMap(() => this.deleteUbicacionLocal(ubicacion.id))
          )
        );
        return forkJoin(syncObservables);
      }),
      catchError((error) => {
        console.log("Error en la sincronización: ", error);
        return of(null);
      })
    );
  }
}