import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { iTodo } from '../../@interfaces/interfaces';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons'
import { FirestoreService } from '../../@services/firestore.service';
import { trash, star } from 'ionicons/icons';
addIcons({ trash, star });

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  @Input() todo!: iTodo;

  constructor(
    private readonly _firestoreService: FirestoreService,
  ) {}

  onInit(): void {
  }

  async handleToggle(): Promise<void> {
    await this._firestoreService.toggleTodoItem(this.todo);
  }
}
