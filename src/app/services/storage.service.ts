import { Injectable } from '@angular/core';

import { LocalStore, RemoteStore } from './class_definitions';

/** INTERFACE (Service)
 * 
 * NOTE:
 *    StorageService is really just a wrapper that works off of LocalStore and RemoteStore, 
 *    see the class_definitions.ts file.
 *    Most of the logic here pertains to deciding whether or not the user's data should be stored
 *    locally or externally.
 * 
 * Methods:
 *  - PUBLIC getStorage(bucket) // where bucket is a string
 *  - PRIVATE getLocalStorage(bucket)
 *  - PRIVATE getRemoteStorage(bucket)
 *  - PRIVATE synchronizeLocalRemote(bucket)
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
    
  }

  getStorage(bucket) {
    // in future versions, some fancy checks will happen here to 
    //  decide which version of storage to return
    //  for right now, we just default ot local
    return this.getLocalStorage(bucket);
  }


  getLocalStorage(bucket) {
    return new LocalStore(bucket);
  }

  getRemoteStorage(bucket) {
    // TODO
  }

  synchronizeLocalRemote(bucket) {
    // TODO
  } 


}



