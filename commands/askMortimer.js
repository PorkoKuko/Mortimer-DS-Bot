import { SlashCommandBuilder } from '@discordjs/builders';
import OpenAI from 'openai';
import { config } from 'dotenv';
config(); // Load environment variables from .env

console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? 'Loaded' : 'Not loaded');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const data = new SlashCommandBuilder()
  .setName('askmortimer')
  .setDescription('Ask Mortimer anything using OpenAI')
  .addStringOption(option =>
    option.setName('question')
      .setDescription('Your question for Mortimer')
      .setRequired(true)
  );

export async function execute(interaction) {
  console.log('Command received:', interaction.commandName); 
  
  const question = interaction.options.getString('question');

  try {
    await interaction.deferReply();

    console.log('Sending request to OpenAI with question:', question);

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'user', content: question }
      ],
    });

    console.log('OpenAI response:', response);

    await interaction.editReply(response.choices[0].message.content);
  } catch (error) {
    console.error('OpenAI API error:', error);
    if (interaction.deferred || interaction.replied) {
      await interaction.editReply('Sorry, there was an error processing your request.');
    } else {
      await interaction.reply('Sorry, there was an error processing your request.');
    }
  }
}
//</create_file>
