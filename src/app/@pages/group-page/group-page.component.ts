import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PageHeaderComponent } from '../../@components/page-header/page-header.component';
import { GroupService } from '../../@services/group.service';
import { iGroup, iUser } from '../../@interfaces/interfaces';
import { FirestoreService } from '../../@services/firestore.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MemberItemComponent } from '../../@components/member-item/member-item.component';
import { addIcons } from 'ionicons';
import { warning } from 'ionicons/icons';
import { SortMembersPipe } from '../../@pipes/sort-members.pipe';
addIcons({ warning });

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
  activeGroup!: iGroup;
  members!: iUser[];

  constructor(
    protected readonly _router: Router,
    protected readonly _firestoreService: FirestoreService,
    protected readonly _groupService: GroupService,
  ) {}

  async ngOnInit() {
    this.activeGroup = await this._firestoreService.getGroup(this._groupService.activeGroup);
    this.members = await this._firestoreService.getUsers(this.activeGroup.id);
  }
  
  async ionViewWillEnter() {
    this.activeGroup = await this._firestoreService.getGroup(this._groupService.activeGroup);
    this.members = await this._firestoreService.getUsers(this.activeGroup.id);
  }

  handleMemberClick(member: iUser) {
    this._router.navigate(['/profile', member.uid]);
  }
}
