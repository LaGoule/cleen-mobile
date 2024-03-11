import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';
addIcons({ arrowBack });

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
  ],
})
export class PageHeaderComponent  implements OnInit {
  @Input() title: string = "Page Header";
  @Input() backUrl: string = "";

  constructor() { }

  ngOnInit() {}

}
