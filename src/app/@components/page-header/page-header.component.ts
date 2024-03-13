import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';
addIcons({ arrowBack });
import { AuthenticationService } from '../../@services/authentication.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    IonicModule,
  ],
})
export class PageHeaderComponent  implements OnInit {
  @Input() title: string = "Page Header";
  @Input() backUrl: string = "";
  user!: any;

  constructor(
    private readonly _router: Router,
    protected readonly _authService: AuthenticationService,
  ) { }

  ngOnInit() {
    if (this._authService.activeUser) {
      this.user = this._authService.activeUser;
    }
  }

  navigateToProfile() {
    this._router.navigate(['/profile']);
  }
}
