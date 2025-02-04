// commands/play.js
import { SlashCommandBuilder } from '@discordjs/builders';
import { joinChannel, playYouTube } from '../voiceManager.js';

export const data = new SlashCommandBuilder()
    .setName('play')
    .setDescription('Reproduce audio de un video en YT!')
    .addStringOption(option =>
        option.setName('url')
        .setDescription('la direccion URL del video')
        .setRequired(true));

export async function execute(interaction) {
    const url = interaction.options.getString('url');
    const channel = interaction.member.voice.channel;

    if (channel) {
        try {
            const connection = await joinChannel(channel);
            await playYouTube(connection, url);
            await interaction.reply(`Reproduciendo: ${url}`);
        } catch (error) {
            await interaction.reply(`Error: ${error.message}`);
        }
    } else {
        await interaction.reply('Tienes que estar en un canal de voz primero!');
    }
}
