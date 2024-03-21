import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { FirestoreService } from '../../@services/firestore.service';
import { FormsModule } from '@angular/forms';
import { GroupService } from '../../@services/group.service';
import { AuthenticationService } from '../../@services/authentication.service';

@Component({
  selector: 'app-join-group-modal',
  templateUrl: './join-group-modal.component.html',
  styleUrls: ['./join-group-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ],
})
export class JoinGroupModalComponent  implements OnInit {
  groupCode: string = "";

  constructor(
    private readonly _firestoreService: FirestoreService,
    private readonly _modalController: ModalController,
    private readonly _groupService: GroupService,
    private readonly _authService: AuthenticationService,
    private readonly _router: Router,
  ) { }

  ngOnInit() {}

  async joinGroup() {
    const currentUser = this._authService.activeUser;
    await this._groupService.joinGroup(currentUser ,this.groupCode);
    console.log("Joining group with code: ", this.groupCode);
  }

  protected cancel(): void {
    this._modalController.dismiss(null, 'cancel');
    this._router.navigate(['/group']);
  }
  
  protected confirm(): void {
    if (!this.groupCode) {
      console.log("Group code is required");
      return;
    }
    if (this.groupCode.length !== 20) {
      console.log("Group code must be 20 characters long");
      return;
    }
    // check if group exists in db
    const group = this._firestoreService.getGroup(this.groupCode);
    if (!group) {
      console.log("Group not found");
      return;
    }
    // if it does, init logic to join group
    this.joinGroup();
    this._modalController.dismiss(null, 'cancel');
    this._router.navigate(['/group']);
  }

}
