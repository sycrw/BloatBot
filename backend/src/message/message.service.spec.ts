import { Test, TestingModule } from '@nestjs/testing';

import { GuildService } from '../util/guild.service';
import { MessageService } from './message.service';
import { UserService } from '../util/user.service';
import { randomMessageDto } from '../testing/dtos/message';

describe('MessageService', () => {
  let service: MessageService;

  let guildService: GuildService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let userService: UserService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        {
          provide: GuildService,
          useValue: {
            createGuildIfNotExists: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            createUserIfNotExists: jest.fn(),
            addUserToGuild: jest.fn(),
          },
        },
      ],
      imports: [],
    }).compile();

    service = module.get<MessageService>(MessageService);
    guildService = module.get<GuildService>(GuildService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call guildService.createGuildIfNotExists', async () => {
    const guildSpy = jest.spyOn(guildService, 'createGuildIfNotExists');
    const random = randomMessageDto();
    expect(guildSpy).toBeCalledWith(random.guildId);
  });
});
