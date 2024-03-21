import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { iTodo, iUser } from '../../@interfaces/interfaces';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular/standalone';
import { EventEmitter, Input, Output } from '@angular/core';
import { FirestoreService } from '../../@services/firestore.service';
import { CommonModule } from '@angular/common';
import { GroupService } from '../../@services/group.service';
import { ToIsoStringPipe } from '../../@pipes/to-iso-string.pipe';
import { addIcons } from 'ionicons';
import { chevronDownOutline } from 'ionicons/icons';
import { UsersToUidPipe } from '../../@pipes/users-to-uid.pipe';
addIcons({ chevronDownOutline });

@Component({
  selector: 'app-edit-todo-modal',
  templateUrl: './edit-todo-modal.component.html',
  styleUrls: ['./edit-todo-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ToIsoStringPipe,
    UsersToUidPipe,
  ]
})
export class EditTodoModalComponent  implements OnInit {
  @Input() todo!: iTodo;
  @Output() closeAction = new EventEmitter<boolean>();

  protected editedTodo!: iTodo;
  protected editedPoints!: string;
  protected groupMembers!: iUser[] | undefined;

  constructor(
    private _modalController: ModalController,
    private readonly _router: Router,
    protected readonly _firestoreService: FirestoreService,
    protected readonly _groupService: GroupService
  ) {}

  async ngOnInit() {
    this.editedTodo = this.todo;
    this.editedPoints = String(this.editedTodo.points);
    this.groupMembers = await this._groupService.getGroupMembers(this._groupService.activeGroup);
  }

  async ionViewWillEnter() {
    console.log('ionViewWillEnter, assignUsers: ', this.editedTodo.assignatedUsers);
  }

  protected updateTodo(): void {
    if (this.editedTodo.title.trim() === '') {
      this.editedTodo.title = '';
      return;
    }
    if (this.editedTodo.dueDate !== null && !this.editedTodo.isScheduled) {
      this.editedTodo.dueDate = null;
    }
    this.editedTodo.points = Number(this.editedPoints);
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

  protected onDueDateChange(event: any) {
    this.editedTodo.dueDate = new Date(event.detail.value);
    // console.log('onDueDateChange:', this.editedTodo.dueDate);
  }
  
  protected onPointsChange(event: any) {
    this.editedTodo.points = Number(event.detail.value);
  }

  protected initDueDate(event: any){
    if (event && this.editedTodo.dueDate === null){
      this.editedTodo.dueDate = new Date();
    } else {
      this.editedTodo.dueDate = null;
    }
  }
  
  compareUsers(u1: iUser, u2: iUser) {
    return u1 && u2 ? u1.uid === u2.uid : u1 === u2;
  }

  comparePoints(p1: number, p2: number) {
    return p1 === p2;
  }
}
