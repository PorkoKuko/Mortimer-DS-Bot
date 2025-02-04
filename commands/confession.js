import pkg from 'discord.js';
const { EmbedBuilder, SlashCommandBuilder } = pkg;

let confessionCount = 0; // To keep track of the number of confessions

export const data = new SlashCommandBuilder()
    .setName('confess') // Change command name to "confess"
    .setDescription('Envía una confesión de forma anónima.') 
    .addStringOption(option =>
        option.setName('mensaje') 
            .setDescription('Tu confesión') 
            .setRequired(true));

export async function execute(interaction) {
    if (!interaction.isCommand()) return; // Ensure it's a command interaction

    const confessionMessage = interaction.options.getString('mensaje'); // Get the confession message
    confessionCount++; // Increment the confession count

    // Send a confirmation reply to the user
    await interaction.reply({ content: 'Tu confesión ha sido enviada', ephemeral: true }); 

    // Send the actual confession to the text channel
    const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle(`Confesión #${confessionCount}`) 
        .setDescription(confessionMessage) // Confesion
        .setTimestamp();

    await interaction.channel.send({ embeds: [embed] }); // send message
}
