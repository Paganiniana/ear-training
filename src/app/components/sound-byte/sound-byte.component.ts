import { Component, OnInit, OnChanges, Input, Output } from '@angular/core';

import { AudioService } from '../../services/audio.service';


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
export class SoundByteComponent implements OnChanges, OnInit {

  @Input()
  sound_url: string;

  @Input()
  autoplay: boolean;

  @Input()
  selectable: boolean;

  @Input()
  selected: boolean;

  // default audio player, see audio service, updated on ngOnChanges
  player;

  constructor(private audioService: AudioService) { }

  ngOnInit() {
    this.player = this.audioService.getPlayer(this.sound_url);
  }

  ngOnChanges() {
    this.player = this.audioService.getPlayer(this.sound_url);
    // we put this check in the 'onChanges' portion, so as to avoid any issues when
    //  angular reuses an existing component, or we navigate into a page that has already been rendered.
    if (this.autoplay) {
      this.player.play();
    };
  }

  clickHandler() {
    console.log("Audio clicked");
    this.player.play();
  }

}
