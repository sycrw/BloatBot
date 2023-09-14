import { Client, GatewayIntentBits } from "discord.js";
import { REST, Routes } from "discord.js";
import { handleInteraction, handleMessage } from "./handler";

import { commands } from "./commands";
import { env } from "./env";

const { CLIENT_ID, TOKEN, API_KEY } = env;

const rest = new REST({ version: "10" }).setToken(TOKEN);

const registerSlashCommands = async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
};
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", async () => {
  console.log(`Logged in as (/) ${client.user!.tag}!`);
  registerSlashCommands();
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  handleInteraction(interaction);
});

/**
 * Message handler
 * @param message The message that was sent type?: Message
 * @returns
 * @description
 * This is a message handler that will be called every time a message is sent in a channel that the bot has access to.
 * This is useful for things like message logging, or message parsing.
 * This is not a command handler, and should not be used as such.
 **/
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  handleMessage(message);
});

client.login(TOKEN);
