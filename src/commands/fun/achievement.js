// https://api.alexflipnote.dev/achievement?text=text
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "achievement",
    description: "Ачивка",
    aliases: ['ачивка'],
    args: true,
    usage: '<Текст>',
    category: "fun",
    execute(client, message, args) {
        const embed = new MessageEmbed()
        .setTitle('Achievement:')
        .setImage(`https://api.alexflipnote.dev/achievement?text=${args.join('%20')}`)
        .setColor("303136")
      message.channel.send(embed);
    }
}