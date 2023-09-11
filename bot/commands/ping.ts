import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const PingCommand = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!");

export const PingHandler = async (interactions: CommandInteraction) => {
  await interactions.reply("Pong!");
};
