import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EliminarUbicacionPageRoutingModule } from './eliminar-ubicacion-routing.module';

import { EliminarUbicacionPage } from './eliminar-ubicacion.page';
import { SqliteService } from '../sqlite.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EliminarUbicacionPageRoutingModule
  ],
  declarations: [EliminarUbicacionPage],
  providers: [SqliteService]
})
export class EliminarUbicacionPageModule {}
