import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, NO_ERRORS_SCHEMA } from '@angular/core';
import { iTodo } from '../../@interfaces/interfaces';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons'
import { trash } from 'ionicons/icons';
addIcons({ trash });

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

  constructor() {}

  onInit(): void {
  }
}
