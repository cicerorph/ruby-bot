const { SlashCommandBuilder, Client } = require('discord.js');
const axios = require('axios');
const conf = require('../../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('restartbot')
        .setDescription('Test'),
    /**
     * @param {Interaction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        // Specify the role ID that users should have to run the command
        const requiredRoleID = '1197251726164635678';

        // Check if the user has the required role
        const hasRequiredRole = interaction.member.roles.cache.some(role => role.id === requiredRoleID);

        if (hasRequiredRole) {
            // User has the required role, proceed with Axios request
            await interaction.reply({ content: `Restarting Bot, probably it will pull.`, ephemeral: true });
            try {
                const response = await axios.post('https://painel.galaxyhosting.cloud/api/client/servers/d4f46673/power', {
                    signal: 'restart',
                }, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${conf._KEYPANEL}`
                    },
                });

                // Handle the response as needed
                console.log(response.data);
            } catch (error) {
                console.error(error);
                interaction.reply({ content: 'An error occurred while executing the command.', ephemeral: true });
            }
        } else {
            // User does not have the required role
            interaction.reply({ content: 'You do not have the required role to run this command.', ephemeral: true });
        }
    },
};
