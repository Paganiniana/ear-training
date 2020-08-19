import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';

import { User } from './class_definitions';

/** INTERFACE
 * 
 * getUserInfo() // multi-purpose function, for now, just returns a local user object
 * getLocalUser() // what it sounds like
 * updateUser(user) // expects a user object, saves information to storage 
 * updateLocalUser(user) // what it sounds like
 * 
 * TODO:
 *  - logIn
 *  - logOut
 *  - syncLocalUser
 * 
 */

@Injectable({
  providedIn: 'root'
})
export class UserService {

  local_user_store;

  constructor(private storageService: StorageService) { 
    this.local_user_store = this.storageService.getStorage('user');
  }

  async getUserInfo() {
    return await this.getLocalUser();
  }

  async getLocalUser() {
    // TODO cover case where no users are in storage
    let user = await this.local_user_store.getAll();
    return new User(user[0].id, user[0].name, user[0].date_joined, user[0].difficulty_level);
  }

  async updateUser(user) {
    return this.updateLocalUser(user);
  }

  async updateLocalUser(user: User) {
    // leaves out the 'date joined' perameter, as it is assumed that this value won't change
    return this.local_user_store.update(user.getId(), {
      name: user.getName(),
      difficulty_level: user.getDifficulty(),
    });
  }
}
