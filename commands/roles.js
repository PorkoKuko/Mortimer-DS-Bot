import { SlashCommandBuilder } from "discord.js";
import { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder} from 'discord.js';

 
export const data = new SlashCommandBuilder();
    data.setName('roles');
    data.setDescription('prueba de menús de selección');

/*export async function execute(interaction) {
    await interaction.reply('hola, estoy vivo xd');
}*/


//module.exports = {
	// data: new SlashCommandBuilder()...
	export async function execute(interaction) {
		const select = new StringSelectMenuBuilder()
        select.setCustomId('roles')
			select.setPlaceholder('elije pibe')
			select.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Pajeros')
					.setDescription('acceso a canal de contenido NSFW :holacd:')
					.setValue('Pajeros'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Araki Forgot')
					.setDescription('acceso a canales de jojos en general')
					.setValue('Araki Forgot'),
				new StringSelectMenuOptionBuilder()
					.setLabel('YBA Traders')
					.setDescription('acceso a canales de tradeo para YBA')
					.setValue('YBA Traders'),
			);

            const row = new ActionRowBuilder()
			.addComponents(select);
			
			role = interaction.options.getRole();
			if (select.get(0) === 'Pajeros'){rol = interaction.options.getRole('Pajeros');}

			const member = interaction.options.getMember('user');

		    await interaction.reply({
			    content: 'seelecciona que rol quieres obtener de el menu:',
			    components: [row],
				

		    });
			member.roles.add(role);
			
			

			/*await interaction.reply({
				content: 'Ahora ' + member + 'tiene el rol ' + role + '!',
			})*/
	}
//};