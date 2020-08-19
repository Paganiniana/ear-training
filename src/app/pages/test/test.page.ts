import { Component, OnInit } from '@angular/core';

/** INTERFACE
 * 
 * Displays:
 *  - Produces a list of tests of different types
 *    - name the sound
 *    - sound teh name
 *    - image the sound
 *    - sound the image
 *  - type of test is passed to the page in parameters
 *    - if navigated to from tracks, tests all available skills
 *    - if navigated to from skill list, tests only that skill (and closest related?)
 * 
 * TODO:
 *   - provide button for 'explanation' of skill
 *   - if this is teh first test on a given skill, automatically show explanation.
 */

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
