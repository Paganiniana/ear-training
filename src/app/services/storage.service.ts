import { Injectable } from '@angular/core';

import { LocalStore, RemoteStore } from './class_definitions';

/** INTERFACE (Service)
 * 
 * NOTE:
 *    StorageService is really just a wrapper that works off of LocalStore and RemoteStore, 
 *    see the class_definitions.ts file.
 *    Most of the logic here pertains to deciding whether or not the user's data should be stored
 *    locally or externally.
 * 
 * Methods:
 *  - PUBLIC getStorage(bucket) // where bucket is a string
 *  - PRIVATE getLocalStorage(bucket)
 *  - PRIVATE getRemoteStorage(bucket)
 *  - PRIVATE synchronizeLocalRemote(bucket)
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
    // checks to make sure local copies of certain values are stored
    //  if not running in test mode
    if (!this.inTestMode()) {
      this.ensureDefaults();
    }
  }

  inTestMode() {
    try {
      // check node environment to see
      //  whether we are running in a test;
      return process.env.JEST_WORKER_ID !== undefined;
    } catch(e) {
      // fail silently
      return false;
    }
  }

  getStorage(bucket) {
    // in future versions, some fancy checks will happen here to 
    //  decide which version of storage to return
    //  for right now, we just default ot local
    return this.getLocalStorage(bucket);
  }

  getLocalStorage(bucket) {
    return new LocalStore(bucket);
  }

  getRemoteStorage(bucket) {
    // TODO
  }

  synchronizeLocalRemote(bucket) {
    // TODO
  } 

  async ensureDefaults() {
    // TEMP:
    //  this function makes sure that 'tracks', 'skills', and 'assessments' are all initialized
    //  this may be replaced in the near future
    let track_storage = await this.getStorage('track');
    let skill_storage = await this.getStorage('skill');
    let assessment_storage = await this.getStorage('assessment');
    let res_arr = [];
    // tracks
    let ls = await track_storage.getAll();
    if (!ls.length) {
      res_arr.push(track_storage.populateDefaults('/assets/defaults/tracks.json'));
    }
    // skills
    ls = await skill_storage.getAll();
    if (!ls.length) {
      res_arr.push(skill_storage.populateDefaults('/assets/defaults/skills.json'));
    }
    // assessments
    ls = await assessment_storage.getAll();
    if (!ls.length) {
      res_arr.push(assessment_storage.populateDefaults('/assets/defaults/assessments.json'));
    }
    return Promise.all(res_arr);
  }


}



