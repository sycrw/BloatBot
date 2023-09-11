import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { Guild } from 'src/entities/guild.entity';
import { MessageDto } from 'src/types/message/message.dto'
import { GuildService } from 'src/util/guild.service';
import { UserService } from 'src/util/user.service';
@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @Inject(UserService)
        private userService: UserService,
        @InjectRepository(Guild)
        private guildRepository: Repository<Guild>,
        @Inject(GuildService)
        private guildService: GuildService
    ) { }
    async create(messageDto: MessageDto) {
        const user = await this.userService.createUserIfNotExists(messageDto.userId, messageDto.userName)
        const guild = await this.guildService.createGuildIfNotExists(messageDto.guildId)
        if (!user.guilds.some(g => g.discordId == messageDto.guildId)) {
            user.guilds.push(guild)
            this.userRepository.save(user)
        }
        return user
    }
}
