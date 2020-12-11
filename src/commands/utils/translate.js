const Discord = require("discord.js");
const translate = require("@k3rn31p4nic/google-translate-api");

module.exports = {
    name: "translate",
    description: "Перевод <на> <сообщение>",
    args: true,
    category: 'utils',
    usage: '<Язык> <Ваше сообщение>',
    all: `<translate <Язык> <Ваше сообщение> - Перевод вашего сообщения`,
    aliases: ['перевести', 'перевод', 'trans'],
    async execute(client, message, args) {
        let replyEmbed = new Discord.MessageEmbed()
        .setTitle(`Ошибка!`)
        .setDescription(`Правильное использование команды: \`translate <Язык> <Ваше сообщение>\`
        [Коды языков](https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%B4%D1%8B_%D1%8F%D0%B7%D1%8B%D0%BA%D0%BE%D0%B2)`)
        .setColor('FF0000')
        .setTimestamp()
        if (!args[1]) {
            return message.channel.send(replyEmbed);
        }
        const result = await translate(args.slice(1).join(" "), { to: args[0] });
        
        if (!result) {
            return message.channel.send(replyEmbed);
        }
        const embed = new Discord.MessageEmbed()
            .setDescription(`Перевод на ${args[0]}.\n\nВышло:\n${result.text}`)
            .setColor(0x303136)
            .setFooter(message.author.username)
            .setTimestamp()
            .setTitle("Google Перевод");

        message.channel.send(embed);
    }
};