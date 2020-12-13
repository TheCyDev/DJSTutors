const Discord = require('discord.js');

module.exports = {
	name: 'sub-role',
	async execute(client, message, args) {
		if(message.guild.id != "779222767987064832") return;
		
		if(!args[0]) {
			return message.reply(`Укажите роль! news - новости;statuses - статусы;updates - обновления;polls - опросы;bugs - баги;giveaways - конкурсы.`);
		}
		
		if(args[0] === 'news') {
			let role = message.guild.roles.cache.find(r => r.id === "787560902123716628");
			
	await	message.reply(`Вы получили роль: <@&787560902123716628>`);
	await message.member.roles.add(role);
		}
		if(args[0] === 'statuses') {
			let role = message.guild.roles.cache.find(r => r.id === "787560946486345759");
			
			await message.reply(`Вы получили роль: <@&787560946486345759>`);
			await message.member.roles.add(role);
}
		if(args[0] === 'updates') {
			let role = message.guild.roles.cache.find(r => r.id === "787560975053750272");
			
			await message.reply(`Вы получили роль: <@&787560975053750272>`);
			await message.member.roles.add(role);
}
if(args[0] === 'bugs') {
			let role = message.guild.roles.cache.find(r => r.id === "787561057668694016");
			
			await message.reply(`Вы получили роль: <@&787561057668694016>`);
			await message.member.roles.add(role);
}
if(args[0] === 'giveaways') {
			let role = message.guild.roles.cache.find(r => r.id === "787561085292249118");
			
			await message.reply(`Вы получили роль: <@&787561085292249118>`);
			await message.member.roles.add(role);
}
if(args[0] === 'polls') {
			let role = message.guild.roles.cache.find(r => r.id === "787561137599283220");
			
			await message.reply(`Вы получили роль: <@&787561137599283220>`);
			await message.member.roles.add(role);
}
	}
};