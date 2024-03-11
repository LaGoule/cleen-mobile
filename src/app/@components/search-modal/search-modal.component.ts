import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PageHeaderComponent } from '../page-header/page-header.component';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    PageHeaderComponent,
  ],
})
export class SearchModalComponent  implements OnInit {
  title="Search"

  constructor() { }

  ngOnInit() {}

  dismiss() {
    console.log('dismissed');
  }

  search($event: any) {
    console.log('searched', $event.target.value);
  }
}
