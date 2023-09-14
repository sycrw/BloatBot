import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './user.entity';

@Entity()
export class Guild {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  discordId: string;
  @ManyToMany(() => User, (user) => user.guilds)
  users: User[];
}
