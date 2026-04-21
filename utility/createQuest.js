const fs = require('fs');
const path = require('path');
const { Quest } = require('../classes/quest.js');

const questsPath = path.join(__dirname, '../data/quests.json');
const quests = require(questsPath);

function saveQuest() {
    fs.writeFileSync(questsPath, JSON.stringify(quests, null, 4));
}

function createQuest() {
    const quest = new Quest("mine_iron", "mine", "minecraft:iron_ore", 10, 25, { "item": "minecraft:diamon", "amount": 5, "xp": 100 });
    quests[quest.quest_name] = quest.toJSON();

    saveQuest();

    const message = `Quest [${quest.quest_name}] successfully saved.`
    return message;
}

console.log(createQuest());