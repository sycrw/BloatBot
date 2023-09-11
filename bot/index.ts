import { Client, CommandInteraction, GatewayIntentBits } from "discord.js";
import { REST, Routes } from "discord.js";

import { PingHandler } from "./commands/ping";
import { commands } from "./commands";
import { env } from "./env";
import { handleInteraction } from "./handler";

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

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
});

client.login(TOKEN);
