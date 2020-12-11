const Discord = require('discord.js');
const fs = require('fs');
const cd = new Set()
module.exports = {
	name: 'mine',
	category: 'economy',
	description: 'Майнинг денег',
 async	execute(client, message, args) {
		const rnd = Math.floor(Math.random() * 1000)
		    
		const profile = JSON.parse(fs.readFileSync("./profile.json", "utf8"));
		
		if(!profile[message.author.id]) {
			profile[message.author.id] = {
				moneys: 0,
				pets: {
					cow: 0,
					chicken: 0
				}
			}
		}
		
		const mons = profile[message.author.id].moneys || 0
		
		profile[message.author.id].moneys = mons + rnd

fs.writeFile("./profile.json", JSON.stringify(profile), (err) => {
	if(err) console.log(err)
})

let embed = new Discord.MessageEmbed()
.setTitle('Майнинг')
.setDescription(`Вы заработали: **${rnd}**`)
.setColor(0x303136)
message.channel.send(embed)
	}
}