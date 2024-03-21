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
import { TodoItemComponent } from '../../@components/todo-item/todo-item.component';
import { TodoListComponent } from '../../@components/todo-list/todo-list.component';
import { FirestoreService } from '../../@services/firestore.service';

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
    TodoListComponent,
  ],
})
export class ProfilePageComponent  implements OnInit {
  
  title: string = "Profile";
  user!: any;
  id!: any;

  constructor(
    private readonly _authService: AuthenticationService,
    private readonly router: Router,
    private readonly _firestoreService: FirestoreService,
  ) { }

  async ngOnInit() {
    this.id = this.router.url.split('/')[2];
    // this.user = this._authService.activeUser;
    this.user = await this._firestoreService.getUser(this.id);
  }

  async ionViewWillEnter() {
    this.user = await this._firestoreService.getUser(this.id);
    // console.log('id de l\'user: ',this.id);
    // console.log('user à afficher dans profile: ',this.user);
  }

  logout() {
    this._authService.logout();
  }

  async resetUserPoints() {
    await this._firestoreService.updateUser(this.id, {points: 0});
    this.ionViewWillEnter();
  }

}
