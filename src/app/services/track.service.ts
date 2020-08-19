import { Injectable } from '@angular/core';

import { TestService } from './test.service';
import { StorageService } from './storage.service';
import { Track, Skill } from './class_definitions';

/** INTERFACE
 * 
 * getAllTracks() 
 * getTrackProgress(track) // returns value, out of [0-100]
 * 
 * getAllSkills()
 * getSkillsByTrack(track)
 * getNeedsPractice(skill) // returns a value between 0 and 1; 0 is "no practice needed" and 1 is "absolutely practice"
 * getNeedsPracticeArr // helper to loop over practice items and get practice need.
 * getMostNeedPractice(num, track [optional]) // returns an array of skills that need practice
 * 
 */

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  track_store;
  skill_store;

  constructor(private storageService: StorageService, private testService: TestService) { 
    this.track_store = storageService.getStorage('track');
    this.skill_store = storageService.getStorage('skill');
  }

  async getAllTracks() {
    let res = await this.track_store.getAll();
    return res.map((val) => {
      return new Track(val.id, val.name, val.image_arr);
    });
  }

  async getTrackProgress(track) {
    let skills = await this.getSkillsByTrack(track);
    let num_good = 0;
    skills.forEach((skill) => {
      if (skill.isGood()) {
        num_good ++;
      }
    });
    return (num_good / skills.length) * 100;
  }

  async getAllSkills() {
    let res = await this.skill_store.getAll();
    return res.map((val) => {
      return new Skill(val.id, val.track_id, val.title, val.image_arr, val.good);
    });
  }

  async getSkillsByTrack(track) {
    let res = await this.skill_store.getAllByProperty({ track_id: track.getId( )});
    return res.map((val) => {
      return new Skill(val.id, val.track_id, val.title, val.image_arr, val.good);
    });
  }

  async getNeedsPractice(skill) {
    // TODO: Refine algorithm
    //  this is just a placeholder
    let skill_results = await this.testService.getResultsBySkill(skill);
    if (skill.isGood()) {
      return 0.5;
    } else {
      return 1;
    }
  }

  async getNeedsPracticeArr(skills_arr: Array<Skill>, needs_arr: Array<any>) {
    // handle case where an empty skills arr is passed
    if (!skills_arr.length) {
      throw new Error(`getNeedsPracticeArr expects to be called with an array of skill objects and an empty array.`);
    }
    // continue
    if (needs_arr.length == skills_arr.length) {
      return needs_arr;
    } else {
      let skill = skills_arr[needs_arr.length - 1]
      let need = await this.getNeedsPractice(skill);
      needs_arr.push({need: need, skill: skill });
      return this.getNeedsPracticeArr(skills_arr, needs_arr);
    }
  }

  // helper function
  async getMostNeedPractice(num: number, track: Track | undefined) {
    // uses getNeedsPractice on all skills, or, just skills in a given track
    // num limits the number of skills to return
    let skills;
    if (track) {
      skills = await this.getSkillsByTrack(track);
    } else {
      skills = await this.getAllSkills();
    }
    let needs = await this.getNeedsPracticeArr(skills, []);
    needs = needs.sort((need1, need2) => {
      // sorts so that the biggest needs are on the top
      return need2.need - need1.need;
    });

    // returns just the skill object
    return needs[num].map((val) => {
      return val.skil;
    });
  }
}
