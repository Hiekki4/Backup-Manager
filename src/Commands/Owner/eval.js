const Discord = require('discord.js')
const config = require("../../Structures/jsons/config.json")
const e = require("../../Structures/jsons/emojis.json")

module.exports.run = async (bot, message, args) => {
  if (!message.content.startsWith(config.prefix)) return;
  if (config.owner.includes(message.author.id) == false) {
    const erroembed = new Discord.MessageEmbed()
      .setTitle("Erro")
      .setColor(config.color)
      .setDescription("Você não pode executar este comando porque você está sem as seguintes permissões: Bot Developer")
    return mmessage.quote(erroembed)
  }
  try {
    if (!args.join(' ')) return message.reply('Escreve ai')
    let code = await eval(args.join(" "));
    if (typeof code !== 'string') code = await require('util').inspect(code, { depth: 0 });
    if (code.search(bot.token) != -1) {
      const cia = new Discord.MessageEmbed()
        .setTitle("Erro")
        .setColor(config.color)
        .setDescription(`${e.errado} - Comando possui algo que possa me comprometer, não é possivel executar.`)
      return message.quote(cia);
    }
    let embed = new Discord.MessageEmbed()
      .setTitle("Eval")
      .setColor(config.color)
      .addField('📩 Entrada', `\`\`\`js\n${args.join(" ")}\`\`\``)
      .addField('🚩 Saída', `\`\`\`js\n${code.slice(0, 1010)}\n\`\`\``)
    if (code.length > 1010) embed.addField('🚩 Continuação do Resultado', `\`\`\`js\n${code.slice(1010, 2020)}\n\`\`\``)
    message.quote({ embed })
  } catch (e) {
    message.quote(`\`\`\`js\n${e}\n\`\`\``);
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliase: ["e"]
}
exports.help = {
  nome: "eval",
  descrição: "Evalution",
  uso: `${config.prefix}eval`,
  categoria: "Owner"
}