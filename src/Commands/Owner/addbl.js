const Discord = require("discord.js");
const config = require('../../Structures/jsons/config.json')
const db = require("../../Structures/Database/blacklist.js");
const e = require("../../Structures/jsons/emojis.json")

module.exports.run = async (bot, message, args) => {
  let avatar = message.author.avatarURL()
  let member = message.author.tag
  if (config.owner.includes(message.author.id) == false) {
    const erroembed = new Discord.MessageEmbed()
      .setColor("RED")
      .setAuthor(`${member}`, `${avatar}`)
      .setDescription(`${e.errado} - Você não pode executar este comando porque você está sem as seguintes permissões: Bot Developer`)
    return message.quote(erroembed)
  }
  const id = args[0]
  const username = await bot.users.fetch(id).then(a => a.tag)
  const motivo = args.splice(1).join(" ")
  if (!id) return message.quote("Você precisa adicionar o ID do usuário")
  if (isNaN(id)) return message.quote(`Forneça o ID`)
  if (id.length < 18 || id.length > 18) return message.quote("Um ID contém 18 caracteres.")
  if (id == config.eval) return message.quote("Eu não irei adicionar meu criador a blacklist!")
  db.findOne({ _id: id }, (err, a) => {
    if (a) {
      const dd = new Discord.MessageEmbed()
        .setTitle("Erro")
        .setColor(config.color)
        .setDescription("Esse usuário já esta na BlackList")
        .setFooter(`${message.author.tag} - Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
      return message.quote(dd);
    } else {
      new db({
        _id: id,
        autorTag: message.author.tag,
        motivo: motivo
      }).save().catch(err => console.log(err))

      const sucesso = new Discord.MessageEmbed()
        .setTitle(`O usuário ${username} foi adicionado a blacklist.`)
        .setFooter(`${message.author.tag} - Versão: ${config.versão}`, message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
        .setColor(config.color)
      if (!motivo) {
        sucesso.setDescription(`Motivo: \`Não definido\``)
      } else if (motivo) {
        sucesso.setDescription(`Motivo: \`${motivo}\``)
      }
      return message.quote(sucesso)
    }
  })
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliase: []
}
exports.help = {
  nome: "addbl",
  descrição: "Adiciona um usuário na blacklist.",
  uso: `${config.prefix}addbl`,
  categoria: "Owner"
}