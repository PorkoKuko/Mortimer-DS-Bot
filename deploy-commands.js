// Slash Commands Deployment Script
// https://discordjs.guide/creating-your-bot/command-deployment.html#guild-commands/

// Importing modules using ES6 syntax
import { REST, Routes, Client, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import fs from 'node:fs';

config(); // Using dotenv config function directly

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
  const command = await import(`./commands/${file}`); // Using dynamic import
  if ('data' in command && 'execute' in command) {
    commands.push(command.data.toJSON());
  } else {
    console.log(`[WARNING] The command ${file} is missing a required "data" or "execute" property.`);
  }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.TOKEN);

// Create a new client instance
const client = new Client({
    intents: [GatewayIntentBits.Guilds], // Add necessary intents
});

// Log in the client
await client.login(process.env.TOKEN);

// Fetch guilds and register commands for each guild
const guilds = await client.guilds.fetch(); // Fetch all guilds the bot is in

if (!process.env.CLIENTID) {
  console.error('Error: CLIENTID environment variable is not set.');
  process.exit(1);
}

(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    for (const [guildId] of guilds) {
      // The put method is used to fully refresh all commands in the guild with the current set
      const data = await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENTID, guildId),
        { body: commands },
      );

      console.log(`Successfully reloaded commands for guild: ${guildId}`);
    }
  } catch (error) {
    console.error(error);
  }
})();
