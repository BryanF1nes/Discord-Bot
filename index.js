const { Client, GatewayIntentBits } = require('discord.js');
const { spawn } = require('child_process');
const { serverPath } = require('./config.js');
const path = require('path');
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

let serverProcess = null;

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'start') {

    if (serverProcess) {
      return interaction.reply('Server is already running.');
    }

    await interaction.reply('Starting server...');

    serverProcess = spawn('java', [
      '-Xmx4G',
      '-Xms2G',
      '-jar',
      'server.jar',
      'nogui'
    ], {
      cwd: serverPath
    });

    serverProcess.stdout.on('data', data => {
        const output = data.toString();
        console.log(`SERVER: ${output}`);

        if (output.includes('Done')) {
            const channel = client.channels.cache.get(process.env.CHANNEL_ID);
            if (channel) {
                channel.send('✅ BEWBS Minecraft Server is up and running!')
            }
        }

        if (output.includes('All dimensions are saved')) {
            const channel = client.channels.cache.get(process.env.CHANNEL_ID);
            if (channel) {
                channel.send('🛑 Server has stopped!')
            }
        }

    })

    serverProcess.stderr.on('data', data => {
      console.error(`ERROR: ${data}`);
    });

    serverProcess.on('close', code => {
      console.log(`Server exited with code ${code}`);
      serverProcess = null;
    });
  }

  if (interaction.commandName === 'stop') {

    if (!serverProcess) {
      return interaction.reply('Server is not running.');
    }

    await interaction.reply('Stopping server...');
    serverProcess.stdin.write('stop\n');
  }

  if (interaction.commandName === 'status') {
    if (serverProcess) {
      interaction.reply('Server is running.');
    } else {
      interaction.reply('Server is offline.');
    }
  }
});

client.login(process.env.BOT_TOKEN);