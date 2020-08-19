import { AudioService } from './audio.service';

describe('Audio Service', () => {
    let service;
    
    beforeAll(() => {
        service = new AudioService();
    });

    it('Should Exist', () => {
        expect(AudioService).toBeTruthy();
    });

    it('should be able to create an audio object', () => {
        let a = service.getPlayer("https://dictionary.writtenchinese.com/sounds/fa1sheng1.mp3");
        expect(a).toBeDefined();
        expect(a).toHaveProperty('play');
        expect(a).toHaveProperty('pause');
    })
});