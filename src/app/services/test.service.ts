import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';
import { Assessment, AssessmentResults } from './class_definitions';


/** INTERFACE   
 * 
 * Assessments
 *  - getAssessmentsBySkill(skill)
 *  - getAllAssessments()
 *  - 
 * 
 * 
 * AssessmentResults
 *  - createResults(args...) // creates a new results object in storage
 *  - getAllResults() // get all results, regardless of 
 *  - getResultsByAssessment(assessment) //
 *  - getResultsBySkill(skill) // built on top of getresultsbyassessment
 * 
 * 
 *  NOTE:
 *  - in the future, arrays returned by services may be observables
 */


@Injectable({
  providedIn: 'root'
})
export class TestService {
  assessment_store;
  results_store;

  constructor(private storageService: StorageService) { 
    this.assessment_store = storageService.getStorage('assessment')
    this.results_store = storageService.getStorage('assessment_result');
  }


  // assessments
  async getAssessmentsBySkill(skill) {
    let assessments = await this.assessment_store.getAllByProperty({ skill_id: skill.getId()})
    return assessments.map((val) => {
      return new Assessment(val.id, val.skill_id, val.audio_arr, val.tag);
    });
  }


  async getAllAssessments() {
    let assessments = await this.assessment_store.getAll();
    return assessments.map((val) => {
      return new Assessment(val.id, val.skill_id, val.audio_arr, val.tag);
    });
  }


  // assessment results
  async getAllResults() {
    let results = await this.results_store.getAll();
    return results.map((val) => {
      return new AssessmentResults(val.id, val.user_id, val.assessment_id, new Date(val.date_attempted), val.results);
    });
  }

  async getResultsByAssessment(assessment) {
    // results objects have an assessment_id attribute
    let results = await this.results_store.getAllByProperty({assessment_id: assessment.getId()});
    console.log(results);
    return results.map((val) => {
      return new AssessmentResults(val.id, val.user_id, val.assessment_id, new Date(val.date_attempted), val.results);
    });
  }

  async getResultsBySkill(skill) {
    let assessments = await this.getAssessmentsBySkill(skill);
    let results = await this.getResultsByAssessment(assessments[0]);
    return results;
  }

  createNewResults(user, assessment, results:Boolean)  {
    return this.results_store.create({
      user_id: user.getId(),
      assessment_id: assessment.getId(),
      date_attempted: new Date(),
      results: results
    });
  } 
}
