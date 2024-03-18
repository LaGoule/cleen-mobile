import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { iTodo } from '../../@interfaces/interfaces';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular/standalone';
import { EventEmitter, Input, Output } from '@angular/core';
import { FirestoreService } from '../../@services/firestore.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-todo-modal',
  templateUrl: './edit-todo-modal.component.html',
  styleUrls: ['./edit-todo-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ]
})
export class EditTodoModalComponent  implements OnInit {
  // @Input() isOpen!: boolean;
  // @Input() todoToUpdate!: iTodo; // a retirer
  @Input() todo!: iTodo;
  @Output() closeAction = new EventEmitter<boolean>();

  protected editedTodo: iTodo = this.todo;

  constructor(
    private _modalController: ModalController,
    private readonly _router: Router,
    protected readonly _firestoreService: FirestoreService,
  ) {}

  ngOnInit() {
  }

  protected updateTodo(): void {
    if (this.editedTodo.title.trim() === '') {
      this.editedTodo.title = '';
      return;
    }
    this._firestoreService.updateTodoItem(this.editedTodo);
    this.editedTodo.title = '';
  }

  protected cancel(): void {
    this._modalController.dismiss(null, 'cancel');
    this._router.navigate(['/']);
  }
  
  protected confirm(): void {
    this.updateTodo();
    this._modalController.dismiss(null, 'cancel');
    this._router.navigate(['/']);
  }
}
