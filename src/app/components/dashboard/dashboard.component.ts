import { UserService } from 'src/app/services/user.service';
import { PollService } from './../../services/poll.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Subject } from 'rxjs';


// import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  result: number;
  answers: any[];
  bestFighter;
  polls = [];
  activePoll: any = { optionlabels: [], votes: [], question: '', oid: ''};
  @Output() updateChart = new EventEmitter();

  // Subject to pass data to child component (Chart to refresh it)
  updateChartSubject: Subject<void> = new Subject<void>();

  constructor(
    private breakpointObserver: BreakpointObserver,
    public pollService: PollService,
    public userService: UserService
  ) {
    this.getPolls();
  }

  ngOnInit() {
    this.answers = [
      {
        id: 'A',
        text: 'Anderson Silva'
      },
      {
        id: 'B',
        text: 'John Jones'
      },
      {
        id: 'C',
        text: 'Khabib Nurmagomedov'
      }
    ];

  }

  // Emit evento to the chart component for it to refresh the data
  emitEventToChild() {
    this.updateChartSubject.next();
  }

  getPolls() {
    // this.nextQuestion();
    this.pollService.getPolls().subscribe(
      () => {
        this.polls = this.pollService.polls;
        console.log('nueva data obtenida');
        this.emitEventToChild();
        this.nextQuestion();
      }
    );
  }

  nextQuestion(){
    const pos = Math.round(Math.random() * 5);
    if(this.pollService.polls.length > 0 ){
      this.pollService.activeDashboardPoll = this.pollService.polls[pos];
    }
  }

  changeSelection(){
    // console.log(this.result);
  }

  sendVote(){
    this.pollService.activeDashboardPoll.votes[this.result] = this.pollService.activeDashboardPoll.votes[this.result] + 1;
    this.pollService.editPoll(this.pollService.activeDashboardPoll.oid, this.pollService.activeDashboardPoll).then(
      () => {
        console.log('Se ha guardado tu voto');
        // pollService.activeDashboardPoll.votes
      }
    ).catch((err) => {console.log(err)});
  }
}
