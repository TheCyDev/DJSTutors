const Discord = require('discord.js');
const fs = require('fs');
const cd = new Set()

module.exports = {
	name: 'inventory',
	script: {
		arguments: ["<@Участник>", "(без упоминания, свой)"],
		stats_inv: {
			none: 0,
   currency: "customize_of_guild",
   function: '{inv} {user}'
		}
		},
	category: 'economy',
	description: 'Просмотреть (свой или другого пользователя) инвентарь',
	async execute(client, message, args) {
		let mumber = message.guild.member(message.mentions.users.first() || message.guild.member(args[0]));
    let argsUser
    if (mumber) argsUser = mumber.user
    else argsUser = message.author
    
    
		const profile = JSON.parse(fs.readFileSync("./profile.json", "utf8"));
		
		if(!profile[argsUser.id]) {
			profile[argsUser.id] = {
				moneys: 0,
				pets: {
					cow: 0,
					chicken: 0
				}
			}
		}
		
		const mons = profile[argsUser.id].moneys || 0
	 
	 
	 fs.writeFile("./profile.json", JSON.stringify(profile), (err) => {
	 	if (err) console.log(err)
	 })
	 
	 let embed = new Discord.MessageEmbed()
	 .setTitle(`Инвентарь пользователя ${argsUser.username}`)
	 .setDescription(`Денег: ${mons}\nПитомцев: [\nКоров: ${profile[argsUser.id].pets.cow}\nКуриц: ${profile[argsUser.id].pets.chicken}\n]`)
	 .setColor(0x303136)
	 message.channel.send(embed)
	}
};