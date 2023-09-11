import { Module } from '@nestjs/common';
import { GuildService } from './guild.service';
import { UserService } from './user.service';
import { EntitiesModule } from 'src/entities/entities.module';

@Module({
    imports: [EntitiesModule],
    providers: [GuildService, UserService],
    exports: [GuildService, UserService]
})
export class UtilModule { }
