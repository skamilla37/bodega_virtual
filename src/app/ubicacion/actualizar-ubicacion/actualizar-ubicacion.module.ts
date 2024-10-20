import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualizarUbicacionPageRoutingModule } from './actualizar-ubicacion-routing.module';

import { ActualizarUbicacionPage } from './actualizar-ubicacion.page';

import { SqliteService } from '../sqlite.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualizarUbicacionPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ActualizarUbicacionPage],
  providers: [SqliteService]
})
export class ActualizarUbicacionPageModule {}
