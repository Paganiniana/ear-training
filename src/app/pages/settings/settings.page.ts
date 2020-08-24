import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { TestService } from '../../services/test.service';

import { User } from '../../services/class_definitions';

/** INTERFACE
 * 
 * Displays:
 *  - User test history
 *  - User settings
 *  - User logged in/out status
 * 
 */


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss', '../pages.scss'],
})
export class SettingsPage implements OnInit {

  difficulties: Array<string> = [
    "easy",
    "moderate",
    "hard",
  ]

  current_user: User;

  constructor(private userService: UserService, private testService: TestService) { 
  }

  async getCurrentUser() {
    this.current_user = await this.userService.getUserInfo();
  }

  ngOnInit() {
    this.getCurrentUser();
  }

  select(d) {
    this.current_user.setDifficulty(d);
    this.userService.updateUser(this.current_user);
  }


}
