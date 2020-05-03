import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  /** Based on the screen size, switch from standard to one column per row */
  // cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     console.log('MATCHES??', matches);
  //     if (matches) {
  //       return [
  //         { title: 'Card 1', cols: 1, rows: 1 }
  //       ];
  //     }

  //     return [
  //       { title: 'Card 1', cols: 2, rows: 1 }
  //     ];
  //   })
  // );

  answers: any [];
  bestFighter;
  constructor(private breakpointObserver: BreakpointObserver) {
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
    ]
  }
}
