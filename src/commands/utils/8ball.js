const Discord = require('discord.js');
const answers = require('../../data/8ball.json');
module.exports = {
	name: '8ball',
	description: 'Волшебный Шар',
	category: 'utils',
	execute(client, message, args) {
			
			const rnd = answers[Math.floor(Math.random() * answers.length)];
			
			if(!args[0]) return message.reply(`Задай пожалуйста мне вопрос.-.`);
			
			message.channel.send(rnd);
	}
};