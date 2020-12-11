const Discord = require('discord.js');
const fs = require('fs');
const config = require('../../config.json')

module.exports = {
	name: 'help',
	description: 'Помощь по боту',
	category: 'info',
	async execute(client, message, args) {
			let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"))
	
	if(!prefixes[message.guild.id]) {
		prefixes[message.guild.id] = {
			prefix: config.bot.prefix
		}
	}
	
	
	let prefix = prefixes[message.guild.id].prefix

		const eco = client.commands.filter(c => c.category === "economy").map(c => `${prefix}${c.name} - ${c.description}`).join("\n") || 'Нет'
  const fun = client.commands.filter(c => c.category === "fun").map(c => `${prefix}${c.name} - ${c.description}`).join("\n") || 'Нет'
  const info = client.commands.filter(c => c.category === "info ").map(c => `${prefix}${c.name} - ${c.description}`).join("\n") || 'Нет'
  const rp = client.commands.filter(c => c.category === "rp").map(c => `${prefix}${c.name} - ${c.description}`).join("\n") || 'Нет'
  const utils = client.commands.filter(c => c.category === "utils").map(c => `${prefix}${c.name} - ${c.description}`).join("\n") || 'Нет'
  const admin = client.commands.filter(c => c.category === "admin").map(c => `${prefix}${c.name} - ${c.description}`).join("\n") || 'Нет'
  let embed = new Discord.MessageEmbed()
  .setTitle(`Помощь по командам`)
  .setDescription(`Бот в разработке.`)
  .setColor(0x303136)
  .addField(`Экономика`, eco)
  .addField(`Фан`, fun)
  .addField(`Информация`, info)
  .addField(`Рп`, rp)
  .addField(`Утилиты`, utils)
  .addField(`Администрация`, admin);
  message.channel.send(embed)
 }
}