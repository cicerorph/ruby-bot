const { readdirSync } = require(`fs`);
const { REST } = require(`@discordjs/rest`);
const { Routes } = require(`discord.js`);
const { _Token, _ClientId, _GuildId } = require(`../../config`);

module.exports = async (client) => {

    client.handleEvents = async () => {
        const eventFolder = readdirSync(`./src/events`);
        for (folder of eventFolder) {
            const eventFile = readdirSync(`./src/events/${folder}`).filter(file => file.endsWith(`.js`));
            switch (folder) {
                case "client":
                    for (file of eventFile) {
                        const event = require(`../../events/${folder}/${file}`);
                        if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
                        else client.on(event.name, (...args) => event.execute(...args, client));
                    }
                    break;
                case "guilds":
                    for (file of eventFile) {
                        const event = require(`../../events/${folder}/${file}`);
                        if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
                        else client.on(event.name, (...args) => event.execute(...args, client));
                    }
                    break;
            }
        }
    }

}