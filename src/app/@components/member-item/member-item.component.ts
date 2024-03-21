import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { iUser } from '../../@interfaces/interfaces';
import { addIcons } from 'ionicons';
import { ribbon } from 'ionicons/icons';
import { FirestoreService } from '../../@services/firestore.service';
addIcons({ ribbon });

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
  ) {}

  ngOnInit() {}

  async ngOnViewWillEnter() {
    this.member = await this._firestoreService.getUser(this.member.uid);
  }

}
