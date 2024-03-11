import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PageHeaderComponent } from '../../@components/page-header/page-header.component';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    PageHeaderComponent,
  ],
})
export class SettingsPageComponent  implements OnInit {
  title: string = "Settings";

  constructor() { }

  ngOnInit() {}
}
