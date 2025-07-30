import { Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import * as hola from './commands/hola.js';
import * as holacd from './commands/holacd.js';
import * as roles from './commands/roles.js';
import * as createBounty from './commands/createBounty.js';
import * as displayBounties from './commands/displayBounties.js';
import * as removeBounty from './commands/removeBounty.js';
import * as join from './commands/join.js';
import * as play from './commands/play.js';
import * as leave from './commands/leave.js';
import * as confession from './commands/confession.js'; // Import the confession command
import * as askMortimer from './commands/askMortimer.js'; // Import the askMortimer command

config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

export { client };

function readyDiscord() {
    console.log('estoy vivo xd ' + client.user.tag);
}
                                        
async function handleInteraction(interaction) {
    if (!interaction.isCommand()) return;
    if (interaction.commandName === 'hola') {
        await hola.execute(interaction);
    }
    if (interaction.commandName === 'holacd') {
        await holacd.execute(interaction);
    }
    if (interaction.commandName === 'roles') {
        await roles.execute(interaction);
        await interaction.reply('Rol otorgado ✅');
    }
    if (interaction.commandName === 'createbounty') {
        await createBounty.execute(interaction);
    }
    if (interaction.commandName === 'displaybounties') {
        await displayBounties.execute(interaction);
    }
    if (interaction.commandName === 'removebounty') {
        await removeBounty.execute(interaction);
    }
    if (interaction.commandName === 'join') {
        await join.execute(interaction);
    }
    if (interaction.commandName === 'play') {
        await play.execute(interaction);
    }
    if (interaction.commandName === 'leave') {
        await leave.execute(interaction);
    }
    if (interaction.commandName === 'confess') { // Handle the confession command
        await confession.execute(interaction);
    }
    if (interaction.commandName === 'askMortimer') {  // Handle the askMortimer command
        await askMortimer.execute(interaction);
    }
}

client.once(Events.ClientReady, readyDiscord);

client.login(process.env.TOKEN);

client.on(Events.InteractionCreate, handleInteraction);
