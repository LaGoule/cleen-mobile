import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    IonicModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {


  protected loginWithGoogle(){
    console.log('Login with Google');
  }
}
