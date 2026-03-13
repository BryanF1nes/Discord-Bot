const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quest')
        .setDescription('Gives you a daily quest to complete in-game.'),
    async execute(interaction) {
        await interaction.reply('Daily Quest Given');
    }
}