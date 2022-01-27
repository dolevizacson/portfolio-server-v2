import { Test, TestingModule } from '@nestjs/testing';

import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';

let skillsController: SkillsController;
const mockCreateSkillDto = new CreateSkillDto();
const mockUpdateSkillDto = new UpdateSkillDto();
const mockId = 'mockId';

describe('SkillsController', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkillsController],
      providers: [
        {
          provide: SkillsService,
          useValue: {
            findAll: jest.fn(() => Promise.resolve(['skill'])),
            findAllActive: jest.fn(() => Promise.resolve(['skill'])),
            findOne: jest.fn(() => Promise.resolve('skill')),
            findOneActive: jest.fn(() => Promise.resolve('skill')),
            update: jest.fn(() => Promise.resolve('skill')),
            toggle: jest.fn(() => Promise.resolve('skill')),
            create: jest.fn(() => Promise.resolve('skill')),
            remove: jest.fn(() => Promise.resolve()),
          },
        },
      ],
    }).compile();

    skillsController = module.get<SkillsController>(SkillsController);
  });

  it('should be defined', () => {
    expect(skillsController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a promise of array of skills', async () => {
      await expect(skillsController.findAll()).resolves.toEqual(['skill']);
      expect.assertions(1);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(skillsController, 'findAll');
      await skillsController.findAll();
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });

  describe('findAllActive', () => {
    it('should return a promise of array of skills', async () => {
      await expect(skillsController.findAllActive()).resolves.toEqual([
        'skill',
      ]);
      expect.assertions(1);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(skillsController, 'findAllActive');
      await skillsController.findAllActive();
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });

  describe('findOne', () => {
    it('should return a promise of a skill', async () => {
      expect(skillsController.findOne(mockId)).resolves.toEqual('skill');
      expect.assertions(1);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(skillsController, 'findOne');
      await skillsController.findOne(mockId);
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });

  describe('findOneActive', () => {
    it('should return a promise of a skill', async () => {
      await expect(skillsController.findOneActive(mockId)).resolves.toEqual(
        'skill',
      );
      expect.assertions(1);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(skillsController, 'findOneActive');
      await skillsController.findOneActive(mockId);
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });

  describe('create', () => {
    it('should return a promise of skill', async () => {
      await expect(
        skillsController.create(mockCreateSkillDto),
      ).resolves.toEqual('skill');
      expect.assertions(1);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(skillsController, 'create');
      await skillsController.create(mockCreateSkillDto);
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });

  describe('update', () => {
    it('should return a promise of a skill', async () => {
      await expect(
        skillsController.update(mockId, mockUpdateSkillDto),
      ).resolves.toEqual('skill');
      expect.assertions(1);
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(skillsController, 'update');
      await skillsController.update(mockId, mockUpdateSkillDto);
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });

  describe('toggle', () => {
    it('should return a promise of a skill', async () => {
      await expect(skillsController.toggle(mockId)).resolves.toEqual('skill');
      expect.assertions(1);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(skillsController, 'toggle');
      await skillsController.toggle(mockId);
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });

  describe('remove', () => {
    it('should return a promise of void', async () => {
      await expect(skillsController.remove(mockId)).resolves.toBeUndefined();
      expect.assertions(1);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(skillsController, 'remove');
      await skillsController.remove(mockId);
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });
});

describe('SkillsController errors', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkillsController],
      providers: [
        {
          provide: SkillsService,
          useValue: {
            findAll: jest.fn(() => Promise.reject(new Error())),
            findAllActive: jest.fn(() => Promise.reject(new Error())),
            findOne: jest.fn(() => Promise.reject(new Error())),
            findOneActive: jest.fn(() => Promise.reject(new Error())),
            update: jest.fn(() => Promise.reject(new Error())),
            toggle: jest.fn(() => Promise.reject(new Error())),
            create: jest.fn(() => Promise.reject(new Error())),
            remove: jest.fn(() => Promise.reject(new Error())),
          },
        },
      ],
    }).compile();

    skillsController = module.get<SkillsController>(SkillsController);
  });

  it('should be defined', () => {
    expect(skillsController).toBeDefined();
  });

  describe('findAll with error', () => {
    it('should throw an error', async () => {
      await expect(skillsController.findAll()).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('findAllActive with error', () => {
    it('should throw an error', async () => {
      await expect(skillsController.findAllActive()).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('findOne with error', () => {
    it('should throw an error', async () => {
      expect(skillsController.findOne(mockId)).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('findOneActive with error', () => {
    it('should throw an error', async () => {
      await expect(
        skillsController.findOneActive(mockId),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('create with error', () => {
    it('should throw an error', async () => {
      await expect(
        skillsController.create(mockCreateSkillDto),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('update with error', () => {
    it('should throw an error', async () => {
      await expect(
        skillsController.update(mockId, mockUpdateSkillDto),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('toggle with error', () => {
    it('should throw an error', async () => {
      await expect(skillsController.toggle(mockId)).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('remove with error', () => {
    it('should throw an error', async () => {
      await expect(skillsController.remove(mockId)).rejects.toThrowError();
      expect.assertions(1);
    });
  });
});
