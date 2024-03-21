import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { iTodo } from '../../@interfaces/interfaces';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons'
import { FirestoreService } from '../../@services/firestore.service';
import { ProfilePicturePipe } from '../../@pipes/profile-picture.pipe';
import { ribbon, reorderThree } from 'ionicons/icons';
import { GroupService } from '../../@services/group.service';
import { AuthenticationService } from '../../@services/authentication.service';
addIcons({ ribbon, reorderThree });

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ProfilePicturePipe,
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  @Input() todo!: iTodo;
  @HostBinding('style.--border-color') borderColor!: string;

  user = this._authService.activeUser;

  constructor(
    private readonly _firestoreService: FirestoreService,
    private readonly _authService: AuthenticationService,
  ) {}

  onInit(): void {
  }

  async handleToggle(): Promise<void> {
    const todo = this.todo;
    // Todo is toggled
    if(this.todo.completed === false){
      // There is assignated users
      if(todo.assignatedUsers && todo.assignatedUsers.length > 0){
        todo.completedBy = todo.assignatedUsers.map(user => user.uid);
      // There is no assignated users
      } else {
        todo.assignatedUsers = [this.user];
        todo.completedBy = [this.user.uid];
      }
      // Add todo points to each assignated user
      todo.assignatedUsers.forEach(user => {
        this._firestoreService.addPoints(user.uid, todo.points);
      });
    // Todo is untoggled
    } else {
      todo.completedBy = [];
    }
    await this._firestoreService.toggleTodoItem(todo);
  }

  async defineColor(): Promise<void> {
    console.log('todo color',this.todo.color);
  }
}
