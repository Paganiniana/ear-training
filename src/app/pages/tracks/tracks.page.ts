import { Component, OnInit, ViewChild, ViewChildren, ElementRef } from '@angular/core';


import { UserService } from '../../services/user.service';
import { Assessment, Skill } from '../../services/class_definitions';


@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.page.html',
  styleUrls: ['./tracks.page.scss', '../pages.scss'],
})
export class TracksPage implements OnInit {

  @ViewChildren('ioncard')
  cards;

  constructor(private userService: UserService) { 
    
  }

  ngOnInit() {
  }

  childIsInView(res) {
    console.log(res.el.getBoundingClientRect())
  }


  async logTestResults() {
    let user = await this.userService.getUserInfo();
    console.log(user);
  }

}
