import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Guild } from '../entities/guild.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async createUserIfNotExists(
    discordId: string,
    userName: string,
  ): Promise<User> {
    const doesExist = await this.userRepository.exist({
      where: { discordId: discordId },
    });
    if (!doesExist) {
      const user = new User();
      user.discordId = discordId;
      user.userName = userName;
      return await this.userRepository.save(user);
    }
    return await this.userRepository.findOne({
      where: { discordId: discordId },
      relations: { guilds: true },
    });
  }
  async addUserToGuildIfNotExists(user: User, guild: Guild): Promise<User> {
    if (!user.guilds.some((g) => g.discordId == guild.discordId)) {
      user.guilds.push(guild);
      this.userRepository.save(user);
    }
    return user;
  }
  async addMessageToUser(user: User, message: string): Promise<User> {
    user.messageCount += 1;
    user.messageCharacterCount += message.length;
    return await this.userRepository.save(user);
  }
}
