const Discord = require("discord.js");
const os = require('os')
const { getUserBalance } = require('../../util/functions')
module.exports = {
  name: "eval",
  description: "Eval",
  admin: true,
  usage: '<команда>',
  aliases: ['ebal', 'e'],
  admin: true,
  async execute(client, message, args) {
  	let mons = getUserBalance(message.author.id)
  	const database = `Eval {
 id: ${message.author.id},
 username: ${message.author.username},
 discriminator: ${message.author.discriminator},
 tag: ${message.author.tag},
 guild: ${message.guild.name},
 guildID: ${message.guild.id},
 text: ${args.join(" ")}
    }`
    let tyyype = {
      "Undefined": "Неопределенный",
      "Boolean": "Логический",
      "Number": "Число",
      "String": "Строка",
      "Object": "Объект"
    }
    try {
      let evaled = eval(args.join(' ')); 
      if (evaled instanceof Promise || (Boolean(evaled) && typeof evaled.then === 'function' && typeof evaled.catch === 'function')) evaled = await evaled
  let eevaled = typeof evaled; 
   evaled = require('util').inspect(evaled, { depth: 0, maxArrayLength: null });
  const tyype = eevaled[0].toUpperCase() + eevaled.slice(1)
  let embed = new Discord.MessageEmbed()
  .setTitle(`Eval`)
  .setColor(0x303136)
  .setDescription(`**Успешно**
  **Тип:** \`${tyyype[tyype]}\`
  **Готово за:** \`${new Date().getTime() - message.createdTimestamp + 'ms'}\`
  **Вход:**\`\`\`js\n${args.join(' ')} \`\`\`\n**Выход:**\`\`\`js\n${evaled}\`\`\``)
  message.channel.send(embed)
  } catch(err) {
  let errembed = new Discord.MessageEmbed()
  .setTitle(`Eval`)
  .setDescription(`Ошибка
  \n\`${err}\``)
  message.channel.send(errembed)
  }
}
};