import { SlashCommandBuilder } from "discord.js";
 
export const data = new SlashCommandBuilder();
    data.setName('holacd');
    data.setDescription('wtf?');

export async function execute(interaction) {
    await interaction.reply('caca roja>>>>>>>> caca verde');
}