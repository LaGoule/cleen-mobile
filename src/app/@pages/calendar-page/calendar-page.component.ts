import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PageHeaderComponent } from '../../@components/page-header/page-header.component';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    PageHeaderComponent,
  ],
})
export class CalendarPageComponent  implements OnInit {
  title: string = "Calendar";

  constructor() { }

  ngOnInit() {}

}
