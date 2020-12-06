const config = require("../../Structures/jsons/config.json")
const Discord = require('discord.js')

module.exports.run = async (bot, message, args, idioma) => {
    const msg = await message.channel.send("Calculando...");
    const embed = new Discord.MessageEmbed()
    embed.setTitle(`${config.name} Ping`)
    embed.setColor(config.color)
    embed.setDescription(`**Latência:** \`${bot.ws.ping}ms\`\n**API:** \`${Date.now() - message.createdTimestamp}ms\``)
    msg.edit(embed);
    msg.edit("\u200b");
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["latencia"]
}
exports.help = {
    nome: "ping",
    descrição: "Veja a latencia do bot.",
    uso: `${config.prefix}ping`,
    categoria: "Utilitários"
}