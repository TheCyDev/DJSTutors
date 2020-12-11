
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'bash',
    description: 'Команды в консоль',
    args: true,
    admin: true,
    category: 'owner',
    usage: '<команда в консоль>',
    aliases: ['exe', 'console', 'shell'],
    async execute(client, message, args) {
        const msg = await message.channel.send(new MessageEmbed()
        .setDescription('Жду ответа...'))
        try {
        let out = require('child_process').execSync(args.join(' ')).toString('utf8')
            msg.edit(`\`\`\`${out ? out : 'нет выхода.'}\`\`\``)
    }catch(err) {
        msg.edit(`\`\`\`${err}\`\`\``)
    }
    },
}