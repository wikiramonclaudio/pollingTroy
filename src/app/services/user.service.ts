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
  constructor(
    firestore: AngularFirestore,
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
        // this.usuario = user;
        this.user.name = user.displayName;
        this.user.email = user.email;
        this.user.uid = user.uid;
        this.user.photoURL = user.photoURL;
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
      this.user = {
        photoURL: value.user.photoURL,
        displayName: value.user.displayName,
        email: value.user.email,
        uid: value.user.uid
      };
      this.router.navigate(['/main']);
    });
  }

  loginByGoogle() {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider()).then( (value) => {
      console.log('LOGEADO POR GOOGLE', value);
    }).catch( (err) => {
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

  getUser(){
    return this.user;
  }

}
