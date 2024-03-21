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

  constructor(
    private readonly _authService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.user = this._authService.activeUser;
  }

  logout() {
    this._authService.logout();
  }

}
