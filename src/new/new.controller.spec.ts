import { Test, TestingModule } from '@nestjs/testing';
import { Image } from '../common/classes/Image';
import { NewBlgPostDto } from './dto/new-blog-post.dto';
import { NewProjectDto } from './dto/new-project.dto';
import { NewSkillDto } from './dto/new-skill.dto';
import { NewSkillsCategoryDto } from './dto/new-skills-category.dto';
import { NewTaskDto } from './dto/new-task.dto';
import { NewController } from './new.controller';
import { NewService } from './new.service';

let newController: NewController;
const mockNewTaskDto = new NewTaskDto();
const mockNewSkillDto = new NewSkillDto();
const mockNewSkillsCategoryDto = new NewSkillsCategoryDto();
const mockNewProjectDto = new NewProjectDto();
const mockNewBlogPostDto = new NewBlgPostDto();
const mockImage = new Image();
const mockId = 'mockId';
const mockImageId = 'mockImageId';

describe('NewController', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewController],
      providers: [
        {
          provide: NewService,
          useValue: {
            createNew: jest.fn(() => Promise.resolve('item')),
            updateNew: jest.fn(() => Promise.resolve('item')),
            removeNew: jest.fn(() => Promise.resolve()),
            removeNewProject: jest.fn(() => Promise.resolve()),
            addNewProjectImage: jest.fn(() => Promise.resolve('project')),
            removeNewProjectImage: jest.fn(() => Promise.resolve()),
            removeNewBlogPost: jest.fn(() => Promise.resolve()),
            addNewBlogPostParagraphImage: jest.fn(() =>
              Promise.resolve('blog post'),
            ),
            removeNewBlogPostParagraphImage: jest.fn(() => Promise.resolve()),
          },
        },
      ],
    }).compile();

    newController = module.get<NewController>(NewController);
  });

  it('should be defined', () => {
    expect(newController).toBeDefined();
  });

  describe('createNewTask', () => {
    it('should return a promise of task', async () => {
      await expect(newController.createNewTask()).resolves.toEqual('item');
      expect.assertions(1);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(newController, 'createNewTask');
      await newController.createNewTask();
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });

  describe('updateNewTask', () => {
    it('should return a promise of task', async () => {
      await expect(
        newController.updateNewTask(mockNewTaskDto),
      ).resolves.toEqual('item');
      expect.assertions(1);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(newController, 'updateNewTask');
      await newController.updateNewTask(mockNewTaskDto);
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });

  describe('removeNewTask', () => {
    it('should return a promise of task', async () => {
      await expect(newController.removeNewTask()).resolves.toBeUndefined();
      expect.assertions(1);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(newController, 'removeNewTask');
      await newController.removeNewTask();
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });

  describe('createNewSkill', () => {
    it('should return a promise of skill', async () => {
      await expect(newController.createNewSkill()).resolves.toEqual('item');
      expect.assertions(1);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(newController, 'createNewSkill');
      await newController.createNewSkill();
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });

  describe('updateNewSkill', () => {
    it('should return a promise of skill', async () => {
      await expect(
        newController.updateNewSkill(mockNewSkillDto),
      ).resolves.toEqual('item');
      expect.assertions(1);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(newController, 'updateNewSkill');
      await newController.updateNewSkill(mockNewSkillDto);
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });

  describe('removeNewSkill', () => {
    it('should return a promise of skill', async () => {
      await expect(newController.removeNewSkill()).resolves.toBeUndefined();
      expect.assertions(1);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(newController, 'removeNewSkill');
      await newController.removeNewSkill();
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });

  describe('createNewSkillsCategory', () => {
    it('should return a promise of skills category', async () => {
      await expect(newController.createNewSkillsCategory()).resolves.toEqual(
        'item',
      );
      expect.assertions(1);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(newController, 'createNewSkillsCategory');
      await newController.createNewSkillsCategory();
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });

  describe('updateNewSkillsCategory', () => {
    it('should return a promise of skills category', async () => {
      await expect(
        newController.updateNewSkillsCategory(mockNewSkillsCategoryDto),
      ).resolves.toEqual('item');
      expect.assertions(1);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(newController, 'updateNewSkillsCategory');
      await newController.updateNewSkillsCategory(mockNewSkillsCategoryDto);
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });

  describe('removeNewSkillsCategory', () => {
    it('should return a promise of skills category', async () => {
      await expect(
        newController.removeNewSkillsCategory(),
      ).resolves.toBeUndefined();
      expect.assertions(1);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(newController, 'removeNewSkillsCategory');
      await newController.removeNewSkillsCategory();
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });

  describe('createNewProject', () => {
    it('should return a promise of project', async () => {
      await expect(newController.createNewProject()).resolves.toEqual('item');
      expect.assertions(1);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(newController, 'createNewProject');
      await newController.createNewProject();
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });

  describe('updateNewProject', () => {
    it('should return a promise of project', async () => {
      await expect(
        newController.updateNewProject(mockNewProjectDto),
      ).resolves.toEqual('item');
      expect.assertions(1);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(newController, 'updateNewProject');
      await newController.updateNewProject(mockNewProjectDto);
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });

  describe('removeNewProject', () => {
    it('should return a promise of void', async () => {
      await expect(newController.removeNewProject()).resolves.toBeUndefined();
      expect.assertions(1);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(newController, 'removeNewProject');
      await newController.removeNewProject();
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });

  describe('addNewProjectImage', () => {
    it('should return a promise of project', async () => {
      await expect(
        newController.addNewProjectImage(mockImage),
      ).resolves.toEqual('project');
      expect.assertions(1);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(newController, 'addNewProjectImage');
      await newController.addNewProjectImage(mockImage);
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });

  describe('removeNewProjectImage', () => {
    it('should return a promise of void', async () => {
      await expect(
        newController.removeNewProjectImage(mockId),
      ).resolves.toBeUndefined(),
        expect.assertions(1);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(newController, 'removeNewProjectImage');
      await newController.removeNewProjectImage(mockId);
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });

  describe('createNewBlogPost', () => {
    it('should return a promise of project', async () => {
      await expect(newController.createNewBlogPost()).resolves.toEqual('item');
      expect.assertions(1);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(newController, 'createNewBlogPost');
      await newController.createNewBlogPost();
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });

  describe('updateNewBlogPost', () => {
    it('should return a promise of project', async () => {
      await expect(
        newController.updateNewBlogPost(mockNewBlogPostDto),
      ).resolves.toEqual('item');
      expect.assertions(1);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(newController, 'updateNewBlogPost');
      await newController.updateNewBlogPost(mockNewBlogPostDto);
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });

  describe('removeNewBlogPost', () => {
    it('should return a promise of void', async () => {
      await expect(newController.removeNewBlogPost()).resolves.toBeUndefined();
      expect.assertions(1);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(newController, 'removeNewBlogPost');
      await newController.removeNewBlogPost();
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });

  describe('addNewBlogPostParagraphImage', () => {
    it('should return a promise of project', async () => {
      await expect(
        newController.addNewBlogPostParagraphImage(mockId, mockImage),
      ).resolves.toEqual('blog post');
      expect.assertions(1);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(newController, 'addNewBlogPostParagraphImage');
      await newController.addNewBlogPostParagraphImage(mockId, mockImage);
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });

  describe('removeNewBlogPostParagraphImage', () => {
    it('should return a promise of void', async () => {
      await expect(
        newController.removeNewBlogPostParagraphImage(mockId, mockImageId),
      ).resolves.toBeUndefined(),
        expect.assertions(1);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(newController, 'removeNewBlogPostParagraphImage');
      await newController.removeNewBlogPostParagraphImage(mockId, mockImageId);
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });
});

describe('NewController errors', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewController],
      providers: [
        {
          provide: NewService,
          useValue: {
            createNew: jest.fn(() => Promise.reject(new Error())),
            updateNew: jest.fn(() => Promise.reject(new Error())),
            removeNew: jest.fn(() => Promise.reject(new Error())),
            removeNewProject: jest.fn(() => Promise.reject(new Error())),
            addNewProjectImage: jest.fn(() => Promise.reject(new Error())),
            removeNewProjectImage: jest.fn(() => Promise.reject(new Error())),
            removeNewBlogPost: jest.fn(() => Promise.reject(new Error())),
            addNewBlogPostParagraphImage: jest.fn(() =>
              Promise.reject(new Error()),
            ),
            removeNewBlogPostParagraphImage: jest.fn(() =>
              Promise.reject(new Error()),
            ),
          },
        },
      ],
    }).compile();

    newController = module.get<NewController>(NewController);
  });

  it('should be defined', () => {
    expect(newController).toBeDefined();
  });

  describe('createNewTask with error', () => {
    it('should throw an error', async () => {
      await expect(newController.createNewTask()).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('updateNewTask with error', () => {
    it('should throw an error', async () => {
      await expect(
        newController.updateNewTask(mockNewTaskDto),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('removeNewTask with error', () => {
    it('should throw an error', async () => {
      await expect(newController.removeNewTask()).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('createNewSkill with error', () => {
    it('should throw an error', async () => {
      await expect(newController.createNewSkill()).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('updateNewSkill with error', () => {
    it('should throw an error', async () => {
      await expect(
        newController.updateNewSkill(mockNewSkillDto),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('removeNewSkill with error', () => {
    it('should throw an error', async () => {
      await expect(newController.removeNewSkill()).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('createNewSkillsCategory with error', () => {
    it('should throw an error', async () => {
      await expect(
        newController.createNewSkillsCategory(),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('updateNewSkillsCategory with error', () => {
    it('should throw an error', async () => {
      await expect(
        newController.updateNewSkillsCategory(mockNewSkillsCategoryDto),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('removeNewSkillsCategory with error', () => {
    it('should throw an error', async () => {
      await expect(
        newController.removeNewSkillsCategory(),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('createNewProject with error', () => {
    it('should throw an error', async () => {
      await expect(newController.createNewProject()).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('updateNewProject with error', () => {
    it('should throw an error', async () => {
      await expect(
        newController.updateNewProject(mockNewProjectDto),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('removeNewProject with error', () => {
    it('should throw an error', async () => {
      await expect(newController.removeNewProject()).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('addNewProjectImage with error', () => {
    it('should throw an error', async () => {
      await expect(
        newController.addNewProjectImage(mockImage),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('removeNewProjectImage with error', () => {
    it('should throw an error', async () => {
      await expect(
        newController.removeNewProjectImage(mockId),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('createNewBlogPost with error', () => {
    it('should throw an error', async () => {
      await expect(newController.createNewBlogPost()).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('updateNewBlogPost with error', () => {
    it('should throw an error', async () => {
      await expect(
        newController.updateNewBlogPost(mockNewBlogPostDto),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('removeNewBlogPost with error', () => {
    it('should throw an error', async () => {
      await expect(newController.removeNewBlogPost()).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('addNewBlogPostParagraphImage with error', () => {
    it('should throw an error', async () => {
      await expect(
        newController.addNewBlogPostParagraphImage(mockId, mockImage),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('removeNewBlogPostParagraphImage with error', () => {
    it('should throw an error', async () => {
      await expect(
        newController.removeNewBlogPostParagraphImage(mockId, mockImageId),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });
});
