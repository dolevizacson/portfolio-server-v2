import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Config } from '../config/oauth2.config';
import { CreateMailDto } from './dto/create-mail.dto';

@Injectable()
export class ContactService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendMail(createMailDto: CreateMailDto): Promise<void> {
    const { from, text } = createMailDto;
    const { contactEmail } =
      this.configService.get<OAuth2Config>('oAuth2Config');

    await this.mailerService.sendMail({
      ...createMailDto,
      text: `Send from ${from} \n${text}`,
      replyTo: from,
      to: contactEmail,
    });
  }
}
