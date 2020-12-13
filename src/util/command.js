const Discord = require('discord.js');
const functions = require('./functions');
const fs = require('fs');
const ms = require('ms');
const data = require('../locales/russian.json');
const Embed = require('../modules/Embed');

module.exports = {
	settings: 'command',
	async execute(client, message, args, command) {
		const created_author = functions.Dating(message.author.createdAt);
		const created_guild = functions.Dating(message.guild.createdAt);
		const created_bot = functions.Dating(client.user.createdAt);
		const created_message = functions.Dating(message.createdAt);
		
		let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

	if(!prefixes[message.guild.id]) {
		prefixes[message.guild.id] = {
			prefix: config.prefix
		};
	}
	
	let prefix = prefixes[message.guild.id].prefix;

 const isPrefix = `${data.GLOBAL.PREFIX}: ${prefix}`;
 
 const getGuildById = (guildId) => client.guilds.cache.get(guildId);
 
 const getUserById = (userId) => client.users.cache.get(userId);
 
 const getRoleById = (roleId) => client.roles.cache.get(roleId);
	}
};