const Discord = require('discord.js');

module.exports = {
	name: 'help',
	description: 'Помощь по командам',
	run: async(client, message, args) => {
		if(!args[0]) {
			let embed = new Discord.MessageEmbed()
			.setTitle('Помощь по командам:')
			.setDescription(`Команды отсуствуют.`);
			message.channel.send(embed);
		}
		if(args[0]) {
			let com = args[0]
  const command = client.commands.get(com) || client.commands.find(c => c.aliases && c.aliases.includes(com))
  if(command.admin) return
if(!command) {
	return message.reply(`Я не нашел эту команду!`)
}

message.channel.send(
	new Discord.MessageEmbed()
	.setTitle(`Помощь по команде:`)
	.setDescription(`Информация:
	Название: ${command.name}
	Описание: ${command.description}`)
	);
		}
	}
};