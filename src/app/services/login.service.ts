import { UserService } from 'src/app/services/user.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user: any = {};
  users: Observable<any[]>;
  fbUser: any;
  itemsCollection: any;
  constructor(
    private firestore: AngularFirestore,
    public auth: AngularFireAuth,
    private router: Router,
    private userService: UserService
  ) {
    this.users = firestore.collection('users').valueChanges();
    this.itemsCollection = this.firestore.collection('users');
    // this.auth.authState.subscribe(
    //   (user: any) => {
    //     console.log('USUARIO LOGEADO EN LOGIN SERVICE');
    //     if (!user) {
    //       return;
    //     }
    //     this.fbUser = user;
    //     const userWithoutName = user.email.split('@', 1);
    //     // this.usuario = user;
    //     this.user.name = user.displayName || userWithoutName[0].charAt(0).toUpperCase() + userWithoutName[0].slice(1);
    //     this.user.email = user.email;
    //     this.user.uid = user.uid;
    //     this.user.photoURL = user.photoURL == null ? './assets/images/users/noimage.jpg' : user.photoURL;
    //     // this.router.navigate(['/main']);

    //     this.userService.user.name = user.displayName || userWithoutName[0].charAt(0).toUpperCase() + userWithoutName[0].slice(1);
    //     this.userService.user.email = user.email;
    //     this.userService.user.uid = user.uid;
    //     this.userService.user.photoURL = user.photoURL == null ? './assets/images/users/noimage.jpg' : user.photoURL;
    //     this.router.navigate(['/main']);
    //   },
    //   (err) => { console.log('ERROR', err); }
    // );
  }

  createUser(user: any) {
    return this.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  loginByEmal(user: any) {
    this.auth.signInWithEmailAndPassword(user.email, user.password).then((value) => {
      // this.user = value;
      const userWithoutName = value.user.email.split('@', 1);
      this.fbUser = user;
      if (value.additionalUserInfo.isNewUser) {
        let newUser: any = {};
        newUser.photoURL = './assets/images/users/noimage.jpg';
        newUser.status = 'Checking some stuffs...';
        newUser.name = this.user.name || this.user.displayName;
        newUser.uid = value.user.uid;
        newUser.email = value.user.email;
        this.addUserData(newUser).then((value) => {
          console.log('OK DATOS DEL USUARIO GUARDADOS ', value);
        }).catch((value) => {
          console.error(value);
        });
      }
      this.user = {
        // photoURL: value.user.photoURL,
        photoURL: value.user.photoURL == null ? './assets/images/users/noimage.jpg' : value.user.photoURL,
        name: value.user.displayName || userWithoutName[0].charAt(0).toUpperCase() + userWithoutName[0].slice(1),
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

  addUserData(user: any) {
    user.uid = this.user.uid;
    console.log('UILD', user.uid);
    return this.itemsCollection.add(user);
  }

  editUserPicture(photoUrl: string) {
    return this.fbUser.updateProfile({
      photoURL: photoUrl
    });
  }

}
