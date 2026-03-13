const { SlashCommandBuilder } = require('discord.js');
const { stopServer, getServerProcess } = require('../../serverProcess.js');
const { updateChannelName } = require('../../serverStatus.js');
require('dotenv').config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stops the BEWBS Minecraft Server.'),
    async execute(interaction) {
      const server = getServerProcess();

      if (!server) {
        return interaction.reply('Server is not currently running.');
      }

      await interaction.reply('Stopping the server...');
      server.stdout.on('data', async data => {
        const output = data.toString();

        if (output.includes('Stopping server')) {
          await interaction.followUp('Minecraft Server has now stopped.');
          await updateChannelName(interaction.client);
        }
      });

      stopServer();
    }
}