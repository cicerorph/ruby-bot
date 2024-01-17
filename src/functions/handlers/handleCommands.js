const { readdirSync } = require(`fs`);
const { REST } = require(`@discordjs/rest`);
const { Routes } = require(`discord.js`);
const { _Token, _ClientId, _GuildId } = require(`../../config`);

module.exports = async (client) => {

    client.handleCommands = async () => {
        const commandFolder = readdirSync(`./src/commands`);
        for (folder of commandFolder) {
            const commandFile = readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith(`.js`));
            for (file of commandFile) {
                const command = require(`../../commands/${folder}/${file}`);
                client.commands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON());
                console.log(`[COMMANDS] carregado com sucesso. ${command.data.name}`);
            }
        }

        const rest = new REST({ version: `9` }).setToken(_Token);
        try {
            console.log("[SLASH-COMMANDS] Started refreshing application (/) commands.");
            await rest.put(Routes.applicationGuildCommands(_ClientId, _GuildId), { body: client.commandArray, });
            console.log("[SLASH-COMMANDS] Successfully reloaded application (/) commands.");
        } catch (err) {
            console.log(err);
        }
    }

};