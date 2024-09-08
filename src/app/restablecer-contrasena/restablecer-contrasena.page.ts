import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restablecer-contrasena',
  templateUrl: './restablecer-contrasena.page.html',
  styleUrls: ['./restablecer-contrasena.page.scss'],
})
export class RestablecerContrasenaPage{
  email: string = '';

  constructor(private router: Router) { }

  restablecerContrasena() {
    this.router.navigate(['/login']);
    }
}

