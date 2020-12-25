const Discord = require(
	`discord.js`
	);


module.exports = {
	name: 'bug',
	description: 'Отправить баг модераторам и разработчикам.',
	category: 'info',
	async execute(client, message, args) {
		 const account = message.author || message.member;
		const bug = args.join(" ");
		if(!bug) {
			return message.reply(`Укажите баг!`);
		}
		
		let channelId = "779576358514065429";
		let ctx = client.channels.cache.get(channelId);
		
		await message.reply(`Спасибо за отправку бага, поддержка его просмотрит, и ответит вам.`);
		await ctx.send(`**${account.tag}\`[ID: ${account.id}]\`** отправил баг бота.\nОписание бага: \`${bug}\``);
	}
};