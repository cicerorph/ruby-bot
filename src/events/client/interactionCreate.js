const { Client, ActivityType, Interaction } = require(`discord.js`);

module.exports = {
    name: `interactionCreate`,
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction
     */
     async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);
            if (!commandName) return;

            try {
                await command.execute(interaction, client)
            } catch (err) {
                console.log(err);
                await interaction.reply({ content: `Falha ao executar o comando...\n> ${err}`, ephemeral: true })
            }
        }
     }
}