import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { addCircle, list, calendar, people, settings, } from 'ionicons/icons';
addIcons({ addCircle, list, calendar, people, settings, });

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    RouterOutlet,
  ],
})
export class TabBarComponent  implements OnInit {

  constructor() {}

  ngOnInit() {}

}
