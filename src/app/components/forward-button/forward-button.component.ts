import { Component, OnInit, Input } from '@angular/core';

/** INTERFACE 
 * 
 * DISPLAYS:
 * 
 * - A button that points forward.
 * 
 * 
 * EXPECTS
 * 
 * - (optionally) a url to navigate to.
 * 
 * 
 */

@Component({
  selector: 'app-forward-button',
  templateUrl: './forward-button.component.html',
  styleUrls: ['./forward-button.component.scss'],
})
export class ForwardButtonComponent implements OnInit {

  @Input()
  navigate_to: string;
  
  constructor() { }

  ngOnInit() {}

}
