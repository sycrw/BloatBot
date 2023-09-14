import { EntitiesModule } from '../entities/entities.module';
import { GuildService } from './guild.service';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  imports: [EntitiesModule],
  providers: [GuildService, UserService],
  exports: [GuildService, UserService],
})
export class UtilModule {}
