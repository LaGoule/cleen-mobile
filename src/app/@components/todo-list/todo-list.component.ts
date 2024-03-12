import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { FirestoreService } from '../../@services/firestore.service';
import { GroupService } from '../../@services/group.service';
import { SortTodosPipe } from '../../@pipes/sort-todos.pipe';
import { iTodo } from '../../@interfaces/interfaces';
import { addIcons } from 'ionicons'
import { add, search, filter } from 'ionicons/icons';
addIcons({ add, search, filter});

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    TodoItemComponent,
    SortTodosPipe,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  protected todoList$: Observable<iTodo[]> = 
    this._firestoreService.loadTodos(this._groupService.currentGroup);
  protected isActionSheetOpen: boolean = false;
  protected currentEditedTodo!: iTodo | null;
  protected actionSheetButtons = [
    {
      text: 'Edit',
      data: {
        action: 'edit',
      },
    },
    {
      text: 'Delete',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];

  constructor(
    protected readonly _firestoreService: FirestoreService,
    protected readonly _groupService: GroupService,
  ){}

  ngOnInit(): void {}

  toggleActionSheet(toggle: boolean, todo?: iTodo): void {
    this.isActionSheetOpen = toggle;
    if(toggle && todo){
      this.currentEditedTodo = todo;
    }
  }

  handleClickOnTodoItem($event: any, todo: iTodo): void {
    if($event.target.tagName === 'ION-CHECKBOX' || this.isActionSheetOpen){
      return;
    }
    this.toggleActionSheet(!this.isActionSheetOpen, todo);
  }

  handleItemAction(event: any) {
    const action = event.detail?.data?.action;
    if(!this.currentEditedTodo){
      return;
    }
    switch (action) {
      case 'edit':
        console.log('Edit todo:', this.currentEditedTodo.id);
        // this._firestoreService.removeTodoItem(this.currentEditedTodoId) TODO: EDIT
        break;
      case 'delete':
        console.log('Delete todo:', this.currentEditedTodo.id);
        this._firestoreService.removeTodoItem(this.currentEditedTodo.id)
        break;
      case 'cancel':
        break;
      default:
        break;
    }
  }
}
