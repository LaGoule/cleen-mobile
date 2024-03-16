import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { iTodo } from '../../@interfaces/interfaces';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular/standalone';
import { EventEmitter, Input, Output } from '@angular/core';
import { FirestoreService } from '../../@services/firestore.service';
import { GroupService } from '../../@services/group.service';

@Component({
  selector: 'app-edit-todo-modal',
  templateUrl: './edit-todo-modal.component.html',
  styleUrls: ['./edit-todo-modal.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
  ]
})
export class EditTodoModalComponent  implements OnInit {
  @Input() isOpen!: boolean;
  @Output() closeAction = new EventEmitter<boolean>();

  updatedTodo: iTodo = {
    title: '',
    completed: false,
    groupId: this._groupService.activeGroup,
    id: ''
  };

  constructor(
    private _modalController: ModalController,
    private readonly _router: Router,
    protected readonly _firestoreService: FirestoreService,
    protected readonly _groupService: GroupService
  ) { }

  ngOnInit() {}

  protected updateTodo(): void {
    if (this.newTodo.title.trim() === '') {
      this.newTodo.title = '';
      return;
    }
    this._firestoreService.addTodoItem({
      groupId: this._groupService.activeGroup,
      title: this.newTodo.title,
      completed: false
    });
    this.newTodo.title = '';
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
}
