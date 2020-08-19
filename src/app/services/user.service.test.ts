import { UserService } from './user.service';
import { StorageService } from './storage.service';

import { User } from './class_definitions';

describe('User Service', () => {

    let user: User;
    let service: UserService;
    let static_date = new Date();

    beforeAll(async () => {
        service = new UserService(new StorageService());
        user = new User("abcdefg", "my_name", static_date, "easy");
        await service.user_store.destroyAllValues();
        await service.user_store.create({
            id: user.getId(),
            name: user.getName(),
            date_joined: user.getDateJoined(),
            difficulty_level: user.getDifficulty(),
        });
        return;
    });


    it('Should Exist', () => {
        expect(UserService).toBeTruthy();
    });

    test('Should return a user object', async () => {
        let local_user = await service.getUserInfo();
        expect(local_user).toBeInstanceOf(User);
    });

    test('It should be able to update a user', async () => {
        user.setDifficulty('hard');
        await service.updateUser(user);
        let local_user = await service.getUserInfo();
        console.log(local_user.getId(), user.getId());
        expect(local_user.getDifficulty()).not.toEqual("easy");
    });
});