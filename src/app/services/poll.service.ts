import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PollService {
  protected itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;
  // crear despues interface poll
  public polls: any[] = [];
  activeDashboardPoll: any = { optionlabels: [], votes: [], question: '', oid: ''};
  constructor(
    private firestore: AngularFirestore
  ) {
    // this.itemsCollection = this.firestore.collection('polls', ref => ref.orderBy('initdate', 'desc').limit(10));
  }

  addPoll(poll: any) {
    poll.initdate = Math.round(new Date().getTime() / 1000);
    poll.enddate = Math.round(new Date().getTime() / 1000);
    return this.itemsCollection.add(poll);
  }

  getPoll(){

  }

  getPolls(){
    this.itemsCollection = this.firestore.collection('polls', ref => ref.orderBy('initdate', 'desc').limit(10));
    return this.itemsCollection.valueChanges({idField: 'oid'})
      .pipe(map((polls: any[]) => {
        this.polls = [];
        this.nextDashboardPoll();
        for (const poll of polls) {
          this.polls.unshift(poll);
        }
        // this.polls = polls;
      }));
  }

  cargarPolls() {
    this.itemsCollection = this.firestore.collection('polls', ref => ref.orderBy('initdate', 'desc').limit(10));

    return this.firestore.collection('polls', ref => ref.orderBy('initdate', 'desc').limit(10)).valueChanges()
      .pipe(map((polls: any[]) => {
        this.polls = [];
        for (const poll of polls) {
          this.polls.unshift(poll);
        }
      }));
  }

  editPoll(oid: string, updatedPoll: any) {
    return this.firestore.collection('polls').doc(oid).set(updatedPoll);
  }

  nextDashboardPoll(){
    const pos = Math.round(Math.random() * 5);
    if ( this.polls.length > 0 ){
      this.activeDashboardPoll = this.polls[pos];
    }
  }

}
