import { PingCommand, PingHandler } from "./commands/ping";

import { CommandInteraction } from "discord.js";

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
