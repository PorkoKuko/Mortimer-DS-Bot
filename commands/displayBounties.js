// commands/displayBounties.js
import { SlashCommandBuilder } from '@discordjs/builders';
import pkg from 'discord.js';
const { EmbedBuilder } = pkg;
import { getBounties } from '../data/bounties.js';

export const data = new SlashCommandBuilder()
    .setName('displaybounties')
    .setDescription('Display all available bounties');

export async function execute(interaction) {
    const bounties = getBounties();

    const embed = new EmbedBuilder()
        .setTitle('Bounty Board')
        .setColor(0xff0000);

    bounties.forEach(bounty => {
        embed.addFields({ name: bounty.name, value: `Value: ${bounty.value}`, inline: false });
    });

    await interaction.reply({ embeds: [embed] });
}

