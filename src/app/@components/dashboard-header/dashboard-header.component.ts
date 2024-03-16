import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthenticationService } from '../../@services/authentication.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ],
})
export class DashboardHeaderComponent  implements OnInit {
  protected user!: any;

  constructor(
    private readonly _router: Router,
    private readonly _authService: AuthenticationService
  ) { }

  ngOnInit() {
    if (this._authService.activeUser) {
      this.user = this._authService.activeUser;
    }
  }

  public navigateToSearch(): void {
    this._router.navigate(['search']);
  }
}
