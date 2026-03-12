const { SlashCommandBuilder } = require('discord.js');
const { startServer, getServerProcess } = require('../../serverProcess.js');
const { updateChannelName } = require('../../serverStatus.js');
require("dotenv").config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('start')
    .setDescription('Starts the BEWBS Minecraft Server.'),
    async execute(interaction) {
      if (getServerProcess()) {
        return interaction.reply('Server is already running.');
      }

      const server = startServer();
      await interaction.reply('Starting BEWBS Minecraft Server...');

      server.stdout.on('data', async data => {
        const output = data.toString();
        console.log(`SERVER: ${output}`);

        if (output.includes('Done')) {
            await interaction.followUp('Minecraft Server is now live!');
            await updateChannelName(interaction.client);
        }
      })
    }
}