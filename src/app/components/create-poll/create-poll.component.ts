import { PollService } from './../../services/poll.service';
import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent {

  poll: any = {initdate: null, enddate: null, optionlabels: ['', '', '', ''], ownername: '', ownerphoto: '', question: '', votes: [0, 0, 0, 0]  };
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private pollService: PollService
    ) {}

  onSubmit() {
    this.poll.ownername = this.userService.user.name || 'FELIPALES';
    this.poll.ownerphoto = this.userService.user.photoURL;
    this.pollService.addPoll(this.poll).then( (savedItem) => {
      console.log('ELEMENTO GUARDADO', savedItem);
    }).catch( (err) => { console.log(err); });
  }

}
