import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import { Guild } from "./guild.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    @Column({ unique: true })
    discordId: string
    @Column()
    userName: string
    @ManyToMany(() => Guild, (guild) => guild.users)
    @JoinTable()
    guilds: Guild[]

}