import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import * as $ from 'jquery';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage{

  constructor(private router: Router, private animationCtrl: AnimationController) { }

  registro() {
    $('#registroForm').on('submit', (e) =>{
      e.preventDefault();
      const nombre = $('#nombre').val();
      const email = $('#email').val();
      const password = $('#password').val();
      
      if(nombre && email && password) {
        alert('Registro exitoso');
        this.router.navigate(['/login']);
      } else {
        this.shakeForm();
      }
    });
  }

  async animateSuccess() {
    const animation = this.animationCtrl.create()
      .addElement($('#registroForm')[0])
      .duration(1000)
      .iterations(1)
      .fromTo('opacity', '1', '0.5')
      .fromTo('transform', 'translateY(0px)', 'translateY(100px)');

    await animation.play();
  }

  async shakeForm() {
    const animation = this.animationCtrl.create()
      .addElement($('#registroForm')[0])
      .duration(300)
      .iterations(3)
      .keyframes([
        { offset: 0, transform: 'translateX(0px)' },
        { offset: 0.5, transform: 'translateX(10px)' },
        { offset: 1, transform: 'translateX(0px)' }
      ]);

    await animation.play();
    alert('Por favor, complete todos los campos');
  }
}