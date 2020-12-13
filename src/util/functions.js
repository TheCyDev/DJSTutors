const cfg = require('../config.json');
const Discord = require('discord.js');
const strftime = require('strftime');
const fs = require('fs');

  	let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

/**
 * @param {string} data
 * @returns {string}
 */
 const Dating = (date) => strftime('%d.%m.%Y в %H:%M:%S', date);
 
 /**
  * @param {string} guildId
  */
  const getServerPrefix = (guildId) => prefixes[guildId.id].prefix || cfg.bot.prefix;
 
 module.exports = {
 	Dating,
 	getServerPrefix
 };