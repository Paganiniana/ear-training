import { StorageService } from './storage.service';

import { LocalStore, RemoteStore } from './class_definitions';

describe('Storage Service', () => {
    let service;

    beforeAll(() => {
        service = new StorageService();
    });

    it('Should Exist', () => {
        expect(StorageService).toBeTruthy();
    });

    it('Should return a storage object', () => {
        let a = service.getStorage('test');
        let itsastore = a instanceof LocalStore || a instanceof RemoteStore;
        expect(itsastore).toBeTruthy();
    });

    
});