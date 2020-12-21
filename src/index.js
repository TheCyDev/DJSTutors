const Discord = require('discord.js');
const pg = require('pg');
const fs = require('fs');
const ms = require('ms');
const client = new Discord.Client();
const config = require('./config.json');

client.commands = new Discord.Collection();
client.errors = require('./data/errors.json');
client.emotes = require("./data/emojis.json");
client.colors = require("./data/colors.json");
client.aliases = new Discord.Collection();

fs.readdir('./commands/', (err, files)=> {
	if (err) console.log(err);
	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	jsfiles.forEach((f, i) => {
		const command = require(`./commands/${f}`);
		client.commands.set(command.name, command);
	})
});
fs.readdir('./commands/admin/', (err, files)=> {
	if (err) console.log(err);
	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	jsfiles.forEach((f, i) => {
		const command = require(`./commands/admin/${f}`);
		client.commands.set(command.name, command);
	})
});
fs.readdir('./commands/economy/', (err, files)=> {
	if (err) console.log(err);
	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	jsfiles.forEach((f, i) => {
		const command = require(`./commands/economy/${f}`);
		client.commands.set(command.name, command);
	})
});
fs.readdir('./commands/fun/', (err, files)=> {
	if (err) console.log(err);
	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	jsfiles.forEach((f, i) => {
		const command = require(`./commands/fun/${f}`);
		client.commands.set(command.name, command);
	})
});
fs.readdir('./commands/info/', (err, files)=> {
	if (err) console.log(err);
	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	jsfiles.forEach((f, i) => {
		const command = require(`./commands/info/${f}`);
		client.commands.set(command.name, command);
	})
});
fs.readdir('./commands/owner/', (err, files)=> {
	if (err) console.log(err);
	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	jsfiles.forEach((f, i) => {
		const command = require(`./commands/owner/${f}`);
		client.commands.set(command.name, command);
	})
});
fs.readdir('./commands/rp/', (err, files)=> {
	if (err) console.log(err);
	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	jsfiles.forEach((f, i) => {
		const command = require(`./commands/rp/${f}`);
		client.commands.set(command.name, command);
	})
});
fs.readdir('./commands/utils', (err, files)=> {
	if (err) console.log(err);
	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	jsfiles.forEach((f, i) => {
		const command = require(`./commands/utils/${f}`);
		client.commands.set(command.name, command);
	})
});
const cooldowns = new Discord.Collection()
client.on('ready', async() => {
	console.log(`[DISCORD] Бот подключился как: ${client.user.tag}.`)
		console.log(`[DATABASE] Подключение к базе данных успешно прошло.`)
});

client.on('message', async message => {
	const logs = JSON.parse(fs.readFileSync("./logs.json", "utf8"));
		
		if(!logs[message.guild.id]) {
			logs[message.guild.id] = {
				channelId: '775717047455711282'
			};
		}
		
		const logChan = logs[message.guild.id].channelId
		
		
	let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"))
	
	if(!prefixes[message.guild.id]) {
		prefixes[message.guild.id] = {
			prefix: config.bot.prefix
		}
	}
	
	
	let prefix = prefixes[message.guild.id].prefix
	
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
	if (!command) return;
	if (command.guildOnly && message.channel.type !== 'dm') {
		return message.reply('Команды нельзя писать в лс!');
	}
	if (command.args && !args.length) {
		let reply = `Вы не правильно написали, ${message.author}!\n\n`;
		if (command.usage) {
			reply += `Правильное использование команды: \`${prefix}${command.name} ${command.usage}\``;
		}
		return message.channel.send(reply);
	}
		if (message.author.id != '720997951119425576') {
			if (command.admin) {
				console.log(`${message.author.tag} пытался использовать admin команду!`)
				return
			}
		}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`Пожалуйста, подожди еще ${timeLeft.toFixed(1)} секунд(ы) прежде чем использовать команду \`${command.name}\``);
		}
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	try {
		command.execute(client, message, args, command);
	} catch (error) {
		console.error(error);
		message.channel.send(new Discord.MessageEmbed()
			.setTitle("Ошибка!")
			.setDescription(`\`\`\`` + error + `\`\`\``)
			.setColor(client.colors.error))
		console.log('Ошибка у бота!');
	}
	if(message.content === `${prefix}${command.name}`) {
		if(message.author.id === "706924519385989261") return
		client.channels.cache.get(`${logChan}`).send(
			new Discord.MessageEmbed()
			.setAuthor(client.user.username, client.user.avatarURL())
			.setTitle(`База Данных / ${command.name}`)
			.setDescription(`Информация:`)
			.addField('Пользователь:', `ID: \`${message.author.id}\`\nТэг: **${message.author.tag}**\nКоманда: **${command.name}**\nПрефикс: **${prefix}**`)
				.addField('Сервер:', `ID: \`${message.guild.id}\`\nНазвание: **${message.guild.name}**`)
				.setColor(0x363940)
				.setFooter(message.author.tag, message.author.avatarURL())
				.setThumbnail(message.guild.iconURL()))
	}
});

client.login(config.bot.token);