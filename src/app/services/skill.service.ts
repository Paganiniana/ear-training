import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';
import { TestService } from './test.service';

/** INTERFACE
 * 
 * Selectors
 *  - getSkills() // get all skills
 *  - getSkillsByTrackId() // get all skills by track id
 *  - getSkillsByNeed(int) // gets the top n skills that need practicing
 * 
 * Mutators
 *  - setGood(skill) // sets the  'practiced_sufficiently' property of said skill to true
 *  - removeGood(skill) // sets the  'practiced_sufficiently' property of said skill to false
 */

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor() { }
}
