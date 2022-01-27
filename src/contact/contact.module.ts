import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';

@Module({
  imports: [MailerModule, ConfigModule],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
