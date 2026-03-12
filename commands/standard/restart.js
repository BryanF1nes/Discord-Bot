const { SlashCommandBuilder } = require('discord.js');
const { startServer, stopServer, getServerProcess } = require('../../serverProcess.js');
const { updateChannelName } = require('../../serverStatus.js');
require("dotenv").config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('restart')
        .setDescription('Restarts the BEWBS Minecraft Server.'),
    async execute(interaction) {
        const server = getServerProcess()
        const channel = await interaction.client.channels.fetch(process.env.CHANNEL_ID);

        await interaction.reply('Restarting the minecraft server, this may take a minute...');
        await channel.setName('🟠 Restarting...');

        if (server) {
            server.once('close', () => {
                const newServer = startServer();

                newServer.stdout.on('data', async data => {
                    const output = data.toString();
                    console.log(`SERVER: ${output}`);

                    if (output.includes('Done')) {
                        await interaction.followUp('Minecraft server has restarted and is online!');
                        await updateChannelName(interaction.client);
                    }
                });
            });

            stopServer();
        } else {
            const newServer = startServer();

            newServer.stdout.on('data', async data => {
                const output = data.toString();

                if (output.includes('Done')) {
                    await interaction.followUp('Minecraft server has restarted and is online!');
                    await updateChannelName(interaction.client);
                }
            })
        }
    }
}