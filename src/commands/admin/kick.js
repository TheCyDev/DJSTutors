const Discord = require('discord.js');
const data = require('../../locales/russian.json');

module.exports = {
	name: 'kick',
	description: 'Кикнуть пользователя с сервера',
	use: `<@Пользователь> <Причина>`,
	category: 'admin',
	async execute(client, message, args) {
		if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply(data.ADMIN.NO_PERMS_KICK);
		if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply(data.ADMIN.NO_ME_PERMS_KICK);
		
		const kickUser = message.guild.member(message.mentions.users.first() || message.guild.member(args[0]));
		if(!kickUser) return message.reply(data.ADMIN.NO_USER);
		
		const reason = args.slice(1).join(" ");
		if(!reason) return message.reply(data.ADMIN.NO_REASON);
		
		let emb = new Discord.MessageEmbed()
		.setTitle('Пользователя Выгнали!')
		.setDescription(`Кикнул: **${message.author.tag}**[\`ID: ${message.author.id}\`]\nПользователя: **${kickUser.user.tag}**[\`ID: ${kickUser.id}\`]\nПричина: **${reason}**.`)
  .setColor(0x303136);
 await message.channel.send(emb);
 await message.guild.member(kickUser).kick(reason);
	}
};