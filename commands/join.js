// commands/join.js
import { SlashCommandBuilder } from "discord.js";
import { joinChannel } from '../voiceManager.js';

export const data = new SlashCommandBuilder()
    .setName('join')
    .setDescription('Me unire contigo a un canal de voz');

export async function execute(interaction) {
    const channel = interaction.member.voice.channel;
    if (channel) {
        await joinChannel(channel);
        await interaction.reply('Me he unido a un canal de voz!');
    } else {
        await interaction.reply('Tienes que estar en un canal de voz primero!');
    }
}
