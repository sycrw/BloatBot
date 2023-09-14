import { CommandInteraction, Message } from "discord.js";

import { PingHandler } from "./commands/ping";
import axios from "axios";
import { env } from "./env";

export const handlers: {
  [key: string]: (interaction: CommandInteraction) => Promise<any>;
} = {
  ping: PingHandler,
};

export const handleInteraction = (interaction: CommandInteraction) => {
  const handler = handlers[interaction.commandName];
  console.log(handler.name, "handler");
  if (!handler) return;
  handler(interaction);
};

export const handleMessage = (message: Message) => {
  const MessageDTO = {
    content: message.content,
    userId: message.author.id,
    userName: message.author.username,
    guildId: message.guild!.id,
  };
  console.log(MessageDTO);
};
