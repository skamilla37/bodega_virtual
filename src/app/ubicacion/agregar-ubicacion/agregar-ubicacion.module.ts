import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarUbicacionPageRoutingModule } from './agregar-ubicacion-routing.module';

import { AgregarUbicacionPage } from './agregar-ubicacion.page';

import { SqliteService } from '../sqlite.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarUbicacionPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AgregarUbicacionPage],
  providers: [SqliteService]
})
export class AgregarUbicacionPageModule {}
