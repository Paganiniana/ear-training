import { Component, OnInit } from '@angular/core';


/** INTERFACE:
 * 
 * Expects:
 *  - sound_url
 *  - autoplay
 *  - selectable
 *  - selected
 *  
 * Provides:
 *  - play sound on tap
 *  - plays on render (used for name the sound or image the sound tests)
 *  - renders differently depending on 
 *    - is selectable
 *    - is selected
 */


@Component({
  selector: 'app-sound-byte',
  templateUrl: './sound-byte.component.html',
  styleUrls: ['./sound-byte.component.scss'],
})
export class SoundByteComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
