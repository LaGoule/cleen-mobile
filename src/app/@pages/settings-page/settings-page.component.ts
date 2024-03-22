import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PageHeaderComponent } from '../../@components/page-header/page-header.component';
import { AuthenticationService } from '../../@services/authentication.service';
import { GroupService } from '../../@services/group.service';
import { FirestoreService } from '../../@services/firestore.service';
import { SettingsService } from '../../@services/settings.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { moon, sunny, chevronDownOutline } from 'ionicons/icons';
addIcons({ moon, sunny, chevronDownOutline });

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PageHeaderComponent,
  ],
})
export class SettingsPageComponent  implements OnInit {
  title: string = "Settings";
  user!: any;

  constructor(
    private readonly _firestoreService: FirestoreService,
    private readonly _authService: AuthenticationService,
    protected readonly _settingsService: SettingsService,
  ) { }

  async ngOnInit() {
    this.user = await this._authService.activeUser;
  }

  async ionViewWillEnter() {
    this.user = await this._authService.activeUser;
  }

  // async resetUserPoints() {
  //   await this._firestoreService.updateUser(this._authService.activeUser, {points: 0});
  //   this.ionViewWillEnter();
  // }

  logout() {
    this._authService.logout();
  }

  toggleDarkMode() {
    this._settingsService.toggleDarkMode();
  }
  
  toggleNotifications($event: any){
    console.log('Notifications', $event.detail.checked);
  }

  changeLanguage($event: any){
    console.log('Language', $event.detail.value);
  }
}
