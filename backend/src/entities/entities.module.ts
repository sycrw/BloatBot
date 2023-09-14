import { Guild } from './guild.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Guild]),
  ],
  exports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Guild]),
  ],
})
export class EntitiesModule {}
