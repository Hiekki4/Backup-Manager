const config = require("../../Structures/jsons/config.json")
const Discord = require('discord.js')

module.exports.run = (bot, message, args) => {
    const embed = new Discord.MessageEmbed()
    embed.setTitle(`**Convide o ${config.name}**`)
    embed.setColor(config.color)
    embed.setThumbnail(bot.user.avatarURL())
    embed.setTimestamp()
    embed.setDescription(`Ajude seu servidor me adicionando!\n**${config.name} Invite Link:**\n[Clique Aqui](${(config.invite)})`)
    return message.quote(embed)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["convidar"]
}
exports.help = {
    nome: "convite",
    descrição: `Manda o convite do ${config.name}`,
    uso: `${config.prefix}convite`,
    categoria: "Utilitários"
}