/** Player class - Purpose is to create a player object that will be transposed into the json object */

/**
 * Represents a Player
 * @constructor
 * @param {string} minecraft_name - User inputs their minecraft name (that appears in game) and checks the whitelist users to see a match
 * @private @param {string} discord_id - Grabs the discord ID of the individual to sync it with the "database"
 * @private @param {string} minecraft_uuid - Looks at the current server whitelist and matches the minecraftID with the users minecraft name input
 */

/*{
    "116765690207141889": {

        "discord_id": "116765690207141889",
            "minecraft_uuid": "046dff03-2dac-4659-ba65-a905a64914d0",
                "minecraft_name": "MrFines",
                    "level": 1,
                        "xp": 0,
                            "quests_completed": 0,
                                "current_quest": null
    }
}*/

class Player {
    constructor(discord_id, minecraft_name, minecraft_uuid) {
        this.discord_id = discord_id;
        this.minecraft_name = minecraft_name;
        this.minecraft_uuid = minecraft_uuid;
        this.level = 1;
        this.xp = 0;
        this.quests_completed = 0;
        this.current_quest = null;
    }
}

module.exports = { Player }
