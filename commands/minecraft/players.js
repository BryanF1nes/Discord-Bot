const { SlashCommandBuilder } = require('discord.js');
const { getServerProcess } = require('../../serverProcess.js');
require("dotenv").config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('players')
        .setDescription('Provides a list of players that are online.'),
    async execute(interaction) {

        if (!getServerProcess()) {
            return interaction.reply('The server is offline');
        }

        try {
            const result = await fetch(`https://api.mcstatus.io/v2/status/java/${process.env.SERVER_IP}`);
            const data = await result.json();

            const playerList = data.players?.list || [];

            if (playerList.length === 0) {
                return interaction.reply('There are no players online.');
            }

            return interaction.reply(`Players: ${playerList.map(player => player.name_clean).join(", ")}`);

        } catch (error) {
            console.error("Status update failed: ", error);
        }
    }
}
