import { Component } from '@angular/core';
import { AuthServiceService } from './services/auth-service.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor( private authService: AuthServiceService) {}
  
  logout() {
    this.authService.logout();
  }

}
