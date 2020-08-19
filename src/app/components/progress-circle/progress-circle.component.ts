import { Component, OnInit, Input } from '@angular/core';


/** INTERFACE:
 * 
 * Expects:
 *  - deg: integer (0-360)
 *  - content: string 
 * 
 * Provides:
 *  - A visual display of how far along someone is on a certain something 
 *    (usually described by 'content')
 * 
 */

@Component({
  selector: 'app-progress-circle',
  templateUrl: './progress-circle.component.html',
  styleUrls: ['./progress-circle.component.scss'],
})
export class ProgressCircleComponent implements OnInit {

  @Input()
  content: String;
  @Input()
  deg: Number;

  constructor() { }

  ngOnInit() {}

  callUp() {
    console.log("Button Clicked");
  }

  getClip(percentage) { // returns a clip-art polygon() string.
    function getRatio(max_deg, min_deg, real_deg, min_perc, max_perc) {
      let this_perc = ((real_deg - min_deg) * 100) / (max_deg - min_deg);
      return this_perc;
    }
    let clip_path = "";
    let min_perc;
    let max_perc;
      if (percentage < 45){ // y = 0
        min_perc = 50; // x value
        max_perc = 100;
        let perc = getRatio(45, 0, percentage, min_perc, max_perc);
        perc += min_perc;
        clip_path = (`50% 50%, ${perc}% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%`)
      }
      else if (percentage >= 45 && percentage < 135){ // x = 100%
        min_perc = 0; // y value
        max_perc = 100;
        let perc = getRatio(135, 45, percentage, min_perc, max_perc);
        clip_path = (`50% 50%, 100% ${perc}%, 100% 100%, 0% 100%, 0% 0%, 50% 0%`)

      }
      else if (percentage >= 135 && percentage < 225){ // y = 100%
        min_perc = 0; // x value, backwards
        max_perc = 100;
        let perc = getRatio(225, 135, percentage, min_perc, max_perc);
        clip_path = (`50% 50%, ${100-perc}% 100%, 0% 100%, 0% 0%, 50% 0%`)
      }
      else if (percentage >= 225 && percentage < 315){ // x = 0%
        min_perc = 0; // y value
        max_perc = 100;
        let perc = getRatio(315, 225, percentage, min_perc, max_perc);
        clip_path = (`50% 50%, 0% ${100-perc}%, 0% 0%, 50% 0%`)
      }
      else if (percentage >= 315 && percentage <= 360){ // y = 0%
        min_perc = 0; // x value
        max_perc = 50;
        let perc = getRatio(360, 315, percentage, min_perc, max_perc);
        clip_path = (`50% 50%, ${perc}% 0%, 50% 0%`)
      }
      return `polygon(${clip_path})`;

  }

}
