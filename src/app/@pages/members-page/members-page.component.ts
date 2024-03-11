import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PageHeaderComponent } from '../../@components/page-header/page-header.component';

@Component({
  selector: 'app-members-page',
  templateUrl: './members-page.component.html',
  styleUrls: ['./members-page.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    PageHeaderComponent,
  ],
})
export class MembersPageComponent  implements OnInit {
  title: string = "Members";

  constructor() { }

  ngOnInit() {}
}
