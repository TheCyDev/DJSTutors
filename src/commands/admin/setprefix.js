const Discord = require('discord.js');
const fs = require('fs')
const config = require('../../config.json')
const data = require('../../locales/russian.json')
module.exports = {
	name: 'setprefix',
	category: 'admin',
	description: 'Поставить префикс бота на этом сервере',
	async execute(client, message, args) {

let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

	if(!prefixes[message.guild.id]) {
		prefixes[message.guild.id] = {
			prefix: config.prefix
		}
	}
	
	let prefix = prefixes[message.guild.id].prefix
	
	
	if(!message.member.hasPermission("ADMINISTRATOR")) {
		let embed = new Discord.MessageEmbed()
		.setTitle(`Ошибка!`)
		.setDescription(`У вас нет прав **Администратор**!`)
		.setColor(0xFF0000);
	return	message.channel.send(embed)
	}
		
		if(!args[0]) {
			let embed = new Discord.MessageEmbed()
			.setDescription(`${message.author}, Укажите новый префикс!`)
			.setColor(0x363940)
		}
		
		prefixes[message.guild.id] = {
			prefix: args[0]
		}
		
		fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
			if (err) console.log(err)
		})
		
		let embed = new Discord.MessageEmbed()
		.setTitle('Новый префикс!')
		.setDescription(`${data.GLOBAL.PREFIX_SETTED}: **${args[0]}**`)
		.setColor(0x363940)
		
		message.channel.send(embed)
		}
};