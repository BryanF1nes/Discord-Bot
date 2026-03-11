const { REST, Routes, SlashCommandBuilder } = require('discord.js');
require("dotenv").config();

const commands = [
  new SlashCommandBuilder()
    .setName('start')
    .setDescription('Starting the Bewbs Minecraft Server'),
    
  new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stopping the Bewbs Minecraft Server'),

  new SlashCommandBuilder()
    .setName('status')
    .setDescription('Check server status'),

  new SlashCommandBuilder()
    .setName('players')
    .setDescription('See how many players are online'),
];

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