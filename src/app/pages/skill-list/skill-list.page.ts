import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { TrackService } from '../../services/track.service';
import { Track, Skill } from '../../services/class_definitions';

/** INTERFACE
 * 
 * Expects:
 *  - location.getState() returns an object, that object should include a 'track_id' property with the id of the track for whom we are displaying.
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
  styleUrls: ['./skill-list.page.scss', '../pages.scss'],
})
export class SkillListPage implements OnInit {

  // Just for stubs
  skill_name="Skill Name";
  skills;

  constructor(private location: Location, private trackService: TrackService) { }

  ngOnInit() {
    this.initialize();
  }

  async initialize() {
    try {
      // get a list of skills
    let state: any = this.location.getState();
    let track = await this.trackService.getTrackById(state.track_id);
    console.log(track, state);
    this.skills = this.trackService.getSkillsByTrack(track);
    console.log(this.skills);
    } catch (e) {
      // fails 'relatively' silently,
      // the case where no skills are provided by the router is handled by the UI.
      console.error("Could not get track_id frm state", e);
    }
  }

}
