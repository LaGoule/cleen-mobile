import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { FirestoreService } from '../../@services/firestore.service';
import { GroupService } from '../../@services/group.service';
import { FormsModule } from '@angular/forms';
import { iTodo, iUser } from '../../@interfaces/interfaces';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { chevronDownOutline } from 'ionicons/icons';
addIcons({ chevronDownOutline });

@Component({
  selector: 'app-new-todo-modal',
  templateUrl: './new-todo-modal.component.html',
  styleUrls: ['./new-todo-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ]
})
export class NewTodoModalComponent  implements OnInit {
  @Output() closeAction = new EventEmitter<boolean>();

  newTodo: iTodo = {
    title: '',
    completed: false,
    groupId: this._groupService.activeGroup,
    id: '',

    creationDate: new Date(),
    color: '',
    points: 0 as number,
    priority: 1,
    description: '',
    dueDate: new Date(),
    repeat: 'once',
    assignatedUsers: [],
  };
  protected groupMembers!: iUser[] | undefined;

  constructor(
    private _modalController: ModalController,
    private readonly _router: Router,
    protected readonly _firestoreService: FirestoreService,
    protected readonly _groupService: GroupService
  ) { }

  async ngOnInit() {
    this.groupMembers = await this._groupService.getGroupMembers(this._groupService.activeGroup);
  }

  protected createTodo(): void {
    if (this.newTodo.title.trim() === '') {
      this.newTodo.title = '';
      return;
    }
    console.log('Creating new todo:', this.newTodo);
    const newTodo = {
      id: '', // Will be set by the database
      groupId: this._groupService.activeGroup,
      title: this.newTodo.title,
      completed: false,

      creationDate: new Date(),
      color: this.newTodo.color,
      points: this.newTodo.points as number,
      priority: this.newTodo.priority,
      description: this.newTodo.description,
      dueDate: this.newTodo.dueDate,
      repeat: this.newTodo.repeat,
      assignatedUsers: this.newTodo.assignatedUsers,
      completedBy: [],
    }
    this._firestoreService.addTodoItem(newTodo);
    this.resetForm();
  }

  protected cancel(): void {
    this._modalController.dismiss(null, 'cancel');
    this._router.navigate(['/']);
  }
  
  protected confirm(): void {
    this.createTodo();
    this._modalController.dismiss(null, 'cancel');
    this._router.navigate(['/']);
  }

  private resetForm(): void {
    this.newTodo = {
      title: '',
      completed: false,
      groupId: this._groupService.activeGroup,
      id: '',
  
      creationDate: new Date(),
      color: '',
      points: 0 as number,
      priority: 1,
      description: '',
      repeat: 'once',
      assignatedUsers: [],
    };
  }

  onDueDateChange(event: any) {
    this.newTodo.dueDate = new Date(event.detail.value);
  }
}
