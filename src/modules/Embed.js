const { MessageEmbed } = require("discord.js");

module.exports = function Embed(message) {
  if (!message) {
    throw Error("'message' должно передаваться как параметр! (BaseEmbed)");
  }

  const avatar = message.author.displayAvatarURL({ dynamic: true });
  return new MessageEmbed()
    .setFooter(message.author.tag, avatar)
    .setColor(0x303136)
    .setTimestamp();
}