const Discord = require('discord.js');
const fs = require('fs');
const data = require('../../locales/russian.json');
const { Dating } = require('../../util/functions');

module.exports = {
	name: 'setlog',
	description: 'Установить логи в канал',
	category: 'admin',
	execute(client, message, args) {
		const logs = JSON.parse(fs.readFileSync("./logs.json", "utf8"));
		
		if(!logs[message.guild.id]) {
			logs[message.guild.id] = {
				channelId: '775717047455711282'
			};
		}
		
		if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(data.LOGS.PERMS_ADMIN);
		
		logs[message.guild.id] = {
			channelId: message.channel.id
		};
		
		fs.writeFile("./logs.json", JSON.stringify(logs), (err) => {
			if (err) console.log(err);
		});
		
		let embed = new Discord.MessageEmbed()
		.setTitle(data.LOGS.EMBED_NICE.TITLE)
		.setDescription(data.LOGS.EMBED_NICE.DESCRIPTION + ` ${message.channel}`)
		.setColor(data.LOGS.EMBED_NICE.COLOR)
		.setTimestamp();
		message.channel.send(embed);
	}
};