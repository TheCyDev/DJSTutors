const Discord = require('discord.js');
const fs = require('fs')
const config = require('../../config.json')
const data = require('../../locales/russian.json')
const { getServerPrefix, setServerPrefix } = require('../../util/functions');
module.exports = {
	name: 'setprefix',
	category: 'admin',
	description: 'Поставить префикс бота на этом сервере',
	async execute(client, message, args) {
	
	const newPrefix = args[0]
	const sPrefix = await getServerPrefix(message.guild.id)
	
	if(!message.member.hasPermission("ADMINISTRATOR")) {
		let embed = new Discord.MessageEmbed()
		.setTitle(`Ошибка!`)
		.setDescription(`У вас нет прав **Администратор**!`)
		.setColor(0xFF0000);
	return	message.channel.send(embed)
	}
	if(!newPrefix) return message.reply(`Укажте префикс!`)
		
		let embed = new Discord.MessageEmbed()
		.setTitle('Новый префикс!')
		.setDescription(`Префикс Стал: **${newPrefix}**`)
		.setColor(0x363940)
		
		message.channel.send(embed)
		await setServerPrefix(message.guild.id, newPrefix)
		}
};