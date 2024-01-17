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

        try {
            // Make a POST request using Axios
            const response = await axios.post('https://api.rubyteam.tech/generateContent', {
                text: `${asked}`,
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
