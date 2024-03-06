import { Component } from '@angular/core';
import { TodoListComponent } from '../../@components/todo-list/todo-list.component';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    TodoListComponent,
    IonicModule
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {
  protected title: string = "Dashboard";
}
