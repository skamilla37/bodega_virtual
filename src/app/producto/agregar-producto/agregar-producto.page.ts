import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { MLproducto } from '../model/MLproducto';

import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.page.html',
  styleUrls: ['./agregar-producto.page.scss'],
})
export class AgregarProductoPage implements OnInit {

  productoForm!: FormGroup;  

  producto: MLproducto = { id: 2, nombre: 'QF- fortex 60 30x30cm', materialidad: 'fortex 60' };

  constructor(private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private restApi: ProductoService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.productoForm = this.formBuilder.group({
      'id' : [null, Validators.required],
      'nombre' : [null, Validators.required],
      'materialidad' : [null, Validators.required]
    });
  }

  async onFormSubmit(form:NgForm) {
    const loading = await this.loadingController.create({
      message: 'Procesando...'
    });
    await loading.present();
    this.restApi.agregarProducto(this.productoForm.value)
      .subscribe(res => {
        console.log(res)
        loading.dismiss();
        this.router.navigate(['/gestion']);
      }, (err) => {
        console.log(err);
        loading.dismiss();
      });
  }

}
