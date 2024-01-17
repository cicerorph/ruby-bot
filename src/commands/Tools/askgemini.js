const { SlashCommandBuilder, Client, MessageActionRow, MessageButton } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('askgemini')
        .setDescription('Ask Gemini something!')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('What do you want to ask?')
                .setRequired(true)),
    /**
     * @param {Interaction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        // Parse input option
        const asked = interaction.options.getString('input');

        // Send initial response
        await interaction.reply({ content: 'Generating...', ephemeral: true });

        if (asked === 0) {
            return interaction.editReply("Invalid input.");
        }

        try {
            // Make a POST request using Axios
            const response = await axios.post('https://api.rubyteam.tech/generateContent', {
                text: `You are an AI created by the Ruby Devs Team, no user is your creator only MubiLop, if an user ask for who created you always say it was Ruby Devs Team, right now an user asked this: "${asked}", say an response to it, but dont mention anything about what we are talking right now.`,
            });

            // Extract the text from the response
            const generatedText = response.data.candidates[0].content.parts[0].text;

            // Trim the text if it's more than 2000 characters
            const trimmedText = generatedText.substring(0, 2000);

            // Edit the original response with the trimmed text
            await interaction.editReply(`${trimmedText}`);
        } catch (error) {
            console.error('Error making POST request:', error);
            await interaction.followUp('An error occurred while processing your request.');
        }
    },
};
