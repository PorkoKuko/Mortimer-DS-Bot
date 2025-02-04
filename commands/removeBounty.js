// commands/removeBounty.js
import { SlashCommandBuilder } from '@discordjs/builders';
import { removeBounty } from '../data/bounties.js';

export const data = new SlashCommandBuilder()
    .setName('removebounty')
    .setDescription('Remove a bounty')
    .addStringOption(option => 
        option.setName('name')
        .setDescription('Name of the person')
        .setRequired(true))
    .addIntegerOption(option =>
        option.setName('value')
        .setDescription('Value of the bounty')
        .setRequired(true));

export async function execute(interaction) {
    const name = interaction.options.getString('name');
    const value = interaction.options.getInteger('value');

    removeBounty(name, value);

    await interaction.reply(`Bounty for ${name} with value ${value} has been removed.`);
}

