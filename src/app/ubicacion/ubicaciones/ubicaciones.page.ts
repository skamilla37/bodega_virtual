import { Component, OnInit } from '@angular/core';
import { SqliteService } from '../sqlite.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-ubicaciones',
  templateUrl: './ubicaciones.page.html',
  styleUrls: ['./ubicaciones.page.scss'],
})
export class UbicacionesPage implements OnInit {

  ubicaciones: any[] = []; // Almacenar las ubicaciones

  constructor(
    private sqliteService: SqliteService, // Servicio de SQLite y API
    private alertController: AlertController, // Para mostrar alertas
    private navCtrl: NavController // Para navegar a otras páginas
  ) {}

  async ngOnInit() {
    try {
      // Esperar a que la base de datos esté completamente inicializada
      await this.sqliteService.initializeDatabase();
      console.log('Base de datos lista, cargando ubicaciones...');
      this.cargarUbicaciones();
    } catch (error) {
      console.error('Error en la inicialización de la base de datos:', error);
    }
  }

  // Cargar todas las ubicaciones
  cargarUbicaciones() {
    this.sqliteService.obtenerUbicaciones().subscribe({
      next: (ubicaciones) => {
        console.log('Ubicaciones cargadas:', ubicaciones);
        this.ubicaciones = ubicaciones; // Asigna las ubicaciones cargadas
      },
      error: (err) => {
        console.error('Error al cargar ubicaciones:', err);
      }
    });
  }


  // Función para mostrar alertas
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
