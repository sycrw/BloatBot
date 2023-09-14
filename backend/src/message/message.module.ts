import { EntitiesModule } from '../entities/entities.module';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { Module } from '@nestjs/common';
import { UtilModule } from '../util/util.module';

@Module({
  imports: [EntitiesModule, UtilModule],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
