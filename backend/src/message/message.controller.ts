import { Body, Controller, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageDto } from '../types/message/message.dto';

@Controller('api/v1/message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Post()
  create(@Body() messageDto: MessageDto) {
    return this.messageService.create(messageDto);
  }
}
