import { Component, OnInit } from '@angular/core';

/** INTERFACE:
 * 
 * Expects:
 *  - percent: integer (0-100)
 *  - orientation: boolean
 * 
 * Provides:
 *  - A visual display of how far along someone is on a certain something 
 *  - displays vertical on orientation true, horizontal on contrary.
 *  
 * 
 */

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
