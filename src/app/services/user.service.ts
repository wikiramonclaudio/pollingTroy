import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: any = {};
  items: Observable<any[]>;
  fbUser: any;
  constructor(
    private firestore: AngularFirestore,
    public auth: AngularFireAuth,
    private router: Router
  ) {
    this.items = firestore.collection('items').valueChanges();

    this.auth.authState.subscribe(
      (user: any) => {
        console.log('estado del user', user);
        if (!user) {
          return;
        }
        this.fbUser = user;
        const userWithoutName = user.email.split('@', 1);
        // this.usuario = user;
        this.user.name = user.displayName || userWithoutName[0].charAt(0).toUpperCase() + userWithoutName[0].slice(1);
        this.user.email = user.email;
        this.user.uid = user.uid;
        this.user.photoURL = user.photoURL == null ? './assets/images/users/noimage.jpg' : user.photoURL;
        this.router.navigate(['/main']);
      },
      (err) => { console.log('ERROR', err); }
    );
  }

  createUser(user: any) {
    return this.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  loginByEmal(user: any) {
    this.auth.signInWithEmailAndPassword(user.email, user.password).then((value) => {
      this.user = value;
      const userWithoutName = value.user.email.split('@', 1);
      this.fbUser = user;
      this.user = {
        // photoURL: value.user.photoURL,
        photoURL: value.user.photoURL == null ? './assets/images/users/noimage.jpg' : value.user.photoURL,
        displayName: value.user.displayName || userWithoutName[0].charAt(0).toUpperCase() + userWithoutName[0].slice(1),
        email: value.user.email,
        uid: value.user.uid
      };
      this.router.navigate(['/main']);
    });
  }

  loginByGoogle() {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((value) => {
    }).catch((err) => {
      console.log('ERROR', err);
    });
  }

  logout() {
    this.auth.signOut().then(() => {
      console.log('Usuario desloggeadoe¡');
      this.router.navigate(['']);
      this.user = {};
    }).catch((error) => {
      console.log(error);
    });
  }

  getUser() {
    return this.user;
  }

  editUser(name?: string, photoUrl: string = null) {
    return this.fbUser.updateProfile({
      displayName: name,
      photoURL: photoUrl
    });
    this.user.photoURL = photoUrl;
  }

  editUserPicture(photoUrl: string) {
    return this.fbUser.updateProfile({
      photoURL: photoUrl
    });
  }

}
