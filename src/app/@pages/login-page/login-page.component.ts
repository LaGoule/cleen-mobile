import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PageHeaderComponent } from '../../@components/page-header/page-header.component';
import { addIcons } from 'ionicons';
import { logInOutline, sparkles } from 'ionicons/icons';
addIcons({ logInOutline, sparkles });
import { AuthenticationService } from '../../@services/authentication.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    RouterModule,
    IonicModule,
    PageHeaderComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  protected title: string = "Login";

  constructor(
    private readonly _router: Router,
    protected readonly _authService: AuthenticationService
  ) {}

  // protected loginWithGoogle(){
  //   console.log('Login with Google');
  // }

  // testLogin(){
  //   this._router.navigate(['/']);
  //   // console.log('Test Login');
  //   this._authService.login();
  // }
}
