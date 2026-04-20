/* Register command for the quest system */
const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const { Player } = require('../../classes/player.js');
const { getUUID } = require('../../utility/getUUID.js');

const playersPath = path.join(__dirname, '../../data/players.json');
const players = require(playersPath);

function savePlayer() {
    fs.writeFileSync(playersPath, JSON.stringify(players, null, 4));
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Registers a player for the quest system using their minecraft in-game name.')
        .addStringOption(option =>
            option
                .setName('minecraft_name')
                .setDescription('Your Minecraft username')
                .setRequired(true)
        ),

    async execute(interaction) {
        const discord_id = interaction.user.id;
        const minecraft_name = interaction.options.getString('minecraft_name');
        const minecraft_uuid = getUUID(minecraft_name);

        if (!minecraft_uuid) {
            return interaction.reply({
                content: "Minecraft name was not found in whitelist.",
                ephemeral: true
            });
        }

        if (players[minecraft_name]) {
            return interaction.reply({
                content: "You are already registered.",
                ephemeral: true
            })
        }

        const player = new Player(discord_id, minecraft_name, minecraft_uuid);
        players[minecraft_uuid] = {
            discord_id: player.discord_id,
            minecraft_name: player.minecraft_name,
            minecraft_uuid: player.minecraft_uuid,
            level: player.level,
            xp: player.xp,
            quests_completed: player.quests_completed,
            current_quest: player.current_quest
        };

        savePlayer();

        return interaction.reply({
            content: `Successfully registered ${minecraft_name}!`,
            ephemeral: true
        });
    }
}
