import { IsNotEmpty } from 'class-validator';

export class MessageDto {
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  userName: string;
  @IsNotEmpty()
  guildId: string;
}
