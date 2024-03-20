import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';
addIcons({ arrowBack });
import { AuthenticationService } from '../../@services/authentication.service';
import { GroupService } from '../../@services/group.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    IonicModule,
  ],
})
export class PageHeaderComponent  implements OnInit {
  @Input() title: string = "";
  @Input() backUrl: string = "";
  user!: any;
  activeGroup!: any;

  constructor(
    private readonly _router: Router,
    protected readonly _authService: AuthenticationService,
    protected readonly _groupService: GroupService
  ) { }

  ngOnInit() {
    if (this._authService.activeUser) {
      this.user = this._authService.activeUser;
      this.activeGroup = this._groupService.activeGroup;
    }
  }

  navigateToProfile() {
    this._router.navigate(['/profile', this.user.uid]);
  }
}
