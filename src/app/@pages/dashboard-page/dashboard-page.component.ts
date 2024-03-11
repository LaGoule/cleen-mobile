import { Component, ViewChild } from '@angular/core';
import { TodoListComponent } from '../../@components/todo-list/todo-list.component';
import { IonicModule } from '@ionic/angular';
import { IonModal } from '@ionic/angular/common';
import { PageHeaderComponent } from '../../@components/page-header/page-header.component';
import { Router, RouterModule } from '@angular/router';
import { NewTodoModalComponent } from '../../@components/new-todo-modal/new-todo-modal.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    IonicModule,
    RouterModule,
    PageHeaderComponent,
    TodoListComponent,
    NewTodoModalComponent,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {
  @ViewChild(IonModal) modal!: IonModal;

  protected title: string = "Dashboard";
  protected message: string = '';

  constructor(
    private readonly _router: Router,
  ) {}

  public navigateToSearch(): void {
    this._router.navigate(['search']);
  }

  public navigateToNewTodo(): void {
    // this._router.navigate(['settings']);
    console.log('Navigate to new todo');
  }
}
