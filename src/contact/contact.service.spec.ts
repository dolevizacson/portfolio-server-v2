import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

import { ContactService } from './contact.service';
import { CreateMailDto } from './dto/create-mail.dto';

let contactService: ContactService;
const mockCreateMailDto = new CreateMailDto();
const mockContactEmail = 'mockContactEmail';

describe('ContactService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactService,
        {
          provide: MailerService,
          useValue: { sendMail: jest.fn(() => Promise.resolve()) },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(() => ({
              contactEmail: mockContactEmail,
            })),
          },
        },
      ],
    }).compile();

    contactService = module.get<ContactService>(ContactService);
  });

  it('should be defined', () => {
    expect(contactService).toBeDefined();
  });

  describe('sendMail', () => {
    it('should return a promise void', async () => {
      expect.assertions(1);
      await expect(
        contactService.sendMail(mockCreateMailDto),
      ).resolves.toBeUndefined();
    });
  });
});

describe('ContactService errors', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactService,
        {
          provide: MailerService,
          useValue: { sendMail: jest.fn(() => Promise.reject(new Error())) },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(() => ({
              contactEmail: mockContactEmail,
            })),
          },
        },
      ],
    }).compile();

    contactService = module.get<ContactService>(ContactService);
  });

  it('should be defined', () => {
    expect(contactService).toBeDefined();
  });

  describe('sendMail with error', () => {
    it('should throw an error', async () => {
      expect.assertions(1);
      await expect(
        contactService.sendMail(mockCreateMailDto),
      ).rejects.toThrowError();
    });
  });
});
