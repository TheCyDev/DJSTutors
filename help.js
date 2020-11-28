const Discord = require('discord.js');
const fs = require('fs');
const config = require('../config/bot.json');

  module.exports = {
  	name: 'help',
  	async execute(bot, message, args) {
  		let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  		
  		if(!prefixes[message.guild.id]) {
  			prefixes[message.guild.id] = {
  				prefix: config.prefix
  			};
  		}
  		
  		let prefix = prefixes[message.guild.id].prefix;
  		if(!args[0]) {
  		let emb = new Discord.MessageEmbed()
  		.setTitle('Помощь')
  		.setAuthor(bot.user.username, bot.user.avatarURL())
  		.setFooter(message.author.tag, message.author.avatarURL())
  		.setColor(0x303136)
  		.setThumbnail(message.guild.iconURL())
  		.setDescription(`${prefix}prefix <Новый префикс> - установить новый префикс бота.`);
  	return	message.channel.send(emb);
  		}
  		if(args[0] === "prefix") {
  			let emb = new Discord.MessageEmbed()
  		.setTitle(`Помощь команде: ${args[0]}`)
  		.setAuthor(bot.user.username, bot.user.avatarURL())
  		.setFooter(message.author.tag, message.author.avatarURL())
  		.setColor(0x303136)
  		.addField('Что бы узнать все команды бота, пропишите:', `${prefix}help`)
  		.setThumbnail(message.guild.iconURL())
  		.setDescription(`Установить новый префикс бота на вашем сервере.`);
  		message.channel.send(emb)
  		}
  	}
  };