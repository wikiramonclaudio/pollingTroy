import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-vertical-barchart',
  templateUrl: './vertical-barchart.component.html',
  styleUrls: ['./vertical-barchart.component.css']
})
export class VerticalBarchartComponent implements OnInit {
  single = [
    {
      'name': 'Germany',
      'value': 234
    },
    {
      'name': 'USA',
      'value': 432
    },
    {
      'name': 'France',
      'value': 127
    }
  ];

  multi = [
    {
      'name': 'Germany',
      'series': [
        {
          'name': '2010',
          'value': 1343
        },
        {
          'name': '2011',
          'value': 2122
        }
      ]
    },

    {
      'name': 'USA',
      'series': [
        {
          'name': '2010',
          'value': 1233
        },
        {
          'name': '2011',
          'value': 4531
        }
      ]
    },

    {
      'name': 'France',
      'series': [
        {
          'name': '2010',
          'value': 1000
        },
        {
          'name': '2011',
          'value': 1800
        }
      ]
    }
  ];


  view: any[] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = false;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  // yAxisLabel: string = 'Population';
  yAxisLabel = null;
  legendTitle: string = 'Years';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  constructor() { }

  ngOnInit(): void {
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
