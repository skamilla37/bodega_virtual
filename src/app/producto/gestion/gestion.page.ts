import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GestionInfoComponent } from '../gestion-info/gestion-info.component';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.page.html',
  styleUrls: ['./gestion.page.scss'],
})
export class GestionPage{

  constructor( private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async abrirModal() {
    const modal = await this.modalCtrl.create({
      component: GestionInfoComponent
    });

     return await modal.present();

  }

}
