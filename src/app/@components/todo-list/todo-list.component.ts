import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { iTodo } from '../../@interfaces/interfaces';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../@services/firestore.service';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons'
import { add } from 'ionicons/icons';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    TodoItemComponent,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {

  todoList$: Observable<iTodo[]> = this._firestoreService.loadTodos('BNa7XXnCtJhLs8qSR1Oa');
  newTodoTitle: string = '';

  constructor(protected readonly _firestoreService: FirestoreService){
    addIcons({ add });
  }

  ngOnInit(): void {}

  protected createTodo(): void {
    if (this.newTodoTitle.trim() === '') {
      this.newTodoTitle = '';
      return;
    }
    this._firestoreService.addTodoItem({
      groupId: 'BNa7XXnCtJhLs8qSR1Oa',
      title: this.newTodoTitle,
      completed: false
    });
    this.newTodoTitle = '';
  }

}
