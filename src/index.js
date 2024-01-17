const { Client, Collection } = require('discord.js');
const fs = require('fs');
const conf = require('./config');
const client = new Client({ intents: conf._Intents });

client.commands = new Collection();
client.commandArray = [];

const functionsFolder = fs.readdirSync(`./src/functions`);
for (const folder of functionsFolder) {
    const functionsFiles = fs.readdirSync(`./src/functions/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of functionsFiles) require(`./functions/${folder}/${file}`)(client);
}

client.handleCommands();
client.handleEvents();
client.login(conf._Token);