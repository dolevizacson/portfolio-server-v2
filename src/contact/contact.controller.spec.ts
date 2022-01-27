import { Test, TestingModule } from '@nestjs/testing';

import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { CreateMailDto } from './dto/create-mail.dto';

let contactController: ContactController;
const mockCreateMailDto = new CreateMailDto();

describe('ContactController', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
      providers: [
        {
          provide: ContactService,
          useValue: {
            sendMail: jest.fn(() => Promise.resolve()),
          },
        },
      ],
    }).compile();

    contactController = module.get<ContactController>(ContactController);
  });

  it('should be defined', () => {
    expect(contactController).toBeDefined();
  });

  describe('sendMail', () => {
    it('should return a promise of void', async () => {
      await expect(
        contactController.sendMail(mockCreateMailDto),
      ).resolves.toBeUndefined();
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(contactController, 'sendMail');
      await contactController.sendMail(mockCreateMailDto);
      expect(spy).toBeCalledTimes(1);
    });
  });
});

describe('ContactController error', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
      providers: [
        {
          provide: ContactService,
          useValue: {
            sendMail: jest.fn(() => Promise.reject(new Error())),
          },
        },
      ],
    }).compile();

    contactController = module.get<ContactController>(ContactController);
  });

  it('should be defined', () => {
    expect(contactController).toBeDefined();
  });

  describe('sendMail with error', () => {
    it('should throw an error', async () => {
      await expect(
        contactController.sendMail(mockCreateMailDto),
      ).rejects.toThrowError();
    });
  });
});
