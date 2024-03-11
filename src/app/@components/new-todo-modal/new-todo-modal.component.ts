import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { OverlayEventDetail } from '@ionic/core';
import { FirestoreService } from '../../@services/firestore.service';
import { FormsModule } from '@angular/forms';
import { iTodo } from '../../@interfaces/interfaces';

@Component({
  selector: 'app-new-todo-modal',
  templateUrl: './new-todo-modal.component.html',
  styleUrls: ['./new-todo-modal.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
  ]
})
export class NewTodoModalComponent  implements OnInit {
  newTodo: iTodo = {
    title: '',
    completed: false,
    groupId: 'BNa7XXnCtJhLs8qSR1Oa',
    id: ''
  };

  constructor(
    private _modalController: ModalController,
    protected readonly _firestoreService: FirestoreService
  ) { }

  ngOnInit() {}

  protected cancel(): void {
    this._modalController.dismiss(null, 'cancel');

  }
  
  protected confirm(): void {
    this.createTodo();
    this._modalController.dismiss(null, 'cancel');
  }

  protected createTodo(): void {
    if (this.newTodo.title.trim() === '') {
      this.newTodo.title = '';
      return;
    }
    this._firestoreService.addTodoItem({
      groupId: this.newTodo.groupId,
      title: this.newTodo.title,
      completed: false
    });
    this.newTodo.title = '';
  }
}
