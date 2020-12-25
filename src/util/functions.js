const cfg = require('../config.json');
const Discord = require('discord.js');
const strftime = require('strftime');
const fs = require('fs');
const ms = require('ms');


/**
 * @param {string} data
 * @returns {string}
 */
 const Dating = (date) => strftime('%d.%m.%Y в %H:%M:%S', date);
 
 /**
  * @param {string} guildidd
  */
  const getServerPrefix = (guildidd) => { 
  	let prfx = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));	
  	if(!prfx[guildidd]) {
  	prfx[guildidd] = {
  		prefix: cfg.bot.prefix
  	};
  }
  	prfx[guildidd].prefix || cfg.bot.prefix;
  }
  
   /**
  * @param {string} guildId
  * @param {string} prefix
  */
  const setServerPrefix = (guildId, prefix) => { 
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));	
  if(!prefixes[guildId]) {
  	prefixes[guildId] = {
  		prefix: cfg.bot.prefix
  	};
  }
if(prefix) {
  	prefixes[guildId] = {
  		prefix: prefix
}
}
fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
	if (err) console.log(err)
})
  } ;
  
  /**
   * @param {Number} number
   */
   const myms = (number) => ms(number);
   
      /**
   * @param {string} rainbow
   */
   const rainbow = (title, description) => embed = new Discord.MessageEmbed()
   .setTitle(title)
   .setDescription(description)
   .setColor(0xFF0000).then((msg) => {
   	setInterval(() => {
   		msg.edit('', embed.setColor(0x0000FF))
   	}, 6000)
   })
   
   /**
    * @param {string} description
    */
    const red = (description) =>  new Discord.MessageEmbed().setDescription(description).setColor(0xFF0000)
    /**
     * @param {string} userId
     * @param {number} amount
     */
     const setUserBalance = (userId, amount) => {
const profile = JSON.parse(fs.readFileSync("./profile.json", "utf8"));
		
		if(!profile[userId]) {
			profile[userId] = {
				moneys: 0,
				pets: {
					cow: 0,
					chicken: 0
				}
			}
		}
		if(amount) {
			profile[userId] = {
			moneys: amount,
				pets: {
					cow: 0,
					chicken: 0
				}
			}
		}
fs.writeFile("./profile.json", JSON.stringify(profile), (err) => {
	if (err) console.log(err)
})	
     }
     
     /**
      * @param {string} userId
      * @param {number} amount
      */
      const addUserBalance = (userId, amount) => {
      	const profile = JSON.parse(fs.readFileSync("./profile.json", "utf8"));
		
		if(!profile[userId]) {
			profile[userId] = {
				moneys: 0,
				pets: {
					cow: 0,
					chicken: 0
				}
			}
		}
		
		profile[userId].moneys = profile[userId].moneys + amount

fs.writeFile("./profile.json", JSON.stringify(profile), (err) => {
	if (err) console.log(err)
})	
      };
      
      /**
       * @param {string} errText
       */
       const errEmbed = (errEmbed) => {
       	new Discord.MessageEmbed()
       	.setTitle('Ошибка!')
       	.setDescription(errText)
       	.setColor(0xFF0000);
       };
            /**
      * @param {string} userId
      */
      const getUserBalance = (userId) => {
      	const profile = JSON.parse(fs.readFileSync("./profile.json", "utf8"));
		
		if(!profile[userId]) {
			profile[userId] = {
				moneys: 0,
				pets: {
					cow: 0,
					chicken: 0
				}
			}
		}
		
		profile[userId].moneys
}
/**
 * @param {string} userId
 */
 const getUserById = (userId) => {
      	const profile = JSON.parse(fs.readFileSync("./profile.json", "utf8"));
		
		if(!profile[userId]) {
			profile[userId] = {
				moneys: 0,
				pets: {
					cow: 0,
					chicken: 0
				}
			}
		}
		if(userId) {
		profile[userId]
		}
 }
 
 module.exports = {
 	Dating,
 	getServerPrefix,
 	myms,
 	rainbow,
 	red,
 	setServerPrefix,
 	setUserBalance,
 	addUserBalance,
 	errEmbed,
 	getUserById,
 	getUserBalance
 };