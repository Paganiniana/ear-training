import { Component, OnInit, ViewChild, ViewChildren, ElementRef } from '@angular/core';


import { UserService } from '../../services/user.service';
import { TrackService } from '../../services/track.service';
import { Assessment, Skill, Track } from '../../services/class_definitions';


@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.page.html',
  styleUrls: ['./tracks.page.scss', '../pages.scss'],
})
export class TracksPage implements OnInit {

  @ViewChildren('ioncard')
  cards;

  tracks: Array<Track>;
  // tracks: Array<Track> = [
  //   new Track("1","Scale Degrees", ["/assets/images/scales_1.jpg"])
  // ]

  constructor(private userService: UserService, private trackService: TrackService) { 
    this.populateTracks();
  }

  ngOnInit() {
  }

  async populateTracks() {
    let tracks = await this.trackService.getAllTracks();
    this.tracks = tracks;
  }

  childIsInView(res) {
    console.log(res.el.getBoundingClientRect())
  }


  async logTestResults() {
    let user = await this.userService.getUserInfo();
    console.log(user);
  }

}
