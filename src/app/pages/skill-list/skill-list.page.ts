import { Component, OnInit } from '@angular/core';


/** INTERFACE
 * 
 * Displays:
 *  - List of skills related to the track that was clicked on in tracks
 *  - it should be indicated whether a skill has been practiced to 'satisfaction' or 'finished'
 *  - only a certain number of skills should be 'practiceable' in advance of those which are 'finished'
 *  - when a skill is clicked on, a practice session starts
 */

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.page.html',
  styleUrls: ['./skill-list.page.scss'],
})
export class SkillListPage implements OnInit {

  // Just for stubs
  skill_name="Skill Name";

  constructor() { }

  ngOnInit() {
  }

}
