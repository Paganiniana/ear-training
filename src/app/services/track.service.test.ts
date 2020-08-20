import { TrackService } from './track.service';
import { TestService } from './test.service';
import { StorageService } from './storage.service';

import { Skill, Track, User, Assessment, AssessmentResults } from './class_definitions';

describe('Track Service', () => {

    let static_date = new Date();
    let service: TrackService;
    let test_service: TestService; // used for mocking, not tests
    // stub values
    let test_track: Track = new Track("abcd", "name", []);
    let test_skill: Skill = new Skill("abcd", test_track.getId(), "skill title", [], false);
    let test_user: User = new User("abcd", "name", static_date, "easy");
    let test_assessment: Assessment = new Assessment("abcd", test_skill.getId(), [], "");
    let test_results: AssessmentResults = new AssessmentResults("abcd", test_user.getId(), test_assessment.getId(), static_date, false);
    
    beforeAll(async () => {
        // complicated stubs
        let storage = new StorageService();
        test_service = new TestService(storage);
        service = new TrackService(new StorageService(), test_service);
        // add an assessment and assessment results,
        await test_service.createNewResults(test_user, test_assessment, false);
        await test_service.assessment_store.create({
            id: test_assessment.getId(),
            skill_id: test_assessment.getSkillId(),
            audio_arr: test_assessment.getAudioArr(),
            tag: test_assessment.getTag(),
        });

        // we need a stubbed track and a stubbed skill
        await service.track_store.create({
            id: test_track.getId(),
            name: test_track.getName(),
            image_arr: test_track.getImageArr(),
        });
        await service.skill_store.create({
            id: test_skill.getId(),
            track_id: test_skill.getTrackId(),
            title: test_skill.getTitle(),
            image_arr: test_skill.getImageArr(),
            good: test_skill.isGood(),
        }); 

        return;
    });


    it('Should Exist', () => {
        expect(TrackService).toBeTruthy();
    });

    it('Should be able to return tracks from storage', async ()=> {
        let res = await service.getAllTracks();
        expect(res.length).not.toBe(0);
        expect(res[0]).toBeInstanceOf(Track);
    });

    it('Should be able to get a track progress', async () => {
        let res = await service.getTrackProgress(test_track);
        expect(isNaN(res)).toBeFalsy();
    });

    it('Should be able to get skills from storage', async () => {
        let res = await service.getAllSkills();
        expect(res.length).not.toBe(0);
        expect(res[0]).toBeInstanceOf(Skill);
    });

    it('Should be able to get skills by track', async () => {
        let res = await service.getSkillsByTrack(test_track);
        expect(res.length).not.toBe(0);
        expect(res[0]).toBeInstanceOf(Skill);
    });

    test('Should be able to get the amount of practice needed by a skill', async () => {
        let res = await service.getNeedsPractice(test_skill);
        expect(res).toBeGreaterThanOrEqual(0);
        expect(res).toBeLessThanOrEqual(1);
    });

});