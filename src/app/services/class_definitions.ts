import { StorageService } from './storage.service';
import { Plugins } from '@capacitor/core';
import { inherits } from 'util';
const { Storage } = Plugins;


/** INTERFACE
 * 
 * Constructor expects:
 * 
 *  -   id // !!! null, if user has not logged in, before
 *  -   name // !!! also null, if user has not logged before
 *  -   date_joined
 *  -   difficulty_level
 * 
 * Selectors:
 *  -   all of the above
 * 
 * Mutators:
 *  -   setDifficulty(string) // sets the difficulty on the local class, does NOT update storage
 * 
 * Note:
 *  -   this is the only class, at this point, to feature mutators.
 */



export class User {

    id: String;
    name: String;
    date_joined: Date;
    difficulty_level: String;

    constructor(id: String, name: String, date_joined: Date, difficulty_level: string) {
        this.id = id;
        this.name = name;
        this.date_joined = date_joined;
        this.difficulty_level = difficulty_level;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getDateJoined() {
        return this.date_joined;
    }

    getDifficulty() {
        return this.difficulty_level;
    }

    setDifficulty(str) {
        this.difficulty_level = str;
    }

}

/** INTERFACE
 * 
 * Constructor expects: 
 *  -   id
 *  -   name
 *  -   image_arr
 * 
 * Selectors:
 *  -   getId() // returns id
 *  -   getImageArr() // returns array of image urls
 *  -   getName()   // returns string name of track
 *  
 * Mutators?
 *  -   none
 * 
 * 
 */

export class Track {

    id: String;
    name: String;
    image_arr: Array<string>;

    constructor(id: String, name: String, image_arr: Array<string>) {
        this.id = id;
        this.name = name;
        this.image_arr = image_arr;
    }


    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getImageArr() {
        return this.image_arr;
    }
} 

/** INTERFACE
 * 
 * Constructor expects:
 *  -   id
 *  -   track_id // used for reference / sorting
 *  -   title 
 *  -   image_arr
 *  -   good 
 * 
 * Selectors:
 *  -   getId()
 *  -   getTrackId()
 *  -   getTitle()
 *  -   getImageArr()
 *  -   isGood()
 *
 * Mutators?
 *  -   none
 */

export class Skill {

    id: String;
    track_id: String;
    title: String;
    image_arr: Array<string>;
    good: Boolean;

    constructor(id: String, track_id: String, title: String, image_arr: Array<string>, good: boolean) {
        this.id = id;
        this.track_id = track_id;
        this.title = title;
        this.image_arr = image_arr;
        this.good = good;
    }

    getId() {
        return this.id;
    }

    getTrackId() {
        return this.track_id;
    }

    getTitle() {
        return this.title;
    }

    getImageArr() {
        return this.image_arr;
    }

    isGood() {
        return this.good;
    }
}


/** INTERFACE
 * 
 * Constructor expects:
 *  -   id
 *  -   skill_id // used for reference / sorting
 *  -   description_arr 
 *  -   image_arr
 * 
 * Selectors:
 *  -   getId()
 *  -   getSkillId()
 *  -   getDescriptionArr()
 *  -   getImageArr()
 *
 * Mutators?
 *  -   none
 */

export class Explanation {
    id: String;
    skill_id: String;
    description_arr: Array<string>;
    image_arr: Array<string>;

    constructor(id: String, skill_id: String, description_arr: Array<string>, image_arr: Array<string>) {
        this.id = id;
        this.skill_id = skill_id;
        this.description_arr = description_arr;
        this.image_arr = image_arr;
    }

    getId() {
        return this.id;
    }

    getSkillId() {
        return this.skill_id;
    }

    getDescriptionArr() {
        return this.description_arr;
    }

    getImageArr() {
        return this.image_arr;
    }
}


/** INTERFACE 
 * 
 * Constructor Expects:
 *  -   id
 *  -   skill_id
 *  -   tag
 *  -   audio_arr
 * 
 * Selectors:
 *  -   getId
 *  -   getSkillId
 *  -   getTag
 *  -   getAudioArr
 * 
 * Mutators?
 *  -   none
 */

export class Assessment {
    id: String;
    skill_id: String;
    audio_arr: Array<string>;
    tag: String; // one of 'name_the_sound', 'sound_the_name', 'image_the_sound', 'sound_the_image'

    constructor(id: String, skill_id: String, audio_arr: Array<string>, tag: String) {
        this.id = id;
        this.skill_id = skill_id;
        this.tag = tag;
        this.audio_arr = audio_arr;
    }

    getId() {
        return this.id;
    }

    getSkillId() {
        return this.skill_id;
    }

    getTag() {
        return this.tag;
    }

    getAudioArr() {
        return this.audio_arr;
    }
}

/** INTERFACE
 * 
 * Constructor Expects:
 *  -   id
 *  -   user_id // null, if user not logged in
 *  -   assessment_id
 *  -   date_attempted
 *  -   results   
 * 
 * Selectors:
 * 
 *  - getId
 *  -   
 * 
 * Mutators:
 * 
 * 
 * Note:
 *  -   this is the most important class from a scheduling perspective
 */
 
export class AssessmentResults {
    id: String;
    user_id: String; // TODO: String
    assessment_id: String;
    date_attempted: Date;
    results: Boolean;


    constructor(id: String, user_id: String, assessment_id: String, date_attempted: Date, results: Boolean) {
        this.id = id;
        this.user_id = user_id;
        this.assessment_id = assessment_id;
        this.date_attempted = date_attempted;
        this.results = results;
    }

    getId() {
        return this.id;
    }

    getUserId() {
        return this.user_id;
    }

    getAssessmentId() {
        return this.assessment_id;
    }
    getDateAttempted() {
        return this.date_attempted;
    }

    getResults() {
        return this.results;
    }
}



/** INTERFACE (LocalStore) 
 * Abstracts:
 *  - Capacitor Native Storage API
 * 
 * Selectors: (all return observables)
 *  - getAll(bucket) // bucket refers to either (a) a key in Storage or (b) a collection in Firestore
 *  - getByProperty(bucket, {prop:value})
 * 
 * Mutators:
 *  - update(bucket, id, {prop: value})
 *  - delete(bucket, id)
 *  - create(props)
*/
export class LocalStore {
    bucket: string;
  
    constructor(bucket) {
      this.bucket = bucket;
    }

    // helper function
    createRandomId() {
        // characters which can comprise the id
        let chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '3', '4', '5', '6', '7', '8', '9'];
    
        function randomInt(min, max) {
          return Math.floor(Math.random() * (max - min) + min);
        }
    
    
        function makeStr(str) {
          if (str.length == 10) {
            return str
          } else {
            return makeStr(str+= chars[randomInt(0, chars.length)])
          }
        }
    
        // return ID
        return makeStr('');
      }

    getBucketName() {
        // nothing much
        return this.bucket;
    }
  
    // Selectors
  
    // returns an array of all objects in the array stored under bucket;
    // note: this leaves to the discernment of the objects and services some things,
    //  for instance, whether or not a thing (like Local User) should be a singular member of its array
    async getAll() {
        let val;
        try {
            // Expects the value stored to be a stringified array
            let ret = await Storage.get({key: this.getBucketName()});
            val = JSON.parse(ret.value);
            // handle case where the storage bucket has not yet been used
            if (val == undefined) {
                val = [];
            }
        } catch (e) {
            throw new Error(`Could not retrieve the values from bucket ${this.getBucketName()} in local storage.`);
        }
        return val;
    }
  
    async getAllByProperty(props) {
        let val = await this.getAll();
        // do the filter
        try {

            val = val.filter((v) => {
                let should_ret = false;
                Object.keys(props).map((prop) => {
                    // first, check if the property even exists
                    if (v.hasOwnProperty(prop)) {
                        // now test if it matches
                        if (v[prop] == props[prop]) {
                            should_ret = true;
                        }
                    } else {
                        throw new Error(`The proeprty ${prop} does not exist on object in bucket ${this.getBucketName()}`);
                    }
                });
                if (should_ret) {
                    return v; 
                }
            });
        } catch (e) {
            throw new Error(`Could not filter the contents of ${val} with properties ${props}.`)
        }
        return val;
    }
  
    // Mutators
  
    async update(id, props) {
        // use getAllByProperty to get the correct item
        let val = await this.getAll();
        console.log(`Update called on object with id ${id}`);
        // simultaneously get the desired value and the index
        let target;
        let index;
        for (let i=0; i<val.length; i++) {
            if (val[i]['id'] == id) {
                target = val[i];
                index = i;
            }
        }
        console.log(target, index);
        // silently fail if no object of that id exists
        if (target == undefined) {
            throw new Error(`Object of type ${this.getBucketName()} does not exist with ID of ${id}`);
        }

        // update all properties
        Object.keys(props).map((prop) => {
            // update the prop property of the desired object with the prop from props
            target[prop] = props[prop];
        });

        // update the object at that index
        val[index] = target;

        return Storage.set({ key: this.getBucketName(), value: JSON.stringify(val)})
            .catch((e) => {
                throw new Error(`The object of type ${this.getBucketName()} could not be updated with properties ${props}`);
            });
    }
  
    async delete(id) {
        // TODO
        
    }    

    async create(props) {
        let val = await this.getAll();
        // TESTING ONLY 
        // if id is provided, us it
        if (props.hasOwnProperty('id')) {
            // do nothing
        } else {
            // add an id to the new object
            props.id = this.createRandomId();
        
        }
        // Append props the given object to the array
        val.push(props);
        return Storage.set({ key: this.getBucketName(), value: JSON.stringify(val)})
            .catch((e) => {
                throw new Error(`Could not add object ${props} to bucket ${this.getBucketName()}`)
            })
    }

    async destroyAllValues() {
        // Destroy all values in bucket,
        //  TESTING PURPOSES ONLY
        return Storage.remove({ key: this.getBucketName()});
    }

    async populateDefaults(url) {
        // WARNING
        // destroys everything in the store before populating
        await this.destroyAllValues();
        let values = await fetch(url).then((val) => {
            return val.json();
        }).catch((e) => {
            // fail silently
            console.error(`Could not fetch JSON data from ${url}`, e);
            return [];
        });

        let prom_list= [];
        // the contract is that 'values' contains an array of objects, like the LocalStore
        values.map((val) => {
            prom_list.push(this.create(val));
        });

        return Promise.all(prom_list);
    }
  }



/** INTERFACE (LocalStore) 
 * Abstracts:
 *  - Firestore API
 * 
 * Selectors: (all return observables)
 *  - getAll(bucket) // bucket refers to either (a) a key in Storage or (b) a collection in Firestore
 *  - getByProperty(bucket, {prop:value})
 * 
 * Mutators:
 *  - update(bucket, id, {prop: value})
 *  - delete(bucket, id)
*/
  export class RemoteStore {

    // TODO

    async update(id, props) {
 
    }
  }
