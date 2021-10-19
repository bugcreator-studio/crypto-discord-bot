import { Client, ClientApplication, Collection, Intents } from "discord.js";
import log from "fancy-log";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_INTEGRATIONS,
  ],
});

client.on("ready", () => {
  log.info(`> Bot is on ready as ${client?.user?.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }
});

client.on("messageCreate", async (message) => {
  if (message.content === "deploy") {
    await message.guild?.commands.set([
      {
        name: "ping",
        description: "Test",
      },
    ]);
  }
});

client.login(process.env.TOKEN);
