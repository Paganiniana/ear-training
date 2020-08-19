import { TestService } from './test.service';

import { StorageService } from './storage.service';

import { Skill, Assessment, User } from './class_definitions';

describe('Test Service', () => {
    let service;
    let static_date;
    let test_skill;
    let test_assessment;
    let test_user;
    
    beforeAll(async () => {
        // used for testing
        static_date = new Date();
        // create a skill object for testing
        test_skill = new Skill("hijklmnop", "notimportant", "no title", [], false);
        test_assessment = new Assessment("abcdefg", test_skill.getId(), ["https://dictionary.writtenchinese.com/sounds/fa1sheng1.mp3"], "name_the_sound");
        test_user = new User("helloworld", "unimporant", static_date, "easy");

        service = new TestService(new StorageService());
        // add some default values
        await service.assessment_store.create({
            id: test_assessment.getId(),
            skill_id: test_skill.getId(),
            audio_arr:test_assessment.getAudioArr(),
            tag: test_assessment.getTag(),
        });
        await service.results_store.create({
            id: "qrstu",
            user_id: test_user.getId(),
            assessment_id: test_assessment.getId(),
            date_attempted: static_date,
            results: false,
        });
        return;
    });


    test('Should Exist', () => {
        expect(TestService).toBeTruthy();
    });

    test('Should be able to get assessments from storage', async () => {
        let assessments = await service.getAllAssessments();
        expect(assessments.length).toBe(1);
    });
    test('Should be able to get assessments by a given skill', async () => {
        let assessments = await service.getAssessmentsBySkill(test_skill);
        expect(assessments.length).toBe(1);
    });

    test('Should be able to get assessment results from storage', async () => {
        let res = await service.getAllResults();
        expect(res.length).toBe(1);
    });

    test('Should be able to get results by assessment', async () => {
        let res = await service.getResultsByAssessment(test_assessment);
        expect(res.length).toBe(1);
    });

    test('Should be able tog et assessment results by skill', async () =>{
        let res = await service.getResultsBySkill(test_skill);
        expect(res.length).toBe(1);
    });

    test('Should be able to create new result', async () => {
        let res = await service.getAllResults();
        expect(res.length).toBe(1);
        await service.createNewResults(test_user, test_assessment, false);
        let new_res = await service.getAllResults();
        expect(new_res.length).toBe(2);
    });
});