import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PageHeaderComponent } from '../../@components/page-header/page-header.component';
import { GroupService } from '../../@services/group.service';
import { iGroup, iUser } from '../../@interfaces/interfaces';
import { FirestoreService } from '../../@services/firestore.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MemberItemComponent } from '../../@components/member-item/member-item.component';
import { SortMembersPipe } from '../../@pipes/sort-members.pipe';
import { AuthenticationService } from '../../@services/authentication.service';
import { ModalController } from '@ionic/angular/standalone';
import { JoinGroupModalComponent } from '../../@components/join-group-modal/join-group-modal.component';
import { addIcons } from 'ionicons';
import { warning, chevronDownOutline } from 'ionicons/icons';
import { TodoListComponent } from '../../@components/todo-list/todo-list.component';
addIcons({ warning, chevronDownOutline });

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    PageHeaderComponent,
    MemberItemComponent,
    SortMembersPipe,
  ],
})
export class GroupPageComponent  implements OnInit {
  title: string = "Group";
  loading: boolean = false;
  user!: iUser;
  activeGroup!: iGroup;
  members!: iUser[];
  userGroups!: iGroup[];

  constructor(
    protected readonly _router: Router,
    protected readonly _firestoreService: FirestoreService,
    protected readonly _groupService: GroupService,
    protected readonly _authService: AuthenticationService,
    protected readonly _modalController: ModalController,
  ) {}

  async ngOnInit() {
    this.loading = true;
    this.activeGroup = await this._firestoreService.getGroup(this._groupService.activeGroup);
    this.members = await this._firestoreService.getUsers(this.activeGroup.id);
    this.user = await this._authService.activeUser;
    this.loading = false;
  }
  
  ionViewWillEnter() {
    this.loadContent();
  }

  protected async loadContent(){
    // this.loading = true;
    this.activeGroup = await this._firestoreService.getGroup(this._groupService.activeGroup);
    this.members = await this._firestoreService.getUsers(this.activeGroup.id);
    this.userGroups = await this.getUserGroups(this.user);
    // this.loading = false;
  }

  protected handleMemberClick(member: iUser) {
    this._router.navigate(['/profile', member.uid]);
  }

  protected async openJoinGroup() {
    // console.log("Opening join group modal");
    const modal = await this._modalController.create({
      component: JoinGroupModalComponent,
      componentProps: {
        'isOpen': true,
      }
    });
    return await modal.present();
  }

  protected async getUserGroups(user: iUser) {
    // Create an array of group for the user
    const userGroups: iGroup[] = [];
    for (const groupId of user.groups?.member) {
      const group = await this._firestoreService.getGroup(groupId);
      userGroups.push(group);
    }
    return userGroups;
  }

  protected async handleGroupChange(groupId: string) {
    // console.log('former group: ', this._groupService.activeGroup);
    await this._groupService.changeGroup(this.user, groupId).then(() => {
      this.ionViewWillEnter();
    });
  }
}
