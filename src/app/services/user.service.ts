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

  user_store;

  constructor(private storageService: StorageService) { 
    this.user_store = this.storageService.getStorage('user');
  }

  async getUserInfo() {
    return await this.getLocalUser();
  }

  async getLocalUser() {
    let user = await this.user_store.getAll();
    if (!user.length) {
      // this means there is no user object
      await this.user_store.create({
        name: "",
        date_joined: new Date(),
        difficulty_level: "easy",
      });
      // try again
      return await this.getLocalUser();
    }
    // in case, for some reason, user_store.create gets called twice
    if (user.length>1) {
      throw new Error("Cannot have more than one user object in a system.")
    }
    return new User(user[0].id, user[0].name, new Date(user[0].date_joined), user[0].difficulty_level);
  }

  async updateUser(user) {
    return this.updateLocalUser(user);
  }

  async updateLocalUser(user: User) {
    // leaves out the 'date joined' perameter, as it is assumed that this value won't change
    return this.user_store.update(user.getId(), {
      name: user.getName(),
      difficulty_level: user.getDifficulty(),
    });
  }
}
