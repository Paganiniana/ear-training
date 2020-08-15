import { Injectable } from '@angular/core';

/** INTERFACE (Service)
 * 
 * NOTE:
 *    StorageService is really just a wrapper that works off of LocalStore and RemoteStore, 
 *    see the class_definitions.ts file.
 *    Most of the logic here pertains to deciding whether or not the user's data should be stored
 *    locally or externally.
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
    
  }


  getLocalStorage(bucket) {

  }

  getRemoteStorage(bucket) {

  }


}



