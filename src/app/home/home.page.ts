import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{
  username: string = '';

  constructor(private alertController: AlertController, private authService: AuthService) { }

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.username = currentUser.username;
      this.presentWelcomeAlert();
    }
  }


  async presentWelcomeAlert() {
    const alert = await this.alertController.create({
      header: '¡Bienvenido!',
      message: `Hola, ${this.username}. Has iniciado sesión correctamente.`,
      buttons: ['OK']
    });

    await alert.present();
  }
}
