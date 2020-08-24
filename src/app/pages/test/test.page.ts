import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Location, LocationStrategy } from '@angular/common';

import { ToastController } from '@ionic/angular';

import { TrackService } from '../../services/track.service';
import { TestService } from '../../services/test.service';
import { UserService } from '../../services/user.service';

import { User, Assessment, Skill, Track } from '../../services/class_definitions';

/** INTERFACE
 * 
 * Displays:
 *  - When the page enters, produce an 'accustom the ear' sound/overlay
 *  - get a test, present it, record the results,
 *    - in presenting a test, we need to display a question and a set of optionsf
 *  - get the next test
 * 
 * presentEarTuner() // sets some flags for the ui, runs a timer
 * submit() // submits this test, displays results
 * getOptions() // uses 'tag' to get options that go with this one, usually from the same track
 * getAssessment(same_track) // same track defaults to true
 * startNextAssessment() // called on 'progress', uses getAssessment to get an assessment and sets it to the currently running one
 */

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss', '../pages.scss'],
})
export class TestPage implements OnInit {

  // always set at the same time
  current_user: Promise<User>;
  assessment: Promise<Assessment>;
  assessment_skill: Promise<Skill>;
  options_arr: Promise<Array<any>>; // can be anything, depending on the type of the test
  selected;

  constructor(private trackService: TrackService,
    private testService: TestService, 
    private location: Location, 
    private router: Router,
    private toastController: ToastController,
    private userService: UserService) { 
    }

  ngOnInit() {
    this.current_user = this.userService.getUserInfo();
    this.setInitial();
    console.log(this.location.getState());
  }
 
  async setInitial() {
    //TODO:
    // put all of this in a route-event listener so that it runs
    // when we enter the page.  Assume there might be some default values that need clearing.
    this.presentEarTuner();
    // decide here, whether or not 
    // an assessment was indicated, or, if we have to find one
    // if an assignmnet was indicated, there will be a skill_id in location.getState()
    let state = this.location.getState();
    if (state.hasOwnProperty('skill_id')) {
      // we have a skill specified, use it.
      this.assessment = this.getPassedAssessment();
      this.options_arr = this.populateOptions();
      this.assessment_skill = this.trackService.getSkillById(this.location.getState()['skill_id']);
    } else {
      // temporary solution
      this.setInitialRandom();
    }
  }

  async setInitialRandom() {
    // this is really hacky and needs fixed
    let assessments = await this.testService.getAllAssessments();
    let i = Math.floor(Math.random() * assessments.length);
    this.assessment = new Promise((resolve, reject) => {
      resolve(assessments[i]);
    });
    this.assessment_skill = this.trackService.getSkillById(assessments[i].getSkillId());
    this.options_arr = this.populateOptions();
  }


  async getPassedAssessment() {
    // get passed assessment
    let skill = await this.trackService.getSkillById(this.location.getState()['skill_id'])
    
    let assessments = await this.testService.getAssessmentsBySkill(skill);
    return assessments[0];
  }

  async getMostNeededAssessment() {
    // TODO
    // STUB, just returns a random assessment
    let assessments = await this.getOtherAssessments();
    let i = Math.floor(Math.random() * assessments.length);
    console.log(assessments, i);
    return assessments[i];
  }

  // returns a list of assessments in the target's same track (not the target)
  async getOtherAssessments(same_track: Boolean = true) {
    // TODO
    //  handle case where "same_track" is false
    let current_assessment
    if (this.assessment) {
      current_assessment = await this.assessment;
    } else {
      current_assessment = undefined;
    }
    
    let current_skill = await this.trackService.getSkillById(current_assessment.getSkillId());
    let track = await this.trackService.getTrackById(current_skill.getTrackId());
    let track_skills = await this.trackService.getSkillsByTrack(track);
    let track_ids = track_skills.map((t) => {
      return t.getId();
    });
    let all_assessments = await this.testService.getAllAssessments();

    return all_assessments.filter((a) => {
      if (track_ids.includes(a.getSkillId()) && a.getId() != current_assessment.getId()) {
        return a;
      }
    });
  }

  async getOtherSkills() {
    /// returns a list of skills in the same track (not the target)
    let target_skill = await this.assessment_skill;
    let track = await this.trackService.getTrackById(target_skill.getTrackId());
    let skills = await this.trackService.getSkillsByTrack(track);
    return skills.filter((s) => {
      if (s.getId() != target_skill.getId()) {
        return s;
      }
    });
  }

  async populateOptions(limit: number = 4) { // number of options defaults to 4
    // collect potential options
    let options = [];
    // TODO: adjust this part based on 
    options.push((await this.getRightOption()));
    // shuffle array
    for (let i = 1; i < limit; i++) {
      options.push(await this.getWrongOption());
    }
    console.log(options);
    // return
    return options;
  }
 
  async submit() {
    // used to record the attempt
    let user = await this.current_user;
    let assessment = await this.assessment;
    let right_option = await this.getRightOption();
    // do the check 
    let message;
    if (right_option == this.selected) {
      message = "You chose wisely!"; 
      console.log(message);
      // TODO: record the attempt
      this.testService.createNewResults(user, assessment, true);
      // get things going for the next one
      setTimeout(() => {
        this.assessment = this.getMostNeededAssessment();
        this.options_arr = this.populateOptions();
        this.assessment_skill = this.trackService.getSkillById(this.location.getState()['skill_id']);
      }, 1000);
    } else {
      // TODO: record the attempt
      this.testService.createNewResults(user, assessment, false);
      message = "You chose poorly!";
      console.log(message);
    }
    // modal popover
    let toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  select(obj) {
    console.log("Option selected", obj);
    this.selected = obj;
  }


  presentEarTuner() {
    // sets the overlay
    // shows a clock
    // plays the sound
    // gives the user a pep-talk
    //  STUB
    let i = 10;
    console.log(`Counting Down!`);
    let a = setInterval(() => {
      console.log(i);
      i--;
      if (i <= 0) {
        clear();
      }
    }, 1000); // not a real timer 
    function clear() {
      clearInterval(a);
    }
  }

  async getRightOption() {
    switch((await this.assessment).getTag()) {
      case "name_the_sound":
        let skill = await this.assessment_skill;
        return skill;  
        break;
      case "sound_the_name":
        let assessment = await this.assessment;
        return assessment;
        break;
    }
  }

  async getWrongOption() {
    let i;
    // uses this.assessment to match skill, ensure there are no duplicates
    switch((await this.assessment).getTag()) {
      case "name_the_sound":
        let skills = await this.getOtherSkills();
        i = Math.floor(Math.random() * skills.length);
        return skills[i];  
        break;
      case "sound_the_name":
        let assessments = await this.getOtherAssessments();
        i = Math.floor(Math.random() * assessments.length);
        return assessments[i];
        break;
    }
  }

}
