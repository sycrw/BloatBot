import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Guild } from '../entities/guild.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GuildService {
  constructor(
    @InjectRepository(Guild)
    private guildRepository: Repository<Guild>,
  ) {}
  async createGuildIfNotExists(discordId: string): Promise<Guild> {
    const doesExist = await this.guildRepository.exist({
      where: { discordId: discordId },
    });
    if (!doesExist) {
      const guild = new Guild();
      guild.discordId = discordId;
      return await this.guildRepository.save(guild);
    }
    return await this.guildRepository.findOneBy({ discordId: discordId });
  }
}
