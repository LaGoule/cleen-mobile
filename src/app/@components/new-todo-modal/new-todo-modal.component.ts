import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { FirestoreService } from '../../@services/firestore.service';
import { GroupService } from '../../@services/group.service';
import { FormsModule } from '@angular/forms';
import { iTodo } from '../../@interfaces/interfaces';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  @Input() isOpen!: boolean;
  @Output() closeAction = new EventEmitter<boolean>();

  newTodo: iTodo = {
    title: '',
    completed: false,
    groupId: this._groupService.activeGroup,
    id: '',

    creationDate: new Date(),
    color: '',
    points: 0,
    priority: 1,
    description: '',
    // dueDate: new Date(),
    // assignatedUsers: [],
    // completedBy: [],
    // completionDate: new Date(),
    repeat: 'once',
  };

  constructor(
    private _modalController: ModalController,
    private readonly _router: Router,
    protected readonly _firestoreService: FirestoreService,
    protected readonly _groupService: GroupService
  ) { }

  ngOnInit() {}

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
      points: this.newTodo.points,
      priority: this.newTodo.priority,
      description: this.newTodo.description,
      // dueDate: new Date(),
      // assignatedUsers: [],
      // completedBy: [],
      // completionDate: new Date(),
      repeat: this.newTodo.repeat,
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
      points: 0,
      priority: 1,
      description: '',
      // dueDate: new Date(),
      // assignatedUsers: [],
      // completedBy: [],
      // completionDate: new Date(),
      repeat: 'once',
    };
  }
}
