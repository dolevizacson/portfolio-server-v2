import { Body, Controller, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateMailDto } from './dto/create-mail.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  sendMail(@Body() createMailDto: CreateMailDto): Promise<void> {
    return this.contactService.sendMail(createMailDto);
  }
}
