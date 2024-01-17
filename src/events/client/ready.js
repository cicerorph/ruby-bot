const { Client, ActivityType } = require(`discord.js`);

module.exports = {
    name: `ready`,
    once: true,
    /**
     * 
     * @param {Client} client 
     */
     async execute(client) {
        console.log(`[READY] ${client.user.tag} está ONLINE com zero erros.`)
        client.user.setActivity('Ruby Team!', { type: ActivityType.Watching })
    }
}