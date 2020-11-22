const Discord = require("discord.js")
const fs = require("fs")
const bot = new Discord.Client()

const settings = require("./config/bot.json") //The bot connects using the configuration file



bot.commands = new Discord.Collection();
bot.aliases =  new Discord.Collection();
bot.emotes = require("./config/emojis.json");
bot.colors = require("./config/colors.json");

fs.readdir('./commands/',(err,files)=>{
    if(err) console.log(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    jsfiles.forEach((f,i) =>{
        const command = require(`./commands/${f}`);
        bot.commands.set(command.name, command);
    })
});

bot.on("ready", () => {

    console.log("Я готов!"); //If the bot is ready it sends a message in the console
    //It will count all voice channels in which bot is connected, if none it will return 0

});

bot.on('message', async message => {
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"))
	
	if(!prefixes[message.guild.id]) {
		prefixes[message.guild.id] = {
			prefix: settings.prefix
		}
	}
	
	
	let prefix = prefixes[message.guild.id].prefix
    

    if (message.author.bot) return;
    if (!message.guild) return;
    

    
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = bot.commands.get(cmd);
    if (!command) command = bot.commands.get(bot.aliases.get(cmd));

    if (command) 
        command.execute(bot, message, args);
        
});
bot.on('guildMemberAdd', (member) => {
    let role = member.guild.roles.cache.find(r => r.name == 'Community' || 'Member')
    let channel = member.guild.channels.cache.find(c => c.name == 'логи' || 'welcome' || 'welcome_boost')

    let embed = new Discord.MessageEmbed()
        .setAuthor('Участник присоединился на сервер!', member.user.avatarURL())
        .setDescription(`**${member.user.tag}** Добро пожаловать на сервер!`)
        .setFooter(`ID: ${member.id}`)
        .setTimestamp()
        .setColor(0x363940)
   member.addRole(role.id)
})

bot.on('guildMemberRemove', (member) => {
     let embed =  new Discord.MessageEmbed()
        .setAuthor('Участник вышел с сервера!', member.user.avatarURL())
        .setDescription(`**${member.user.tag}** Пока, с тобой было очень хорошо по общаться:(`)
        .setFooter(`ID: ${member.id}`)
        .setTimestamp()
        .setColor(0x363940)
    let channel = member.guild.channels.cache.find(c => c.name == 'логи' || 'welcome' || ' welcome_boost')
     channel.send(embed)
})

bot.login(settings.token); //This is the heart of the bot
