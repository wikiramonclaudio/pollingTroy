import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PollService {
  protected itemsCollection: AngularFirestoreCollection<any>;
  // crear despues interface poll
  public polls: any[] = [];
  constructor(
    private firestore: AngularFirestore
  ) {

  }

  addPoll(poll: any) {
    // const mensaje: Mensaje = {
    //   nombre: this.usuario.nombre,
    //   mensaje: texto,
    //   fecha: new Date().getTime(),
    //   uid: this.usuario.uid
    // };
    return this.itemsCollection.add(poll);
  }

  getPoll(){

  }

  getPolls(){
    this.itemsCollection = this.firestore.collection<any>('polls', ref => ref.orderBy('initdate', 'desc').limit(10));
    // this.items = this.itemsCollection.valueChanges();
    return this.itemsCollection.valueChanges()
      .pipe(map((mensajes: any[]) => {
        this.polls = [];
        for (const mensaje of mensajes) {
          this.polls.unshift(mensaje);
        }
        // this.chats = mensajes;
      }));
  }

  toTimestamp(year,   month, day, hour, minute, second){
    let datum = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
    return datum.getTime() / 1000;
   }

}
