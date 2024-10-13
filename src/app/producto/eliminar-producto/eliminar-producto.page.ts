import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { MLproducto } from '../model/MLproducto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-eliminar-producto',
  templateUrl: './eliminar-producto.page.html',
  styleUrls: ['./eliminar-producto.page.scss'],
})
export class EliminarProductoPage implements OnInit {
  producto: MLproducto = { id: 0, nombre: '', materialidad: '' };

  constructor(
    public restApi: ProductoService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.obtenerProducto();
  }

  // Obtener los datos del producto por su ID
  async obtenerProducto() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.restApi.obtenerProducto(+id).subscribe({
        next: (res) => {
          this.producto = res;
          loading.dismiss();
        },
        error: (err) => {
          console.log("Error al cargar el producto", err);
          loading.dismiss();
        }
      });
    }
  }

  // Eliminar el producto con confirmación
  async eliminarProducto(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Está seguro de eliminar el producto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Operación de eliminación cancelada');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteConfirmado(id);
          }
        }
      ]
    });
    await alert.present();
  }

  // Confirmar la eliminación del producto
  async deleteConfirmado(id: number) {
    const loading = await this.loadingController.create({
      message: 'Eliminando producto...',
    });
    await loading.present();

    this.restApi.eliminarProducto(id).subscribe({
      next: (res) => {
        console.log('Producto eliminado correctamente', res);
        loading.dismiss();
        this.router.navigate(['/gestion']);
      },
      error: (err) => {
        console.log("Error al eliminar el producto", err);
        loading.dismiss();
      }
    });
  }
}
