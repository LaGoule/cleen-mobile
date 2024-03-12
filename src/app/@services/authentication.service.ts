import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';
import { iUser } from '../@interfaces/interfaces';
import { Auth, user, GoogleAuthProvider } from '@angular/fire/auth';
import { signInWithPopup } from '@angular/fire/auth';
import { Observable, firstValueFrom } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private googleProvider = new GoogleAuthProvider();
  public isAuth: Observable<boolean> = user(this._auth).pipe(
    tap(async (user) => {
      if (user) {
      }
    }),
    map(user => user !== null),
  );
  public loggedUser!: any;

  constructor(
    public readonly _auth: Auth,
    private readonly _router: Router,
    private readonly _firestoreService: FirestoreService,
  ) { }

  async loginWithGoogle() {
    // 1 Connect user
      await signInWithPopup(this._auth, this.googleProvider).then(result => {
        this.loggedUser = result.user;
        console.log('AuthService loggedUser: ',this.loggedUser);
      }
    );
    // 2 Check if user exists in database
    // 3 Set user in database
    this.redirectUser();
  }

  async logout() {
    this._auth.signOut();
    this.loggedUser = null;
    this.redirectUser('/login');
  }

  redirectUser(route: string = '/') {
    this._router.navigate([route]);
  }
  
}
