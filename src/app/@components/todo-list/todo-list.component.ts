import { Component, Input, Query } from '@angular/core';
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
import { QueryConstraint } from '@angular/fire/firestore';
addIcons({ add, search, filter});
import { ItemReorderEventDetail } from '@ionic/core';
import { EditTodoModalComponent } from '../edit-todo-modal/edit-todo-modal.component';
import { ModalController } from '@ionic/angular/standalone';
import { GroupByPipe } from '../../@pipes/group-by.pipe';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    TodoItemComponent,
    GroupByPipe,
    SortTodosPipe,
    EditTodoModalComponent,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  @Input() listTitle!: string;
  @Input() constraintIndex!: number;
  @Input() sortingType!: string;

  protected activeGroup: string = '';
  protected todoList$!: Observable<iTodo[]>;
  protected currentEditedTodo!: iTodo | null;
  protected isActionSheetOpen: boolean = false;
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
  protected isEditTodoOpen: boolean = false;

  constructor(
    protected readonly _firestoreService: FirestoreService,
    protected readonly _groupService: GroupService,
    protected readonly _modalController: ModalController,
  ){}

  async ngOnInit(): Promise<void> {
    this.activeGroup = this._groupService.activeGroup;
    this.todoList$ = this._firestoreService.loadTodos(this.activeGroup, this.constraintIndex);
  }

  toggleActionSheet(toggle: boolean, todo?: iTodo): void {
    this.isActionSheetOpen = toggle;
    if(toggle && todo){
      this.currentEditedTodo = todo;
    }
  }

  handleClickOnTodoItem($event: any, todo: iTodo): void {
    if(
      $event.target.tagName === 'ION-CHECKBOX' || 
      this.isActionSheetOpen ||
      todo.completed
    ){
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
        this.openEditTodoModal(this.currentEditedTodo);
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

  async openEditTodoModal(todo: iTodo) {
    const modal = await this._modalController.create({
      component: EditTodoModalComponent,
      componentProps: {
        'isOpen': true,
        'todo': todo
      }
    });
    return await modal.present();
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }
}
