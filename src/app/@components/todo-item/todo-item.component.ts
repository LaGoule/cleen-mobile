import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, NO_ERRORS_SCHEMA } from '@angular/core';
import { iTodo } from '../../@interfaces/interfaces';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons'
import { trash } from 'ionicons/icons';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
  schemas: [NO_ERRORS_SCHEMA]
})
export class TodoItemComponent {
  @Input() todo!: iTodo;
  @Output() remove = new EventEmitter<string>();
  @Output() toggle = new EventEmitter<iTodo>();

  constructor() {
    addIcons({ trash });
  }

  onInit(): void {
  }

  protected toggleTodo(): void {
    // this.todo.completed = !this.todo.completed;
    this.toggle.emit(this.todo);
  }
  
  protected onRemove(): void {
    this.remove.emit(this.todo.id);
  }
}
