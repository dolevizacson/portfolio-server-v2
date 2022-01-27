import { Test, TestingModule } from '@nestjs/testing';
import { CreateSkillsCategoryDto } from './dto/create-skills-category.dto';
import { UpdateSkillsCategoryDto } from './dto/update-skills-category.dto';
import { SkillsCategoriesController } from './skills-categories.controller';
import { SkillsCategoriesService } from './skills-categories.service';

let skillsCategoriesController: SkillsCategoriesController;
const mockCreateSkillsCategoryDto = new CreateSkillsCategoryDto();
const mockUpdateSkillsCategoryDto = new UpdateSkillsCategoryDto();
const mockId = 'mockId';

describe('SkillsCategoriesController', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkillsCategoriesController],
      providers: [
        {
          provide: SkillsCategoriesService,
          useValue: {
            findAll: jest.fn(() => Promise.resolve(['skills category'])),
            findAllActive: jest.fn(() => Promise.resolve(['skills category'])),
            findOne: jest.fn(() => Promise.resolve('skills category')),
            findOneActive: jest.fn(() => Promise.resolve('skills category')),
            update: jest.fn(() => Promise.resolve('skills category')),
            toggle: jest.fn(() => Promise.resolve('skills category')),
            create: jest.fn(() => Promise.resolve('skills category')),
            remove: jest.fn(() => Promise.resolve()),
          },
        },
      ],
    }).compile();

    skillsCategoriesController = module.get<SkillsCategoriesController>(
      SkillsCategoriesController,
    );
  });

  it('should be defined', () => {
    expect(skillsCategoriesController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a promise of array of skills categories', async () => {
      await expect(skillsCategoriesController.findAll()).resolves.toEqual([
        'skills category',
      ]);
      expect.assertions(1);
    });
  });

  describe('findAllActive', () => {
    it('should return a promise of array of skills categories', async () => {
      await expect(skillsCategoriesController.findAllActive()).resolves.toEqual(
        ['skills category'],
      );
      expect.assertions(1);
    });
  });

  describe('findOne', () => {
    it('should return a promise of a skills category', async () => {
      await expect(skillsCategoriesController.findOne(mockId)).resolves.toEqual(
        'skills category',
      );
      expect.assertions(1);
    });
  });

  describe('findOneActive', () => {
    it('should return a promise of a skills category', async () => {
      await expect(
        skillsCategoriesController.findOneActive(mockId),
      ).resolves.toEqual('skills category');
      expect.assertions(1);
    });
  });

  describe('create', () => {
    it('should return a promise of skills category', async () => {
      await expect(
        skillsCategoriesController.create(mockCreateSkillsCategoryDto),
      ).resolves.toEqual('skills category');
      expect.assertions(1);
    });
  });

  describe('update', () => {
    it('should return a promise of a skills category', async () => {
      await expect(
        skillsCategoriesController.update(mockId, mockUpdateSkillsCategoryDto),
      ).resolves.toEqual('skills category');
      expect.assertions(1);
    });
  });

  describe('toggle', () => {
    it('should return a promise of a skills category', async () => {
      await expect(skillsCategoriesController.toggle(mockId)).resolves.toEqual(
        'skills category',
      );
      expect.assertions(1);
    });
  });

  describe('remove', () => {
    it('should return a promise of void', async () => {
      await expect(
        skillsCategoriesController.remove(mockId),
      ).resolves.toBeUndefined();
      expect.assertions(1);
    });
  });
});

describe('SkillsCategoriesController errors', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkillsCategoriesController],
      providers: [
        {
          provide: SkillsCategoriesService,
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

    skillsCategoriesController = module.get<SkillsCategoriesController>(
      SkillsCategoriesController,
    );
  });

  it('should be defined', () => {
    expect(skillsCategoriesController).toBeDefined();
  });

  describe('findAll with error', () => {
    it('should throw an error', async () => {
      await expect(skillsCategoriesController.findAll()).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('findAllActive with error', () => {
    it('should throw an error', async () => {
      await expect(
        skillsCategoriesController.findAllActive(),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('findOne with error', () => {
    it('should throw an error', async () => {
      await expect(
        skillsCategoriesController.findOne(mockId),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('findOneActive with error', () => {
    it('should throw an error', async () => {
      await expect(
        skillsCategoriesController.findOneActive(mockId),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('create with error', () => {
    it('should throw an error', async () => {
      await expect(
        skillsCategoriesController.create(mockCreateSkillsCategoryDto),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('update with error', () => {
    it('should throw an error', async () => {
      await expect(
        skillsCategoriesController.update(mockId, mockUpdateSkillsCategoryDto),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('toggle with error', () => {
    it('should throw an error', async () => {
      await expect(
        skillsCategoriesController.toggle(mockId),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('remove with error', () => {
    it('should throw an error', async () => {
      await expect(
        skillsCategoriesController.remove(mockId),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });
});
