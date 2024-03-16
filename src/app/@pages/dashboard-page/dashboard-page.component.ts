import { Component, ViewChild } from '@angular/core';
import { TodoListComponent } from '../../@components/todo-list/todo-list.component';
import { IonicModule } from '@ionic/angular';
import { IonModal } from '@ionic/angular/common';
import { PageHeaderComponent } from '../../@components/page-header/page-header.component';
import { Router, RouterModule } from '@angular/router';
import { NewTodoModalComponent } from '../../@components/new-todo-modal/new-todo-modal.component';
import { DashboardHeaderComponent } from '../../@components/dashboard-header/dashboard-header.component';
import { QueryConstraint } from '@angular/fire/firestore';
import { query, where } from '@firebase/firestore';

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
  protected constraints: QueryConstraint[] = [
    where('completed', '==', false),
    where('completed', '==', true),
  ]

  constructor(
    private readonly _router: Router,
  ) {}

  public navigateToNewTodo(): void {
    // this._router.navigate(['settings']);
    console.log('Navigate to new todo');
  }
}
