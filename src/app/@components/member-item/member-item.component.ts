import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { iUser } from '../../@interfaces/interfaces';
import { addIcons } from 'ionicons';
import { ribbon } from 'ionicons/icons';
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

  constructor() {}

  ngOnInit() {}

}
