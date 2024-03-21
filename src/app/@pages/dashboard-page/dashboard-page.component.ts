import { Component, ViewChild } from '@angular/core';
import { TodoListComponent } from '../../@components/todo-list/todo-list.component';
import { IonicModule } from '@ionic/angular';
import { IonModal } from '@ionic/angular/common';
import { PageHeaderComponent } from '../../@components/page-header/page-header.component';
import { RouterModule } from '@angular/router';
import { NewTodoModalComponent } from '../../@components/new-todo-modal/new-todo-modal.component';
import { DashboardHeaderComponent } from '../../@components/dashboard-header/dashboard-header.component';
import { ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
addIcons({ add });

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    IonicModule,
    RouterModule,
    PageHeaderComponent,
    TodoListComponent,
    DashboardHeaderComponent,
    NewTodoModalComponent,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {
  @ViewChild(IonModal) modal!: IonModal;

  protected title: string = "Dashboard";
  protected message: string = '';
  protected sortingType: string = 'alphabetical';

  constructor(
    private readonly _modalController: ModalController,
  ) {}

  async openNewTodoModal() {
    const modal = await this._modalController.create({
      component: NewTodoModalComponent,
      componentProps: {
        'isOpen': true,
      }
    });
    return await modal.present();
  }

  onSortingTypeChange(sortingType: string) {
    this.sortingType = sortingType;
    // console.log(`Sorting type changed to ${sortingType}`);
  }
}
