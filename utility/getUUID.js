const fs = require('fs');
const path = require('path');

function normalizeName(name) {
    return name.toLowerCase().trim();
}

function getUUID(minecraft_name) {
    const whiteListPath = path.join(__dirname, '../data/whitelist.json');
    const whitelist = JSON.parse(fs.readFileSync(whiteListPath, 'utf-8'));
    const targetName = normalizeName(minecraft_name);

    const match = whitelist.find(entry => {
        return normalizeName(entry.name) === targetName;
    });

    return match ? match.uuid : null;
}

module.exports = { getUUID };
