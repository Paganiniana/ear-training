import { Injectable } from '@angular/core';

/** INTERFACE
 * 
 * Constructors
 *  - getPlayer(audio_url)
 *    - play
 *    - pause
 * 
 * Implementation:
 *  - player
 *    - web audio api
 *      - make input with audio_url
 *      - default destination
 * 
 */

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor() { }

  getPlayer(url) {
    try {
      let a = new Audio(url);
      return a;
    } catch (e) {
      console.error(e);
      throw new Error(`Could not create create an Audio element with ${url}`);
    }
  }
}
