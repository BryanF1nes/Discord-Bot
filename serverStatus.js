require('dotenv').config();


async function updateChannelName(client) {
    const channel_id = process.env.CHANNEL_ID;
    const channel = await client.channels.fetch(channel_id);
    let lastChannelName = null;

    async function update() {
        try {
            const result = await fetch(`https://api.mcstatus.io/v2/status/java/${process.env.SERVER_IP}`);
            const data = await result.json();

            let newChannelName;

            if (!data.online) {
                newChannelName = "🔴 Offline | 0/10"
                //await channel.setName("🔴 Offline | 0/10")
            } else {
                newChannelName = `🟢 Online | ${data.players.online}/${data.players.max}`;
                //await channel.setName(`🟢 Online | ${data.players.online}/${data.players.max}`)
            }

            if (newChannelName !== lastChannelName) {
                await channel.setName(newChannelName);
                lastChannelName = newChannelName;
            }
        } catch (error) {
            console.error("Status update failed: ", error);
        }
    }

    update();

    setInterval(update, 60000);
}

module.exports = { updateChannelName }
