import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { iUser } from '../../@interfaces/interfaces';
import { addIcons } from 'ionicons';
import { FirestoreService } from '../../@services/firestore.service';
import { ribbon, shieldCheckmark } from 'ionicons/icons';
import { GroupService } from '../../@services/group.service';
addIcons({ ribbon, shieldCheckmark });

@Component({
  selector: 'app-member-item',
  templateUrl: './member-item.component.html',
  styleUrls: ['./member-item.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
  ],
})
export class MemberItemComponent implements OnInit{
  @Input() member!: iUser;
  @Input() isLink!: boolean;

  constructor(
    private readonly _firestoreService: FirestoreService,
    protected readonly _groupService: GroupService,
  ) {}

  ngOnInit() {
    // check if member is admin of the group
  }

  async ngOnViewWillEnter() {
    this.member = await this._firestoreService.getUser(this.member.uid);
  }

  handleImgError(event: any, url: string) {
    event.target.src = url;
  }

}
