import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string= '';
  password: string='';

  constructor(private router: Router, private authService: AuthService, private alertController: AlertController) { }
  validatePassword(password: string): boolean {
    const numberCount = (password.match(/\d/g) || []).length;
    const uppercaseCount = (password.match(/[A-Z]/) || []).length;
    const lowercaseCount = (password.match(/[a-z]/) || []).length;
    return numberCount == 4 && uppercaseCount == 1 && lowercaseCount == 3;

  }
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
  async login() {
    if (!this.validatePassword(this.password)) {
      await this.presentAlert('Contraseña Invalida', 'la contraseña debe contener 4 números, 1 mayúscula y 3 caracteres ');
      return;
    }
    if (!this.authService.login(this.username, this.password)) {
      await this.presentAlert('Error de inicio de sesión', 'Usuario o contraseña incorrectos');
    } else {
      this.router.navigate(['/home']);    
    }
  }

}
