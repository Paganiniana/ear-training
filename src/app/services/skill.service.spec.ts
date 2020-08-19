import { SkillService } from './skill.service';

describe('SkillService', () => {
  let service: SkillService;
  beforeEach(() => {
    service = new SkillService();
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
