import { User, Track, Skill, Explanation, Assessment, AssessmentResults, LocalStore, RemoteStore } from './class_definitions';
import { isBoolean } from 'util';


describe('User Class', () => {

    let user;
    let d;
    let s;

    beforeEach(() => {
        d = new Date('2020-01-20');
        user = new User('xxx', 'John Doe', d, 'easy');
    });

    beforeAll(() => {
        // stub the storage service?
    });

    test('Selectors return expected values', () => {
        expect(user.getId()).toEqual('xxx');
        expect(user.getName()).toEqual('John Doe');
        expect(user.getDateJoined()).toBe(d);
        expect(user.getDifficulty()).toEqual('easy');
    });

});

describe('Track Class', () => {

    let track;
    beforeEach(() => {
        track = new Track('xxx', 'Track 1', ['image_url']);
    });

    test('Track selectors return expected values', () => {
        expect(track.getId()).toEqual('xxx');
        expect(track.getName()).toEqual('Track 1');
        expect(track.getImageArr()).toBeInstanceOf(Array);
    });

});

describe('Skill Class', () => {
    let skill;
    beforeEach(() => {
        skill = new Skill('xxx', 'xxxd', 'Skill Title', ['image_url'], false);
    });

    test('Skill selectors return expected values', () => {
        expect(skill.getId()).toEqual('xxx');
        expect(skill.getTrackId()).toEqual('xxxd');
        expect(skill.getTitle()).toEqual('Skill Title');
        expect(skill.getImageArr()).toBeInstanceOf(Array);
        expect(skill.isGood()).toBe(false);
    });

});

describe('Explanation Class', () => {
    let explanation;

    beforeEach(() => {
        explanation = new Explanation('xxx', 'xxxd', ['abc'], ['image_url']);
    });

    test('Explanation selectors work as expected', () => {
        expect(explanation.getId()).toEqual('xxx');
        expect(explanation.getSkillId()).toEqual('xxxd');
        expect(explanation.getDescriptionArr()).toBeInstanceOf(Array);
        expect(explanation.getImageArr()).toBeInstanceOf(Array);
    });
});

describe('Assessment Class', () => {
    let assessment;

    beforeEach(() => {
        assessment = new Assessment('xxx', 'xxxd', ['audio_url'], 'tag');
    });

    test('Assessment selectors work as expected', () => {
        expect(assessment.getId()).toEqual('xxx');
        expect(assessment.getSkillId()).toEqual('xxxd');
        expect(assessment.getTag()).toEqual('tag');
        expect(assessment.getAudioArr()).toBeInstanceOf(Array);
    });
});

describe('AssessmentResults', () => {
    let assessment_results;
    let d;

    beforeEach(() => {
        d = new Date();
        assessment_results = new AssessmentResults('xxx', 'xxxu', 'xxxd', d, true);
    });

    test('AssessmentResults selectors work as expected', () => {
        expect(assessment_results.getId()).toEqual('xxx');
        expect(assessment_results.getUserId()).toEqual('xxxu');
        expect(assessment_results.getAssessmentId()).toEqual('xxxd');
        expect(assessment_results.getDateAttempted()).toBe(d);
        expect(assessment_results.getResults()).toBe(true);
    });
});

describe('Local Storage Class', () => {
    let store;
    let objs = [{id: 'xxxa', a: 1}, {id:'xxxb', b: 2}];

    beforeEach(() => {
        store = new LocalStore('test');
        return store.destroyAllValues();
    });

    test('It Should Exist', () => {
        expect(store).toBeTruthy();
    });

    test('Should have a createRandomId method', () => {
        expect(store.createRandomId).toBeDefined();
    });

    test('createRandomId should return a random ID', () => {
        let a = store.createRandomId();
        let b = store.createRandomId();
        expect(a).not.toEqual(b);
    });

    test('Should be be able to add a new object', async () => {
        let first_res = await store.getAll();
        expect(first_res.length).toBe(0);
        await store.create(objs[0]);
        let second_res = await store.getAll();
        expect(second_res.length).toBe(1);
    }); 

    test('Should be able to filter objects by property', async () => {
        await store.create(objs[0]);
        await store.create(objs[1]);
        let res = await store.getAllByProperty({id: objs[0].id});
        expect(res.length).toEqual(1);
        expect(res[0].id).toEqual(objs[0].id);
    })

    // come back to this

    xit('Should be able to update an existing object', async () => {
        return store.create({id: 'x', a: 1}).then(() => {
            return store.getAll((stored_objs) => {
                expect(stored_objs[0].a).toBe(objs[0].a);
                return store.update('x', {a:2}).then(() => {
                    return store.getAllByProperty({id:'x'}).then((res) => {
                        expect(res[0].a).not.toEqual(objs[0].a);
                    })
                });
            })
        });
    });
});