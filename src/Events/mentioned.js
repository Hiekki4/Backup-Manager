const {bot} = require("../../index.js");
const config = require("../Structures/jsons/config.json");
const Discord = require('discord.js')

bot.on("message", async message => {

if(message.content == `<@!${bot.user.id}>` || message.content == `<@${bot.user.id}>`) {
    const embed = new Discord.MessageEmbed()
    embed.setTitle("**INFO**")
    embed.setThumbnail(bot.user.avatarURL())
    embed.setColor(config.color)
    embed.setDescription(`Meu prefixo neste servidor é: \`${config.prefix}\`\nPara mais ajuda use \`${config.prefix}ajuda\`.`)
    embed.setFooter(`${message.author.tag} - Versão atual: ${config.versão}`)
    return message.channel.send(embed)
}
    })

