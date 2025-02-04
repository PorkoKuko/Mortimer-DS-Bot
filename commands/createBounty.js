// commands/createBounty.js
import { SlashCommandBuilder } from '@discordjs/builders';
import Bounty from '../models/Bounty.js';
import { addBounty } from '../data/bounties.js';

export const data = new SlashCommandBuilder()
    .setName('createbounty')
    .setDescription('Create a new bounty')
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
    
    const bounty = new Bounty(name, value);
    addBounty(bounty);

    await interaction.reply(`Bounty for ${name} with value ${value} has been created.`);
}
