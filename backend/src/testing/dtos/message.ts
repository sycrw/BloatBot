import { MessageDto } from '../../types/message/message.dto';
import { randomString } from '../primitive/string';

export const randomMessageDto = (): MessageDto => ({
  content: randomString(10),
  userId: randomString(10),
  userName: randomString(10),
  guildId: randomString(10),
});
