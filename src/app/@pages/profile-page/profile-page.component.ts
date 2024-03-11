import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PageHeaderComponent } from '../../@components/page-header/page-header.component';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { logOutOutline } from 'ionicons/icons';
addIcons({ logOutOutline });

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    PageHeaderComponent,
  ],
})
export class ProfilePageComponent  implements OnInit {
  title: string = "Profile";

  constructor(
    private readonly _router: Router,
  ) { }

  ngOnInit() {}

  logout() {
    // alert('Logout now');
    this._router.navigate(['/login']);
  }

}
