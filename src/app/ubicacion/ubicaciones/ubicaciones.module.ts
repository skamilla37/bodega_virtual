import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UbicacionesPageRoutingModule } from './ubicaciones-routing.module';

import { UbicacionesPage } from './ubicaciones.page';
import { SqliteService } from '../sqlite.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UbicacionesPageRoutingModule
  ],
  declarations: [UbicacionesPage],
  providers: [SqliteService] // Agregar el servicio SqliteService aquí
})
export class UbicacionesPageModule {}
