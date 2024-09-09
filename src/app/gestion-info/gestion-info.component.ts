import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-gestion-info',
  templateUrl: './gestion-info.component.html',
  styleUrls: ['./gestion-info.component.scss'],
})
export class GestionInfoComponent  implements OnInit {

  constructor( private modalCtrl: ModalController) { }

  ngOnInit() {}

  async cerrarModal() {
    await this.modalCtrl.dismiss();
  }

}
