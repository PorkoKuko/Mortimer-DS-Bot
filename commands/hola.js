import { SlashCommandBuilder } from "discord.js";
 
export const data = new SlashCommandBuilder();
    data.setName('hola');
    data.setDescription('comando de prueba xd');

export async function execute(interaction) {
    await interaction.reply('hola, estoy vivo xd');
}
