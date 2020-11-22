const Discord = require('discord.js');
const fs = require('fs');
const config = require('../config/bot.json');

  module.exports = {
  	name: 'prefix',
  	execute(bot, message, args) {
  		let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  		
  		if(!prefixes[message.guild.id]) {
  			prefixes[message.guild.id] = {
  				prefix: config.prefix
  			};
  		}
  		
  		let prefix = prefixes[message.guild.id].prefix;
  		
  		if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`У вас нет прав: [Администратор]!`)
  		
  		if(!args[0]) return message.reply(`Укажите новый префикс!`)
  		
  		prefixes[message.guild.id] = {
  			prefix: args[0]
  		}
  		
  				fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
			if (err) console.log(err)
		})
		
		let embed = new Discord.MessageEmbed()
		.setTitle('Новый префикс!')
		.setDescription(`Префикс сменён на: **${args[0]}**`)
		.setColor(0x363940)
		
		message.channel.send(embed)
  	}
  };