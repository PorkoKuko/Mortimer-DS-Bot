// commands/leave.js
import { SlashCommandBuilder } from '@discordjs/builders';
import { leaveChannel } from '../voiceManager.js';

export const data = new SlashCommandBuilder()
    .setName('leave')
    .setDescription('abandonare tu canal de voz');

export async function execute(interaction) {
    const guildId = interaction.guild.id;
    leaveChannel(guildId);
    await interaction.reply('abandone un canal de voz!');
}
