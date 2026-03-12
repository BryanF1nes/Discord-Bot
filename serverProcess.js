const { spawn } = require('child_process');
const { serverPath } = require('./config.js');
require('dotenv').config();

let serverProcess = null;

function startServer() {
    if (serverProcess) return null;

    serverProcess = spawn('java', [
        '-Xmx4G',
        '-Xms2G',
        '-jar',
        'server.jar',
        'nogui'
    ], {
        cwd: serverPath
    });

    serverProcess.on('close', () => {
        console.log('Minecraft server stopped');
        serverProcess = null;
    })

    return serverProcess;
}

function stopServer() {
    if (!serverProcess) return false;

    serverProcess.stdin.write('stop\n');
    return true;
}

function getServerProcess() {
    return serverProcess;
}

module.exports = {
    startServer,
    stopServer,
    getServerProcess
}