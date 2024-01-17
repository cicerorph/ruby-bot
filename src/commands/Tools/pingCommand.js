const { SlashCommandBuilder, Client, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`ping`)
        .setDescription(`Veja a minha latencia.`),
    /**
     * @param {Interaction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        interaction.reply({ content: `Latency is \`${client.ws.ping}\`MS.` })
    }
}