require('dotenv').config();

async function updateChannelName(client) {
    const channel_id = process.env.CHANNEL_ID;
    const channel = await client.channels.fetch(channel_id);

    async function update() {
        try {
            const result = await fetch(`https://api.mcstatus.io/v2/status/java/${process.env.SERVER_IP}`);
            const data = await result.json();

            if (!data.online) {
                await channel.setName("🔴 Offline | 0/10")
            } else {
                await channel.setName(`🟢 Online | ${data.players.online}/${data.players.max}`)
            }
        } catch (error) {
            console.error("Status update failed: ", error);
        }
    }

    update();

    setInterval(update, 60000);
}

module.exports = { updateChannelName }
