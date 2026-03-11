const { REST, Routes, SlashCommandBuilder } = require('discord.js');
require("dotenv").config();

new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stopping the Bewbs Minecraft Server')

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log('Slash commands registered');
  } catch (error) {
    console.error(error);
  }
})();