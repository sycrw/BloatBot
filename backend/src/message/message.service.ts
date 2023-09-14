import { Inject, Injectable } from '@nestjs/common';
import { MessageDto } from '../types/message/message.dto';
import { GuildService } from '../util/guild.service';
import { UserService } from '../util/user.service';
@Injectable()
export class MessageService {
  constructor(
    @Inject(UserService)
    private userService: UserService,
    @Inject(GuildService)
    private guildService: GuildService,
  ) {}
  async create(messageDto: MessageDto) {
    const user = await this.userService.createUserIfNotExists(
      messageDto.userId,
      messageDto.userName,
    );
    const guild = await this.guildService.createGuildIfNotExists(
      messageDto.guildId,
    );
    await this.userService.addUserToGuildIfNotExists(user, guild);
    await this.userService.addMessageToUser(user, messageDto.content);
    return user;
  }
}
