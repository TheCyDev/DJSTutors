const Discord = require(
	`discord.js`
	);


module.exports = {
	name: 'answer-bug',
	aliases: ["abug"],
	admin: true,
	description: 'Отправить баг модераторам и разработчикам.',
	category: 'info',
	async execute(client, message, args) {
		const user = client.users.cache.get(args[0]);
		
		await message.reply(`Успешно отправлено!`)
		await user.send(`**Ответ На Баг:**\nОтправил ответ: **${message.author.tag}**.\nОтвет: ${
		args
		.slice(1)
		.join(" ")
}`);
	}
};