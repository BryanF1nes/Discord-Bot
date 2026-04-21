/** Quest class - Purpose is to create a quest object to populate the quest json file */

/**
 * Represents a Quest
 * @constructor
 * @param {string} quest_name - represents the name of the quest
 * @param {string} type - represents the type of quest
 * @param {string} quest_target - represents the minecraft item/value to go for
 * @param {number} quest_min - represents the minimum possible value
 * @param {number} quest_max - represents the maximum possible value
 * @param {object} reward - represents the payout possibilities within an object
 */

class Quest {
    constructor(quest_name, type, quest_target, quest_min, quest_max, reward) {
        this.quest_name = quest_name,
        this.type = type,
        this.quest_target = quest_target,
        this.quest_min = quest_min,
        this.quest_max = quest_max,
        this.reward = reward
    }

    toJSON() {
        return {
            quest_name: this.quest_name,
            type: this.type,
            quest_target: this.quest_target,
            quest_min: this.quest_min,
            quest_max: this.quest_max,
            reward: this.reward
        }
    }
}

module.exports = { Quest };