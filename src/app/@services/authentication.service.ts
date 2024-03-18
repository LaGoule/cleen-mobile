import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { iUser } from '../@interfaces/interfaces';
import { Auth, GoogleAuthProvider } from '@angular/fire/auth';
import { signInWithPopup } from '@angular/fire/auth';
import { FirestoreService } from './firestore.service';
import { GroupService } from './group.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private googleProvider = new GoogleAuthProvider();
  private _authUser!: any;
  public activeUser!: any;

  constructor(
    private readonly _auth: Auth,
    private readonly _router: Router,
    private readonly _firestoreService: FirestoreService,
    private readonly _groupService: GroupService,
  ) { }

  /**
   * @description
   * Login with Google
   */
  async loginWithGoogle() {
    // 1 Connect user to app
    await signInWithPopup(this._auth, this.googleProvider).then(result => {
      this._authUser = result.user;
    });
    // 2 Check if logged user exists in database
    const user = await this._firestoreService.getUser(this._authUser.uid);
    if(user && user.uid === this._authUser.uid){
    } else {
      // 3 If not, set user in database
      this.createNewUser(this._authUser);
    }
    // 4 Set user in service
    await this.setUser();
    // 5 Handle group login
    await this._groupService.handleLogin(this.activeUser);
    // 6 Redirect user to home
    this.redirectUser('/home');
  }

  async logout() {
    this._auth.signOut();
    this._authUser = null;
    this.activeUser = null;
    this.redirectUser('/login');
    console.log('User signed out!');
  }

  async createNewUser(loggedUser: iUser) {
    await this._firestoreService.addUser({
      uid: loggedUser.uid,
      email: loggedUser.email,
      displayName: loggedUser.displayName,
      photoURL: loggedUser.photoURL,
      groups: {
        active: '',
        admin: [],
        member: [],
      },
      points: {
        total: 0,
        dailyTotal: 0,
        weaklyTotal: 0,
        monthlyTotal: 0,
      },
    }, loggedUser.uid);
    console.log('User created: ', this._authUser.uid);
  }

  async setUser() {
    const userFound = await this._firestoreService.getUser(this._authUser.uid);
    if(this.activeUser != userFound) {
      this.activeUser = userFound;
      // console.log('User set in service: ', this.activeUser.uid);
    }
  }

  redirectUser(route: string = '/') {
    this._router.navigate([route]);
  }
}
