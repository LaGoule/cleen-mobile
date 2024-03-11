import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-newtodo-page',
  templateUrl: './newtodo-page.component.html',
  styleUrls: ['./newtodo-page.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class NewtodoPageComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
