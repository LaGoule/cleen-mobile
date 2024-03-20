import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { addCircle, list, calendar, people, settings, } from 'ionicons/icons';
import { NewTodoModalComponent } from '../new-todo-modal/new-todo-modal.component';
addIcons({ addCircle, list, calendar, people, settings, });
import { AuthenticationService } from '../../@services/authentication.service';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular/standalone';


@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterOutlet,
    NewTodoModalComponent,
  ],
})
export class TabBarComponent  implements OnInit {

  constructor(
    protected readonly _authService: AuthenticationService,
    private _modalController: ModalController,
  ) {}

  ngOnInit() {}

  async openNewTodoModal() {
    const modal = await this._modalController.create({
      component: NewTodoModalComponent,
      componentProps: {
        'isOpen': true,
      }
    });
    return await modal.present();
  }

}
