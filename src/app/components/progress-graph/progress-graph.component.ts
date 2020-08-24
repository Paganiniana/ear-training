import { Component, OnInit } from '@angular/core';

import { TestService } from '../../services/test.service';

/**
 * 
 * INTERFACE
 * 
 * DISPLAYS
 * 
 * 
 * 
 * NOTES:
 *  - see documentation for ngx-charts: https://swimlane.gitbook.io/ngx-charts/
 */

@Component({
  selector: 'app-progress-graph',
  templateUrl: './progress-graph.component.html',
  styleUrls: ['./progress-graph.component.scss'],
})
export class ProgressGraphComponent implements OnInit {

  // ngx configuration
  results: Promise<Array<any>>;
  
  // options
  view;
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'Sessions per Day';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private testService: TestService) { 
    this.view = [innerWidth / 1.3, 400];
  }

  onResize(e) {
    this.view = [e.target.innerWidth / 1.3, 400];
  }

  ngOnInit() {
    this.results = this.getAttemptProgress();
  }

  // populates 'results' with a history of practice attempts
  async getAttemptProgress() {
    let attempts = await this.testService.getAllResults();
    let today = new Date();
    // create an array by comparing date objects to today
    let results = [];
    let a_day = (1000 * 60 * 60 * 24);
    let thirty_days_ago = a_day * 30;
    let start_date = today.setHours(0, 0, 0, 0) - thirty_days_ago;
    for (let i = 1; i<31; i++) {
      let total = attempts.filter((a) => {
        if (a.getDateAttempted() > (start_date + (a_day * i)) 
          && a.getDateAttempted() < (new Date(start_date + (a_day * i))).setHours(23, 59, 59, 999)) {
            return a;
        }
      });
      results.push({
        "name": String((31-i) - 1),
        "value": total.length,
      })
    }
    console.log(results)
    return [{
      "name": "No. Practice Attempts",
      "series": results
    }];
  }

  onSelect(a) {

  }

  onActivate(a) {

  } 

  onDeactivate(a) {

  }
 
}
