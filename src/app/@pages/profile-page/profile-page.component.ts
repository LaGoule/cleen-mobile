import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PageHeaderComponent } from '../../@components/page-header/page-header.component';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { logOutOutline } from 'ionicons/icons';
addIcons({ logOutOutline });
import { AuthenticationService } from '../../@services/authentication.service';
import { CommonModule } from '@angular/common';
import { MemberItemComponent } from '../../@components/member-item/member-item.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    PageHeaderComponent,
    MemberItemComponent,
  ],
})
export class ProfilePageComponent  implements OnInit {
  title: string = "Profile";
  user!: any;

  constructor(
    private readonly _authService: AuthenticationService,
    private readonly _router: Router,
  ) { }

  ngOnInit() {
    this.user = this._authService.activeUser;
  }

  logout() {
    // alert('Logout now');
    this._authService.logout();
  }

}
